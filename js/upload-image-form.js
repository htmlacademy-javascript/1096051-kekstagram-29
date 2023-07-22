import { isEscapeKey } from './util.js';
import { createFilterSlider, resetImage } from './image-edit.js';
import { sendData } from './api.js';
import { createModal, isErrorMessageShown } from './result-modal.js';

const MAX_COUNT_HASHTAGS = 5;
const MAX_COMMENT_LETTERS = 140;
const REG_EXP = /^#[a-zа-яё0-9]{1,19}$/i;
const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const ButtonText = {
  BLOCK: 'Отправляю...',
  UNBLOCK: 'Отправить'
};
const Modal = {
  SUCCESS: true,
  ERROR: false
};
const HashtagErrorMessage = {
  MORE_QUANTITY: `Укажите не более ${MAX_COUNT_HASHTAGS} хештегов`,
  DUPLICATE: 'Не дублируйте хештеги.',
  FORMAT: 'Хештег должен начинаться с \'#\', содержать от 1 - 19 букв/цифр, без спец.символы.'
};

const formElement = document.querySelector('.img-upload__form');
const modalEditImageElement = formElement.querySelector('.img-upload__overlay');
const imagePreviewElement = formElement.querySelector('.img-upload__preview img');
const closeModalButtonElement = formElement.querySelector('.img-upload__cancel');
const fieldUploadImageElement = formElement.querySelector('.img-upload__input');
const fieldHashtagElement = formElement.querySelector('.text__hashtags');
const fieldCommentElement = formElement.querySelector('.text__description');
const buttonSubmitElement = formElement.querySelector('.img-upload__submit');
const effectsPreviewElement = formElement.querySelectorAll('.effects__preview');

const pristine = new Pristine(
  formElement,
  {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextClass: 'img-upload__error'
  }
);

let hashtagErrorMessge = '';

const validateHashtag = (value) => {
  hashtagErrorMessge = '';
  const valueArray = value
    .trim()
    .split(' ')
    .filter((tag) => Boolean(tag.length))
    .map((element) => element.toLowerCase());
  const isDuplicateTags = valueArray.length !== new Set(valueArray).size;

  if (!value) {
    return true;
  }

  if (valueArray.length > MAX_COUNT_HASHTAGS) {
    hashtagErrorMessge = HashtagErrorMessage.MORE_QUANTITY;
  } else if (isDuplicateTags) {
    hashtagErrorMessge = HashtagErrorMessage.DUPLICATE;
  } else if (!valueArray.every((element) => REG_EXP.test(element))) {
    hashtagErrorMessge = HashtagErrorMessage.FORMAT;
  }

  return !hashtagErrorMessge;
};

const validateCommment = (value) => value.trim().length <= MAX_COMMENT_LETTERS;

const onKeyDown = (evt) => {
  if (isEscapeKey(evt) && !isErrorMessageShown()) {
    evt.preventDefault();
    closeModal();
  }
};

function closeModal () {
  document.body.classList.remove('modal-open');
  modalEditImageElement.classList.add('hidden');
  formElement.reset();
  pristine.reset();
  resetImage();

  document.removeEventListener('keydown', onKeyDown);
}

const openModal = () => {
  modalEditImageElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  createFilterSlider();

  document.addEventListener('keydown', onKeyDown);
};

const onFieldUploadChange = () => {
  const file = fieldUploadImageElement.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((type) => fileName.endsWith(type));
  const effectsPreviewList = Array.from(effectsPreviewElement);

  imagePreviewElement.src = '';
  if (matches) {
    imagePreviewElement.src = URL.createObjectURL(file);
    effectsPreviewList.forEach((el) => {
      el.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
    });
    openModal();
  }
};


const blockSubmitButton = () => {
  buttonSubmitElement.disabled = true;
  buttonSubmitElement.textContent = ButtonText.BLOCK;
};

const unblockSubmitButton = () => {
  buttonSubmitElement.disabled = false;
  buttonSubmitElement.textContent = ButtonText.UNBLOCK;
};

const setOnFormSubmit = async (data) => {
  try {
    await sendData(data);
    closeModal();
    createModal(Modal.SUCCESS);
  } catch {
    createModal(Modal.ERROR);
  } finally {
    unblockSubmitButton();
  }
};

const onSubmitForm = (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    blockSubmitButton();
    setOnFormSubmit(new FormData(evt.target));
  }
};

const onFieldKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};


pristine.addValidator(
  fieldHashtagElement,
  validateHashtag,
  () => hashtagErrorMessge
);

pristine.addValidator(
  fieldCommentElement,
  validateCommment
);

formElement.addEventListener('submit', onSubmitForm);
fieldUploadImageElement.addEventListener('change', onFieldUploadChange);
closeModalButtonElement.addEventListener('click', closeModal);

fieldHashtagElement.addEventListener('keydown', onFieldKeydown);
fieldCommentElement.addEventListener('keydown', onFieldKeydown);
