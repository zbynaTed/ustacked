import React from "react";

import { deleteTradeWarningText } from "../../accessories/texts/warnings";
import TradeSummary from "./TradeSummary";

function DeleteTrade({ trade, onDelete }) {
  return (
    <React.Fragment>
      {deleteTradeWarningText}
      <TradeSummary trade={trade} />
      <div>
        <button className="btn btn-submit" onClick={() => onDelete(trade.id)}>
          Delete
        </button>
      </div>
    </React.Fragment>
  );
}

export default DeleteTrade;
