export function closePopup (button, element) {

  button.addEventListener('click', () => {
    element.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      element.classList.add('hidden');
      document.querySelector('body').classList.remove('modal-open');
    }
  });
}
