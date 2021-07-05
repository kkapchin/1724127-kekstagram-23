import { VALID_FILE_FORMAT } from './data.js';
import { closePopup } from './utils/close-popup.js';
import { openPopup } from './utils/open-popup.js';

const form = document.querySelector('.img-upload__form');
const upload = document.querySelector('#upload-file');
const editImg = document.querySelector('.img-upload__overlay');
const preview = document.querySelector('.img-upload__preview');
form.setAttribute('action', 'https://23.javascript.pages.academy/kekstagram');
form.setAttribute('method', 'POST');
form.setAttribute('enctype', 'multipart/form-data');
upload.setAttribute('accept', VALID_FILE_FORMAT.join(','));

const changeHandler = (evt) => {
  openPopup(editImg);
  const file = evt.target.files[0];
  const closeButton = document.querySelector('.img-upload__cancel');
  closePopup(closeButton, editImg);

  const reader = new FileReader();
  reader.onload = (ev) => {
    preview.children[0].src = ev.target.result;
  };
  reader.readAsDataURL(file);
};

upload.addEventListener('change', changeHandler);
