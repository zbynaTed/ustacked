import React from "react";

function TableHead({ columns, onSort, sortColumn }) {
  return (
    <thead>
      <tr>
        {columns.map((col) => (
          <th
            className={
              sortColumn && sortColumn.path === col.path ? "sort-column" : ""
            }
            key={col.id}
            onClick={
              col.sortable
                ? () => {
                    const asc =
                      sortColumn.path !== col.path ? true : !sortColumn.asc;
                    onSort({ path: col.path, asc });
                  }
                : null
            }
          >
            {col.title || col.name}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default TableHead;
