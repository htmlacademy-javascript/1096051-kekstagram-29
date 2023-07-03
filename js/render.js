const picturesList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;

const picturesFragment = document.createDocumentFragment();

const createPicture = ({url, description, likes, comments}) => {
  const picture = pictureTemplate.cloneNode(true);

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
