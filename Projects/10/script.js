const API = "https://www.themealdb.com/api/json/v1/1";

const form = document.getElementById("form");
const search = document.getElementById("search");
const mealsEl = document.getElementById("meals");
const singleEl = document.getElementById("single-meal");
const stateEl = document.getElementById("state");
const randomBtn = document.getElementById("random");

/* ================= STATE ================= */
function setState(msg){
  stateEl.innerText = msg;
}

/* ================= FETCH ================= */
async function fetchData(url){
  try{
    const res = await fetch(url);
    if(!res.ok) throw new Error();
    return await res.json();
  }catch{
    setState("❌ API Error");
    return null;
  }
}

/* ================= SEARCH ================= */
async function searchMeals(term){
  setState("Loading...");
  singleEl.innerHTML = "";

  const data = await fetchData(`${API}/search.php?s=${term}`);

  if(!data || !data.meals){
    mealsEl.innerHTML = "";
    setState("No results found");
    return;
  }

  setState("");
  renderMeals(data.meals);
}

/* ================= RENDER GRID ================= */
function renderMeals(meals){
  mealsEl.innerHTML = meals.map(meal=>`
    <div class="meal" data-id="${meal.idMeal}">
      <img src="${meal.strMealThumb}">
      <div class="meal-info">
        <h3>${meal.strMeal}</h3>
      </div>
    </div>
  `).join("");
}

/* ================= SINGLE MEAL ================= */
async function getMeal(id){
  setState("Loading...");
  mealsEl.innerHTML = "";

  const data = await fetchData(`${API}/lookup.php?i=${id}`);
  const meal = data?.meals?.[0];

  if(!meal){
    setState("Meal not found");
    return;
  }

  setState("");
  renderSingle(meal);
}

function renderSingle(meal){
  const ingredients = [];

  for(let i=1;i<=20;i++){
    const ing = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    if(ing){
      ingredients.push(`${ing} - ${measure}`);
    }
  }

  singleEl.innerHTML = `
    <div class="single-meal">
      <h2>${meal.strMeal}</h2>
      <img src="${meal.strMealThumb}">
      <p>${meal.strInstructions}</p>
      <h3>Ingredients</h3>
      <ul>
        ${ingredients.map(i=>`<li>${i}</li>`).join("")}
      </ul>
    </div>
  `;
}

/* ================= RANDOM ================= */
async function randomMeal(){
  const data = await fetchData(`${API}/random.php`);
  renderSingle(data.meals[0]);
  mealsEl.innerHTML = "";
  setState("");
}

/* ================= EVENTS ================= */
form.addEventListener("submit", e=>{
  e.preventDefault();

  const term = search.value.trim();
  if(!term) return;

  searchMeals(term);
  search.value = "";
});

randomBtn.addEventListener("click", randomMeal);

mealsEl.addEventListener("click", e=>{
  const card = e.target.closest(".meal");
  if(card){
    getMeal(card.dataset.id);
  }
});