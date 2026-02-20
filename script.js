let currentAudio = null;

document.querySelectorAll('.sound-btn').forEach(button => {
    button.addEventListener('click', () => {
        const soundPath = button.getAttribute('data-sound');
        
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }

        currentAudio = new Audio(soundPath);
        
        currentAudio.play().catch(error => {
            console.error("Error playing audio:", error);
            alert("Audio file not found! Make sure you've uploaded your .mp3 files to the assets folder.");
        });
    });
});

document.getElementById('stop-all').addEventListener('click', () => {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }
});