const COMMENT_KIT = `Всё отлично!
  В целом всё неплохо. Но не всё.
  Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.
  Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.
  Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.
  Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`;

const COMMENT_LIST = COMMENT_KIT.split('\n');
const NAMES_LIST = [
  'Артем', 'Данил', 'Света',
  'Алексей', 'Павел', 'Екатерина',
  'Лида', 'Андрей', 'Пудж'];
const DESCRIPTION_LIST = [
  'Хорошая фотка!', 'Насыщенность отличная',
  'Лучшее место!', 'Это просто вау!', 'Я старался',
  'Вполне неплохо получилось'
];

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

const createComment = () => {
  const getRandomCommentId = createRandomId();
  const randomComment = COMMENT_LIST[getRandomPositiveInteger(0, COMMENT_LIST.length - 1)];
  const randomName = NAMES_LIST[getRandomPositiveInteger(0, NAMES_LIST.length - 1)];
  const randomAvatarUrl = `img/avatar-${getRandomPositiveInteger(0, 6)}.svg`;

  return {
    id: getRandomCommentId(0, 30),
    avatar: randomAvatarUrl,
    message: randomComment,
    name: randomName,
  };
};

const getRandomId = createRandomId();
const getRandomDescription = DESCRIPTION_LIST[getRandomPositiveInteger(0, DESCRIPTION_LIST.length - 1)];

const createPhotography = () => {
  const photography = {};
  photography.id = getRandomId(1, 25);
  photography.url = `photos/${ photography.id }.jpg`;
  photography.description = 'description';
  photography.description = getRandomDescription;
  photography.likes = getRandomPositiveInteger(15, 200);
  photography.comments = Array.from({length: getRandomPositiveInteger(0, 30)}, createComment);

  return photography;
};

// eslint-disable-next-line no-unused-vars
const photosList = Array.from({length: 25}, createPhotography);


