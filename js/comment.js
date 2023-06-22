import { DATA } from './data.js';
import { getRandomPositiveInteger } from './util.js';

const getRandomCommentMessage = () => {
  let randomMessage = '';

  for (let i = 1; i <= getRandomPositiveInteger(1, DATA.COMMENT_MESSAGE_COUNT); i++) {
    const commentId = getRandomPositiveInteger(0, DATA.COMMENT_LIST.length - 1);

    // Пробел между предложеними.
    if (i > 1) {
      randomMessage += ' ';
    }

    randomMessage += DATA.COMMENT_LIST[commentId];
  }

  return randomMessage;
};

const createComment = (getRandomCommentId) => {
  const randomName = DATA.NAMES_LIST[getRandomPositiveInteger(0, DATA.NAMES_LIST.length - 1)];
  const randomAvatarUrl = `img/avatar-${getRandomPositiveInteger(0, DATA.AVATARS_COUNT)}.svg`;

  const randomComment = {
    id: getRandomCommentId(0, DATA.COMMENTS_COUNT),
    avatar: randomAvatarUrl,
    message: getRandomCommentMessage(),
    name: randomName,
  };

  return randomComment;
};

export { createComment };
