document.addEventListener("DOMContentLoaded", () => {

  // =====================
  // LENIS SMOOTH SCROLL
  // =====================
  const lenis = new Lenis({
    smooth: true,
    lerp: 0.08
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // =====================
  // PROJECTS
  // =====================
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

  projects.forEach(p => {
    const el = document.createElement("div");
    el.className = "card";
    el.innerHTML = `<h3>${p.name}</h3>`;

    el.onclick = () => window.open(`Projects/${p.folder}/index.html`);

    // PARALLAX LIGHT
    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      el.style.setProperty("--x", `${x}px`);
      el.style.setProperty("--y", `${y}px`);
    });

    grid.appendChild(el);
  });

  // =====================
  // CURSOR
  // =====================
  const cursor = document.querySelector(".cursor");
  const follower = document.querySelector(".cursor-follower");

  let mouseX = 0, mouseY = 0;
  let posX = 0, posY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  });

  function animateCursor(){
    posX += (mouseX - posX) * 0.15;
    posY += (mouseY - posY) * 0.15;

    follower.style.transform = `translate(${posX}px, ${posY}px)`;
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // =====================
  // MAGNETIC BUTTONS
  // =====================
  document.querySelectorAll(".card, .btn, a").forEach(el => {
    el.addEventListener("mousemove", e => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width/2;
      const y = e.clientY - rect.top - rect.height/2;

      el.style.transform = `translate(${x*0.15}px, ${y*0.15}px)`;
    });

    el.addEventListener("mouseleave", () => {
      el.style.transform = "";
    });
  });

  // =====================
  // GLOW FOLLOW
  // =====================
  const glow = document.querySelector(".glow");

  document.addEventListener("mousemove", e => {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
  });

});