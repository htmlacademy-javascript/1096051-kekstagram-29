import { isEscapeKey } from './util.js';

const succesModalTemplate = document.querySelector('#success').content;
const errorModalTemplate = document.querySelector('#error').content;
const succesModalElement = succesModalTemplate.querySelector('.success');
const errorModalElement = errorModalTemplate.querySelector('.error');

let modal;
let closeButton;

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
    modal = succesModalElement.cloneNode(true);
    closeButton = modal.querySelector('.success__button');
  } else {
    modal = errorModalElement.cloneNode(true);
    modal.classList.add('error-message');
    closeButton = modal.querySelector('.error__button');
  }

  document.body.append(modal);
  closeButton.addEventListener('click', removeModal);
  modal.addEventListener('click', onOutsideClick);
  document.addEventListener('keydown', onKeyDown);
};

function removeModal() {
  closeButton.removeEventListener('click', removeModal);
  document.removeEventListener('keydown', onKeyDown);
  modal.removeEventListener('click', onOutsideClick);
  modal.remove();
}

const isErrorMessageShown = () => document.querySelector('.error-message');

export { createModal, isErrorMessageShown};
