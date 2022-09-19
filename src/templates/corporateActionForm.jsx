import Joi from "joi";

import { getStockBySymbol } from "../services/api/stocks";

export default function corporateActionFormCompomentsTemplate(
  caTypes,
  type,
  setType,
  stock,
  setStock,
  effectiveDate,
  setEffectiveDate,
  recordDate,
  setRecordDate,
  numerator,
  setNumerator,
  denominator,
  setDenominator,
  oldSymbol,
  setOldSymbol,
  newSymbol,
  setNewSymbol,
  amount,
  setAmount
  // spunCompany,
  // setSpunCompany
) {
  const validateStock = async (symbol) => {
    const schema = Joi.object({
      symbol: Joi.string().max(10).required(),
    });
    const { error } = schema.validate({ symbol });

    if (error) {
      return { error: error.details[0].message };
    }

    if (symbol) {
      let { data: stockData } = await getStockBySymbol(symbol);

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

  const validateEffectiveDate = (date) => {
    const schema = Joi.object({
      date: Joi.date().required(),
    });
    const { error } = schema.validate({ date });
    if (error) {
      return { error: error.details[0].message };
    }
  };

  const validateRecordDate = (date) => {
    const schema = Joi.object({
      date: Joi.date().required(),
    });
    const { error } = schema.validate({ date });
    if (error) {
      return { error: error.details[0].message };
    }
  };

  const validateNumerator = (numerator) => {
    const schema = Joi.object({
      numerator: Joi.number().min(1).integer().required(),
    });
    const { error } = schema.validate({ numerator });
    if (error) {
      return { error: error.details[0].message };
    }
  };

  const validateDenominator = (denominator) => {
    const schema = Joi.object({
      denominator: Joi.number().min(1).integer().required(),
    });
    const { error } = schema.validate({ denominator });
    if (error) {
      return { error: error.details[0].message };
    }
  };

  const validateAmount = (amount) => {
    const schema = Joi.object({
      amount: Joi.number().required(),
    });
    const { error } = schema.validate({ amount });
    if (error) {
      return { error: error.details[0].message };
    }
  };

  // const validateSpunCompany = async (companyName) => {
  //   const schema = Joi.object({
  //     amount: Joi.string().max(255).required(),
  //   });
  //   const { error } = schema.validate({ companyName });

  //   if (error) {
  //     return { error: error.details[0].message };
  //   }

  //   if (companyName) {
  //     let { data: companiesData } = await getCompanyByName(companyName);

  //     if (companiesData.length !== 0) {
  //       return {
  //         error: null,
  //         dataArr: companiesData,
  //       };
  //     }
  //     return { error: "symbol does not exist" };
  //   }
  // };

  const dependencies = {
    1: ["ca-symbol", "ca-effective-date", "ca-numerator", "ca-denominator"],
    2: ["ca-symbol", "ca-effective-date", "ca-old-symbol", "ca-new-symbol"],
    3: ["ca-symbol", "ca-effective-date", "ca-amount"],
    // 4: [
    //   "ca-symbol",
    //   "ca-effective-date",
    //   "ca-numerator",
    //   "ca-denominator",
    //   "ca-spun-company",
    // ],
  };

  return [
    {
      id: "ca-type",
      name: "type",
      type: "select",
      value: type,
      setValue: setType,
      options: caTypes,
      dependencies,
    },
    {
      id: "ca-symbol",
      name: "stock",
      type: "text",
      value: stock,
      setValue: setStock,
      upperCase: true,
      validation: validateStock,
    },
    {
      id: "ca-effective-date",
      name: "effective date",
      type: "date",
      value: effectiveDate,
      setValue: setEffectiveDate,
      validation: validateEffectiveDate,
    },
    {
      id: "ca-record-date",
      name: "record date",
      type: "date",
      value: recordDate,
      setValue: setRecordDate,
      validation: validateRecordDate,
    },
    {
      id: "ca-numerator",
      name: "numerator",
      type: "text",
      value: numerator,
      setValue: setNumerator,
      validation: validateNumerator,
    },
    {
      id: "ca-denominator",
      name: "denominator",
      type: "text",
      value: denominator,
      setValue: setDenominator,
      validation: validateDenominator,
    },
    {
      id: "ca-amount",
      name: "amount",
      type: "text",
      value: amount,
      setValue: setAmount,
      validation: validateAmount,
    },
    {
      id: "ca-old-symbol",
      name: "old symbol",
      type: "text",
      value: oldSymbol,
      setValue: setOldSymbol,
      upperCase: true,
    },
    {
      id: "ca-new-symbol",
      name: "new symbol",
      type: "text",
      value: newSymbol,
      setValue: setNewSymbol,
      upperCase: true,
    },
    // {
    //   id: "ca-spun-company",
    //   name: "spun company",
    //   type: "text",
    //   value: spunCompany,
    //   setValue: setSpunCompany,
    //   validation: validateSpunCompany,
    // },
  ];
}
