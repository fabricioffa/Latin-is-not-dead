import gridConttroler from "./GridConttroler.js";
import FormValidator from "./FormValidator.js";

const menuLinks = document.querySelectorAll('.menu a');
const grids = document.querySelectorAll('.grid');
const contactUs = document.querySelector('.contact form');
const slideBtns = document.querySelectorAll('.slide-btn');

const formValidator = new FormValidator(contactUs);

// MENU

// Toogles off the menu when a link is clicked



menuLinks.forEach(link => link.addEventListener('click', e => {
    let hamburguerToogle = document.querySelector('#hamburguer-toogle');
    hamburguerToogle.checked = false;
}))

// GRIDS

let timeout = false;
const delay = 250;

window.addEventListener('resize', () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => gridConttroler.formatGrids(grids), delay);
});

window.addEventListener('load', () => {
    gridConttroler.formatGrids(grids);
});

slideBtns.forEach(btn => btn.addEventListener('click', (e) => {
    if (btn.classList.contains('fa-caret-right')) {
        const grid = e.target.nextElementSibling;
        console.log(grid)
        gridConttroler.slideGrid(grid, 'right');
        return;
    }

    const grid = e.target.previousElementSibling;
    gridConttroler.slideGrid(grid, 'left');
}));



//
//  F.A.Q.
//

const questions = document.querySelectorAll('.question');

questions.forEach(question => question.addEventListener('click', e => {

    if (e.target.tagName === 'P') {
        const answer = e.target;

        return answer.style.display = 'none';
    }

    const answer = e.target.nextElementSibling;

    if (answer.style.display === 'none') {
        return answer.style.display = 'block';;
    }

    answer.style.display = 'none';
}))



