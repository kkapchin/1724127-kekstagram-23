import { VALID_FILE_FORMAT } from './data.js';
import { closePopup } from './utils/close-popup.js';
import { openPopup } from './utils/open-popup.js';
import './hashtags-validation.js';
import './comments-validation.js';

const upload = document.querySelector('.img-upload__form');
const file = document.querySelector('#upload-file');
const form = document.querySelector('.img-upload__overlay');
const preview = document.querySelector('.img-upload__preview');
const submit = document.querySelector('#upload-submit');

upload.setAttribute('action', 'https://23.javascript.pages.academy/kekstagram');
upload.setAttribute('method', 'POST');
upload.setAttribute('enctype', 'multipart/form-data');
file.setAttribute('accept', VALID_FILE_FORMAT.join(','));

function changeHandler (evt) {
  openPopup(form);
  const image = evt.target.files[0];
  const closeButton = document.querySelector('.img-upload__cancel');
  closePopup(closeButton, form, () => {
    file.value = '';
  });

  const reader = new FileReader();
  reader.onload = (ev) => {
    preview.children[0].src = ev.target.result;
  };
  reader.readAsDataURL(image);
}

function submitHandler (evt) {
  evt.preventDefault();
}

file.addEventListener('change', changeHandler);
submit.addEventListener('click', submitHandler);
