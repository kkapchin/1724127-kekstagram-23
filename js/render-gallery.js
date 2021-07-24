import { getData } from './connection.js';
import { renderFullscreenPicture } from './render-fullscreen-picture.js';
import { DELAY } from './data.js';
import { debounce } from './utils/debounce.js';
import { getRandomPositiveInteger } from './utils/get-random-positive-integer.js';
import { isEscEvent } from './utils/is-escape-event.js';

const MIN = 0;
const MAX = 24;

const picturesElement = document.querySelector('.pictures');
const pictureTemplateElement = document.querySelector('#picture').content.querySelector('.picture');
const randomPicturesFragmentElement = document.createDocumentFragment();
const defaultData = [];
const randomData = [];
const discussedData = [];

const onFail = () => {
  const bodyElement = document.querySelector('body');
  const lastNodeElement = document.querySelector('#messages');
  const errorElement = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
  const errorTitleElement = errorElement.querySelector('.error__title');
  const errorButtonElement = errorElement.querySelector('.error__button');
  const errorInnerElement = errorElement.querySelector('.error__inner');

  errorTitleElement.textContent = 'Что-то пошло не так';
  errorButtonElement.textContent = 'Вернуться на главную';
  const errorBtnClone = errorButtonElement.cloneNode(true);

  const redirectHome = () => {
    window.location.href='/';
  };

  const documentEscKeydownHandler = (evt) => {
    if(isEscEvent(evt)) {
      evt.preventDefault();
      bodyElement.classList.remove('modal-open');
      errorButtonElement.replaceWith(errorBtnClone);
      bodyElement.removeChild(errorElement);
      document.removeEventListener('keydown', documentEscKeydownHandler);
      redirectHome();
    }
  };

  const errorBtnClickHandler = () => {
    bodyElement.classList.remove('modal-open');
    errorButtonElement.replaceWith(errorBtnClone);
    bodyElement.removeChild(errorElement);
    document.removeEventListener('keydown', documentEscKeydownHandler);
    redirectHome();
  };

  const errorElementClickHandler = (evt) => {
    evt.stopPropagation();
    bodyElement.classList.remove('modal-open');
    errorButtonElement.replaceWith(errorBtnClone);
    bodyElement.removeChild(errorElement);
    document.removeEventListener('keydown', documentEscKeydownHandler);
    redirectHome();
  };

  bodyElement.appendChild(errorElement, lastNodeElement.nextSibling);
  errorElement.addEventListener('click', errorElementClickHandler);
  errorInnerElement.addEventListener('click', (e) => e.stopPropagation());
  document.addEventListener('keydown', documentEscKeydownHandler);
  errorButtonElement.addEventListener('click', errorBtnClickHandler);
};

const renderGallery = (data) => {
  let index = 0;
  data.forEach(({url, description, likes, comments}) => {
    const pictureElement = pictureTemplateElement.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__img').setAttribute('index', index);
    pictureElement.querySelector('.picture__img').alt = description;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    randomPicturesFragmentElement.appendChild(pictureElement);
    index++;
  });
  picturesElement.appendChild(randomPicturesFragmentElement);
  document.querySelector('.pictures__title')
    .classList
    .remove('visually-hidden');
};

const createDefaultData = (newData, data) => {
  data.forEach((item) => {
    newData.push(item);
  });
};

const createRandomData = (randomizer, newData, source) => {
  for (newData.length; newData.length < 10;) {
    const randomItem = source[randomizer(MIN, MAX)];
    if(!newData.includes(randomItem)) {
      newData.push(randomItem);
    }
  }
};

const createDiscussedData = (newData, data) => {
  data
    .slice()
    .sort((a, b) => b.comments.length - a.comments.length)
    .forEach((item) => newData.push(item));
};

const showFilters = () => {
  const filtersElement = document.querySelector('.img-filters');
  const defaultFilterElement = filtersElement.querySelector('#filter-default');
  const randomFilterElement = filtersElement.querySelector('#filter-random');
  const discussedFilterElement = filtersElement.querySelector('#filter-discussed');

  const clearGallery = () => {
    const pictureElements = picturesElement.querySelectorAll('.picture');
    pictureElements.forEach(() => {
      const childElement = picturesElement.lastElementChild;
      picturesElement.removeChild(childElement);
    });
  };

  const setFilterActive = (filter) => {
    const filterClass = 'img-filters__button--active';
    const filterElements = [defaultFilterElement, randomFilterElement, discussedFilterElement];
    filterElements.forEach((element) => {
      if(element.classList.contains(filterClass)) {
        element.classList.remove(filterClass);
      }
    });
    filter.classList.add(filterClass);
  };

  const defaultFilterClickHandler = () => {
    debounce(defaultFilterClickHandler, DELAY);
    setFilterActive(defaultFilterElement);
    clearGallery();
    renderGallery(defaultData);
    renderFullscreenPicture(defaultData);
  };

  const randomFilterClickHandler = () => {
    debounce(randomFilterClickHandler, DELAY);
    setFilterActive(randomFilterElement);
    clearGallery();
    renderGallery(randomData);
    renderFullscreenPicture(randomData);
  };

  const discussedFilterClickHandler = () => {
    debounce(discussedFilterClickHandler, DELAY);
    setFilterActive(discussedFilterElement);
    clearGallery();
    renderGallery(discussedData);
    renderFullscreenPicture(discussedData);
  };

  createRandomData(getRandomPositiveInteger, randomData, defaultData);
  createDiscussedData(discussedData, defaultData);
  filtersElement.classList.remove('img-filters--inactive');
  defaultFilterElement.addEventListener('click', defaultFilterClickHandler);
  randomFilterElement.addEventListener('click', randomFilterClickHandler);
  discussedFilterElement.addEventListener('click', discussedFilterClickHandler);
};

const onSuccess = (pictures) => {
  createDefaultData(defaultData, pictures);
  renderGallery(defaultData);
  renderFullscreenPicture(defaultData);
  showFilters();
};

getData(onSuccess, onFail);
