/* =========================================================
   CICE TEACHERS' DAY
   Main website script
   ========================================================= */


/* -------------------- BASIC HELPERS -------------------- */

// Get every scene in the correct order.
const scenes = [...document.querySelectorAll('.scene')];

// Pause the animation for a given time.
const wait = ms => new Promise(resolve => {
  setTimeout(resolve, ms);
});


// Show only one scene at a time.
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

  if (className) {
    line.className = className;
  }

  box.appendChild(line);

  // Type one character at a time.
  for (const char of text) {
    line.textContent += char;
    await wait(speed);
  }
}


async function boot() {

  // Type the command.
  await typeLine(
    'C:\\CICE> teachers_day.exe',
    'command',
    85
  );

  await wait(1600);

  // Blank line.
  await typeLine('');

  // Scan the system.
  await typeLine(
    'Scanning...',
    'boot-line',
    120
  );

  await wait(2200);

  // Detect the teacher.
  await typeLine(
    'Teacher detected.',
    'detected',
    120
  );

  await wait(2800);

  // Blank line.
  await typeLine('');

  // Prepare the surprise.
  await typeLine(
    'Preparing surprise...',
    'boot-line',
    120
  );

  await wait(2300);

  // Final boot message.
  await typeLine(
    'System ready.',
    'ready',
    125
  );

  await wait(4000);

  // Remove the terminal cursor.
  document.querySelector('#cursor').style.display = 'none';

  // Move to Section 2.
  showScene(1);

  await greeting();
}


/* =========================================================
   02 — GREETING
   ========================================================= */

// Main greeting.
const greetingLines = [
  'HAPPY',
  "TEACHERS'",
  'DAY SIR'
];


// Prepare empty letter positions.
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

      // Keep spaces empty.
      if (char === ' ') {
        slot.classList.add('space');
      } else {
        slot.textContent = char;
      }

      line.appendChild(slot);
    });
  });
}


// Find the matching keyboard key.
function getKey(char) {

  return document.querySelector(
    `.key[data-key="${CSS.escape(char)}"]`
  );
}


// Move one letter from the keyboard to its title position.
async function flyLetter(char, slot) {

  // Spaces do not need animation.
  if (char === ' ') {
    slot.classList.add('landed');
    return;
  }

  const key = getKey(char);

  // Safety fallback.
  if (!key) {
    slot.classList.add('landed');
    return;
  }

  // Press the physical keyboard key.
  key.classList.add('source-active');

  setTimeout(() => {
    key.classList.remove('source-active');
  }, 180);


  // Get the keyboard position.
  const source = key.getBoundingClientRect();

  // Get the destination position.
  const target = slot.getBoundingClientRect();


  // Keyboard center.
  const sx = source.left + source.width / 2;
  const sy = source.top + source.height / 2;

  // Title center.
  const tx = target.left + target.width / 2;
  const ty = target.top + target.height / 2;


  // Create the flying letter.
  const letter = document.createElement('span');

  letter.className = 'flying-letter';

  letter.textContent = char;

  letter.style.left = `${sx}px`;
  letter.style.top = `${sy}px`;

  document.body.appendChild(letter);


  // Animate the letter.
  letter.animate(
    [
      {
        left: `${sx}px`,
        top: `${sy}px`,
        opacity: 0,
        transform:
          'translate(-50%,-50%) scale(.55)'
      },
      {
        left: `${sx + (tx - sx) * .72}px`,
        top: `${sy + (ty - sy) * .72}px`,
        opacity: 1,
        transform:
          'translate(-50%,-50%) scale(1.08)'
      },
      {
        left: `${tx}px`,
        top: `${ty}px`,
        opacity: 1,
        transform:
          'translate(-50%,-50%) scale(1)'
      }
    ],
    {
      duration: 900,
      easing: 'cubic-bezier(.2,.8,.2,1)',
      fill: 'forwards'
    }
  );


  await wait(920);

  // Make the actual title letter visible.
  slot.classList.add('landed');

  // Remove temporary flying letter.
  letter.remove();
}


