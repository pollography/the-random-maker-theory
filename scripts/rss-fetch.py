#!/usr/bin/env python3
"""
TRMT RSS Aggregator
Fetcht alle RSS-Quellen aus config/rss-sources.yaml,
rankt nach Relevanz/Aktualitaet und gibt Top-Themen aus.

USAGE:
  python rss-fetch.py                    # Top 10 Themen von heute
  python rss-fetch.py --top 5            # Top 5
  python rss-fetch.py --category ki      # Nur bestimmte Kategorie
  python rss-fetch.py --hours 48         # Letzte 48 Stunden
  python rss-fetch.py --json             # JSON Output fuer Weiterverarbeitung
  python rss-fetch.py --save             # Ergebnis in output/ speichern
"""

import argparse
import json
import os
import re
import sys
import time
import xml.etree.ElementTree as ET
import urllib.request
import urllib.error
from datetime import datetime, timezone, timedelta
from email.utils import parsedate_to_datetime
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent
PROJECT_DIR = SCRIPT_DIR.parent
CONFIG_FILE = PROJECT_DIR / "config" / "rss-sources.yaml"
OUTPUT_DIR = PROJECT_DIR / "output" / "rss-digest"
CACHE_FILE = SCRIPT_DIR / ".rss-cache.json"

# Simple YAML parser (no dependency needed for our flat structure)
def parse_yaml_sources(filepath):
    """Parse rss-sources.yaml without PyYAML dependency."""
    sources = []
    trends_keywords = []
    current_source = {}

    with open(filepath, "r", encoding="utf-8") as f:
        lines = f.readlines()

    in_sources = False
    in_trends = False

    for line in lines:
        stripped = line.strip()

        if stripped.startswith("sources:"):
            in_sources = True
            in_trends = False
            continue
        elif stripped.startswith("trends_keywords:"):
            in_sources = False
            in_trends = True
            continue
        elif stripped.startswith("trends_geo:") or stripped.startswith("trends_timeframe:"):
            in_trends = False
            continue

        if in_sources:
            if stripped.startswith("- name:"):
                if current_source:
                    sources.append(current_source)
                current_source = {"name": stripped.split(":", 1)[1].strip().strip('"').strip("'")}
            elif stripped.startswith("url:"):
                current_source["url"] = stripped.split(":", 1)[1].strip().lstrip("/").strip()
                # Fix: url might have been split at the colon in http://
                if not current_source["url"].startswith("http"):
                    current_source["url"] = "http" + ":" + stripped.split(":", 2)[2].strip() if stripped.count(":") >= 2 else stripped.split(":", 1)[1].strip()
            elif stripped.startswith("lang:"):
                current_source["lang"] = stripped.split(":", 1)[1].strip()
            elif stripped.startswith("priority:"):
                current_source["priority"] = int(stripped.split(":", 1)[1].strip())
            elif stripped.startswith("category:"):
                current_source["category"] = stripped.split(":", 1)[1].strip()

        if in_trends and stripped.startswith("- "):
            kw = stripped[2:].strip().strip('"').strip("'")
            trends_keywords.append(kw)

    if current_source:
        sources.append(current_source)

    return sources, trends_keywords


def fetch_feed(source, timeout=15):
    """Fetch and parse a single RSS/Atom feed."""
    url = source["url"]
    entries = []

    try:
        req = urllib.request.Request(
            url,
            headers={
                "User-Agent": "TRMT-RSS-Aggregator/1.0",
                "Accept": "application/rss+xml, application/atom+xml, application/xml, text/xml"
            }
        )
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            xml_data = resp.read()

        root = ET.fromstring(xml_data)

        # Detect RSS vs Atom
        ns_atom = {"atom": "http://www.w3.org/2005/Atom"}

        if root.tag == "rss" or root.find("channel") is not None:
            # RSS 2.0
            channel = root.find("channel") or root
            for item in channel.findall("item"):
                entry = parse_rss_item(item, source)
                if entry:
                    entries.append(entry)
        elif root.tag.endswith("feed") or root.tag == "{http://www.w3.org/2005/Atom}feed":
            # Atom
            for item in root.findall("atom:entry", ns_atom) or root.findall("{http://www.w3.org/2005/Atom}entry"):
                entry = parse_atom_entry(item, source)
                if entry:
                    entries.append(entry)
        elif root.tag == "feed":
            # Atom without namespace
            for item in root.findall("entry"):
                entry = parse_atom_entry(item, source, ns="")
                if entry:
                    entries.append(entry)

    except urllib.error.HTTPError as e:
        print(f"  [WARN] {source['name']}: HTTP {e.code}", file=sys.stderr)
    except urllib.error.URLError as e:
        print(f"  [WARN] {source['name']}: {e.reason}", file=sys.stderr)
    except ET.ParseError as e:
        print(f"  [WARN] {source['name']}: XML Parse Error", file=sys.stderr)
    except Exception as e:
        print(f"  [WARN] {source['name']}: {e}", file=sys.stderr)

    return entries


