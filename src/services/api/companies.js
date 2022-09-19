import http from "../utils/http";
import config from "../../accessories/config";

const apiEndpoint = config.apiUrl + "/companies";

export async function getCompanyByName(string) {
  return await http.get(`${apiEndpoint}/string/${string}`);
}
