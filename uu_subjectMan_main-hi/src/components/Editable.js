import React, { useState } from "react";

const Editable = ({ edit, setEdit, values, setValues, children, type = "input", valueType, ...rest }) => {
  const components = { input: "input", textarea: "textarea" };
  const EditComponent = components[type];

  const handleChange = ({ target: { value } }) => {
    setValues({ ...values, [valueType]: value });
  };

  if (!edit) return children;

  return (
    <>
      <EditComponent onChange={handleChange} value={values[valueType]} {...rest} />
    </>
  );
};

export default Editable;
