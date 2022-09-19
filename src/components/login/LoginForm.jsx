import React, { useState } from "react";

import Label from "../common/form/Label";
import Input from "../common/form/Input";

import auth from "../../services/utils/auth";
import http from "../../services/utils/http";

import loginFormCompomentsTemplate from "../../templates/loginForm";

function LoginForm({ onError, credentials }) {
  const [email, setEmail] = useState({
    value: credentials ? credentials.email : "",
    error: credentials ? false : true,
  });
  const [password, setPassword] = useState({
    value: credentials ? credentials.password : "",
    error: credentials ? false : true,
  });

  const apiEndpoint = "https://unstasked.herokuapp.com/api/auth";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const credentials = { email: email.value, password: password.value };
    try {
      const { data: token } = await http.post(apiEndpoint, credentials);
      auth.register(token);
      window.location = "/overview";
    } catch (error) {
      onError(error.message);
    }
  };

  const loginFormCompoments = loginFormCompomentsTemplate(
    email,
    setEmail,
    password,
    setPassword
  );

  return (
    <form onSubmit={handleSubmit} className="auth-form-body">
      {loginFormCompoments.map((c) => (
        <React.Fragment key={`${c.id}`}>
          <Label htmlFor={c.id} value={c.name} />
          <Input
            type={c.type}
            name={c.name}
            id={c.id}
            value={c.value}
            setValue={c.setValue}
            upperCaseInput={c.upperCase}
          />
          {c.value.error && (
            <p className="form-error-message">{c.value.error}</p>
          )}
        </React.Fragment>
      ))}
      <button type="submit" className="btn btn-login-submit">
        Submit
      </button>
    </form>
  );
}

export default LoginForm;
