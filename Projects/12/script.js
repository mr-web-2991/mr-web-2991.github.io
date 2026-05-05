const toggle = document.getElementById("toggle");
const modal = document.getElementById("modal");
const openBtn = document.getElementById("open");
const closeBtn = document.getElementById("close");

const form = document.getElementById("form");

const nameEl = document.getElementById("name");
const emailEl = document.getElementById("email");
const passEl = document.getElementById("password");
const pass2El = document.getElementById("password2");

/* ================= NAV ================= */
toggle.onclick = (e)=>{
  e.stopPropagation();
  document.body.classList.toggle("show-nav");
};

document.addEventListener("click", (e)=>{
  if(!e.target.closest("nav") && !e.target.closest("#toggle")){
    document.body.classList.remove("show-nav");
  }
});

/* ================= MODAL ================= */
openBtn.onclick = ()=> modal.classList.add("show");
closeBtn.onclick = ()=> modal.classList.remove("show");

modal.addEventListener("click", e=>{
  if(e.target === modal) modal.classList.remove("show");
});

/* ================= SECURITY HELPERS ================= */
function sanitize(str){
  return str.replace(/[<>]/g, "");
}

function isValidEmail(email){
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ================= VALIDATION ================= */
function setError(input, msg){
  const small = input.nextElementSibling;
  small.innerText = msg;
}

function clearError(input){
  const small = input.nextElementSibling;
  small.innerText = "";
}

/* ================= SUBMIT ================= */
form.addEventListener("submit", e=>{
  e.preventDefault();

  let valid = true;

  const name = sanitize(nameEl.value.trim());
  const email = sanitize(emailEl.value.trim());
  const pass = passEl.value;
  const pass2 = pass2El.value;

  // Name
  if(name.length < 3){
    setError(nameEl,"Min 3 chars");
    valid = false;
  } else clearError(nameEl);

  // Email
  if(!isValidEmail(email)){
    setError(emailEl,"Invalid email");
    valid = false;
  } else clearError(emailEl);

  // Password
  if(pass.length < 6){
    setError(passEl,"Min 6 chars");
    valid = false;
  } else clearError(passEl);

  // Match
  if(pass !== pass2){
    setError(pass2El,"Passwords not match");
    valid = false;
  } else clearError(pass2El);

  if(!valid) return;

  // 🔐 SECURITY NOTE:
  // هنا فقط frontend validation
  // production لازم backend validation + hashing

  alert("Account Created Successfully ✅");

  form.reset();
  modal.classList.remove("show");
});