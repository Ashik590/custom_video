// Variables and Constants

const video = document.querySelector("video");
const durationControl = document.querySelector(".duration-control");
const prog = document.querySelector(".prog");
let mousedown = false;
let mousedown2 = false;
const playBtn = document.getElementById("play");
const disSc = document.querySelector(".disSc");
const disMin = document.querySelector(".disMin");
const volumeIcon = document.querySelector(".volCh i");
const volume = document.querySelector(".volume");
const volumeProg = document.querySelector(".volumeProg");
const volParAfter = document.querySelector(".volumeParent .after");
const skipLeft = document.querySelector(".skip-left");
const skipRight = document.querySelector(".skip-right");
const fullScreen = document.querySelector(".full");

// Event listeners

durationControl.addEventListener("mousedown", function () {
  mousedown = true;
});
durationControl.addEventListener("mouseup", function () {
  mousedown = false;
});
volume.addEventListener("mousedown", function () {
  mousedown2 = true;
});
volume.addEventListener("mouseup", function () {
  mousedown2 = false;
});
durationControl.addEventListener("mousemove", durConFunc);
durationControl.addEventListener("click", durConFunc2);
playBtn.addEventListener("click", playFunc);
video.addEventListener("click", playFunc);
video.addEventListener("play", playing);
video.addEventListener("timeupdate", updateTime);
volumeIcon.addEventListener("click", volumeIconChng);
volume.addEventListener("click", volumeFunc);
volume.addEventListener("mousemove", volumeFunc2);
skipLeft.addEventListener("click", skipLeftFunc);
skipRight.addEventListener("click", skipRightFunc);
fullScreen.addEventListener("click", fullScreenFunc);

//Logical functions

function durConFunc(e) {
  if (mousedown) {
    let durValue = (e.offsetX / e.target.clientWidth) * 100; 
    if(durValue < 0){
      durValue = 0;
    }
    else if(durValue > 100){
      durValue = 100;
    }
    let durTime = (durValue * video.duration) / 100;
    video.currentTime = durTime;
    prog.style.width = `${durValue}%`;
  }
}
function durConFunc2(e) {
  let durValue = (e.offsetX / e.target.clientWidth) * 100; 
  if(durValue < 0){
    durValue = 0;
  }
  else if(durValue > 100){
    durValue = 100;
  }
  let durTime = (durValue * video.duration) / 100;
  video.currentTime = durTime;
  prog.style.width = `${durValue}%`;
}
function playFunc() {
  if (video.paused) {
    video.play();
    playBtn.classList.remove("fa-play");
    playBtn.classList.add("fa-pause");
  } else {
    playBtn.classList.add("fa-play");
    playBtn.classList.remove("fa-pause");
    video.pause();
  }
}

function playing() {
  setInterval(() => {
    let curTime = video.currentTime;
    let dur = video.duration;
    let progTime = Math.floor((curTime / dur) * 100);
    durationControl.value = progTime;
    prog.style.width = `${durationControl.value}%`;
  }, 500);
}

function updateTime(){
  let min = Math.floor(video.currentTime / 60);
  let sc = Math.floor(video.currentTime) - (min*60)
  
  if(min>=10){
    disMin.innerHTML=min;
  }else{
    disMin.innerHTML=`0${min}`;
  }
  if(sc>=10){
    disSc.innerHTML=sc;
  }else{
    disSc.innerHTML=`0${sc}`;
  }
}

function volumeIconChng(){
  if(volumeIcon.classList.contains("fa-volume-up")){
    volumeIcon.classList.replace("fa-volume-up", "fa-volume-mute")
    video.volume = 0;
    volumeProg.style.width = "0%";
    volParAfter.style.width= "14px";
  }else{
    volumeIcon.classList.replace("fa-volume-mute","fa-volume-up")
    video.volume = 1;
    volumeProg.style.width = "90%";
    volParAfter.style.width= "16px";
  }
}
function volumeFunc(e){
  let volValue = (e.offsetX / e.target.clientWidth);
  if(volValue<0){
    volValue = 0;
  }else if(volValue > 1){
    volValue = 1;
  }
  volumeProg.style.width = `${volValue * 90}%`;
  video.volume = volValue;
  if(video.volume === 0){
    volumeIcon.classList.replace("fa-volume-up", "fa-volume-mute")
  }
  else{
    volumeIcon.classList.replace("fa-volume-mute","fa-volume-up")
  }
  if(volumeProg.style.width <= "15%"){
    volParAfter.style.width= "14px";
  }else{
    volParAfter.style.width= "16px";
  }
}
function volumeFunc2(e){
  if(mousedown2){
    let volValue = (e.offsetX / e.target.clientWidth);
    if(volValue<0){
      volValue = 0;
    }else if(volValue > 1){
      volValue = 1;
    }
    volumeProg.style.width = `${volValue * 90}%`;
    video.volume = volValue;
    if(video.volume === 0){
      volumeIcon.classList.replace("fa-volume-up", "fa-volume-mute")
    }
    else{
      volumeIcon.classList.replace("fa-volume-mute","fa-volume-up")
    }
    if(volumeProg.style.width <= "15%"){
      volParAfter.style.width= "14px";
    }else{
      volParAfter.style.width= "16px";
    }
  }
}

function skipLeftFunc(){
  video.currentTime = video.currentTime - 10;
}
function skipRightFunc(){
  video.currentTime = video.currentTime + 10;
}
function fullScreenFunc(){
  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.webkitRequestFullscreen) {
    video.webkitRequestFullscreen();
  } else if (video.msRequestFullscreen) {
    video.msRequestFullscreen();
  }
}
