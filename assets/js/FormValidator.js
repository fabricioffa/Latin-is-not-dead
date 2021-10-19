export default class FormValidator {
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

            if (/\d/.test(input.value)) {
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
