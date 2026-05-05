const container = document.getElementById("cards-container");
const currentEl = document.getElementById("current");
const emptyEl = document.getElementById("empty");

const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const showBtn = document.getElementById("show");
const hideBtn = document.getElementById("hide");
const addPanel = document.getElementById("add-container");

const addBtn = document.getElementById("add-card");
const clearBtn = document.getElementById("clear");

const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");

let cards = JSON.parse(localStorage.getItem("cards")) || [];
let index = 0;

/* ================= RENDER ================= */
function render(){
  container.innerHTML = "";

  cards.forEach((c,i)=>{
    const el = document.createElement("div");
    el.className = "card";

    if(i === index) el.classList.add("active");

    el.innerHTML = `
      <div class="inner">
        <div class="front">${c.q}</div>
        <div class="back">${c.a}</div>
      </div>
    `;

    el.addEventListener("click",()=>{
      el.classList.toggle("flip");
    });

    container.appendChild(el);
  });

  updateUI();
}

/* ================= UI ================= */
function updateUI(){
  currentEl.innerText = cards.length ? `${index+1}/${cards.length}` : "0/0";
  emptyEl.style.display = cards.length ? "none" : "block";
}

/* ================= NAV ================= */
nextBtn.onclick = ()=>{
  if(index < cards.length-1){
    index++;
    render();
  }
};

prevBtn.onclick = ()=>{
  if(index > 0){
    index--;
    render();
  }
};

/* ================= ADD ================= */
showBtn.onclick = ()=> addPanel.classList.add("show");
hideBtn.onclick = ()=> addPanel.classList.remove("show");

addBtn.onclick = ()=>{
  const q = questionEl.value.trim();
  const a = answerEl.value.trim();

  if(!q || !a) return;

  cards.push({q,a});
  localStorage.setItem("cards", JSON.stringify(cards));

  questionEl.value = "";
  answerEl.value = "";

  addPanel.classList.remove("show");

  index = cards.length - 1;
  render();
};

/* ================= CLEAR ================= */
clearBtn.onclick = ()=>{
  localStorage.removeItem("cards");
  cards = [];
  index = 0;
  render();
};

/* INIT */
render();