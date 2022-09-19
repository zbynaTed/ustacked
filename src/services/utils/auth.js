import jwtDecode from "jwt-decode";

import http from "../utils/http";

const tokenKey = "token";

http.setJwt(getJwt());

function register(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

function login(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

function logout() {
  localStorage.removeItem(tokenKey);
}

function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

function getJwt() {
  return localStorage.getItem(tokenKey);
}

const auth = {
  register,
  login,
  logout,
  getCurrentUser,
  getJwt,
};

export default auth;
