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
import FrxGridSorterIcon from "../FrxGridSorterIcon/FrxGridSorterIcon";

interface FrxGridHeaderCellProps {
  column: Column<any>;
  isPinningEnabled: boolean;
  textCase?: string;
  multiSortOrder?: number;
  multiSortedArray: string[];
	multiSortedInfo: any[];
	
	singleSortedInfo:any;
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
              // <FontAwesomeIcon
              //   icon={faThumbtack}
              //   className="frx-grid-header-cell__unpin-icon"
              //   onClick={e => {
              //     e.stopPropagation();
              //     if (unpinColumn) unpinColumn(column);
              //   }}
              // />
              <svg  
              onClick={e => {
                    e.stopPropagation();
                    if (unpinColumn) unpinColumn(column);
              }} 
              className="frx-grid-header-cell__unpin-icon" width="10" height="16" viewBox="0 0 14 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M11 7.5V2.5H12C12.55 2.5 13 2.05 13 1.5C13 0.95 12.55 0.5 12 0.5H2C1.45 0.5 1 0.95 1 1.5C1 2.05 1.45 2.5 2 2.5H3V7.5C3 9.16 1.66 10.5 0 10.5V12.5H5.97V19.5L6.97 20.5L7.97 19.5V12.5H14V10.5C12.34 10.5 11 9.16 11 7.5Z" fill="#1D54B4"/>
              </svg>
            ) : (
              // <FontAwesomeIcon
              //   className="frx-grid-header-cell__pin-icon"
              //   onClick={e => {
              //     e.stopPropagation();
              //     if (pinColumnToLeft) pinColumnToLeft(column);
              //   }}
              //   icon={faThumbtack}
              // />
              <svg 
                className="frx-grid-header-cell__pin-icon"
                onClick={e => {
                  e.stopPropagation();
                  if (pinColumnToLeft) pinColumnToLeft(column);
                }}
               width="10" height="16" viewBox="0 0 14 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M11 7.5V2.5H12C12.55 2.5 13 2.05 13 1.5C13 0.95 12.55 0.5 12 0.5H2C1.45 0.5 1 0.95 1 1.5C1 2.05 1.45 2.5 2 2.5H3V7.5C3 9.16 1.66 10.5 0 10.5V12.5H5.97V19.5L6.97 20.5L7.97 19.5V12.5H14V10.5C12.34 10.5 11 9.16 11 7.5Z" fill="#707683"/>
              </svg>
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
          <>
            <FrxGridSorterIcon
              isMultiSort
              columnKey={column.key}
							multiSortedInfo={this.props.multiSortedInfo}
							singleSortedInfo={this.props.singleSortedInfo}
              multiSortedArray={this.props.multiSortedArray}
            />
            <span className="frx-grid-header-cell__multisortorder">
              {multiSortOrder}
            </span>
          </>
        ) : (
          <>
            <FrxGridSorterIcon
							
							singleSortedInfo={this.props.singleSortedInfo}
              columnKey={column.key}
              multiSortedArray={this.props.multiSortedArray}
            />
            <span
              className="frx-grid-header-cell__nomultisortorder"
              style={{ visibility: "hidden" }}
            >
              5
              {/* added to account for the spacing a digit will take when multi sort order has to be displayed */}
            </span>
          </>
        )}
      </>
    );
  }
}

export default FrxGridHeaderCell;
