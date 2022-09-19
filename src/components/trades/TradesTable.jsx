import React from "react";

import Table from "../common/table/Table";
import Modal from "../common/Modal";
import TradeForm from "./TradeForm";

import positionTypes from "../../accessories/constants/positionTypes";
import TradeCorporateActions from "./TradeCorporateActions";
import DeleteTrade from "./DeleteTrade";

import dateFormats from "../../accessories/formats/dates";

function TradesTable({ trades, onDelete, onEdit, onSort, sortColumn }) {
  const columns = [
    {
      id: 1,
      name: "symbol",
      path: "symbol",
      sortable: true,
      content: (trade) => (
        <span className="bold badge badge-ticker">{trade.symbol}</span>
      ),
    },
    {
      id: 2,
      content: (trade) =>
        trade.corporateActions.length > 0 && (
          <Modal
            modalBtnType="icon"
            modalBtnClass="table-icon-btn fa fa-calendar"
            modalId={`tradeCas-${trade.id}`}
            title="corporate actions"
            content={<TradeCorporateActions trade={trade} />}
          />
        ),
    },

    {
      id: 3,
      name: "quantityAdjusted",
      title: "quantity",
      path: "quantityAdjusted",
      sortable: true,
    },
    {
      id: 4,
      name: "priceAdjusted",
      title: "price",
      path: "priceAdjusted",
      sortable: true,
      content: (trade) => Math.round(trade.priceAdjusted * 100) / 100,
    },
    {
      id: 5,
      title: "position",
      path: "positionStatus",
      sortable: true,
      content: (trade) => {
        const type = positionTypes.filter(
          (t) => t.id === trade.positionStatus
        )[0];
        return <span className={`badge ${type.className}`}>{type.value}</span>;
      },
    },
    { id: 6, name: "fee", path: "fee", sortable: true },
    {
      id: 7,
      name: "tradeDate",
      path: "tradeDate",
      title: "date",
      sortable: true,
      content: (trade) => dateFormats.tableDateFormat(trade.tradeDate),
    },
    {
      id: 8,
      name: "buy",
      path: "buy",
      title: "type",
      sortable: true,
      content: (trade) => (trade.buy ? "BUY" : "SELL"),
    },
    {
      id: 9,
      sortable: false,
      content: (trade) => (
        <Modal
          modalBtnType="icon"
          modalBtnClass="table-icon-btn fa fa-pencil-square-o"
          modalId={`editTrade-${trade.id}`}
          title="edit trade"
          footer=""
          content={
            <TradeForm
              trade={trade}
              onEdit={onEdit}
              btnLabel="Confirm"
              actionType="editTrade"
            />
          }
        />
      ),
    },
    {
      id: 10,
      sortable: false,
      content: (trade) => (
        <Modal
          modalBtnType="icon"
          modalBtnClass="table-icon-btn fa fa-trash-o"
          modalId={`delete-trade-${trade.id}`}
          title="delete trade"
          content={<DeleteTrade trade={trade} onDelete={onDelete} />}
        />
      ),
    },
  ];

  return (
    <Table
      onSort={onSort}
      sortColumn={sortColumn}
      columns={columns}
      data={trades}
    />
  );
}

export default TradesTable;
