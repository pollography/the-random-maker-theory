#!/bin/bash
# Creates a new blog post with frontmatter
# Usage: ./scripts/new-post.sh "mein-post-slug"

SLUG="$1"
DATE=$(date +%Y-%m-%d)

if [ -z "$SLUG" ]; then
  echo "Usage: ./scripts/new-post.sh my-post-slug"
  exit 1
fi

FILENAME="src/content/blog/${SLUG}.md"

if [ -f "$FILENAME" ]; then
  echo "Error: $FILENAME already exists!"
  exit 1
fi

cat > "$FILENAME" << EOF
---
title: "TITEL HIER"
slug: "${SLUG}"
date: "${DATE}"
description: "Kurze Beschreibung für SEO (max 160 Zeichen)"
tags: []
category: "news"
heroImage: ""
heroAlt: ""
draft: true
episodeNumber: null
episodeSlug: ""
audioUrl: ""
videoUrl: ""
---

Dein Content hier...
EOF

echo "✅ Created: $FILENAME"
echo "📝 Open and edit the file, set draft: false when ready to publish."
