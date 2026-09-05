/* =========================================================
   CICE TEACHERS' DAY
   Background music
   ========================================================= */

const backgroundMusic = new Audio(
  'https://firestorage.ai/ja/f/FzdOqmAqDtq_'
);

backgroundMusic.id = 'ciceBackgroundMusic';
backgroundMusic.preload = 'auto';
backgroundMusic.loop = false;
backgroundMusic.volume = 0.42;
backgroundMusic.setAttribute('aria-hidden', 'true');

// Keep the audio independent from scene changes.
backgroundMusic.addEventListener('ended', () => {
  backgroundMusic.currentTime = 0;
});

// Try autoplay first. Browsers may block sound until interaction.
const startBackgroundMusic = () => {
  backgroundMusic.play().catch(() => {});
};

startBackgroundMusic();

// Start on the first user interaction if autoplay was blocked.
['pointerdown', 'keydown', 'touchstart'].forEach(eventName => {
  window.addEventListener(
    eventName,
    startBackgroundMusic,
    { once: true, passive: true }
  );
});
