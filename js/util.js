const ALERT_SHOW_TIME = 5000;

const getRandomPositiveInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const createRandomId = () => {
  const previousIdList = [];

  return (min, max) => {
    let id = getRandomPositiveInteger(min, max);

    while (previousIdList.includes(id)) {
      id = getRandomPositiveInteger(min, max);
    }

    previousIdList.push(id);
    return id;
  };
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const showAlert = (message) => {
  const alertElement = document.createElement('div');

  alertElement.style.position = 'absolute';
  alertElement.style.left = '0';
  alertElement.style.top = '0';
  alertElement.style.zIndex = '99';
  alertElement.style.width = '100%';
  alertElement.style.padding = '10px';
  alertElement.style.textAlign = 'center';
  alertElement.style.fontSize = '25px';
  alertElement.style.fontWeight = '700';
  alertElement.style.color = 'rgba(255, 255, 255, 0.75)';
  alertElement.style.userSelect = 'none';
  alertElement.style.backgroundColor = 'rgba(255, 105, 105, 0.5)';

  alertElement.textContent = message;
  document.body.append(alertElement);
  setTimeout(() => alertElement.remove(), ALERT_SHOW_TIME);
};

const debaunce = (cb, delay = 300) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => cb.apply(this, rest), delay);
  };
};

export {getRandomPositiveInteger, createRandomId, isEscapeKey, showAlert, debaunce};
