import React, { useState } from "react";

import "./formInput.css";

const FormInput = ({
  name,
  label,
  required = false,
  errorMessage,
  onChange,
  handleChange,
  ...props
}) => {
  const [touched, setTouched] = useState(false);

  return (
    <div className="inoutHolder">
      {label && <label htmlFor={name}>{label}</label>}
      <input
        className="formInput"
        onChange={onChange}
        onBlur={() => (required ? setTouched(true) : setTouched(false))}
        onFocus={() => name === "confirmPassword" && setTouched(true)}
        touched={touched.toString()}
        required={required}
        name={name}
        {...props}
      />
      {required && errorMessage && (
        <div className="errorMessage">{errorMessage}</div>
      )}
    </div>
  );
};

export default FormInput;
