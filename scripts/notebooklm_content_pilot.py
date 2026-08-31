#!/usr/bin/env python3
"""Fail-closed staging helper for the TRMT NotebookLM pilot.

This module deliberately does not publish, deploy, change Git state, or read
NotebookLM credential files. It validates an explicitly approved source
manifest and prepares ignored staging files below output/content-runs/.
"""

from __future__ import annotations

import argparse
import csv
import hashlib
import ipaddress
import json
import re
import socket
from datetime import date, datetime, timezone
from pathlib import Path
from typing import Any, Callable
from urllib.parse import parse_qsl, urlsplit, urlunsplit
from urllib.request import HTTPRedirectHandler, Request, build_opener


MAX_PILOT_SOURCES = 10
REPO_ROOT = Path(__file__).resolve().parents[1]
DEFAULT_OUTPUT_ROOT = REPO_ROOT / "output" / "content-runs"
PROFILE_ALIAS_RE = re.compile(r"^[a-z0-9][a-z0-9-]{1,47}$")
SLUG_RE = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")
SOURCE_ID_RE = re.compile(r"^S\d{2}$")
SAFE_LABEL_RE = re.compile(r"^[A-Za-z0-9_.:-]{1,80}$")
EMAIL_RE = re.compile(r"\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b", re.IGNORECASE)
URL_RE = re.compile(r"https?://[^\s]+", re.IGNORECASE)
SECRET_VALUE_RE = re.compile(
    r"\b(?:token|secret|password|passwd|api[_-]?key|authorization|cookie)"
    r"\s*[:=]\s*[^\s,;]+",
    re.IGNORECASE,
)
WINDOWS_PATH_RE = re.compile(r"(?:\b[A-Za-z]:\\|\\\\)[^\r\n]*")
SENSITIVE_QUERY_KEYS = {
    "access_token",
    "api-key",
    "api_key",
    "apikey",
    "auth",
    "authorization",
    "cookie",
    "key",
    "password",
    "passwd",
    "secret",
    "sig",
    "signature",
    "token",
}


class ManifestError(ValueError):
    pass


class ReleaseGateError(ValueError):
    pass


def _normalize_public_url(raw_url: Any, *, http_reason: Any = None) -> str:
    if not isinstance(raw_url, str) or not raw_url.strip():
        raise ManifestError("Each source requires a non-empty URL")

    parsed = urlsplit(raw_url.strip())
    if parsed.scheme not in {"https", "http"}:
        raise ManifestError("Only http and https sources are allowed")
    if parsed.scheme == "http" and (
        not isinstance(http_reason, str) or not 12 <= len(http_reason.strip()) <= 200
    ):
        raise ManifestError("Plain HTTP requires a specific 12 to 200 character reason")
    if parsed.username or parsed.password:
        raise ManifestError("Credentials in source URLs are not allowed")
    query_keys = {key.lower() for key, _value in parse_qsl(parsed.query, keep_blank_values=True)}
    if query_keys & SENSITIVE_QUERY_KEYS:
        raise ManifestError("Credential-like query parameters are not allowed")

    hostname = (parsed.hostname or "").rstrip(".").lower()
    if not hostname:
        raise ManifestError("Each source URL requires a hostname")
    if hostname == "localhost" or hostname.endswith((".localhost", ".local")):
        raise ManifestError("Local hostnames are not allowed")

    try:
        address = ipaddress.ip_address(hostname)
    except ValueError:
        try:
            address = ipaddress.ip_address(socket.inet_aton(hostname))
        except OSError:
            address = None
    if address and not address.is_global:
        raise ManifestError("Private, loopback, link-local, or reserved addresses are not allowed")

    try:
        port = parsed.port
    except ValueError as exc:
        raise ManifestError("Source URL contains an invalid port") from exc

    host = f"[{hostname}]" if ":" in hostname else hostname
    if port:
        host = f"{host}:{port}"
    return urlunsplit((parsed.scheme.lower(), host, parsed.path or "/", parsed.query, ""))


def _assert_public_dns(url: str) -> None:
    hostname = urlsplit(url).hostname
    if not hostname:
        raise ManifestError("Source URL has no hostname")
    try:
        answers = socket.getaddrinfo(hostname, None, type=socket.SOCK_STREAM)
    except socket.gaierror as exc:
        raise ManifestError("Source hostname could not be resolved") from exc
    if not answers:
        raise ManifestError("Source hostname returned no addresses")
    for answer in answers:
        address = ipaddress.ip_address(answer[4][0].split("%", 1)[0])
        if not address.is_global:
            raise ManifestError("Source hostname resolves to a non-public address")


