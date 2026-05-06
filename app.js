const root = document.documentElement;
const btn = document.getElementById("themeBtn");

/* THEME */
const saved = localStorage.getItem("theme") || "dark";
root.setAttribute("data-theme", saved);

btn.onclick = () => {
  const t = root.getAttribute("data-theme") === "light" ? "dark" : "light";
  root.setAttribute("data-theme", t);
  localStorage.setItem("theme", t);
};

/* PROJECTS */
const projects = [
 "Voice Command Interface",
 "Voice Controlled Guessing Game",
 "E-commerce Store Interface",
 "Wealth Analytics Dashboard",
 "Typing Speed Test App",
 "Expense Tracker",
 "Authentication Form",
 "Custom Video Player",
 "Breakout Game",
 "Hangman Game",
 "Breathing Exercise App",
 "Blog Platform UI",
 "Lyrics Search App",
 "Meal Finder App",
 "Flashcards App",
 "Landing Page UI",
 "Cinema Booking System",
 "Music Player SaaS",
 "New Year Countdown",
 "Project 20"
];

const grid = document.getElementById("grid");

projects.forEach((name, i) => {
 const el = document.createElement("div");
 el.className = "card";
 el.innerHTML = `<h3>${name}</h3>`;
 el.onclick = () => window.open(`Projects/${i+1}/index.html`, "_blank");
 grid.appendChild(el);
});