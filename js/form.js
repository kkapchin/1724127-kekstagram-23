import './hashtags-validation.js';
import './comments-validation.js';
import { closePopup } from './utils/close-popup.js';
import { openPopup } from './utils/open-popup.js';
import { sendData } from './connection.js';
import { deleteEventListener } from './utils/delete-event-listener.js';
import { isEscEvent } from './utils/is-escape-event.js';
import { VALID_FILE_TYPES } from './data.js';

const formElement = document.querySelector('.img-upload__form');
const fileElement = document.querySelector('#upload-file');
const overlayElement = document.querySelector('.img-upload__overlay');
const previewElement = document.querySelector('.img-upload__preview');
const hashtagElement = document.querySelector('.text__hashtags');
const descriptionElement = document.querySelector('.text__description');

formElement.setAttribute('action', 'https://23.javascript.pages.academy/kekstagram');
formElement.setAttribute('method', 'POST');
formElement.setAttribute('enctype', 'multipart/form-data');
fileElement.setAttribute('accept', VALID_FILE_TYPES.join(','));

const resetInputs = () => {
  hashtagElement.removeAttribute('style');
  hashtagElement.setCustomValidity('');
  descriptionElement.removeAttribute('style');
  descriptionElement.setCustomValidity('');
};

const fileChangeHandler = (event) => {
  const image = event.target.files[0];
  const reader = new FileReader();
  const imgSizeElement = document.querySelector('.scale__control--value');
  const decreaseButtonElement = document.querySelector('.scale__control--smaller');
  const increaseButtonElement = document.querySelector('.scale__control--bigger');
  const effectPreviewElement = document.querySelectorAll('.effects__preview');
  const frameElement = document.querySelectorAll('.effects__radio');
  const sliderElement = document.querySelector('.effect-level__slider');
  const effectValueElement = document.querySelector('.effect-level__value');
  const fieldsetElement = document.querySelector('.img-upload__effect-level');
  const cancelButtonElement = document.querySelector('.img-upload__cancel');
  const submitButtonElement = document.querySelector('#upload-submit');
  let currentEffect = 'effects__preview--none';

  const setDefaultEffect = () => {
    previewElement.classList.remove(currentEffect);
    currentEffect = 'effects__preview--none';
    previewElement.classList.add(currentEffect);
  };

  const smallerBtnClickHandler = () => {
    switch (imgSizeElement.value) {
      case '100%':
        imgSizeElement.value = '75%';
        previewElement.style.transform = 'scale(0.75)';
        break;
      case '75%':
        imgSizeElement.value = '50%';
        previewElement.style.transform = 'scale(0.5)';
        break;
      case '50%':
        imgSizeElement.value = '25%';
        previewElement.style.transform = 'scale(0.25)';
        break;
    }
  };

  const biggerBtnClickHandler = () => {
    switch (imgSizeElement.value) {
      case '75%':
        imgSizeElement.value = '100%';
        previewElement.style.transform = 'scale(1)';
        break;
      case '50%':
        imgSizeElement.value = '75%';
        previewElement.style.transform = 'scale(0.75)';
        break;
      case '25%':
        imgSizeElement.value = '50%';
        previewElement.style.transform = 'scale(0.5)';
        break;
    }
  };

  const setNoUiSliderOptions = (option) => {
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
  };

  const effectClickHandler = (evt) => {
    previewElement.classList.remove(currentEffect);
    currentEffect = `effects__preview--${evt.target.value}`;
    previewElement.classList.add(currentEffect);
    setNoUiSliderOptions(currentEffect);
    sliderElement.noUiSlider.on('update', (_, handle, unencoded) => {
      switch(evt.target.value) {
        case 'none':
          fieldsetElement.classList.add('hidden');
          previewElement.style.filter = null;
          effectValueElement.value = null;
          break;
        case 'chrome':
          fieldsetElement.classList.remove('hidden');
          previewElement.style.filter = `grayscale(${effectValueElement.value})`;
          effectValueElement.value = unencoded[handle];
          break;
        case 'sepia':
          fieldsetElement.classList.remove('hidden');
          previewElement.style.filter = `sepia(${effectValueElement.value})`;
          effectValueElement.value = unencoded[handle];
          break;
        case 'marvin':
          fieldsetElement.classList.remove('hidden');
          previewElement.style.filter = `invert(${effectValueElement.value}%)`;
          effectValueElement.value = unencoded[handle];
          break;
        case 'phobos':
          fieldsetElement.classList.remove('hidden');
          previewElement.style.filter = `blur(${effectValueElement.value}px)`;
          effectValueElement.value = unencoded[handle];
          break;
        case 'heat':
          fieldsetElement.classList.remove('hidden');
          previewElement.style.filter = `brightness(${effectValueElement.value})`;
          effectValueElement.value = unencoded[handle];
          break;
      }
    });
  };

  const submitClickHandler = (evt) => {
    evt.preventDefault();
    const bodyElement = document.querySelector('body');
    const lastNodeElement = document.querySelector('#messages');
    const cancelButtonElementClone = cancelButtonElement.cloneNode(true);

    const onSuccess = () => {
      const successElement = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
      const coolButtonElement = successElement.querySelector('.success__button');
      const coolButtonElementClone = coolButtonElement.cloneNode(true);
      const successInnerElement = successElement.querySelector('.success__inner');

      const documentEscKeydownHandler = (ev) => {
        if(isEscEvent(ev)) {
          ev.preventDefault();
          bodyElement.classList.remove('modal-open');
          coolButtonElement.replaceWith(coolButtonElementClone);
          bodyElement.removeChild(successElement);
          document.removeEventListener('keydown', documentEscKeydownHandler);
        }
      };

      const coolBtnClickHandler = () => {
        bodyElement.classList.remove('modal-open');
        coolButtonElement.replaceWith(coolButtonElementClone);
        bodyElement.removeChild(successElement);
        document.removeEventListener('keydown', documentEscKeydownHandler);
      };

      const successElementClickHandler = (ev) => {
        ev.stopPropagation();
        bodyElement.classList.remove('modal-open');
        coolButtonElement.replaceWith(coolButtonElementClone);
        bodyElement.removeChild(successElement);
        document.removeEventListener('keydown', documentEscKeydownHandler);
      };

      overlayElement.classList.add('hidden');
      formElement.reset();
      fileElement.value = null;
      cancelButtonElement.replaceWith(cancelButtonElementClone);
      deleteEventListener(decreaseButtonElement);
      deleteEventListener(increaseButtonElement);
      deleteEventListener(submitButtonElement);
      frameElement.forEach((effect) => {
        deleteEventListener(effect);
      });
      setDefaultEffect();
      fieldsetElement.classList.remove('hidden');
      if(sliderElement.noUiSlider) {
        sliderElement.noUiSlider.destroy();
      }
      previewElement.style.filter = null;
      bodyElement.appendChild(successElement, lastNodeElement.nextSibling);
      successElement.addEventListener('click', successElementClickHandler);
      successInnerElement.addEventListener('click', (e) => e.stopPropagation());
      document.addEventListener('keydown', documentEscKeydownHandler);
      coolButtonElement.addEventListener('click', coolBtnClickHandler);
    };

    const onFail = () => {
      const errorElement = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
      const errorButtonElement = errorElement.querySelector('.error__button');
      const errorButtonElementClone = errorButtonElement.cloneNode(true);
      const errorInnerElement = errorElement.querySelector('.error__inner');

      const documentEscKeydownHandler = (ev) => {
        if(isEscEvent(ev)) {
          ev.preventDefault();
          bodyElement.classList.remove('modal-open');
          errorButtonElement.replaceWith(errorButtonElementClone);
          bodyElement.removeChild(errorElement);
          document.removeEventListener('keydown', documentEscKeydownHandler);
        }
      };

      const errorBtnClickHandler = () => {
        bodyElement.classList.remove('modal-open');
        errorButtonElement.replaceWith(errorButtonElementClone);
        bodyElement.removeChild(errorElement);
        document.removeEventListener('keydown', documentEscKeydownHandler);
      };

      const errorElementClickHandler = (ev) => {
        ev.stopPropagation();
        bodyElement.classList.remove('modal-open');
        errorButtonElement.replaceWith(errorButtonElementClone);
        bodyElement.removeChild(errorElement);
        document.removeEventListener('keydown', documentEscKeydownHandler);
      };

      overlayElement.classList.add('hidden');
      formElement.reset();
      fileElement.value = null;
      cancelButtonElement.replaceWith(cancelButtonElementClone);
      deleteEventListener(decreaseButtonElement);
      deleteEventListener(increaseButtonElement);
      deleteEventListener(submitButtonElement);
      frameElement.forEach((effect) => {
        deleteEventListener(effect);
      });
      setDefaultEffect();
      fieldsetElement.classList.remove('hidden');
      if(sliderElement.noUiSlider) {
        sliderElement.noUiSlider.destroy();
      }
      previewElement.style.filter = null;
      bodyElement.appendChild(errorElement, lastNodeElement.nextSibling);
      errorElement.addEventListener('click', errorElementClickHandler);
      errorInnerElement.addEventListener('click', (e) => e.stopPropagation());
      document.addEventListener('keydown', documentEscKeydownHandler);
      errorButtonElement.addEventListener('click', errorBtnClickHandler);
    };

    if(hashtagElement.checkValidity()) {
      const formData = new FormData(formElement);
      sendData(formData, onSuccess, onFail);
    }
  };

  const reset = () => {
    formElement.reset();
    fileElement.value = null;
    deleteEventListener(decreaseButtonElement);
    deleteEventListener(increaseButtonElement);
    deleteEventListener(submitButtonElement);
    frameElement.forEach((effect) => {
      deleteEventListener(effect);
    });
    setDefaultEffect();
    fieldsetElement.classList.remove('hidden');
    if(sliderElement.noUiSlider) {
      sliderElement.noUiSlider.destroy();
    }
    previewElement.style.filter = null;
  };

  resetInputs();
  openPopup(overlayElement);
  imgSizeElement.value = '100%';
  previewElement.style.transform = 'scale(1)';
  fieldsetElement.classList.add('hidden');
  reader.onload = () => {
    previewElement.children[0].src = reader.result;
    effectPreviewElement.forEach((background) => {
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
  frameElement.forEach((effect) => {
    effect.addEventListener('click', effectClickHandler);
  });
  decreaseButtonElement.addEventListener('click', smallerBtnClickHandler);
  increaseButtonElement.addEventListener('click', biggerBtnClickHandler);
  submitButtonElement.addEventListener('click', submitClickHandler);
  closePopup(cancelButtonElement, overlayElement, reset);
};

fileElement.addEventListener('change', fileChangeHandler);
