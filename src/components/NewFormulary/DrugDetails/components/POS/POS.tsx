import React from "react";
import { connect } from "react-redux";
import PanelHeader from "../../../../shared/Frx-components/panel-header/PanelHeader";
import PanelGrid from "../../../../shared/Frx-components/panel-grid/PanelGrid";
import CustomizedSwitches from "../FormularyConfigure/components/CustomizedSwitches";
import { TabInfo } from "../../../../../models/tab.model";
import FrxMiniTabs from "../../../../shared/FrxMiniTabs/FrxMiniTabs";
import Button from "../../../../shared/Frx-components/button/Button";
import { textFilters } from "../../../../../utils/grid/filters";
import { getDrugDetailsColumn } from "../../../DrugDetails/components/FormularyConfigure/DrugGridColumn";
import { getDrugDetailData } from "../../../../../mocks/DrugGridMock";
import FrxLoader from "../../../../shared/FrxLoader/FrxLoader";
import DrugGrid from "../../../DrugDetails/components/DrugGrid";
import AdvancedSearch from "../../../DrugDetails/components/FormularyConfigure/components/search/AdvancedSearch";
import {
  getDrugDetailsPOSSummary,
  getDrugDetailsPOSSettings,
} from "../../../../../redux/slices/formulary/drugDetails/pos/posActionCreation";
import * as posConstants from "../../../../../api/http-drug-details";

import PosSettings from "./PosSettings";

function mapDispatchToProps(dispatch) {
  return {
    getDrugDetailsPOSSummary: (a) => dispatch(getDrugDetailsPOSSummary(a)),
    getDrugDetailsPOSSettings: (a) => dispatch(getDrugDetailsPOSSettings(a)),
  };
}

const mapStateToProps = (state) => {
  return {
    formulary_id: state?.application?.formulary_id,
  };
};

// GET_DRUG_SETTING_POS

class DrugDetailPOS extends React.Component<any, any> {
  state = {
    isSearchOpen: false,
    panelGridTitle1: ["", "NUMBER OF DRUGS", "ADDED DRUGS", "REMOVED DRUGS"],
    panelTitleAlignment1: ["center", "center", "center", "center"],
    panelGridValue1: [],
    posSettings: [],
    isNotesOpen: false,
    activeTabIndex: 0,
    columns: null,
    data: null,
    tabs: [
      { id: 1, text: "Replace" },
      { id: 2, text: "Append" },
      { id: 3, text: "Remove" },
    ],

    isSelectAll: false,
    showGrid: false,
  };

  componentDidMount() {
    const columns = getDrugDetailsColumn();
    const data = getDrugDetailData();
    const FFFColumn: any = {
      id: 0,
      position: 0,
      textCase: "upper",
      pixelWidth: 238,
      sorter: {},
      isFilterable: true,
      showToolTip: false,
      key: "fff",
      displayTitle: "Free First Fill",
      filters: textFilters,
      dataType: "string",
      hidden: false,
      sortDirections: [],
    };
    columns.unshift(FFFColumn);
    for (let el of data) {
      el["fff"] = "Y";
    }
    this.setState({
      columns: columns,
      data: data,
    });
    this.getPOSSummary();
    this.getPOSSettings();
  }
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

  getPOSSummary = () => {
    let apiDetails = {};
    apiDetails["apiPart"] = posConstants.GET_DRUG_SUMMARY_POS;
    apiDetails["pathParams"] = this.props?.formulary_id;
    apiDetails["keyVals"] = [
      { key: posConstants.KEY_ENTITY_ID, value: this.props?.formulary_id },
    ];

    console.log("apiDetails 1: ", apiDetails);
    this.props.getDrugDetailsPOSSummary(apiDetails).then((json) => {
      let tmpData =
        json.payload && json.payload.result ? json.payload.result : [];
      // console.log("The POS Temp Data = ", tmpData);

      let rows = tmpData.map((ele) => {
        let curRow = [
          ele["attribute_name"],
          ele["total_drug_count"],
          ele["added_drug_count"],
          ele["removed_drug_count"],
        ];
        return curRow;
      });
      console.log("The POS Rows = ", rows);

      this.setState({
        panelGridValue1: rows,
      });
    });
  };

