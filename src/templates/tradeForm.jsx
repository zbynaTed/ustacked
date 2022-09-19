import Joi from "joi";

import tradeTypes from "../accessories/constants/tradeTypes";
import { getStockBySymbol } from "../services/api/stocks";

export default function tradeFormCompomentsTemplate(
  stock,
  setStock,
  quantity,
  setQuantity,
  price,
  setPrice,
  fee,
  setFee,
  type,
  setType,
  date,
  setDate
) {
  const validateSymbol = async (symbol) => {
    const schema = Joi.object({
      symbol: Joi.string().max(10).required(),
    });
    const { error } = schema.validate({ symbol });

    if (error) {
      return { error: error.details[0].message };
    }
    console.log("tradeForm validator delivers as symbol this: ", symbol);
    let { data: stockData } = await getStockBySymbol(symbol);
    console.log("tradeForm validator received: ", stockData);

    if (symbol) {
      if (stockData.length !== 0) {
        stock = stockData[0];
        return {
          error: null,
          data: { id: stock.id, companyId: stock.companyId },
        };
      }
      return { error: "symbol does not exist" };
    }
  };

  const validateQuantity = (quantity) => {
    const schema = Joi.object({
      quantity: Joi.number().min(1).max(99999).integer().required(),
    });
    const { error } = schema.validate({ quantity });
    if (error) {
      return { error: error.details[0].message };
    }
  };

  const validatePrice = (price) => {
    const schema = Joi.object({
      price: Joi.number().min(0.0001).max(999999.9999).required(),
    });
    const { error } = schema.validate({ price });
    if (error) {
      return { error: error.details[0].message };
    }
  };

  const validateFee = (fee) => {
    const schema = Joi.object({
      fee: Joi.number().required(),
    });
    const { error } = schema.validate({ fee });
    if (error) {
      return { error: error.details[0].message };
    }
  };

  const validateDate = (date) => {
    const schema = Joi.object({
      date: Joi.date().required(),
    });
    const { error } = schema.validate({ date });
    if (error) {
      return { error: error.details[0].message };
    }
  };

  return [
    {
      id: "trade-symbol",
      name: "symbol",
      type: "text",
      value: stock,
      setValue: setStock,
      upperCase: true,
      validation: validateSymbol,
    },
    {
      id: "trade-quantity",
      name: "quantity",
      type: "text",
      value: quantity,
      setValue: setQuantity,
      validation: validateQuantity,
    },
    {
      id: "trade-price",
      name: "price",
      type: "text",
      value: price,
      setValue: setPrice,
      validation: validatePrice,
    },
    {
      id: "trade-fee",
      name: "fee",
      type: "text",
      value: fee,
      setValue: setFee,
      validation: validateFee,
    },
    {
      id: "trade-type",
      name: "type",
      type: "select",
      value: type,
      setValue: setType,
      options: tradeTypes.slice(1, 3),
    },
    {
      id: "trade-date",
      name: "date",
      type: "date",
      value: date,
      setValue: setDate,
      validation: validateDate,
    },
  ];
}
