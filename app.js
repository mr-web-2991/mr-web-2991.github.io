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
// PROJECTS GRID + 3D FX
// =======================
const grid = document.getElementById("grid");

for (let i = 1; i <= 20; i++) {
  const el = document.createElement("div");
  el.className = "card";
  el.innerHTML = `<h3>Project ${i}</h3>`;

  el.onclick = () => window.open(`Projects/${i}/index.html`, "_blank");

  el.addEventListener("mousemove", (e) => {
    const rect = el.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -(y - centerY) / 12;
    const rotateY = (x - centerX) / 12;

    el.style.transform = `
      perspective(800px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.03)
    `;

    el.style.setProperty("--x", `${x}px`);
    el.style.setProperty("--y", `${y}px`);
  });

  el.addEventListener("mouseleave", () => {
    el.style.transform = `
      perspective(800px)
      rotateX(0deg)
      rotateY(0deg)
      scale(1)
    `;
  });

  grid.appendChild(el);
}

// =======================
// SCROLL ENGINE (🔥 FIX)
// =======================
let last = 0;
const hero = document.querySelector(".hero");

window.addEventListener("scroll", () => {
  const current = window.scrollY;

  // hide button
  if (current > last && current > 50) {
    btn.classList.add("hide");
  } else {
    btn.classList.remove("hide");
  }

  // parallax (smooth)
  if (hero) {
    hero.style.transform = `translateY(${current * 0.2}px)`;
  }

  last = current;
});

// =======================
// LOADER + PAGE FADE
// =======================
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");

  document.body.classList.add("loaded");

  if (!loader) return;

  loader.style.opacity = "0";

  setTimeout(() => {
    loader.style.display = "none";
  }, 600);
});

// =======================
// CUSTOM CURSOR
// =======================
const cursor = document.querySelector(".cursor");
const follower = document.querySelector(".cursor-follower");

let mouseX = 0, mouseY = 0;
let posX = 0, posY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  if (cursor) {
    cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  }
});

function animateCursor() {
  posX += (mouseX - posX) * 0.12;
  posY += (mouseY - posY) * 0.12;

  if (follower) {
    follower.style.transform = `translate(${posX}px, ${posY}px)`;
  }

  requestAnimationFrame(animateCursor);
}

animateCursor();

// =======================
// SMOOTH LINKS
// =======================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});