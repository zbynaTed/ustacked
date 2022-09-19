import React from "react";

function Select({ name, id, value, setValue, options }) {
  return (
    <select
      name={name}
      id={id}
      onChange={(e) => {
        setValue({ value: e.target.value, error: false });
      }}
      value={value.value ? value.value : value.id}
    >
      {options.map((o) => (
        <option
          key={o.id}
          value={o.value || o.value === false ? o.value : o.id}
        >
          {o.title || o.name}
        </option>
      ))}
    </select>
  );
}

export default Select;
