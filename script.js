const scenes=[...document.querySelectorAll(".scene")];
let current=0;
let running=false;

const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));

function showScene(index){
  scenes.forEach((scene,n)=>{
    scene.classList.toggle("active",n===index);
  });
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

async function blankLine(){
  const line=document.createElement("div");
  line.innerHTML="&nbsp;";
  document.querySelector("#terminalText").appendChild(line);
  await wait(450);
}

async function boot(){
  const cursor=document.querySelector("#cursor");

  await typeLine(
    "C:\\CICE> teachers_day.exe",
    "command",
    85
  );
  await wait(1600);
  await blankLine();

  await typeLine(
    "Scanning...",
    "boot-line",
    120
  );
  await wait(2200);

  await typeLine(
    "Teacher detected.",
    "detected",
    120
  );
  await wait(2800);
  await blankLine();

  await typeLine(
    "Preparing surprise...",
    "boot-line",
    120
  );
  await wait(2300);

  await typeLine(
    "System ready.",
    "ready",
    125
  );
  await wait(4000);

  cursor.style.display="none";
  showScene(1);
  await greeting();
}

/* Form the approved three-line greeting. */
async function buildTitleLine(id,text){
  const line=document.querySelector(id);

  for(const character of text){
    const span=document.createElement("span");
    span.className="greeting-letter";
    span.textContent=character;
    line.appendChild(span);
    await wait(90);
  }
}

async function greeting(){
  /* Keyboard is visible before any letters are formed. */
  await wait(1000);

  /* Letters rise from the keyboard and settle in three lines. */
  await buildTitleLine(
    "#titleLine1",
    "HAPPY"
  );
  await wait(300);

  await buildTitleLine(
    "#titleLine2",
    "TEACHERS'"
  );
  await wait(300);

  await buildTitleLine(
    "#titleLine3",
    "DAY SIR"
  );

  await wait(900);

  /* Keep the formed greeting fixed while keyboard leaves. */
  document
    .querySelector(".keyboard")
    .classList.add("hide");

  await wait(1600);

  /* Reveal the four approved lines one by one. */
  const lines=document.querySelectorAll(
    ".greeting-copy p"
  );

  for(const line of lines){
    line.classList.add("show");
    await wait(900);
  }

  /* Approved ten-second pause. */
  await wait(10000);

  const prompt=document.querySelector(
    "#morePrompt"
  );

  prompt.textContent="";

  for(const character of
    "There is something more →"){
    prompt.textContent+=character;
    await wait(65);
  }
}

document.addEventListener(
  "keydown",
  event=>{
    if(
      event.code==="Space" ||
      event.code==="ArrowRight"
    ){
      event.preventDefault();
    }
  }
);

/* Start automatically with Section 1. */
showScene(0);
boot();