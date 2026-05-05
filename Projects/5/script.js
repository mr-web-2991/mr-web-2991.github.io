const balance = document.getElementById('balance');
const moneyPlus = document.getElementById('money-plus');
const moneyMinus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const empty = document.getElementById('empty');

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

/* ADD */
form.addEventListener('submit', e=>{
 e.preventDefault();

 if(!text.value || !amount.value) return;

 const transaction = {
  id: Date.now(),
  text: text.value,
  amount: +amount.value
 };

 transactions.push(transaction);
 save();
 render();

 form.reset();
});

/* DELETE */
function removeTransaction(id){
 transactions = transactions.filter(t=>t.id !== id);
 save();
 render();
}

/* SAVE */
function save(){
 localStorage.setItem('transactions', JSON.stringify(transactions));
}

/* RENDER */
function render(){
 list.innerHTML = '';

 if(transactions.length === 0){
  empty.style.display = 'block';
 }else{
  empty.style.display = 'none';
 }

 transactions.forEach(t=>{
  const li = document.createElement('li');
  li.className = t.amount < 0 ? 'minus' : 'plus';

  li.innerHTML = `
    ${t.text}
    <span>${t.amount > 0 ? '+' : ''}${t.amount}</span>
    <button class="delete-btn">x</button>
  `;

  li.querySelector('.delete-btn').onclick = ()=>removeTransaction(t.id);

  list.appendChild(li);
 });

 updateStats();
}

/* STATS */
function updateStats(){
 const amounts = transactions.map(t=>t.amount);

 const total = amounts.reduce((a,b)=>a+b,0).toFixed(2);
 const income = amounts.filter(a=>a>0).reduce((a,b)=>a+b,0).toFixed(2);
 const expense = (amounts.filter(a=>a<0).reduce((a,b)=>a+b,0)*-1).toFixed(2);

 balance.innerText = `$${total}`;
 moneyPlus.innerText = `+$${income}`;
 moneyMinus.innerText = `-$${expense}`;
}

/* INIT */
render();