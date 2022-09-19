import { getStockBySymbol } from "../../services/api/stocks";

const validateStockForDuplicity = async (symbol) => {
  const { data: result } = await getStockBySymbol(symbol);
  if (result.length !== 0) return false;
  return true;
};

const validateStockForExistence = async (symbol) => {
  const { data: result } = await getStockBySymbol(symbol);
  if (result.length !== 0) return true;
  return false;
};

const stockValidations = {
  validateStockForDuplicity,
  validateStockForExistence,
};
export default stockValidations;
