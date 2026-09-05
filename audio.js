/* =========================================================
   CICE TEACHERS' DAY
   Background music from the GitHub repository.
   ========================================================= */

const backgroundMusic = new Audio(
  'assets/CICE_Teachers_Day_3m38s_CONTINUOUS.mp3'
);

backgroundMusic.id = 'ciceBackgroundMusic';
backgroundMusic.preload = 'auto';
backgroundMusic.loop = true;
backgroundMusic.volume = 0.42;
backgroundMusic.setAttribute('aria-hidden', 'true');

// Start after the first user interaction.
const startBackgroundMusic = () => {
  backgroundMusic.play().catch(() => {});
};

['pointerdown', 'keydown', 'touchstart'].forEach(eventName => {
  window.addEventListener(
    eventName,
    startBackgroundMusic,
    { once: true, passive: true }
  );
});

// Try immediately as well; browsers may allow it.
startBackgroundMusic();
