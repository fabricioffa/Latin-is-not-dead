import gridController from "./GridController.js";
import FormValidator from "./FormValidator.js";

const menuLinks = document.querySelectorAll(".menu a");
const grids = document.querySelectorAll(".grid");
const contactUs = document.querySelector(".contact form");
const slideBtns = document.querySelectorAll(".slide-btn");
const questions = document.querySelectorAll(".question");
const arrowUp = document.querySelector(".arrow-up");
const hamburgerToggle = document.querySelector('#hamburger-toggle');

const formValidator = new FormValidator(contactUs);

//  MENU

// Toggles off the menu when a link is clicked

menuLinks.forEach((link) =>
  link.addEventListener("click", (e) => {
    let hamburgerToggle = document.querySelector("#hamburger-toggle");
    hamburgerToggle.checked = false;
  })
);

//  GRIDS

// Hides all rolls but the first, every time the the window is resized

//  The setTimeout and clearTimeout serve to limit the number of time the function is called:
//  If the event occur again before the delay, then the last call is aborted
let timeout = false;
let throttled = false;
const delay = 250;

window.addEventListener("resize", () => {
  clearTimeout(timeout);
  timeout = setTimeout(() => gridController.formatGrids(grids), delay);
});

window.addEventListener("scroll", () => {
    if (!throttled) {
      if (window.scrollY >= document.documentElement.clientHeight) {
        arrowUp.style.display = "inline-block";
        return;
      }
      
      arrowUp.style.display = "none";

      throttled = true;

      setTimeout(() => throttled = false, delay);
    }      
});

window.addEventListener("load", () => {
  gridController.formatGrids(grids);
});

/* Checks for clicks on slideBtns, then calls the slideGrid function
 with the direction parameter that corresponds the button position. */

// The buttons were all put one before the other after the grid, so as to facilitate getting the grid it is associated with.

slideBtns.forEach((btn) =>
  btn.addEventListener("click", (e) => {
    if (btn.classList.contains("fa-caret-right")) {
      const grid = e.target.nextElementSibling;

      gridController.slideGrid(grid, "right");

      return;
    }

    const grid = e.target.previousElementSibling;
    gridController.slideGrid(grid, "left");
  })
);

//  * F.A.Q.

// Shows or hides the answers every time a question is clicked

questions.forEach((question) =>
  question.addEventListener("click", (e) => {
    const answer = question.querySelector("p");

    // As at first there is no value in the style attribute, it checks for an empty string, so the first click works

    if (answer.style.display === "") {
      return (answer.style.display = "block");
    }

    if (answer.style.display === "none") {
      return (answer.style.display = "block");
    }

    answer.style.display = "none";
  })
);
