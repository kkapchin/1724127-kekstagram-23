import { randomPictures } from './render-random-pictures.js';
import { closePopup } from './utils/close-popup.js';
import { openPopup } from './utils/open-popup.js';


const bigPicture = document.querySelector('.big-picture');
const pictures = document.querySelectorAll('.picture__img');

function renderFullscreenHandler (evt) {
  const img = document.querySelector('.big-picture__img').children[0];
  const closeButton = document.querySelector('.big-picture__cancel');
  openPopup(bigPicture);
  img.src = evt.target.currentSrc;
  closePopup(closeButton, bigPicture);
  console.log(evt.target.currentSrc);
}

pictures.forEach((picture) => {
  picture.addEventListener('click', renderFullscreenHandler);
});
console.log(randomPictures);
