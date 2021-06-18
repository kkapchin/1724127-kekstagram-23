import { getRandomPositiveInteger } from './utils/get-random-positive-integer.js';
import { DESCRIPTIONS, COMMENTS, NAMES } from './data.js';

const idCounter = () => {
  let counter = 1;
  return () => counter++;
};

const getPhotoId = idCounter();

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

function createComment (commentsIdCounter) {
  return {
    id: commentsIdCounter(),
    avatar: `img/avatar-${  getRandomPositiveInteger(1, 6)  }.svg`,
    message: getRandomArrayElement(COMMENTS),
    name: getRandomArrayElement(NAMES),
  };
}

function getCommentsList() {
  const commentsIdCounter = idCounter();
  const commentsList = new Array(getRandomPositiveInteger(3, 7)).fill(null).map(() => createComment(commentsIdCounter));
  return commentsList;
}

function getPost() {
  return {
    id: getPhotoId(),
    url: `photos/${  getRandomPositiveInteger(1, 25)  }.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomPositiveInteger(15, 200),
    comments: getCommentsList(),
  };
}

/* console.log(getPost());
console.log(getPost());
console.log(getPost());
console.log(getPost()); */
getPost();
