export function openPopup (element) {
  element.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
}
