/**
 * Component for the heder cell in grid except the settings column
 * @author Deepak_T
 * @version 1.0.0
 */

import * as React from "react";
import { Component } from "react";
import "./FrxGridHeaderCell.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbtack } from "@fortawesome/free-solid-svg-icons";
import { Column } from "../../../../../models/grid.model";

interface FrxGridHeaderCellProps {
  column: Column<any>;
  isPinningEnabled: boolean;
  textCase?: string;
  multiSortOrder?: number;
  pinColumnToLeft?: (c: Column<any>) => void;
  unpinColumn?: (c: Column<any>) => void;
}

class FrxGridHeaderCell extends Component<FrxGridHeaderCellProps> {
  render() {
    const {
      column,
      textCase,
      multiSortOrder,
      unpinColumn,
      pinColumnToLeft,
      isPinningEnabled
    } = this.props;
    return (
      <>
        {isPinningEnabled && (
          <span className="frx-grid-header-cell">
            {column.fixed ? (
              <FontAwesomeIcon
                icon={faThumbtack}
                className="frx-grid-header-cell__unpin-icon"
                onClick={e => {
                  e.stopPropagation();
                  if (unpinColumn) unpinColumn(column);
                }}
              />
            ) : (
              <FontAwesomeIcon
                className="frx-grid-header-cell__pin-icon"
                onClick={e => {
                  e.stopPropagation();
                  if (pinColumnToLeft) pinColumnToLeft(column);
                }}
                icon={faThumbtack}
              />
            )}
          </span>
        )}
        <span
          className={`frx-grid-header-cell__header-name frx-grid-header-cell--dragHandler ${
            textCase ? `frx-grid-header-cell__header-name--${textCase}` : ``
          }`}
        >
          {column.displayTitle ? column.displayTitle.toLowerCase() : null}
        </span>
        {multiSortOrder && multiSortOrder > 0 ? (
          <span className="frx-grid-header-cell__multisortorder">
            {multiSortOrder}
          </span>
        ) : (
          <span
            className="frx-grid-header-cell__nomultisortorder"
            style={{ visibility: "hidden" }}
          >
            5
          </span>
        )}
      </>
    );
  }
}

export default FrxGridHeaderCell;
