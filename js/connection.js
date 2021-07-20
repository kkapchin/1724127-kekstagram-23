async function getData () {
  const response = await fetch('https://23.javascript.pages.academy/kekstagram/data');

  if(!response.ok) {
    throw new Error(`Error ${'https://23.javascript.pages.academy/kekstagram/data'}, status ${response.status}`);
  }

  return await response.json();
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

