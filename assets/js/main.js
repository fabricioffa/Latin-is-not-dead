import gridConttroler from "./GridConttroler.js";
import FormValidator from "./FormValidator.js";

const menuLinks = document.querySelectorAll('.menu a');
const grids = document.querySelectorAll('.grid');
const contactUs = document.querySelector('.contact form');

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


const btnRight = document.querySelector('.fa-caret-right');
const btnLeft = document.querySelector('.fa-caret-left');
const courseGrid = document.querySelector('.course-grid');

btnRight.addEventListener('click', () => {
    // console.log(courseGrid);
    gridConttroler.slideGrid(courseGrid, 'right');
});

btnLeft.addEventListener('click', () => {
    // console.log(courseGrid);
    gridConttroler.slideGrid(courseGrid, 'left');
});



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



