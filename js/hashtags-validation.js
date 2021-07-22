import { isEscEvent } from './utils/is-escape-event.js';
import { isSpaceEvent } from './utils/is-space-event.js';

const regHashtag = /^#[A-Za-zА-Яа-я0-9_]{1,19}$/;
const regInput = /[A-Za-z0-9А-Яа-я #_]$/;
const input = document.querySelector('.text__hashtags');

function keydownHandler (evt) {
  const content = input.value.split(' ');
  const currentHashtag = content[content.length -1];
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
  if(isSpaceEvent(evt)) {
    const lowerCaseHashtags = input.value.toLowerCase().split(' ');
    let uniqIndexes = [];
    lowerCaseHashtags.filter((hashtag) => uniqIndexes.push(lowerCaseHashtags.indexOf(hashtag)));
    uniqIndexes = uniqIndexes.filter((item, index) => index === uniqIndexes.indexOf(item));
    const uniqHashtags = [];
    uniqIndexes.forEach((uniqIndex) => {
      uniqHashtags.push(content[uniqIndex]);
    });
    input.value = uniqHashtags.join(' ');
  }
}

function keyupHandler () {
  const HASHTAGS_LIMIT = 5;
  const HASHTAG_MAX_LENGTH = 20;
  const LETTERS_MIN = 0;
  const LETTERS_MAX = 19;
  const SYMBOLS_MIN = 0;
  const SYMBOLS_MAX = 20;
  const hashtags = input.value.split(' ');
  const currentHashtag = hashtags[hashtags.length -1];
  if(!regHashtag.test(currentHashtag)) {
    if(currentHashtag[0] !== '#') {
      hashtags[hashtags.length -1] = `#${currentHashtag.substring(LETTERS_MIN, LETTERS_MAX)}`;
      input.value = hashtags.join(' ');
    }
    if(currentHashtag.length >= HASHTAG_MAX_LENGTH) {
      hashtags[hashtags.length -1] = currentHashtag.substring(SYMBOLS_MIN, SYMBOLS_MAX);
      input.value = hashtags.join(' ');
      input.value += ' #';
    }
  }
  if(hashtags.length > HASHTAGS_LIMIT) {
    hashtags.pop();
    input.value = hashtags.join(' ');
  }
}

function focusoutHandler () {
  const hashtags = input.value.split(' ');
  const currentHashtag = hashtags[hashtags.length -1];
  if(currentHashtag === '#') {
    hashtags.pop();
    input.value = hashtags.join(' ');
  }
}

input.addEventListener('keydown', keydownHandler);
input.addEventListener('keyup', keyupHandler);
input.addEventListener('focusout', focusoutHandler);
