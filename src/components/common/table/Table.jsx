import React from "react";

import TableHead from "./TableHead";
import TableBody from "./TableBody";
import TableFoot from "./TableFoot";

function Table({
  columns,
  data,
  onSort,
  sortColumn,
  footer,
  footerSpan,
  className,
}) {
  return (
    <table className={className}>
      <TableHead onSort={onSort} columns={columns} sortColumn={sortColumn} />
      <TableBody columns={columns} data={data} />
      {footer && <TableFoot title={footer} value={footer} span={footerSpan} />}
    </table>
  );
}

export default Table;
