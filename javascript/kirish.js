const musicContiner = document.getElementById('music-box');
const title = document.getElementById('title');

// buttonlar

const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const cover = document.getElementById('cover');
const prContiner = document.getElementById('prcontiner');
const progress = document.getElementById('progress');

// musiqalar nomi

const songs = ['arabic', 'Enquie', 'neboysa'];

let songIndex = 0;

function loadSong(song) {
    title.innerText = song
    audio.src = `music/${song}.mp3`
    cover.src = `images/${song}.jpg`
 }

 loadSong(songs[songIndex]);

 function playSong() {
   musicContiner.classList.add('play')
    playBtn.querySelector('i.fas').classList.remove('fa-play')
    playBtn.querySelector('i.fas').classList.add('fa-pause')

    audio.play()
 }

 function pauseSong() {
   musicContiner.classList.remove('play')
   playBtn.querySelector('i.fas').classList.add('fa-play')
   playBtn.querySelector('i.fas').classList.remove('fa-pause')

   audio.pause()
 }

 function prevSong(){
    songIndex--;
    if (songIndex<0) {
       songIndex = songs.length - 1
    }
    loadSong(songs[songIndex])
    playSong()
 }

 function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
      songIndex = 0
    }
    loadSong(songs[songIndex])

    playSong()
 }

 function updateProgress(e) {
    const {duration, currentTime} = e.srcElement;
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`
 }

 function setProgress(e) {
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration
    audio.currentTime = (clickX / width) * duration
}

playBtn.addEventListener('click', () => {
   const isPlaying = musicContiner.classList.contains('play')
   if (isPlaying) {
      pauseSong()
   }
   else{
      playSong()
   }
})

prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)

audio.addEventListener('timeupdate', updateProgress)

prContiner.addEventListener('click', setProgress)

audio.addEventListener('ended', nextSong)
