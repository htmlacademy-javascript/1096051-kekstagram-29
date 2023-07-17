const BASE_URL = 'https://29.javascript.pages.academy/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/'
};
const Method = {
  GET: 'GET',
  POST: 'POST'
};
const ErrorMessage = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз'
};

const load = (url, errorMessage, method = Method.GET, body = null) => fetch(url, {method, body})
  .then((response) => {
    if (!response.ok) {
      throw new Error ();
    }
    return response.json();
  })
  .catch(() => {
    throw new Error(errorMessage);
  });


const getData = () => load(`${BASE_URL}${Route.GET_DATA}`, ErrorMessage.GET_DATA);

const sendData = (body) => load(`${BASE_URL}${Route.SEND_DATA}`, ErrorMessage.GET_DATA, Method.POST, body);

export {getData, sendData};
