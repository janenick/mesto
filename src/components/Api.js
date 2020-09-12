const onError = (res) => {
  if (res.ok) {
    console.log(`Удачный запрос fentch`);
    return res.json();
  }
  else {
    console.log(`Неудачный запрос fentch`);
    return Promise.reject(res.status);
  }
}

export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }


  getUserInfo() {
    return fetch(this._baseUrl + '/users/me', {
      headers: this._headers
    })

      .then(onError);
  }


  changeUserInfo(data) {

    return fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      headers: this._headers,

      body: JSON.stringify({
        name: data.name,
        about: data.info
      })
    })
      .then(onError);
  }

  changeAvatar(data) {
    return fetch(this._baseUrl + '/users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,

      body: JSON.stringify({
        avatar: data.avatar
      })
    })
      .then(onError);
  }

  getCardsFromServer() {
    return fetch(this._baseUrl + '/cards', {
      headers: this._headers

    })
      .then(res => {
        if (res.ok) {
          console.log("Запрос карточек ок");
          return res.json();
        }
        else {
          console.log("Запрос карточек не прошел");
          return Promise.reject(res.status);
        }
      });
  }

  getAllNeededData() {
    return Promise.all([this.getUserInfo(), this.getCardsFromServer()]);
  }
}