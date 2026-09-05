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

// Track whether the user has unlocked audio playback.
let musicStarted = false;

// Start or resume the music after a user gesture.
const startBackgroundMusic = () => {
  if (musicStarted) {
    return;
  }

  backgroundMusic.play()
    .then(() => {
      musicStarted = true;
    })
    .catch(() => {
      // The browser may still block playback.
    });
};

// Unlock audio with the first real interaction.
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

// Pause music when the website is no longer visible.
document.addEventListener(
  'visibilitychange',
  () => {
    if (document.hidden) {
      backgroundMusic.pause();
      return;
    }

    if (musicStarted) {
      backgroundMusic.play().catch(() => {});
    }
  }
);

// Try autoplay on browsers that permit it.
startBackgroundMusic();
