#!/bin/bash
# TRMT Deploy Script - Ein Befehl zum Deployen
# Usage: ./deploy.sh

echo ""
echo "===================================="
echo " TRMT Deploy - therandommakertheory.com"
echo "===================================="
echo ""

cd "$(dirname "$0")"

# Zeige Aenderungen
echo "Geaenderte Dateien:"
echo "-------------------"
git status --short
echo ""

# Alles stagen und committen
git add -A
TIMESTAMP=$(date '+%Y-%m-%d %H:%M')
git commit -m "content: update $TIMESTAMP"

if [ $? -ne 0 ]; then
    echo ""
    echo "Nichts zu deployen - alles aktuell!"
    exit 0
fi

# Push
echo ""
echo "Pushing to GitHub..."
git push origin main

if [ $? -ne 0 ]; then
    echo ""
    echo "Push fehlgeschlagen!"
    exit 1
fi

echo ""
echo "===================================="
echo " DEPLOYED! Vercel baut jetzt..."
echo " Live in ~30 Sekunden auf:"
echo " https://therandommakertheory.com"
echo "===================================="
