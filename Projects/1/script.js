const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const rulesBtn = document.getElementById('rules-btn');
const closeBtn = document.getElementById('close-btn');
const rules = document.getElementById('rules');

const modeButtons = document.querySelectorAll('.mode');

let score = 0;

/* 🎮 MODES (⬇️ reduced speeds) */
let gameSpeed = 1.5;

const modes = {
  easy: 1.5,
  medium: 2.5,
  hard: 3.5
};

modeButtons.forEach(btn=>{
  btn.addEventListener('click',()=>{
    modeButtons.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');

    gameSpeed = modes[btn.dataset.mode];
    resetGame();
  });
});

/* BALL */
let ball = {};

function createBall(){
  ball = {
    x: canvas.width/2,
    y: canvas.height/2,
    size:10,
    dx: gameSpeed,
    dy: -gameSpeed
  };
}

createBall();

/* PADDLE (⬇️ speed reduced) */
const paddle = {
  x: canvas.width/2 - 50,
  y: canvas.height - 20,
  w:100,
  h:12,
  dx:0,
  speed:4   // was 8 → now 4
};

/* BRICKS */
const rows = 9;
const cols = 5;

const brick = {
  w:70,
  h:20,
  padding:10,
  offsetX:45,
  offsetY:60
};

let bricks = [];

function createBricks(){
  bricks = [];
  for(let i=0;i<rows;i++){
    bricks[i]=[];
    for(let j=0;j<cols;j++){
      const x = i*(brick.w+brick.padding)+brick.offsetX;
      const y = j*(brick.h+brick.padding)+brick.offsetY;
      bricks[i][j] = {x,y,visible:true};
    }
  }
}

createBricks();

/* DRAW */
function drawBall(){
  ctx.fillStyle='#22d3ee';
  ctx.beginPath();
  ctx.arc(ball.x,ball.y,ball.size,0,Math.PI*2);
  ctx.fill();
}

function drawPaddle(){
  ctx.fillStyle='#6366f1';
  ctx.fillRect(paddle.x,paddle.y,paddle.w,paddle.h);
}

function drawBricks(){
  bricks.forEach(col=>{
    col.forEach(b=>{
      if(b.visible){
        ctx.fillStyle='#06b6d4';
        ctx.fillRect(b.x,b.y,brick.w,brick.h);
      }
    });
  });
}

function drawScore(){
  ctx.fillStyle='#94a3b8';
  ctx.fillText(`Score: ${score}`, canvas.width-100,30);
}

/* MOVE */
function movePaddle(){
  paddle.x+=paddle.dx;

  if(paddle.x<0) paddle.x=0;
  if(paddle.x+paddle.w>canvas.width)
    paddle.x=canvas.width-paddle.w;
}

function moveBall(){
  ball.x+=ball.dx;
  ball.y+=ball.dy;

  if(ball.x+ball.size>canvas.width || ball.x-ball.size<0){
    ball.dx*=-1;
  }

  if(ball.y-ball.size<0){
    ball.dy*=-1;
  }

  if(
    ball.x>paddle.x &&
    ball.x<paddle.x+paddle.w &&
    ball.y+ball.size>paddle.y
  ){
    ball.dy = -gameSpeed;
  }

  bricks.forEach(col=>{
    col.forEach(b=>{
      if(b.visible){
        if(
          ball.x>b.x &&
          ball.x<b.x+brick.w &&
          ball.y>b.y &&
          ball.y<b.y+brick.h
        ){
          ball.dy*=-1;
          b.visible=false;
          score++;
        }
      }
    });
  });

  if(ball.y+ball.size>canvas.height){
    resetGame();
  }
}

/* RESET */
function resetGame(){
  createBall();
  createBricks();
  score = 0;
}

/* LOOP */
function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  drawBall();
  drawPaddle();
  drawBricks();
  drawScore();
}

function update(){
  movePaddle();
  moveBall();
  draw();
  requestAnimationFrame(update);
}

update();

/* CONTROLS */
document.addEventListener('keydown',e=>{
  if(e.key==='ArrowRight') paddle.dx=paddle.speed;
  if(e.key==='ArrowLeft') paddle.dx=-paddle.speed;
});

document.addEventListener('keyup',()=>{
  paddle.dx=0;
});

/* RULES */
rulesBtn.onclick = ()=> rules.classList.add('show');
closeBtn.onclick = ()=> rules.classList.remove('show');