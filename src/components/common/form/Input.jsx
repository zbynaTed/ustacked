import React, { useState } from "react";

import beautifyErrorMessage from "../../../accessories/functions/validations";

function Input({
  type,
  name,
  id,
  value,
  setValue,
  validateInput,
  upperCaseInput,
}) {
  const [error, setError] = useState(false);

  const handleChange = async (input) => {
    input = upperCaseInput ? input.toUpperCase() : input;

    if (!validateInput) {
      setValue({ value: input, error: false });
      return;
    }

    const errorObj = await validateInput(input);
    const errorMsg =
      errorObj && errorObj.error ? beautifyErrorMessage(errorObj.error) : null;

    errorObj && errorObj.data
      ? setValue({
          value: input,
          id: errorObj && errorObj.data ? errorObj.data.id : null,
          companyId: errorObj && errorObj.data ? errorObj.data.companyId : null,
          error: errorMsg ? errorMsg : false,
        })
      : setValue({
          value: input,
          error: errorMsg ? errorMsg : false,
        });

    errorMsg ? setError(true) : setError(false);
  };

  return (
    <React.Fragment>
      <input
        type={type}
        id={id}
        name={name}
        value={value && value.value}
        onChange={(e) => handleChange(e.target.value)}
        className={error ? "form-error-input" : undefined}
      />
    </React.Fragment>
  );
}

export default Input;
