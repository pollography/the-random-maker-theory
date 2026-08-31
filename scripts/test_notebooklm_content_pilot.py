import hashlib
import importlib.util
import json
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch


MODULE_PATH = Path(__file__).with_name("notebooklm_content_pilot.py")
SPEC = importlib.util.spec_from_file_location("notebooklm_content_pilot", MODULE_PATH)
pilot = importlib.util.module_from_spec(SPEC)
assert SPEC.loader is not None
SPEC.loader.exec_module(pilot)


def valid_manifest(**overrides):
    data = {
        "slug": "ki-content-pipeline-ohne-n8n",
        "title": "KI-Content-Pipeline ohne n8n",
        "profile_alias": "trmt-notebooklm",
        "upload_gate_confirmed": True,
        "sources": [
            {
                "id": "S01",
                "url": "https://github.com/teng-lin/notebooklm-py",
                "upload_allowed": True,
            }
        ],
    }
    data.update(overrides)
    return data


class ManifestValidationTests(unittest.TestCase):
    def test_accepts_small_public_source_manifest(self):
        normalized = pilot.validate_manifest(valid_manifest())
        self.assertEqual(normalized["slug"], "ki-content-pipeline-ohne-n8n")
        self.assertEqual(normalized["sources"][0]["id"], "S01")

    def test_rejects_unconfirmed_or_unknown_upload_gate(self):
        for value in (False, None, "true"):
            with self.subTest(value=value), self.assertRaises(pilot.ManifestError):
                pilot.validate_manifest(valid_manifest(upload_gate_confirmed=value))

    def test_rejects_unapproved_source_and_more_than_ten_sources(self):
        blocked = valid_manifest()["sources"][0] | {"upload_allowed": False}
        with self.assertRaises(pilot.ManifestError):
            pilot.validate_manifest(valid_manifest(sources=[blocked]))

        too_many = [
            {"id": f"S{i:02d}", "url": f"https://example.com/{i}", "upload_allowed": True}
            for i in range(11)
        ]
        with self.assertRaises(pilot.ManifestError):
            pilot.validate_manifest(valid_manifest(sources=too_many))

    def test_rejects_unsafe_or_private_urls(self):
        urls = (
            "file:///C:/secret.txt",
            "javascript:alert(1)",
            "http://127.0.0.1/admin",
            "http://localhost:8080/",
            "http://10.1.2.3/private",
            "http://169.254.169.254/latest/meta-data/",
            "https://[::1]/",
            "https://example.com:not-a-port/path",
            "https://example.com/path?token=secret",
            "http://127.1/admin",
            "http://example.com/plain-http",
        )
        for url in urls:
            source = {"id": "S01", "url": url, "upload_allowed": True}
            with self.subTest(url=url), self.assertRaises(pilot.ManifestError):
                pilot.validate_manifest(valid_manifest(sources=[source]))

    def test_plain_http_requires_a_specific_reason(self):
        source = {
            "id": "S01",
            "url": "http://example.com/document",
            "http_reason": "The primary source has no HTTPS endpoint.",
            "upload_allowed": True,
        }
        normalized = pilot.validate_manifest(valid_manifest(sources=[source]))
        self.assertEqual(
            normalized["sources"][0]["http_reason"],
            "The primary source has no HTTPS endpoint.",
        )

    def test_rejects_email_as_profile_alias(self):
        with self.assertRaises(pilot.ManifestError):
            pilot.validate_manifest(valid_manifest(profile_alias="info@example.com"))


