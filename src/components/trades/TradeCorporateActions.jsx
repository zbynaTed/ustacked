import React from "react";

import CorporateActionDetailTable from "../corporateActions/CorporateActionDetailTable";
import TradeSummary from "./TradeSummary";

function TradeCorporateActions({ trade }) {
  return (
    <React.Fragment>
      <TradeSummary trade={trade} />
      <CorporateActionDetailTable trade={trade} />
    </React.Fragment>
  );
}

export default TradeCorporateActions;
