/* =========================================================
   CICE TEACHERS' DAY
   Main website script
   ========================================================= */


/* -------------------- BASIC HELPERS -------------------- */

// Get all scenes in their HTML order.
const scenes = [...document.querySelectorAll('.scene')];

// Pause the current animation when a deliberate pause is needed.
const wait = ms => new Promise(resolve => {
  setTimeout(resolve, ms);
});

// Show one scene and hide the others.
function showScene(index) {
  scenes.forEach((scene, i) => {
    scene.classList.toggle('active', i === index);
  });
}


/* =========================================================
   01 — SYSTEM BOOT
   ========================================================= */

// Type text one character at a time.
async function typeLine(text, className = '', speed = 120) {
  const box = document.querySelector('#terminalText');
  const line = document.createElement('div');

  if (className) {
    line.className = className;
  }

  box.appendChild(line);

  for (const char of text) {
    line.textContent += char;
    await wait(speed);
  }
}


// Run the opening terminal sequence.
async function boot() {

  // Clear the terminal in case the section is replayed.
  document.querySelector('#terminalText').innerHTML = '';

  // Type the command at a slower, calmer pace.
  await typeLine(
    'C:\\CICE> teachers_day.exe',
    'command',
    105
  );

  // Give the completed command a one-second pause.
  await wait(1000);

  // Blank line between command and scan status.
  await typeLine('');

  await typeLine(
    'Scanning...',
    'boot-line',
    150
  );

  // Give the completed scan line a one-second pause.
  await wait(1000);

  await typeLine(
    'Teacher detected.',
    'detected',
    150
  );

  // Give the detection result a one-second pause.
  await wait(1000);

  // Blank line before the final status.
  await typeLine('');

  await typeLine(
    'Preparing surprise...',
    'boot-line',
    150
  );

  // Let the surprise message breathe for two seconds.
  await wait(2000);

  await typeLine(
    'System ready.',
    'ready',
    155
  );

  // Hold the final ready state for two seconds.
  await wait(2000);

  // Move directly to the greeting when the final line is complete.
  showScene(1);
  await greeting();
}


/* =========================================================
   02 — GREETING
   ========================================================= */

// Words used by the keyboard animation.
const greetingLines = [
  'HAPPY',
  "TEACHERS'",
  'DAY SIR'
];


// Create invisible destination slots for every letter.
function prepareTitle() {

  greetingLines.forEach((text, row) => {
    const line = document.querySelector(
      `#titleLine${row + 1}`
    );

    line.innerHTML = '';

    [...text].forEach(char => {
      const slot = document.createElement('span');

      slot.className = 'title-slot';
      slot.dataset.character = char;

      if (char === ' ') {
        slot.classList.add('space');
      } else {
        slot.textContent = char;
      }

      line.appendChild(slot);
    });
  });
}


// Find the keyboard key belonging to a letter.
function getKey(char) {
  return document.querySelector(
    `.key[data-key="${CSS.escape(char)}"]`
  );
}


// Animate one letter from its keyboard key to its title slot.
async function flyLetter(char, slot) {

  // Spaces do not need a flying animation.
  if (char === ' ') {
    slot.classList.add('landed');
    return;
  }

  const key = getKey(char);

  // Safety fallback if a key is missing.
  if (!key) {
    slot.classList.add('landed');
    return;
  }

  // Press the source key.
  key.classList.add('source-active');

  setTimeout(() => {
    key.classList.remove('source-active');
  }, 180);

  // Read the keyboard and title positions.
  const source = key.getBoundingClientRect();
  const target = slot.getBoundingClientRect();

  const sx = source.left + source.width / 2;
  const sy = source.top + source.height / 2;

  const tx = target.left + target.width / 2;
  const ty = target.top + target.height / 2;

  // Create the temporary flying letter.
  const letter = document.createElement('span');

  letter.className = 'flying-letter';
  letter.textContent = char;
  letter.style.left = `${sx}px`;
  letter.style.top = `${sy}px`;

  document.body.appendChild(letter);

  // Fly toward the final title position.
  letter.animate(
    [
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
    ],
    {
      duration: 900,
      easing: 'cubic-bezier(.2,.8,.2,1)',
      fill: 'forwards'
    }
  );

  await wait(920);

  // Reveal the real title letter.
  slot.classList.add('landed');

  // Remove the temporary letter.
  letter.remove();
}


