import { openBigCard } from './render-big-card.js';

const picturesSection = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;
const pictureElement = pictureTemplate.querySelector('.picture');

const picturesFragment = document.createDocumentFragment();
let cardsData;

const createPicture = ({url, description, likes, comments, id}) => {
  const picture = pictureElement.cloneNode(true);

  picture.href = url;
  picture.dataset.pictureId = id;
  picture.querySelector('.picture__img').src = url;
  picture.querySelector('.picture__img').alt = description;
  picture.querySelector('.picture__likes').textContent = likes;
  picture.querySelector('.picture__comments').textContent = comments.length;

  return picture;
};

const getCardDataFromId = (picture) => cardsData.find((card) => card.id === Number(picture.dataset.pictureId));

const onPictureElementClick = (evt) => {
  const targetPictureElement = evt.target.closest('.picture');
  if (targetPictureElement) {
    evt.preventDefault();
    openBigCard(getCardDataFromId(targetPictureElement));
  }
};

const clearPictures = () => {
  const pictures = picturesSection.querySelectorAll('.picture');

  if (!pictures) {
    return;
  }

  for (let i = pictures.length - 1; i >= 0; i--) {
    pictures[i].remove();
  }
};

const renderPicture = (data) => {
  cardsData = data;
  cardsData.forEach((cardData) => {
    picturesFragment.append(createPicture(cardData));
  });

  clearPictures();
  picturesSection.append(picturesFragment);
  picturesSection.addEventListener('click', onPictureElementClick);
};


export { renderPicture };
