const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('search');
const results = document.getElementById('results');

const audio = document.getElementById('audio');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

/* THEME */
const themeBtn = document.getElementById('themeBtn');
const themeMenu = document.getElementById('themeMenu');
const themeLabel = document.getElementById('themeLabel');

themeBtn.addEventListener('click',()=>{
  themeMenu.classList.toggle('show');
});

themeMenu.querySelectorAll('div').forEach(item=>{
  item.addEventListener('click',()=>{
    const theme = item.getAttribute('data-theme');

    document.body.className = theme;
    themeLabel.textContent = item.textContent;

    localStorage.setItem('theme', theme);
    themeMenu.classList.remove('show');
  });
});

window.addEventListener('click',(e)=>{
  if(!themeBtn.contains(e.target) && !themeMenu.contains(e.target)){
    themeMenu.classList.remove('show');
  }
});

/* LOAD SAVED THEME */
const savedTheme = localStorage.getItem('theme');
if(savedTheme){
  document.body.className = savedTheme;
}

/* SEARCH MUSIC (WORKING API) */
searchBtn.addEventListener('click', searchSongs);

async function searchSongs(){
  const query = searchInput.value.trim();
  if(!query) return;

  const res = await fetch(`https://itunes.apple.com/search?term=${query}&media=music&limit=10`);
  const data = await res.json();

  results.innerHTML = data.results.map(song=>`
    <div onclick="playSong('${song.previewUrl}','${song.trackName}','${song.artworkUrl100}')">
      ${song.artistName} - ${song.trackName}
    </div>
  `).join('');
}

/* PLAY SONG */
function playSong(url, songName, img){
  audio.src = url;
  title.innerText = songName;
  cover.src = img;

  audio.play();
}