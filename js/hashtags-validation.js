import { isEscEvent } from './utils/is-escape-event.js';
import { isSpaceEvent } from './utils/is-space-event.js';

const regKeyup = /^#[a-zа-я0-9]{1,19}$/;
const regKeydown = /[A-Za-z0-9А-Яа-я #]$/;
const input = document.querySelector('.text__hashtags');

function keydownHandler (evt) {
  if(isEscEvent(evt)) {
    evt.stopPropagation();
  }
  if(!regKeydown.test(evt.key)) {
    evt.preventDefault();
  }
}

function keyupHandler (evt) {
  input.value = input.value.toLowerCase();
  const hashtags = input.value.split(' ');

  hashtags.forEach((hashtag) => {
    if(!regKeyup.test(hashtag)) {
      input.value = hashtags.join(' ');
      input.value += '';
      input.setCustomValidity('Неверный формат');
    }
  });
  if(isSpaceEvent(evt)) {
    input.value += '#';
    input.value = input.value.trim();
  }
}

input.addEventListener('keydown', keydownHandler);
input.addEventListener('keyup', keyupHandler);
