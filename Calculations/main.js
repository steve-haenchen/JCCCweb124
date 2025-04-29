/*  Steven Haenchen
    JCCC Web 124 Spring 2025
    Final Project
    Due: 5/6/2025
*/

"use strict"; // requirement: use strict

const intinput = document.getElementById("num");
intinput.value = "0";
const padd = document.getElementById("add");
const psub = document.getElementById("sub");
const pmul = document.getElementById("mul");
const pdiv = document.getElementById("div");
const cbutton = document.getElementById("calc");

function add10(inputvalue) {
  let result = "";
  for (var i=1; i<=10; i++) {
    result += i.toString() + " + " + inputvalue.toString() + " = " + (parseInt(i) + parseInt(inputvalue)).toString() + "\n";
  }
  return result;
}

function sub10(inputvalue) {
  let result = "";
  var i=1;
  while (i <= 10) {
    result += i.toString() + " - " + inputvalue.toString() + " = " + (parseInt(i) - parseInt(inputvalue)).toString() + "\n";
    i++;
  }
  return result;
}

function mul10(inputvalue) {
  let result = "";
  var i=1;
  do {
    result += i.toString() + " X " + inputvalue.toString() + " = " + (parseInt(i) * parseInt(inputvalue)).toString() + "\n";
  } while (i++ < 10);
  return result;
}

function div10(inputvalue) {
  let result = "";
  for (var i=1; i<=10; i++) {
    result += i.toString() + " / " + inputvalue.toString() + " = " + (parseInt(i) / parseInt(inputvalue)).toFixed(2) + "\n";
  }
  return result;
}

function update() {
  let inputvalue = intinput.value;
  padd.innerText = add10(inputvalue);
  psub.innerText = sub10(inputvalue);
  pmul.innerText = mul10(inputvalue);
  pdiv.innerText = div10(inputvalue);
}

cbutton.addEventListener('click', update);
