import throttle from 'lodash.throttle';

const form = document.querySelector('form.feedback-form');
const emailEl = document.querySelector('label [name="email"]');
const messageEl = document.querySelector('label [name="message"]');

const STORAGE_KEY = 'feedback-form-state';

form.addEventListener('input', throttle(onFormInput, 500));

function onFormInput() {
    const email = emailEl.value;
    const message = messageEl.value;

    const formData = {
        email,
        message,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}
onPageReload();

function onPageReload() {
    const savedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (savedMessage) {
        emailEl.value = savedMessage.email;
        messageEl.value = savedMessage.message;
    }
}

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
    e.preventDefault();
    const email = emailEl.value;
    const message = messageEl.value;

    if (email == '' || message == '') {
        alert('Enter both input parameters!');
        form.reset();
        return;
    }
    const formData = { email, message };
    console.log(formData);
    form.reset();

    localStorage.removeItem(STORAGE_KEY);
}
