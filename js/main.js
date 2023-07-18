import './upload-image-form.js';
import { renderPicture } from './render.js';
import { getData } from './api.js';
import { showAlert } from './util.js';

try {
  const cardsData = await getData();
  renderPicture(cardsData);
} catch(err) {
  showAlert(err.message);
}
