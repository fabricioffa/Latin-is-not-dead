import gridConttroler from "./GridConttroler.js";
import FormValidator from "./FormValidator.js";

const menuLinks = document.querySelectorAll('.menu a');
const grids = document.querySelectorAll('.grid');
const contactUs = document.querySelector('.contact form');
const slideBtns = document.querySelectorAll('.slide-btn');
const questions = document.querySelectorAll('.question');

const formValidator = new FormValidator(contactUs);

//  MENU

// Toogles off the menu when a link is clicked

menuLinks.forEach(link => link.addEventListener('click', e => {
  let hamburguerToogle = document.querySelector('#hamburguer-toogle');
  hamburguerToogle.checked = false;
}))

//  GRIDS

// Hides all rolls but the first, everytime the the window is resized
  
  //  The setTimeout and clearTimeout serve to limit the number of time the function is called:
  //  If the event occour again before the delay, then the last call is aborted 
let timeout = false; 
const delay = 250;

window.addEventListener('resize', () => {
  clearTimeout(timeout);
  timeout = setTimeout(() => gridConttroler.formatGrids(grids), delay);
});

  // The format is also applyed on load event

window.addEventListener('load', () => {
  gridConttroler.formatGrids(grids);
});

/* Checks for clicks on slideBtns, then calls the slideGrid function
 with the direction parameter that correspons the button position. */

  // The buttons were allput one before the other after the grid, so as to facilitate getting the grid it is associetate with. 

slideBtns.forEach(btn => btn.addEventListener('click', (e) => {
  if (btn.classList.contains('fa-caret-right')) {
    const grid = e.target.nextElementSibling;

    gridConttroler.slideGrid(grid, 'right');

    return;
  }

  const grid = e.target.previousElementSibling;
  gridConttroler.slideGrid(grid, 'left');
}));

//  * F.A.Q.

// Shows or hides the answers every time a question is clicked 

questions.forEach(question => question.addEventListener('click', e => {
  const answer = question.querySelector('p');

  // As at first there is no vlue in the style attribute, it checks for an empty string, so the first click works

  if (answer.style.display === '') {
    return answer.style.display = 'block';
  }

  if (answer.style.display === 'none') {
    return answer.style.display = 'block';
  }

  answer.style.display = 'none';
}))
