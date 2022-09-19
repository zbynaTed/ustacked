import React from "react";

function Pagination({ pageCount, onPageChange, currentPage }) {
  const pageLabels = [];
  for (let p = 1; p <= pageCount; p++) {
    pageLabels.push(p);
  }

  return (
    <div className="pagination-container">
      <div
        className="pagination-item"
        onClick={() => (currentPage > 0 ? onPageChange(currentPage - 1) : null)}
      >
        {"<"}
      </div>
      {pageLabels.map((p) => (
        <div
          key={p}
          className={
            currentPage === p - 1
              ? "pagination-item--active"
              : "pagination-item"
          }
          onClick={() => onPageChange(p - 1)}
        >
          {p}
        </div>
      ))}
      <div
        className="pagination-item"
        onClick={() => {
          if (currentPage < pageCount - 1) return onPageChange(currentPage + 1);
        }}
      >
        {">"}
      </div>
    </div>
  );
}

export default Pagination;
