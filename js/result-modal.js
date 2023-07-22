import { isEscapeKey } from './util.js';

const successModalTemplate = document.querySelector('#success').content;
const errorModalTemplate = document.querySelector('#error').content;
const successModalElement = successModalTemplate.querySelector('.success');
const errorModalElement = errorModalTemplate.querySelector('.error');

let modal;
let closeButtonElement;

const onKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    removeModal();
  }
};

const onOutsideClick = (evt) => {
  const isOutside = evt.target.closest('.success__inner') || evt.target.closest('.error__inner');
  if (!isOutside) {
    removeModal();
  }
};

const createModal = (isSucces) => {
  if (isSucces) {
    modal = successModalElement.cloneNode(true);
    closeButtonElement = modal.querySelector('.success__button');
  } else {
    modal = errorModalElement.cloneNode(true);
    modal.classList.add('error-message');
    closeButtonElement = modal.querySelector('.error__button');
  }

  document.body.append(modal);
  closeButtonElement.addEventListener('click', removeModal);
  modal.addEventListener('click', onOutsideClick);
  document.addEventListener('keydown', onKeyDown);
};

function removeModal() {
  closeButtonElement.removeEventListener('click', removeModal);
  document.removeEventListener('keydown', onKeyDown);
  modal.removeEventListener('click', onOutsideClick);
  modal.remove();
}

const isErrorMessageShown = () => document.querySelector('.error-message');

export { createModal, isErrorMessageShown};
