/* =========================================================
   CICE TEACHERS' DAY
   Main website script
   ========================================================= */

/* -------------------- BASIC HELPERS -------------------- */

const scenes = [...document.querySelectorAll('.scene')];
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

function showScene(index) {
  scenes.forEach((scene, i) => {
    scene.classList.toggle('active', i === index);
  });
}

/* =========================================================
   01 — SYSTEM BOOT
   ========================================================= */

async function typeLine(text, className = '', speed = 120) {
  const box = document.querySelector('#terminalText');
  const line = document.createElement('div');

  if (className) line.className = className;
  box.appendChild(line);

  for (const char of text) {
    line.textContent += char;
    await wait(speed);
  }
}

async function boot() {
  document.querySelector('#terminalText').innerHTML = '';

  await typeLine('C:\\CICE> teachers_day.exe', 'command', 105);
  await wait(1000);
  await typeLine('');
  await typeLine('Scanning...', 'boot-line', 150);
  await wait(1000);
  await typeLine('Teacher detected.', 'detected', 150);
  await wait(1000);
  await typeLine('');
  await typeLine('Preparing surprise...', 'boot-line', 150);
  await wait(2000);
  await typeLine('System ready.', 'ready', 155);
  await wait(2000);

  showScene(1);
  await greeting();
}

/* =========================================================
   02 — GREETING
   ========================================================= */

const greetingLines = ['HAPPY', "TEACHERS'", 'DAY SIR'];

function prepareTitle() {
  greetingLines.forEach((text, row) => {
    const line = document.querySelector(`#titleLine${row + 1}`);
    line.innerHTML = '';

    [...text].forEach(char => {
      const slot = document.createElement('span');
      slot.className = 'title-slot';
      slot.dataset.character = char;

      if (char === ' ') slot.classList.add('space');
      else slot.textContent = char;

      line.appendChild(slot);
    });
  });
}

function getKey(char) {
  return document.querySelector(
    `.key[data-key="${CSS.escape(char)}"]`
  );
}

async function flyLetter(char, slot) {
  if (char === ' ') {
    slot.classList.add('landed');
    return;
  }

  const key = getKey(char);
  if (!key) {
    slot.classList.add('landed');
    return;
  }

  key.classList.add('source-active');
  setTimeout(() => {
    key.classList.remove('source-active');
  }, 180);

  const source = key.getBoundingClientRect();
  const target = slot.getBoundingClientRect();
  const sx = source.left + source.width / 2;
  const sy = source.top + source.height / 2;
  const tx = target.left + target.width / 2;
  const ty = target.top + target.height / 2;

  const letter = document.createElement('span');
  letter.className = 'flying-letter';
  letter.textContent = char;
  letter.style.left = `${sx}px`;
  letter.style.top = `${sy}px`;
  document.body.appendChild(letter);

  letter.animate([
    {
      left: `${sx}px`,
      top: `${sy}px`,
      opacity: 0,
      transform: 'translate(-50%,-50%) scale(.55)'
    },
    {
      left: `${sx + (tx - sx) * .72}px`,
      top: `${sy + (ty - sy) * .72}px`,
      opacity: 1,
      transform: 'translate(-50%,-50%) scale(1.08)'
    },
    {
      left: `${tx}px`,
      top: `${ty}px`,
      opacity: 1,
      transform: 'translate(-50%,-50%) scale(1)'
    }
  ], {
    duration: 900,
    easing: 'cubic-bezier(.2,.8,.2,1)',
    fill: 'forwards'
  });

  await wait(920);
  slot.classList.add('landed');
  letter.remove();
}

async function buildTitleLine(row) {
  const line = document.querySelector(`#titleLine${row}`);

  for (const slot of [...line.children]) {
    await flyLetter(slot.dataset.character, slot);
    await wait(80);
  }
}

