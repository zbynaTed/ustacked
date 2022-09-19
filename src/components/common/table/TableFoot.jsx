import React from "react";

function TableFoot({ title, value, span }) {
  return (
    <tfoot>
      <tr>
        <td colSpan={span}>{value}</td>
      </tr>
    </tfoot>
  );
}

export default TableFoot;
