const scenes = [...document.querySelectorAll('.scene')];
const wait = ms => new Promise(r => setTimeout(r, ms));

function showScene(index) {
  scenes.forEach((s, i) => s.classList.toggle('active', i === index));
}

/* -------------------- 01 — BOOT -------------------- */
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
  await typeLine('C:\\CICE> teachers_day.exe', 'command', 85);
  await wait(1600);
  await typeLine('');
  await typeLine('Scanning...', 'boot-line', 120);
  await wait(2200);
  await typeLine('Teacher detected.', 'detected', 120);
  await wait(2800);
  await typeLine('');
  await typeLine('Preparing surprise...', 'boot-line', 120);
  await wait(2300);
  await typeLine('System ready.', 'ready', 125);
  await wait(4000);

  document.querySelector('#cursor').style.display = 'none';
  showScene(1);
  await greeting();
}

/* -------------------- 02 — GREETING -------------------- */
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
  setTimeout(() => key.classList.remove('source-active'), 180);

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
  const slots = [
    ...document.querySelector(`#titleLine${row}`).children
  ];

  for (const slot of slots) {
    await flyLetter(slot.dataset.character, slot);
    await wait(80);
  }
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
  await wait(1600);

  const lines = document.querySelectorAll('.greeting-copy p');
  for (const line of lines) {
    line.classList.add('show');
    await wait(900);
  }

  await wait(10000);
  await typePrompt('There is something more →');
  await wait(1800);
  showScene(2);
  await archive();
}

/* -------------------- 03 — ARCHIVE -------------------- */
async function archive() {
  const bar = document.querySelector('#archiveBar');
  const percent = document.querySelector('#archivePercent');
  const found = document.querySelector('#archiveFound');
  const origin = document.querySelector('#originRecord');

  document.querySelector('#archiveStatus').textContent =
    'Searching founding archives...';

  for (let n = 0; n <= 100; n += 2) {
    bar.style.width = `${n}%`;
    percent.textContent = `${n}%`;
    await wait(28);
  }

  await wait(450);
  found.textContent = 'Archive found.';
  await wait(900);
  origin.classList.add('show');
  await wait(3200);

  showScene(3);
  await classroom();
}

/* -------------------- PHOTO ASSETS -------------------- */
const assets = {
  classroom: [
    '01 — Empty old classroom with laptop.png',
    '02 — Old computer workstation.png',
    '05 — Students attending class in old classroom(2).png',
    '01 — Teacher teaching in old classroom(2).png',
    '06 — Sir teaching with projector in old classroom(2).png'
  ],

  people: [
    '14 — Student batch, mixed group(1).png',
    '16 — Medium student batch, newer classroom(1).jpg'
  ],

  teacher: [
    '18 — Sir addressing a class(2).png',
    '08 — Sir teaching seated classroom.png',
    '05 — Students attending class in old classroom(2).png',
    '21 — Sir teaching with projector(2).webp'
  ],

  impact: [
    '31 — Large classroom actively working(1).jpeg',
    'Career Infotech Certificate Ceremony Collage.png',
    '32 — Large certificate group with Sir(1).jpg'
  ],

  /* Section 8 images live in their own memory folder. */
  memory: [
    '#CICE_Computer_Institute_Halakura✅ Picnic 2023.✅To Lal Jhamela Basti(WB).✅ Beautiful moments th.webp',
    '01 — Teacher teaching in old classroom(2).jpg',
    '02 — Empty old classroom with laptop.jpg',
    '03 — Old computer workstation.jpg',
    '05 — Students attending class in old classroom(2).jpg',
    '06 — Sir teaching with projector in old classroom(2).jpg',
    '07 — Large class watching projector.png',
    '08 — Sir teaching seated classroom.png',
    '09 — Large student batch, colorful classroom.png'
  ]
};

function imagePath(name) {
  return `assets/${encodeURIComponent(name)}`;
}

function memoryImagePath(name) {
  return `assets/memory/${encodeURIComponent(name)}`;
}

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

/* -------------------- 04 — CLASSROOM -------------------- */
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
    const card = makePhoto(stage, assets.classroom[i], captions[i]);
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
  const message = document.querySelector('#timeMessage');

  record.classList.add('show');
  await wait(1700);
  year.textContent = '2016';
  await wait(1600);

  const start = performance.now();
  while (performance.now() - start < 2000) {
    const p = (performance.now() - start) / 2000;
    year.textContent = String(Math.round(2016 + 10 * p));
    await wait(20);
  }

  year.textContent = '2026';
  await wait(1600);
  message.textContent = 'Years passed.';
  await wait(2200);
  record.classList.remove('show');

  showScene(4);
  await people();
}

/* -------------------- 05 — PEOPLE -------------------- */
async function people() {
  const intro = document.querySelector('.people-intro');
  const stage = document.querySelector('#peopleStage');
  const caption = document.querySelector('#peopleCaption');
  const captions = ['Different faces.', 'Different beginnings.'];

  stage.innerHTML = '';
  intro.classList.add('show');
  await wait(2800);
  intro.classList.remove('show');
  await wait(700);

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

  caption.textContent = 'And these were only a few of them.';
  caption.classList.add('show');
  await wait(1800);
  caption.classList.remove('show');

  showScene(5);
  await teacher();
}

