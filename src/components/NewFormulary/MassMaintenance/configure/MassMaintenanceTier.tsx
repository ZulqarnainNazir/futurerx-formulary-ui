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
  };
  addNew = () => {};
  render() {
    const { gridData, gridColumns } = this.state;
    return (
      <>
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
        <div className="bordered details-top">
          <div className="header">MANUAL MAINTENANCE SETTINGS</div>
          <div className="inner-container">
            <div className="modify-panel">
              <div className="icon">
                <span>R</span>
              </div>
              <div className="switch-box">
                <CustomizedSwitches leftTitle="Modify" rightTitle="view all" />
              </div>
              <div className="mini-tabs">
                {/* <FrxMiniTabs
                  tabList={this.state.miniTabs}
                  activeTabIndex={this.state.activeMiniTabIndex}
                  onClickTab={this.onClickMiniTab}
                /> */}
              </div>
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
      </>
    );
  }
}

export default MassMaintenanceTier;
