const handleError = (res) => {
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
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
      .then(handleError);
  }


  changeUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(
        data
      )
    })
      .then(handleError);
  }

  changeAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
      .then(handleError);
  }

  getCardsFromServer() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
      .then(handleError);
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
      .then(handleError);
  }

  removeCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(handleError);
  }

  putLike(id) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: 'PUT',
      headers: this._headers
    })
      .then(handleError);
  }

  deleteLike(id) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(handleError);
  }

  getAppInfo() {
    return Promise.all([this.getUserInfo(), this.getCardsFromServer()]);
  }
}