
import { Data } from './data.js';
import { createRandomId, getRandomPositiveInteger } from './util.js';
import { createComment } from './comment.js';

const getRandomId = createRandomId();

const createPhotography = () => {
  const getRandomCommentId = createRandomId();
  const photography = {};
  const getRandomDescription = Data.DESCRIPTION_LIST[getRandomPositiveInteger(0, Data.DESCRIPTION_LIST.length - 1)];

  photography.id = getRandomId(1, Data.PHOTOS_COUNT);
  photography.url = `photos/${ photography.id }.jpg`;
  photography.description = getRandomDescription;
  photography.likes = getRandomPositiveInteger(Data.MIN_LIKES_COUNT, Data.MAX_LIKES_COUNT);
  photography.comments = Array.from({length: getRandomPositiveInteger(0, Data.COMMENTS_COUNT)}, () => createComment(getRandomCommentId));

  return photography;
};

export { createPhotography };