class SafeRedirectHandler(HTTPRedirectHandler):
    """Reject unsafe redirect targets before urllib opens a connection to them."""

    def redirect_request(self, req, fp, code, msg, headers, newurl):
        normalized_target = _normalize_public_url(newurl)
        _assert_public_dns(normalized_target)
        return super().redirect_request(req, fp, code, msg, headers, normalized_target)


def preflight_public_url(
    raw_url: str, *, http_reason: str | None = None, timeout: float = 15.0
) -> str:
    normalized = _normalize_public_url(raw_url, http_reason=http_reason)
    _assert_public_dns(normalized)
    request = Request(
        normalized,
        method="GET",
        headers={"Range": "bytes=0-0", "User-Agent": "TRMT-NotebookLM-Pilot/1.0"},
    )
    try:
        opener = build_opener(SafeRedirectHandler())
        with opener.open(request, timeout=timeout) as response:
            final_url = response.geturl()
            response.read(1)
    except OSError as exc:
        raise ManifestError("Source URL preflight failed") from exc
    final_normalized = _normalize_public_url(final_url, http_reason=http_reason)
    _assert_public_dns(final_normalized)
    return final_normalized


def validate_manifest(data: Any) -> dict[str, Any]:
    if not isinstance(data, dict):
        raise ManifestError("Manifest must be a JSON object")

    slug = data.get("slug")
    title = data.get("title")
    profile_alias = data.get("profile_alias")
    sources = data.get("sources")

    if not isinstance(slug, str) or not SLUG_RE.fullmatch(slug):
        raise ManifestError("slug must be lowercase kebab-case")
    if not isinstance(title, str) or not title.strip() or len(title.strip()) > 120:
        raise ManifestError("title must contain 1 to 120 characters")
    if not isinstance(profile_alias, str) or not PROFILE_ALIAS_RE.fullmatch(profile_alias):
        raise ManifestError("profile_alias must be a non-secret alias, never an email address")
    if data.get("upload_gate_confirmed") is not True:
        raise ManifestError("upload_gate_confirmed must be the boolean true")
    if not isinstance(sources, list) or not 1 <= len(sources) <= MAX_PILOT_SOURCES:
        raise ManifestError(f"Pilot requires 1 to {MAX_PILOT_SOURCES} sources")

    normalized_sources: list[dict[str, Any]] = []
    seen_ids: set[str] = set()
    seen_urls: set[str] = set()
    for item in sources:
        if not isinstance(item, dict):
            raise ManifestError("Each source must be an object")
        source_id = item.get("id")
        if not isinstance(source_id, str) or not SOURCE_ID_RE.fullmatch(source_id):
            raise ManifestError("Source IDs must use S01-style identifiers")
        if source_id in seen_ids:
            raise ManifestError(f"Duplicate source id: {source_id}")
        if item.get("upload_allowed") is not True:
            raise ManifestError(f"Source {source_id} is not explicitly approved for upload")

        http_reason = item.get("http_reason")
        normalized_url = _normalize_public_url(item.get("url"), http_reason=http_reason)
        if normalized_url in seen_urls:
            raise ManifestError(f"Duplicate source URL: {normalized_url}")
        seen_ids.add(source_id)
        seen_urls.add(normalized_url)
        normalized_source = {"id": source_id, "url": normalized_url, "upload_allowed": True}
        if normalized_url.startswith("http://"):
            normalized_source["http_reason"] = http_reason.strip()
        normalized_sources.append(normalized_source)

    return {
        "slug": slug,
        "title": title.strip(),
        "profile_alias": profile_alias,
        "upload_gate_confirmed": True,
        "sources": normalized_sources,
    }


def neutralize_csv_cell(value: Any) -> str:
    text = "" if value is None else str(value)
    return "'" + text if text.startswith(("=", "+", "-", "@")) else text


def safe_event(*, stage: str, source_id: str, error_class: str, message: str) -> dict[str, str]:
    cleaned = EMAIL_RE.sub("[EMAIL]", str(message))
    cleaned = URL_RE.sub("[URL]", cleaned)
    cleaned = SECRET_VALUE_RE.sub("[SECRET]", cleaned)
    cleaned = WINDOWS_PATH_RE.sub("[PATH]", cleaned)
    cleaned = " ".join(cleaned.split())[:240]

    def safe_label(value: Any) -> str:
        text = str(value)
        return text if SAFE_LABEL_RE.fullmatch(text) else "[REDACTED]"

    return {
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "stage": safe_label(stage),
        "source_id": safe_label(source_id),
        "error_class": safe_label(error_class),
        "message": cleaned,
    }


