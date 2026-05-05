const seatsContainer = document.getElementById('seats');
const countEl = document.getElementById('count');
const totalEl = document.getElementById('total');
const movieSelect = document.getElementById('movie');
const resetBtn = document.getElementById('reset');
const screenText = document.getElementById('screen-text');

let ticketPrice = +movieSelect.value;

/* CREATE SEATS */
function createSeats(){
  seatsContainer.innerHTML = '';

  for(let i=0;i<48;i++){
    const seat = document.createElement('div');
    seat.classList.add('seat');

    if(Math.random() < 0.2){
      seat.classList.add('occupied');
    }

    seatsContainer.appendChild(seat);
  }
}

/* UPDATE SCREEN TITLE */
function updateScreenTitle(){
  const text = movieSelect.options[movieSelect.selectedIndex].text;
  screenText.textContent = text.split('($')[0];
}

/* UPDATE TOTAL */
function update(){
  const selected = document.querySelectorAll('.seat.selected');
  countEl.textContent = selected.length;
  totalEl.textContent = selected.length * ticketPrice;
}

/* CLICK */
seatsContainer.addEventListener('click', e=>{
  if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
    e.target.classList.toggle('selected');
    update();
  }
});

/* MOVIE CHANGE */
movieSelect.addEventListener('change', e=>{
  ticketPrice = +e.target.value;
  update();
  updateScreenTitle();
});

/* RESET */
resetBtn.addEventListener('click', ()=>{
  document.querySelectorAll('.seat.selected').forEach(s=>s.classList.remove('selected'));
  update();
});

/* INIT */
createSeats();
update();
updateScreenTitle();