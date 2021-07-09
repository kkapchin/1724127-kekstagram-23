import { isEscEvent } from './utils/is-escape-event.js';
import { isSpaceEvent } from './utils/is-space-event.js';

const regHashtag = /^#[a-zа-я0-9]{1,19}$/;
const regInput = /[A-Za-z0-9А-Яа-я #]$/;
const input = document.querySelector('.text__hashtags');

function keydownHandler (evt) {
  const hashtags = input.value.split(' ');
  const currentHashtag = hashtags[hashtags.length -1];
  if(isEscEvent(evt)) {
    evt.stopPropagation();
  }
  if(!regInput.test(evt.key)) {
    evt.preventDefault();
  }
  if(!regHashtag.test(currentHashtag)) {
    if(isSpaceEvent(evt)) {
      evt.preventDefault();
    }
  }
}

function keyupHandler () {
  input.value = input.value.toLowerCase();
  const hashtags = input.value.split(' ');
  const currentHashtag = hashtags[hashtags.length -1];
  if(!regHashtag.test(currentHashtag)) {
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
