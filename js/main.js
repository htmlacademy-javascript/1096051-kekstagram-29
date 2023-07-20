import './upload-image-form.js';
import { renderPicture } from './render.js';
import { getData } from './api.js';
import { debaunce, showAlert } from './util.js';
import { setFilters, onFilterClick } from './filter.js';

try {
  const cardsData = await getData();
  setFilters(debaunce(() => onFilterClick(cardsData)));
  renderPicture(cardsData);
} catch(err) {
  showAlert(err.message);
}
