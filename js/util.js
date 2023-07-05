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

export {getRandomPositiveInteger, createRandomId, isEscapeKey};
