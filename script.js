let player = null;
let stopTimer = null;
let activeBtn = null;
let ytReady = false;

function loadYouTubeAPI() {
    return new Promise(resolve => {
        if (window.YT && window.YT.Player) {
            ytReady = true;
            resolve();
            return;
        }
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(tag);
        window.onYouTubeIframeAPIReady = function () {
            ytReady = true;
            resolve();
        };
        tag.onerror = function () {
            console.warn("YouTube API unavailable — playback disabled.");
            resolve();
        };
    });
}

function stopPlayback() {
    if (stopTimer) {
        clearTimeout(stopTimer);
        stopTimer = null;
    }
    if (player && typeof player.stopVideo === "function") {
        player.stopVideo();
    }
    if (activeBtn) {
        activeBtn.classList.remove("playing");
        activeBtn = null;
    }
}

function playClip(sound, btn) {
    if (!ytReady) return;

    stopPlayback();

    activeBtn = btn;
    btn.classList.add("playing");

    if (player) {
        player.loadVideoById({
            videoId: sound.videoId,
            startSeconds: sound.start,
            endSeconds: sound.start + sound.duration
        });
    } else {
        player = new YT.Player("yt-player-wrap", {
            height: "1",
            width: "1",
            videoId: sound.videoId,
            playerVars: {
                autoplay: 1,
                start: sound.start,
                end: sound.start + sound.duration,
                controls: 0
            },
            events: {
                onStateChange: function (e) {
                    if (e.data === YT.PlayerState.ENDED) {
                        stopPlayback();
                    }
                }
            }
        });
    }

    // Extra buffer so the timer doesn't cut off before YouTube ends naturally
    stopTimer = setTimeout(stopPlayback, sound.duration * 1000 + 500);
}

function createButton(sound) {
    const btn = document.createElement("button");
    btn.className = "sound-btn";

    const span = document.createElement("span");
    span.className = "btn-text";
    span.textContent = sound.label;
    btn.appendChild(span);

    btn.addEventListener("click", () => playClip(sound, btn));
    return btn;
}

async function loadSoundboard() {
    const board = document.getElementById("soundboard");
    try {
        const response = await fetch("sounds.json");
        if (!response.ok) {
            throw new Error("HTTP " + response.status);
        }
        const sounds = await response.json();

        sounds.forEach(sound => {
            board.appendChild(createButton(sound));
        });

        loadYouTubeAPI();
    } catch (error) {
        console.error("Failed to load soundboard:", error);
        board.innerHTML = "<p>Could not load soundboard data.</p>";
    }
}

document.getElementById("stop-all").addEventListener("click", stopPlayback);

loadSoundboard();