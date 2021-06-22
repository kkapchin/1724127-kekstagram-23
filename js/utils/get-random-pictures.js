import { getRandomPositiveInteger } from './get-random-positive-integer.js';
import { DESCRIPTIONS, COMMENTS, NAMES, RANDOM_PICTURES_COUNT } from '../data.js';

const idCounter = () => {
  let counter = 1;
  return () => counter++;
};

const getPictureId = idCounter();

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

function createComment (commentsIdCounter) {
  return {
    id: commentsIdCounter(),
    avatar: `img/avatar-${  getRandomPositiveInteger(1, 6)  }.svg`,
    message: getRandomArrayElement(COMMENTS),
    name: getRandomArrayElement(NAMES),
  };
}

function getCommentsList () {
  const commentsIdCounter = idCounter();
  const commentsList = new Array(getRandomPositiveInteger(3, 7)).fill(null).map(() => createComment(commentsIdCounter));
  return commentsList;
}

function getRandomPicture () {
  return {
    id: getPictureId(),
    url: `photos/${  getRandomPositiveInteger(1, 25)  }.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomPositiveInteger(15, 200),
    comments: getCommentsList(),
  };
}

function getRandomPictures () {
  return new Array(RANDOM_PICTURES_COUNT).fill(null).map(() => getRandomPicture());
}

export { getRandomPictures };
