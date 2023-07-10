import { isEscapeKey } from './util.js';

const COUNT_COMMENTS_OPEN = 5;

const bigCard = document.querySelector('.big-picture');
const closeButton = bigCard.querySelector('.big-picture__cancel');
const commentsList = bigCard.querySelector('.social__comments');
const commentTemplate = commentsList.querySelector('.social__comment');
const commentCount = bigCard.querySelector('.social__comment-count');
const buttonLoadComments = bigCard.querySelector('.comments-loader');
let commentsListElements = [];

const getCountOpenedComments = () => commentsList.querySelectorAll('.social__comment').length;

const showCommentsInRange = (countUnhiddenComments) => {
  const startIndex = getCountOpenedComments();
  const endIndex = startIndex + countUnhiddenComments;

  const copyCommentsElements = commentsListElements.slice(startIndex, endIndex);
  commentsList.append(...copyCommentsElements);
};

const renderTextCountComments = (commentsElements) => {
  commentCount.innerHTML = `${getCountOpenedComments()} из <span class="comments-count">${commentsElements}</span> комментариев`;
};

const loadComments = () => {
  const countCommentsElements = commentsListElements.length;
  const countToShowComments = Math.min(
    COUNT_COMMENTS_OPEN,
    countCommentsElements - getCountOpenedComments()
  ); // количество комментариев которое нужно открыть.

  showCommentsInRange(countToShowComments);
  renderTextCountComments(countCommentsElements);
};

const onButtonLoadCommentsClick = () => loadComments();

const createComment = ({avatar, message, name}) => {
  const commentElement = commentTemplate.cloneNode(true);
  const commentAvatar = commentElement.querySelector('.social__picture');
  const commentText = commentElement.querySelector('.social__text');

  commentAvatar.src = avatar;
  commentAvatar.alt = name;
  commentText.textContent = message;

  return commentElement;
};

const renderComments = (comments) => {
  // const commentsListFragment = document.createDocumentFragment();
  // comments.forEach((element) => commentsListFragment.append(createComment(element)));
  comments.forEach((element) => commentsListElements.push(createComment(element)));
  commentsList.innerHTML = '';
  // commentsList.append(commentsListFragment);

  loadComments();
};

const renderBigCard = ({url, description, likes, comments}) => {
  bigCard.querySelector('.big-picture__img img').src = url;
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
  commentsListElements = [];

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

  document.addEventListener('keydown', onKeyDown);
  closeButton.addEventListener('click', closeBigCard);
  buttonLoadComments.addEventListener('click', onButtonLoadCommentsClick);
}


export { openBigCard };
