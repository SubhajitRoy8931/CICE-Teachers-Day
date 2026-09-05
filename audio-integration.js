/* =========================================================
   CICE TEACHERS' DAY — WEBSITE AUDIO
   Plays the same background music throughout the experience.
   ========================================================= */

(() => {
  const audio = document.createElement('audio');

  // Use the approved 3:38 continuous Teachers' Day track.
  audio.id = 'siteAudio';
  audio.src = 'https://infoseek.ai/pub/shared/?f=d3d0e53cf0f9bce5.mp3';
  audio.preload = 'auto';
  audio.loop = true;
  audio.volume = 0.72;
  audio.setAttribute('aria-hidden', 'true');
  audio.style.display = 'none';

  document.body.appendChild(audio);

  // Try to start automatically when the experience loads.
  const startAudio = () => {
    audio.play().catch(() => {
      // Browsers may block audible autoplay until the first interaction.
    });
  };

  startAudio();

  // If autoplay was blocked, the first click or key press starts it.
  const unlockAudio = () => {
    audio.play().catch(() => {});
    document.removeEventListener('pointerdown', unlockAudio);
    document.removeEventListener('keydown', unlockAudio);
  };

  document.addEventListener('pointerdown', unlockAudio, { once: true });
  document.addEventListener('keydown', unlockAudio, { once: true });
})();
