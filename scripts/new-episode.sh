#!/bin/bash
# Creates a new podcast episode with auto-incrementing episode number
# Usage: ./scripts/new-episode.sh "episode-slug"

SLUG="$1"
DATE=$(date +%Y-%m-%d)

if [ -z "$SLUG" ]; then
  echo "Usage: ./scripts/new-episode.sh my-episode-slug"
  exit 1
fi

# Auto-increment episode number
CONTENT_DIR="src/content/podcast"
if [ -d "$CONTENT_DIR" ] && [ "$(ls -A $CONTENT_DIR 2>/dev/null)" ]; then
  LAST_EP=$(ls "$CONTENT_DIR"/ | grep -oP '^\d+' | sort -n | tail -1)
  NEXT_EP=$(printf "%03d" $((10#$LAST_EP + 1)))
else
  NEXT_EP="001"
fi

FILENAME="${CONTENT_DIR}/${NEXT_EP}-${SLUG}.md"

if [ -f "$FILENAME" ]; then
  echo "Error: $FILENAME already exists!"
  exit 1
fi

cat > "$FILENAME" << EOF
---
title: "TRMT #${NEXT_EP} — TITEL HIER"
slug: "${NEXT_EP}-${SLUG}"
episodeNumber: $((10#$NEXT_EP))
date: "${DATE}"
description: "Episode-Beschreibung"
tags: []
category: "weekly-digest"
duration: ""
audioUrl: ""
spotifyId: ""
heroImage: ""
draft: true
blogSlug: ""
videoUrl: ""
chapters:
  - time: "00:00"
    title: "Intro"
---

## Show Notes

### Was wir besprechen
- Punkt 1
- Punkt 2

### Tools & Links
- [Tool](URL) — Beschreibung

### Connect
- Website: therandommakertheory.com
EOF

echo "✅ Created: $FILENAME"
echo "🎙️ Episode: #${NEXT_EP}"
echo "📝 Set draft: false when ready to publish."
