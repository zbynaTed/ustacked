import React from "react";

function Label({ htmlFor, value }) {
  return <label htmlFor={htmlFor}>{value}</label>;
}

export default Label;
