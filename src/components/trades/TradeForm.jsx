import React, { useState } from "react";

import auth from "../../services/utils/auth";
import Label from "../common/form/Label";
import Input from "../common/form/Input";
import Select from "../common/form/Select";
import tradeFormCompomentsTemplate from "../../templates/tradeForm";
import { getStockBySymbol } from "../../services/api/stocks";

import dateFormats from "../../accessories/formats/dates";

function TradeForm({ trade, btnLabel, actionType, onCreate, onEdit }) {
  const [stock, setStock] = useState({
    value: trade ? trade.symbol : "",
    error: trade ? false : true,
  });
  const [quantity, setQuantity] = useState({
    value: trade ? trade.quantity : "",
    error: trade ? false : true,
  });
  const [price, setPrice] = useState({
    value: trade ? trade.price : "",
    error: trade ? false : true,
  });
  const [fee, setFee] = useState({
    value: trade && trade ? trade.fee : "",
    error: trade ? false : true,
  });
  const [type, setType] = useState({
    value: trade ? trade.buy : true,
    error: false,
  });
  const [date, setDate] = useState({
    value: trade ? dateFormats.formDateFormat(trade.tradeDate) : "",
    error: trade ? false : true,
  });

  const successfulValidation = () => {
    const compoments = [stock, quantity, price, fee, type, date];
    return compoments.every((c) => c.error === false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit has been called on tradeForm");
    const { id: userId } = auth.getCurrentUser();
    console.log("tohle chci posilat jako symbol: ", stock.value);

    const { data: stockData } = await getStockBySymbol(stock.value);
    console.log("toto jsem dostal: ", stockData);
    const stockId = parseInt(stockData[0].id);

    let newTrade = {
      userId,
      stockId,
      quantity: quantity.value,
      price: price.value,
      fee: fee.value,
      buy: type.value,
      tradeDate: date.value,
    };

    if (actionType === "createTrade") {
      console.log("creating new trade: ", newTrade);
      await onCreate(newTrade);
      
      const modal = document.getElementById(`addTrade`);
      modal.style.display = "none";
    } else if (actionType === "editTrade") {
      await onEdit(trade.id, newTrade);

      const modal = document.getElementById(`editTrade-${trade.id}`);
      modal.style.display = "none";
    }
  };

  const tradeFormCompoments = tradeFormCompomentsTemplate(
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
  );

  return (
    <div className="modal-form-container">
      <form onSubmit={handleSubmit} action="" className="modal-form-body">
        {tradeFormCompoments.map((c) => (
          <React.Fragment key={`${c.id}`}>
            <Label htmlFor={c.id} value={c.name} />
            {c.type === "select" ? (
              <Select
                name={c.name}
                id={c.id}
                value={c.value}
                setValue={c.setValue}
                options={c.options}
              />
            ) : (
              <Input
                type={c.type}
                name={c.name}
                id={c.id}
                value={c.value}
                setValue={c.setValue}
                upperCaseInput={c.upperCase}
                validateInput={c.validation}
              />
            )}
            {c.value.error && (
              <p className="form-error-message">{c.value.error}</p>
            )}
          </React.Fragment>
        ))}
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

export default TradeForm;
