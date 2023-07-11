import { createPhotography } from './card.js';
import { Data } from './data.js';
import { renderPicture } from './render.js';
import './functions.js';
import { initUploadImageForm } from './upload-image-form.js';

const cardsData = Array.from({length: Data.PHOTOS_COUNT}, createPhotography);
renderPicture(cardsData);
initUploadImageForm();
