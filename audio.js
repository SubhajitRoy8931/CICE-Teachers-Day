/* =========================================================
   CICE TEACHERS' DAY
   Background music control.
   ========================================================= */

const backgroundMusic = new Audio(
  'assets/CICE_Teachers_Day_3m38s_CONTINUOUS.mp3'
);

backgroundMusic.id = 'ciceBackgroundMusic';
backgroundMusic.preload = 'auto';
backgroundMusic.loop = true;
backgroundMusic.volume = 0.42;
backgroundMusic.setAttribute('aria-hidden', 'true');

let musicStarted = false;

/* Start music from the user's Click to Start interaction. */
const startBackgroundMusic = () => {
  if (musicStarted) {
    return Promise.resolve(true);
  }

  return backgroundMusic.play()
    .then(() => {
      musicStarted = true;
      return true;
    })
    .catch(() => false);
};

/* Make the starter available to startup.js. */
window.startBackgroundMusic = startBackgroundMusic;

/* Pause music when the website is no longer visible. */
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
