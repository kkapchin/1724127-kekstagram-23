import { isEscEvent } from './is-escape-event.js';

export function closePopup (button, element, callback) {
  const body = document.querySelector('body');
  button.addEventListener('click', () => {
    element.classList.add('hidden');
    body.classList.remove('modal-open');
    callback();
  });

  document.addEventListener('keydown', (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      element.classList.add('hidden');
      body.classList.remove('modal-open');
      callback();
    }
  });
}
