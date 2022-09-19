import React from "react";

import dateFormats from "../../accessories/formats/dates";
import Board from "../common/Board";

function OverviewBoard({ data }) {
  const values = [];
  data.map((item) =>
    values.push({
      id: item.id,
      title: item.title,
      value: item.currencyItem
        ? `$ ${Math.round(item.value * 100) / 100}`
        : item.dateItem
        ? dateFormats.tableDateFormat(item.value)
        : item.value,
    })
  );

  return (
    <div className="overview-board">
      <Board data={values} />
    </div>
  );
}

export default OverviewBoard;
