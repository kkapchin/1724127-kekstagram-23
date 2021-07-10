import { randomPictures } from './render-random-pictures.js';
import { closePopup } from './utils/close-popup.js';
import { openPopup } from './utils/open-popup.js';


const bigPicture = document.querySelector('.big-picture');
const pictures = document.querySelectorAll('.picture__img');
const commentsEl = document.querySelector('.social__comments');
const liEl = commentsEl.querySelectorAll('li');

export function renderFullscreenHandler (evt) {
  const picId = evt.target.attributes.pic_id.value;
  const picDescription = randomPictures[picId - 1].description;
  const picLikes = randomPictures[picId - 1].likes;
  const comments = randomPictures[picId - 1].comments;
  const imgEl = document.querySelector('.big-picture__img').children[0];
  const closeButton = document.querySelector('.big-picture__cancel');
  const descriptionEl = bigPicture.querySelector('.social__caption');
  const likesCountEl = bigPicture.querySelector('.likes-count');

  openPopup(bigPicture);
  imgEl.src = evt.target.currentSrc;
  descriptionEl.textContent = picDescription;
  likesCountEl.textContent = picLikes;
  for(let i = 0; i < liEl.length; i++) {
    const user = liEl[i].querySelector('.social__picture');
    const message = liEl[i].querySelector('.social__text');
    user.src = comments[i].avatar;
    user.alt = comments[i].name;
    message.textContent = comments[i].message;
  }
  document.querySelector('.social__comment-count').classList.add('hidden');
  document.querySelector('.comments-loader').classList.add('hidden');
  closePopup(closeButton, bigPicture);
}

pictures.forEach((picture) => {
  picture.addEventListener('click', renderFullscreenHandler);
});
