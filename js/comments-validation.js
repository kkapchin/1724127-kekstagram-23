import { checkStringLength } from './utils/check-string-length.js';
import { isEscEvent } from './utils/is-escape-event.js';

const input = document.querySelector('.text__description');

function keydownHandler (evt) {
  if(isEscEvent(evt)) {
    evt.stopPropagation();
  }
  input.setCustomValidity('');
}

function keyupHandler () {
  const MIN = 0;
  const MAX = 140;
  if(!checkStringLength(input.value, MAX)) {
    input.value = input.value.substring(MIN, MAX);
    input.setCustomValidity('Длина комментария не может составлять больше 140 символов');
    input.reportValidity();
  }
}

input.addEventListener('keydown', keydownHandler);
input.addEventListener('keyup', keyupHandler);
