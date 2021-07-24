const getData = async (callback) => {

  fetch('https://23.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((data) => callback(data))
    .catch(() => callback('error'));
};

const sendData = async (data, callback) => {
  fetch(
    'https://23.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body: data,
    },
  ).then((response) => {
    if(response.ok) {
      callback('success');
    } else {
      callback('error');
    }
  })
    .catch(() => callback('error'));
};

export {
  getData,
  sendData
};

