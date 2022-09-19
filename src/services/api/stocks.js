import http from "../utils/http";
import config from "../../accessories/config";

const apiEndpoint = config.apiUrl + "/stocks";

export async function createStock(stock) {
  stock.publiclyTraded = stock.symbol ? true : false;
  return await http.post(apiEndpoint, stock);
}

export async function getStocks() {
  return await http.get(apiEndpoint);
}

export async function getSymbols() {
  return await http.get(`${apiEndpoint}/symbols`);
}

export async function getStockBySymbol(symbol) {
  return await http.get(`${apiEndpoint}/symbols/symbol/${symbol}`);
}

export async function editStock(stock) {
  const { id } = stock;
  return await http.patch(`${apiEndpoint}/${id}`, stock);
}

export async function deleteStock(id) {
  return await http.delete(`${apiEndpoint}/${id}`);
}
