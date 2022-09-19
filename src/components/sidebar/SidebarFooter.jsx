import React from "react";

function SidebarFooter({ count, title }) {
  return (
    <div className="side-footer">
      <p className="info-text">{`total of ${count} ${title}`}</p>
    </div>
  );
}

export default SidebarFooter;
