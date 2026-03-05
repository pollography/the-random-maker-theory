#!/bin/bash
# Converts audio files to podcast-ready MP3 format
# Usage: ./scripts/process-media.sh input.wav 001 episode-slug

INPUT="$1"
EPISODE="$2"
SLUG="$3"

if [ -z "$INPUT" ] || [ -z "$EPISODE" ] || [ -z "$SLUG" ]; then
  echo "Usage: ./scripts/process-media.sh input.wav 001 episode-slug"
  exit 1
fi

OUTPUT="static/audio/trmt-${EPISODE}-${SLUG}.mp3"
mkdir -p static/audio

# Convert to MP3 (128kbps mono for speech)
ffmpeg -i "$INPUT" \
  -codec:a libmp3lame \
  -b:a 128k \
  -ac 1 \
  -ar 44100 \
  -metadata title="TRMT #${EPISODE}" \
  -metadata artist="The Random Maker Theory" \
  -metadata album="The Random Maker Theory" \
  -metadata track="${EPISODE}" \
  "$OUTPUT"

echo "✅ Output: $OUTPUT"
echo "📦 Size: $(du -h "$OUTPUT" | cut -f1)"
