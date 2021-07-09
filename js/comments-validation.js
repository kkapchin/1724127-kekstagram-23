import { isEscEvent } from './utils/is-escape-event.js';

const input = document.querySelector('.text__description');

function keydownHandler (evt) {
  if(isEscEvent(evt)) {
    evt.stopPropagation();
  }
}

input.addEventListener('keydown', keydownHandler);
