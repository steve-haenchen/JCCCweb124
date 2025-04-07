/*  Steven Haenchen
    JCCC Web 124 Spring 2025
    Source: Wes Bos' JavaScript30 course
            08 - Fun With HTML Canvas
    Due: 4/06/2025
*/

"use strict"; // requirement: use strict

const checkbox = document.getElementById('lineSizing');
var lineSizingSetting = "no";
const colorsDropdown = document.getElementById("colors");
var colorValue = "red";
const lineEndingDropdown = document.getElementById("lineEnding");
var lineEndingValue = "round";
const gcoDropdown = document.getElementById("gco");
var gcoValue = gcoDropdown.value;
const picClear = document.getElementById("picClear");
const pic2draw = document.getElementById("pic2draw");
const drawMe = ["boy on a bicycle",
  "girl bringing flower",
  "boy fishing",
  "girl riding horse"];

checkbox.addEventListener('change', function() {
  if (checkbox.checked) {
    lineSizingSetting = "yes";
  } else {
    lineSizingSetting = "no";
  }
});
colorsDropdown.addEventListener('change', function() {
  colorValue = colorsDropdown.value;
});
lineEndingDropdown.addEventListener('change', function() {
  lineEndingValue = lineEndingDropdown.value;
  ctx.lineJoin = lineEndingValue;
  ctx.lineCap = lineEndingValue;
});
gcoDropdown.addEventListener('change', function() {
  gcoValue = gcoDropdown.value;
  ctx.globalCompositeOperation = gcoValue;
});
picClear.addEventListener('click', function() {
  ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
});
pic2draw.addEventListener('click', function() {
  ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
  var l = drawMe.length;
  var sel = Math.floor(Math.random() * l);
  alert("Try drawing '" + drawMe[sel] + "'");
});


const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;

canvas.height = window.innerHeight;
ctx.strokeStyle = '#BADA55';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 100;
// ctx.globalCompositeOperation = "multiply";

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

function draw(e) {
  if (!isDrawing) return; // stop the fn from running when they are not moused down
  console.log(e);
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  ctx.beginPath();
  // start from
  ctx.moveTo(lastX, lastY);
  // go to
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];

  switch (colorValue) {
      case "red":
        hue = 0;
        break;
      case "yellow":
        hue = 60;
        break;
      case "green":
        hue = 120;
        break;
      case "lightblue":
        hue = 180;
        break;
      case "blue":
        hue = 240;
        break;
      case "violet":
        hue = 300;
        break;
      case "black":
        hue = 359;
        break;
      case "changing":
        hue++;
        if (hue >= 360) {
          hue = 0;
        }
        break;
      default:
        alert(colorValue);
  }
  if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
    direction = !direction;
  }

  if (lineSizingSetting === "yes") {
    if(direction) {
      ctx.lineWidth++;
    } else {
      ctx.lineWidth--;
    }  
  }
 
}

canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});


canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);
