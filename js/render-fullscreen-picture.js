import { closePopup } from './utils/close-popup.js';
//import { deleteEventListener } from './utils/delete-event-listener.js';
//import { isEscEvent } from './utils/is-escape-event.js';
import { openPopup } from './utils/open-popup.js';


function renderFullscreenPicture (data) {
  const bigPicture = document.querySelector('.big-picture');
  const imgElements = document.querySelectorAll('.picture__img');
  const commentCount = document.querySelector('.social__comment-count');


  function pictureClickHandler (event) {
    event.preventDefault();
    const index = event.target.attributes.index.value;
    const picData = data[index];
    const comments = picData.comments;
    const bigPictureImgElement = document.querySelector('.big-picture__img').children[0];
    const cancelButton = document.querySelector('.big-picture__cancel');
    const description = bigPicture.querySelector('.social__caption');
    const likesCount = bigPicture.querySelector('.likes-count');
    const socialCommentCount = document.querySelector('.social__comment-count');
    const commentsCount = commentCount.querySelector('.comments-count');
    const commentsLoaderBtn = document.querySelector('.social__comments-loader');
    let revealedCommentsCount = null;

    function setRevealedCommentsCount () {
      const socialComments = document.querySelector('.social__comments');
      revealedCommentsCount = socialComments.querySelectorAll('.revealed').length;
      socialCommentCount.childNodes[0].textContent = `${revealedCommentsCount} из `;
    }

    function resetRevealedCommentsCount () {
      revealedCommentsCount = 0;
      socialCommentCount.childNodes[0].textContent = `${revealedCommentsCount} из `;
    }

    function setCommentsLoaderBtnStatus () {
      const socialComments = document.querySelector('.social__comments');
      const commentItems = socialComments.querySelectorAll('.true__comment.hidden');
      if(commentItems.length < 1) {
        commentsLoaderBtn.classList.add('hidden');
      } else {
        commentsLoaderBtn.classList.remove('hidden');
      }
    }
    function revealComments () {
      const socialComments = document.querySelector('.social__comments');
      const commentItems = socialComments.querySelectorAll('.true__comment.hidden');
      for (let i = 0; i < 5; i++) {
        if (commentItems[i]) {
          commentItems[i].classList.remove('hidden');
          commentItems[i].classList.add('revealed');
        }
      }
      setRevealedCommentsCount();
      setCommentsLoaderBtnStatus();
    }

    function renderComments (commentsArray) {
      const socialComments = document.querySelector('.social__comments');
      commentsArray.forEach(({id, avatar, message}) => {
        const commentElement = socialComments.querySelector('.social__comment').cloneNode(true);
        const socialPicture = commentElement.querySelector('.social__picture');
        const socialText = commentElement.querySelector('.social__text');
        commentElement.setAttribute('id', id);
        commentElement.classList.add('true__comment');
        socialPicture.src = avatar;
        socialText.textContent = message;
        socialComments.appendChild(commentElement);
      });
      const commentItems = socialComments.querySelectorAll('.social__comment');
      commentItems.forEach((item) => {
        item.classList.add('hidden');
      });
      revealComments();
    }

    function commentsLoaderBtnClickHandler () {
      revealComments();
    }

    function clearCommentsContainer () {
      const socialComments = document.querySelector('.social__comments');
      socialComments.children[0].classList.add('hidden');
      const commentItems = socialComments.querySelectorAll('.true__comment');
      commentItems.forEach((item) => {
        socialComments.removeChild(item);
      });
      const commentsLoaderBtnClone = commentsLoaderBtn.cloneNode(true);
      commentsLoaderBtn.replaceWith(commentsLoaderBtnClone);
      resetRevealedCommentsCount();
    }

    openPopup(bigPicture);
    setCommentsLoaderBtnStatus();
    bigPictureImgElement.src = event.target.currentSrc;
    description.textContent = picData.description;
    likesCount.textContent = picData.likes;
    commentsCount.textContent = comments.length;
    renderComments(comments);
    commentsLoaderBtn.addEventListener('click', commentsLoaderBtnClickHandler);
    closePopup(cancelButton, bigPicture, clearCommentsContainer);
  }

  imgElements.forEach((picture) => {
    picture.addEventListener('click', pictureClickHandler);
  });
}

export { renderFullscreenPicture };
