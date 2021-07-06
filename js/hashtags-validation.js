//import { isEscEvent } from './utils/is-escape-event.js';

export function hashtagValidation () {
  const reg = /^#[a-zа-я0-9]{1,19}$/;
  const input = document.querySelector('.text__hashtags');
  const hashtags = input.value.toLowerCase().split(' ');

  hashtags.forEach((hashtag) => {
    if(!reg.test(hashtag)) {
      input.setCustomValidity('Неверный формат');
    } else {
      return true;
    }
  });
}
