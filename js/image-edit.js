const Image = {
  STEP_SCALE: 25,
  MIN_SCALE: 25,
  MAX_SCALE: 100
};
const filtersList = {
  chrome: {
    min: 0,
    max: 1,
    step: 0.1,
    value: 'grayscale',
    postfix: ''
  },
  sepia: {
    min: 0,
    max: 1,
    step: 0.1,
    value: 'sepia',
    postfix: ''
  },
  marvin: {
    min: 0,
    max: 100,
    step: 1,
    value: 'invert',
    postfix: '%'
  },
  phobos: {
    min: 0,
    max: 3,
    step: 0.1,
    value: 'blur',
    postfix: 'px'
  },
  heat: {
    min: 0,
    max: 3,
    step: 0.1,
    value: 'brightness',
    postfix: ''
  },
  none: {
    min: 0,
    max: 100,
    step: 1
  }
};
const FILTER_NAME = 'effect';
const ORIGIN_EFFECT = 'none';

const formElement = document.querySelector('.img-upload__form');
const imageElement = formElement.querySelector('.img-upload__preview img');
const buttonMinusElement = formElement.querySelector('.scale__control--smaller');
const buttonPlusElement = formElement.querySelector('.scale__control--bigger');
const fieldScaleImageElement = formElement.querySelector('.scale__control--value');
const sliderContainerElement = formElement.querySelector('.img-upload__effect-level');
const filterSliderElement = sliderContainerElement.querySelector('.effect-level__slider');
const fieldFilterValueElement = sliderContainerElement.querySelector('.effect-level__value');
let currentEffect = ORIGIN_EFFECT;

const changeImageScale = (value) => {
  imageElement.style.transform = `scale(${value / 100})`;
  fieldScaleImageElement.value = `${value}%`;
};

const onButtonMinusClick = () => {
  changeImageScale(
    Math.max(parseInt(fieldScaleImageElement.value, 10) - Image.STEP_SCALE, Image.MIN_SCALE)
  );
};

const onButtonPlusClick = () => {
  changeImageScale(
    Math.min(parseInt(fieldScaleImageElement.value, 10) + Image.STEP_SCALE, Image.MAX_SCALE)
  );
};

const getSliderSettings = ({min, max, step}) => ({
  connect: 'lower',
  range: {
    min: min,
    max: max
  },
  step: step,
  start: max,
  format: {
    to: (value) => {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: (value) => parseFloat(value)
  }
});

const updateFilterSlider = (filter) => filterSliderElement.noUiSlider.updateOptions(getSliderSettings(filter));

const setChoisenEffect = () => {
  if (currentEffect === ORIGIN_EFFECT) {
    sliderContainerElement.classList.add('hidden');
    imageElement.style.filter = null;
  } else {
    sliderContainerElement.classList.remove('hidden');
    updateFilterSlider(filtersList[currentEffect]);
  }
};

const onRadioFilterChange = (evt) => {
  const filterRadio = evt.target;

  if (filterRadio.name === FILTER_NAME) {
    currentEffect = filterRadio.value;
    setChoisenEffect();
  }
};

const onSliderUpdate = () => {
  const currentFilter = filtersList[currentEffect];
  if (currentFilter) {
    const postfix = currentFilter.postfix;
    imageElement.style.filter = `${currentFilter.value}(${filterSliderElement.noUiSlider.get()}${postfix})`;
  }
  fieldFilterValueElement.value = filterSliderElement.noUiSlider.get();
};

const createFilterSlider = () => {
  noUiSlider.create(filterSliderElement, getSliderSettings(filtersList[currentEffect]));

  setChoisenEffect();
  filterSliderElement.noUiSlider.on('update', onSliderUpdate);
  formElement.addEventListener('change', onRadioFilterChange);
};

const resetImage = () => {
  imageElement.removeAttribute('style');
  filterSliderElement.noUiSlider.destroy();
  sliderContainerElement.classList.add('hidden');
  currentEffect = ORIGIN_EFFECT;
};

buttonMinusElement.addEventListener('click', onButtonMinusClick);
buttonPlusElement.addEventListener('click', onButtonPlusClick);

export { resetImage, createFilterSlider };
