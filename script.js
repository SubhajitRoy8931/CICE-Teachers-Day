/* Load the existing main script without changing its logic. */
document.write('<script src="script-original.js"><\/script>');

/* Replace only the Section 06 teacher sequence. */
window.teacher = async function teacher() {

  const stage =
    document.querySelector('#teacherStage');

  const caption =
    document.querySelector('#teacherCaption');

  /* Section 06 images in the requested order. */
  const images = [
    '21 — Sir teaching with projector(2).jpg',
    '18 — Sir addressing a class(2).jpg',
    '19 — Sir helping students at computers.jpg',
    '20 — Students practicing on computers.jpg'
  ];

  /* Caption for each teacher image. */
  const captions = [
    'Someone who showed us where to begin.',
    'Someone who listened.',
    'Someone who helped.',
    'Until we could do it ourselves.'
  ];

  stage.innerHTML = '';
  caption.classList.remove('show');

  /* Show the four teacher images. */
  for (let i = 0; i < images.length; i++) {
    const card = makePhoto(
      stage,
      images[i],
      captions[i]
    );

    caption.textContent = captions[i];

    card.classList.add('show');
    caption.classList.add('show');

    await wait(3800);

    card.classList.remove('show');
    caption.classList.remove('show');

    await wait(850);
  }

  /* Keep the existing Section 06 → Section 07 transition. */
  const closing = document.querySelector('#teacherClosing');

  closing.classList.add('show');

  await wait(5000);

  closing.classList.remove('show');

  await wait(800);

  showScene(6);
  await impact();
};