// Build one complete title line.
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


// Type the small prompt at the bottom.
async function typePrompt(text) {

  const box = document.querySelector('#morePrompt');

  box.textContent = '';

  for (const char of text) {
    box.textContent += char;
    await wait(65);
  }
}


async function greeting() {

  // Prepare the title.
  prepareTitle();

  await wait(900);

  // Build each line separately.
  await buildTitleLine(1);

  await wait(250);

  await buildTitleLine(2);

  await wait(250);

  await buildTitleLine(3);

  await wait(800);


  // Move the keyboard away.
  document
    .querySelector('#keyboard')
    .classList.add('hide');

  await wait(1600);


  // Reveal the greeting message line by line.
  const lines = document.querySelectorAll(
    '.greeting-copy p'
  );

  for (const line of lines) {

    line.classList.add('show');

    await wait(900);
  }


  // Let the message breathe.
  await wait(10000);


  // Show the next-scene prompt.
  await typePrompt(
    'There is something more →'
  );

  await wait(1800);


  // Move to Section 3.
  showScene(2);

  await archive();
}


/* =========================================================
   03 — FOUNDING ARCHIVE
   ========================================================= */

async function archive() {

  const bar = document.querySelector(
    '#archiveBar'
  );

  const percent = document.querySelector(
    '#archivePercent'
  );

  const found = document.querySelector(
    '#archiveFound'
  );

  const origin = document.querySelector(
    '#originRecord'
  );


  // Initial archive message.
  document.querySelector(
    '#archiveStatus'
  ).textContent =
    'Searching founding archives...';


  // Animate 0 → 100.
  for (let n = 0; n <= 100; n += 2) {

    bar.style.width = `${n}%`;

    percent.textContent = `${n}%`;

    await wait(28);
  }


  await wait(450);


  // Archive found.
  found.textContent =
    'Archive found.';

  await wait(900);


  // Show the origin record.
  origin.classList.add('show');

  await wait(3200);


  // Move to Section 4.
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


  // Section 8 fallback images.
  //
  // These are used only if GitHub image discovery
  // is temporarily unavailable.
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


/* -------------------- NORMAL IMAGE PATH -------------------- */

function imagePath(name) {

  return `assets/${encodeURIComponent(name)}`;
}


/* -------------------- MEMORY IMAGE PATH -------------------- */

// GitHub repository.
const memoryRepo =
  'SubhajitRoy8931/CICE-Teachers-Day';

// GitHub branch.
const memoryBranch = 'main';


// Direct raw GitHub image URL.
function memoryImagePath(name) {

  const encodedName =
    encodeURIComponent(name);

  return (
    'https://raw.githubusercontent.com/' +
    `${memoryRepo}/` +
    `${memoryBranch}/` +
    'assets/memory/' +
    encodedName
  );
}


/* -------------------- MEMORY FILE DISCOVERY -------------------- */

// GitHub API URL for the memory folder.
function memoryApiPath() {

  return (
    'https://api.github.com/repos/' +
    `${memoryRepo}/contents/assets/memory` +
    `?ref=${memoryBranch}`
  );
}


// Find every image currently inside
// assets/memory/ on GitHub.
async function discoverMemoryImages() {

  try {

    const response = await fetch(
      memoryApiPath()
    );


    // Stop if GitHub does not respond successfully.
    if (!response.ok) {
      throw new Error(
        'Memory folder could not be read.'
      );
    }


    const files = await response.json();


    // Only keep actual image files.
    const images = files
      .filter(file => file.type === 'file')
      .filter(file =>
        /\.(jpe?g|png|webp)$/i.test(file.name)
      )
      .map(file => file.name);


    // Use discovered images when available.
    if (images.length > 0) {
      assets.memory = images;
    }

  } catch (error) {

    // Keep the fallback list.
    console.warn(
      'Using fallback memory images.',
      error
    );
  }
}


/* -------------------- PHOTO CREATION -------------------- */

// Create a normal photo card.
function makePhoto(
  stage,
  name,
  caption = ''
) {

  const card = document.createElement('div');

  const img = document.createElement('img');


  card.className = 'photo-card';

  img.src = imagePath(name);

  img.alt =
    caption || 'CICE memory';


  // Mark missing images without breaking
  // the rest of the presentation.
  img.addEventListener('error', () => {

    card.classList.add(
      'asset-missing'
    );
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


  const stage = document.querySelector(
    '#classroomPhotos'
  );

  const caption = document.querySelector(
    '#classroomCaption'
  );


  stage.innerHTML = '';


  // Show each classroom image.
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


    caption.textContent =
      captions[i];


    card.classList.add('show');

    caption.classList.add('show');


    await wait(3600);


    card.classList.remove('show');

    caption.classList.remove('show');


    await wait(900);
  }


  /* -------------------- TIME RECORD -------------------- */

  const record = document.querySelector(
    '#timeRecord'
  );

  const year = document.querySelector(
    '#timeYear'
  );

  const message = document.querySelector(
    '#timeMessage'
  );


  record.classList.add('show');

  await wait(1700);


  // Starting year.
  year.textContent = '2016';

  await wait(1600);


  // Animate 2016 → 2026.
  const start = performance.now();

  while (
    performance.now() - start < 2000
  ) {

    const progress =
      (performance.now() - start) / 2000;


    year.textContent = String(
      Math.round(
        2016 + 10 * progress
      )
    );


    await wait(20);
  }


  // Final year.
  year.textContent = '2026';

  await wait(1600);


  message.textContent =
    'Years passed.';

  await wait(2200);


  record.classList.remove('show');


  // Move to Section 5.
  showScene(4);

  await people();
}


/* =========================================================
   05 — PEOPLE
   ========================================================= */

async function people() {

  const intro = document.querySelector(
    '.people-intro'
  );

  const stage = document.querySelector(
    '#peopleStage'
  );

  const caption = document.querySelector(
    '#peopleCaption'
  );


  const captions = [
    'Different faces.',
    'Different beginnings.'
  ];


  stage.innerHTML = '';


  // Opening thought.
  intro.classList.add('show');

  await wait(2800);

  intro.classList.remove('show');

  await wait(700);


  // Show the students.
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


    caption.textContent =
      captions[i];


    card.classList.add('show');

    caption.classList.add('show');


    await wait(3600);


    card.classList.remove('show');

    caption.classList.remove('show');


    await wait(800);
  }


  // Bridge to the teacher section.
  caption.textContent =
    'And these were only a few of them.';

  caption.classList.add('show');

  await wait(1800);

  caption.classList.remove('show');


  // Move to Section 6.
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


  const stage = document.querySelector(
    '#teacherStage'
  );

  const caption = document.querySelector(
    '#teacherCaption'
  );


  stage.innerHTML = '';


  // Show each teacher image.
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


    caption.textContent =
      captions[i];


    card.classList.add('show');

    caption.classList.add('show');


    await wait(3800);


    card.classList.remove('show');

    caption.classList.remove('show');


    await wait(850);
  }


  /* -------------------- CLOSING -------------------- */

  const closing = document.querySelector(
    '#teacherClosing'
  );


  closing.classList.add('show');

  await wait(5000);

  closing.classList.remove('show');

  await wait(800);


  // Move to Section 7.
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


  const stage = document.querySelector(
    '#impactStage'
  );

  const caption = document.querySelector(
    '#impactCaption'
  );


  stage.innerHTML = '';


  // Show the impact images.
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


    // Add caption lines.
    caption.innerHTML =
      captions[i].join('<br>');


    card.classList.add('show');


    if (captions[i].length > 0) {
      caption.classList.add('show');
    }


    // Give the final image slightly
    // more time on screen.
    await wait(
      i === 2 ? 4200 : 3800
    );


    card.classList.remove('show');

    caption.classList.remove('show');


    await wait(900);
  }


  /* -------------------- STUDENT COUNTER -------------------- */

  const screen = document.querySelector(
    '#counterScreen'
  );

  const counter = document.querySelector(
    '#studentCounter'
  );


  screen.classList.add('show');


  const start = performance.now();

  const duration = 6000;


  // Animate the counter for exactly 6 seconds.
  while (
    performance.now() - start < duration
  ) {

    const progress =
      (performance.now() - start) /
      duration;


    let eased;


    // Gentle beginning.
    if (progress < .15) {

      eased =
        .12 *
        Math.pow(
          progress / .15,
          1.5
        );

    } else {

      // Faster middle.
      // Gentle ending.
      eased =
        .12 +
        .88 *
        Math.pow(
          (progress - .15) / .85,
          1.7
        );
    }


    counter.textContent =
      Math.floor(
        3000 * eased
      ).toLocaleString();


    await wait(20);
  }


  // Final number.
  counter.textContent =
    '3000+';


  await wait(2200);


  screen.classList.remove('show');


  // Move to Section 8.
  showScene(7);

  await memory();
}


