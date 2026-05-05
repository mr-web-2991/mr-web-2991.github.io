const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");
const successEl = document.getElementById("success");
const strengthBar = document.querySelector(".strength span");
const btn = form.querySelector("button");

/* ===== Helpers ===== */

function showError(input, msg){
  const parent = input.parentElement;
  parent.className = "form-group error";
  parent.querySelector("small").innerText = msg;
}

function showSuccess(input){
  const parent = input.parentElement;
  parent.className = "form-group success";
}

function isEmailValid(email){
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ===== Password Strength ===== */

function checkStrength(val){
  let score = 0;

  if(val.length > 6) score++;
  if(/[A-Z]/.test(val)) score++;
  if(/[0-9]/.test(val)) score++;
  if(/[^A-Za-z0-9]/.test(val)) score++;

  const widths = ["0%","25%","50%","75%","100%"];
  const colors = ["#ef4444","#f97316","#eab308","#22c55e","#22d3ee"];

  strengthBar.style.width = widths[score];
  strengthBar.style.background = colors[score];
}

/* ===== Validation ===== */

function validate(){
  let valid = true;

  if(username.value.trim().length < 3){
    showError(username,"Username min 3 chars");
    valid = false;
  }else showSuccess(username);

  if(!isEmailValid(email.value)){
    showError(email,"Invalid email");
    valid = false;
  }else showSuccess(email);

  if(password.value.length < 6){
    showError(password,"Password min 6 chars");
    valid = false;
  }else showSuccess(password);

  if(password.value !== password2.value){
    showError(password2,"Passwords mismatch");
    valid = false;
  }else showSuccess(password2);

  return valid;
}

/* ===== Events ===== */

username.addEventListener("input", ()=> validate());
email.addEventListener("input", ()=> validate());
password.addEventListener("input", ()=>{
  checkStrength(password.value);
  validate();
});
password2.addEventListener("input", ()=> validate());

form.addEventListener("submit",(e)=>{
  e.preventDefault();

  if(!validate()) return;

  btn.classList.add("loading");

  setTimeout(()=>{
    successEl.innerText = "✅ Account created successfully";
    form.reset();
    strengthBar.style.width = "0%";
    btn.classList.remove("loading");

    document.querySelectorAll(".form-group").forEach(g=>{
      g.classList.remove("success");
    });

  },1000);
});