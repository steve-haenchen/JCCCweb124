/*  Steven Haenchen
    JCCC Web 124 Spring 2025
    Source: Wes Bos' JavaScript30 course
            15 - Local Storage and Delegation
    Due: 3/16/2025
*/

"use strict"; // requirement: use strict

// Assign key elements in the DOM to variables for easier reference
const addItems = document.querySelector(".add-items");
const itemsList = document.querySelector(".plates");
const items = JSON.parse(localStorage.getItem("items")) || []; // Reads existing items from storage, if any, else start with empty array
const checkbox = document.getElementById("markAll");
const markAllLabel = document.getElementById("markAllLabel");
const addDinners = document.querySelector(".add-dinners");
const dinners = JSON.parse(localStorage.getItem("dinners")) || []; // Reads existing items from storage, if any, else start with empty array
const dinnerList = document.querySelector(".dinners");

function addItem(e) {
  e.preventDefault();
  var text = this.querySelector("[name=item]").value;
  // set to proper case
  text = toProperCase(text);
  // check if this is a duplicate entry
  var $i;
  for ($i = 0; $i < items.length; $i++) {
    if (text == items[$i].text) {
      break;
    }
  }
  if ($i >= items.length) {
    const item = {
      text,
      done: false,
    };
    items.push(item);
    sortArrayBySubItem(items, "text");
    populateList(items, itemsList);
    localStorage.setItem("items", JSON.stringify(items));
    this.reset();
  } else {
    alert("Duplicate entry not allowed");
  }
}

function addDinner(e) {
  e.preventDefault();
  var text = this.querySelector("[name=dinner]").value;
  // set to proper case
  text = toProperCase(text);
  var $j;
  var $cnt = 0;
  var $contents = '';
  for ($j = 0; $j < items.length; $j++) {
    if (items[$j].done) {
      $cnt++;
      $contents += items[$j].text + " ";
    }
  }
  if ($cnt < 1) {
    alert("You must have a least one item selected for your dinner");
  } else {
    text = text + " (" + $contents + ")";
    // check if this is a duplicate entry
    var $i;
    for ($i = 0; $i < dinners.length; $i++) {
      if (text == dinners[$i].text) {
        break;
      }
    }
    if ($i >= dinners.length) {
      const dinner = {
          text,
          done: false,
      };
      dinners.push(dinner);
      sortArrayBySubItem(dinners, "text");
      populateList(dinners, dinnerList);
      localStorage.setItem("dinners", JSON.stringify(dinners));
      this.reset();
    } else {
      alert("Duplicate entry not allowed");
    }
  }
}


function populateList(plates = [], platesList) {
  platesList.innerHTML = plates
    .map((plate, i) => {
      return `
      <li>
        <input type="checkbox" data-index=${i} id="item${i}" ${
        plate.done ? "checked" : ""
      } />
        <label for="item${i}">${plate.text}</label>
      </li>
    `;
    })
    .join("");
}

function populateDinners(dinners = [], dinnersList) {
  dinnersList.innerHTML = dinners
    .map((dinner, i) => {
      return `
      <li>
        <input type="checkbox" data-index=${i} id="item${i}" ${
        dinner.done ? "checked" : ""
      } />
        <label for="item${i}">${dinner.text}</label>
      </li>
    `;
    })
    .join("");
}

function toggleDone(e) {
  if (!e.target.matches("input")) return; // skip this unless it's an input
  const el = e.target;
  const index = el.dataset.index;
  items[index].done = !items[index].done;
  localStorage.setItem("items", JSON.stringify(items));
  populateList(items, itemsList);
}

function toggleDinner(e) {
  if (!e.target.matches("input")) return; // skip this unless it's an input
  const el = e.target;
  const index = el.dataset.index;
  dinners[index].done = !dinners[index].done;
  localStorage.setItem("dinners", JSON.stringify(dinners));
  populateList(dinners, dinnersList);
}

addItems.addEventListener("submit", addItem);
addDinners.addEventListener("submit", addDinner);
itemsList.addEventListener("click", toggleDone);
dinnerList.addEventListener("click", toggleDinner);
checkbox.addEventListener("change", function (event) {
  if (event.target.checked) {
    // Checkbox is checked
    console.log("Checkbox is checked");
    // Change caption to Unmark all
    markAllLabel.textContent = "Unmark All";
    // Mark them all (setting to Done)
    for (var $i = 0; $i < items.length; $i++) {
      items[$i].done = true;
    }
    // Save the new settings
    localStorage.setItem("items", JSON.stringify(items));
    // Redisplay with the new settings
    populateList(items, itemsList);
  } else {
    // Checkbox is unchecked
    console.log("Checkbox is unchecked");
    // Change caption to Mark all
    markAllLabel.textContent = "Mark All";
    // Unmark them all (setting to !Done)
    for (var $i = 0; $i < items.length; $i++) {
      items[$i].done = false;
    }
    // Save the new settings
    localStorage.setItem("items", JSON.stringify(items));
    // Redisplay with the new settings
    populateList(items, itemsList);
  }
});

// From Google AI Overview
function toProperCase(myString) {
  return myString
    .toLowerCase()
    .split(" ")
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

// From Google AI Overview
function sortArrayBySubItem(arr, index) {
  arr.sort(function (a, b) {
    if (a[index] < b[index]) {
      return -1;
    }
    if (a[index] > b[index]) {
      return 1;
    }
    return 0;
  });
  return arr;
}

populateList(items, itemsList);
populateDinners(dinners, dinnerList);

