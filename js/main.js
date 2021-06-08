//kekstagram

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (min >= 0 && max > min) {
    return (Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return 'Invalid range.';
}

const checkStrLength = (str, max) => str.length <= max;

const DESCRIPTIONS = [
  'Lorem ipsum',
  'dolor sit',
  'amet consectetur',
  'adipisicing elit',
  'Accusamus, esse',
  'error ipsam',
  'voluptas ab',
  'eveniet unde',
  'exercitationem fugiat',
  'quis eum',
  'iste perferendis',
  'ipsum earum iure!',
];

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Джереми',
  'Жозефина',
  'Антуанетта',
  'Крэг Хек',
  'Гервульф',
  'Лабета',
  'Луна',
  'Джейсон Стэтхэм',
];

const idCounter = () => {
  let counter = 1;
  return () => counter++;
};

const getPhotoId = idCounter();

const getRandomArrayElement = (elements) => elements[getRandomInt(0, elements.length - 1)];

function createComment (commentsIdCounter) {
  return {
    id: commentsIdCounter(),
    avatar: 'img/avatar-' + getRandomInt(1, NAMES.length - 1) + '.svg',
    message: getRandomArrayElement(COMMENTS),
    name: getRandomArrayElement(NAMES),
  };
}

function getCommentsList() {
  const commentsIdCounter = idCounter();
  const commentsList = new Array(getRandomInt(3, 7)).fill(null).map(() => createComment(commentsIdCounter));
  return commentsList;
}

function getPost() {
  return {
    id: getPhotoId(),
    url: 'photos/' + getRandomInt(1, 25) + '.jpg',
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInt(15, 200),
    comments: getCommentsList(),
  };
}

/* console.log(getPost());
console.log(getPost());
console.log(getPost());
console.log(getPost()); */

//keksobooking

const getRandomFloat = (min, max, quantity) =>
  (min < max) ? (Math.random() * (max - min + 1) + min).toFixed(quantity) : 'Invalid range.';

//getRandomInt(1, 25);
checkStrLength('string', 6);
getRandomFloat(1, 2, 3);
getPost();
