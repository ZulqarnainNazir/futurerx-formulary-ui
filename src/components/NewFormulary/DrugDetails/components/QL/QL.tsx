import React from "react";
import { connect } from "react-redux";

import { Grid } from "@material-ui/core";
import FrxMiniTabs from "../../../../shared/FrxMiniTabs/FrxMiniTabs";
import Button from "../../../../shared/Frx-components/button/Button";
import FrxDrugGridContainer from "../../../../shared/FrxGrid/FrxDrugGridContainer";
import {
  getTapList,
  getMiniTabs,
} from "../../../../../mocks/formulary/mock-data";

import CustomizedSwitches from "./../../../DrugDetails/components/FormularyConfigure/components/CustomizedSwitches";
import PanelHeader from "../../../../shared/Frx-components/panel-header/PanelHeader";
import PanelGrid from "../../../../shared/Frx-components/panel-grid/PanelGrid";

import { TabInfo } from "../../../../../models/tab.model";
import { getTier } from "../../../../../redux/slices/formulary/tier/tierActionCreation";
import Replace from "./components/Replace";
import FillLimitSettings from "./components/FillLimitSettings";
import {
  getQlSummary,
  postApplyFormularyDrugQl,
  postFormularyDrugQl,
  // postApplyFormularyDrugQl
} from "../../../../../redux/slices/formulary/ql/qlActionCreation";
import * as constants from "../../../../../api/http-commons";
import { QlColumns } from "../../../../../utils/grid/columns";

function mapDispatchToProps(dispatch) {
  return {
    getTier: (a) => dispatch(getTier(a)),
    getQlSummary: (a) => dispatch(getQlSummary(a)),
    postFormularyDrugQl: (a) => dispatch(postFormularyDrugQl(a)),
  };
}

function mapStateToProps(state) {
  return {
    current_formulary: state.application.formulary,
    qlData: state.qlReducer.data,
    // inState: state,
  };
}

interface tabsState {
  activeMiniTabIndex: number;
  miniTabs: any;
  tabs: any;
  tierGridContainer: boolean;
  activeTabIndex: any;
  panelGridValue: any;
  drugGridData: any;
}

