import { Data } from './data.js';
import { getRandomPositiveInteger } from './util.js';

const getRandomCommentMessage = () => {
  let randomMessage = '';

  for (let i = 1; i <= getRandomPositiveInteger(1, Data.COMMENT_MESSAGE_COUNT); i++) {
    const commentId = getRandomPositiveInteger(0, Data.COMMENT_LIST.length - 1);

    // Пробел между предложеними.
    if (i > 1) {
      randomMessage += ' ';
    }

    randomMessage += Data.COMMENT_LIST[commentId];
  }

  return randomMessage;
};

const createComment = (getRandomCommentId) => {
  const randomName = Data.NAMES_LIST[getRandomPositiveInteger(0, Data.NAMES_LIST.length - 1)];
  const randomAvatarUrl = `img/avatar-${getRandomPositiveInteger(0, Data.AVATARS_COUNT)}.svg`;

  const randomComment = {
    id: getRandomCommentId(0, Data.COMMENTS_COUNT),
    avatar: randomAvatarUrl,
    message: getRandomCommentMessage(),
    name: randomName,
  };

  return randomComment;
};

export { createComment };
