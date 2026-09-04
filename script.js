/* Load the original website logic first. */
document.write('<script src="script-original.js"><\/script>');

/* -------------------- SECTION 05 — PEOPLE -------------------- */

window.people = async function people() {
  const stage = document.querySelector('#peopleStage');
  const caption = document.querySelector('#peopleCaption');
  const captions = ['Different faces.', 'Different beginnings.'];

  stage.innerHTML = '';
  caption.classList.remove('show');

  for (let i = 0; i < assets.people.length; i++) {
    const card = makePhoto(stage, assets.people[i], captions[i]);
    caption.textContent = captions[i];
    card.classList.add('show');
    caption.classList.add('show');
    await wait(3600);
    card.classList.remove('show');
    caption.classList.remove('show');
    await wait(800);
  }

  /* Move directly into Section 06. */
  showScene(5);
  await teacher();
};


/* -------------------- SECTION 06 — TEACHER -------------------- */

window.teacher = async function teacher() {
  const transition = document.querySelector('#teacherTransition');
  const lines = transition.querySelectorAll('.teacher-transition-line');
  const stage = document.querySelector('#teacherStage');
  const caption = document.querySelector('#teacherCaption');

  /* These four filenames control the Section 06 image order. */
  const images = [
    '21 — Sir teaching with projector(2).jpg',
    '18 — Sir addressing a class(2).jpg',
    '19 — Sir helping students at computers.jpg',
    '20 — Students practicing on computers.jpg'
  ];

  /* Each caption matches the image at the same array position. */
  const captions = [
    'Someone who showed us where to begin.',
    'Someone who listened.',
    'Someone who helped.',
    'Until we could do it ourselves.'
  ];

  stage.innerHTML = '';
  caption.classList.remove('show');

  /* Reveal the Section 05 → Section 06 transition. */
  transition.classList.add('show');
  await wait(600);
  lines[0].classList.add('show');
  await wait(1200);
  lines[1].classList.add('show');
  await wait(2200);
  transition.classList.add('exit');
  await wait(900);

  transition.classList.remove('show');
  transition.classList.remove('exit');

  lines.forEach(line => {
    line.classList.remove('show');
  });

  /* Show each Section 06 image with its matching caption. */
  for (let i = 0; i < images.length; i++) {
    const card = makePhoto(stage, images[i], captions[i]);
    caption.textContent = captions[i];
    card.classList.add('show');
    caption.classList.add('show');
    await wait(3800);
    card.classList.remove('show');
    caption.classList.remove('show');
    await wait(850);
  }

  /* Continue to the existing Section 06 closing. */
  const closing = document.querySelector('#teacherClosing');
  closing.classList.add('show');
  await wait(5000);
  closing.classList.remove('show');
  await wait(800);

  showScene(6);
  await impact();
};


/* -------------------- TRANSITION STYLES -------------------- */

const transitionStyle = document.createElement('style');

transitionStyle.textContent = `
.teacher-transition {
  position: absolute;
  inset: 0;
  z-index: 20;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: .35rem;
  background: #020307;
  color: #f5f7fb;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: opacity .9s ease;
}

.teacher-transition.show {
  opacity: 1;
  visibility: visible;
}

.teacher-transition.exit {
  opacity: 0;
}

.teacher-transition-line {
  opacity: 0;
  transform: translateY(14px);
  font-size: clamp(23px, 3vw, 42px);
  line-height: 1.45;
  text-align: center;
  transition: opacity .8s ease, transform .8s ease;
}

.teacher-transition-line.show {
  opacity: 1;
  transform: none;
}
`;

document.head.appendChild(transitionStyle);
