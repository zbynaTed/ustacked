import http from "../utils/http";
import config from "../../accessories/config";

const apiEndpoint = config.apiUrl + "/holdings";

export async function getCurrentHoldings(userId) {
  return await http.get(`${apiEndpoint}/user/${userId}/current`);
}

export async function getHoldingsHistory(userId) {
  return await http.get(`${apiEndpoint}/user/${userId}/history`);
}
