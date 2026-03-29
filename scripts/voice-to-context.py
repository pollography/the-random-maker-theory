#!/usr/bin/env python3
"""
TRMT Voice-to-Context Pipeline
Transkribiert Telegram-Sprachnachrichten und erstellt ein NLM Context-Dokument.

Usage:
  python scripts/voice-to-context.py <audio-file> [--slug <slug>] [--title <title>]
  python scripts/voice-to-context.py --from-telegram  (fuer n8n Webhook-Modus)

Flow:
  1. Audio empfangen (Datei oder Telegram Download)
  2. GPU-Check (Ollama Safeguard)
  3. Faster Whisper Transkription (large-v3, GPU)
  4. Transkript bereinigen + als Context-Doc formatieren
  5. Output: context-doc.md im Output-Ordner
  6. Optional: Direkt als NLM Source hinzufuegen
"""

import sys
import os
import json
import argparse
import subprocess
import time
from pathlib import Path
from datetime import datetime

sys.stdout.reconfigure(encoding='utf-8')

PROJECT_ROOT = Path(__file__).parent.parent
OUTPUT_BASE = PROJECT_ROOT.parent / "trmt" / "output" / "content-engine"


def gpu_check():
    """Ollama Safeguard: Check GPU availability before loading Whisper."""
    try:
        result = subprocess.run(
            ['nvidia-smi', '--query-gpu=utilization.gpu,memory.free',
             '--format=csv,noheader,nounits'],
            capture_output=True, text=True, timeout=10
        )
        if result.returncode != 0:
            print("WARNUNG: nvidia-smi nicht verfuegbar, starte trotzdem...")
            return True

        lines = result.stdout.strip().split('\n')
        for line in lines:
            parts = line.split(',')
            gpu_util = int(parts[0].strip())
            vram_free = int(parts[1].strip())

            if gpu_util > 60:
                print(f"GPU Auslastung {gpu_util}% > 60% — SKIP (Gaming aktiv?)")
                return False
            if vram_free < 4000:
                print(f"VRAM frei {vram_free}MB < 4GB — SKIP")
                return False

        return True
    except Exception as e:
        print(f"GPU-Check Fehler: {e} — starte trotzdem...")
        return True


def transcribe(audio_path, model_size="large-v3-turbo"):
    """Transkribiere Audio mit faster-whisper-xxl CLI (GPU)."""
    import tempfile

    WHISPER_EXE = "C:/Tools/WhisperCLI/faster-whisper-xxl.exe"
    print(f"Transkribiere mit faster-whisper-xxl ({model_size}): {audio_path}")

    with tempfile.TemporaryDirectory() as tmpdir:
        cmd = [
            WHISPER_EXE, str(audio_path),
            "--model", model_size,
            "--language", "de",
            "--device", "cuda",
            "--compute_type", "float16",
            "--output_dir", tmpdir,
            "--output_format", "txt",
            "--beam_size", "5",
            "--vad_filter", "true",
        ]

        start = time.time()
        result = subprocess.run(
            cmd, capture_output=True, text=True, timeout=300,
            env={**os.environ, "PYTHONIOENCODING": "utf-8"}
        )

        if result.returncode != 0:
            print(f"GPU fehlgeschlagen, Fallback auf CPU...")
            cmd[cmd.index("cuda")] = "cpu"
            cmd[cmd.index("float16")] = "int8"
            result = subprocess.run(cmd, capture_output=True, text=True, timeout=600)

        txt_files = list(Path(tmpdir).glob("*.txt"))
        transcript = txt_files[0].read_text(encoding='utf-8').strip() if txt_files else ""

    elapsed = time.time() - start
    print(f"Transkription fertig: {len(transcript)} Zeichen in {elapsed:.1f}s")
    return transcript


def format_context_doc(transcript, title=None, slug=None):
    """Formatiere Transkript als TRMT Context-Dokument fuer NLM."""
    date = datetime.now().strftime("%Y-%m-%d")

    doc = f"""# Persoenlicher Kontext: {title or 'Sprachnachricht'}

**Datum:** {date}
**Quelle:** Telegram Sprachnachricht (transkribiert mit Faster Whisper)
**Typ:** Persoenlicher Erfahrungsbericht / Setup-Beschreibung

---

## Transkript

{transcript}

---

## Hinweise fuer die Artikel-Erstellung

- Dieses Dokument ist die HAUPTQUELLE fuer persoenliche Erfahrungen und Meinungen
- Web-Recherche soll Fakten und Zahlen ergaenzen, aber nicht die persoenliche Perspektive ersetzen
- Der Autor (TRMT) spricht aus eigener Erfahrung — "ich" Perspektive beibehalten
- Direkte Zitate aus dem Transkript sind erlaubt und erwuenscht
"""

    if slug:
        doc += f"\n**Ziel-Artikel:** {slug}\n"

    return doc


def save_context_doc(content, slug=None, output_dir=None):
    """Speichere Context-Dokument."""
    if output_dir:
        out_dir = Path(output_dir)
    elif slug:
        date = datetime.now().strftime("%Y-%m-%d")
        out_dir = OUTPUT_BASE / f"{date}-{slug}"
    else:
        out_dir = OUTPUT_BASE / "voice-context"

    out_dir.mkdir(parents=True, exist_ok=True)
    out_path = out_dir / "context-doc.md"
    out_path.write_text(content, encoding='utf-8')
    print(f"Context-Doc gespeichert: {out_path}")
    return out_path


