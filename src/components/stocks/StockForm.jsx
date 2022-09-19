import React, { useState } from "react";
import Joi from "joi";

import Input from "../common/form/Input";
import Label from "../common/form/Label";

import stockValidations from "../../accessories/asyncValidations/validateSymbol";

function StockForm({ stock, btnLabel, actionType, onCreate, onEdit }) {
  const [id, setId] = useState({
    value: stock ? stock.id : "",
  });
  const [name, setName] = useState({
    value: stock ? stock.name : "",
    error: stock ? false : true,
  });
  const [symbol, setSymbol] = useState({
    value: stock ? stock.symbol : "",
    error: stock ? false : true,
  });
  const [companyId, setCompanyId] = useState({
    value: stock ? stock.companyId : "",
  });

  const successfulValidation = () => {
    const compoments = [name, symbol];
    return compoments.every((c) => c.error === false);
  };

  const actions = [
    { name: "add", action: onCreate },
    { name: "edit", action: onEdit },
  ];

  const handleSubmit = () => {
    const stock = {
      id: id.value,
      name: name.value,
      symbol: symbol.value,
      companyId: companyId.value,
    };
    const actionVariant = actions.filter((a) => a.name === actionType)[0];
    actionVariant.action(stock);
  };

  const validateSymbol = async (symbol) => {
    const schema = Joi.object({
      symbol: Joi.string().max(10).required(),
    });
    let { error } = schema.validate({ symbol });

    if (error) {
      return error.details[0].message;
    }

    if (symbol) {
      return (await stockValidations.validateStockForDuplicity(symbol))
        ? undefined
        : "symbol already exists";
    }
  };

  const validateName = (name) => {
    const schema = Joi.object({
      name: Joi.string().min(5).max(50).required(),
    });
    const { error } = schema.validate({ name });
    if (error) {
      return error.details[0].message;
    }
  };

  return (
    <div className="modal-form-container">
      <form onSubmit={handleSubmit} action="" className="modal-form-body">
        <Label htmlFor="stock-name" value="company name" />
        <Input
          id="stock-name"
          name="name"
          type="text"
          value={name}
          setValue={setName}
          validateInput={validateName}
        />
        {name.error && <p className="form-error-message">{name.error}</p>}
        <Label htmlFor="stock-symbol" value="symbol" />
        <Input
          id="stock-symbol"
          name="symbol"
          type="text"
          value={symbol}
          setValue={setSymbol}
          upperCaseInput={true}
          validateInput={validateSymbol}
        />
        {symbol.error && <p className="form-error-message">{symbol.error}</p>}
        <button
          className="btn btn-submit"
          disabled={successfulValidation() ? "" : "disabled"}
          type="submit"
        >
          {btnLabel}
        </button>
      </form>
    </div>
  );
}

export default StockForm;
