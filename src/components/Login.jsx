import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import LoginForm from "./login/LoginForm";

function Login() {
  const [authError, setAuthError] = useState(null);

  const handleError = (error) => {
    setAuthError(error);
    const alertBox = document.getElementById("loginAlertBox");
    if (alertBox) alertBox.style.display = "flex";
  };

  function closeAlertBox() {
    const alertBox = document.getElementById("loginAlertBox");
    alertBox.style.display = "none";
  }

  return (
    <div className="auth-form-container">
      <div className="auth-form-title">sign in</div>
      {authError && (
        <div id="loginAlertBox" className="alert-container">
          <div className="alert-message">Invalid credentials.</div>
          <div className="alert-close-btn" onClick={closeAlertBox}>
            &times;
          </div>
        </div>
      )}
      <LoginForm onError={handleError} />
      <div className="auth-form-footer">
        {"Do not have account yet? "}
        <NavLink className="link" to="/register">
          Create one for free
        </NavLink>
        .
      </div>
    </div>
  );
}
export default Login;
