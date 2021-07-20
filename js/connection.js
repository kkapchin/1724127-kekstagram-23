/* function getPhotos (onSuccess) {
  fetch(dataUrl)
    .then((response) => response.json())
    .then((photos) => {
      onSuccess(photos);
    });
} */

/* function sendPhoto (onSuccess, onFail, body) {
  fetch(
    'https://23.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      headers: {
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
} */

async function getData () {
  const response = await fetch('https://23.javascript.pages.academy/kekstagram/data');
  if(!response) {
    throw new Error(`Error ${'https://23.javascript.pages.academy/kekstagram/data'}, status ${response.status}`);
  }
  return await response.json();
}

export {
  getData
  //sendData,
};
