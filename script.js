let currentAudio = null;

function stopAll() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudio = null;
    }
}

function playSound(filePath, btn) {
    stopAll();
    currentAudio = new Audio(filePath);

    currentAudio.play().catch(() => {
        btn.classList.add("missing");
    });
}

function createButton(sound) {
    const btn = document.createElement("button");
    btn.className = "sound-btn";

    const span = document.createElement("span");
    span.className = "btn-text";
    span.textContent = sound.label;
    btn.appendChild(span);

    btn.addEventListener("click", () => playSound(sound.file, btn));
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