// =======================
// THEME SYSTEM
// =======================
const root = document.documentElement;
const btn = document.getElementById("themeBtn");

const themes = [
  { name: "dark", icon: "🌙" },
  { name: "light", icon: "☀️" },
  { name: "aurora", icon: "✦" }
];

const savedTheme = localStorage.getItem("theme") || "dark";
root.setAttribute("data-theme", savedTheme);

function updateThemeIcon() {
  const current = root.getAttribute("data-theme");
  const theme = themes.find((item) => item.name === current) || themes[0];
  btn.textContent = theme.icon;
}

updateThemeIcon();

btn.addEventListener("click", () => {
  const current = root.getAttribute("data-theme");
  const currentIndex = themes.findIndex((item) => item.name === current);
  const nextTheme = themes[(currentIndex + 1) % themes.length].name;

  root.setAttribute("data-theme", nextTheme);
  localStorage.setItem("theme", nextTheme);
  updateThemeIcon();
});

// =======================
// CINEMATIC CURSOR MOTION
// =======================
const cursorDot = document.querySelector(".cursor-dot");
const cursorRing = document.querySelector(".cursor-ring");

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let ringX = mouseX;
let ringY = mouseY;

window.addEventListener("mousemove", (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;

  cursorDot.style.left = `${mouseX}px`;
  cursorDot.style.top = `${mouseY}px`;
});

function animateCursor() {
  ringX += (mouseX - ringX) * 0.16;
  ringY += (mouseY - ringY) * 0.16;

  cursorRing.style.left = `${ringX}px`;
  cursorRing.style.top = `${ringY}px`;

  requestAnimationFrame(animateCursor);
}

animateCursor();

const interactiveElements = document.querySelectorAll("a, button, .card");

interactiveElements.forEach((element) => {
  element.addEventListener("mouseenter", () => {
    cursorRing.classList.add("active");
  });

  element.addEventListener("mouseleave", () => {
    cursorRing.classList.remove("active");
  });
});

// =======================
// PROJECTS DATA
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

// =======================
// RENDER PROJECTS
// =======================
const grid = document.getElementById("grid");

projects.forEach((project, index) => {
  const el = document.createElement("div");
  el.className = "card";
  el.style.animation = `fadeUp 0.7s ease ${index * 45}ms both`;

  el.innerHTML = `<h3>${project.name}</h3>`;

  el.addEventListener("click", () => {
    window.open(`Projects/${project.folder}/index.html`, "_blank", "noopener,noreferrer");
  });

  grid.appendChild(el);
});
