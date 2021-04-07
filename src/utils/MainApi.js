import CurrentUserContext from "../context/CurrentUserContext";

const checkResponse = (res) => (res.ok ? res.json() : Promise.reject(`Error: ${res.status}`));

class MainApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  register(name, email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })
      .then(checkResponse)
      .then((res) => res);
  }

  authorization(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: { ...this._headers },
      body: JSON.stringify({ email, password }),
    })
      .then(checkResponse)
      .then((res) => res);
  }

  getContent() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: { ...this._headers, authorization: `Bearer ${localStorage.getItem("jwt")}` },
    })
      .then(checkResponse)
      .then((res) => res);
  }
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: { ...this._headers, authorization: `Bearer ${localStorage.getItem("jwt")}` },
    })
      .then(checkResponse)
      .then((res) => res);
  }

  setUserInfo(email, name) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: { ...this._headers, authorization: `Bearer ${localStorage.getItem("jwt")}` },
      body: JSON.stringify({
        email,
        name,
      }),
    })
      .then(checkResponse)
      .then((res) => res);
  }
}

const mainApi = new MainApi({
  baseUrl: "https://api.movies.lobachev.students.nomoredomains.icu",
  headers: {
    "Content-Type": "application/json",
  },
});

export default mainApi;
