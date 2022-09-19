import React, { useState } from "react";

import Label from "../common/form/Label";
import Input from "../common/form/Input";

import auth from "../../services/utils/auth";
import { registerUser } from "../../services/api/users";
import registerFormCompomentsTemplate from "../../templates/registerForm";

function RegisterForm({ onError }) {
  const [email, setEmail] = useState({
    value: "",
    error: true,
  });
  const [password, setPassword] = useState({
    value: "",
    error: true,
  });
  const [name, setName] = useState({
    value: "",
    error: true,
  });

  const successfulValidation = () => {
    const compoments = [email, password, name];
    return compoments.every((c) => c.error === false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const credentials = {
      email: email.value,
      password: password.value,
      name: name.value,
    };
    try {
      const { data: token } = await registerUser(credentials);
      auth.register(token);
      window.location = "/trades";
    } catch (error) {
      onError(error.message);
    }
  };

  const registerFormCompoments = registerFormCompomentsTemplate(
    email,
    setEmail,
    password,
    setPassword,
    name,
    setName
  );

  return (
    <form onSubmit={handleSubmit} className="auth-form-body">
      {registerFormCompoments.map((c) => (
        <React.Fragment key={`${c.id}`}>
          <Label htmlFor={c.id} value={c.name} />
          <Input
            type={c.type}
            name={c.name}
            id={c.id}
            value={c.value}
            setValue={c.setValue}
            upperCaseInput={c.upperCase}
            validateInput={c.validation}
          />
          {c.value.error && (
            <p className="form-error-message">{c.value.error}</p>
          )}
        </React.Fragment>
      ))}
      <button
        type="submit"
        className="btn-register-submit"
        disabled={successfulValidation() ? "" : "disabled"}
      >
        Create Account
      </button>
    </form>
  );
}

export default RegisterForm;
