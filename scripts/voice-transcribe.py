#!/usr/bin/env python3
"""
TRMT Voice Transcriber
Transkribiert Telegram Voice Messages mit faster-whisper-xxl (GPU).

Usage:
  python scripts/voice-transcribe.py <audio-file> [--json]
  python scripts/voice-transcribe.py --from-telegram [--json]

Output (JSON):
  {"transcript": "...", "words": 150, "chars": 800, "audio_file": "..."}
"""

import sys
import os
import json
import argparse
import subprocess
import tempfile
import urllib.request
from pathlib import Path
from datetime import datetime

sys.stdout.reconfigure(encoding='utf-8')

WHISPER_EXE = "C:/Tools/WhisperCLI/faster-whisper-xxl.exe"
WHISPER_MODEL = "large-v3-turbo"
VOICE_ARCHIVE_DIR = Path("C:/Users/User/Documents/Claude_Code/trmt/output/voice-transcripts")
TRMT_BOT_TOKEN = "8640657046:AAF-K_v4DJjCUvqANXfSfUZWDlSMTt4bBFA"


def gpu_check():
    """Quick GPU availability check."""
    try:
        result = subprocess.run(
            ['nvidia-smi', '--query-gpu=utilization.gpu,memory.free',
             '--format=csv,noheader,nounits'],
            capture_output=True, text=True, timeout=10
        )
        if result.returncode != 0:
            return True
        parts = result.stdout.strip().split('\n')[0].split(',')
        gpu_util = int(parts[0].strip())
        vram_free = int(parts[1].strip())
        return gpu_util <= 60 and vram_free >= 3000
    except Exception:
        return True


def download_telegram_voice(file_id, output_path):
    """Download Telegram voice message."""
    url = f"https://api.telegram.org/bot{TRMT_BOT_TOKEN}/getFile?file_id={file_id}"
    with urllib.request.urlopen(url) as resp:
        data = json.loads(resp.read())
        file_path = data["result"]["file_path"]

    download_url = f"https://api.telegram.org/file/bot{TRMT_BOT_TOKEN}/{file_path}"
    urllib.request.urlretrieve(download_url, str(output_path))
    return output_path


def transcribe(audio_path):
    """Transkribiere mit faster-whisper-xxl CLI (GPU, large-v3-turbo)."""
    if not Path(WHISPER_EXE).exists():
        print(f"FEHLER: {WHISPER_EXE} nicht gefunden!", file=sys.stderr)
        sys.exit(1)

    with tempfile.TemporaryDirectory() as tmpdir:
        cmd = [
            WHISPER_EXE,
            str(audio_path),
            "--model", WHISPER_MODEL,
            "--language", "de",
            "--device", "cuda",
            "--compute_type", "float16",
            "--output_dir", tmpdir,
            "--output_format", "txt",
            "--beam_size", "5",
            "--vad_filter", "true",
        ]

        result = subprocess.run(
            cmd, capture_output=True, text=True, timeout=300,
            env={**os.environ, "PYTHONIOENCODING": "utf-8"}
        )

        if result.returncode != 0:
            # Fallback: CPU
            cmd[cmd.index("cuda")] = "cpu"
            cmd[cmd.index("float16")] = "int8"
            result = subprocess.run(
                cmd, capture_output=True, text=True, timeout=600,
                env={**os.environ, "PYTHONIOENCODING": "utf-8"}
            )

        # Read output txt
        txt_files = list(Path(tmpdir).glob("*.txt"))
        if txt_files:
            transcript = txt_files[0].read_text(encoding='utf-8').strip()
        else:
            transcript = ""

    return transcript


def archive_transcript(audio_path, transcript):
    """Speichere Transkript im Voice-Archiv."""
    VOICE_ARCHIVE_DIR.mkdir(parents=True, exist_ok=True)

    timestamp = datetime.now().strftime("%Y-%m-%d_%H%M%S")
    archive_file = VOICE_ARCHIVE_DIR / f"{timestamp}.md"
    archive_file.write_text(
        f"# Voice Transkript — {timestamp}\n\n"
        f"**Audio:** {audio_path}\n"
        f"**Woerter:** {len(transcript.split())}\n\n"
        f"---\n\n{transcript}\n",
        encoding='utf-8'
    )
    return archive_file


def main():
    parser = argparse.ArgumentParser(description='TRMT Voice Transcriber')
    parser.add_argument('audio_file', nargs='?', help='Pfad zur Audio-Datei')
    parser.add_argument('--from-telegram', action='store_true',
                        help='Lese file_id von stdin (n8n Modus)')
    parser.add_argument('--file-id', type=str, help='Telegram file_id direkt')
    parser.add_argument('--json', action='store_true', help='JSON Output')
    parser.add_argument('--no-archive', action='store_true',
                        help='Transkript NICHT archivieren')
    args = parser.parse_args()

    # Audio-Quelle bestimmen
    audio_path = None
    cleanup_after = False

    if args.from_telegram:
        input_data = json.loads(sys.stdin.read())
        file_id = input_data.get("file_id")
        tmp = Path(tempfile.gettempdir()) / "telegram_voice.ogg"
        download_telegram_voice(file_id, tmp)
        audio_path = tmp
        cleanup_after = True
    elif args.file_id:
        tmp = Path(tempfile.gettempdir()) / "telegram_voice.ogg"
        download_telegram_voice(args.file_id, tmp)
        audio_path = tmp
        cleanup_after = True
    elif args.audio_file:
        audio_path = Path(args.audio_file)
        if not audio_path.exists():
            error = {"error": f"Datei nicht gefunden: {audio_path}"}
            print(json.dumps(error) if args.json else error["error"])
            sys.exit(1)
    else:
        print("FEHLER: Audio-Datei, --file-id oder --from-telegram angeben!")
        sys.exit(1)

    # GPU Check
    if not gpu_check():
        error = {"error": "gpu_busy", "message": "GPU belegt, bitte spaeter nochmal"}
        print(json.dumps(error) if args.json else error["message"])
        sys.exit(2)

    # Transkribieren
    transcript = transcribe(audio_path)

    if not transcript:
        error = {"error": "empty_transcript", "message": "Transkription leer"}
        print(json.dumps(error) if args.json else error["message"])
        sys.exit(3)

    # Archivieren (default: ja)
    archive_path = None
    if not args.no_archive:
        archive_path = archive_transcript(audio_path, transcript)

    # Cleanup temp files
    if cleanup_after and audio_path.exists():
        audio_path.unlink()

    # Output
    result = {
        "transcript": transcript,
        "words": len(transcript.split()),
        "chars": len(transcript),
        "archive": str(archive_path) if archive_path else None
    }

    if args.json:
        print(json.dumps(result, ensure_ascii=False))
    else:
        print(f"\n--- Transkript ({result['words']} Woerter) ---")
        print(transcript)
        if archive_path:
            print(f"\nArchiviert: {archive_path}")


if __name__ == "__main__":
    main()
