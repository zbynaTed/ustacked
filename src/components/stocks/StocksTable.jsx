import React from "react";

import Modal from "../common/Modal";
import Table from "../common/table/Table";
import StockForm from "./StockForm";

import { deleteStockWarningText } from "../../accessories/texts/warnings";
import DeleteStock from "./DeleteStock";

function StockTable({ stocks, onDelete, onEdit, exactMatch }) {
  const columns = [
    {
      id: 1,
      name: "symbol",
      content: (stock) => (
        <React.Fragment>
          <span className="bold">{stock.symbol}</span>{" "}
          {exactMatch && stock.symbol === exactMatch.symbol ? (
            <span className="badge badge-initiated">exact match</span>
          ) : null}
        </React.Fragment>
      ),
    },
    { id: 2, name: "name", title: "company name" },
    {
      id: 3,
      title: "edit",
      content: (stock) => (
        <Modal
          modalBtnType="icon"
          modalBtnClass="table-icon-btn fa fa-pencil-square-o"
          modalId={`editStock-${stock.id}`}
          title="edit stock"
          footer=""
          content={
            <StockForm
              stock={stock}
              onEdit={onEdit}
              title="edit stock"
              btnLabel="Confirm"
              actionType="edit"
            />
          }
        />
      ),
    },
    {
      id: 4,
      title: "delete",
      content: (stock) => (
        <Modal
          modalBtnType="icon"
          modalBtnClass="table-icon-btn fa fa-trash-o"
          modalId={`delete-stock-${stock.id}`}
          title="delete stock"
          content={<DeleteStock stock={stock} onDelete={onDelete} />}
        />
      ),
    },
  ];

  return <Table columns={columns} data={stocks} className="table-plain" />;
}

export default StockTable;
