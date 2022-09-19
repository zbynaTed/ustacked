import React from "react";

import dateFormats from "../../accessories/formats/dates";

function CorporateActionSummary({ corporateAction }) {
  return (
    <div className="modal-summary">
      <p className="bold">
        {`${corporateAction.name} on ${
          corporateAction.symbol
        } from ${dateFormats.summaryDateFormat(
          corporateAction.effectiveDate
        )}.`}
      </p>
    </div>
  );
}

export default CorporateActionSummary;