// Build one title line from left to right.
async function buildTitleLine(row) {
  const line = document.querySelector(
    `#titleLine${row}`
  );

  const slots = [...line.children];

  for (const slot of slots) {
    await flyLetter(
      slot.dataset.character,
      slot
    );

    await wait(80);
  }
}


// Type the small transition prompt.
async function typePrompt(text) {
  const box = document.querySelector('#morePrompt');

  box.textContent = '';

  for (const char of text) {
    box.textContent += char;
    await wait(65);
  }
}


// Run the complete greeting section.
async function greeting() {

  prepareTitle();

  await wait(900);

  await buildTitleLine(1);

  await wait(250);

  await buildTitleLine(2);

  await wait(250);

  await buildTitleLine(3);

  await wait(800);

  // Move the keyboard away after the title settles.
  document
    .querySelector('#keyboard')
    .classList.add('hide');

  await wait(1600);

  // Reveal the message one line at a time.
  const lines = document.querySelectorAll(
    '.greeting-copy p'
  );

  for (let i = 0; i < lines.length; i++) {
    lines[i].classList.add('show');

    // Keep the two-second gap only between lines.
    if (i < lines.length - 1) {
      await wait(2000);
    }
  }

  // Wait seven seconds after the final line appears.
  await wait(7000);

  await typePrompt(
    'There is something more →'
  );

  await wait(1800);

  showScene(2);
  await archive();
}


/* =========================================================
   03 — FOUNDING ARCHIVE
   ========================================================= */

async function archive() {

  const bar = document.querySelector('#archiveBar');
  const percent = document.querySelector('#archivePercent');
  const found = document.querySelector('#archiveFound');
  const origin = document.querySelector('#originRecord');

  document.querySelector('#archiveStatus').textContent =
    'Searching founding archives...';

  // Animate the archive scan from 0 to 100 percent.
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

  // Continue to the classroom.
  showScene(3);
  await classroom();
}


/* =========================================================
   PHOTO ASSETS
   ========================================================= */

const assets = {

  // Section 4.
  classroom: [
    '02 — Empty old classroom with laptop.jpg',
    '03 — Old computer workstation.jpg',
    '05 — Students attending class in old classroom(2).jpg',
    '01 — Teacher teaching in old classroom(2).jpg',
    '06 — Sir teaching with projector in old classroom(2).jpg'
  ],

  // Section 5.
  people: [
    '14 — Student batch, mixed group(1).jpg',
    '16 — Medium student batch, newer classroom(1).jpg'
  ],

  // Section 6.
  teacher: [
    '18 — Sir addressing a class(2).jpg',
    '19 — Sir helping students at computers.jpg',
    '20 — Students practicing on computers.jpg',
    '21 — Sir teaching with projector(2).jpg'
  ],

  // Section 7.
  impact: [
    '31 — Large classroom actively working(1).jpg',
    'Career Infotech Certificate Ceremony Collage.jpg',
    '32 — Large certificate group with Sir(1).jpg'
  ],

  // Section 8 uses the 50 renamed JPEG files.
  memory: []
};


/* -------------------- IMAGE PATHS -------------------- */

// Path for normal section images.
function imagePath(name) {
  return `assets/${encodeURIComponent(name)}`;
}


/* -------------------- MEMORY FILENAMES -------------------- */

// All 50 memory photos share this exact filename prefix.
const memoryPrefix =
  'WhatsApp Image 2026-09-04 at 11.54.05 AM';


// Build filenames from 1 through 50.
assets.memory = Array.from(
  { length: 50 },
  (_, index) =>
    `${memoryPrefix} (${index + 1}).jpeg`
);


/* -------------------- NORMAL PHOTO CREATION -------------------- */

