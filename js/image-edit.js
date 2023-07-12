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
  }
};
const Image = {
  STEP_SCALE: 25,
  MIN_SCALE: 25,
  MAX_SCALE: 100
};

const form = document.querySelector('.img-upload__form');
const image = form.querySelector('.img-upload__preview');
const buttonMinus = form.querySelector('.scale__control--smaller');
const buttonPlus = form.querySelector('.scale__control--bigger');
const fieldScaleImage = form.querySelector('.scale__control--value');
const listFiltersElement = form.querySelector('.effects__list');
const sliderContainer = form.querySelector('.img-upload__effect-level');
const filterSlider = sliderContainer.querySelector('.effect-level__slider');
const fieldFilterValue = sliderContainer.querySelector('.effect-level__value');
let currentEffect = 'none';

const changeImageScale = (value) => {
  image.style.transform = `scale(${value / 100})`;
};

const onButtonMinusClick = () => {
  const fieldScaleImageValue = parseInt(fieldScaleImage.value.replace('%', ''), 10) - Image.STEP_SCALE;

  if (fieldScaleImageValue >= Image.MIN_SCALE) {
    fieldScaleImage.value = `${fieldScaleImageValue}%`;
    changeImageScale(fieldScaleImageValue);
  }
};

const onButtonPlusClick = () => {
  const fieldScaleImageValue = parseInt(fieldScaleImage.value.replace('%', ''), 10) + Image.STEP_SCALE;

  if (fieldScaleImageValue <= Image.MAX_SCALE) {
    fieldScaleImage.value = `${fieldScaleImageValue}%`;
    changeImageScale(fieldScaleImageValue);
  }
};

const getSliderSettings = (filter) => {
  const sliderSetting = {
    connect: 'lower',
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

  if (filter) {
    sliderSetting.range = {
      min: filter.min,
      max: filter.max
    };
    sliderSetting.step = filter.step;
    sliderSetting.start = filter.max;
  } else {
    sliderSetting.range = {
      min: 0,
      max: 100
    };
    sliderSetting.step = 1;
    sliderSetting.start = 100;
  }

  return sliderSetting;
};

const updateFilterSlider = (filter) => filterSlider.noUiSlider.updateOptions(getSliderSettings(filter));
const isOrigignEffect = () => currentEffect === 'none';

const setChoisenEffect = () => {
  if (isOrigignEffect()) {
    sliderContainer.classList.add('hidden');
    image.removeAttribute('style');
  } else {
    sliderContainer.classList.remove('hidden');
    updateFilterSlider(filtersList[currentEffect]);
  }
};

const onRadioFilterClick = (evt) => {
  const filterRadio = evt.target.closest('.effects__radio');

  if (filterRadio) {
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
  noUiSlider.create(filterSlider, getSliderSettings());

  setChoisenEffect();
  filterSlider.noUiSlider.on('update', onSliderUpdate);
  listFiltersElement.addEventListener('click', onRadioFilterClick);
};

const initEditImage = () => {
  createFilterSlider();
  buttonMinus.addEventListener('click', onButtonMinusClick);
  buttonPlus.addEventListener('click', onButtonPlusClick);
};


export { initEditImage };
