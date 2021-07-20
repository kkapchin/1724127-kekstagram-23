import { getData } from './connection.js';
import { closePopup } from './utils/close-popup.js';
import { isEscEvent } from './utils/is-escape-event.js';
import { makeCounter } from './utils/make-counter.js';
import { openPopup } from './utils/open-popup.js';

const data = getData();

data.then((photos) => {
  const bigPicture = document.querySelector('.big-picture');
  const pictures = document.querySelectorAll('.picture__img');
  const commentsContainer = document.querySelector('.social__comments');
  const commentCount = document.querySelector('.social__comment-count');
  const loadMoreBtn = document.querySelector('.comments-loader');
  let counter = makeCounter(1, 1);

  function clearCommentsContainer () {
    let child = commentsContainer.lastElementChild;
    while (commentsContainer.children.length > 1) {
      commentsContainer.removeChild(child);
      child = commentsContainer.lastElementChild;
    }
    child.classList.add('hidden');
    counter = makeCounter(1, 1);
  }

  function loadMoreBtnHandler () {
    const commentsElements = commentsContainer.querySelectorAll('li.hidden');
    for(let i = 1; i < 6; i++) {
      if(commentsElements[i]) {
        commentsElements[i].classList.remove('hidden');
        commentCount.childNodes[0].nodeValue = `${counter()} из `;
      }
    }
    if(commentsElements.length < 7) {
      loadMoreBtn.classList.add('hidden');
    }
  }

  function pictureClickHandler (event) {
    event.preventDefault();
    const picId = event.target.attributes.pic_id.value;
    const currentPic = photos[picId];
    const comments = currentPic.comments;
    const img = document.querySelector('.big-picture__img').children[0];
    const cancelButton = document.querySelector('.big-picture__cancel');
    const description = bigPicture.querySelector('.social__caption');
    const likes = bigPicture.querySelector('.likes-count');
    const commentsFragment = document.createDocumentFragment();
    const commentsTotal = commentCount.querySelector('.comments-count');
    const body = document.querySelector('body');

    loadMoreBtn.classList.add('hidden');
    clearCommentsContainer();
    openPopup(bigPicture);
    img.src = event.target.currentSrc;
    description.textContent = currentPic.description;
    likes.textContent = currentPic.likes;

    for(let i = 0; i < comments.length; i++) {
      const commentElement = commentsContainer.querySelector('li').cloneNode(true);
      const user = commentElement.querySelector('.social__picture');
      const message = commentElement.querySelector('.social__text');
      user.src = comments[i].avatar;
      user.alt = comments[i].name;
      message.textContent = comments[i].message;
      if(i < 5) {
        commentElement.classList.remove('hidden');
        commentCount.childNodes[0].nodeValue = `${counter()} из `;
      }
      commentsFragment.appendChild(commentElement);
    }

    commentsContainer.appendChild(commentsFragment);
    commentsTotal.textContent = comments.length;
    if(comments.length > 5) {
      loadMoreBtn.classList.remove('hidden');
      loadMoreBtn.addEventListener('click', loadMoreBtnHandler);
    }
    closePopup(cancelButton, bigPicture, clearCommentsContainer);

    function documentEscKeydownHandler (evt) {
      if (isEscEvent(evt)) {
        evt.preventDefault();
        bigPicture.classList.add('hidden');
        body.classList.remove('modal-open');
        clearCommentsContainer();
      }
    }

    function cancelButtonClickHandler () {
      bigPicture.classList.add('hidden');
      body.classList.remove('modal-open');
      clearCommentsContainer();
    }

    cancelButton.addEventListener('click', cancelButtonClickHandler);
    document.addEventListener('keydown', documentEscKeydownHandler);
  }

  pictures.forEach((picture) => {
    picture.addEventListener('click', pictureClickHandler);
  });
});