/* =========================================================
   08 — FINAL MEMORY
   ========================================================= */


/* -------------------- MOSAIC POSITIONS -------------------- */

// These positions spread the photographs
// across the entire screen.
//
// More than 25 images simply reuse these
// positions with different rotations.
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


/* -------------------- CREATE MEMORY PHOTO -------------------- */

function createMemoryPhoto(
  name,
  index,
  mosaic
) {

  const img =
    document.createElement('img');


  const pos =
    memoryPositions[
      index % memoryPositions.length
    ];


  img.className =
    'mosaic-photo';


  // Use the direct GitHub raw path.
  img.src =
    memoryImagePath(name);


  img.alt =
    'CICE memory';


  // Starting position for the
  // flying-in animation.
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
    `${pos[0]}%`
  );

  img.style.setProperty(
    '--y',
    `${pos[1]}%`
  );

  img.style.setProperty(
    '--rot',
    `${pos[2]}deg`
  );


  // Only reveal the photo after
  // the browser confirms that it loaded.
  img.addEventListener(
    'load',
    () => {

      setTimeout(() => {

        img.classList.add('show');

      }, 180 + index * 220);
    },
    { once: true }
  );


  // If the raw URL fails, try the
  // normal GitHub Pages path once.
  img.addEventListener(
    'error',
    () => {

      if (!img.dataset.fallback) {

        img.dataset.fallback = 'true';

        img.src = imagePath(
          `memory/${name}`
        );

        return;
      }


      // Completely hide a genuinely
      // missing image.
      img.classList.add(
        'asset-missing'
      );
    },
    { once: false }
  );


  mosaic.appendChild(img);
}


