import React from "react";

import Table from "../common/table/Table";
import { corporateActions } from "../../accessories/columns/corporateActions";

import dateFormats from "../../accessories/formats/dates";

function CorporateActionDetailTable({ trade }) {
  const { corporateActions: caDetail } = trade;
  const columns = [
    {
      id: 1,
      title: "date",
      path: "effectiveDate",
      content: (ca) => dateFormats.tableDateFormat(ca.effectiveDate),
    },
    {
      id: 2,
      name: "quantityAdjusted",
      title: "quantity",
      content: () => trade.quantityAdjusted,
    },
    {
      id: 3,
      name: "detail",
      title: "details",
      path: "detail",
      content: (ca) => (
        <React.Fragment>
          <span className="badge badge-ticker">{ca.name}</span>
          {` ${corporateActions[ca.caId](ca)}`}
        </React.Fragment>
      ),
    },
  ];
  return <Table columns={columns} data={caDetail} className="table-plain" />;
}

export default CorporateActionDetailTable;
