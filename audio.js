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

// Create the small mute/unmute control.
const createAudioControl = () => {
  const button = document.createElement('button');

  button.id = 'audioControl';
  button.type = 'button';
  button.textContent = '🔊';
  button.setAttribute('aria-label', 'Mute music');
  button.setAttribute('title', 'Mute music');

  Object.assign(button.style, {
    position: 'fixed',
    right: '22px',
    bottom: '22px',
    zIndex: '9999',
    width: '44px',
    height: '44px',
    border: '1px solid rgba(255,255,255,0.18)',
    borderRadius: '50%',
    background: 'rgba(2,7,17,0.72)',
    color: '#f5f7fb',
    fontSize: '19px',
    lineHeight: '1',
    cursor: 'pointer',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    boxShadow: '0 4px 18px rgba(0,0,0,0.28)',
    transition: 'opacity 0.3s ease, transform 0.2s ease'
  });

  // Keep the button subtle on small screens.
  if (window.matchMedia('(max-width: 700px)').matches) {
    button.style.right = '14px';
    button.style.bottom = '14px';
    button.style.width = '40px';
    button.style.height = '40px';
    button.style.fontSize = '17px';
  }

  // Prevent the global audio-unlock listener from firing first.
  button.addEventListener('pointerdown', event => {
    event.stopPropagation();
  });

  // Toggle mute without restarting the music.
  button.addEventListener('click', async () => {
    if (!musicStarted) {
      const started = await startBackgroundMusic();

      if (!started) {
        return;
      }

      backgroundMusic.muted = false;
      updateAudioControl();
      return;
    }

    backgroundMusic.muted = !backgroundMusic.muted;
    updateAudioControl();
  });

  document.body.appendChild(button);
};

// Update the icon and accessibility text after every toggle.
const updateAudioControl = () => {
  const button = document.querySelector('#audioControl');

  if (!button) {
    return;
  }

  const muted = backgroundMusic.muted;

  button.textContent = muted ? '🔇' : '🔊';
  button.setAttribute(
    'aria-label',
    muted ? 'Unmute music' : 'Mute music'
  );
  button.setAttribute(
    'title',
    muted ? 'Unmute music' : 'Mute music'
  );
};

// Start music from the same user interaction that unlocks audio.
const startBackgroundMusic = () => {
  if (musicStarted) {
    return Promise.resolve(true);
  }

  return backgroundMusic.play()
    .then(() => {
      musicStarted = true;
      removeAudioUnlockListeners();
      updateAudioControl();
      return true;
    })
    .catch(() => {
      // Keep listening until the browser allows playback.
      return false;
    });
};

// Make the starter available to other website scripts if needed.
window.startBackgroundMusic = startBackgroundMusic;

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

// Add the control after the page structure has loaded.
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', createAudioControl);
} else {
  createAudioControl();
}

/*
   Audible autoplay is blocked by modern browsers unless
   the visitor has interacted with the page.
   There is no reliable JavaScript bypass for that policy.
   The first natural interaction now starts the music.
*/