def add_to_nlm(context_path, notebook_id=None):
    """Fuege Context-Doc als Source zu NotebookLM hinzu."""
    if not notebook_id:
        print("Kein Notebook-ID angegeben, ueberspringe NLM-Upload.")
        return None

    cmd = [
        "notebooklm", "source", "add",
        str(context_path),
        "--title", "Persoenlicher Kontext (HAUPTQUELLE)",
        "-n", notebook_id,
        "--json"
    ]

    env = os.environ.copy()
    env["PYTHONIOENCODING"] = "utf-8"

    result = subprocess.run(cmd, capture_output=True, text=True, env=env)
    if result.returncode == 0:
        print(f"NLM Source hinzugefuegt: {context_path}")
        try:
            data = json.loads(result.stdout)
            return data.get("source_id")
        except json.JSONDecodeError:
            return None
    else:
        print(f"NLM Upload fehlgeschlagen: {result.stderr}")
        return None


def download_telegram_voice(file_id, bot_token, output_path):
    """Lade Telegram Voice Message herunter."""
    import urllib.request

    # Get file path from Telegram API
    url = f"https://api.telegram.org/bot{bot_token}/getFile?file_id={file_id}"
    with urllib.request.urlopen(url) as resp:
        data = json.loads(resp.read())
        file_path = data["result"]["file_path"]

    # Download file
    download_url = f"https://api.telegram.org/file/bot{bot_token}/{file_path}"
    urllib.request.urlretrieve(download_url, output_path)
    print(f"Telegram Voice heruntergeladen: {output_path}")
    return output_path


def main():
    parser = argparse.ArgumentParser(description='TRMT Voice-to-Context Pipeline')
    parser.add_argument('audio_file', nargs='?', help='Pfad zur Audio-Datei')
    parser.add_argument('--slug', type=str, help='Artikel-Slug fuer Zuordnung')
    parser.add_argument('--title', type=str, help='Titel des Context-Docs')
    parser.add_argument('--notebook', type=str, help='NLM Notebook-ID fuer direkten Upload')
    parser.add_argument('--output', type=str, help='Output-Verzeichnis')
    parser.add_argument('--model', type=str, default='large-v3',
                        choices=['tiny', 'base', 'small', 'medium', 'large-v3'],
                        help='Whisper Model (default: large-v3)')
    parser.add_argument('--from-telegram', action='store_true',
                        help='n8n Webhook-Modus: liest JSON von stdin')
    parser.add_argument('--json', action='store_true', help='JSON Output')
    args = parser.parse_args()

    # Telegram Webhook-Modus (fuer n8n)
    if args.from_telegram:
        input_data = json.loads(sys.stdin.read())
        file_id = input_data.get("file_id")
        bot_token = input_data.get("bot_token", "8640657046:AAF-K_v4DJjCUvqANXfSfUZWDlSMTt4bBFA")
        args.slug = input_data.get("slug", args.slug)
        args.title = input_data.get("title", args.title)
        args.notebook = input_data.get("notebook_id", args.notebook)

        # Download voice message
        tmp_path = Path("C:/Users/User/AppData/Local/Temp/telegram_voice.ogg")
        download_telegram_voice(file_id, bot_token, tmp_path)
        audio_path = tmp_path
    elif args.audio_file:
        audio_path = Path(args.audio_file)
        if not audio_path.exists():
            print(f"FEHLER: Datei nicht gefunden: {audio_path}")
            sys.exit(1)
    else:
        print("FEHLER: Audio-Datei oder --from-telegram angeben!")
        sys.exit(1)

    # GPU Check
    if not gpu_check():
        print("GPU nicht verfuegbar. Verschiebe auf spaeter.")
        if args.json:
            print(json.dumps({"status": "skipped", "reason": "gpu_busy"}))
        sys.exit(2)

    # Transkription
    transcript = transcribe(audio_path, model_size=args.model)

    # Context-Doc erstellen
    context_content = format_context_doc(transcript, title=args.title, slug=args.slug)
    context_path = save_context_doc(context_content, slug=args.slug, output_dir=args.output)

    # Optional: NLM Upload
    source_id = None
    if args.notebook:
        source_id = add_to_nlm(context_path, args.notebook)

    # Output
    result = {
        "status": "ok",
        "transcript_length": len(transcript),
        "context_doc": str(context_path),
        "nlm_source_id": source_id,
        "slug": args.slug
    }

    if args.json:
        print(json.dumps(result, ensure_ascii=False))
    else:
        print(f"\n{'='*50}")
        print(f"Voice-to-Context Pipeline FERTIG")
        print(f"{'='*50}")
        print(f"Transkript: {len(transcript)} Zeichen")
        print(f"Context-Doc: {context_path}")
        if source_id:
            print(f"NLM Source: {source_id}")
        print(f"{'='*50}")

    # Cleanup temp file
    if args.from_telegram:
        try:
            audio_path.unlink()
        except Exception:
            pass


if __name__ == "__main__":
    main()
