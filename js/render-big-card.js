import { isEscapeKey } from './util.js';

const bigCard = document.querySelector('.big-picture');
const closeButton = bigCard.querySelector('.big-picture__cancel');
const commentsList = bigCard.querySelector('.social__comments');
const commentTemplate = commentsList.querySelector('.social__comment');

const renderComments = (comments) => {
  commentsList.innerHTML = '';
  const commentsListFragment = document.createDocumentFragment();

  comments.forEach(({avatar, message, name}) => {
    const commentElement = commentTemplate.cloneNode(true);
    const commentAvatar = commentElement.querySelector('.social__picture');
    const commentText = commentElement.querySelector('.social__text');

    commentAvatar.src = avatar;
    commentAvatar.alt = name;
    commentText.textContent = message;


    commentsListFragment.append(commentElement);
  });

  commentsList.append(commentsListFragment);
};

const renderBigCard = ({url, description, likes, comments}) => {
  bigCard.querySelector('.big-picture__img').querySelector('img').src = url;
  bigCard.querySelector('.likes-count').textContent = likes;
  bigCard.querySelector('.comments-count').textContent = comments.length;
  bigCard.querySelector('.social__caption').textContent = description;

  bigCard.querySelector('.social__comment-count').classList.add('hidden');
  bigCard.querySelector('.comments-loader').classList.add('hidden');

  renderComments(comments);
};

const onKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigCard();
  }
};

function closeBigCard () {
  bigCard.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onKeyDown);
  closeButton.removeEventListener('click', closeBigCard);
}

function openBigCard (cardData) {
  bigCard.classList.remove('hidden');
  document.body.classList.add('modal-open');
  renderBigCard(cardData);

  document.addEventListener('keydown', onKeyDown);
  closeButton.addEventListener('click', closeBigCard);
}


export { openBigCard };
