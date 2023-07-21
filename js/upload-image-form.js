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

const form = document.querySelector('.img-upload__form');
const modalEditImage = form.querySelector('.img-upload__overlay');
const imagePreview = form.querySelector('.img-upload__preview img');
const closeModalButton = form.querySelector('.img-upload__cancel');
const fieldUploadImage = form.querySelector('.img-upload__input');
const fieldHashtag = form.querySelector('.text__hashtags');
const fieldComment = form.querySelector('.text__description');
const buttonSubmit = form.querySelector('.img-upload__submit');
const effectsPreview = form.querySelectorAll('.effects__preview');

const pristine = new Pristine(
  form,
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
  modalEditImage.classList.add('hidden');
  form.reset();
  pristine.reset();
  resetImage();

  document.removeEventListener('keydown', onKeyDown);
}

const openModal = () => {
  modalEditImage.classList.remove('hidden');
  document.body.classList.add('modal-open');
  createFilterSlider();

  document.addEventListener('keydown', onKeyDown);
};

const onFieldUploadChange = () => {
  const file = fieldUploadImage.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((type) => fileName.endsWith(type));
  const effectsPreviewList = Array.from(effectsPreview);

  if (matches) {
    imagePreview.src = URL.createObjectURL(file);
    effectsPreviewList.forEach((el) => {
      el.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
    });
    openModal();
  }
};


const blockSubmitButton = () => {
  buttonSubmit.disabled = true;
  buttonSubmit.textContent = ButtonText.BLOCK;
};

const unblockSubmitButton = () => {
  buttonSubmit.disabled = false;
  buttonSubmit.textContent = ButtonText.UNBLOCK;
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
  fieldHashtag,
  validateHashtag,
  () => hashtagErrorMessge
);

pristine.addValidator(
  fieldComment,
  validateCommment
);

form.addEventListener('submit', onSubmitForm);
fieldUploadImage.addEventListener('change', onFieldUploadChange);
closeModalButton.addEventListener('click', closeModal);

fieldHashtag.addEventListener('keydown', onFieldKeydown);
fieldComment.addEventListener('keydown', onFieldKeydown);
