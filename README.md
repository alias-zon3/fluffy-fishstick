# fluffy-fishstick

## Bradley Walsh Soundboard 🎵

A fun soundboard featuring classic Bradley Walsh moments from *The Chase*.

### Quick Start

1. **Install dependencies** — you need [yt-dlp](https://github.com/yt-dlp/yt-dlp) and [ffmpeg](https://ffmpeg.org/download.html):
   ```bash
   pip install yt-dlp
   # ffmpeg: https://ffmpeg.org/download.html
   ```

2. **Download the sound clips**:
   ```bash
   ./setup.sh
   ```
   This reads `sounds.json` and automatically downloads each clip into `assets/`.

3. **Open the soundboard**:
   ```bash
   open index.html   # macOS
   xdg-open index.html  # Linux
   ```

### Adding New Clips

Add an entry to `sounds.json`:
```json
{
    "id": "my-clip",
    "label": "My Clip",
    "file": "assets/my-clip.mp3",
    "source": "https://www.youtube.com/watch?v=VIDEO_ID",
    "start": "0:10",
    "duration": 5
}
```
Then run `./setup.sh` again — it only downloads missing clips.

### Sound Clips

| Button | Clip |
|--------|------|
| Fanny Chmelar | Bradley's infamous laughing fit over the name |
| The Laugh | Classic Bradley Walsh laugh compilation |
| The Chase Intro | Opening moments from the show |
| It Is What It Is | Bradley unable to keep a straight face |
