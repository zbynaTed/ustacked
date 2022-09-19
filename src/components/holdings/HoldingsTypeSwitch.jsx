import React from "react";

function HoldingsTypeSwitch({ type, onSwitch, title }) {
  return (
    <div className="switch-container">
      <label className="switch">
        <input
          type="checkbox"
          checked={type}
          onChange={onSwitch}
          value={type}
        />
        <span className="slider round"></span>
      </label>
      <span className="switch-title">{title}</span>
    </div>
  );
}

export default HoldingsTypeSwitch;
