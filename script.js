const scenes=[...document.querySelectorAll(".scene")];
let current=0;
const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));

function showScene(index){
  scenes.forEach((scene,n)=>scene.classList.toggle("active",n===index));
  current=index;
}

async function typeLine(text,className="",speed=120){
  const line=document.createElement("div");
  if(className) line.className=className;
  document.querySelector("#terminalText").appendChild(line);
  for(const character of text){
    line.textContent+=character;
    await wait(speed);
  }
}

async function boot(){
  await typeLine("C:\\CICE> teachers_day.exe","command",85);
  await wait(1600);
  await typeLine("","",1);
  await typeLine("Scanning...","boot-line",120);
  await wait(2200);
  await typeLine("Teacher detected.","detected",120);
  await wait(2800);
  await typeLine("","",1);
  await typeLine("Preparing surprise...","boot-line",120);
  await wait(2300);
  await typeLine("System ready.","ready",125);
  await wait(4000);
  document.querySelector("#cursor").style.display="none";
  showScene(1);
  await greeting();
}

/* Section 2: letters physically travel from their matching keys. */
const greetingLines=["HAPPY","TEACHERS'","DAY SIR"];

function prepareTitleSlots(){
  greetingLines.forEach((text,index)=>{
    const line=document.querySelector(`#titleLine${index+1}`);
    line.innerHTML="";
    [...text].forEach(character=>{
      const slot=document.createElement("span");
      slot.className=`title-slot${character===" "?" space":""}`;
      slot.dataset.character=character;
      if(character!==" ") slot.textContent=character;
      line.appendChild(slot);
    });
  });
}

function pressKey(character){
  const key=document.querySelector(`.key[data-key="${CSS.escape(character)}"]`);
  if(!key)return;
  key.classList.add("source-active");
  setTimeout(()=>key.classList.remove("source-active"),180);
}

async function flyLetter(character,slot){
  if(character===" "){slot.classList.add("landed");return;}
  const key=document.querySelector(`.key[data-key="${CSS.escape(character)}"]`);
  if(!key){slot.classList.add("landed");return;}
  pressKey(character);
  const source=key.getBoundingClientRect();
  const target=slot.getBoundingClientRect();
  const letter=document.createElement("span");
  letter.className="flying-letter";
  letter.textContent=character;
  letter.style.left=`${source.left+source.width/2}px`;
  letter.style.top=`${source.top+source.height/2}px`;
  letter.style.transform="translate(-50%,-50%) scale(.55)";
  letter.style.opacity="0";
  document.body.appendChild(letter);
  const animation=letter.animate([
    {opacity:0,transform:"translate(-50%,-50%) scale(.55)"},
    {opacity:1,transform:"translate(-50%,-50%) scale(1.08)",offset:.72},
    {opacity:1,transform:"translate(-50%,-50%) scale(1)",offset:1}
  ],{duration:900,easing:"cubic-bezier(.2,.8,.2,1)",fill:"forwards"});
  await wait(20);
  letter.animate([
    {left:`${source.left+source.width/2}px`,top:`${source.top+source.height/2}px`},
    {left:`${target.left+target.width/2}px`,top:`${target.top+target.height/2}px`}
  ],{duration:900,easing:"cubic-bezier(.2,.8,.2,1)",fill:"forwards"});
  await animation.finished.catch(()=>{});
  letter.style.left=`${target.left+target.width/2}px`;
  letter.style.top=`${target.top+target.height/2}px`;
  slot.classList.add("landed");
  letter.animate([
    {transform:"translate(-50%,-50%) scale(1.08)"},
    {transform:"translate(-50%,-50%) scale(1)"}
  ],{duration:220,easing:"ease-out",fill:"forwards"});
  await wait(100);
  letter.remove();
}

async function buildTitleLine(lineNumber){
  const line=document.querySelector(`#titleLine${lineNumber}`);
  const slots=[...line.children];
  for(const slot of slots){
    await flyLetter(slot.dataset.character,slot);
    await wait(75);
  }
}

async function greeting(){
  prepareTitleSlots();
  await wait(900);
  await buildTitleLine(1);
  await wait(250);
  await buildTitleLine(2);
  await wait(250);
  await buildTitleLine(3);
  await wait(800);
  document.querySelector("#keyboard").classList.add("hide");
  await wait(1600);
  const lines=document.querySelectorAll(".greeting-copy p");
  for(const line of lines){line.classList.add("show");await wait(900)}
  await wait(10000);
  await typePrompt("There is something more →");
  await wait(1800);
  showScene(2);
  await archive();
}

async function typePrompt(text){
  const prompt=document.querySelector("#morePrompt");
  prompt.textContent="";
  for(const character of text){prompt.textContent+=character;await wait(65)}
}

