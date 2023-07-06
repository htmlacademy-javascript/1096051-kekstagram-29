import { isEscapeKey } from './util.js';

const COUNT_COMMENTS_OPEN = 5;

const bigCard = document.querySelector('.big-picture');
const closeButton = bigCard.querySelector('.big-picture__cancel');
const commentsList = bigCard.querySelector('.social__comments');
const commentTemplate = commentsList.querySelector('.social__comment');
const commentCount = bigCard.querySelector('.social__comment-count');
const buttonLoadComments = bigCard.querySelector('.comments-loader');

const showCommentsInRange = (startIndex, countUnhiddenComments, commentsElements) => {
  let iterationCount = 0;
  while (iterationCount < countUnhiddenComments) {
    commentsElements[startIndex + iterationCount].classList.remove('hidden');
    iterationCount++;
  }
};

const getCountOpenedComments = () => commentsList.querySelectorAll('.social__comment:not(.hidden)').length;

const renderTextCountComments = (commentsElements) => {
  commentCount.innerHTML = `${getCountOpenedComments()} из <span class="comments-count">${commentsElements}</span> комментариев`;
};

const loadComments = () => {
  const commentsElements = commentsList.querySelectorAll('.social__comment');
  const countCommentsElements = commentsElements.length;
  const countOpenedComments = getCountOpenedComments();
  const startIndex = countOpenedComments; // индекс начала цыкла относительно последнего открытого комментария.
  const countToShowComments = Math.min(
    COUNT_COMMENTS_OPEN,
    countCommentsElements,
    countCommentsElements - countOpenedComments
  ); // количество комментариев которое нужно открыть.

  showCommentsInRange(startIndex, countToShowComments, commentsElements);
  renderTextCountComments(countCommentsElements);
};

const onButtonLoadCommentsClick = () => {
  loadComments();
};

const createComment = ({avatar, message, name}) => {
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
  comments.forEach((element) => commentsListFragment.append(createComment(element)));

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
