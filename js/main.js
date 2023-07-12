import { getPhotosList } from './card.js';
import { renderPicture } from './render.js';
import { initUploadImageForm } from './upload-image-form.js';

renderPicture(getPhotosList());
initUploadImageForm();
