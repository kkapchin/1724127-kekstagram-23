import { isEscEvent } from './is-escape-event.js';

export function closePopup (button, element, callback) {
  const body = document.querySelector('body');
  const buttonClone = button.cloneNode(true);

  function onKeydownHandler (evt) {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      element.classList.add('hidden');
      body.classList.remove('modal-open');
      callback();
      button.replaceWith(buttonClone);
    }
  }

  function onClickHandler () {
    element.classList.add('hidden');
    body.classList.remove('modal-open');
    callback();
    button.replaceWith(buttonClone);
  }

  button.addEventListener('click', onClickHandler);
  document.addEventListener('keydown', onKeydownHandler);
}