function startConfetti() {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  canvas.id = 'greetingConfetti';
  canvas.style.position = 'fixed';
  canvas.style.inset = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '50';
  document.body.appendChild(canvas);

  const resize = () => {
    const ratio = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * ratio;
    canvas.height = window.innerHeight * ratio;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
  };

  resize();
  window.addEventListener('resize', resize);

  const pieces = Array.from(
    { length: 90 },
    () => ({
      x: Math.random() * window.innerWidth,
      y: -20 - Math.random() * window.innerHeight,
      width: 5 + Math.random() * 5,
      height: 7 + Math.random() * 8,
      speed: 2.2 + Math.random() * 2.4,
      drift: -0.7 + Math.random() * 1.4,
      rotation: Math.random() * Math.PI,
      rotationSpeed: -0.08 + Math.random() * 0.16,
      phase: Math.random() * Math.PI * 2
    })
  );

  const start = performance.now();
  const duration = 3000;
  const colors = [
    '#f7d774',
    '#8fd3ff',
    '#f29bb2',
    '#b8e986',
    '#d8b4fe',
    '#ffffff'
  ];

  function frame(now) {
    const elapsed = now - start;

    context.clearRect(
      0,
      0,
      window.innerWidth,
      window.innerHeight
    );

    pieces.forEach((piece, index) => {
      const sway = Math.sin(
        elapsed * 0.002 + piece.phase
      ) * 0.7;

      piece.y += piece.speed;
      piece.x += piece.drift + sway;
      piece.rotation += piece.rotationSpeed;

      if (piece.y > window.innerHeight + 20) {
        piece.y = -20;
        piece.x = Math.random() * window.innerWidth;
      }

      context.save();
      context.translate(piece.x, piece.y);
      context.rotate(piece.rotation);
      context.globalAlpha = 1;
      context.fillStyle = colors[index % colors.length];
      context.fillRect(
        -piece.width / 2,
        -piece.height / 2,
        piece.width,
        piece.height
      );
      context.restore();
    });

    if (elapsed < duration) {
      requestAnimationFrame(frame);
    } else {
      window.removeEventListener('resize', resize);
      canvas.remove();
    }
  }

  requestAnimationFrame(frame);
}

async function typePrompt(text) {
  const box = document.querySelector('#morePrompt');
  box.textContent = '';

  for (const char of text) {
    box.textContent += char;
    await wait(65);
  }
}

async function greeting() {
  prepareTitle();
  await wait(900);
  await buildTitleLine(1);
  await wait(250);
  await buildTitleLine(2);
  await wait(250);
  await buildTitleLine(3);
  await wait(800);

  document.querySelector('#keyboard').classList.add('hide');

  startConfetti();
  await wait(3000);

  for (const line of document.querySelectorAll('.greeting-copy p')) {
    line.classList.add('show');
    await wait(2000);
  }

  await wait(7000);
  await typePrompt('There is something more →');
  await wait(1800);

  showScene(2);
  await archive();
}

/* =========================================================
   PHOTO ASSETS
   ========================================================= */

const assets = {
  classroom: [
    '02 — Empty old classroom with laptop.jpg',
    '03 — Old computer workstation.jpg',
    '05 — Students attending class in old classroom(2).jpg',
    '01 — Teacher teaching in old classroom(2).jpg',
    '06 — Sir teaching with projector in old classroom(2).jpg'
  ],

  people: [
    '14 — Student batch, mixed group(1).jpg',
    '16 — Medium student batch, newer classroom(1).jpg'
  ],

  teacher: [
    '21 — Sir teaching with projector(2).jpg',
    '18 — Sir addressing a class(2).jpg',
    '19 — Sir helping students at computers.jpg',
    '20 — Students practicing on computers.jpg'
  ],

  impact: [
    '31 — Large classroom actively working(1).jpg',
    'Career Infotech Certificate Ceremony Collage.jpg',
    '32 — Large certificate group with Sir(1).jpg'
  ],

  memory: []
};

function imagePath(name) {
  return `assets/${encodeURIComponent(name)}`;
}

const memoryPrefix =
  'WhatsApp Image 2026-09-04 at 11.54.05 AM';

assets.memory = Array.from(
  { length: 50 },
  (_, index) => `${memoryPrefix} (${index + 1}).jpeg`
);

function makePhoto(stage, name, caption = '') {
  const card = document.createElement('div');
  const img = document.createElement('img');

  card.className = 'photo-card';
  img.src = imagePath(name);
  img.alt = caption || 'CICE memory';

  img.addEventListener('error', () => {
    card.classList.add('asset-missing');
  });

  card.appendChild(img);
  stage.appendChild(card);
  return card;
}

/* =========================================================
   03 — FOUNDING ARCHIVE
   ========================================================= */

async function archive() {
  const bar = document.querySelector('#archiveBar');
  const percent = document.querySelector('#archivePercent');
  const found = document.querySelector('#archiveFound');
  const origin = document.querySelector('#originRecord');
  const year = document.querySelector('.origin-year');
  const line = document.querySelector('.origin-line');

  document.querySelector('#archiveStatus')
    .textContent = 'Searching archives...';

  for (let n = 0; n <= 100; n += 2) {
    bar.style.width = `${n}%`;
    percent.textContent = `${n}%`;
    await wait(28);
  }

  await wait(450);
  found.textContent = 'Archive found.';
  await wait(900);

  year.textContent = '';
  line.textContent = '';
  origin.classList.add('show');
  await wait(500);

  year.textContent = '2';
  await wait(450);
  year.textContent = '20';
  await wait(450);
  year.textContent = '201';
  await wait(450);
  year.textContent = '2016';
  await wait(250);

  line.textContent = 'This is when it all began.';
  await wait(2500);

  showScene(3);
  await classroom();
}

/* =========================================================
   04 — CLASSROOM
   ========================================================= */

