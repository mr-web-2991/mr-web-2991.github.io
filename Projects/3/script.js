const main = document.getElementById('main');
const search = document.getElementById('search');

const countEl = document.getElementById('count');
const avgEl = document.getElementById('avg');
const totalEl = document.getElementById('total');

const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const pageEl = document.getElementById('page');

const chart = document.getElementById('chart');
const ctx = chart.getContext('2d');

let data = JSON.parse(localStorage.getItem('users')) || [];
let page = 1;
const perPage = 6;

/* INIT */
if(data.length === 0){
 init();
} else {
 render();
}

async function init(){
 for(let i=0;i<6;i++) await addUser();
}

/* FETCH */
async function addUser(){
 const res = await fetch('https://randomuser.me/api/?nat=us');
 const json = await res.json();
 const u = json.results[0];

 data.push({
  name: `${u.name.first} ${u.name.last}`,
  money: Math.floor(Math.random()*1000000)
 });

 save();
 render();
}

/* SAVE */
function save(){
 localStorage.setItem('users', JSON.stringify(data));
}

/* ACTIONS */
function doubleMoney(){
 data = data.map(u=>({...u, money:u.money*2}));
 save();
 render();
}

function sortRich(){
 data.sort((a,b)=>b.money-a.money);
 render();
}

function filterMillionaires(){
 data = data.filter(u=>u.money>1000000);
 save();
 render();
}

function reset(){
 data = [];
 save();
 init();
}

/* SEARCH */
search.addEventListener('input', ()=>{
 page = 1;
 render();
});

/* PAGINATION */
prevBtn.onclick = ()=>{ if(page>1){page--; render();}};
nextBtn.onclick = ()=>{ if(page<Math.ceil(data.length/perPage)){page++; render();}};

/* RENDER */
function render(){

 const term = search.value.toLowerCase();
 let filtered = data.filter(u=>u.name.toLowerCase().includes(term));

 const start = (page-1)*perPage;
 const paginated = filtered.slice(start,start+perPage);

 main.innerHTML = '';

 if(paginated.length === 0){
  main.innerHTML = `<p style="opacity:.5">No data</p>`;
  return;
 }

 paginated.forEach(u=>{
  const el = document.createElement('div');
  el.className='row';
  el.innerHTML = `
   <strong>${u.name}</strong>
   <span>${format(u.money)}</span>
  `;
  main.appendChild(el);
 });

 updateStats(filtered);
 drawChart(filtered);

 pageEl.textContent = `Page ${page}`;
}

/* STATS */
function updateStats(arr){
 const total = arr.reduce((a,u)=>a+u.money,0);
 const avg = total / (arr.length || 1);

 countEl.textContent = `${arr.length} users`;
 avgEl.textContent = `Avg: ${format(avg)}`;
 totalEl.textContent = `Total: ${format(total)}`;
}

/* CHART */
function drawChart(arr){
 ctx.clearRect(0,0,chart.width,chart.height);

 const max = Math.max(...arr.map(u=>u.money),1);

 arr.slice(0,10).forEach((u,i)=>{
  const h = (u.money/max)*100;
  ctx.fillStyle = "#22d3ee";
  ctx.fillRect(i*60+20,120-h,30,h);
 });
}

/* FORMAT */
function format(n){
 return '$'+n.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g,",");
}

/* EVENTS */
document.getElementById('add-user').onclick = addUser;
document.getElementById('double').onclick = doubleMoney;
document.getElementById('sort').onclick = sortRich;
document.getElementById('millionaires').onclick = filterMillionaires;
document.getElementById('reset').onclick = reset;