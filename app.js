// =======================
// THEME
// =======================
const root = document.documentElement;
const btn = document.getElementById("themeBtn");

root.setAttribute("data-theme", localStorage.getItem("theme") || "dark");

btn.onclick = () => {
  const t = root.getAttribute("data-theme") === "light" ? "dark" : "light";
  root.setAttribute("data-theme", t);
  localStorage.setItem("theme", t);
};

// =======================
// PROJECTS
// =======================
const projects = [
  { name: "Voice Command Interface", folder: 19 },
  { name: "Voice Controlled Guessing Game", folder: 18 },
  { name: "E-commerce Store Interface", folder: 16 },
  { name: "Wealth Analytics Dashboard", folder: 3 },
  { name: "Typing Speed Test App", folder: 20 },
  { name: "Expense Tracker", folder: 5 },
  { name: "Authentication Form", folder: 6 },
  { name: "Custom Video Player", folder: 2 },
  { name: "Breakout Game", folder: 1 },
  { name: "Hangman Game", folder: 7 },
  { name: "Breathing Exercise App", folder: 17 },
  { name: "Blog Platform UI", folder: 8 },
  { name: "Lyrics Search App", folder: 9 },
  { name: "Meal Finder App", folder: 10 },
  { name: "Flashcards App", folder: 11 },
  { name: "Landing Page UI", folder: 12 },
  { name: "Cinema Booking System", folder: 13 },
  { name: "Music Player SaaS", folder: 14 },
  { name: "New Year Countdown", folder: 15 }
];

const grid = document.getElementById("grid");

projects.forEach((p) => {
  const el = document.createElement("div");
  el.className = "card magnetic";
  el.innerHTML = `<h3>${p.name}</h3>`;
  el.onclick = () => window.open(`Projects/${p.folder}/index.html`, "_blank");
  grid.appendChild(el);
});

// =======================
// 🔥 CURSOR SYSTEM
// =======================
const dot = document.querySelector(".cursor-dot");
const glow = document.querySelector(".cursor-glow");

let mouseX = 0;
let mouseY = 0;
let glowX = 0;
let glowY = 0;

window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  dot.style.left = mouseX + "px";
  dot.style.top = mouseY + "px";
});

function animateGlow(){
  glowX += (mouseX - glowX) * 0.15;
  glowY += (mouseY - glowY) * 0.15;

  glow.style.left = glowX + "px";
  glow.style.top = glowY + "px";

  requestAnimationFrame(animateGlow);
}
animateGlow();

// =======================
// 🔥 MAGNETIC EFFECT
// =======================
document.querySelectorAll(".magnetic").forEach(el=>{
  el.addEventListener("mousemove", (e)=>{
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width/2;
    const y = e.clientY - rect.top - rect.height/2;

    el.style.transform = `translate(${x*0.2}px, ${y*0.2}px)`;
  });

  el.addEventListener("mouseleave", ()=>{
    el.style.transform = "translate(0,0)";
  });
});

// =======================
// 🔥 CARD PARALLAX
// =======================
document.querySelectorAll(".card").forEach(card=>{
  card.addEventListener("mousemove",(e)=>{
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = (y / rect.height - 0.5) * -10;
    const rotateY = (x / rect.width - 0.5) * 10;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener("mouseleave",()=>{
    card.style.transform = "rotateX(0) rotateY(0)";
  });
});