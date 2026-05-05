const products = [
  {name:'PS5',url:'images/playstation_5.png',type:'games',price:499},
  {name:'Galaxy',url:'images/samsung_galaxy.png',type:'smartphones',price:399},
  {name:'Canon',url:'images/cannon_eos_camera.png',type:'cameras',price:749},
  {name:'Sony A7',url:'images/sony_a7_camera.png',type:'cameras',price:1999},
  {name:'LG TV',url:'images/lg_tv.png',type:'televisions',price:799},
  {name:'Switch',url:'images/nintendo_switch.png',type:'games',price:299},
  {name:'Xbox',url:'images/xbox_series_x.png',type:'games',price:499},
  {name:'Samsung TV',url:'images/samsung_tv.png',type:'televisions',price:1099},
  {name:'Pixel',url:'images/google_pixel.png',type:'smartphones',price:499},
  {name:'Sony ZV1',url:'images/sony_zv1f_camera.png',type:'cameras',price:799},
  {name:'Toshiba',url:'images/toshiba_tv.png',type:'televisions',price:499},
  {name:'iPhone 14',url:'images/iphone_14.png',type:'smartphones',price:999}
];

const wrapper = document.getElementById('products-wrapper');
const checks = document.querySelectorAll('.check');
const search = document.getElementById('search');
const cartCount = document.getElementById('cartCount');

const cartBtn = document.getElementById('cartButton');
const cartDrawer = document.getElementById('cartDrawer');
const closeCart = document.getElementById('closeCart');
const cartItemsEl = document.getElementById('cartItems');

let cart = [];
const elements = [];

/* CREATE PRODUCTS */
products.forEach((p,i)=>{
  const el = document.createElement('div');
  el.className='item';

  el.innerHTML=`
    <img src="${p.url}">
    <p>${p.name}</p>
    <strong>$${p.price}</strong>
    <div class="status">Add To Cart</div>
  `;

  const btn = el.querySelector('.status');

  btn.onclick=()=>{
    const exists = cart.find(x=>x.name===p.name);

    if(exists){
      cart = cart.filter(x=>x.name!==p.name);
      btn.classList.remove('added');
      btn.innerText='Add To Cart';
    }else{
      cart.push(p);
      btn.classList.add('added');
      btn.innerText='Remove';
    }

    cartCount.innerText = cart.length;
    renderCart();
  };

  wrapper.appendChild(el);
  elements.push(el);
});

/* CART UI */
function renderCart(){
  cartItemsEl.innerHTML = cart.map(i=>`
    <div>${i.name} - $${i.price}</div>
  `).join('');
}

/* OPEN / CLOSE */
cartBtn.onclick=()=>cartDrawer.classList.add('open');
closeCart.onclick=()=>cartDrawer.classList.remove('open');

/* FILTER */
function filter(){
  const term = search.value.toLowerCase();
  const active = [...checks].filter(c=>c.checked).map(c=>c.id);

  elements.forEach((el,i)=>{
    const p = products[i];

    const show =
      p.name.toLowerCase().includes(term) &&
      (active.length===0 || active.includes(p.type));

    el.style.display = show ? 'block' : 'none';
  });
}

search.addEventListener('input',filter);
checks.forEach(c=>c.addEventListener('change',filter));