import React from "react";
import Select from "../common/form/Select";

import corporateActionTypes from "../../accessories/constants/corporateActionTypes";

function CorporateActionTypeSelection({
  selectedCorporateActionType,
  onSelectInputChange,
}) {
  return (
    <Select
      value={selectedCorporateActionType}
      setValue={onSelectInputChange}
      options={corporateActionTypes}
    />
  );
}

export default CorporateActionTypeSelection;
