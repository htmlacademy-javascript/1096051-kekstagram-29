import { isEscapeKey } from './util.js';

const form = document.querySelector('.img-upload__form');
const fieldUploadImage = form.querySelector('.img-upload__input');
const modalEditImage = form.querySelector('.img-upload__overlay');
const closeModalButton = form.querySelector('.img-upload__cancel');
const fieldHashtag = form.querySelector('.text__hashtags');
const pristine = new Pristine(form);

const isDuplicateElement = (array) => array.some((element) => array.indexOf(element) !== array.lastIndexOf(element));

pristine.addValidator(fieldHashtag, (value) => {
  value = value.trim();

  const valueArray = value.split(' ');
  const regExp = /^#[a-zа-яё0-9]{1,19}$/i;
  let isValidate = true;

  if(valueArray.length > 5) {
    isValidate = false;
  } else {
    isValidate = valueArray.every((element) => regExp.test(element)) && !isDuplicateElement(valueArray);
  }

  return isValidate;
});

const closeModal = () => {
  document.body.classList.remove('modal-open');
  modalEditImage.classList.add('hidden');
  fieldUploadImage.value = '';
};

const openModal = () => {
  modalEditImage.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const onFieldUploadChange = () => openModal();

const onSubmitForm = (evt) => {
  evt.preventDefault();
  console.log(pristine.validate());
};

const onKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
};

const initUploadImageForm = () => {
  form.addEventListener('submit', onSubmitForm);
  fieldUploadImage.addEventListener('change', onFieldUploadChange);
  closeModalButton.addEventListener('click', closeModal);
  document.addEventListener('keydown', onKeyDown);
};

export { initUploadImageForm };
