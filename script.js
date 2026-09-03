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

async function greeting(){
  const title=document.querySelector("#greetingTitle");
  const words=["HAPPY","TEACHERS'","DAY","SIR"];

  for(const word of words){
    for(const letter of word){
      const span=document.createElement("span");
      span.className="greeting-letter";
      span.textContent=letter;
      title.appendChild(span);
      await wait(90);
    }

    const space=document.createElement("span");
    space.innerHTML="&nbsp;";
    title.appendChild(space);

    await wait(350);
  }

  await wait(750);

  document
    .querySelector(".keyboard")
    .classList.add("hide");

  await wait(900);

  const lines=
    document.querySelectorAll(
      ".greeting-copy p"
    );

  for(const line of lines){
    line.classList.add("show");
    await wait(900);
  }

  /* Required ten-second pause. */
  await wait(10000);

  const prompt=
    document.querySelector(
      "#morePrompt"
    );

  for(
    const character of
    "There is something more →"
  ){
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
      if(!running){
        running=true;
        if(current===0){
          showScene(1);
          greeting().finally(
            ()=>running=false
          );
        }
      }
    }
  }
);

/* Start with the boxed terminal. */
showScene(0);
boot();