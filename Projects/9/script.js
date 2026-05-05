const API = "https://api.lyrics.ovh";

const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");
const more = document.getElementById("more");
const loader = document.getElementById("loader");

let nextPage = null;
let prevPage = null;

/* ================= SEARCH ================= */
async function searchSongs(term){
  toggleLoader(true);

  try{
    const res = await fetch(`${API}/suggest/${term}`);
    const data = await res.json();

    nextPage = data.next || null;
    prevPage = data.prev || null;

    renderSongs(data.data);
    renderPagination();

  }catch{
    result.innerHTML = "<p>❌ Failed to fetch songs</p>";
  }

  toggleLoader(false);
}

/* ================= RENDER SONGS ================= */
function renderSongs(songs){
  result.innerHTML = songs.map(song=>`
    <div class="song">
      <span><strong>${song.artist.name}</strong> - ${song.title}</span>
      <button class="btn"
        data-artist="${song.artist.name}"
        data-title="${song.title}">
        Lyrics
      </button>
    </div>
  `).join("");
}

/* ================= PAGINATION ================= */
function renderPagination(){
  more.innerHTML = `
    ${prevPage ? `<button class="btn" id="prev">Prev</button>` : ""}
    ${nextPage ? `<button class="btn" id="next">Next</button>` : ""}
  `;

  if(prevPage){
    document.getElementById("prev").onclick = ()=>fetchPage(prevPage);
  }

  if(nextPage){
    document.getElementById("next").onclick = ()=>fetchPage(nextPage);
  }
}

/* ================= FETCH PAGE ================= */
async function fetchPage(url){
  toggleLoader(true);

  const res = await fetch(url);
  const data = await res.json();

  nextPage = data.next || null;
  prevPage = data.prev || null;

  renderSongs(data.data);
  renderPagination();

  toggleLoader(false);
}

/* ================= LYRICS ================= */
async function getLyrics(artist, title){
  toggleLoader(true);

  try{
    const res = await fetch(`${API}/v1/${artist}/${title}`);
    const data = await res.json();

    if(data.error){
      result.innerHTML = "<p>Lyrics not found</p>";
    }else{
      result.innerHTML = `
        <div class="lyrics">
          <h2>${artist} - ${title}</h2>
          <p>${data.lyrics}</p>
        </div>
      `;
    }

    more.innerHTML = "";

  }catch{
    result.innerHTML = "<p>Error loading lyrics</p>";
  }

  toggleLoader(false);
}

/* ================= LOADER ================= */
function toggleLoader(state){
  loader.style.display = state ? "block" : "none";
}

/* ================= EVENTS ================= */
form.addEventListener("submit", e=>{
  e.preventDefault();

  const term = search.value.trim();
  if(!term) return;

  searchSongs(term);
});

result.addEventListener("click", e=>{
  if(e.target.classList.contains("btn")){
    const artist = e.target.dataset.artist;
    const title = e.target.dataset.title;

    getLyrics(artist, title);
  }
});