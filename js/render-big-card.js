import { isEscapeKey } from './util.js';

const COUNT_COMMENTS_OPEN = 5;

const bigCardElement = document.querySelector('.big-picture');
const closeButtonElement = bigCardElement.querySelector('.big-picture__cancel');
const commentsListElement = bigCardElement.querySelector('.social__comments');
const commentTemplate = commentsListElement.querySelector('.social__comment');
const commentCountElement = bigCardElement.querySelector('.social__comment-count');
const buttonLoadCommentsElement = bigCardElement.querySelector('.comments-loader');
let commentsListElements = [];

const getCountOpenedComments = () => commentsListElement.querySelectorAll('.social__comment').length;

const showCommentsInRange = (countUnhiddenComments) => {
  const startIndex = getCountOpenedComments();
  const endIndex = startIndex + countUnhiddenComments;

  const copyCommentsElements = commentsListElements.slice(startIndex, endIndex);
  commentsListElement.append(...copyCommentsElements);
};

const renderTextCountComments = (commentsElements) => {
  commentCountElement.innerHTML = `${getCountOpenedComments()} из <span class="comments-count">${commentsElements}</span> комментариев`;
};

const loadComments = () => {
  const countCommentsElements = commentsListElements.length;
  const countToShowComments = Math.min(
    COUNT_COMMENTS_OPEN,
    countCommentsElements - getCountOpenedComments()
  );

  if (countToShowComments < COUNT_COMMENTS_OPEN) {
    buttonLoadCommentsElement.classList.add('hidden');
  }

  showCommentsInRange(countToShowComments);
  renderTextCountComments(countCommentsElements);
};

const onButtonLoadCommentsClick = () => loadComments();

const createComment = ({avatar, message, name}) => {
  const commentElement = commentTemplate.cloneNode(true);
  const commentAvatarElement = commentElement.querySelector('.social__picture');
  const commentTextElement = commentElement.querySelector('.social__text');

  commentAvatarElement.src = avatar;
  commentAvatarElement.alt = name;
  commentTextElement.textContent = message;

  return commentElement;
};

const renderComments = (comments) => {
  comments.forEach((element) => commentsListElements.push(createComment(element)));
  commentsListElement.innerHTML = '';

  loadComments();
};

const renderBigCard = ({url, description, likes, comments}) => {
  bigCardElement.querySelector('.big-picture__img img').src = url;
  bigCardElement.querySelector('.likes-count').textContent = likes;
  bigCardElement.querySelector('.comments-count').textContent = comments.length;
  bigCardElement.querySelector('.social__caption').textContent = description;

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

  bigCardElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  buttonLoadCommentsElement.classList.remove('hidden');

  document.removeEventListener('keydown', onKeyDown);
  closeButtonElement.removeEventListener('click', closeBigCard);
  buttonLoadCommentsElement.removeEventListener('click', onButtonLoadCommentsClick);
}

function openBigCard (cardData) {
  bigCardElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  renderBigCard(cardData);

  document.addEventListener('keydown', onKeyDown);
  closeButtonElement.addEventListener('click', closeBigCard);
  buttonLoadCommentsElement.addEventListener('click', onButtonLoadCommentsClick);
}


export { openBigCard };
