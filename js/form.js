import './hashtags-validation.js';
import './comments-validation.js';
import { closePopup } from './utils/close-popup.js';
import { openPopup } from './utils/open-popup.js';
import { sendData } from './connection.js';
import { deleteEventListener } from './utils/delete-event-listener.js';
import { isEscEvent } from './utils/is-escape-event.js';
import { VALID_FILE_TYPES } from './data.js';

const form = document.querySelector('.img-upload__form');
const file = document.querySelector('#upload-file');
const overlay = document.querySelector('.img-upload__overlay');
const preview = document.querySelector('.img-upload__preview');

form.setAttribute('action', 'https://23.javascript.pages.academy/kekstagram');
form.setAttribute('method', 'POST');
form.setAttribute('enctype', 'multipart/form-data');
file.setAttribute('accept', VALID_FILE_TYPES.join(','));

function fileChangeHandler (event) {
  const image = event.target.files[0];
  const reader = new FileReader();
  const imgSize = document.querySelector('.scale__control--value');
  const decreaseButton = document.querySelector('.scale__control--smaller');
  const increaseButton = document.querySelector('.scale__control--bigger');
  const effectPreview = document.querySelectorAll('.effects__preview');
  const frame = document.querySelectorAll('.effects__radio');
  const sliderElement = document.querySelector('.effect-level__slider');
  const effectValueElement = document.querySelector('.effect-level__value');
  const fieldset = document.querySelector('.img-upload__effect-level');
  const cancelButton = document.querySelector('.img-upload__cancel');
  const submitButton = document.querySelector('#upload-submit');
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
        sliderElement.noUiSlider.updateOptions({
          range: {
            min: 1,
            max: 3,
          },
          step: 0.1,
          start: 3,
        });
        break;
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

  function submitClickHandler (evt) {
    evt.preventDefault();
    const body = document.querySelector('body');
    const lastNode = document.querySelector('#messages');
    const cancelButtonClone = cancelButton.cloneNode(true);

    function onSuccess () {
      const successElement = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
      const coolButton = successElement.querySelector('.success__button');
      const coolButtonClone = coolButton.cloneNode(true);
      const successInner = successElement.querySelector('.success__inner');

      function documentEscKeydownHandler (ev) {
        if(isEscEvent(ev)) {
          ev.preventDefault();
          body.classList.remove('modal-open');
          coolButton.replaceWith(coolButtonClone);
          body.removeChild(successElement);
          deleteEventListener(document, 'keydown', documentEscKeydownHandler);
        }
      }

      function coolBtnClickHandler () {
        body.classList.remove('modal-open');
        coolButton.replaceWith(coolButtonClone);
        body.removeChild(successElement);
        deleteEventListener(document, 'keydown', documentEscKeydownHandler);
      }

      function successElementClickHandler (ev) {
        ev.stopPropagation();
        body.classList.remove('modal-open');
        coolButton.replaceWith(coolButtonClone);
        body.removeChild(successElement);
        deleteEventListener(document, 'keydown', documentEscKeydownHandler);
      }

      overlay.classList.add('hidden');
      form.reset();
      file.value = null;
      cancelButton.replaceWith(cancelButtonClone);
      deleteEventListener(decreaseButton, 'click', smallerBtnClickHandler );
      deleteEventListener(increaseButton, 'click', biggerBtnClickHandler);
      deleteEventListener(submitButton, 'click', submitClickHandler);
      frame.forEach((effect) => {
        deleteEventListener(effect, 'click', effectClickHandler);
      });
      setDefaultEffect();
      fieldset.classList.remove('hidden');
      if(sliderElement.noUiSlider) {
        sliderElement.noUiSlider.destroy();
      }
      preview.style.filter = null;
      body.appendChild(successElement, lastNode.nextSibling);
      successElement.addEventListener('click', successElementClickHandler);
      successInner.addEventListener('click', (e) => e.stopPropagation());
      document.addEventListener('keydown', documentEscKeydownHandler);
      coolButton.addEventListener('click', coolBtnClickHandler);
    }

    function onFail () {
      const errorElement = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
      const errorButton = errorElement.querySelector('.error__button');
      const errorButtonClone = errorButton.cloneNode(true);
      const errorInner = errorElement.querySelector('.error__inner');

      function documentEscKeydownHandler (ev) {
        if(isEscEvent(ev)) {
          ev.preventDefault();
          body.classList.remove('modal-open');
          errorButton.replaceWith(errorButtonClone);
          body.removeChild(errorElement);
          deleteEventListener(document, 'keydown', documentEscKeydownHandler);
        }
      }

      function errorBtnClickHandler () {
        body.classList.remove('modal-open');
        errorButton.replaceWith(errorButtonClone);
        body.removeChild(errorElement);
        deleteEventListener(document, 'keydown', documentEscKeydownHandler);
      }

      function errorElementClickHandler (ev) {
        ev.stopPropagation();
        body.classList.remove('modal-open');
        errorButton.replaceWith(errorButtonClone);
        body.removeChild(errorElement);
        deleteEventListener(document, 'keydown', documentEscKeydownHandler);
      }

      overlay.classList.add('hidden');
      form.reset();
      file.value = null;
      cancelButton.replaceWith(cancelButtonClone);
      deleteEventListener(decreaseButton, 'click', smallerBtnClickHandler );
      deleteEventListener(increaseButton, 'click', biggerBtnClickHandler);
      deleteEventListener(submitButton, 'click', submitClickHandler);
      frame.forEach((effect) => {
        deleteEventListener(effect, 'click', effectClickHandler);
      });
      setDefaultEffect();
      fieldset.classList.remove('hidden');
      if(sliderElement.noUiSlider) {
        sliderElement.noUiSlider.destroy();
      }
      preview.style.filter = null;
      body.appendChild(errorElement, lastNode.nextSibling);
      errorElement.addEventListener('click', errorElementClickHandler);
      errorInner.addEventListener('click', (e) => e.stopPropagation());
      document.addEventListener('keydown', documentEscKeydownHandler);
      errorButton.addEventListener('click', errorBtnClickHandler);
    }

    const formData = new FormData(form);
    sendData(formData, onSuccess, onFail);
  }

  function reset () {
    form.reset();
    file.value = null;
    deleteEventListener(decreaseButton, 'click', smallerBtnClickHandler );
    deleteEventListener(increaseButton, 'click', biggerBtnClickHandler);
    deleteEventListener(submitButton, 'click', submitClickHandler);
    frame.forEach((effect) => {
      deleteEventListener(effect, 'click', effectClickHandler);
    });
    setDefaultEffect();
    fieldset.classList.remove('hidden');
    if(sliderElement.noUiSlider) {
      sliderElement.noUiSlider.destroy();
    }
    preview.style.filter = null;
  }

  openPopup(overlay);
  imgSize.value = '100%';
  preview.style.transform = 'scale(1)';
  fieldset.classList.add('hidden');
  reader.onload = () => {
    preview.children[0].src = reader.result;
    effectPreview.forEach((background) => {
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
  frame.forEach((effect) => {
    effect.addEventListener('click', effectClickHandler);
  });
  decreaseButton.addEventListener('click', smallerBtnClickHandler);
  increaseButton.addEventListener('click', biggerBtnClickHandler);
  submitButton.addEventListener('click', submitClickHandler);
  closePopup(cancelButton, overlay, reset);
}

file.addEventListener('change', fileChangeHandler);
