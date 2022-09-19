import React, { useState } from "react";

import RegisterForm from "./register/RegisterForm";

function Register() {
  const [authError, setAuthError] = useState(null);

  const handleError = async (error) => {
    setAuthError(error);
    const alertBox = document.getElementById("registerAlertBox");
    if (alertBox) alertBox.style.display = "flex";
  };

  function closeAlertBox() {
    const alertBox = document.getElementById("registerAlertBox");
    alertBox.style.display = "none";
  }

  return (
    <div className="auth-form-container">
      <div className="auth-form-title">create new account</div>
      {authError && (
        <div id="registerAlertBox" className="alert-container">
          <div className="alert-message">Invalid email.</div>
          <div className="alert-close-btn" onClick={closeAlertBox}>
            &times;
          </div>
        </div>
      )}
      <RegisterForm onError={handleError} />
    </div>
  );
}

export default Register;
