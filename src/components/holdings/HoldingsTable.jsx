import React from "react";

import Table from "../common/table/Table";

function HoldingsTable({ onSort, sortColumn, holdings }) {
  const columns = [
    {
      id: 1,
      name: "symbol",
      path: "symbol",
      title: "stock",
      sortable: true,
      content: (trade) => (
        <React.Fragment>
          <span
            className={
              trade.balanceAdjusted !== 0
                ? "bold badge badge-ticker"
                : "bold badge badge-terminated-holding"
            }
          >
            {trade.symbol}
          </span>
        </React.Fragment>
      ),
    },
    {
      id: 2,
      name: "balanceAdjusted",
      path: "balanceAdjusted",
      title: "shares",
      sortable: true,
      content: (holding) => holding.balanceAdjusted || "-",
    },
    {
      id: 3,
      name: "share",
      title: "portfolio share",
      path: "share",
      sortable: true,
      // content: (holding) => `${Math.round(holding.share * 1000) / 10}%`,
      content: (holding) =>
        holding.share ? `${Math.round(holding.share * 1000) / 10}%` : "-",
    },
    {
      id: 4,
      name: "averageBuy",
      title: "average price",
      path: "averageBuy",
      sortable: true,
      content: (holding) => Math.round(holding.averageBuy * 100) / 100,
    },
    {
      id: 5,
      name: "closePrice",
      title: "current price",
      path: "closePrice",
      sortable: true,
    },
    {
      id: 6,
      name: "value",
      path: "value",
      sortable: true,
      content: (holding) =>
        holding.value ? `${Math.round(holding.value * 100) / 100}` : "-",
    },
    {
      id: 7,
      name: "gain",
      title: "capital gain",
      path: "gain",
      sortable: true,
      content: (holding) =>
        holding.balanceAdjusted
          ? Math.round(holding.gain * 100) / 100
          : Math.round(holding.realizedGain * 100) / 100,
    },
    {
      id: 8,
      name: "gainRate",
      title: "profit rate",
      path: "gainRate",
      sortable: true,
      content: (holding) => `${Math.round(holding.gainRate * 1000) / 10}%`,
    },
    {
      id: 9,
      name: "totalDividends",
      title: "dividend gain",
      path: "totalDividends",
      sortable: true,
      content: (holding) => `${Math.round(holding.totalDividends * 100) / 100}`,
    },
    // {
    //   id: 10,
    //   name: "toBreakEven",
    //   title: "to break even",
    //   path: "toBreakEven",
    //   sortable: true,
    // },
    {
      id: 11,
      name: "accruedTradeCount",
      title: "trade count",
      path: "accruedTradeCount",
      sortable: true,
      content: (holding) =>
        holding.balanceAdjusted
          ? holding.accruedTradeCount
          : holding.totalTradesCount,
    },
    {
      id: 12,
      name: "accruedFees",
      title: "fees",
      path: "accruedFees",
      sortable: true,
      content: (holding) =>
        holding.balanceAdjusted ? holding.accruedFees : holding.totalFees,
    },
  ];

  return (
    <Table
      onSort={onSort}
      sortColumn={sortColumn}
      columns={columns}
      data={holdings}
    />
  );
}

export default HoldingsTable;
