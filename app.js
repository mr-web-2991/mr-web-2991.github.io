const root = document.documentElement;
const btn = document.getElementById("themeBtn");

root.setAttribute("data-theme", localStorage.getItem("theme") || "dark");

btn.onclick = () => {
 const t = root.getAttribute("data-theme") === "light" ? "dark" : "light";
 root.setAttribute("data-theme", t);
 localStorage.setItem("theme", t);
};

let last = 0;

window.addEventListener("scroll", () => {
 const current = window.scrollY;

 if(current > last && current > 50){
  btn.classList.add("hide");
 } else {
  btn.classList.remove("hide");
 }

 last = current;
});

/* PROJECTS */
const grid = document.getElementById("grid");

for(let i = 1; i <= 20; i++){
 const el = document.createElement("div");
 el.className = "card";
 el.innerHTML = `<h3>Project ${i}</h3>`;
 el.onclick = () => window.open(`Projects/${i}/index.html`, "_blank");
 grid.appendChild(el);
}