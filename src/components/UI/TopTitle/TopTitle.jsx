import React from "react";

import "./topTitle.css";

const TopTitle = (props) => {
  return <h2 className="top-title">{props.children}</h2>;
};

export default TopTitle;
