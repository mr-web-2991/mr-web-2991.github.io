document.addEventListener("DOMContentLoaded", () => {

  // =======================
  // THEME SYSTEM
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
  // HIDE BTN ON SCROLL
  // =======================
  let last = 0;

  window.addEventListener("scroll", () => {
    const current = window.scrollY;

    if (current > last && current > 50) {
      btn.classList.add("hide");
    } else {
      btn.classList.remove("hide");
    }

    last = current;
  });

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

  if (!grid) {
    console.error("Grid not found ❌");
    return;
  }

  projects.forEach((project) => {
    const el = document.createElement("div");
    el.className = "card";

    el.innerHTML = `<h3>${project.name}</h3>`;

    el.onclick = () =>
      window.open(`Projects/${project.folder}/index.html`, "_blank");

    grid.appendChild(el);
  });

});

// =======================
// CURSOR SYSTEM
// =======================
const cursor = document.querySelector(".cursor");
const follower = document.querySelector(".cursor-follower");

let posX = 0;
let posY = 0;
let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
});

// smooth follow (cinematic feel)
function animateCursor() {
  posX += (mouseX - posX) * 0.15;
  posY += (mouseY - posY) * 0.15;

  follower.style.transform = `translate(${posX}px, ${posY}px)`;

  requestAnimationFrame(animateCursor);
}

animateCursor();

// hover interactions
const hoverElements = document.querySelectorAll("a, button, .card");

hoverElements.forEach(el => {
  el.addEventListener("mouseenter", () => {
    cursor.classList.add("active");
    follower.classList.add("active");
  });

  el.addEventListener("mouseleave", () => {
    cursor.classList.remove("active");
    follower.classList.remove("active");
  });
});