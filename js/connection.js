const url = 'https://23.javascript.pages.academy/kekstagram/data';

function getPhotos (onSuccess) {
  fetch(url)
    .then((response) => response.json())
    .then((photos) => {
      onSuccess(photos);
    });
}

export { getPhotos };
