const menuLinks = document.querySelectorAll('.menu a');
const grids = document.querySelectorAll('.grid');
const contactUs = document.querySelector('.contact form');

// MENU

// Toogles off the menu when a link is clicked

menuLinks.forEach(link => link.addEventListener('click', e => {
    let hamburguerToogle = document.querySelector('#hamburguer-toogle');
    hamburguerToogle.checked = false;
}))

// GRIDS

class GridConttroler {

    countColumns(grid) {
        const columnsNumber = window.getComputedStyle(grid)
            .getPropertyValue('grid-template-columns')
            .split(' ')
            .length;
        return columnsNumber;
    }

    countRows(grid) {
        const rowsNumber = window.getComputedStyle(grid)
            .getPropertyValue('grid-template-rows')
            .split(' ')
            .length;
        return rowsNumber;
    }

    countItems(grid) {
        const itemsNum = this.countColumns(grid) * this.countRows(grid);
        return itemsNum;
    }

    hideRows(grid, itemSelector) {
        this.showRows(grid, itemSelector);

        if (this.countRows(grid) > 1) {
            const gridItems = Array.from(grid.querySelectorAll(itemSelector));
            const colsPerRow = this.countColumns(grid);
            const otherRowsCols = gridItems.slice(colsPerRow);

            for (let col of otherRowsCols) {
                col.style.display = 'none';
            };
        }

        return this;
    }

    showRows(grid, itemSelector) {
        const gridItems = Array.from(grid.querySelectorAll(itemSelector));
        const colsPerRow = this.countColumns(grid);
        const firstRowCols = gridItems.slice(0, colsPerRow);

        for (let col of firstRowCols) {
            col.style.display = 'block';
        };

        return this;
    }

    formatGrids(grids) {
        grids.forEach(grid => {

            if (grid.classList.contains('intro-grid')) return;

            const gridItemClass = grid.querySelector('div').classList[0];

            this.hideRows(grid, `.${gridItemClass}`)
        });

        return this;
    }


}

const gridCtr = new GridConttroler;

let timeout = false;
const delay = 250;

window.addEventListener('resize', () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => gridCtr.formatGrids(grids), delay);
});

window.addEventListener('load', () => {
    gridCtr.formatGrids(grids);
});

//
//  Contact us
//


class FormValidator {
    constructor(form) {
        this.form = form;
        this.errorMessages = [];
        this.event();
    }

    event() {
        this.form.addEventListener('submit', e => {
            this.eventHandler(e)
        })
    }
    
    eventHandler(e) {
        e.preventDefault();
        
        document.querySelectorAll('.error-msg')
            .forEach(el => el.remove());

        if (!this.isValid()) return;

        e.target.submit();
    }

    isValid() {
        let valid = true;
        const { name, surname, country, email, massage } = this.form;

        if (this.areThereEmpties()) return valid = false;

        [name, surname, country].forEach(input => {
            if (input.value.length < 2 || input.value.length > 30) {
                this.displayErrors(input, `${input.getAttribute('name')} must have betweeen 2 and 30 characters.`)
                valid = false;
            }

            if(/\d/.test(input.value)) {
                this.displayErrors(input, `${input.getAttribute('name')} must contain letter only.`)
                valid = false;
            }

        })

        
        return valid;
    }

    areThereEmpties() {
        let empties = false;

        Array.from(this.form).forEach(el => {
            if (el.tagName === 'BUTTON') return;
            if (el.value === '') {
                this.displayErrors(el, `It's a necessary field`);
                return empties = true;
            }
        })

        return empties;
    }


    displayErrors(element, text) {
        const errorElement = this.createErrorElement(text);
        element.insertAdjacentElement('afterend', errorElement)
    }

    createErrorElement(text) {
        const errorP = document.createElement('P');
        errorP.classList.add('error-msg');
        errorP.innerText = text;

        return errorP;
    }

}

const formValidator = new FormValidator(contactUs);
