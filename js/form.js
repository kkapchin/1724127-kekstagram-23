import { VALID_FILE_FORMAT } from './data.js';
import { closePopup } from './utils/close-popup.js';
import { openPopup } from './utils/open-popup.js';
import './hashtags-validation.js';
import './comments-validation.js';
import { sendData } from './connection.js';
import { deleteEventListener } from './utils/delete-event-listener.js';

const upload = document.querySelector('.img-upload__form');
const file = document.querySelector('#upload-file');
const form = document.querySelector('.img-upload__overlay');
const preview = document.querySelector('.img-upload__preview');
const submit = document.querySelector('#upload-submit');
const cancelButton = document.querySelector('.img-upload__cancel');

upload.setAttribute('action', 'https://23.javascript.pages.academy/kekstagram');
upload.setAttribute('method', 'POST');
upload.setAttribute('enctype', 'multipart/form-data');
file.setAttribute('accept', VALID_FILE_FORMAT.join(','));

function fileChangeHandler (event) {
  const image = event.target.files[0];
  const reader = new FileReader();
  const imgSize = document.querySelector('.scale__control--value');
  const smallerBtn = document.querySelector('.scale__control--smaller');
  const biggerBtn = document.querySelector('.scale__control--bigger');
  const effectsPreviews = document.querySelectorAll('.effects__preview');
  const effects = document.querySelectorAll('.effects__radio');
  const sliderElement = document.querySelector('.effect-level__slider');
  const effectValueElement = document.querySelector('.effect-level__value');
  const fieldset = document.querySelector('.img-upload__effect-level');
  let currentEffect = 'effects__preview--none';

  function setDefaultEffect () {
    preview.classList.remove(currentEffect);
    currentEffect = 'effects__preview--none';
    preview.classList.add(currentEffect);
  }

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

  function setNoUiSliderOptions (option) {
    switch(option) {
      case 'effects__preview--none':
        setDefaultEffect();
        break;
      case 'effects__preview--chrome':
      case 'effects__preview--sepia':
        sliderElement.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 1,
          },
          step: 0.1,
          start: 1,
        });
        break;
      case 'effects__preview--heat':
      case 'effects__preview--phobos':
        sliderElement.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 3,
          },
          step: 0.1,
          start: 3,
        });
        break;
      case 'effects__preview--marvin':
        sliderElement.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 100,
          },
          step: 1,
          start: 100,
        });
        break;
    }
  }

  function effectClickHandler (evt) {
    preview.classList.remove(currentEffect);
    currentEffect = `effects__preview--${evt.target.value}`;
    preview.classList.add(currentEffect);
    setNoUiSliderOptions(currentEffect);
    sliderElement.noUiSlider.on('update', (_, handle, unencoded) => {
      switch(evt.target.value) {
        case 'none':
          fieldset.classList.add('hidden');
          preview.style.filter = null;
          effectValueElement.value = null;
          break;
        case 'chrome':
          fieldset.classList.remove('hidden');
          preview.style.filter = `grayscale(${effectValueElement.value})`;
          effectValueElement.value = unencoded[handle];
          break;
        case 'sepia':
          fieldset.classList.remove('hidden');
          preview.style.filter = `sepia(${effectValueElement.value})`;
          effectValueElement.value = unencoded[handle];
          break;
        case 'marvin':
          fieldset.classList.remove('hidden');
          preview.style.filter = `invert(${effectValueElement.value}%)`;
          effectValueElement.value = unencoded[handle];
          break;
        case 'phobos':
          fieldset.classList.remove('hidden');
          preview.style.filter = `blur(${effectValueElement.value}px)`;
          effectValueElement.value = unencoded[handle];
          break;
        case 'heat':
          fieldset.classList.remove('hidden');
          preview.style.filter = `brightness(${effectValueElement.value})`;
          effectValueElement.value = unencoded[handle];
          break;
      }
    });
  }

  function reset (callback) {
    upload.reset();
    file.value = null;
    deleteEventListener(smallerBtn, 'click', smallerBtnClickHandler );
    deleteEventListener(biggerBtn, 'click', biggerBtnClickHandler);
    effects.forEach((effect) => {
      deleteEventListener(effect, 'click', effectClickHandler);
    });
    setDefaultEffect();
    fieldset.classList.remove('hidden');
    if(sliderElement.noUiSlider) {
      sliderElement.noUiSlider.destroy();
    }
    preview.style.filter = null;
    if(callback) {
      callback();
    }
  }

  function submitClickHandler (evt) {
    evt.preventDefault();

    function onSuccess () {
      const body = document.querySelector('body');
      const successElement = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
      const lastNode = document.querySelector('#messages');
      const coolBtn = successElement.querySelector('.success__button');
      //const successInner = successElement.querySelector('.success__inner');

      function removeSuccessEl () {
        if(body.hasChildNodes(successElement)) {
          //body.removeChild(successElement);
        }
      }

      function resetWrapp () {
        reset(removeSuccessEl);
      }
      /* function coolBtnClickHandler () {
        body.removeChild(successElement);
        body.classList.remove('modal-open');
      }

      function successElementClickHandler (ev) {
        ev.stopPropagation();
        body.removeChild(successElement);
        body.classList.remove('modal-open');
      } */

      form.classList.add('hidden');
      //body.classList.remove('modal-open');
      reset();
      closePopup(coolBtn, successElement, resetWrapp);
      body.appendChild(successElement, lastNode.nextSibling);
      //successElement.addEventListener('click', successElementClickHandler);
      //successInner.addEventListener('click', (e) => e.stopPropagation());
      //coolBtn.addEventListener('click', coolBtnClickHandler);
    }

    const formData = new FormData(upload);
    sendData(formData, onSuccess);
  }

  openPopup(form);
  imgSize.value = '100%';
  preview.style.transform = 'scale(1)';
  fieldset.classList.add('hidden');
  reader.onload = () => {
    preview.children[0].src = reader.result;
    effectsPreviews.forEach((background) => {
      background.style.backgroundImage = `url(${reader.result})`;
    });
  };
  reader.readAsDataURL(image);
  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 100,
    },
    start: 80,
    step: 10,
    connect: 'lower',
  });
  effects.forEach((effect) => {
    effect.addEventListener('click', effectClickHandler);
  });
  smallerBtn.addEventListener('click', smallerBtnClickHandler);
  biggerBtn.addEventListener('click', biggerBtnClickHandler);
  submit.addEventListener('click', submitClickHandler);
  closePopup(cancelButton, form, reset);
}

file.addEventListener('change', fileChangeHandler);

