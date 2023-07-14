import { isEscapeKey } from './util.js';
import { createFilterSlider, resetImage } from './image-edit.js';

const MAX_COUNT_HASHTAGS = 5;
const MAX_COMMENT_LETTERS = 140;

const form = document.querySelector('.img-upload__form');
const modalEditImage = form.querySelector('.img-upload__overlay');
const closeModalButton = form.querySelector('.img-upload__cancel');
const fieldUploadImage = form.querySelector('.img-upload__input');
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

let hashtagErorMessge = '';

const validateHashtag = (value) => {
  hashtagErorMessge = '';
  const valueArray = value
    .trim()
    .split(' ')
    .filter((tag) => Boolean(tag.length))
    .map((element) => element.toLowerCase());
  const isDuplicateTags = valueArray.length !== new Set(valueArray).size;
  const regExp = /^#[a-zа-яё0-9]{1,19}$/i;

  if (!value) {
    return true;
  }

  if (valueArray.length > MAX_COUNT_HASHTAGS) {
    hashtagErorMessge = `Укажите не более ${MAX_COUNT_HASHTAGS} хештегов`;
  } else if (isDuplicateTags) {
    hashtagErorMessge = 'Не дублируйте хештеги.';
  } else if (!valueArray.every((element) => regExp.test(element))) {
    hashtagErorMessge = 'Хештег должен начинаться с \'#\', содержать от 1 - 19 букв/цифр, без спец.символы.';
  }

  return !hashtagErorMessge;
};

const validateCommment = (value) => value.trim().length <= MAX_COMMENT_LETTERS;

const closeModal = () => {
  document.body.classList.remove('modal-open');
  modalEditImage.classList.add('hidden');
  form.reset();
  pristine.reset();
  resetImage();
};

const openModal = () => {
  modalEditImage.classList.remove('hidden');
  document.body.classList.add('modal-open');
  createFilterSlider();
};

const onFieldUploadChange = () => openModal();

const onSubmitForm = (evt) => {
  evt.preventDefault();
  pristine.validate();
};

const onKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
};

const onFieldKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
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

form.addEventListener('submit', onSubmitForm);
document.addEventListener('keydown', onKeyDown);
fieldUploadImage.addEventListener('change', onFieldUploadChange);
closeModalButton.addEventListener('click', closeModal);

fieldHashtag.addEventListener('keydown', onFieldKeydown);
fieldComment.addEventListener('keydown', onFieldKeydown);
