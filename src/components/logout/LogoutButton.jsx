import React from "react";
import { NavLink } from "react-router-dom";

function LogoutButton() {
  return (
    <div className="corner-button">
      <NavLink to="/logout">
        <i className="fa fa-power-off fa-lg log-out"></i>
      </NavLink>
    </div>
  );
}

export default LogoutButton;
