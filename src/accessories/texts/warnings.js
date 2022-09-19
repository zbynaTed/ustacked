import React from "react";

export const deleteCorporateActionWarningText = (
  <React.Fragment>
    <p className="bold">
      Are you sure you want to delete this corporate action?
    </p>
  </React.Fragment>
);

export const deleteTradeWarningText = (
  <React.Fragment>
    <p className="bold">Are you sure you want to delete this trade?</p>
  </React.Fragment>
);

export const deleteStockWarningText = (
  <React.Fragment>
    <p className="bold">Are you sure you want to delete this stock?</p>
    <p>
      Action cannot be undone and can have major consequences on clients'
      portfolios.
    </p>
  </React.Fragment>
);
