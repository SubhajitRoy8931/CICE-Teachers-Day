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


// Create and animate a restrained confetti fall.
function startConfetti() {

  // Create the canvas only when the celebration begins.
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

  // Match the canvas to the current viewport.
  const resize = () => {
    const ratio = window.devicePixelRatio || 1;

    canvas.width = window.innerWidth * ratio;
    canvas.height = window.innerHeight * ratio;
    context.setTransform(
      ratio,
      0,
      0,
      ratio,
      0,
      0
    );
  };

  resize();
  window.addEventListener('resize', resize);

  // Keep the amount modest so it stays celebratory, not distracting.
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
  const duration = 6500;

  // Use varied celebratory colors without any external library.
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
      const sway =
        Math.sin(elapsed * 0.002 + piece.phase) * 0.7;

      piece.y += piece.speed;
      piece.x += piece.drift + sway;
      piece.rotation += piece.rotationSpeed;

      // Recycle pieces that leave the bottom while the effect is active.
      if (piece.y > window.innerHeight + 20) {
        piece.y = -20;
        piece.x = Math.random() * window.innerWidth;
      }

      context.save();
      context.translate(piece.x, piece.y);
      context.rotate(piece.rotation);
      context.globalAlpha = Math.max(
        0,
        1 - Math.max(0, elapsed - 5000) / 1500
      );
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

  // Start the confetti immediately after the keyboard disappears.
  startConfetti();

  // Let the celebration begin before revealing the message.
  await wait(1600);

  // Reveal the message one line at a time.
  const lines = document.querySelectorAll(
    '.greeting-copy p'
  );

  for (const line of lines) {
    line.classList.add('show');
    await wait(2000);
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


// Build filenames from 1 through 50 inside the memory folder.
assets.memory = Array.from(
  { length: 50 },
  (_, index) =>
    `memory/${memoryPrefix} (${index + 1}).jpeg`
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

  /* -------------------- PASSAGE OF YEARS -------------------- */

  const record = document.querySelector('#timeRecord');
  const year = document.querySelector('#timeYear');
  const message = document.querySelector('#timeMessage');

  record.classList.add('show');

  // Give the opening sentence time to settle before the years begin.
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

  // Hold the completed decade before revealing the story's next thought.
  await wait(1600);

  message.textContent = 'And along the way, lives were shaped.';

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
    'Different journeys.'
  ];

  intro.classList.add('show');

  await wait(2600);

  intro.classList.remove('show');

  await wait(800);

  stage.innerHTML = '';

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

    await wait(3800);

    card.classList.remove('show');
    caption.classList.remove('show');

    await wait(900);
  }

  showScene(5);
  await teacher();
}


/* =========================================================
   06 — THE TEACHER
   ========================================================= */

async function teacher() {

  const stage = document.querySelector('#teacherStage');
  const caption = document.querySelector('#teacherCaption');
  const closing = document.querySelector('#teacherClosing');

  const captions = [
    'A teacher does more than teach.',
    'He notices when we struggle.',
    'He stays when the answer is difficult.',
    'And he keeps asking us to try again.'
  ];

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

    await wait(900);
  }

  closing.classList.add('show');

  await wait(7000);

  closing.classList.remove('show');

  showScene(6);
  await impact();
}


/* =========================================================
   07 — THE IMPACT
   ========================================================= */

async function impact() {

  const stage = document.querySelector('#impactStage');
  const caption = document.querySelector('#impactCaption');
  const counterScreen = document.querySelector('#counterScreen');
  const counter = document.querySelector('#studentCounter');

  const captions = [
    'A classroom became a community.',
    'Learning became confidence.',
    'And the journey kept growing.'
  ];

  stage.innerHTML = '';

  for (
    let i = 0;
    i < assets.impact.length;
    i++
  ) {
    const card = makePhoto(
      stage,
      assets.impact[i],
      captions[i]
    );

    caption.textContent = captions[i];

    card.classList.add('show');
    caption.classList.add('show');

    await wait(4000);

    card.classList.remove('show');
    caption.classList.remove('show');

    await wait(900);
  }

  counterScreen.classList.add('show');

  for (let n = 0; n <= 1000; n += 25) {
    counter.textContent = n;
    await wait(28);
  }

  counter.textContent = '1000+';

  await wait(3200);

  counterScreen.classList.remove('show');

  showScene(7);
  await memory();
}


/* =========================================================
   08 — FINAL MEMORY
   ========================================================= */

async function memory() {

  const opening = document.querySelector('#memoryOpening');
  const mosaic = document.querySelector('#mosaic');
  const poem = document.querySelector('#poem');
  const thanks = document.querySelector('#finalThanks');

  opening.classList.add('show');

  await wait(4500);

  opening.classList.remove('show');

  await wait(1200);

  mosaic.innerHTML = '';

  assets.memory.forEach((name, index) => {
    const tile = document.createElement('div');
    const img = document.createElement('img');

    tile.className = 'memory-tile';

    img.src = imagePath(name);
    img.alt = `CICE memory ${index + 1}`;

    img.addEventListener('error', () => {
      tile.classList.add('asset-missing');
    });

    tile.appendChild(img);
    mosaic.appendChild(tile);
  });

  mosaic.classList.add('show');

  await wait(6500);

  mosaic.classList.remove('show');

  await wait(1000);

  poem.classList.add('show');

  await wait(8500);

  poem.classList.remove('show');

  await wait(1000);

  thanks.classList.add('show');

  await wait(8000);
}


/* =========================================================
   START EXPERIENCE
   ========================================================= */

// Start the experience once the page has loaded.
window.addEventListener('load', () => {
  boot();
});
