import React, { Component } from "react";

import IconInfo from "../../../../assets/icons/IconInfo.svg";
import PlusIcon from "../../../../assets/icons/PlusIcon.svg";
import {
  getColumns,
  getData,
} from "../../../../mocks/formulary-grid/FormularySimpleGridMock";

import SimpleGrid from "../../../shared/Frx-formulary/SimpleGrid/SimpleGrid";
import FrxMiniTabs from "../../../shared/FrxMiniTabs/FrxMiniTabs";
import CustomizedSwitches from "../../DrugDetails/components/FormularyConfigure/components/CustomizedSwitches";
class MassMaintenanceTier extends Component {
  state = {
    gridData: getData(),
    gridColumns: getColumns(),
    miniTabs: [
      {
        id: 1,
        text: "Replace",
      },
      {
        id: 2,
        text: "Append",
      },
      {
        id: 3,
        text: "Remove",
      },
    ],
    activeMiniTabIndex: 0,
  };
  addNew = () => {};
  onClickMiniTab = () => {};
  render() {
    const { gridData, gridColumns, miniTabs, activeMiniTabIndex } = this.state;
    return (
      <div className="mm-tier-root">
        <div className="bordered details-top">
          <div className="header">
            SELECTED FORMULARIES FOR TIER ASSIGNMENT
            <span>
              &nbsp; &nbsp;
              <img src={IconInfo} alt="info" />
            </span>
          </div>
          <div className="inner-container p-20">
            <div>
              <SimpleGrid columns={gridColumns} data={gridData} />
            </div>
            <div className="dynamic-row-addition">
              <span onClick={this.addNew}>
                <img src={PlusIcon} alt="PlusIcon" />
                &nbsp;
                <span className="__add-new-row">add new</span>
              </span>
            </div>
          </div>
        </div>
        <div className="bordered white-bg details-top">
          <div className="header">MANUAL MAINTENANCE SETTINGS</div>

          <div className="modify-panel">
            <div className="icon">
              <span>R</span>
            </div>
            <div className="switch-box">
              <CustomizedSwitches leftTitle="Modify" rightTitle="view all" />
            </div>
            <div className="mini-tabs">
              <FrxMiniTabs
                tabList={miniTabs}
                activeTabIndex={activeMiniTabIndex}
                onClickTab={this.onClickMiniTab}
              />
            </div>
          </div>
        </div>

        <div className="bordered details-top">
          <div className="header">tier Assignment</div>
          <div className="inner-container p-20"></div>
        </div>
        <div className="bordered details-top">
          <div className="header">tier definition</div>
          <div className="inner-container p-20"></div>
        </div>
      </div>
    );
  }
}

export default MassMaintenanceTier;
