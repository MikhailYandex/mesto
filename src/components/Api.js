export default class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`${res.status}: ${res.statusText}`);
  }

  async getUserInfo() {
    const res = await fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
    });
    return this._checkResponse(res);
  }

  async getCards() {
    const res = await fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers,
    });
    return this._checkResponse(res);
  }

  async editUserInfo(newName, newAbout) {
    const res = await fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: newName,
        about: newAbout,
      }),
    });
    return this._checkResponse(res);
  }

  async addCard(data) {
    const res = await fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    });
    return this._checkResponse(res);
  }

  async removeCard(cardId) {
    const res = await fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
    return this._checkResponse(res);
  }

  async addLike(cardId) {
    const res = await fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    });
    return this._checkResponse(res);
  }

  async removeLike(cardId) {
    const res = await fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    });
    return this._checkResponse(res);
  }

  async editUserAvatar(data) {
    const res = await fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    });
    return this._checkResponse(res);
  }
}
