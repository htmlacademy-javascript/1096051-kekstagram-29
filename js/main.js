import { createPhotography } from './card.js';
import { DATA } from './data.js';
import './functions.js';
// eslint-disable-next-line no-unused-vars
const photosList = Array.from({length: DATA.PHOTOS_COUNT}, createPhotography);
