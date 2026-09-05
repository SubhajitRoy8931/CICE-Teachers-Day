/* =========================================================
   CICE TEACHERS' DAY
   Cinematic start gate controller.
   ========================================================= */

const startStyle = document.createElement('style');

startStyle.textContent = `
  #startGate {
    position: fixed;
    inset: 0;
    z-index: 10000;
    display: grid;
    place-items: center;
    overflow: hidden;
    background:
      radial-gradient(circle at center,
        rgba(36,87,214,0.12),
        transparent 46%),
      #020711;
    opacity: 1;
    transition: opacity 1.2s ease;
  }

  #startGate.leaving {
    opacity: 0;
    pointer-events: none;
  }

  #startGate::before {
    content: '';
    position: absolute;
    inset: -20%;
    background: radial-gradient(circle,
      rgba(36,87,214,0.08),
      transparent 48%);
    animation: startGlow 7s ease-in-out infinite;
  }

  .start-gate-content {
    position: relative;
    z-index: 2;
    width: min(88vw, 620px);
    text-align: center;
    transform: translateY(-2vh);
  }

  .start-gate-brand {
    color: #f5f7fb;
    font-size: clamp(34px, 5vw, 58px);
    font-weight: 600;
    letter-spacing: 0.16em;
    opacity: 0;
    animation: startFade 1.5s ease 0.2s forwards;
  }

  .start-gate-title {
    margin-top: 0.8rem;
    color: #aab8cf;
    font-size: clamp(13px, 1.8vw, 18px);
    letter-spacing: 0.34em;
    opacity: 0;
    animation: startFade 1.5s ease 0.8s forwards;
  }

  .start-gate-line {
    width: min(420px, 70vw);
    height: 1px;
    margin: 2.2rem auto 2.4rem;
    background: rgba(110,145,223,0.5);
    transform: scaleX(0);
    transform-origin: center;
    animation: startLine 1.4s ease 1.3s forwards;
  }

  .start-gate-button {
    appearance: none;
    border: 1px solid rgba(110,145,223,0.55);
    border-radius: 999px;
    padding: 13px 30px;
    background: rgba(7,19,38,0.72);
    color: #f5f7fb;
    font: inherit;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.22em;
    cursor: pointer;
    opacity: 0;
    animation:
      startFade 1.2s ease 1.8s forwards,
      startPulse 2.4s ease-in-out 3s infinite;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }

  .start-gate-button:hover {
    border-color: rgba(110,145,223,0.95);
    background: rgba(36,87,214,0.16);
  }

  .start-gate-button:focus-visible {
    outline: 2px solid #6e91df;
    outline-offset: 5px;
  }

  @keyframes startFade {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: none; }
  }

  @keyframes startLine {
    to { transform: scaleX(1); }
  }

  @keyframes startPulse {
    0%, 100% { opacity: 0.72; }
    50% { opacity: 1; }
  }

  @keyframes startGlow {
    0%, 100% { transform: scale(0.92); opacity: 0.7; }
    50% { transform: scale(1.08); opacity: 1; }
  }

  @media (max-width: 700px) {
    .start-gate-title {
      letter-spacing: 0.22em;
    }

    .start-gate-button {
      padding: 12px 24px;
      font-size: 12px;
    }
  }
`;

document.head.appendChild(startStyle);

const startGate = document.querySelector('#startGate');
const startButton = document.querySelector('#startExperience');
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

  /* Audio was loaded before the visitor clicked. */
  if (window.startBackgroundMusic) {
    window.startBackgroundMusic();
  }

  /* Start the existing cinematic sequence from the beginning. */
  await loadScript('script.js?v=cinematic-start-2');
  await loadScript('memory-fix.js?v=1');

  await new Promise(resolve => setTimeout(resolve, 650));
  startGate.remove();
}

/* The button is the single intentional start action. */
startButton.addEventListener('click', startExperience);

/* Load audio before the visitor reaches the start button. */
loadScript('audio.js?v=start-gate-3').catch(() => {});
