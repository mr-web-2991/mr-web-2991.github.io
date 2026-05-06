// =======================
// THEME SYSTEM
// =======================
const root = document.documentElement;
const btn = document.getElementById("themeBtn");
const themeIcon = document.querySelector(".theme-icon");
const themeName = document.querySelector(".theme-name");

const themes = [
  { name: "dark", label: "Dark", icon: "🌙" },
  { name: "light", label: "Light", icon: "☀️" },
  { name: "royal", label: "Royal", icon: "✦" },
  { name: "pink", label: "Sexy Pink", icon: "💖" }
];

const savedTheme = localStorage.getItem("theme") || "dark";
const validSavedTheme = themes.some((theme) => theme.name === savedTheme)
  ? savedTheme
  : "dark";

root.setAttribute("data-theme", validSavedTheme);

function updateThemeButton() {
  const currentTheme = root.getAttribute("data-theme");
  const theme = themes.find((item) => item.name === currentTheme) || themes[0];

  themeIcon.textContent = theme.icon;
  themeName.textContent = theme.label;
}

updateThemeButton();

btn.addEventListener("click", () => {
  const currentTheme = root.getAttribute("data-theme");
  const currentIndex = themes.findIndex((item) => item.name === currentTheme);
  const nextTheme = themes[(currentIndex + 1) % themes.length];

  root.setAttribute("data-theme", nextTheme.name);
  localStorage.setItem("theme", nextTheme.name);
  updateThemeButton();
});

// =======================
// CURSOR MOTION
// =======================
const cursorDot = document.querySelector(".cursor-dot");
const cursorRing = document.querySelector(".cursor-ring");
const cursorShadow = document.querySelector(".cursor-shadow");
const hasFinePointer = window.matchMedia("(pointer: fine)").matches;

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let ringX = mouseX;
let ringY = mouseY;

let shadowX = mouseX;
let shadowY = mouseY;

function moveCursor(event) {
  mouseX = event.clientX;
  mouseY = event.clientY;

  cursorDot.style.left = `${mouseX}px`;
  cursorDot.style.top = `${mouseY}px`;
}

function animateCursor() {
  ringX += (mouseX - ringX) * 0.16;
  ringY += (mouseY - ringY) * 0.16;

  shadowX += (mouseX - shadowX) * 0.08;
  shadowY += (mouseY - shadowY) * 0.08;

  cursorRing.style.left = `${ringX}px`;
  cursorRing.style.top = `${ringY}px`;

  cursorShadow.style.left = `${shadowX}px`;
  cursorShadow.style.top = `${shadowY}px`;

  requestAnimationFrame(animateCursor);
}

function bindCursorHover() {
  if (!hasFinePointer) return;

  document.querySelectorAll("a, button, .card").forEach((element) => {
    element.addEventListener("mouseenter", () => {
      cursorRing.classList.add("active");
    });

    element.addEventListener("mouseleave", () => {
      cursorRing.classList.remove("active");
    });
  });
}

if (hasFinePointer) {
  window.addEventListener("mousemove", moveCursor);
  animateCursor();
}

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

grid.innerHTML = "";

projects.forEach((project, index) => {
  const el = document.createElement("div");
  const title = document.createElement("h3");

  el.className = "card";
  el.setAttribute("role", "link");
  el.setAttribute("tabindex", "0");
  el.style.animation = `fadeUp 0.7s ease ${index * 45}ms both`;

  title.textContent = project.name;
  el.appendChild(title);

  function openProject() {
    window.open(
      `Projects/${project.folder}/index.html`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  el.addEventListener("click", openProject);

  el.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openProject();
    }
  });

  grid.appendChild(el);
});

bindCursorHover();
