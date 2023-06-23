
import { DATA } from './data.js';
import { createRandomId, getRandomPositiveInteger } from './util.js';
import { createComment } from './comment.js';

const getRandomId = createRandomId();
const getRandomDescription = DATA.DESCRIPTION_LIST[getRandomPositiveInteger(0, DATA.DESCRIPTION_LIST.length - 1)];

const createPhotography = () => {
  const getRandomCommentId = createRandomId();
  const photography = {};
  photography.id = getRandomId(1, DATA.PHOTOS_COUNT);
  photography.url = `photos/${ photography.id }.jpg`;
  photography.description = getRandomDescription;
  photography.likes = getRandomPositiveInteger(DATA.MIN_LIKES_COUNT, DATA.MAX_LIKES_COUNT);
  photography.comments = Array.from({length: getRandomPositiveInteger(0, DATA.COMMENTS_COUNT)}, () => createComment(getRandomCommentId));

  return photography;
};

export { createPhotography };
