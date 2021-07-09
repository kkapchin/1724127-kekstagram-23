import { isEscEvent } from './utils/is-escape-event.js';

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

function keyupHandler () {
  input.value = input.value.toLowerCase();
  const hashtags = input.value.split(' ');
  const currentHashtag = hashtags[hashtags.length -1];
  if(!regKeyup.test(currentHashtag)) {
    if(currentHashtag[0] !== '#') {
      hashtags[hashtags.length -1] = `#${  currentHashtag.substring(0, 19)}`;
      input.value = hashtags.join(' ');
    }
    if(currentHashtag.length >= 20) {
      hashtags[hashtags.length -1] = currentHashtag.substring(0, 20);
      input.value = hashtags.join(' ');
      input.value += ' #';
    }
  }
  if(hashtags.length > 5) {
    hashtags.pop();
    input.value = hashtags.join(' ');
  }
}

input.addEventListener('keydown', keydownHandler);
input.addEventListener('keyup', keyupHandler);