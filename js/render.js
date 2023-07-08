import { openBigCard } from './render-big-card.js';

const picturesList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;
const pictureElement = pictureTemplate.querySelector('.picture');

const picturesFragment = document.createDocumentFragment();

const createPicture = ({url, description, likes, comments, id}) => {
  const picture = pictureElement.cloneNode(true);

  picture.id = id;
  picture.querySelector('.picture__img').src = url;
  picture.querySelector('.picture__img').alt = description;
  picture.querySelector('.picture__likes').textContent = likes;
  picture.querySelector('.picture__comments').textContent = comments.length;

  return picture;
};

const getCardDataFromId = (picture, cardsData) => cardsData.find((card) => card.id === Number(picture.id));

const onPictureElementClick = (evt, cardsData) => {
  const targetPictureElement = evt.target.closest('.picture');
  if (targetPictureElement) {
    openBigCard(getCardDataFromId(targetPictureElement, cardsData));
  }
};

const renderPicture = (cardsData) => {
  cardsData.forEach((cardData) => {
    picturesFragment.append(createPicture(cardData));
  });

  picturesList.append(picturesFragment);
  picturesList.addEventListener('click', (evt) => onPictureElementClick(evt, cardsData));
};

export { renderPicture };
