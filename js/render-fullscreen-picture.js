import { closePopup } from './utils/close-popup.js';
import { openPopup } from './utils/open-popup.js';

const LIMIT = 5;

const renderFullscreenPicture = (data) => {
  const fullImgElement = document.querySelector('.big-picture');
  const imgElement = document.querySelectorAll('.picture__img');
  const commentCountElement = document.querySelector('.social__comment-count');


  const pictureClickHandler = (event) => {
    event.preventDefault();
    const index = event.target.attributes.index.value;
    const picData = data[index];
    const comments = picData.comments;
    const bigPictureImgElement = document.querySelector('.big-picture__img').children[0];
    const cancelButtonElement = document.querySelector('.big-picture__cancel');
    const descriptionElement = fullImgElement.querySelector('.social__caption');
    const likesCountElement = fullImgElement.querySelector('.likes-count');
    const socialCommentCountElement = document.querySelector('.social__comment-count');
    const commentsCountElement = commentCountElement.querySelector('.comments-count');
    const commentsLoaderButtonElement = document.querySelector('.social__comments-loader');
    let revealedCommentsCount = null;

    const setRevealedCommentsCount = () => {
      const socialComments = document.querySelector('.social__comments');
      revealedCommentsCount = socialComments.querySelectorAll('.revealed').length;
      socialCommentCountElement.childNodes[0].textContent = `${revealedCommentsCount} из `;
    };

    const resetRevealedCommentsCount = () => {
      revealedCommentsCount = 0;
      socialCommentCountElement.childNodes[0].textContent = `${revealedCommentsCount} из `;
    };

    const setCommentsLoaderBtnStatus = () => {
      const socialCommentsElement = document.querySelector('.social__comments');
      const commentElements = socialCommentsElement.querySelectorAll('.true__comment.hidden');
      if(commentElements.length < 1) {
        commentsLoaderButtonElement.classList.add('hidden');
      } else {
        commentsLoaderButtonElement.classList.remove('hidden');
      }
    };

    const revealComments = () => {
      const socialCommentsElement = document.querySelector('.social__comments');
      const commentElements = socialCommentsElement.querySelectorAll('.true__comment.hidden');
      for (let i = 0; i < LIMIT; i++) {
        if (commentElements[i]) {
          commentElements[i].classList.remove('hidden');
          commentElements[i].classList.add('revealed');
        }
      }
      setRevealedCommentsCount();
      setCommentsLoaderBtnStatus();
    };

    const renderComments = (commentaries) => {
      const socialCommentsElement = document.querySelector('.social__comments');
      commentaries.forEach(({id, avatar, message}) => {
        const commentElement = socialCommentsElement.querySelector('.social__comment').cloneNode(true);
        const socialPictureElement = commentElement.querySelector('.social__picture');
        const socialTextElement = commentElement.querySelector('.social__text');
        commentElement.setAttribute('id', id);
        commentElement.classList.add('true__comment');
        socialPictureElement.src = avatar;
        socialTextElement.textContent = message;
        socialCommentsElement.appendChild(commentElement);
      });
      const commentElements = socialCommentsElement.querySelectorAll('.social__comment');
      commentElements.forEach((item) => {
        item.classList.add('hidden');
      });
      revealComments();
    };

    const commentsLoaderBtnClickHandler = () => {
      revealComments();
    };

    const clearCommentsContainer = () => {
      const socialCommentsElement = document.querySelector('.social__comments');
      socialCommentsElement.children[0].classList.add('hidden');
      const commentElements = socialCommentsElement.querySelectorAll('.true__comment');
      commentElements.forEach((item) => {
        socialCommentsElement.removeChild(item);
      });
      const commentsLoaderButtonCloneElement = commentsLoaderButtonElement.cloneNode(true);
      commentsLoaderButtonElement.replaceWith(commentsLoaderButtonCloneElement);
      resetRevealedCommentsCount();
    };

    openPopup(fullImgElement);
    setCommentsLoaderBtnStatus();
    bigPictureImgElement.src = event.target.currentSrc;
    descriptionElement.textContent = picData.description;
    likesCountElement.textContent = picData.likes;
    commentsCountElement.textContent = comments.length;
    renderComments(comments);
    commentsLoaderButtonElement.addEventListener('click', commentsLoaderBtnClickHandler);
    closePopup(cancelButtonElement, fullImgElement, clearCommentsContainer);
  };

  imgElement.forEach((picture) => {
    picture.addEventListener('click', pictureClickHandler);
  });
};

export { renderFullscreenPicture };