/* Section 3: founding archive. */
async function archive(){
  const status=document.querySelector("#archiveStatus");
  const bar=document.querySelector("#archiveBar");
  const percent=document.querySelector("#archivePercent");
  const found=document.querySelector("#archiveFound");
  const origin=document.querySelector("#originRecord");
  status.textContent="Searching founding archives...";
  for(let n=0;n<=100;n+=2){
    bar.style.width=`${n}%`;
    percent.textContent=`${n}%`;
    await wait(28);
  }
  await wait(450);
  found.textContent="Archive found.";
  await wait(900);
  origin.classList.add("show");
  await wait(3200);
  showScene(3);
  await classroom();
}

/* Asset names intentionally stay readable so they can be replaced easily. */
const assets={
  classroom:[
    "01 — Empty old classroom with laptop.png",
    "02 — Old computer workstation.png",
    "05 — Students attending class in old classroom(2).png",
    "01 — Teacher teaching in old classroom(2).png",
    "06 — Sir teaching with projector in old classroom(2).png"
  ],
  people:[
    "14 — Student batch, mixed group(1).png",
    "16 — Medium student batch, newer classroom(1).jpg"
  ],
  teacher:[
    "18 — Sir addressing a class(2).png",
    "19 — Sir helping students at computers.png",
    "20 — Students practicing on computers.png",
    "21 — Sir teaching with projector(2).webp"
  ],
  impact:[
    "31 — Large classroom actively working(1).jpeg",
    "Career Infotech Certificate Ceremony Collage.png",
    "32 — Large certificate group with Sir(1).jpg"
  ],
  memory:[
    "13 — Student batch, women prominent in front.png",
    "09 — Large student batch, colorful classroom.png",
    "15 — Large recent student batch(1).webp",
    "10 — Large student batch, green wall.png",
    "11 — Large mixed student batch, colorful classroom.jpg",
    "12 — Student batch, green-wall classroom.png",
    "17 — Another large student batch, green wall(1).jpg",
    "17 — Another large student batch, green wall.jpg",
    "07 — Large class watching projector.png",
    "08 — Sir teaching seated classroom.png",
    "WhatsApp Image 2026-09-03 at 2.16.55 PM.jpeg",
    "WhatsApp Image 2026-09-03 at 2.18.49 PM.jpeg",
    "WhatsApp Image 2026-09-03 at 2.19.40 PM.jpeg",
    "WhatsApp Image 2026-09-03 at 2.21.00 PM.jpeg",
    "WhatsApp Image 2026-09-03 at 2.18.22 PM.jpeg",
    "WhatsApp Image 2026-09-03 at 2.16.59 PM.jpeg",
    "WhatsApp Image 2026-09-03 at 2.18.48 PM.jpeg",
    "WhatsApp Image 2026-09-03 at 2.20.27 PM.jpeg",
    "WhatsApp Image 2026-09-03 at 2.20.22 PM.jpeg",
    "WhatsApp Image 2026-09-03 at 2.21.04 PM.jpeg",
    "WhatsApp Image 2026-09-03 at 2.18.47 PM.jpeg"
  ]
};

function imagePath(name){return `assets/${encodeURIComponent(name).replace(/%20/g," ")}`}

function makePhoto(stage,name,caption){
  const card=document.createElement("div");
  card.className="photo-card";
  const img=document.createElement("img");
  img.alt=caption||"CICE memory";
  img.src=imagePath(name);
  img.onerror=()=>card.classList.add("asset-missing");
  card.appendChild(img);
  stage.appendChild(card);
  return card;
}

async function showPhotoSequence(stageId,names,captions,hold=3000){
  const stage=document.querySelector(`#${stageId}`);
  stage.innerHTML="";
  for(let i=0;i<names.length;i++){
    const card=makePhoto(stage,names[i],captions[i]);
    await wait(500);
    card.classList.add("show");
    await wait(hold);
    card.classList.remove("show");
    await wait(800);
  }
}

async function classroom(){
  const captions=["A Classroom","A place to learn.","Then the room came alive.","Many questions. Many answers.","The lessons evolved."];
  const stage=document.querySelector("#classroomPhotos");
  const caption=document.querySelector("#classroomCaption");
  stage.innerHTML="";
  for(let i=0;i<assets.classroom.length;i++){
    const card=makePhoto(stage,assets.classroom[i],captions[i]);
    caption.textContent=captions[i];
    caption.classList.add("show");
    card.classList.add("show");
    await wait(3600);
    card.classList.remove("show");
    caption.classList.remove("show");
    await wait(900);
  }
  document.querySelector("#timeRecord").classList.add("show");
  await wait(1700);
  const year=document.querySelector("#timeYear");
  year.textContent="2016";
  await wait(1600);
  const start=performance.now();
  while(performance.now()-start<2000){
    const p=Math.min(1,(performance.now()-start)/2000);
    year.textContent=String(Math.round(2016+(2026-2016)*p));
    await wait(20);
  }
  year.textContent="2026";
  await wait(1600);
  document.querySelector("#timeMessage").textContent="Years passed.";
  await wait(2200);
  document.querySelector("#timeRecord").classList.remove("show");
  showScene(4);
  await people();
}