/* -------------------- FINAL MEMORY -------------------- */

async function memory() {

  const opening = document.querySelector(
    '#memoryOpening'
  );

  const mosaic = document.querySelector(
    '#mosaic'
  );

  const poem = document.querySelector(
    '#poem'
  );

  const thanks = document.querySelector(
    '#finalThanks'
  );


  // Reset the section.
  mosaic.innerHTML = '';

  poem.classList.remove('show');

  thanks.classList.remove('show');

  opening.classList.remove('hide');


  /* -------------------- DISCOVER IMAGES -------------------- */

  // Ask GitHub which images actually
  // exist inside assets/memory/.
  await discoverMemoryImages();


  /* -------------------- OPENING -------------------- */

  await wait(3000);

  opening.classList.add('hide');

  await wait(1300);


  /* -------------------- PHOTO MOSAIC -------------------- */

  // Add every discovered memory photo.
  assets.memory.forEach(
    (name, index) => {

      createMemoryPhoto(
        name,
        index,
        mosaic
      );
    }
  );


  /*
    Each image starts 220ms after the
    previous image.

    We wait long enough for the complete
    sequence to build before showing
    the poem.
  */
  const photoTime =
    180 +
    assets.memory.length * 220 +
    3200;


  await wait(photoTime);


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
   START WEBSITE
   ========================================================= */

window.addEventListener(
  'load',
  () => {

    // Always start at Section 1.
    showScene(0);

    // Start the complete experience.
    boot();
  }
);
