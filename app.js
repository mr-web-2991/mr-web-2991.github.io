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