// Create a photo card for Sections 4–7.
function makePhoto(stage, name, caption = '') {

  const card = document.createElement('div');
  const img = document.createElement('img');

  card.className = 'photo-card';

  img.src = imagePath(name);
  img.alt = caption || 'CICE memory';

  // Hide a genuinely missing normal asset.
  img.addEventListener('error', () => {
    card.classList.add('asset-missing');
  });

  card.appendChild(img);
  stage.appendChild(card);

  return card;
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

  for (
    let i = 0;
    i < assets.classroom.length;
    i++
  ) {
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

  /* -------------------- TIME RECORD -------------------- */

  const record = document.querySelector('#timeRecord');
  const year = document.querySelector('#timeYear');
  const message = document.querySelector('#timeMessage');

  record.classList.add('show');

  await wait(1700);

  year.textContent = '2016';

  await wait(1600);

  // Move from 2016 to 2026 in exactly two seconds.
  const start = performance.now();

  while (performance.now() - start < 2000) {
    const progress =
      (performance.now() - start) / 2000;

    year.textContent = String(
      Math.round(2016 + 10 * progress)
    );

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


/* =========================================================
   05 — PEOPLE
   ========================================================= */

async function people() {

  const intro = document.querySelector('.people-intro');
  const stage = document.querySelector('#peopleStage');
  const caption = document.querySelector('#peopleCaption');

  const captions = [
    'Different faces.',
    'Different beginnings.'
  ];

  stage.innerHTML = '';

  intro.classList.add('show');

  await wait(2800);

  intro.classList.remove('show');

  await wait(700);

  for (
    let i = 0;
    i < assets.people.length;
    i++
  ) {
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

  caption.textContent =
    'And these were only a few of them.';

  caption.classList.add('show');

  await wait(1800);

  caption.classList.remove('show');

  showScene(5);
  await teacher();
}


/* =========================================================
   06 — TEACHER
   ========================================================= */

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

  for (
    let i = 0;
    i < assets.teacher.length;
    i++
  ) {
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

  const closing = document.querySelector('#teacherClosing');

  closing.classList.add('show');

  await wait(5000);

  closing.classList.remove('show');

  await wait(800);

  showScene(6);
  await impact();
}


/* =========================================================
   07 — IMPACT
   ========================================================= */

async function impact() {

  const captions = [
    [
      'And then, we begin to use what we learned.'
    ],
    [
      'One step becomes a milestone.',
      'A milestone becomes a new beginning.'
    ],
    []
  ];

  const stage = document.querySelector('#impactStage');
  const caption = document.querySelector('#impactCaption');

  stage.innerHTML = '';

  for (
    let i = 0;
    i < assets.impact.length;
    i++
  ) {
    const card = makePhoto(
      stage,
      assets.impact[i],
      captions[i].join(' ')
    );

    caption.innerHTML = captions[i].join('<br>');

    card.classList.add('show');

    if (captions[i].length > 0) {
      caption.classList.add('show');
    }

    await wait(i === 2 ? 4200 : 3800);

    card.classList.remove('show');
    caption.classList.remove('show');

    await wait(900);
  }

  /* -------------------- STUDENT COUNTER -------------------- */

  const screen = document.querySelector('#counterScreen');
  const counter = document.querySelector('#studentCounter');

  screen.classList.add('show');

  const start = performance.now();
  const duration = 6000;

  // Count from 0 to 3000+ over six seconds.
  while (performance.now() - start < duration) {
    const progress =
      (performance.now() - start) / duration;

    let eased;

    if (progress < 0.15) {
      eased =
        0.12 *
        Math.pow(progress / 0.15, 1.5);
    } else {
      eased =
        0.12 +
        0.88 *
        Math.pow(
          (progress - 0.15) / 0.85,
          1.7
        );
    }

    counter.textContent =
      Math.floor(3000 * eased).toLocaleString();

    await wait(20);
  }

  counter.textContent = '3000+';

  await wait(2200);

  screen.classList.remove('show');

  showScene(7);
  await memory();
}


/* =========================================================
   08 — FINAL MEMORY
   ========================================================= */

// Final positions used by the photo mosaic.
const memoryPositions = [
  [2, 4, -3],
  [21, 3, 2],
  [41, 5, -2],
  [62, 3, 3],
  [80, 5, -2],

  [10, 24, 2],
  [31, 21, -3],
  [52, 24, 2],
  [73, 22, -2],
  [88, 25, 3],

  [3, 45, -2],
  [23, 43, 2],
  [44, 46, -3],
  [65, 44, 2],
  [84, 46, -2],

  [12, 67, 3],
  [34, 65, -2],
  [55, 68, 2],
  [76, 66, -3],
  [91, 69, 2],

  [3, 88, -2],
  [25, 87, 3],
  [48, 89, -2],
  [70, 87, 2],
  [89, 88, -3]
];


// Create one memory image.
function createMemoryPhoto(name, index, mosaic) {

  const img = document.createElement('img');
  const position =
    memoryPositions[index % memoryPositions.length];

  img.className = 'mosaic-photo';
  img.alt = 'CICE memory';

  // Starting point for the flying animation.
  img.style.setProperty(
    '--sx',
    `${50 + (index % 5) * 6}%`
  );

  img.style.setProperty(
    '--sy',
    `${45 + (index % 4) * 7}%`
  );

  // Final mosaic position.
  img.style.setProperty(
    '--x',
    `${position[0]}%`
  );

  img.style.setProperty(
    '--y',
    `${position[1]}%`
  );

  img.style.setProperty(
    '--rot',
    `${position[2]}deg`
  );

  mosaic.appendChild(img);

  return img;
}


// Load one memory image with a timeout.
function loadMemoryPhoto(img, name) {

  return new Promise(resolve => {
    let finished = false;

    const finish = success => {
      if (finished) return;
      finished = true;
      clearTimeout(timeout);
      resolve(success);
    };

    const timeout = setTimeout(() => {
      img.classList.add('asset-missing');
      finish(false);
    }, 12000);

    img.addEventListener('load', () => {
      finish(true);
    }, { once: true });

    img.addEventListener('error', () => {
      img.classList.add('asset-missing');
      finish(false);
    }, { once: true });

    // Use the same encoded relative path as the rest of the site.
    img.src = memoryPagePath(name);
  });
}


// GitHub Pages path for a memory image.
function memoryPagePath(name) {
  return (
    'assets/memory/' +
    encodeURIComponent(name)
  );
}


// Animate one loaded memory image into its position.
async function revealMemoryPhoto(img, index) {

  const delay = 180 + index * 220;

  await wait(delay);

  // Do not reveal an image that failed to load.
  if (img.classList.contains('asset-missing')) {
    return;
  }

  img.classList.add('show');
}


// Run the complete final memory section.
async function memory() {

  const opening = document.querySelector('#memoryOpening');
  const mosaic = document.querySelector('#mosaic');
  const poem = document.querySelector('#poem');
  const thanks = document.querySelector('#finalThanks');

  // Reset the section.
  mosaic.innerHTML = '';
  poem.classList.remove('show');
  thanks.classList.remove('show');
  opening.classList.remove('hide');

  /* -------------------- OPENING TEXT -------------------- */

  await wait(3000);

  opening.classList.add('hide');

  await wait(1300);

  /* -------------------- CREATE AND LOAD PHOTOS -------------------- */

  const images = assets.memory.map((name, index) => {
    const img = createMemoryPhoto(
      name,
      index,
      mosaic
    );

    return {
      img,
      name,
      index
    };
  });

  // Load all files in parallel.
  await Promise.all(
    images.map(item =>
      loadMemoryPhoto(
        item.img,
        item.name
      )
    )
  );

  /* -------------------- BUILD THE MOSAIC -------------------- */

  // Reveal the photos one by one.
  await Promise.all(
    images.map(item =>
      revealMemoryPhoto(
        item.img,
        item.index
      )
    )
  );

  // Give the completed mosaic time to settle.
  await wait(3200);

  /* -------------------- POEM -------------------- */

  poem.classList.add('show');

  await wait(5200);

  poem.classList.remove('show');

  /* -------------------- FINAL THANK YOU -------------------- */

  await wait(1600);

  thanks.classList.add('show');

  await wait(5000);
}


/* =========================================================
   START
   ========================================================= */

window.addEventListener('load', () => {
  // Start at the first scene.
  showScene(0);

  // Run the entire cinematic sequence.
  boot();
});
