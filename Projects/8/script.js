const postsEl = document.getElementById("posts");
const loader = document.getElementById("loader");
const search = document.getElementById("search");
const sentinel = document.getElementById("sentinel");

let page = 1;
let limit = 5;
let loading = false;
let postsData = [];

/* FETCH */
async function fetchPosts(){
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );
  return await res.json();
}

/* RENDER */
function render(posts){
  posts.forEach(p=>{
    const el = document.createElement("div");
    el.className = "post";
    el.innerHTML = `
      <h3>${p.title}</h3>
      <p>${p.body}</p>
    `;
    postsEl.appendChild(el);
  });
}

/* LOAD */
async function loadPosts(){
  if(loading) return;

  loading = true;
  loader.classList.add("show");

  const data = await fetchPosts();

  postsData = [...postsData, ...data];
  render(data);

  loader.classList.remove("show");
  loading = false;
}

/* 🔥 INFINITE SCROLL (مضمون) */
window.addEventListener("scroll", ()=>{
  const {scrollTop, scrollHeight, clientHeight} = document.documentElement;

  if(scrollTop + clientHeight >= scrollHeight - 100){
    page++;
    loadPosts();
  }
});

/* SEARCH */
search.addEventListener("input", e=>{
  const term = e.target.value.toLowerCase();

  postsEl.innerHTML = "";

  const filtered = postsData.filter(p =>
    p.title.toLowerCase().includes(term) ||
    p.body.toLowerCase().includes(term)
  );

  render(filtered);
});

/* INIT */
loadPosts();