async function classroom() {
  const captions = [
    'A Classroom',
    'A place to learn.',
    'Then the room came alive.',
    'Many questions. Many answers.',
    'The lessons evolved.'
  ];

  const stage = document.querySelector('#classroomPhotos');
  const caption = document.querySelector('#classroomCaption');

  stage.innerHTML = '';

  for (let i = 0; i < assets.classroom.length; i++) {
    const card = makePhoto(
      stage,
      assets.classroom[i],
      captions[i]
    );

    caption.textContent = captions[i];
    card.classList.add('show');
    caption.classList.add('show');

    await wait(3600);

    card.classList.remove('show');
    caption.classList.remove('show');
    await wait(900);
  }

  const record = document.querySelector('#timeRecord');
  const year = document.querySelector('#timeYear');
  const topMessage = document.querySelector('#timeMessageTop');
  const bottomMessage = document.querySelector('#timeMessageBottom');

  record.classList.add('show');
  topMessage.textContent = 'And then, the years began to pass.';
  bottomMessage.textContent = '';
  await wait(1700);

  year.textContent = '2016';
  await wait(1000);

  const start = performance.now();

  while (performance.now() - start < 2000) {
    const progress = (performance.now() - start) / 2000;

    year.textContent = String(
      Math.round(2016 + 10 * progress)
    );

    await wait(20);
  }

  year.textContent = '2026';
  await wait(700);
  bottomMessage.textContent = 'And along the way, lives were shaped.';

  /* Keep this time-record scene visible one second longer. */
  await wait(3200);

  record.classList.remove('show');
  showScene(4);
  await people();
}

/* =========================================================
   05 — PEOPLE
   ========================================================= */

async function people() {
  const stage = document.querySelector('#peopleStage');
  const caption = document.querySelector('#peopleCaption');
  const captions = [
    'Different faces.',
    'Different beginnings.'
  ];

  stage.innerHTML = '';
  caption.classList.remove('show');

  for (let i = 0; i < assets.people.length; i++) {
    const card = makePhoto(
      stage,
      assets.people[i],
      captions[i]
    );

    caption.textContent = captions[i];
    card.classList.add('show');
    caption.classList.add('show');

    await wait(3600);

    card.classList.remove('show');
    caption.classList.remove('show');
    await wait(800);
  }

  showScene(5);
  await teacher();
}

/* =========================================================
   06 — TEACHER
   ========================================================= */

