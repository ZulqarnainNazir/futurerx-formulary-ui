/**
 * Component to render each cell in grid except settings column
 * @author Deepak_T
 * @version 1.0.0
 */

import { Tooltip } from "antd";
import * as React from "react";
import "./FrxGridCell.scss";

export interface FrxGridCellProps {
  dataRow: any;
  dataKey: string;
  className?: string;
  showToolTip?: boolean;
  formatter?: JSX.Element;
  dataType: "string" | "date" | "number" | undefined;
  customToolTip?: JSX.Element;
  customContent?: JSX.Element;
  componentToOpenOnClickingCell?: (props) => JSX.Element;
  onCellClick?: (
    dataRow: any,
    dataKey: string,
    componentToOpenOnClickingCell?: (props) => JSX.Element
  ) => void;
}

class FrxGridCell extends React.Component<FrxGridCellProps> {
  render() {
    const {
      dataRow,
      dataKey,
      className,
      onCellClick,
      showToolTip,
      customToolTip,
      customContent,
      formatter,
      dataType,
      componentToOpenOnClickingCell
    } = this.props;

    return (
      <>
        {!showToolTip ? (
          <span
            onClick={() => {
              if (onCellClick)
                onCellClick(dataRow, dataKey, componentToOpenOnClickingCell);
            }}
            className={`frx-grid-cell ${
              className ? `frx-grid-cell--${className}` : ``
            }`}
          >
            {formatter ? (
              <>
                {" "}
                <span className="frx-grid-cell__cell-formatter">
                  {formatter}
                </span>{" "}
                {dataType === "number"
                  ? parseInt(dataRow[dataKey]).toFixed(2)
                  : dataRow[dataKey]}
              </>
            ) : (
              <>
                {customContent
                  ? customContent
                  : dataType === "number"
                  ? parseInt(dataRow[dataKey]).toFixed(3)
                  : dataRow[dataKey]}
              </>
            )}
          </span>
        ) : (
          <Tooltip
            overlayClassName="frx-grid-cell__tooltip"
            // arrowPointAtCenter={true}
            placement="top"
            title={
              <>
                {customToolTip ? (
                  <>{customToolTip}</>
                ) : (
                  <div className="frx-grid-cell__tooltip--innercontent">
                    <span className="frx-grid-cell__tooltip--innercontent__druglabel">
                      {dataRow[dataKey]}
                    </span>
                  </div>
                )}
              </>
            }
          >
            <span
              onClick={() => {
                if (onCellClick)
                  onCellClick(dataRow, dataKey, componentToOpenOnClickingCell);
              }}
              className={`frx-grid-cell ${
                className ? `frx-grid-cell--${className}` : ``
              }`}
            >
              {formatter ? (
                <>
                  {" "}
                  <span className="frx-grid-cell__cell-formatter">
                    {formatter}
                  </span>{" "}
                  {dataType === "number"
                    ? parseInt(dataRow[dataKey]).toFixed(3)
                    : dataRow[dataKey]}
                </>
              ) : (
                <>
                  {customContent
                    ? customContent
                    : dataType === "number"
                    ? parseInt(dataRow[dataKey]).toFixed(2)
                    : dataRow[dataKey]}
                </>
              )
              // dataRow[dataKey]
              }
            </span>
          </Tooltip>
        )}
      </>
    );
  }
}

export default FrxGridCell;
