import React from "react";
import {ReactComponent as SearchBoxIcon} from "../../../../assets/icons/SearchBoxIcon.svg";

import "./SearchBox.css";
export default function SearchBox(props: any) {
  return (
    <div className="SearchBox">
      <input type="text" {...props} />
      <span className="SearchBox-Icon">
        <SearchBoxIcon />
      </span>
    </div>
  );
}
