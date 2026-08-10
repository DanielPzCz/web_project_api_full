const API_URL = "https://around-api.es.tripleten-services.com/v1";

// Token de grupo del proyecto 14.
//
// El brief pide enviar el JWT del usuario como `Authorization: Bearer {token}`,
// pero esta API no admite ese esquema. Probado contra GET /cards:
//
//   authorization: <token de grupo>           -> 200 OK
//   authorization: Bearer <token de grupo>    -> 403 Forbidden
//   authorization: Bearer <JWT del usuario>   -> 403 Forbidden
//
// Es decir, rechaza tanto el JWT (lo emite se-register-api, otro servicio que
// no comparte la clave de firma) como el propio prefijo `Bearer`. Solo acepta
// el token de grupo en crudo.
//
// El esquema Bearer sí está implementado contra el servidor que lo entiende,
// en checkToken() de auth.js. En el sprint 18, cuando la funcionalidad
// principal pase a mi backend de Express, este encabezado se sustituye por el
// JWT y las dos APIs quedan unificadas.
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
