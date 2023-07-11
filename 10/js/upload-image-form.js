import { isEscapeKey } from './util.js';

const MAX_COUNT_HASHTAGS = 5;
const MAX_COMMENT_LETTERS = 140;

const form = document.querySelector('.img-upload__form');
const fieldUploadImage = form.querySelector('.img-upload__input');
const modalEditImage = form.querySelector('.img-upload__overlay');
const closeModalButton = form.querySelector('.img-upload__cancel');
const fieldHashtag = form.querySelector('.text__hashtags');
const fieldComment = form.querySelector('.text__description');
const pristine = new Pristine(
  form,
  {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextClass: 'img-upload__error'
  }
);

let isFocus = false;
let hashtagErorMessge = '';

const isDuplicateElements = (array) => array.some((element) => array.indexOf(element) !== array.lastIndexOf(element));

const validateHashtag = (value) => {
  value = value.trim();
  hashtagErorMessge = '';
  const valueArray = value.split(' ').map((element) => element.toLowerCase());
  const regExp = /^#[a-zа-яё0-9]{1,19}$/i;
  if (!value) {
    return true;
  }

  if (valueArray.length > MAX_COUNT_HASHTAGS) {
    hashtagErorMessge = `Укажите не более ${MAX_COUNT_HASHTAGS} хештегов`;
  } else if (!valueArray.every((element) => regExp.test(element))) {
    hashtagErorMessge = 'Хештег должен начинаться с \'#\', содержать от 1 - 19 букв/цифр, без спец.символы.';
  } else if (isDuplicateElements(valueArray)) {
    hashtagErorMessge = 'Нельзя использовать повторяющиеся хештеги, регистр букв не учитывается.';
  }

  return !hashtagErorMessge;
};

const validateCommment = (value) => value.trim().length <= MAX_COMMENT_LETTERS;

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
  pristine.validate();
};

const onKeyDown = (evt) => {
  if (isEscapeKey(evt) && !isFocus) {
    evt.preventDefault();
    closeModal();
  }
};

const onFieldFocusIn = () => {
  isFocus = true;
};

const onFieldFocusOut = () => {
  isFocus = false;
};

const initUploadImageForm = () => {
  form.addEventListener('submit', onSubmitForm);
  fieldUploadImage.addEventListener('change', onFieldUploadChange);
  closeModalButton.addEventListener('click', closeModal);
  document.addEventListener('keydown', onKeyDown);

  fieldHashtag.addEventListener('focusin', onFieldFocusIn);
  fieldHashtag.addEventListener('focusout', onFieldFocusOut);
  fieldComment.addEventListener('focusin', onFieldFocusIn);
  fieldComment.addEventListener('focusout', onFieldFocusOut);
};

pristine.addValidator(
  fieldHashtag,
  validateHashtag,
  () => hashtagErorMessge
);

pristine.addValidator(
  fieldComment,
  validateCommment
);

export { initUploadImageForm };
