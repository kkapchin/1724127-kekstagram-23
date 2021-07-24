const getData = async (success, fail) => {

  fetch('https://23.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((data) => success(data))
    .catch(() => fail());
};

const sendData = async (data, success, fail) => {
  fetch(
    'https://23.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body: data,
    },
  ).then((response) => {
    if(response.ok) {
      success();
    } else {
      fail();
    }
  })
    .catch(() => fail());
};

export {
  getData,
  sendData
};

