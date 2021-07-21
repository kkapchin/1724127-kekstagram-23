async function getData (onFail) {

  const response = await fetch('https://23.javascript.pages.academy/kekstagram/data');
  if(!response.ok) {
    onFail();
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

