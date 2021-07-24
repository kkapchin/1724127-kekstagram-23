import { checkStringLength } from './utils/check-string-length.js';
import { isEscEvent } from './utils/is-escape-event.js';

const MIN = 0;
const MAX = 140;

const inputElement = document.querySelector('.text__description');

const keydownHandler = (evt) => {
  if(isEscEvent(evt)) {
    evt.stopPropagation();
  }
  inputElement.setCustomValidity('');
};

const keyupHandler = () => {
  if(!checkStringLength(inputElement.value, MAX)) {
    inputElement.value = inputElement.value.substring(MIN, MAX);
    inputElement.setCustomValidity('Длина комментария не может составлять больше 140 символов');
    inputElement.reportValidity();
  }
};

inputElement.addEventListener('keydown', keydownHandler);
inputElement.addEventListener('keyup', keyupHandler);