async function teacher() {
  const transition = document.querySelector('#teacherTransition');
  const lines = transition.querySelectorAll('.teacher-transition-line');
  const stage = document.querySelector('#teacherStage');
  const caption = document.querySelector('#teacherCaption');

  const captions = [
    'Someone who showed us where to begin.',
    'Someone who listened.',
    'Someone who helped.',
    'Until we could do it ourselves.'
  ];

  stage.innerHTML = '';
  caption.classList.remove('show');

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

  for (let i = 0; i < assets.teacher.length; i++) {
    const card = makePhoto(
      stage,
      assets.teacher[i],
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

  /* -------------------- CLOSING REFLECTION -------------------- */

  const closing = document.querySelector('#teacherClosing');
  const closingLines = [...closing.querySelectorAll('p')];

  closingLines.forEach(line => {
    line.style.opacity = '0';
    line.style.transform = 'translateY(14px)';
    line.style.transition =
      'opacity 0.8s ease, transform 0.8s ease';
  });

  closing.classList.add('show');

  for (let i = 0; i < closingLines.length; i++) {
    closingLines[i].classList.add('show');
    closingLines[i].style.opacity = '1';
    closingLines[i].style.transform = 'none';

    if (i === 3) {
      await wait(1000);
    } else if (i === closingLines.length - 1) {
      await wait(5000);
    } else {
      await wait(2500);
    }
  }

  closing.classList.remove('show');
  await wait(800);
  showScene(6);
  await impact();
}

/* =========================================================
   07 — IMPACT
   Consolidated from the former override file.
   ========================================================= */

/* Give photographic frames more breathing room. */
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

/* Memory mosaic styling belongs here now. */
const memoryMosaicStyle = document.createElement('style');
memoryMosaicStyle.textContent = `
  #mosaic {
    position: absolute;
    inset: 0;
    overflow: hidden;
  }

  .mosaic-photo {
    position: absolute;
    left: var(--x);
    top: var(--y);
    width: var(--w);
    height: var(--h);
    object-fit: cover;
    display: block;
    opacity: 0;
    visibility: hidden;
    transform:
      translate(-50%, -50%)
      rotate(var(--rot))
      scale(.92);
    transition:
      opacity .8s ease,
      transform .9s ease;
  }

  .mosaic-photo.show {
    opacity: .84;
    visibility: visible;
    transform:
      translate(-50%, -50%)
      rotate(var(--rot))
      scale(1);
  }

  .mosaic-photo.asset-missing {
    display: none;
  }

  @media (max-width: 700px) {
    .mosaic-photo {
      width: 20vw;
      height: 18vh;
    }
  }
`;
document.head.appendChild(memoryMosaicStyle);

function createMemoryPhoto(name, index, mosaic) {
  const img = document.createElement('img');
  const column = index % 10;
  const row = Math.floor(index / 10);

  img.className = 'mosaic-photo';
  img.alt = `CICE memory ${index + 1}`;

  img.style.setProperty('--x', `${column * 10 + 5}%`);
  img.style.setProperty('--y', `${row * 20 + 10}%`);
  img.style.setProperty('--w', '11vw');
  img.style.setProperty('--h', '22vh');
  img.style.setProperty('--rot', `${-2 + Math.random() * 4}deg`);

  img.addEventListener('error', () => {
    img.classList.add('asset-missing');
  });

  mosaic.appendChild(img);
  return img;
}

function loadMemoryPhoto(img, name) {
  return new Promise(resolve => {
    const finish = () => resolve();

    img.addEventListener('load', finish, { once: true });
    img.addEventListener('error', finish, { once: true });

    img.src = `assets/memory/${encodeURIComponent(name)}`;
  });
}

async function revealMemoryPhoto(img, index) {
  await wait(120 + index * 85);

  if (!img.classList.contains('asset-missing')) {
    img.classList.add('show');
  }
}

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

  /* Build the final counter without changing HTML. */
  const content = document.createElement('div');
  const lead = document.createElement('div');
  const years = document.createElement('div');
  const institution = document.createElement('div');
  const teacherLine = document.createElement('div');
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

  [years, institution, teacherLine].forEach(line => {
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
  teacherLine.textContent = 'One Teacher';

  lead.append(years, institution, teacherLine);
  content.append(lead, counter, taught);
  screen.replaceChildren(content);

  screen.classList.add('show');

  years.style.opacity = '1';
  years.style.visibility = 'visible';
  await wait(2000);

  institution.style.opacity = '1';
  institution.style.visibility = 'visible';
  await wait(2000);

  teacherLine.style.opacity = '1';
  teacherLine.style.visibility = 'visible';
  await wait(900);

  const start = performance.now();
  const duration = 6000;

  while (performance.now() - start < duration) {
    const progress = (performance.now() - start) / duration;
    let eased;

    if (progress < 0.15) {
      eased = 0.12 * Math.pow(progress / 0.15, 1.5);
    } else {
      eased =
        0.12 +
        0.88 * Math.pow(
          (progress - 0.15) / 0.85,
          1.7
        );
    }

    counter.textContent = Math.max(
      1,
      Math.floor(3000 * eased)
    ).toLocaleString();

    await wait(20);
  }

  counter.textContent = '3000+';
  await wait(1500);

  taught.style.opacity = '1';
  taught.style.visibility = 'visible';

  await wait(5000);

  screen.classList.remove('show');
  showScene(7);

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

/* =========================================================
   08 — FINAL MEMORY
   ========================================================= */

async function memory() {
  const opening = document.querySelector('#memoryOpening');
  const openingLines = [
    ...opening.querySelectorAll('p')
  ];
  const mosaic = document.querySelector('#mosaic');

  mosaic.innerHTML = '';

  /* Show the opening lines one at a time. */
  openingLines.forEach(line => {
    line.style.opacity = '0';
    line.style.transform = 'translateY(12px)';
    line.style.transition =
      'opacity 0.8s ease, transform 0.8s ease';
  });

  opening.classList.add('show');

  openingLines[0].style.opacity = '1';
  openingLines[0].style.transform = 'none';

  /* Pause before revealing the second line. */
  await wait(2500);

  openingLines[1].style.opacity = '1';
  openingLines[1].style.transform = 'none';

  /* Keep both lines visible before continuing. */
  await wait(4000);
  opening.classList.remove('show');

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

/* =========================================================
   09 — POETIC CLOSING
   ========================================================= */

async function poetry() {
  const lines = [
    ...document.querySelectorAll('#poeticLines p')
  ];

  lines.forEach(line => {
    line.classList.remove('show');
  });

  for (const line of lines) {
    line.classList.add('show');
    await wait(2500);
  }

  await wait(3500);

  showScene(9);
  await finalMessage();
}

/* =========================================================
   10 — FINAL MESSAGE
   ========================================================= */

async function finalMessage() {
  const lines = [
    ...document.querySelectorAll('#finalMessage div')
  ];

  lines.forEach(line => {
    line.classList.remove('show');
  });

  lines[0].classList.add('show');
  await wait(1800);

  lines[1].classList.add('show');
  await wait(6000);
}

/* =========================================================
   START
   ========================================================= */

boot();