def verify_release_article(article_path: Path, expected_sha256: str) -> None:
    article_path = Path(article_path)
    content = article_path.read_bytes()
    actual_sha256 = hashlib.sha256(content).hexdigest()
    if actual_sha256 != expected_sha256.lower():
        raise ReleaseGateError("Article SHA-256 does not match the release manifest")

    text = content.decode("utf-8")
    frontmatter_match = re.match(r"^---\s*\n(.*?)\n---\s*\n", text, flags=re.DOTALL)
    if not frontmatter_match:
        raise ReleaseGateError("Release article must contain YAML frontmatter")
    draft_values = re.findall(
        r"^\s*draft\s*:\s*([^#\r\n]+?)\s*$",
        frontmatter_match.group(1),
        flags=re.MULTILINE | re.IGNORECASE,
    )
    if len(draft_values) != 1 or draft_values[0].strip().lower() != "true":
        raise ReleaseGateError("Release article must contain draft: true in frontmatter")


def initialize_run(
    manifest_path: Path,
    output_root: Path = DEFAULT_OUTPUT_ROOT,
    *,
    allowed_root: Path = DEFAULT_OUTPUT_ROOT,
    preflight_func: Callable[..., str] = preflight_public_url,
) -> Path:
    output_root = Path(output_root).resolve()
    allowed_root = Path(allowed_root).resolve()
    if output_root != allowed_root:
        raise ManifestError("Run output must be the repository's ignored output/content-runs root")

    manifest = validate_manifest(json.loads(Path(manifest_path).read_text(encoding="utf-8")))
    run_dir = (output_root / f"{date.today().isoformat()}--{manifest['slug']}").resolve()
    if output_root not in run_dir.parents:
        raise ManifestError("Run directory escaped the configured output root")
    if run_dir.exists():
        raise ManifestError(f"Run directory already exists: {run_dir.name}")

    for source in manifest["sources"]:
        source["preflight_final_url"] = preflight_func(
            source["url"], http_reason=source.get("http_reason")
        )

    for relative in (
        "00-brief",
        "01-sources",
        "02-research",
        "03-editorial",
        "04-media",
        "05-release",
    ):
        (run_dir / relative).mkdir(parents=True, exist_ok=False)

    run_state = {
        "schema_version": 1,
        "pipeline": "trmt-notebooklm-pilot",
        "profile_alias": manifest["profile_alias"],
        "stage": "initialized",
        "source_count": len(manifest["sources"]),
        "network_preflight": {"status": "ok", "source_count": len(manifest["sources"])},
        "draft_only": True,
        "created_at": datetime.now(timezone.utc).isoformat(),
        "notebook_id": None,
    }
    (run_dir / "run.json").write_text(
        json.dumps(run_state, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    (run_dir / "events.jsonl").touch()
    (run_dir / "00-brief" / "topic-brief.md").write_text(
        f"# {manifest['title']}\n\nStatus: Draft-only-Pilot.\n", encoding="utf-8"
    )

    ledger_path = run_dir / "01-sources" / "source-ledger.csv"
    with ledger_path.open("w", encoding="utf-8-sig", newline="") as handle:
        writer = csv.DictWriter(
            handle,
            fieldnames=("id", "url", "preflight_final_url", "http_reason", "upload_allowed"),
        )
        writer.writeheader()
        for source in manifest["sources"]:
            writer.writerow({key: neutralize_csv_cell(value) for key, value in source.items()})

    (run_dir / "01-sources" / "source-selection.json").write_text(
        json.dumps(manifest["sources"], ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    return run_dir


def _build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description=__doc__)
    subparsers = parser.add_subparsers(dest="command", required=True)

    validate = subparsers.add_parser("validate", help="Validate a pilot manifest")
    validate.add_argument("manifest", type=Path)

    preflight = subparsers.add_parser(
        "preflight", help="Resolve and follow every declared URL before cloud upload"
    )
    preflight.add_argument("manifest", type=Path)

    init = subparsers.add_parser("init", help="Create a draft-only staging run")
    init.add_argument("manifest", type=Path)

    verify = subparsers.add_parser("verify-release", help="Check draft and hash release gates")
    verify.add_argument("article", type=Path)
    verify.add_argument("sha256")
    return parser


def main() -> int:
    args = _build_parser().parse_args()
    if args.command == "validate":
        manifest = validate_manifest(json.loads(args.manifest.read_text(encoding="utf-8")))
        print(json.dumps({"status": "ok", "source_count": len(manifest["sources"])}))
    elif args.command == "preflight":
        manifest = validate_manifest(json.loads(args.manifest.read_text(encoding="utf-8")))
        final_urls = [
            preflight_public_url(source["url"], http_reason=source.get("http_reason"))
            for source in manifest["sources"]
        ]
        print(json.dumps({"status": "ok", "source_count": len(final_urls)}))
    elif args.command == "init":
        run_dir = initialize_run(args.manifest)
        print(json.dumps({"status": "initialized", "run_dir": str(run_dir)}))
    else:
        verify_release_article(args.article, args.sha256)
        print(json.dumps({"status": "ok", "draft": True}))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
