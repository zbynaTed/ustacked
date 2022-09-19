import React from "react";

import dateFormats from "../../accessories/formats/dates";

function TradeSummary({ trade }) {
  return (
    <div className="modal-summary">
      <p className="bold">
        {`${trade.buy ? "Buy" : "Sell"} of ${
          trade.symbol
        } from ${dateFormats.summaryDateFormat(trade.tradeDate)}.`}
      </p>
      <ul>
        <li>
          {`original quantity: ${trade.quantity} ${
            trade.quantity === 1 ? "share" : "shares"
          }`}
        </li>
        <li>original price per share: {`$${trade.price}`}</li>
      </ul>
    </div>
  );
}

export default TradeSummary;
