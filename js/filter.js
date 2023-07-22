import { renderPicture } from './render.js';
import { getRandomPositiveInteger } from './util.js';

const MAX_RANDOM_CARDS = 10;
const FiltersList = {
  DEFAULT: 'default',
  RANDOM: 'random',
  DISCUSSED: 'discussed'
};

const filtersElement = document.querySelector('.img-filters');
const filtersFormElement = filtersElement.querySelector('.img-filters__form');
let filterButton;

const changeActiveFilter = (choisenFilter) => {
  const activeFilter = filtersElement.querySelector('.img-filters__button--active');

  if (choisenFilter !== activeFilter) {
    activeFilter.classList.remove('img-filters__button--active');
    choisenFilter.classList.add('img-filters__button--active');
  }
};

const onFilterDefaultClick = (data) => {
  renderPicture(data);
};

const onFilterRandomClick = (data) => {
  const randomCards = data
    .sort(() => getRandomPositiveInteger(0, data.length) - getRandomPositiveInteger(0, data.length))
    .slice(0, MAX_RANDOM_CARDS);

  renderPicture(randomCards);
};

const onFilterDiscussedClick = (data) => {
  const mostDiscussedPictures = data
    .sort((a, b) => b.comments.length - a.comments.length);
  renderPicture(mostDiscussedPictures);
};

const onFilterClick = (data) => {
  const copyData = [...data];

  if (filterButton.id.endsWith(FiltersList.DEFAULT)) {
    onFilterDefaultClick(copyData);
  } else if (filterButton.id.endsWith(FiltersList.RANDOM)) {
    onFilterRandomClick(copyData);
  } else if (filterButton.id.endsWith(FiltersList.DISCUSSED)) {
    onFilterDiscussedClick(copyData);
  }
};

const setFilters = (cb) => {
  filtersElement.classList.remove('img-filters--inactive');
  filtersFormElement.addEventListener('click', (evt) => {
    filterButton = evt.target;
    if (filterButton.classList.contains('img-filters__button') && !filterButton.classList.contains('img-filters__button--active')) {
      changeActiveFilter(filterButton);
      cb();
    }
  });
};

export { setFilters, onFilterClick};
