/*  Steven Haenchen
    JCCC Web 124 Spring 2025
    Source: Wes Bos' JavaScript30 course
            11 - Custom Video Player
    Due: 4/20/2025
*/

"use strict"; // requirement: use strict

/* Get Our Elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullscreenButton = document.getElementById('full_screen');
const videoloopButton = document.getElementById('video_loop');
const videomuteButton = document.getElementById('video_mute');
const bossButton = document.getElementById('boss');

let fullscreen = false;
let videoloop = false;
let videomute = false;

/* Build out functions */
function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  console.log(icon);
  toggle.textContent = icon;
}

function skip() {
 video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// Methods found using Google (AI results)
function toggleFullScreen() {
  if (fullscreen) {
    document.exitFullscreen();
  } else {
    video.requestFullscreen();
  }
  fullscreen = !fullscreen;
}

function toggleVideoLoop() {
  videoloop = !videoloop;
  alert("Video Looping has been turned " + (videoloop ? "On" : "Off"));
  video.loop = videoloop;
}

function toggleVideoMute() {
  videomute = !videomute;
  //alert("Video Muting has been turned " + (videomute ? "On" : "Off"));
  video.muted = videomute;
}

function setBoss() {
  // set video to boss.mp4
  video.src = "boss.mp4";
  // looping on
  video.loop = true;
  // mute
  video.muted = true;
  // set full screen
  video.requestFullscreen();
  video.play();
  // cannot un-boss -- sorry!
}

/* Hook up the event listeners */
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
fullscreenButton.addEventListener("click",toggleFullScreen);
videoloopButton.addEventListener("click",toggleVideoLoop);
videomuteButton.addEventListener("click",toggleVideoMute);
bossButton.addEventListener("click",setBoss);

skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

// start-up - get url parameters
// if parameter movie and value within limits, change vidoe to "playMen.mp4"
// Source: https://www.google.com/search?client=firefox-b-1-e&q=javascript+get+variables+from+url
const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('myParam');
// debug info
// for (const key of urlParams.keys()) {
//   console.log(key);
// }
// for (const value of urlParams.values()) {
//     console.log(value)
// }
// console.log(urlParams.get("movie"));
const movienum = parseInt(urlParams.get("movie"));
if (movienum > 0 && movienum < 3) {
  // movie should be in folder
  console.log("playMe" + movienum + ".mp4");
  video.src = "playMe" + movienum + ".mp4";
}
const autonum = parseInt(urlParams.get("auto"));
if (autonum > 0) {
  videomute = true;
  video.muted = videomute;
  video.play();
}
