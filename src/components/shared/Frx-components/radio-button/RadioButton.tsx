import React from "react";

import "./RadioButton.css";
export default function RadioButton(props: any) {
  return (
    <>
      <label className="container">
        <input
          type="radio"
          checked={props.checked}
          name={props.name}
          className={props.className}
        />
        <span className="label">{props.label}</span>
        <span className="checkmark"></span>
      </label>
    </>
  );
}
