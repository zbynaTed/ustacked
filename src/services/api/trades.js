import http from "../utils/http";
import config from "../../accessories/config";

const apiEndpoint = config.apiUrl + "/trades";

export async function createTrade(data) {
  console.log("calling api with data: ", data);
  return await http.post(apiEndpoint, data);
}

export async function getTrades(userId) {
  return await http.get(`${apiEndpoint}/user/${userId}`);
}

export async function editTrade(id, data) {
  return await http.patch(`${apiEndpoint}/${id}`, data);
}

export async function deleteTrade(id) {
  return await http.delete(`${apiEndpoint}/${id}`);
}
