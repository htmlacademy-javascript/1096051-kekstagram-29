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

const form = document.querySelector('.img-upload__form');
const image = form.querySelector('.img-upload__preview img');
const buttonMinus = form.querySelector('.scale__control--smaller');
const buttonPlus = form.querySelector('.scale__control--bigger');
const fieldScaleImage = form.querySelector('.scale__control--value');
const sliderContainer = form.querySelector('.img-upload__effect-level');
const filterSlider = sliderContainer.querySelector('.effect-level__slider');
const fieldFilterValue = sliderContainer.querySelector('.effect-level__value');
let currentEffect = ORIGIN_EFFECT;

const changeImageScale = (value) => {
  image.style.transform = `scale(${value / 100})`;
  fieldScaleImage.value = `${value}%`;
};

const onButtonMinusClick = () => {
  changeImageScale(
    Math.max(parseInt(fieldScaleImage.value, 10) - Image.STEP_SCALE, Image.MIN_SCALE)
  );
};

const onButtonPlusClick = () => {
  changeImageScale(
    Math.min(parseInt(fieldScaleImage.value, 10) + Image.STEP_SCALE, Image.MAX_SCALE)
  );
};

const getSliderSettings = ({min, max, step}) => {
  const sliderSetting = {
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
  };

  return sliderSetting;
};

const updateFilterSlider = (filter) => filterSlider.noUiSlider.updateOptions(getSliderSettings(filter));

const setChoisenEffect = () => {
  if (currentEffect === ORIGIN_EFFECT) {
    sliderContainer.classList.add('hidden');
    image.style.filter = null;
  } else {
    sliderContainer.classList.remove('hidden');
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
    image.style.filter = `${currentFilter.value}(${filterSlider.noUiSlider.get()}${postfix})`;
  }
  fieldFilterValue.value = filterSlider.noUiSlider.get();
};

const createFilterSlider = () => {
  noUiSlider.create(filterSlider, getSliderSettings(filtersList[currentEffect]));

  setChoisenEffect();
  filterSlider.noUiSlider.on('update', onSliderUpdate);
  form.addEventListener('change', onRadioFilterChange);
};

const resetImage = () => {
  image.removeAttribute('style');
  filterSlider.noUiSlider.destroy();
  sliderContainer.classList.add('hidden');
  currentEffect = ORIGIN_EFFECT;
};

buttonMinus.addEventListener('click', onButtonMinusClick);
buttonPlus.addEventListener('click', onButtonPlusClick);

export { resetImage, createFilterSlider };
