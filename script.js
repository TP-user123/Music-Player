// script.js
document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('audio');
    const playButton = document.getElementById('play');
    const pauseButton = document.getElementById('pause');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const seekBar = document.getElementById('seek-bar');
    const volumeControl = document.getElementById('volume');
    const speedControl = document.getElementById('speed');
    const fileInput = document.getElementById('file-input');

    let currentTrackIndex = 0;
    let tracks = [];

    fileInput.addEventListener('change', (event) => {
        const files = event.target.files;
        tracks = Array.from(files).map(file => URL.createObjectURL(file));
        if (tracks.length > 0) {
            loadTrack(0);
        }
    });

    function loadTrack(index) {
        if (tracks[index]) {
            audio.src = tracks[index];
            audio.play();
            document.getElementById('album-image').src = 'https://via.placeholder.com/300'; // Placeholder image
            document.getElementById('song-title').textContent = 'Song ' + (index + 1);
            document.getElementById('artist-name').textContent = 'Artist ' + (index + 1);
        }
    }

    playButton.addEventListener('click', () => {
        if (audio.src) {
            audio.play();
        }
    });

    pauseButton.addEventListener('click', () => {
        if (audio.src) {
            audio.pause();
        }
    });

    prevButton.addEventListener('click', () => {
        currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
        loadTrack(currentTrackIndex);
    });

    nextButton.addEventListener('click', () => {
        currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
        loadTrack(currentTrackIndex);
    });

    audio.addEventListener('timeupdate', () => {
        const progress = (audio.currentTime / audio.duration) * 100;
        seekBar.value = progress;
    });

    seekBar.addEventListener('input', () => {
        const newTime = (seekBar.value / 100) * audio.duration;
        audio.currentTime = newTime;
    });

    volumeControl.addEventListener('input', () => {
        audio.volume = volumeControl.value;
    });

    speedControl.addEventListener('change', () => {
        audio.playbackRate = parseFloat(speedControl.value);
    });
});
