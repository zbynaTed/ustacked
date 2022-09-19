import React, { useState } from "react";

function SearchBox({
  placeholder,
  onInputChange,
  upperCaseInput,
  upperCaseOutput,
  searboxClass,
  id,
  label,
}) {
  const [value, setValue] = useState([]);

  return (
    <React.Fragment>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        id={id}
        type="text"
        className={searboxClass}
        placeholder={placeholder}
        onChange={(e) => {
          upperCaseOutput
            ? onInputChange(e.target.value.toUpperCase())
            : onInputChange(e.target.value);
          upperCaseInput
            ? setValue(e.target.value.toUpperCase())
            : setValue(e.target.value);
        }}
        value={value}
      />
    </React.Fragment>
  );
}

export default SearchBox;
