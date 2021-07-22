import { checkStringLength } from './utils/check-string-length.js';
import { isEscEvent } from './utils/is-escape-event.js';

const input = document.querySelector('.text__description');

function keydownHandler (evt) {
  if(isEscEvent(evt)) {
    evt.stopPropagation();
  }
}

function keyupHandler () {
  const MIN = 0;
  const MAX = 0;
  if(!checkStringLength(input.value, MAX)) {
    input.value = input.value.substring(MIN, MAX);
  }
}

input.addEventListener('keydown', keydownHandler);
input.addEventListener('keyup', keyupHandler);
