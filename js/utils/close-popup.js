import { deleteEventListener } from './delete-event-listener.js';
import { isEscEvent } from './is-escape-event.js';

export function closePopup (button, element, callback) {
  const body = document.querySelector('body');
  const buttonClone = button.cloneNode(true);

  function onKeydownHandler (evt) {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      element.classList.add('hidden');
      body.classList.remove('modal-open');
      button.replaceWith(buttonClone);
      deleteEventListener(document, 'keydown', onKeydownHandler);
      callback();
    }
  }

  function onClickHandler () {
    element.classList.add('hidden');
    body.classList.remove('modal-open');
    button.replaceWith(buttonClone);
    deleteEventListener(document, 'keydown', onKeydownHandler);
    callback();
  }

  button.addEventListener('click', onClickHandler);
  document.addEventListener('keydown', onKeydownHandler);
}

