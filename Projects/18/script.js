const msgEl = document.getElementById("msg");
const micBtn = document.getElementById("micBtn");
const wave = document.getElementById("wave");
const statusEl = document.getElementById("status");
const input = document.getElementById("manualInput");
const submitBtn = document.getElementById("submitBtn");

let randomNum = Math.floor(Math.random() * 100) + 1;

// SOUND FEEDBACK
const successSound = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-correct-answer-tone-2870.mp3");
const errorSound = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-error-tone-2871.mp3");

// SPEECH API
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = null;

if (SpeechRecognition) {
  recognition = new SpeechRecognition();

  recognition.addEventListener("result", (e) => {
    const msg = e.results[0][0].transcript;
    processGuess(msg);
  });

  recognition.addEventListener("end", () => {
    micBtn.classList.remove("active");
    wave.classList.remove("active");
    statusEl.innerText = "Click mic & speak";
  });

} else {
  statusEl.innerText = "Voice not supported, use typing 👇";
}

// MIC CLICK
micBtn.addEventListener("click", () => {
  if (!recognition) return;

  micBtn.classList.add("active");
  wave.classList.add("active");
  statusEl.innerText = "Listening...";
  recognition.start();
});

// INPUT
submitBtn.addEventListener("click", () => {
  processGuess(input.value);
  input.value = "";
});

// CORE
function processGuess(msg) {
  const num = +msg;

  msgEl.innerHTML = `<div>You said: <b>${msg}</b></div>`;

  if (Number.isNaN(num)) {
    errorSound.play();
    msgEl.innerHTML += `<div class="bad">Not a valid number</div>`;
    return;
  }

  if (num < 1 || num > 100) {
    errorSound.play();
    msgEl.innerHTML += `<div class="bad">Must be 1 - 100</div>`;
    return;
  }

  if (num === randomNum) {
    successSound.play();
    document.body.innerHTML = `
      <div style="text-align:center;color:white">
        <h1>🎉 Correct!</h1>
        <h2>The number was ${num}</h2>
        <button onclick="location.reload()">Play Again</button>
      </div>
    `;
  } 
  else if (num > randomNum) {
    errorSound.play();
    msgEl.innerHTML += `<div class="bad">Go Lower ↓</div>`;
  } 
  else {
    errorSound.play();
    msgEl.innerHTML += `<div class="good">Go Higher ↑</div>`;
  }
}