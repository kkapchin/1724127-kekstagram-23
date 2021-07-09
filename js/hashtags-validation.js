import { isEscEvent } from './utils/is-escape-event.js';
import { isSpaceEvent } from './utils/is-space-event.js';

const regHashtag = /^#[A-Za-zА-Яа-я0-9_]{1,19}$/;
const regInput = /[A-Za-z0-9А-Яа-я #_]$/;
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
  if(isSpaceEvent(evt)) {
    const lowerCase = input.value.toLowerCase().split(' ');
    let uniqIndexes = [];
    lowerCase.filter((hashtag) => uniqIndexes.push(lowerCase.indexOf(hashtag)));
    uniqIndexes = uniqIndexes.filter((item, index) => index === uniqIndexes.indexOf(item));
    const uniqHashtags = [];
    for(let i = 0; i < uniqIndexes.length; i++) {
      uniqHashtags.push(hashtags[uniqIndexes[i]]);
    }
    input.value = uniqHashtags.join(' ');
  }
}

function keyupHandler () {
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
