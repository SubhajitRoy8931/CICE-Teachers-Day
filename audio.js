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

// Track whether the browser has allowed audio playback.
let musicStarted = false;

// Start music from the same user interaction that unlocks audio.
const startBackgroundMusic = () => {
  if (musicStarted) {
    return;
  }

  backgroundMusic.play()
    .then(() => {
      musicStarted = true;
      removeAudioUnlockListeners();
    })
    .catch(() => {
      // Keep listening until the browser allows playback.
    });
};

// Remove the temporary unlock listeners after playback starts.
const removeAudioUnlockListeners = () => {
  window.removeEventListener(
    'pointerdown',
    startBackgroundMusic
  );

  window.removeEventListener(
    'keydown',
    startBackgroundMusic
  );
};

// pointerdown works consistently on laptop and mobile browsers.
window.addEventListener(
  'pointerdown',
  startBackgroundMusic
);

// A keyboard action can also unlock audio on supported browsers.
window.addEventListener(
  'keydown',
  startBackgroundMusic
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

/*
   Audible autoplay is blocked by modern browsers unless
   the visitor has interacted with the page.
   There is no reliable JavaScript bypass for that policy.
   The first natural interaction now starts the music.
*/
