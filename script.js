let currentAudio = null;
let currentUtterance = null;

function stopAll() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudio = null;
    }
    if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
    }
    currentUtterance = null;
}

function speakText(sound) {
    stopAll();
    const utterance = new SpeechSynthesisUtterance(sound.speech);
    utterance.rate = sound.rate || 1.0;
    utterance.pitch = sound.pitch || 1.0;
    utterance.lang = "en-GB";
    currentUtterance = utterance;
    window.speechSynthesis.speak(utterance);
}

function tryPlayFile(sound) {
    stopAll();
    const audio = new Audio(sound.file);
    currentAudio = audio;

    audio.play().then(() => {
        // MP3 file played successfully
    }).catch(() => {
        // MP3 not available — fall back to Web Speech API
        currentAudio = null;
        speakText(sound);
    });
}

function createButton(sound) {
    const btn = document.createElement("button");
    btn.className = "sound-btn";

    const span = document.createElement("span");
    span.className = "btn-text";
    span.textContent = sound.label;
    btn.appendChild(span);

    btn.addEventListener("click", () => tryPlayFile(sound));
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
    } catch (error) {
        console.error("Failed to load sounds.json:", error);
        board.innerHTML = "<p>Could not load soundboard data.</p>";
    }
}

document.getElementById("stop-all").addEventListener("click", stopAll);

loadSoundboard();