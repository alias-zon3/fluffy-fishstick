#!/usr/bin/env bash
# setup.sh — Download the actual Bradley Walsh sound clips into assets/
# Requires: yt-dlp and ffmpeg
# Usage:    ./setup.sh
set -euo pipefail

SOUNDS_JSON="sounds.json"
ASSETS_DIR="assets"

check_deps() {
    for cmd in yt-dlp ffmpeg python3; do
        if ! command -v "$cmd" &>/dev/null; then
            echo "Error: '$cmd' is required but not installed."
            echo "  Install yt-dlp:  pip install yt-dlp"
            echo "  Install ffmpeg:  https://ffmpeg.org/download.html"
            echo "  Install python3: https://www.python.org/downloads/"
            exit 1
        fi
    done
}

download_clip() {
    local url="$1" start="$2" duration="$3" output="$4"

    if [ -f "$output" ]; then
        echo "  ✓ Already exists: $output"
        return
    fi

    echo "  ↓ Downloading: $output"
    local tmpfile
    tmpfile=$(mktemp "${TMPDIR:-/tmp}/clip-XXXXXX.webm")

    yt-dlp \
        --no-playlist \
        --extract-audio \
        --audio-format best \
        --output "$tmpfile" \
        --force-overwrites \
        --quiet \
        "$url" || { echo "  ✗ Failed to download from $url"; rm -f "$tmpfile"; return 1; }

    ffmpeg -y -i "$tmpfile" -ss "$start" -t "$duration" -codec:a libmp3lame -q:a 4 "$output" \
        -loglevel error || { echo "  ✗ Failed to convert: $output"; rm -f "$tmpfile"; return 1; }

    rm -f "$tmpfile"
    echo "  ✓ Saved: $output"
}

main() {
    check_deps

    if [ ! -f "$SOUNDS_JSON" ]; then
        echo "Error: $SOUNDS_JSON not found. Run this script from the project root."
        exit 1
    fi

    mkdir -p "$ASSETS_DIR"

    echo "Downloading Bradley Walsh sound clips..."
    echo ""

    # Parse sounds.json once
    local clips
    clips=$(python3 -c "
import json
with open('$SOUNDS_JSON') as f:
    data = json.load(f)
for s in data:
    print(s['label'] + '\t' + s['source'] + '\t' + s['start'] + '\t' + str(s['duration']) + '\t' + s['file'])
")

    local total
    total=$(echo "$clips" | wc -l)
    local idx=0

    while IFS=$'\t' read -r label source start duration file; do
        idx=$((idx + 1))
        echo "[$idx/$total] $label"
        download_clip "$source" "$start" "$duration" "$file"
        echo ""
    done <<< "$clips"

    echo "Done! Open index.html to use the soundboard."
}

main
