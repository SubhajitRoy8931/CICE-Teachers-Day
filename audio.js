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

// Start music from one user gesture.
let musicStarted = false;

const startBackgroundMusic = () => {
  if (musicStarted) {
    return;
  }

  backgroundMusic.play()
    .then(() => {
      musicStarted = true;
    })
    .catch(() => {
      // Mobile browsers may still block playback.
    });
};

// Use a real user gesture for mobile browsers.
window.addEventListener(
  'click',
  startBackgroundMusic,
  { once: true }
);

window.addEventListener(
  'touchend',
  startBackgroundMusic,
  { once: true, passive: true }
);

// Try autoplay too; desktop browsers may allow it.
startBackgroundMusic();
