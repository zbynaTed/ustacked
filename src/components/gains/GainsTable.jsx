import React from "react";
import Table from "../common/table/Table";

function GainsTable({ gains, sortColumn, onSort }) {
  const columns = [
    {
      id: 1,
      name: "symbol",
      path: "symbol",
      sortable: true,
      content: (trade) => (
        <React.Fragment>
          <span className="bold badge badge-ticker">{trade.symbol}</span>
        </React.Fragment>
      ),
    },
    {
      id: 2,
      content: (trade) =>
        trade.positionStatus === 4 && (
          <span className="bold badge badge-terminated">closed position</span>
        ),
    },
    {
      id: 3,
      name: "realizedGain",
      title: "gain",
      path: "realizedGain",
      sortable: true,
    },
    {
      id: 4,
      name: "realizedFees",
      title: "fees",
      path: "realizedFees",
      sortable: true,
      content: (trade) => Math.round(trade.realizedFees * 100) / 100,
    },
    {
      id: 5,
      name: "netGain",
      title: "net gain",
      path: "netGain",
      sortable: true,
    },
    {
      id: 6,
      title: "profit rate",
      path: "profitRate",
      sortable: true,
      content: (trade) => (trade.profitRate ? `${trade.profitRate}%` : null),
    },
  ];

  return (
    <Table
      data={gains}
      columns={columns}
      onSort={onSort}
      sortColumn={sortColumn}
    />
  );
}

export default GainsTable;
