const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const progress = document.getElementById('progress');
const progressBar = document.getElementById('progress-bar');
const timestamp = document.getElementById('timestamp');
const overlay = document.getElementById('overlay');
const volume = document.getElementById('volume');
const speed = document.getElementById('speed');
const fullscreen = document.getElementById('fullscreen');
const pip = document.getElementById('pip');
const wrapper = document.getElementById('wrapper');
const preview = document.getElementById('preview');
const player = document.getElementById('player');

let hideTimeout;

/* PLAY */
function toggleVideo(){
 video.paused ? video.play() : video.pause();
}

/* UI */
function updateUI(){
 play.textContent = video.paused ? '▶' : '❚❚';
 overlay.style.opacity = video.paused ? 1 : 0;
}

/* PROGRESS */
function updateProgress(){
 const percent = (video.currentTime / video.duration) * 100;
 progress.value = percent;
 progressBar.style.width = percent + '%';

 const mins = Math.floor(video.currentTime / 60);
 const secs = Math.floor(video.currentTime % 60);

 timestamp.textContent =
 `${mins<10?'0'+mins:mins}:${secs<10?'0'+secs:secs}`;

 localStorage.setItem('video-time', video.currentTime);
}

/* RESUME */
video.addEventListener('loadedmetadata', ()=>{
 const saved = localStorage.getItem('video-time');
 if(saved){
  video.currentTime = saved;
 }
});

/* SEEK */
function setProgress(){
 video.currentTime = (progress.value / 100) * video.duration;
}

/* STOP */
function stopVideo(){
 video.pause();
 video.currentTime = 0;
}

/* VOLUME */
volume.oninput = ()=> video.volume = volume.value;

/* SPEED */
speed.onchange = ()=> video.playbackRate = speed.value;

/* FULLSCREEN */
fullscreen.onclick = ()=>{
 if(!document.fullscreenElement){
  wrapper.requestFullscreen();
 }else{
  document.exitFullscreen();
 }
};

/* PiP */
pip.onclick = async ()=>{
 if(document.pictureInPictureElement){
  document.exitPictureInPicture();
 }else{
  await video.requestPictureInPicture();
 }
};

/* PREVIEW */
progress.addEventListener('mousemove', e=>{
 const rect = progress.getBoundingClientRect();
 const percent = (e.clientX - rect.left) / rect.width;
 const time = percent * video.duration;

 const mins = Math.floor(time / 60);
 const secs = Math.floor(time % 60);

 preview.textContent =
 `${mins<10?'0'+mins:mins}:${secs<10?'0'+secs:secs}`;

 preview.style.left = e.clientX - rect.left + 'px';
 preview.style.opacity = 1;
});

progress.addEventListener('mouseleave', ()=>{
 preview.style.opacity = 0;
});

/* AUTO HIDE */
function showControls(){
 player.classList.remove('hide');
 clearTimeout(hideTimeout);

 hideTimeout = setTimeout(()=>{
  if(!video.paused){
   player.classList.add('hide');
  }
 },2000);
}

document.addEventListener('mousemove', showControls);

/* DOUBLE CLICK SEEK */
wrapper.addEventListener('dblclick', e=>{
 const mid = wrapper.offsetWidth / 2;
 if(e.offsetX < mid){
  video.currentTime -= 10;
 }else{
  video.currentTime += 10;
 }
});

/* KEYBOARD */
document.addEventListener('keydown', e=>{
 if(e.code === 'Space') toggleVideo();
 if(e.code === 'ArrowRight') video.currentTime += 5;
 if(e.code === 'ArrowLeft') video.currentTime -= 5;
 if(e.key === 'f') fullscreen.click();
 if(e.key === 'm') video.muted = !video.muted;
});

/* EVENTS */
video.onclick = toggleVideo;
overlay.onclick = toggleVideo;

video.addEventListener('play', updateUI);
video.addEventListener('pause', updateUI);
video.addEventListener('timeupdate', updateProgress);

play.onclick = toggleVideo;
stop.onclick = stopVideo;
progress.oninput = setProgress;