class OutputSafetyTests(unittest.TestCase):
    def test_csv_cells_cannot_become_formulas(self):
        for raw in ("=1+1", "+SUM(A:A)", "-2+3", "@cmd"):
            self.assertEqual(pilot.neutralize_csv_cell(raw), "'" + raw)
        self.assertEqual(pilot.neutralize_csv_cell("normal"), "normal")

    def test_event_log_removes_email_url_and_windows_path(self):
        event = pilot.safe_event(
            stage="import",
            source_id="S01",
            error_class="RuntimeError",
            message=(
                "Upload failed for info@pollograpgy.de at "
                "https://secret.example/path?q=token in "
                "C:\\Users\\Pollo\\My Secret Folder\\secret.txt token=abc123"
            ),
        )
        encoded = json.dumps(event, ensure_ascii=False)
        self.assertNotIn("info@pollograpgy.de", encoded)
        self.assertNotIn("secret.example", encoded)
        self.assertNotIn("C:\\\\Users", encoded)
        self.assertIn("[EMAIL]", encoded)
        self.assertIn("[URL]", encoded)
        self.assertIn("[PATH]", encoded)
        self.assertNotIn("abc123", encoded)

    def test_event_labels_are_allowlisted(self):
        event = pilot.safe_event(
            stage="import token=abc",
            source_id="S01@example.com",
            error_class="RuntimeError C:\\secret.txt",
            message="failed",
        )
        self.assertEqual(event["stage"], "[REDACTED]")
        self.assertEqual(event["source_id"], "[REDACTED]")
        self.assertEqual(event["error_class"], "[REDACTED]")

    def test_release_gate_requires_draft_true_and_matching_hash(self):
        with tempfile.TemporaryDirectory() as tmp:
            article = Path(tmp) / "article.md"
            article.write_text("---\ndraft: true\n---\n\nText\n", encoding="utf-8")
            digest = hashlib.sha256(article.read_bytes()).hexdigest()
            pilot.verify_release_article(article, digest)

            with self.assertRaises(pilot.ReleaseGateError):
                pilot.verify_release_article(article, "0" * 64)

            article.write_text("---\ndraft: false\n---\n\nText\n", encoding="utf-8")
            digest = hashlib.sha256(article.read_bytes()).hexdigest()
            with self.assertRaises(pilot.ReleaseGateError):
                pilot.verify_release_article(article, digest)

            article.write_text(
                "---\ndraft: true\ndraft: false\n---\n\nText\n", encoding="utf-8"
            )
            digest = hashlib.sha256(article.read_bytes()).hexdigest()
            with self.assertRaises(pilot.ReleaseGateError):
                pilot.verify_release_article(article, digest)

    def test_initialize_run_cannot_escape_allowed_staging_root(self):
        with tempfile.TemporaryDirectory() as tmp:
            base = Path(tmp)
            manifest_path = base / "manifest.json"
            manifest_path.write_text(json.dumps(valid_manifest()), encoding="utf-8")
            allowed = base / "output" / "content-runs"
            outside = base / "elsewhere"
            with self.assertRaises(pilot.ManifestError):
                pilot.initialize_run(manifest_path, outside, allowed_root=allowed)

    def test_initialize_run_writes_only_the_allowed_staging_contract(self):
        with tempfile.TemporaryDirectory() as tmp:
            base = Path(tmp)
            allowed = base / "output" / "content-runs"
            manifest_path = base / "manifest.json"
            source = {
                "id": "S01",
                "url": "http://example.com/document",
                "http_reason": "The primary source has no HTTPS endpoint.",
                "upload_allowed": True,
            }
            manifest_path.write_text(
                json.dumps(valid_manifest(sources=[source])), encoding="utf-8"
            )
            checked = []

            def fake_preflight(url, **_kwargs):
                checked.append(url)
                return url

            run_dir = pilot.initialize_run(
                manifest_path,
                allowed,
                allowed_root=allowed,
                preflight_func=fake_preflight,
            )
            self.assertTrue((run_dir / "run.json").is_file())
            self.assertEqual(checked, ["http://example.com/document"])
            ledger = (run_dir / "01-sources" / "source-ledger.csv").read_text(
                encoding="utf-8-sig"
            )
            self.assertIn("http_reason", ledger.splitlines()[0])
            self.assertNotIn("@", ledger)
            with self.assertRaises(pilot.ManifestError):
                pilot.initialize_run(
                    manifest_path,
                    allowed,
                    allowed_root=allowed,
                    preflight_func=fake_preflight,
                )

    def test_preflight_checks_the_redirect_target(self):
        class FakeResponse:
            def __enter__(self):
                return self

            def __exit__(self, *_args):
                return False

            def geturl(self):
                return "http://127.0.0.1/private"

            def read(self, _size):
                return b""

        class FakeOpener:
            def open(self, *_args, **_kwargs):
                return FakeResponse()

        with patch.object(pilot, "build_opener", return_value=FakeOpener()):
            with self.assertRaises(pilot.ManifestError):
                pilot.preflight_public_url("https://example.com/start")

    def test_redirect_handler_blocks_private_target_before_follow(self):
        handler = pilot.SafeRedirectHandler()
        with self.assertRaises(pilot.ManifestError):
            handler.redirect_request(
                None,
                None,
                302,
                "Found",
                {},
                "http://127.0.0.1/private",
            )


if __name__ == "__main__":
    unittest.main()
