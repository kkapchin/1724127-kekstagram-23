import { VALID_FILE_FORMAT } from './data.js';
import { closePopup } from './utils/close-popup.js';
import { openPopup } from './utils/open-popup.js';
import './hashtags-validation.js';
import './comments-validation.js';

const upload = document.querySelector('.img-upload__form');
const file = document.querySelector('#upload-file');
const form = document.querySelector('.img-upload__overlay');
const preview = document.querySelector('.img-upload__preview');
const submit = document.querySelector('#upload-submit');

upload.setAttribute('action', 'https://23.javascript.pages.academy/kekstagram');
upload.setAttribute('method', 'POST');
upload.setAttribute('enctype', 'multipart/form-data');
file.setAttribute('accept', VALID_FILE_FORMAT.join(','));

function changeHandler (event) {
  const image = event.target.files[0];
  const closeButton = document.querySelector('.img-upload__cancel');
  const reader = new FileReader();
  const imgSize = document.querySelector('.scale__control--value');
  const smallerBtn = document.querySelector('.scale__control--smaller');
  const biggerBtn = document.querySelector('.scale__control--bigger');
  const effectsPreviews = document.querySelectorAll('.effects__preview');
  const effects = document.querySelectorAll('.effects__radio');
  let currentEffect = 'effects__preview--none';

  function smallerBtnClickHandler () {
    switch (imgSize.value) {
      case '100%':
        imgSize.value = '75%';
        preview.style.transform = 'scale(0.75)';
        break;
      case '75%':
        imgSize.value = '50%';
        preview.style.transform = 'scale(0.5)';
        break;
      case '50%':
        imgSize.value = '25%';
        preview.style.transform = 'scale(0.25)';
        break;
    }
  }

  function biggerBtnClickHandler () {
    switch (imgSize.value) {
      case '75%':
        imgSize.value = '100%';
        preview.style.transform = 'scale(1)';
        break;
      case '50%':
        imgSize.value = '75%';
        preview.style.transform = 'scale(0.75)';
        break;
      case '25%':
        imgSize.value = '50%';
        preview.style.transform = 'scale(0.5)';
        break;
    }
  }

  function effectClickHandler (evt) {
    preview.classList.remove(currentEffect);
    currentEffect = `effects__preview--${evt.target.value}`;
    preview.classList.add(currentEffect);
  }

  function setDefaultEffect () {
    preview.classList.remove(currentEffect);
    currentEffect = 'effects__preview--none';
    preview.classList.add(currentEffect);
  }
  function reset () {
    file.value = '';
    smallerBtn.removeEventListener('click', smallerBtnClickHandler);
    biggerBtn.removeEventListener('click', biggerBtnClickHandler);
    effects.forEach((effect) => {
      effect.removeEventListener('click', effectClickHandler);
    });
    setDefaultEffect();
  }
  //function
  openPopup(form);
  imgSize.value = '100%';
  preview.style.transform = 'scale(1)';
  reader.onload = () => {
    preview.children[0].src = reader.result;
    effectsPreviews.forEach((background) => {
      background.style.backgroundImage = `url(${reader.result})`;
    });
  };
  reader.readAsDataURL(image);
  /* noUiSlider.create(preview, {
    range: {
      min:
    },
  }); */
  effects.forEach((effect) => {
    effect.addEventListener('click', effectClickHandler);
  });
  smallerBtn.addEventListener('click', smallerBtnClickHandler);
  biggerBtn.addEventListener('click', biggerBtnClickHandler);
  closePopup(closeButton, form, reset);
}

function submitHandler () {
}

file.addEventListener('change', changeHandler);
submit.addEventListener('click', submitHandler);
