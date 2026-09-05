/* =========================================================
   CICE TEACHERS' DAY
   Background music and sound control
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

// Start music from the Start Experience click.
const startBackgroundMusic = () => {
  if (musicStarted) {
    return Promise.resolve(true);
  }

  return backgroundMusic.play()
    .then(() => {
      musicStarted = true;
      updateAudioControl();
      return true;
    })
    .catch(() => {
      return false;
    });
};

// Make the starter available to the main website script.
window.startBackgroundMusic = startBackgroundMusic;

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
