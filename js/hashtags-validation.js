import { isEscEvent } from './utils/is-escape-event.js';
import { isSpaceEvent } from './utils/is-space-event.js';

const HASHTAGS_LIMIT = 5;
const HASHTAG_MAX_LENGTH = 20;
const LETTERS_MIN = 0;
const LETTERS_MAX = 19;
const SYMBOLS_MIN = 0;
const SYMBOLS_MAX = 20;

const regHashtag = /^#[A-Za-zА-Яа-я0-9_]{1,19}$/;
const regInput = /[A-Za-z0-9А-Яа-я #_]$/;
const inputElement = document.querySelector('.text__hashtags');

const getUniqHashtags = (hashtags) => {
  const lowerCasedHashtags = inputElement.value.toLowerCase().split(' ');
  let uniqIndexes = [];
  lowerCasedHashtags.filter((hashtag) => uniqIndexes.push(lowerCasedHashtags.indexOf(hashtag)));
  uniqIndexes = uniqIndexes.filter((item, index) => index === uniqIndexes.indexOf(item));
  const uniqHashtags = [];
  uniqIndexes.forEach((uniqIndex) => {
    uniqHashtags.push(hashtags[uniqIndex]);
  });
  return uniqHashtags;
};

const keydownHandler = (evt) => {
  const hashtags = inputElement.value.split(' ');
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
  if(isSpaceEvent(evt)) {
    const uniqHashtags = getUniqHashtags(hashtags);
    inputElement.value = uniqHashtags.join(' ');
  }
};

const keyupHandler = () => {
  const hashtags = inputElement.value.split(' ');
  const currentHashtag = hashtags[hashtags.length -1];
  if(!regHashtag.test(currentHashtag)) {
    if(currentHashtag[0] !== '#') {
      hashtags[hashtags.length -1] = `#${currentHashtag.substring(LETTERS_MIN, LETTERS_MAX)}`;
      inputElement.value = hashtags.join(' ');
    }
    if(currentHashtag.length >= HASHTAG_MAX_LENGTH) {
      hashtags[hashtags.length -1] = currentHashtag.substring(SYMBOLS_MIN, SYMBOLS_MAX);
      inputElement.value = hashtags.join(' ');
      inputElement.value += ' #';
    }
  }
  if(hashtags.length > HASHTAGS_LIMIT) {
    hashtags.pop();
    inputElement.value = hashtags.join(' ');
  }
  if(getUniqHashtags(hashtags).length !== hashtags.length) {
    inputElement.setAttribute('style', 'border-color: #FF0000');
    inputElement.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
    inputElement.reportValidity();
  } else {
    inputElement.removeAttribute('style');
    inputElement.setCustomValidity('');
  }
};

const focusoutHandler = () => {
  const hashtags = inputElement.value.split(' ');
  const currentHashtag = hashtags[hashtags.length -1];
  if(currentHashtag === '#') {
    hashtags.pop();
    inputElement.value = hashtags.join(' ');
  }
};

inputElement.addEventListener('keydown', keydownHandler);
inputElement.addEventListener('keyup', keyupHandler);
inputElement.addEventListener('focusout', focusoutHandler);
