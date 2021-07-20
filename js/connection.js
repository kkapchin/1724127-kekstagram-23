const url = 'https://23.javascript.pages.academy/kekstagram/data';

function getPhotos (onSuccess) {
  fetch(url)
    .then((response) => response.json())
    .then((photos) => {
      onSuccess(photos);
    });
}

function sendPhoto (body, onSuccess, onFail) {
  fetch(
    'https://23.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      headers: {
        /* 'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*', */
      },
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    });
}

export {
  getPhotos,
  sendPhoto
};
