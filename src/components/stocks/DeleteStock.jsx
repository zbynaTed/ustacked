import React from "react";

import { deleteStockWarningText } from "../../accessories/texts/warnings";
import StockSummary from "./StockSummary";

function DeleteStock({ stock, onDelete }) {
  return (
    <React.Fragment>
      {deleteStockWarningText}
      <StockSummary stock={stock} />
      <div>
        <button className="btn btn-submit" onClick={() => onDelete(stock.id)}>
          Delete
        </button>
      </div>
    </React.Fragment>
  );
}

export default DeleteStock;
