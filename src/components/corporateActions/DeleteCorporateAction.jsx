import React from "react";

import CorporateActionSummary from "./CorporateActionSummary";

import { deleteCorporateActionWarningText } from "../../accessories/texts/warnings";

function DeleteCorporateAction({ corporateAction, onDelete }) {
  return (
    <React.Fragment>
      {deleteCorporateActionWarningText}
      <CorporateActionSummary corporateAction={corporateAction} />
      <div>
        <button
          className="btn btn-submit"
          onClick={() => onDelete(corporateAction.id)}
        >
          Delete
        </button>
      </div>
    </React.Fragment>
  );
}

export default DeleteCorporateAction;
