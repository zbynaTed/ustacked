import http from "../utils/http";
import config from "../../accessories/config";

const apiEndpoint = config.apiUrl + "/ca";

export async function createCorporateAction(data) {
  return await http.post(apiEndpoint, data);
}

export async function getAllCorporateActions() {
  return await http.get(apiEndpoint);
}

export async function getCorporateActionTypes() {
  return await http.get(`${apiEndpoint}/types`);
}

export async function getUserCorporateActions(userId) {
  return await http.get(`${apiEndpoint}/user/${userId}`);
}

export async function editCorporateAction(id, data) {
  return await http.patch(`${apiEndpoint}/${id}`, data);
}

export async function deleteCorporateAction(id) {
  return await http.delete(`${apiEndpoint}/${id}`);
}
