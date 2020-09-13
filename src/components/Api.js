const onError = (res) => {
  if (res.ok) {

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
      .then(onError);
  }

  addNewCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,

      body: JSON.stringify({
        name: name,
        link: link
      })

    })
      .then(onError);
  }

  removeCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(onError);
  }

  putLike(id) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: 'PUT',
      headers: this._headers
    })
      .then(onError);
  }

  deleteLike(id) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(onError);
  }

  getAllNeededData() {
    return Promise.all([this.getUserInfo(), this.getCardsFromServer()]);
  }

}