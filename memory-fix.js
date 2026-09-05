/* =========================================================
   MEMORY OPENING FIX
   Keeps the two opening lines stable before the mosaic.
   ========================================================= */

async function memory() {
  const opening = document.querySelector('#memoryOpening');
  const openingLines = [
    ...opening.querySelectorAll('p')
  ];
  const mosaic = document.querySelector('#mosaic');

  mosaic.innerHTML = '';

  /* Make the parent fully visible without a fade. */
  opening.classList.add('show');
  opening.style.opacity = '1';
  opening.style.visibility = 'visible';
  opening.style.transition = 'none';

  /* Reset every line before starting the sequence. */
  openingLines.forEach(line => {
    line.style.opacity = '0';
    line.style.visibility = 'hidden';
    line.style.transform = 'translateY(12px)';
    line.style.transition = 'none';
  });

  /* Force the browser to commit the hidden state first. */
  void opening.offsetHeight;

  /* Reveal the first line. */
  openingLines[0].style.visibility = 'visible';
  openingLines[0].style.transition =
    'opacity 0.8s ease, transform 0.8s ease';
  openingLines[0].style.opacity = '1';
  openingLines[0].style.transform = 'none';

  /* Wait before revealing the second line. */
  await wait(2500);

  /* Reveal the second line and keep it fully visible. */
  openingLines[1].style.visibility = 'visible';
  openingLines[1].style.transition =
    'opacity 0.8s ease, transform 0.8s ease';
  openingLines[1].style.opacity = '1';
  openingLines[1].style.transform = 'none';

  /* Keep both lines visible together. */
  await wait(4000);

  /* Hide the opening only after the full pause. */
  opening.style.opacity = '0';
  opening.style.visibility = 'hidden';

  /* Create all 50 frames before loading them. */
  const images = assets.memory.map(
    (name, index) => ({
      img: createMemoryPhoto(name, index, mosaic),
      name,
      index
    })
  );

  /* Load every real file in assets/memory/. */
  await Promise.all(
    images.map(item =>
      loadMemoryPhoto(item.img, item.name)
    )
  );

  /* Reveal loaded photos in sequence. */
  await Promise.all(
    images.map(item =>
      revealMemoryPhoto(item.img, item.index)
    )
  );

  await wait(3200);

  showScene(8);
  await poetry();
}
