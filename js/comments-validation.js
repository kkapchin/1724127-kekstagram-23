import { checkStringLength } from './utils/check-string-length.js';
import { isEscEvent } from './utils/is-escape-event.js';

const input = document.querySelector('.text__description');

function keydownHandler (evt) {
  if(isEscEvent(evt)) {
    evt.stopPropagation();
  }
}

function keyupHandler () {
  if(!checkStringLength(input.value, 140)) {
    input.value = input.value.substring(0, 140);
  }
}

input.addEventListener('keydown', keydownHandler);
input.addEventListener('keyup', keyupHandler);
