const currencyOne = document.getElementById('currency-one');
const currencyTwo = document.getElementById('currency-two');
const amountOne = document.getElementById('amount-one');
const amountTwo = document.getElementById('amount-two');
const rateEl = document.getElementById('rate');
const statusEl = document.getElementById('status');
const swapBtn = document.getElementById('swap');

let rates = {};
let timer;

/* INIT */
init();

async function init(){
  try{
    setStatus("Loading...");
    await fetchRates();
  }catch{
    const cached = localStorage.getItem("rates");
    if(cached){
      rates = JSON.parse(cached);
      setStatus("⚡ Offline mode");
    }else{
      setStatus("❌ No data");
      return;
    }
  }

  populateCurrencies();
  calculate();
  startAutoRefresh();
  setStatus("");
}

/* FETCH */
async function fetchRates(){
  const res = await fetch("https://open.exchangerate-api.com/v6/latest");

  if(!res.ok) throw new Error();

  const data = await res.json();

  rates = data.rates;
  localStorage.setItem("rates", JSON.stringify(rates));
}

/* AUTO REFRESH */
function startAutoRefresh(){
  clearInterval(timer);
  timer = setInterval(fetchRates, 60000);
}

/* POPULATE (FIX DUPLICATION) */
function populateCurrencies(){
  currencyOne.innerHTML = '';
  currencyTwo.innerHTML = '';

  Object.keys(rates).forEach(c=>{
    const opt1 = new Option(c, c);
    const opt2 = new Option(c, c);

    currencyOne.add(opt1);
    currencyTwo.add(opt2);
  });

  currencyOne.value = "USD";
  currencyTwo.value = "EUR";
}

/* CALCULATE */
function calculate(){
  const from = currencyOne.value;
  const to = currencyTwo.value;

  if(!rates[from] || !rates[to]) return;

  const rate = rates[to] / rates[from];

  rateEl.innerText = `1 ${from} = ${rate.toFixed(4)} ${to}`;
  amountTwo.value = (amountOne.value * rate).toFixed(2);
}

/* EVENTS */
currencyOne.addEventListener('change', calculate);
currencyTwo.addEventListener('change', calculate);
amountOne.addEventListener('input', calculate);

swapBtn.addEventListener('click', ()=>{
  [currencyOne.value, currencyTwo.value] =
  [currencyTwo.value, currencyOne.value];

  calculate();
});

/* STATUS */
function setStatus(msg){
  statusEl.innerText = msg;
}