def parse_rss_item(item, source):
    """Parse RSS 2.0 item."""
    title = item.findtext("title", "").strip()
    link = item.findtext("link", "").strip()
    desc = item.findtext("description", "").strip()
    pub_date_str = item.findtext("pubDate", "")

    if not title:
        return None

    pub_date = None
    if pub_date_str:
        try:
            pub_date = parsedate_to_datetime(pub_date_str)
        except Exception:
            pass

    # Strip HTML from description
    desc = re.sub(r"<[^>]+>", "", desc)[:300]

    return {
        "title": title,
        "link": link,
        "description": desc,
        "published": pub_date.isoformat() if pub_date else None,
        "published_dt": pub_date,
        "source_name": source["name"],
        "source_priority": source.get("priority", 2),
        "source_category": source.get("category", "unknown"),
        "source_lang": source.get("lang", "en"),
    }


def parse_atom_entry(item, source, ns="{http://www.w3.org/2005/Atom}"):
    """Parse Atom entry."""
    title_el = item.find(f"{ns}title")
    title = title_el.text.strip() if title_el is not None and title_el.text else ""

    link = ""
    link_el = item.find(f"{ns}link")
    if link_el is not None:
        link = link_el.get("href", "")

    summary_el = item.find(f"{ns}summary") or item.find(f"{ns}content")
    desc = summary_el.text.strip() if summary_el is not None and summary_el.text else ""

    updated_el = item.find(f"{ns}updated") or item.find(f"{ns}published")
    pub_date = None
    if updated_el is not None and updated_el.text:
        try:
            pub_date = datetime.fromisoformat(updated_el.text.replace("Z", "+00:00"))
        except Exception:
            pass

    if not title:
        return None

    desc = re.sub(r"<[^>]+>", "", desc)[:300]

    return {
        "title": title,
        "link": link,
        "description": desc,
        "published": pub_date.isoformat() if pub_date else None,
        "published_dt": pub_date,
        "source_name": source["name"],
        "source_priority": source.get("priority", 2),
        "source_category": source.get("category", "unknown"),
        "source_lang": source.get("lang", "en"),
    }


def score_entry(entry, trends_keywords=None):
    """Score an entry based on relevance, recency, source priority."""
    score = 0.0

    # Source priority (1=high=+30, 2=medium=+20, 3=low=+10)
    prio = entry.get("source_priority", 2)
    score += (4 - prio) * 10

    # Recency bonus (last 6h = +40, 12h = +30, 24h = +20, 48h = +10)
    if entry.get("published_dt"):
        age_hours = (datetime.now(timezone.utc) - entry["published_dt"]).total_seconds() / 3600
        if age_hours < 6:
            score += 40
        elif age_hours < 12:
            score += 30
        elif age_hours < 24:
            score += 20
        elif age_hours < 48:
            score += 10

    # German source bonus (+10)
    if entry.get("source_lang") == "de":
        score += 10

    # Trend keyword match (+15 per keyword)
    if trends_keywords:
        title_lower = entry["title"].lower()
        for kw in trends_keywords:
            if kw.lower() in title_lower:
                score += 15

    # Hersteller source bonus (+5)
    if entry.get("source_category") == "hersteller":
        score += 5

    entry["score"] = score
    return entry


def deduplicate(entries, threshold=0.6):
    """Simple title-based deduplication."""
    seen_titles = []
    unique = []

    for entry in entries:
        title_words = set(entry["title"].lower().split())
        is_dupe = False

        for seen in seen_titles:
            overlap = len(title_words & seen) / max(len(title_words | seen), 1)
            if overlap > threshold:
                is_dupe = True
                break

        if not is_dupe:
            unique.append(entry)
            seen_titles.append(title_words)

    return unique


