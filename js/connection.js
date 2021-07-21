async function getData (onSuccess, onFail) {

  fetch('https://23.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((pictures) => onSuccess(pictures))
    .catch(() => onFail());
}

async function sendData (data, onSuccess, onFail) {
  fetch(
    'https://23.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body: data,
    },
  ).then((response) => {
    if(response.ok) {
      onSuccess();
    } else {
      onFail();
    }
  })
    .catch(() => onFail());
}

export {
  getData,
  sendData
};

