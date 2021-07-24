import { closePopup } from './utils/close-popup.js';
import { openPopup } from './utils/open-popup.js';


const renderFullscreenPicture = (data) => {
  const fullImg = document.querySelector('.big-picture');
  const img = document.querySelectorAll('.picture__img');
  const commentCount = document.querySelector('.social__comment-count');


  const pictureClickHandler = (event) => {
    event.preventDefault();
    const index = event.target.attributes.index.value;
    const picData = data[index];
    const comments = picData.comments;
    const bigPictureImgElement = document.querySelector('.big-picture__img').children[0];
    const cancelButton = document.querySelector('.big-picture__cancel');
    const description = fullImg.querySelector('.social__caption');
    const likesCount = fullImg.querySelector('.likes-count');
    const socialCommentCount = document.querySelector('.social__comment-count');
    const commentsCount = commentCount.querySelector('.comments-count');
    const commentsLoaderBtn = document.querySelector('.social__comments-loader');
    let revealedCommentsCount = null;

    const setRevealedCommentsCount = () => {
      const socialComments = document.querySelector('.social__comments');
      revealedCommentsCount = socialComments.querySelectorAll('.revealed').length;
      socialCommentCount.childNodes[0].textContent = `${revealedCommentsCount} из `;
    };

    const resetRevealedCommentsCount = () => {
      revealedCommentsCount = 0;
      socialCommentCount.childNodes[0].textContent = `${revealedCommentsCount} из `;
    };

    const setCommentsLoaderBtnStatus = () => {
      const socialComments = document.querySelector('.social__comments');
      const commentItems = socialComments.querySelectorAll('.true__comment.hidden');
      if(commentItems.length < 1) {
        commentsLoaderBtn.classList.add('hidden');
      } else {
        commentsLoaderBtn.classList.remove('hidden');
      }
    };

    const revealComments = () => {
      const LIMIT = 5;
      const socialComments = document.querySelector('.social__comments');
      const commentItems = socialComments.querySelectorAll('.true__comment.hidden');
      for (let i = 0; i < LIMIT; i++) {
        if (commentItems[i]) {
          commentItems[i].classList.remove('hidden');
          commentItems[i].classList.add('revealed');
        }
      }
      setRevealedCommentsCount();
      setCommentsLoaderBtnStatus();
    };

    const renderComments = (commentaries) => {
      const socialComments = document.querySelector('.social__comments');
      commentaries.forEach(({id, avatar, message}) => {
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
    };

    const commentsLoaderBtnClickHandler = () => {
      revealComments();
    };

    const clearCommentsContainer = () => {
      const socialComments = document.querySelector('.social__comments');
      socialComments.children[0].classList.add('hidden');
      const commentItems = socialComments.querySelectorAll('.true__comment');
      commentItems.forEach((item) => {
        socialComments.removeChild(item);
      });
      const commentsLoaderBtnClone = commentsLoaderBtn.cloneNode(true);
      commentsLoaderBtn.replaceWith(commentsLoaderBtnClone);
      resetRevealedCommentsCount();
    };

    openPopup(fullImg);
    setCommentsLoaderBtnStatus();
    bigPictureImgElement.src = event.target.currentSrc;
    description.textContent = picData.description;
    likesCount.textContent = picData.likes;
    commentsCount.textContent = comments.length;
    renderComments(comments);
    commentsLoaderBtn.addEventListener('click', commentsLoaderBtnClickHandler);
    closePopup(cancelButton, fullImg, clearCommentsContainer);
  };

  img.forEach((picture) => {
    picture.addEventListener('click', pictureClickHandler);
  });
};

export { renderFullscreenPicture };