class Tier extends React.Component<any, tabsState> {
  state = {
    tierGridContainer: false,
    miniTabs: getMiniTabs(),
    isFetchingData: false,
    activeMiniTabIndex: 0,
    activeTabIndex: 0,
    tabs: [
      { id: 1, text: "Replace" },
      { id: 2, text: "Append" },
      { id: 3, text: "Remove" },
    ],
    panelGridTitle: ["", "NUMBER OF DRUGS", "ADDED DRUGS", "REMOVED DRUGS"],
    panelGridValue: [
      ["QL Type 1", "2", "2", "2"],
      ["QL Type 2", "1", "1", "1"],
      ["QL Type 9", "1", "1", "1"],
    ],
    drugGridData: [],
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

  renderTabContent = () => {
    const activeTabIndex = this.state.activeTabIndex;
    switch (activeTabIndex) {
      case 0:
        return <Replace />;
      case 1:
        return <Replace />;
      case 2:
        return <div>Remove</div>;
    }
  };

  onClickMiniTab = (num: number) => {
    this.setState({
      activeMiniTabIndex: num,
    });
  };

  openTierGridContainer = () => {
    this.setState({ tierGridContainer: true });

    // apiDetails["lob_type"] = this.props.formulary_lob_id;
    // apiDetails["pathParams"] =
    //   this.props?.formulary_id +
    //   "/" +
    //   this.state.fileType +
    //   "/" +
    //   constants.TYPE_REPLACE;
    // apiDetails["keyVals"] = [
    //   { key: constants.KEY_ENTITY_ID, value: this.props?.formulary_id },
    // ];
    // apiDetails["messageBody"] = {};
    // apiDetails["messageBody"]["selected_drug_ids"] = this.state.selectedDrugs;
    // apiDetails["messageBody"][
    //   "base_pa_group_description_id"
    // ] = this.state.selectedGroupDescription;
    // apiDetails["messageBody"][
    //   "id_pa_group_description"
    // ] = this.state.selectedLastestedVersion;
    // apiDetails["messageBody"]["id_pa_type"] = Number(this.state.selectedPaType);
    // apiDetails["messageBody"]["search_key"] = "";
    let apiDetails = {
      lob_type: "Comm",
      formulary_id: this.props.current_formulary.id_formulary,
      pathParams:
        this.props.current_formulary.id_formulary +
        "/" +
        this.props.current_formulary.formulary_type_info.formulary_type_code,
      keyVals: [
        // { key: constants.KEY_ENTITY_ID, value: this.props?.formulary_id },
        { key: constants.KEY_INDEX, value: 0 },
        { key: constants.KEY_LIMIT, value: 10 },
      ],
    };
    console.log("[apiDetails]:", apiDetails);
    this.props.postFormularyDrugQl(apiDetails).then((json) => {
      console.log("[QlDetail]:", json.payload);
      this.loadGridData(json);
    });
  };

  loadGridData(json: any) {
    {
      let tmpData = json.payload.result;
      var data: any[] = [];
      let count = 1;
      var gridData: any = tmpData.map(function (el) {
        var element = Object.assign({}, el);
        data.push(element);
        let gridItem = {};
        gridItem["id"] = count;
        gridItem["key"] = count;
        gridItem["covered_genders"] = element.covered_genders;
        gridItem["covered_icds"] = element.covered_icds;
        gridItem["covered_max_ages"] = element.covered_max_ages;
        gridItem["covered_max_operators"] = element.covered_max_operators
          ? "" + element.covered_max_operators
          : "";
        gridItem["covered_min_ages"] = element.covered_min_ages
          ? "" + element.covered_min_ages
          : "";
        gridItem["drug_label_name"] = element.drug_label_name
          ? "" + element.drug_label_name
          : "";
        gridItem["covered_min_operators"] = "";
        gridItem[
          "covered_patient_residences"
        ] = element.covered_patient_residences
          ? "" + element.covered_patient_residences
          : "";
        gridItem[
          "covered_pharmacy_networks"
        ] = element.covered_pharmacy_networks
          ? "" + element.covered_pharmacy_networks
          : "";
        gridItem["trademark_code"] = element.trademark_code
          ? "" + element.trademark_code
          : "";
        gridItem["database_category"] = element.database_category
          ? "" + element.database_category
          : "";
        count++;
        return gridItem;
      });
      this.setState({
        // drugData: data,
        drugGridData: gridData,
      });
    }
  }

  componentDidMount() {
    // this.props.getTier("1").then((json) => {
    //   console.log("*******************************" + json);
    //   console.log(json.payload.data);
    //   //this.setState({panelGridValue: json.payload.data});

    // });
    this.props
      .getQlSummary(this.props.current_formulary.id_formulary)
      .then((json) => {
        console.log("[json.payload]", json.payload);

        let tmpData =
          json.payload && json.payload.result ? json.payload.result : [];

        var rows = tmpData.map(function (el) {
          var curRow = [
            el["ql_type_name"],
            el["total_group_description_count"],
            el["added_group_description_count"],
            el["removed_group_description_count"],
          ];
          return curRow;
        });

        console.log(rows);
        this.setState({
          panelGridValue: rows,
        });
        // this.setState({ panelGridValue: json.payload.result });
      });
    console.log("in ql, [curenformulary]:", this.props.current_formulary);
  }

  render() {
    console.log("in ql [data]", this.props.qlData);
    return (
      <div className="drug-detail-LA-root">
        <div className="drug-detail-la-container">
          <div className="drug-detail-la-inner">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <div className="mb-10">
                  <div className="limited-access">
                    <PanelHeader
                      title="SELECT Quantity Limit CRITERIA"
                      tooltip="This section allows for Addition or Removal of product only. To define coverage for all Medicare covered and/or Supplemental products, go to Drug Details"
                    />
                    <div className="inner-container tier-checkbox white-bg">
                      <PanelGrid
                        panelGridTitle={this.state.panelGridTitle}
                        panelGridValue={this.state.panelGridValue}
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-10">
                  <div className="limited-access">
                    <PanelHeader title="QUANTITY LIMIT SETTINGS" />
                    <div className="modify-wrapper white-bg tier-modify-panel">
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
                    <div className="tab-content">{this.renderTabContent()}</div>
                  </div>
                </div>
                <div className="mb-10">
                  <div className="limited-access">
                    <PanelHeader title="FILL LIMIT SETTINGS" />
                    <FillLimitSettings />
                  </div>
                </div>
              </Grid>
              <div
                className="apply-button"
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  width: "100%",
                }}
              >
                <Button
                  label="Apply"
                  onClick={this.openTierGridContainer}
                  // disabled={this.props.configureSwitch}
                ></Button>
              </div>
            </Grid>
            {this.state.tierGridContainer && (
              <div className="select-drug-from-table">
                <div className="bordered white-bg">
                  <div
                    className="header space-between pr-10"
                    style={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <div className="button-wrapper">
                      <Button
                        className="Button normal"
                        label="Advance Search"
                        // onClick={this.advanceSearchClickHandler}
                      />
                      <Button
                        label="Save"
                        // onClick={this.handleSave}
                      />
                    </div>
                  </div>

                  <div className="tier-grid-container">
                    <FrxDrugGridContainer
                      isPinningEnabled={false}
                      enableSearch={false}
                      enableColumnDrag
                      onSearch={() => {}}
                      fixedColumnKeys={[]}
                      pagintionPosition="topRight"
                      gridName="DRUG GRID"
                      enableSettings={false}
                      columns={QlColumns()}
                      scroll={{ x: 2000, y: 377 }}
                      isFetchingData={false}
                      enableResizingOfColumns
                      data={this.state.drugGridData}
                      rowSelection={{
                        // columnWidth: 50,
                        // fixed: true,
                        type: "checkbox",
                        onChange: () => {},
                        //this.onSelectedTableRowChanged,
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tier);
