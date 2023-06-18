const COMMENT_LIST = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const NAMES_LIST = [
  'Артем',
  'Данил',
  'Света',
  'Алексей',
  'Павел',
  'Екатерина',
  'Лида',
  'Андрей',
  'Пудж'
];
const DESCRIPTION_LIST = [
  'Хорошая фотка!',
  'Насыщенность отличная',
  'Лучшее место!',
  'Это просто вау!',
  'Я старался',
  'Вполне неплохо получилось'
];

const PHOTOS_COUNT = 25;
const COMMENT_MESSAGE_COUNT = 2;
const COMMENTS_COUNT = 30;
const AVATARS_COUNT = 6;
const MIN_LIKES_COUNT = 15;
const MAX_LIKES_COUNT = 200;

const getRandomPositiveInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const createRandomId = () => {
  const previousIdList = [];

  return (min, max) => {
    let id = getRandomPositiveInteger(min, max);

    while (previousIdList.includes(id)) {
      id = getRandomPositiveInteger(min, max);
    }

    previousIdList.push(id);
    return id;
  };
};

const getRandomCommentMessage = () => {
  let randomMessage = '';

  for (let i = 1; i <= getRandomPositiveInteger(1, COMMENT_MESSAGE_COUNT); i++) {
    const commentId = getRandomPositiveInteger(0, COMMENT_LIST.length - 1);

    // Пробел между предложеними.
    if (i > 1) {
      randomMessage += ' ';
    }

    randomMessage += COMMENT_LIST[commentId];
  }

  return randomMessage;
};

const createComment = (getRandomCommentId) => {
  const randomName = NAMES_LIST[getRandomPositiveInteger(0, NAMES_LIST.length - 1)];
  const randomAvatarUrl = `img/avatar-${getRandomPositiveInteger(0, AVATARS_COUNT)}.svg`;

  const randomComment = {
    id: getRandomCommentId(0, COMMENTS_COUNT),
    avatar: randomAvatarUrl,
    message: getRandomCommentMessage(),
    name: randomName,
  };

  return randomComment;
};

const getRandomId = createRandomId();
const getRandomDescription = DESCRIPTION_LIST[getRandomPositiveInteger(0, DESCRIPTION_LIST.length - 1)];

const createPhotography = () => {
  const getRandomCommentId = createRandomId();
  const photography = {};
  photography.id = getRandomId(1, PHOTOS_COUNT);
  photography.url = `photos/${ photography.id }.jpg`;
  photography.description = getRandomDescription;
  photography.likes = getRandomPositiveInteger(MIN_LIKES_COUNT, MAX_LIKES_COUNT);
  photography.comments = Array.from({length: getRandomPositiveInteger(0, COMMENTS_COUNT)}, () => createComment(getRandomCommentId));

  return photography;
};

// eslint-disable-next-line no-unused-vars
const photosList = Array.from({length: PHOTOS_COUNT}, createPhotography);
