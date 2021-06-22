import { getRandomPictures } from './utils/get-random-pictures.js';

document.querySelector('.pictures__title').classList.remove('visually-hidden');
const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const randomPicturesFragment = document.createDocumentFragment();
const randomPictures = getRandomPictures();

randomPictures.forEach(({url, description, likes, comments}) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__img').alt = description;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  randomPicturesFragment.appendChild(pictureElement);
});

picturesContainer.appendChild(randomPicturesFragment);
