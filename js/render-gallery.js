import { getData } from './connection.js';
import { renderFullscreenPicture } from './render-fullscreen-picture.js';
import { debounce } from './utils/debounce.js';
import { deleteEventListener } from './utils/delete-event-listener.js';
import { getRandomPositiveInteger } from './utils/get-random-positive-integer.js';
import { isEscEvent } from './utils/is-escape-event.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const randomPicturesFragment = document.createDocumentFragment();
const defaultData = [];
const randomData = [];
const discussedData = [];

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

function renderGallery (data) {
  let index = 0;
  data.forEach(({url, description, likes, comments}) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__img').setAttribute('index', index);
    pictureElement.querySelector('.picture__img').alt = description;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    randomPicturesFragment.appendChild(pictureElement);
    index++;
  });
  picturesContainer.appendChild(randomPicturesFragment);
  document.querySelector('.pictures__title')
    .classList
    .remove('visually-hidden');
}

function createDefaultData (array, data) {
  data.forEach((item) => {
    array.push(item);
  });
}

function createRandomData (randomizer, array, source) {
  for (array.length; array.length < 10;) {
    const randomItem = source[randomizer(0, 24)];
    if(!array.includes(randomItem)) {
      array.push(randomItem);
    }
  }
}

function createDiscussedData (array, data) {
  data
    .slice()
    .sort((a, b) => b.comments.length - a.comments.length)
    .forEach((item) => array.push(item));
}

function showFilters () {
  const filtersElement = document.querySelector('.img-filters');
  const defaultFilter = filtersElement.querySelector('#filter-default');
  const randomFilter = filtersElement.querySelector('#filter-random');
  const discussedFilter = filtersElement.querySelector('#filter-discussed');

  function clearGallery () {
    const pictures = picturesContainer.querySelectorAll('.picture');
    for (let i = 0; i < pictures.length; i++) {
      const child = picturesContainer.lastElementChild;
      picturesContainer.removeChild(child);
    }
  }

  function setFilterActive (filter) {
    defaultFilter.classList.remove('img-filters__button--active');
    randomFilter.classList.remove('img-filters__button--active');
    discussedFilter.classList.remove('img-filters__button--active');
    filter.classList.add('img-filters__button--active');
  }

  function defaultFilterClickHandler () {
    debounce(() => {
      defaultFilterClickHandler();
    });
    setFilterActive(defaultFilter);
    clearGallery();
    renderGallery(defaultData);
    renderFullscreenPicture(defaultData);
  }

  function randomFilterClickHandler () {
    debounce(() => {
      randomFilterClickHandler();
    });
    setFilterActive(randomFilter);
    clearGallery();
    renderGallery(randomData);
    renderFullscreenPicture(randomData);
  }

  function discussedFilterClickHandler () {
    debounce(() => {
      discussedFilterClickHandler();
    });
    setFilterActive(discussedFilter);
    clearGallery();
    renderGallery(discussedData);
    renderFullscreenPicture(discussedData);
  }

  createRandomData(getRandomPositiveInteger, randomData, defaultData);
  createDiscussedData(discussedData, defaultData);
  filtersElement.classList.remove('img-filters--inactive');
  defaultFilter.addEventListener('click', defaultFilterClickHandler);
  randomFilter.addEventListener('click', randomFilterClickHandler);
  discussedFilter.addEventListener('click', discussedFilterClickHandler);
}

function onSuccess (pictures) {
  createDefaultData(defaultData, pictures);
  renderGallery(defaultData);
  renderFullscreenPicture(defaultData);
  showFilters();
}
getData(onSuccess, onFail);
