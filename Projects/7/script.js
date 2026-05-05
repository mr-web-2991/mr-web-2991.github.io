const wordEl = document.getElementById("word");
const wrongEl = document.getElementById("wrong");
const parts = document.querySelectorAll(".part");

const overlay = document.getElementById("overlay");
const result = document.getElementById("result");
const reveal = document.getElementById("reveal");
const restart = document.getElementById("restart");
const livesEl = document.getElementById("lives");

const modeBtns = document.querySelectorAll(".modes button");

const words = ["javascript","frontend","backend","developer"];

let selected = "";
let correct = new Set();
let wrong = new Set();

let maxLives = 6;
let playable = true;

/* 🎮 MODES SYSTEM */
const modes = {
  easy: 8,
  medium: 6,
  hard: 4
};

modeBtns.forEach(btn=>{
  btn.addEventListener("click", ()=>{
    modeBtns.forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");

    const mode = btn.dataset.mode;
    maxLives = modes[mode];

    resetGame(); // 🔥 مهم
  });
});

/* INIT */
function resetGame(){
  selected = words[Math.floor(Math.random()*words.length)];
  correct.clear();
  wrong.clear();
  playable = true;

  render();
}

/* RENDER */
function render(){
  renderWord();
  renderWrong();
  updateLives();
}

/* WORD */
function renderWord(){
  wordEl.innerHTML = selected
    .split("")
    .map(l=>`<span>${correct.has(l)?l:""}</span>`)
    .join("");

  if(selected.split("").every(l=>correct.has(l))){
    endGame(true);
  }
}

/* WRONG */
function renderWrong(){
  wrongEl.innerText = [...wrong].join(" ");

  parts.forEach((p,i)=>{
    p.style.display = i < wrong.size ? "block" : "none";
  });

  if(wrong.size >= maxLives){
    endGame(false);
  }
}

/* LIVES */
function updateLives(){
  livesEl.innerHTML = "❤️".repeat(maxLives - wrong.size);
}

/* END */
function endGame(win){
  playable = false;
  overlay.classList.add("show");

  result.textContent = win ? "You Win 🎉" : "Game Over";
  reveal.textContent = `Word: ${selected}`;
}

/* INPUT */
window.addEventListener("keydown",e=>{
  if(!playable) return;

  const l = e.key.toLowerCase();
  if(!/[a-z]/.test(l)) return;

  if(selected.includes(l)){
    correct.add(l);
  }else{
    wrong.add(l);
  }

  render();
});

/* RESTART */
restart.addEventListener("click",()=>{
  overlay.classList.remove("show");
  resetGame();
});

/* START */
resetGame();