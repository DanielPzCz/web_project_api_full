const API_URL = "https://around-api.es.tripleten-services.com/v1";
const API_TOKEN = "b807b23d-7b3a-4447-befc-7873398bb520";

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _getHeaders() {
    return { ...this._headers };
  }

  _checkResponse(response) {
    if (!response.ok) {
      return Promise.reject(`Error ${response.status}`);
    }
    return response.json().then((payload) => {
      const isWrapped =
        payload !== null &&
        typeof payload === "object" &&
        !Array.isArray(payload) &&
        Object.keys(payload).length === 1 &&
        "data" in payload;
      return isWrapped ? payload.data : payload;
    });
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._getHeaders(),
    }).then(this._checkResponse);
  }

  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._getHeaders(),
    }).then(this._checkResponse);
  }

  editUserInfo(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({ name: name, about: about }),
    }).then(this._checkResponse);
  }

  editAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({ avatar: avatar }),
    }).then(this._checkResponse);
  }

  addCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._getHeaders(),
      body: JSON.stringify({ name: name, link: link }),
    }).then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._getHeaders(),
    }).then(this._checkResponse);
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: this._getHeaders(),
    }).then(this._checkResponse);
  }
}

const api = new Api({
  baseUrl: API_URL,
  headers: {
    authorization: API_TOKEN,
    "Content-Type": "application/json",
  },
});

export default api;
