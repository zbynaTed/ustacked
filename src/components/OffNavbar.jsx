import React from "react";
import { NavLink } from "react-router-dom";

function OffNavBar() {
  return (
    <React.Fragment>
      <div className="off-navbar-container">
        <div className="logo logo-container">stacked</div>
        <div className="auth-buttons-container">
          <NavLink className="btn-auth btn-login" to="/login">
            log in
          </NavLink>
          <NavLink className="btn-auth btn-register" to="/register">
            sign up
          </NavLink>
        </div>
      </div>
    </React.Fragment>
  );
}

export default OffNavBar;