def main():
    parser = argparse.ArgumentParser(description="TRMT RSS Aggregator")
    parser.add_argument("--top", type=int, default=10, help="Anzahl Top-Themen (default: 10)")
    parser.add_argument("--hours", type=int, default=24, help="Zeitfenster in Stunden (default: 24)")
    parser.add_argument("--category", type=str, default=None, help="Nur bestimmte Kategorie")
    parser.add_argument("--json", action="store_true", help="JSON Output")
    parser.add_argument("--save", action="store_true", help="Ergebnis in output/ speichern")
    args = parser.parse_args()

    # 1. Config laden
    if not CONFIG_FILE.exists():
        print(f"[ERROR] Config nicht gefunden: {CONFIG_FILE}", file=sys.stderr)
        sys.exit(1)

    sources, trends_keywords = parse_yaml_sources(CONFIG_FILE)
    print(f"=== TRMT RSS Aggregator ===", file=sys.stderr)
    print(f"  {len(sources)} Quellen, {len(trends_keywords)} Trend-Keywords", file=sys.stderr)
    print(f"  Zeitfenster: letzte {args.hours}h", file=sys.stderr)
    print(f"  Top: {args.top}\n", file=sys.stderr)

    # Filter by category if specified
    if args.category:
        sources = [s for s in sources if s.get("category", "").lower() == args.category.lower()]
        print(f"  Gefiltert auf Kategorie '{args.category}': {len(sources)} Quellen\n", file=sys.stderr)

    # 2. Feeds fetchen
    all_entries = []
    cutoff = datetime.now(timezone.utc) - timedelta(hours=args.hours)

    for i, source in enumerate(sources):
        print(f"  [{i+1}/{len(sources)}] {source['name']}...", end=" ", file=sys.stderr)
        entries = fetch_feed(source)
        # Filter by time
        filtered = []
        for e in entries:
            if e.get("published_dt") and e["published_dt"] >= cutoff:
                filtered.append(e)
            elif not e.get("published_dt"):
                # No date? Include but with low score
                filtered.append(e)
        print(f"{len(filtered)} Artikel", file=sys.stderr)
        all_entries.extend(filtered)
        time.sleep(0.3)  # Polite crawling

    print(f"\n  Total: {len(all_entries)} Artikel in {args.hours}h\n", file=sys.stderr)

    if not all_entries:
        print("[INFO] Keine neuen Artikel gefunden.", file=sys.stderr)
        sys.exit(0)

    # 3. Score & Sort
    for entry in all_entries:
        score_entry(entry, trends_keywords)

    all_entries.sort(key=lambda x: x["score"], reverse=True)

    # 4. Deduplicate
    unique = deduplicate(all_entries)

    # 5. Top N
    top = unique[:args.top]

    # 6. Output
    # Clean up non-serializable fields
    for entry in top:
        if "published_dt" in entry:
            del entry["published_dt"]

    if args.json:
        print(json.dumps(top, ensure_ascii=False, indent=2))
    else:
        print(f"=== TOP {len(top)} THEMEN ({datetime.now().strftime('%Y-%m-%d %H:%M')}) ===\n")
        for i, entry in enumerate(top, 1):
            print(f"{i}. [{entry['source_name']}] (Score: {entry['score']:.0f})")
            print(f"   {entry['title']}")
            if entry.get("link"):
                print(f"   {entry['link']}")
            if entry.get("description"):
                print(f"   > {entry['description'][:150]}...")
            print()

    # 7. Save if requested
    if args.save:
        OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
        date_str = datetime.now().strftime("%Y-%m-%d")
        output_file = OUTPUT_DIR / f"digest-{date_str}.json"
        with open(output_file, "w", encoding="utf-8") as f:
            json.dump({
                "date": date_str,
                "hours": args.hours,
                "total_fetched": len(all_entries),
                "total_unique": len(unique),
                "top": top
            }, f, ensure_ascii=False, indent=2)
        print(f"\n[OK] Gespeichert: {output_file}", file=sys.stderr)


if __name__ == "__main__":
    main()
