# fluffy-fishstick

## The Chase — Bradley Walsh Soundboard 🎵

A fun soundboard featuring classic Bradley Walsh moments from *The Chase*, styled with the show's signature blue theme.

### How It Works

1. Open `index.html` in a browser
2. Tap a button to hear the clip
3. Tap **⏹ Stop** to stop playback

No downloads or setup required — clips stream directly from YouTube in a hidden player.

### Adding New Clips

Add an entry to `sounds.json`:
```json
{
    "id": "my-clip",
    "label": "My Clip",
    "videoId": "YOUTUBE_VIDEO_ID",
    "start": 10,
    "duration": 5
}
```
- `videoId` — the YouTube video ID (the part after `v=`)
- `start` — start time in seconds
- `duration` — how many seconds to play

### Sound Clips

| Button | Clip |
|--------|------|
| Fanny Chmelar | Bradley's infamous laughing fit over the name |
| The Laugh | Classic Bradley Walsh laugh compilation |
| The Chase Intro | Opening moments from the show |
| It Is What It Is | Bradley unable to keep a straight face |
