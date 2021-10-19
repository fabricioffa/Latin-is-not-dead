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





// questionBox.addEventListener('click', e => {
//     const answer = e.target.nextElementSibling;
    
//     if (answer.style.display === 'none') answer.style.display = 'inline';
//     // elem.nextElementSibling.style.display = 'none';
//     answer.style.display = 'none';
//     console.log()

// })

// questions.forEach(question => {
//     question.addEventListener('click', e => {
//         const answer = e.target.nextSibling;
//         console.log(answer);
//         // if (answer.style.display === 'none') answer.style.display === 'inline';
//         // answer.style.display === 'none';
//     });
// });



