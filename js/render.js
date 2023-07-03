import { openBigCard } from './render-big-card.js';

const picturesList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;
const pictureElement = pictureTemplate.querySelector('.picture');

const picturesFragment = document.createDocumentFragment();

const createPicture = (cardData) => {
  const { url, description, likes, comments } = cardData;

  const picture = pictureElement.cloneNode(true);
  picture.addEventListener('click', () => openBigCard(cardData));

  picture.querySelector('.picture__img').src = url;
  picture.querySelector('.picture__img').alt = description;
  picture.querySelector('.picture__likes').textContent = likes;
  picture.querySelector('.picture__comments').textContent = comments.length;

  return picture;
};

const renderPicture = (cardsData) => {
  cardsData.forEach((cardData) => {
    picturesFragment.append(createPicture(cardData));
  });

  picturesList.append(picturesFragment);
};

export { renderPicture };
