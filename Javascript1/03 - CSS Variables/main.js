/*  Steven Haenchen
    JCCC Web 124 Spring 2025
    Source: Wes Bos' JavaScript30 course
            03 - CSS Variables
    Due: 4/13/2025
*/

"use strict"; // requirement: use strict

var randomSpacing = false;
var randomBlur = false;
var randomBase = false;
var directionSpacing = 1;
var directionBlur = 1;
var tick;
var tickPict = 0;
const picts = ["david-clode-7_TTPznVIQI-unsplash.jpg",
    "dominik-lange-Lej_oqHljbk-unsplash.jpg",
    "karl-anderson-uqqdQ2XbQlk-unsplash.jpg",
    "mathew-schwartz-i4Y9hr5dxKc-unsplash.jpg",
    "michael-jerrard-he-xYeTSY3s-unsplash.jpg",
    "patrick-hendry-o4fi007rmTs-unsplash.jpg",
    "patrick-hendry-SzWUEOw2U_E-unsplash.jpg",
    "philippe-oursel-1TcROt1gu34-unsplash.jpg",
    "rendy-novantino-NgF--NZcUNE-unsplash.jpg",
    "richard-lee-F12BtzEeVyk-unsplash.jpg",
    "viktor-shimin-cEg2T3i-sPU-unsplash.jpg",
    "zdenek-machacek-vIx55PnjL58-unsplash.jpg"];
const inputs = document.querySelectorAll('.controls input');

function handleUpdate() {
  const suffix = this.dataset.sizing || '';
  document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
}

inputs.forEach(input => input.addEventListener('change', handleUpdate));
inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));

const pict1 = document.getElementById("pict");
const attribution1 = document.getElementById("attribution");

const input1 = document.getElementById("spacing");
const label1 = document.querySelector('label[for="spacing"]');
label1.addEventListener('click', function() {
    randomSpacing = !randomSpacing;
});

const input2 = document.getElementById("blur");
const label2 = document.querySelector('label[for="blur"]');
label2.addEventListener('click', function() {
    randomBlur = !randomBlur;
});

const input3 = document.getElementById("base");
const label3 = document.querySelector('label[for="base"]');
label3.addEventListener('click', function() {
    randomBase = !randomBase;
});

// From https://stackoverflow.com/questions/1484506/random-color-generator
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

setInterval(function() {
    if (randomSpacing) {
        if (Number(input1.value) == Number(input1.max) || Number(input1.value) == Number(input1.min)) {
            directionSpacing *= -1;
        }
        input1.value = (directionSpacing + Number(input1.value));
        const suffix = input1.dataset.sizing || '';
        document.documentElement.style.setProperty(`--spacing`, input1.value + suffix);
    }
    if (randomBlur) {
        if (Number(input2.value) == Number(input2.max) || Number(input2.value) == Number(input2.min)) {
            directionBlur *= -1;
        }
        input2.value = (directionBlur + Number(input2.value));
        const suffix = input2.dataset.sizing || '';
        document.documentElement.style.setProperty(`--blur`, input2.value + suffix);
    }
    if (randomBase) {
        tick = Number(input3.dataset.tick) + 1;
        if (tick > 10) {
            input3.value = getRandomColor();
            document.documentElement.style.setProperty(`--base`, input3.value);
            tick = 0;
        }
        input3.dataset.tick = tick;
    }
    tickPict++;
    if (tickPict > (input2.max - input2.min) * 2) {
        let length = picts.length;
        let index = Math.floor(Math.random() * length);
        pict1.src = picts[index];
        attribution1.innerHTML = picts[index];
        tickPict = 0;
    }
}, 1000);

alert("Click on the labels Spacing, Blur, and/or Base Color to start automation");