  getPOSSettings = () => {
    let apiDetails = {};
    apiDetails["apiPart"] = posConstants.GET_DRUG_SETTING_POS;
    // apiDetails["pathParams"] = this.props?.formulary_id;
    // apiDetails["keyVals"] = [
    //   { key: posConstants.KEY_ENTITY_ID, value: this.props?.formulary_id },
    // ];

    console.log("apiDetails: ", apiDetails);
    this.props.getDrugDetailsPOSSettings(apiDetails).then((json) => {
      const posSettings =
        json.payload && json.payload.data ? json.payload.data : [];

      posSettings.forEach((s) => {
        s["isChecked"] = false;
      });
      this.setState({
        posSettings,
      });
    });
  };

  serviceSettingsChecked = (e) => {
    // console.log(e.target.id);
    // console.log(e.target.name);
    // console.log(e.target.checked);

    const { posSettings } = this.state;

    posSettings.forEach((s: any) => {
      if (s.id_place_of_service_type === e.target.id) {
        s.isChecked = e.target.checked;
      }
    });

    this.setState({
      posSettings,
    });
  };

  handleSelectAll = () => {
    const { posSettings, isSelectAll } = this.state;
    posSettings.forEach((s: any) => {
      s.isChecked = !isSelectAll;
    });

    this.setState({
      posSettings,
      isSelectAll: !isSelectAll,
    });
  };

  onClickTab = (selectedTabIndex: number) => {
    let activeTabIndex = 0;

    const tabs = this.state.tabs.map((tab: TabInfo, index: number) => {
      if (index === selectedTabIndex) {
        activeTabIndex = index;
      }
      return tab;
    });
    this.setState({ tabs, activeTabIndex });
  };

  handleNoteClick = (event: React.ChangeEvent<{}>) => {
    event.stopPropagation();
    this.setState({ isNotesOpen: !this.state.isNotesOpen });
  };

  handleCloseNote = () => {
    this.setState({ isNotesOpen: !this.state.isNotesOpen });
  };

  settingFormApplyHandler = () => {
    alert(1);
  };

  showGridHandler = () => {
    this.setState({
      showGrid: !this.state.showGrid,
    });
  };
  render() {
    let dataGrid = <FrxLoader />;
    if (this.state.data) {
      dataGrid = (
        <DrugGrid columns={this.state.columns} data={this.state.data} />
      );
    }
    const { posSettings, isSelectAll, showGrid } = this.state;
    return (
      <>
        <div className="bordered mb-10">
          <PanelHeader title="place of service" tooltip="place of service" />
          <div className="inner-container bg-light-grey">
            <div className="mb-10">
              <PanelGrid
                panelGridTitle={this.state.panelGridTitle1}
                panelGridValue={this.state.panelGridValue1}
                panelTitleAlignment={this.state.panelTitleAlignment1}
              />
            </div>
            <div className="modify-wrapper bordered white-bg">
              <div className="modify-panel">
                <div className="icon">
                  <span>R</span>
                </div>
                <div className="switch-box">
                  <CustomizedSwitches
                    leftTitle="Modify"
                    rightTitle="view all"
                  />
                </div>
                <div className="mini-tabs">
                  <FrxMiniTabs
                    tabList={this.state.tabs}
                    activeTabIndex={this.state.activeTabIndex}
                    onClickTab={this.onClickTab}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <PosSettings
          posSettingsServies={posSettings}
          serviceSettingsChecked={this.serviceSettingsChecked}
          selectAllHandler={{
            isSelectAll: isSelectAll,
            handleSelectAll: this.handleSelectAll,
          }}
          showGridHandler={this.showGridHandler}
        />

        {showGrid ? (
          <div className="bordered">
            <div className="header space-between pr-10">
              Drug Grid
              <div className="button-wrapper">
                <Button
                  className="Button normal"
                  label="Advance Search"
                  onClick={this.advanceSearchClickHandler}
                />
                <Button label="Save" onClick={this.saveClickHandler} disabled />
              </div>
            </div>
            {dataGrid}
            {this.state.isSearchOpen ? (
              <AdvancedSearch
                category="Grievances"
                openPopup={this.state.isSearchOpen}
                onClose={this.advanceSearchClosekHandler}
              />
            ) : null}
          </div>
        ) : null}
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrugDetailPOS);
