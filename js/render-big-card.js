import { isEscapeKey } from './util.js';

const bigCard = document.querySelector('.big-picture');
const closeButton = bigCard.querySelector('.big-picture__cancel');
const commentsList = bigCard.querySelector('.social__comments');
const commentTemplate = commentsList.querySelector('.social__comment');
const commentCount = bigCard.querySelector('.social__comment-count');
const buttonLoadComments = bigCard.querySelector('.comments-loader');

const getCountComments = (commentsElements) => {
  let countComments = 5;
  if (countComments > commentsElements.length) {
    countComments = commentsElements.length;
  }
  return countComments;
};

const getCountUnhiddenComments = (startIndex, commentsElements) => {
  let loadedComments = startIndex + getCountComments(commentsElements);
  if (loadedComments > commentsElements.length) {
    loadedComments = commentsElements.length;
  }
  return loadedComments;
};

const getCountShowedComments = (commentsElements) => {
  const hiddenComments = commentsList.querySelectorAll('.social__comment.hidden');
  return commentsElements.length - hiddenComments.length;
};

const showCommentsInRange = (startIndex, countUnhiddenComments, commentsElements) => {
  for (let i = startIndex; i < countUnhiddenComments; i++) {
    commentsElements[i].classList.remove('hidden');
  }
};

const renderTextCountComments = (countUnhiddenComments, commentsElements) => {
  commentCount.innerHTML = `${countUnhiddenComments} из <span class="comments-count">${commentsElements.length}</span> комментариев`;
};

const loadComments = () => {
  const commentsElements = commentsList.querySelectorAll('.social__comment');
  const startIndex = getCountShowedComments(commentsElements); // индекс начала цыкла относительно первого скрытого комментария.
  const countUnhiddenComments = getCountUnhiddenComments(startIndex, commentsElements); // количество комментариев которое нужно открыть.

  showCommentsInRange(startIndex, countUnhiddenComments, commentsElements);
  renderTextCountComments(countUnhiddenComments, commentsElements);
};

const onButtonLoadCommentsClick = () => {
  loadComments();
};

const renderComment = ({avatar, message, name}) => {
  const commentElement = commentTemplate.cloneNode(true);
  const commentAvatar = commentElement.querySelector('.social__picture');
  const commentText = commentElement.querySelector('.social__text');

  commentAvatar.src = avatar;
  commentAvatar.alt = name;
  commentText.textContent = message;

  commentElement.classList.add('hidden');

  return commentElement;
};

const renderComments = (comments) => {
  const commentsListFragment = document.createDocumentFragment();
  comments.forEach((element) => commentsListFragment.append(renderComment(element)));

  commentsList.innerHTML = '';
  commentsList.append(commentsListFragment);
};

const renderBigCard = ({url, description, likes, comments}) => {
  bigCard.querySelector('.big-picture__img').querySelector('img').src = url;
  bigCard.querySelector('.likes-count').textContent = likes;
  bigCard.querySelector('.comments-count').textContent = comments.length;
  bigCard.querySelector('.social__caption').textContent = description;

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
  buttonLoadComments.removeEventListener('click', onButtonLoadCommentsClick);
}

function openBigCard (cardData) {
  bigCard.classList.remove('hidden');
  document.body.classList.add('modal-open');
  renderBigCard(cardData);
  loadComments();

  document.addEventListener('keydown', onKeyDown);
  closeButton.addEventListener('click', closeBigCard);
  buttonLoadComments.addEventListener('click', onButtonLoadCommentsClick);
}


export { openBigCard };