async function people(){
  const intro=document.querySelector(".people-intro");
  intro.classList.add("show");
  await wait(2800);
  intro.classList.remove("show");
  await wait(700);
  const stage=document.querySelector("#peopleStage");
  const caption=document.querySelector("#peopleCaption");
  const captions=["Different faces.","Different beginnings."];
  for(let i=0;i<assets.people.length;i++){
    const card=makePhoto(stage,assets.people[i],captions[i]);
    caption.textContent=captions[i];
    card.classList.add("show");
    caption.classList.add("show");
    await wait(3600);
    card.classList.remove("show");
    caption.classList.remove("show");
    await wait(800);
  }
  caption.textContent="And these were only a few of them.";
  caption.classList.add("show");
  await wait(1800);
  caption.classList.remove("show");
  showScene(5);
  await teacher();
}

async function teacher(){
  const captions=[
    "At the front of the room, a path begins.",
    "Where questions meet a patient guide.",
    "Where knowledge leaves the page and finds its hands.",
    "Where even the difficult finds a way to become clear."
  ];
  const stage=document.querySelector("#teacherStage");
  const caption=document.querySelector("#teacherCaption");
  for(let i=0;i<assets.teacher.length;i++){
    const card=makePhoto(stage,assets.teacher[i],captions[i]);
    caption.textContent=captions[i];
    card.classList.add("show");caption.classList.add("show");
    await wait(3800);
    card.classList.remove("show");caption.classList.remove("show");
    await wait(850);
  }
  const closing=document.querySelector("#teacherClosing");
  closing.classList.add("show");
  await wait(5000);
  closing.classList.remove("show");
  await wait(800);
  showScene(6);
  await impact();
}

async function impact(){
  const captions=[
    "And then, we begin to use what we learned.",
    "One step becomes a milestone.\nA milestone becomes a new beginning.",
    ""
  ];
  const stage=document.querySelector("#impactStage");
  const caption=document.querySelector("#impactCaption");
  for(let i=0;i<assets.impact.length;i++){
    const card=makePhoto(stage,assets.impact[i],captions[i]);
    caption.textContent=captions[i];
    card.classList.add("show");
    if(captions[i])caption.classList.add("show");
    await wait(i===2?4200:3800);
    card.classList.remove("show");caption.classList.remove("show");
    await wait(900);
  }
  const counterScreen=document.querySelector("#counterScreen");
  counterScreen.classList.add("show");
  const counter=document.querySelector("#studentCounter");
  const start=performance.now();
  const duration=6000;
  while(performance.now()-start<duration){
    const p=Math.min(1,(performance.now()-start)/duration);
    const eased=p<.15?0.12*(p/.15)**1.5:.15+.68*((p-.15)/.85)**1.7;
    const value=Math.min(3000,Math.floor(3000*eased));
    counter.textContent=value.toLocaleString();
    await wait(20);
  }
  counter.textContent="3000+";
  await wait(2200);
  counterScreen.classList.remove("show");
  showScene(7);
  await memory();
}

async function memory(){
  const opening=document.querySelector("#memoryOpening");
  await wait(3000);
  opening.classList.add("hide");
  await wait(1300);
  const mosaic=document.querySelector("#mosaic");
  mosaic.innerHTML="";
  const count=assets.memory.length;
  for(let i=0;i<count;i++){
    const img=document.createElement("img");
    img.className="mosaic-photo";
    img.src=imagePath(assets.memory[i]);
    img.alt="CICE memory";
    const col=i%5,row=Math.floor(i/5);
    const x=6+col*19+((row%2)*3);
    const y=7+row*18;
    img.style.left=`${Math.min(76,x)}%`;
    img.style.top=`${Math.min(78,y)}%`;
    img.style.setProperty("--sx",`${(i%2?1:-1)*35}vw`);
    img.style.setProperty("--sy",`${(i%3-1)*25}vh`);
    img.style.setProperty("--rot",`${(i%3-1)*1.5}deg`);
    img.onerror=()=>img.remove();
    mosaic.appendChild(img);
    await wait(190);
    img.classList.add("show");
  }
  await wait(5500);
  document.querySelector("#poem").classList.add("show");
  await wait(5200);
  document.querySelector("#poem").classList.remove("show");
  await wait(1200);
  document.querySelector("#finalThanks").classList.add("show");
}

/* Keep the experience cinematic: no manual scrolling or accidental keys. */
document.addEventListener("keydown",event=>{
  if(["Space","ArrowRight","ArrowLeft","ArrowDown","ArrowUp"].includes(event.code))event.preventDefault();
});

prepareTitleSlots();
showScene(0);
boot();
