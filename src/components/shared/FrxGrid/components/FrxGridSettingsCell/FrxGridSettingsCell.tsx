/**
 * Component to render the ellipses in settings column
 * @author Deepak_T
 * @version 1.0.0
 */

import { Radio, Checkbox } from "antd";
// import Checkbox from "antd/lib/checkbox/Checkbox";
import { RadioChangeEvent } from "antd/lib/radio";
import React from "react";
import { GridMenu } from "../../../../../models/grid.model";
import FrxGridMenu from "../FrxGridMenu/FrxGridMenu";
import "./FrxGridSettingsCell.scss";
import { CheckboxChangeEvent } from "antd/lib/checkbox";


export interface FrxGridSettingsCellProps {
  expanded: boolean;

  dataRow: any;
  settingsAnchor: HTMLElement | null;
  setingsComponent?: "grid-menu";
  isRowSelectionEnabled?: boolean;
	settingsMenuItems?: GridMenu[];
	isRowSelectorCheckbox?:boolean;


  handleSettingsComponentMenuClose?: () => void;
  handleMenuClick?: (menuItem: GridMenu) => void;
  onSettingsTriDotClick: (dataRow: any) => void;
  rowSelectionChange: (dataRow: any) => void;
  onSettingsCellClick: (
    expanded: boolean,
    data: any,
    eventTarget: EventTarget & HTMLButtonElement
  ) => void;
}

class FrxGridSettingsCell extends React.Component<FrxGridSettingsCellProps> {
  /**
   * @function getComponentToDisplayOnSettingsClick
   * to retrieve the type of component to be opened on click of settings ellipses
   * @author Deepak_T
   */
  getComponentToDisplayOnSettingsClick = () => {
    if (this.props.setingsComponent) {
    
      switch (this.props.setingsComponent) {
        case "grid-menu":
          if (
            this.props.settingsMenuItems &&
            this.props.settingsMenuItems.length > 0
          ) {
            return (
              <FrxGridMenu
                menuItems={this.props.settingsMenuItems}
                anchorEl={this.props.settingsAnchor}
                handleMenuClick={(menu: GridMenu) => {
                  if (this.props.handleMenuClick)
                    this.props.handleMenuClick(menu);
                }}
                handleClose={() => {
                  if (this.props.handleSettingsComponentMenuClose)
                    this.props.handleSettingsComponentMenuClose();
                }}
              />
            );
          } else {
            return <></>;
          }

        default:
          console.log("no component specified");
      }
    }
  };

  rowSelectionChange = (e: RadioChangeEvent | CheckboxChangeEvent) => {
    this.props.rowSelectionChange(this.props.dataRow);
  };

  /**
   * @function onSettingsTriDotClcik
   * to detect click on tridot and react to it
   * @author Deepak_T
   */
  onSettingsTriDotClcik = () => {
    if (this.props.isRowSelectionEnabled) return;
    if (this.props.onSettingsTriDotClick) {
  
      this.props.onSettingsTriDotClick(this.props.dataRow);
    }
  };
  /**
   * @function renderExpandedCell
   * to render the content when ellipses is expanded
   * @author Deepak_T
   */
  renderExpandedCell = () => {
    const isRowSelectionEnabled = this.props.isRowSelectionEnabled;

    return (
      <>
        {!isRowSelectionEnabled ? (
          <span
            id={this.props.dataRow.key + "-expanded"}
            className="frx-grid-settings-cell__icon"
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
              // const savedEvent = event;
              const savedTarget = event.currentTarget;
              this.props.onSettingsCellClick(
                false,
                this.props.dataRow,
                savedTarget
              );
            }}
          >
            <svg
              className="frx-grid-settings-cell__icon--expanded"
              width="22"
              height="6"
              viewBox="0 0 22 6"
              fill="#000000"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="19.1552" cy="2.58853" r="2.58853" fill="#A5A5A5" />
              <circle cx="10.8717" cy="2.58853" r="2.58853" fill="#C1C2C4" />
              <circle cx="2.58853" cy="2.58853" r="2.58853" fill="#E1E1E1" />
            </svg>
          </span>
        ) : (
					<>
					{!this.props.isRowSelectorCheckbox ? <Radio 
					onChange={this.rowSelectionChange} 
					checked={this.props.dataRow.isSelected}></Radio> : <Checkbox 	onChange={this.rowSelectionChange}></Checkbox> }
        </>
				)}
        {!isRowSelectionEnabled && this.props.setingsComponent
          ? this.getComponentToDisplayOnSettingsClick()
          : null}
      </>
    );
  };

  /**
   * @function renderNonExpandedCell
   * to render the content when ellipses is not expanded
   * @author Deepak_T
   */
  renderNonExpandedCell = () => {
    const isRowSelectionEnabled = this.props.isRowSelectionEnabled;
    return (
      <>
        {!isRowSelectionEnabled ? (
          <span
            id={this.props.dataRow.key + "-non-expanded"}
            className="frx-grid-settings-cell__icon"
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
              // const savedEvent = event;
              const savedTarget = event.currentTarget;
              this.props.onSettingsCellClick(
                true,
                this.props.dataRow,
                savedTarget
              );
            }}
          >
            <svg
              className="frx-grid-settings-cell__icon--non-expanded"
              width="22"
              height="6"
              viewBox="0 0 22 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="19.1552" cy="2.58853" r="2.58853" fill="#A5A5A5" />
              <circle cx="10.8717" cy="2.58853" r="2.58853" fill="#C1C2C4" />
              <circle cx="2.58853" cy="2.58853" r="2.58853" fill="#E1E1E1" />
            </svg>
          </span>
        ) : (
					<>
					{!this.props.isRowSelectorCheckbox ? <Radio 
					onChange={this.rowSelectionChange} 
					checked={this.props.dataRow.isSelected}></Radio> : <Checkbox 		onChange={this.rowSelectionChange} ></Checkbox> }
        </>
        )}
        {!isRowSelectionEnabled && this.props.setingsComponent
          ? this.getComponentToDisplayOnSettingsClick()
          : null}
      </>
    );
  };
  render() {
    // const { expanded } = this.props;
    return (
      <span
        className="frx-grid-settings-cell"
        onClick={this.onSettingsTriDotClcik}
      >
        {/* USE IF YOU WNT TO CHANGE ELLIPSES WHEN CLICKED */}
        {/* {expanded ? this.renderExpandedCell() : this.renderNonExpandedCell()} */}

        {this.renderNonExpandedCell()}
      </span>
    );
  }
}

export default FrxGridSettingsCell;
