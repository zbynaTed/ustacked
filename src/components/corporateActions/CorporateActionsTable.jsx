import React from "react";
import moment from "moment";

import Table from "../common/table/Table";
import Modal from "../common/Modal";
import CorporateActionForm from "./CorporateActionForm";
import DeleteCorporateAction from "./DeleteCorporateAction";

import { corporateActions } from "../../accessories/columns/corporateActions";

function CorporateActionsTable({
  onSort,
  sortColumn,
  onEdit,
  onDelete,
  corporateActionsData,
  className,
}) {
  const columns = [
    {
      id: 1,
      name: "symbol",
      title: "company",
      path: "symbol",
      sortable: true,
      content: (ca) => (
        <React.Fragment>
          <span className="bold badge badge-ticker">{ca.symbol}</span>
          {` ${ca.companyName}`}
        </React.Fragment>
      ),
    },
    {
      id: 2,
      name: "balanceAdjusted",
      title: "holdings",
      path: "balanceAdjusted",
    },

    {
      id: 3,
      name: "detail",
      title: "details",
      path: "detail",
      content: (ca) => (
        <React.Fragment>
          <span className="badge badge-ticker">{ca.name}</span>
          {` ${corporateActions[ca.caId](ca)} ${
            ca.caId === 3 ? "per share" : ""
          }`}
        </React.Fragment>
      ),
    },
    {
      id: 4,
      name: "effectiveDate",
      title: "date",
      path: "effectiveDate",
      content: (ca) => moment(ca.effectiveDate).format("D MMM YYYY"),
      sortable: true,
    },
    {
      id: 5,
      content: (ca) => (
        <Modal
          modalBtnType="icon"
          modalBtnClass="table-icon-btn fa fa-pencil-square-o"
          modalId={`editCa-${ca.id}`}
          title="edit corporate action"
          footer=""
          content={
            <CorporateActionForm
              ca={ca}
              onEdit={onEdit}
              btnLabel="Confirm"
              actionType="editCorporateAction"
            />
          }
        />
      ),
    },
    {
      id: 6,
      content: (ca) => (
        <Modal
          modalBtnType="icon"
          modalBtnClass="table-icon-btn fa fa-trash-o"
          modalId={`delete-ca-${ca.id}`}
          title="delete corporate action"
          content={
            <DeleteCorporateAction corporateAction={ca} onDelete={onDelete} />
          }
        />
      ),
    },
  ];

  return (
    <React.Fragment>
      <Table
        onSort={onSort}
        sortColumn={sortColumn}
        columns={columns}
        data={corporateActionsData}
        className={className}
      />
    </React.Fragment>
  );
}

export default CorporateActionsTable;
