/*  Steven Haenchen
    JCCC Web 124 Spring 2025
    Source: Wes Bos' JavaScript30 course
            28 - Video Speed Controller
    Due: 4/27/2025
*/

"use strict"; // requirement: use strict

const speed = document.querySelector('.speed');
const bar = speed.querySelector('.speed-bar');
const video = document.querySelector('.flex');
let deg = 0;
let color1 = 0;
let color2 = 0;

function handleMove(e) {
    const y = e.pageY - this.offsetTop;
    const percent = y / this.offsetHeight;
    const min = 0.4;
    const max = 4;
    const height = Math.round(percent * 100) + '%';
    const playbackRate = percent * (max - min) + min;
    bar.style.height = height;
    bar.textContent = playbackRate.toFixed(2) + '×';
    video.playbackRate = playbackRate;
    // Used https://coolors.co to find hex values for colors
    if (video.playbackRate < .9) {
        bar.style.background = "linear-gradient(-90deg, #2376ae 0%, #c16ecf 100%)";
    } else if (video.playbackRate < 1.2) {
        bar.style.background = "linear-gradient(90deg, #99C1B9  0%, #A9E5BB 100%)";
    } else if (video.playbackRate < 2.0) {
      bar.style.background = "linear-gradient(-90deg, #FCF6B1  0%, #F7B32B 100%)";
    } else if (video.playbackRate < 3.0) {
      bar.style.background = "linear-gradient(90deg, #E3170A   0%, #A4303F 100%)";
    } else {
      bar.style.background = "#A4303F";
    }
}

function playBackwards() {
  video.pause();

  let fps = 7;
  let intervalRewind = setInterval(function () {
      if (video.currentTime <= 0) {
          clearInterval(intervalRewind);
          video.pause();
      } else {
          video.currentTime -= video.playbackRate / fps;
      }
      deg++;
      if (deg > 360) {
        deg = 0;
      }
      color1 = (Math.floor(Math.random() * 256)).toString(16) + (Math.floor(Math.random() * 256)).toString(16) + (Math.floor(Math.random() * 256)).toString(16);
      color2 = (Math.floor(Math.random() * 256)).toString(16) + (Math.floor(Math.random() * 256)).toString(16) + (Math.floor(Math.random() * 256)).toString(16);
      bar.style.background = "linear-gradient(" + deg.toString() + "deg, #" + color1 + " 0%, #" + color2 + " 100%)";
  }, 1000 / fps);
};


speed.addEventListener('mousemove', handleMove);
bar.addEventListener('dblclick', playBackwards);
alert("Double-click the speed selection bar on the right to play the video in reverse!");
