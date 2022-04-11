import React from "react";

import "./button.css";

const Button = (props) => {
  return (
    <button type={props.type ? "sumbit" : "button"} onClick={props.onClick} className={`btn ${props.className}`}>
      {props.children}
    </button>
  );
};

export default Button;
