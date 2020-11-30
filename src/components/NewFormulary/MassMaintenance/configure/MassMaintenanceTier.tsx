import React, { Component } from "react";

import IconInfo from "../../../../assets/icons/IconInfo.svg";
import PlusIcon from "../../../../assets/icons/PlusIcon.svg";
import {
  getColumns,
  getData,
} from "../../../../mocks/formulary-grid/FormularySimpleGridMock";
import { TabInfo } from "../../../../models/tab.model";
import SimpleGrid from "../../../shared/Frx-formulary/SimpleGrid/SimpleGrid";
import FrxMiniTabs from "../../../shared/FrxMiniTabs/FrxMiniTabs";
import CustomizedSwitches from "../../DrugDetails/components/FormularyConfigure/components/CustomizedSwitches";
import Button from "../../../shared/Frx-components/button/Button";
import AdvancedSearch from "../../DrugDetails/components/FormularyConfigure/components/search/AdvancedSearch";
import DropDown from "../../../shared/Frx-components/dropdown/DropDown";
import RadioButton from "../../../shared/Frx-components/radio-button/RadioButton";
import CustomDatePicker from "../../../shared/Frx-components/date-picker/CustomDatePicker";
import { Input } from "antd";
import FrxLoader from "../../../shared/FrxLoader/FrxLoader";

import { getFormularyGridData } from "../../../../mocks/formulary-grid/FormularyGridData";
// import FormularyGrid from "./FormularyGrid";
import DrugGrid from "../../DrugDetails/components/DrugGrid";
import { getFormularyGridColumns } from "../../../../mocks/formulary-grid/FormularyGridColumn";

class MassMaintenanceTier extends Component {
  state = {
    isSearchOpen: false,
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
    isFormularyGridShown: false,
    columns: null,
    data: null,
    pinData: {
      value: false,
    },
    scroll: {
      x: 960,
      y: 450,
    },
  };
  addNew = () => {};
  advanceSearchClickHandler = (event) => {
    event.stopPropagation();
    this.setState({ isSearchOpen: !this.state.isSearchOpen });
  };
  advanceSearchClosekHandler = () => {
    this.setState({ isSearchOpen: !this.state.isSearchOpen });
  };
  saveClickHandler = () => {
    console.log("Save data");
  };
  onClickMiniTab = (selectedTabIndex: number) => {
    let activeTabIndex = 0;

    const tabs = this.state.miniTabs.map((tab: TabInfo, index: number) => {
      if (index === selectedTabIndex) {
        activeTabIndex = index;
      }
      return tab;
    });
    this.setState({ miniTabs: tabs, activeMiniTabIndex: activeTabIndex });
  };
  rowSelectionChange = (r) => {
    console.log(r);
  };
  componentDidMount() {
    this.setState({
      columns: getFormularyGridColumns(),
      data: getFormularyGridData(),
    });
  }
  render() {
    const {
      gridData,
      gridColumns,
      miniTabs,
      activeMiniTabIndex,
      isSearchOpen,
    } = this.state;

    const { isFormularyGridShown, columns, data, scroll, pinData } = this.state;
    let dataGrid = <FrxLoader />;
    if (data) {
      // dataGrid = (
      //   <FormularyGrid
      //     columns={columns}
      //     data={data}
      //     bordered={false}
      //     rowSelectionChange={this.rowSelectionChange}
      //     enableSettings={false}
      //     isPinningEnabled={false}
      //   />
      // );
      dataGrid = (
        <DrugGrid
          columns={columns}
          data={data}
          scroll={scroll}
          pinData={pinData}
        />
      );
    }
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

        <div className="bordered mm-configure details-top">
          <div className="header">
            <div className="mini-container">
              <div>tier Assignment</div>
              <div>
                <DropDown
                  placeholder="FRF"
                  options={["FRF", "Non FRF", "OTC", "ADD File", "Excluded"]}
                />
              </div>
            </div>
            <div className="button-wrapper">
              <Button
                className="Button normal"
                label="Advance Search"
                onClick={this.advanceSearchClickHandler}
              />
              <Button label="Save" onClick={this.saveClickHandler} disabled />
            </div>
          </div>

          <div className="inner-container mm-configure-grid p-20">
            {dataGrid}
            {isSearchOpen ? (
              <AdvancedSearch
                category="Grievances"
                openPopup={isSearchOpen}
                onClose={this.advanceSearchClosekHandler}
              />
            ) : null}
          </div>
        </div>
        <div className="bordered details-top">
          <div className="header">tier definition</div>
          <div className="inner-container p-20">
            <div></div>
          </div>
        </div>
      </div>
    );
  }
}

export default MassMaintenanceTier;
