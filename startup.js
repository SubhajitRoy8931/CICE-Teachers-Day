/* =========================================================
   CICE TEACHERS' DAY
   Cinematic start gate.
   ========================================================= */

const startGate = document.createElement('div');

startGate.id = 'startGate';
startGate.innerHTML = `
  <div class="start-glow"></div>
  <div class="start-content">
    <div class="start-brand">CICE</div>
    <div class="start-title">TEACHERS' DAY 2026</div>
    <div class="start-line"></div>
    <button class="start-button" type="button">
      CLICK TO START
    </button>
  </div>
`;

document.body.appendChild(startGate);

const startButton = startGate.querySelector('.start-button');
let experienceStarted = false;

/* Load a script only when it is needed. */
function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');

    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
  });
}

/* The first click starts audio and then launches the website. */
async function startExperience() {
  if (experienceStarted) {
    return;
  }

  experienceStarted = true;
  startButton.disabled = true;
  startGate.classList.add('leaving');

  /* The audio file was preloaded by audio.js. */
  if (window.startBackgroundMusic) {
    window.startBackgroundMusic();
  }

  await waitForAudioStart();

  /* Start the existing cinematic sequence from the beginning. */
  await loadScript('script.js?v=cinematic-start-1');
  await loadScript('memory-fix.js?v=1');

  await new Promise(resolve => setTimeout(resolve, 650));
  startGate.remove();
}

/* Give the audio play request a moment to resolve. */
async function waitForAudioStart() {
  if (!window.musicStartedPromise) {
    return;
  }

  try {
    await window.musicStartedPromise;
  } catch (error) {
    /* The website can still start if audio is unavailable. */
  }
}

/* The button itself is the only start control. */
startButton.addEventListener('click', startExperience);

/* Keep keyboard users out of the start flow without adding another label. */
startGate.addEventListener('keydown', event => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    startExperience();
  }
});

/* Load the audio controller before the visitor clicks. */
loadScript('audio.js?v=start-gate-1').catch(() => {});
