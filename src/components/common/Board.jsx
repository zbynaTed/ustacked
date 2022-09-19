import React from "react";

function Board({ data }) {
  return (
    data.map((item) => (
      <div key={item.id} className="overview-board-item">
        <div className="overview-board-item-title">
          <span className="badge badge-ticker">{item.title}</span>
        </div>
        <div className="overview-board-item-value">{item.value}</div>
      </div>
    ))
  )
    
    
    
  
}

export default Board;
