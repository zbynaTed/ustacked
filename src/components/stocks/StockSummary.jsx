import React from "react";

function StockSummary({ stock }) {
  return (
    <div className="modal-summary">
      <p className="bold">
        {`Ticker symbol ${stock.symbol} of company ${stock.name}.`}
      </p>
    </div>
  );
}

export default StockSummary;