/* -------------------- 06 — TEACHER -------------------- */
async function teacher() {
  const captions = [
    'At the front of the room, a path begins.',
    'Where questions meet a patient guide.',
    'Where knowledge leaves the page and finds its hands.',
    'Where even the difficult finds a way to become clear.'
  ];

  const stage = document.querySelector('#teacherStage');
  const caption = document.querySelector('#teacherCaption');
  stage.innerHTML = '';

  for (let i = 0; i < assets.teacher.length; i++) {
    const card = makePhoto(stage, assets.teacher[i], captions[i]);
    caption.textContent = captions[i];
    card.classList.add('show');
    caption.classList.add('show');

    await wait(3800);
    card.classList.remove('show');
    caption.classList.remove('show');
    await wait(850);
  }

  const closing = document.querySelector('#teacherClosing');
  closing.classList.add('show');
  await wait(5000);
  closing.classList.remove('show');
  await wait(800);

  showScene(6);
  await impact();
}

/* -------------------- 07 — IMPACT -------------------- */
async function impact() {
  const captions = [
    'And then, we begin to use what we learned.',
    'One step becomes a milestone.\\A milestone becomes a new beginning.',
    ''
  ];

  const stage = document.querySelector('#impactStage');
  const caption = document.querySelector('#impactCaption');
  stage.innerHTML = '';

  for (let i = 0; i < assets.impact.length; i++) {
    const card = makePhoto(stage, assets.impact[i], captions[i]);
    caption.innerHTML = captions[i].replace('\\', '<br>');
    card.classList.add('show');
    if (captions[i]) caption.classList.add('show');

    await wait(i === 2 ? 4200 : 3800);
    card.classList.remove('show');
    caption.classList.remove('show');
    await wait(900);
  }

  const screen = document.querySelector('#counterScreen');
  const counter = document.querySelector('#studentCounter');
  screen.classList.add('show');

  const start = performance.now();
  const duration = 6000;

  while (performance.now() - start < duration) {
    const p = (performance.now() - start) / duration;
    let eased;

    if (p < .15) {
      eased = .12 * Math.pow(p / .15, 1.5);
    } else {
      eased = .12 + .88 * Math.pow((p - .15) / .85, 1.7);
    }

    counter.textContent = Math.floor(3000 * eased)
      .toLocaleString();
    await wait(20);
  }

  counter.textContent = '3000+';
  await wait(2200);
  screen.classList.remove('show');

  showScene(7);
  await memory();
}

/* -------------------- 08 — MEMORY -------------------- */
async function memory() {
  const opening = document.querySelector('#memoryOpening');
  const mosaic = document.querySelector('#mosaic');
  const poem = document.querySelector('#poem');
  const thanks = document.querySelector('#finalThanks');

  mosaic.innerHTML = '';
  poem.classList.remove('show');
  thanks.classList.remove('show');
  opening.classList.remove('hide');

  await wait(3000);
  opening.classList.add('hide');
  await wait(1300);

  const positions = [
    [2, 4, -3], [21, 3, 2], [41, 5, -2],
    [62, 3, 3], [80, 5, -2], [10, 24, 2],
    [31, 21, -3], [52, 24, 2], [73, 22, -2],
    [88, 25, 3], [3, 45, -2], [23, 43, 2],
    [44, 46, -3], [65, 44, 2], [84, 46, -2],
    [12, 67, 3], [34, 65, -2], [55, 68, 2],
    [76, 66, -3], [91, 69, 2], [3, 88, -2],
    [25, 87, 3], [48, 89, -2], [70, 87, 2],
    [89, 88, -3]
  ];

  const shuffled = [...assets.memory];

  shuffled.forEach((name, i) => {
    const img = document.createElement('img');
    const pos = positions[i % positions.length];

    img.className = 'mosaic-photo';
    img.src = memoryImagePath(name);
    img.alt = 'CICE memory';
    img.style.setProperty('--sx', `${50 + (i % 5) * 6}%`);
    img.style.setProperty('--sy', `${45 + (i % 4) * 7}%`);
    img.style.setProperty('--x', `${pos[0]}%`);
    img.style.setProperty('--y', `${pos[1]}%`);
    img.style.setProperty('--rot', `${pos[2]}deg`);

    img.addEventListener('error', () => {
      img.classList.add('asset-missing');
    });

    mosaic.appendChild(img);

    setTimeout(() => {
      img.classList.add('show');
    }, 180 + i * 220);
  });

  await wait(180 + shuffled.length * 220 + 3200);
  poem.classList.add('show');
  await wait(5200);
  poem.classList.remove('show');
  await wait(1600);

  thanks.classList.add('show');
  await wait(5000);
}

/* -------------------- START -------------------- */
window.addEventListener('load', () => {
  showScene(0);
  boot();
});
