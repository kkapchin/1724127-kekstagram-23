import { isEscEvent } from './is-escape-event.js';

export const closePopup = (button, element, callback) => {
  const body = document.querySelector('body');
  const buttonClone = button.cloneNode(true);

  const onKeydownHandler = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      element.classList.add('hidden');
      body.classList.remove('modal-open');
      button.replaceWith(buttonClone);
      document.removeEventListener('keydown', onKeydownHandler);
      callback();
    }
  };

  const onClickHandler = () => {
    element.classList.add('hidden');
    body.classList.remove('modal-open');
    button.replaceWith(buttonClone);
    document.removeEventListener('keydown', onKeydownHandler);
    callback();
  };

  button.addEventListener('click', onClickHandler);
  document.addEventListener('keydown', onKeydownHandler);
};

