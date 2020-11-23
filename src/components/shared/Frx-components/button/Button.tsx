import React from "react";

import "./Button.css";

let Button = (props: any) => {
  return (
    <button className="Button" {...props}>
      {props.label}
      {props.icon}
    </button>
  );
};
export default Button;
