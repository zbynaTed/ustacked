import React from "react";

import tradeTypes from "../../accessories/constants/tradeTypes";

function TradeTypeSelection({ selectedTradeType, onRadioButtonChange }) {
  return (
    <div className="radios-horizontal-container">
      {tradeTypes.map((t) => (
        <label
          key={t.id}
          htmlFor={`trade-type-${t.id}`}
          className="radio-label"
        >
          {t.id === 0 ? t.title.toLowerCase() : `${t.title.toLowerCase()}s`}
          <input
            type="radio"
            key={t.id}
            id={`trade-type-${t.id}`}
            name="trade-type"
            value={selectedTradeType}
            checked={selectedTradeType === t.id}
            onChange={() => onRadioButtonChange(t.id)}
          />
          <span className="checkmark"></span>
        </label>
      ))}
    </div>
  );
}

export default TradeTypeSelection;
