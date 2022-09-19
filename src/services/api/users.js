import http from "../utils/http";
import config from "../../accessories/config";

const apiEndpoint = config.apiUrl + "/users";

export async function registerUser(user) {
  return await http.post(apiEndpoint, user);
}

export async function editUser(id, data) {
  return await http.patch(`${apiEndpoint}/id/${id}`, data);
}

export async function getUserDetails(id) {
  return await http.get(`${apiEndpoint}/id/${id}`);
}

export async function getUsers() {
  return await http.get(apiEndpoint);
}

export async function getUserByUsername(username) {
  return await http.get(`${apiEndpoint}/usernames/${username}`);
}

export async function getUserFees(id) {
  return await http.get(`${apiEndpoint}/${id}/fees`);
}
