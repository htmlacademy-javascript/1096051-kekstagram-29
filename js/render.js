const picturesList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;

const picturesFragment = document.createDocumentFragment();

const renderPicture = (cardsData) => {
  cardsData.forEach((cardData) => {
    const picture = pictureTemplate.cloneNode(true);

    picture.querySelector('.picture__img').src = cardData.url;
    picture.querySelector('.picture__img').alt = cardData.description;
    picture.querySelector('.picture__likes').textContent = cardData.likes;
    picture.querySelector('.picture__comments').textContent = cardData.comments.length;

    picturesFragment.append(picture);
  });

  picturesList.append(picturesFragment);
};

export { renderPicture };
