import { getData } from './connection.js';
import { deleteEventListener } from './utils/delete-event-listener.js';
import { isEscEvent } from './utils/is-escape-event.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const randomPicturesFragment = document.createDocumentFragment();

function onFail () {
  const body = document.querySelector('body');
  const lastNode = document.querySelector('#messages');
  const errorElement = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
  const errorTitle = errorElement.querySelector('.error__title');
  const errorBtn = errorElement.querySelector('.error__button');
  const errorInner = errorElement.querySelector('.error__inner');

  errorTitle.textContent = 'Что-то пошло не так';
  errorBtn.textContent = 'Вернуться на главную';
  const errorBtnClone = errorBtn.cloneNode(true);

  function redirectHome () {
    window.location.href='/';
  }

  function documentEscKeydownHandler (evt) {
    if(isEscEvent(evt)) {
      evt.preventDefault();
      body.classList.remove('modal-open');
      errorBtn.replaceWith(errorBtnClone);
      body.removeChild(errorElement);
      deleteEventListener(document, 'keydown', documentEscKeydownHandler);
      redirectHome();
    }
  }

  function errorBtnClickHandler () {
    body.classList.remove('modal-open');
    errorBtn.replaceWith(errorBtnClone);
    body.removeChild(errorElement);
    deleteEventListener(document, 'keydown', documentEscKeydownHandler);
    redirectHome();
  }

  function errorElementClickHandler (evt) {
    evt.stopPropagation();
    body.classList.remove('modal-open');
    errorBtn.replaceWith(errorBtnClone);
    body.removeChild(errorElement);
    deleteEventListener(document, 'keydown', documentEscKeydownHandler);
    redirectHome();
  }

  body.appendChild(errorElement, lastNode.nextSibling);
  errorElement.addEventListener('click', errorElementClickHandler);
  errorInner.addEventListener('click', (e) => e.stopPropagation());
  document.addEventListener('keydown', documentEscKeydownHandler);
  errorBtn.addEventListener('click', errorBtnClickHandler);
}

const data = getData(onFail);

data.then((pictures) => {
  pictures.forEach(({id, url, description, likes, comments}) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__img').setAttribute('pic_id', id);
    pictureElement.querySelector('.picture__img').alt = description;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    randomPicturesFragment.appendChild(pictureElement);
  });
  picturesContainer.appendChild(randomPicturesFragment);
  document.querySelector('.pictures__title')
    .classList
    .remove('visually-hidden');
});
