import React from "react";

function TableBody({ columns, data }) {
  return (
    <tbody>
      {data.map((item) => (
        <tr key={item.id}>
          {columns.map((col) =>
            !col.content ? (
              <td key={`${col.id}-${item.id}`}>{item[col.name]}</td>
            ) : (
              <td key={`${col.id}-${item.id}`}>{col.content(item)}</td>
            )
          )}
        </tr>
      ))}
    </tbody>
  );
}

export default TableBody;
