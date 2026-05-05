const grid = document.getElementById("grid");
const voicesSelect = document.getElementById("voices");
const textarea = document.getElementById("text");
const readBtn = document.getElementById("read");
const toggleBtn = document.getElementById("toggle");
const closeBtn = document.getElementById("close");
const modal = document.getElementById("modal");

const data = [
  { image: "img/drink.jpg", text: "I'm Thirsty" },
  { image: "img/food.jpg", text: "I'm Hungry" },
  { image: "img/tired.jpg", text: "I'm Tired" },
  { image: "img/hurt.jpg", text: "I'm Hurt" },
  { image: "img/happy.jpg", text: "I'm Happy" },
  { image: "img/angry.jpg", text: "I'm Angry" },
  { image: "img/sad.jpg", text: "I'm Sad" },
  { image: "img/scared.jpg", text: "I'm Scared" },
  { image: "img/outside.jpg", text: "I Want Outside" },
  { image: "img/home.jpg", text: "I Want Home" },
  { image: "img/school.jpg", text: "I Want School" },
  { image: "img/grandma.jpg", text: "I Want Grandma" }
];

// CREATE CARDS
data.forEach(item=>{
  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <img src="${item.image}" alt="${item.text}">
    <p>${item.text}</p>
  `;

  card.addEventListener("click",()=>{
    setText(item.text);
    speak();

    card.classList.add("active");
    setTimeout(()=>card.classList.remove("active"),600);
  });

  grid.appendChild(card);
});

// SPEECH
const message = new SpeechSynthesisUtterance();
let voices = [];

function loadVoices(){
  voices = speechSynthesis.getVoices();

  voicesSelect.innerHTML = "";

  voices.forEach(v=>{
    const option = document.createElement("option");
    option.value = v.name;
    option.textContent = `${v.name} (${v.lang})`;
    voicesSelect.appendChild(option);
  });
}

speechSynthesis.addEventListener("voiceschanged", loadVoices);
loadVoices();

function setText(text){
  message.text = text;
}

function speak(){
  speechSynthesis.cancel();
  speechSynthesis.speak(message);
}

voicesSelect.addEventListener("change", e=>{
  message.voice = voices.find(v=>v.name === e.target.value);
});

// BUTTONS
readBtn.addEventListener("click",()=>{
  setText(textarea.value);
  speak();
});

toggleBtn.addEventListener("click",()=>{
  modal.classList.add("show");
});

closeBtn.addEventListener("click",()=>{
  modal.classList.remove("show");
});

modal.addEventListener("click",(e)=>{
  if(e.target === modal){
    modal.classList.remove("show");
  }
});