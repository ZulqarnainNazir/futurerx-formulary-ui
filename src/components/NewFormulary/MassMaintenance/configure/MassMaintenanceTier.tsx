import React, { Component } from "react";

import IconInfo from "../../../../assets/icons/IconInfo.svg";
import PlusIcon from "../../../../assets/icons/PlusIcon.svg";
import {
  getColumns,
  getData,
  getDrugsList,
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
import SimpleSearch from "../../../communication/Search/SimpleSearch/SimpleSearch";

import {
  getFormularyGridData,
  getTierAssignmentGridData,
} from "../../../../mocks/formulary-grid/FormularyGridData";
// import FormularyGrid from "./FormularyGrid";
import DrugGrid from "../../DrugDetails/components/DrugGrid";
import {
  getFormularyGridColumns,
  getTierAssignmentGridColumns,
} from "../../../../mocks/formulary-grid/FormularyGridColumn";
import RoundedSimpleSearch from "../../../communication/Search/SimpleSearch/RoundedSimpleSearch";
import { drugData } from "../../../../mocks/BestPriceDrugMock";

class MassMaintenanceTier extends Component {
  state = {
    isSearchOpen: false,
    gridData: getData(),
    gridColumns: getColumns(),
    drugsList: getDrugsList(),
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
      columns: getTierAssignmentGridColumns(),
      data: getTierAssignmentGridData(),
    });
  }
  handleSearch = (searchObject: any) => {
    // this.setState({ isFetchingData: true });
    // if (searchObject) {
    // setTimeout(() => {
    //   const newData = this.state.data.filter((item: any) =>
    //     Object.keys(item)
    //       .map((_item: any) =>
    //         item[_item]
    //           .toString()
    //           .toLocaleLowerCase()
    //           .includes(searchObject.searchText.toLocaleLowerCase())
    //       )
    //       .includes(true)
    //   );
    //   this.setState({ isFetchingData: false, filteredData: newData });
    // }, 2000);
    // } else {
    // this.setState({ isFetchingData: false });
    // }
  };
  render() {
    const {
      gridData,
      gridColumns,
      miniTabs,
      activeMiniTabIndex,
      isSearchOpen,
      drugsList,
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
        <div className="bordered sections-root details-top">
          <div className="header">tier definition</div>
          <div className="inner-container">
            <div className="sections-root-grid-container">
              <div className="bordered drugs-list-container">
                <div className="header">selected drugs</div>
                <div className="inner-container drugs-list scroll-bar">
                  <RoundedSimpleSearch
                    onSearch={this.handleSearch}
                    placeholder="Search..."
                  />
                  {drugsList.map((el) => (
                    <div className="list-items">{el.drug}</div>
                  ))}
                </div>
              </div>
              <div className="drug-tiers-card p-7">
                {gridData.map((drug) => (
                  <div className="bordered m-b-5">
                    <div className="header">{drug.formularyName}</div>
                    <div className="inner-container drugs-flex-container">
                      <div className="p-b-15 font-style">New Tier</div>
                      <div>
                        <div className="mini-flex-container">
                          <input type="checkbox" name="" id="" />
                          <span className="font-style">Keep current tier?</span>
                        </div>
                        <SimpleGrid
                          columns={[
                            {
                              title: "TIER NUMBER",
                              dataIndex: "tierNumber",
                              key: "tierNumber",
                              className: "table-head-color",
                              render: (tierNumber) => (
                                <DropDown
                                  placeholder={tierNumber}
                                  options={[0, 1, 2, 3]}
                                />
                              ),
                            },
                            {
                              title: "TIER DESCRIPTION",
                              dataIndex: "tierDesc",
                              key: "tierDesc",
                              className: "table-head-color large-width",
                            },
                          ]}
                          data={[
                            {
                              tierNumber: drug.tier.tierId,
                              tierDesc: drug.tier.tierDescription,
                            },
                          ]}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="button-container-right">
            <span className="white-bg-btn">
              <Button label="Cancel" onClick={() => {}} />
            </span>
            <Button label="Save" onClick={() => {}} />
          </div>
        </div>
        <div className="button-container-right-root">
          <span className="white-bg-btn">
            <Button
              label="Assign Additional Drugs to Tier"
              onClick={() => {}}
            />
          </span>
          <Button label="Continue to Drug Edits" onClick={() => {}} />
        </div>
      </div>
    );
  }
}

export default MassMaintenanceTier;
