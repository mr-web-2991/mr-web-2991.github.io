const wordEl = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endEl = document.getElementById('end');
const difficultySelect = document.getElementById('difficulty');

const words = [
  'design','frontend','javascript','performance','optimize',
  'react','developer','interface','animation','system'
];

let randomWord;
let score = 0;
let time = 10;
let difficulty = localStorage.getItem('difficulty') || 'medium';

difficultySelect.value = difficulty;

function getWord(){
  return words[Math.floor(Math.random()*words.length)];
}

function setWord(){
  randomWord = getWord();
  wordEl.textContent = randomWord;
}

function updateScore(){
  score++;
  scoreEl.textContent = score;
}

function updateTime(){
  time--;
  timeEl.textContent = time;

  if(time <= 0){
    gameOver();
  }
}

function gameOver(){
  endEl.classList.remove('hidden');
  endEl.innerHTML = `
    <h2>Game Over</h2>
    <p>Score: ${score}</p>
    <button onclick="location.reload()">Restart</button>
  `;
}

text.addEventListener('input', e=>{
  if(e.target.value === randomWord){
    setWord();
    updateScore();
    e.target.value = '';

    if(difficulty === 'hard') time += 2;
    else if(difficulty === 'medium') time += 3;
    else time += 5;
  }
});

difficultySelect.addEventListener('change', e=>{
  difficulty = e.target.value;
  localStorage.setItem('difficulty', difficulty);
});

setWord();
text.focus();
setInterval(updateTime,1000);