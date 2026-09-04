/* ---------------------------------------------------------
   Impact sequence override
   Keeps the existing counter and changes only its presentation.
   --------------------------------------------------------- */

/* Give every photographic frame a little more breathing room. */
const photoSizeStyle = document.createElement('style');
photoSizeStyle.textContent = `
  .photo-card {
    inset: 9vh 9vw 14vh;
  }

  @media (max-width: 700px) {
    .photo-card {
      inset: 10vh 5vw 17vh;
    }
  }
`;
document.head.appendChild(photoSizeStyle);

async function impact() {
  const captions = [
    ['And then, we begin to use what we learned.'],
    ['One step becomes a milestone.'],
    ['A milestone becomes a new beginning.']
  ];

  const stage = document.querySelector('#impactStage');
  const caption = document.querySelector('#impactCaption');
  stage.innerHTML = '';

  for (let i = 0; i < assets.impact.length; i++) {
    const card = makePhoto(
      stage,
      assets.impact[i],
      captions[i].join(' ')
    );

    caption.innerHTML = captions[i].join('<br>');
    card.classList.add('show');
    caption.classList.add('show');

    await wait(i === 2 ? 4200 : 3800);
    card.classList.remove('show');
    caption.classList.remove('show');
    await wait(900);
  }

  const screen = document.querySelector('#counterScreen');
  const counter = document.querySelector('#studentCounter');

  /* Build the final counter layout without changing the existing HTML. */
  const content = document.createElement('div');
  const lead = document.createElement('div');
  const years = document.createElement('div');
  const institution = document.createElement('div');
  const teacher = document.createElement('div');
  const taught = document.createElement('div');

  content.style.display = 'flex';
  content.style.flexDirection = 'column';
  content.style.alignItems = 'center';
  content.style.justifyContent = 'center';
  content.style.width = '100%';
  content.style.textAlign = 'center';

  lead.style.display = 'flex';
  lead.style.flexDirection = 'column';
  lead.style.alignItems = 'center';
  lead.style.gap = '0.3rem';
  lead.style.marginBottom = '2.2rem';

  [years, institution, teacher].forEach(line => {
    line.style.fontSize = 'clamp(22px, 3vw, 38px)';
    line.style.lineHeight = '1.35';
    line.style.opacity = '0';
    line.style.visibility = 'hidden';
  });

  taught.textContent = 'Students Taught';
  taught.style.marginTop = '1rem';
  taught.style.fontSize = 'clamp(22px, 3vw, 38px)';
  taught.style.lineHeight = '1.35';
  taught.style.opacity = '0';
  taught.style.visibility = 'hidden';

  years.textContent = 'Ten Years';
  institution.textContent = 'One Institution';
  teacher.textContent = 'One Teacher';

  lead.append(years, institution, teacher);
  content.append(lead, counter, taught);
  screen.replaceChildren(content);

  screen.classList.add('show');

  /* Each statement appears instantly and remains visible. */
  years.style.opacity = '1';
  years.style.visibility = 'visible';
  await wait(2000);

  institution.style.opacity = '1';
  institution.style.visibility = 'visible';
  await wait(2000);

  teacher.style.opacity = '1';
  teacher.style.visibility = 'visible';
  await wait(900);

  /* Existing counter animation, starting visibly from 1. */
  const start = performance.now();
  const duration = 6000;

  while (performance.now() - start < duration) {
    const progress = (performance.now() - start) / duration;
    let eased;

    if (progress < 0.15) {
      eased = 0.12 * Math.pow(progress / 0.15, 1.5);
    } else {
      eased = 0.12 + 0.88 * Math.pow((progress - 0.15) / 0.85, 1.7);
    }

    counter.textContent = Math.max(
      1,
      Math.floor(3000 * eased)
    ).toLocaleString();

    await wait(20);
  }

  counter.textContent = '3000+';

  /* Wait exactly 1.5 seconds before revealing the label. */
  await wait(1500);
  taught.style.opacity = '1';
  taught.style.visibility = 'visible';

  await wait(5000);

  screen.classList.remove('show');
  showScene(7);

  /* Section 08 fixes: use the real memory folder and hide the opening text after its hold. */
  assets.memory = assets.memory.map(name => `memory/${name}`);

  const memoryStyle = document.createElement('style');
  memoryStyle.textContent = `
    #memoryOpening:not(.show) {
      opacity: 0;
      visibility: hidden;
    }
    #memoryOpening.show {
      opacity: 1;
      visibility: visible;
    }
  `;
  document.head.appendChild(memoryStyle);

  await memory();
}
