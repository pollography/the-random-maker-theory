#!/usr/bin/env python3
"""
TRMT YouTube Competitor Trend-Check
Checkt die neuesten Videos der Inspiration-Kanaele via RSS.
Zeigt Titel, Datum und Link der letzten Videos.

USAGE:
  python youtube-trends.py                 # Alle Kanaele, letzte 48h
  python youtube-trends.py --hours 72      # Letzte 72 Stunden
  python youtube-trends.py --top 10        # Top 10 Videos
  python youtube-trends.py --json          # JSON Output
"""

import argparse
import json
import re
import sys
import time
import xml.etree.ElementTree as ET
import urllib.request
from datetime import datetime, timezone, timedelta
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent
PROJECT_DIR = SCRIPT_DIR.parent
CONFIG_FILE = PROJECT_DIR / "config" / "youtube-inspiration.yaml"

YT_RSS_TEMPLATE = "https://www.youtube.com/feeds/videos.xml?channel_id={}"


def parse_yaml_channels(filepath):
    """Parse youtube-inspiration.yaml without PyYAML."""
    channels = []
    track_keywords = []
    current = {}
    in_channels = False
    in_keywords = False

    with open(filepath, "r", encoding="utf-8") as f:
        for line in f:
            stripped = line.strip()

            if stripped.startswith("channels:"):
                in_channels = True
                in_keywords = False
                continue
            elif stripped.startswith("track_keywords:"):
                in_channels = False
                in_keywords = True
                continue

            if in_channels:
                if stripped.startswith("- name:"):
                    if current:
                        channels.append(current)
                    current = {"name": stripped.split(":", 1)[1].strip().strip('"').strip("'")}
                elif stripped.startswith("channel_id:"):
                    current["channel_id"] = stripped.split(":", 1)[1].strip().strip('"').strip("'")
                elif stripped.startswith("lang:"):
                    current["lang"] = stripped.split(":", 1)[1].strip()
                elif stripped.startswith("category:"):
                    current["category"] = stripped.split(":", 1)[1].strip()

            if in_keywords and stripped.startswith("- "):
                kw = stripped[2:].strip().strip('"').strip("'")
                track_keywords.append(kw)

    if current:
        channels.append(current)

    return channels, track_keywords


def fetch_channel_videos(channel, timeout=10):
    """Fetch latest videos from a YouTube channel RSS feed."""
    channel_id = channel.get("channel_id", "")
    if not channel_id:
        return []

    url = YT_RSS_TEMPLATE.format(channel_id)
    videos = []

    try:
        req = urllib.request.Request(url, headers={"User-Agent": "TRMT-YT-Trends/1.0"})
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            xml_data = resp.read()

        ns = {"atom": "http://www.w3.org/2005/Atom", "media": "http://search.yahoo.com/mrss/"}
        root = ET.fromstring(xml_data)

        for entry in root.findall("atom:entry", ns):
            title_el = entry.find("atom:title", ns)
            link_el = entry.find("atom:link", ns)
            published_el = entry.find("atom:published", ns)

            title = title_el.text.strip() if title_el is not None and title_el.text else ""
            link = link_el.get("href", "") if link_el is not None else ""
            pub_date = None

            if published_el is not None and published_el.text:
                try:
                    pub_date = datetime.fromisoformat(published_el.text.replace("Z", "+00:00"))
                except Exception:
                    pass

            if title:
                videos.append({
                    "title": title,
                    "link": link,
                    "published": pub_date.isoformat() if pub_date else None,
                    "published_dt": pub_date,
                    "channel": channel["name"],
                    "category": channel.get("category", ""),
                    "lang": channel.get("lang", "en"),
                })

    except Exception as e:
        print(f"  [WARN] {channel['name']}: {e}", file=sys.stderr)

    return videos


def score_video(video, track_keywords):
    """Score a video based on keyword matches and recency."""
    score = 0.0

    # Recency
    if video.get("published_dt"):
        age_hours = (datetime.now(timezone.utc) - video["published_dt"]).total_seconds() / 3600
        if age_hours < 12:
            score += 40
        elif age_hours < 24:
            score += 30
        elif age_hours < 48:
            score += 20
        elif age_hours < 72:
            score += 10

    # Keyword matches
    title_lower = video["title"].lower()
    for kw in track_keywords:
        if kw.lower() in title_lower:
            score += 15

    # German bonus
    if video.get("lang") == "de":
        score += 10

    video["score"] = score
    return video


def main():
    parser = argparse.ArgumentParser(description="TRMT YouTube Trend-Check")
    parser.add_argument("--hours", type=int, default=48, help="Zeitfenster (default: 48h)")
    parser.add_argument("--top", type=int, default=15, help="Anzahl Videos (default: 15)")
    parser.add_argument("--json", action="store_true", help="JSON Output")
    args = parser.parse_args()

    if not CONFIG_FILE.exists():
        print(f"[ERROR] Config nicht gefunden: {CONFIG_FILE}", file=sys.stderr)
        sys.exit(1)

    channels, track_keywords = parse_yaml_channels(CONFIG_FILE)
    active = [c for c in channels if c.get("channel_id")]

    print(f"=== TRMT YouTube Trends ===", file=sys.stderr)
    print(f"  {len(active)}/{len(channels)} Kanaele mit Channel-ID", file=sys.stderr)
    print(f"  {len(track_keywords)} Track-Keywords\n", file=sys.stderr)

    cutoff = datetime.now(timezone.utc) - timedelta(hours=args.hours)
    all_videos = []

    for i, ch in enumerate(active, 1):
        print(f"  [{i}/{len(active)}] {ch['name']}...", end=" ", file=sys.stderr)
        videos = fetch_channel_videos(ch)
        filtered = [v for v in videos if v.get("published_dt") and v["published_dt"] >= cutoff]
        print(f"{len(filtered)} neue Videos", file=sys.stderr)
        all_videos.extend(filtered)
        time.sleep(0.3)

    if not all_videos:
        print(f"\n[INFO] Keine neuen Videos in den letzten {args.hours}h.", file=sys.stderr)
        sys.exit(0)

    # Score and sort
    for v in all_videos:
        score_video(v, track_keywords)
    all_videos.sort(key=lambda x: x["score"], reverse=True)

    top = all_videos[:args.top]

    # Clean non-serializable
    for v in top:
        v.pop("published_dt", None)

    if args.json:
        print(json.dumps(top, ensure_ascii=False, indent=2))
    else:
        print(f"\n=== TOP {len(top)} YOUTUBE-TRENDS ({args.hours}h) ===\n")
        for i, v in enumerate(top, 1):
            print(f"{i}. [{v['channel']}] (Score: {v['score']:.0f})")
            print(f"   {v['title']}")
            print(f"   {v['link']}")
            if v.get("published"):
                pub = v["published"][:10]
                print(f"   Datum: {pub}")
            print()


if __name__ == "__main__":
    main()
