import React from "react";
import { connect } from "react-redux";
import PanelHeader from "../../../../shared/Frx-components/panel-header/PanelHeader";
import PanelGrid from "../../../../shared/Frx-components/panel-grid/PanelGrid";
import CustomizedSwitches from "../FormularyConfigure/components/CustomizedSwitches";
import { TabInfo } from "../../../../../models/tab.model";
import FrxMiniTabs from "../../../../shared/FrxMiniTabs/FrxMiniTabs";
import Button from "../../../../shared/Frx-components/button/Button";
import { getDrugDetailsColumnPN } from "../../../DrugDetails/components/FormularyConfigure/DrugGridColumn";
import { getDrugDetailData } from "../../../../../mocks/DrugGridMock";
import FrxLoader from "../../../../shared/FrxLoader/FrxLoader";
import DrugGrid from "../../../DrugDetails/components/DrugGrid";
import AdvancedSearch from "../../../DrugDetails/components/FormularyConfigure/components/search/AdvancedSearch";
import { getDrugDetailsPNSummary } from "../../../../../redux/slices/formulary/drugDetails/pn/pnActionCreation";
import * as pnConstants from "../../../../../api/http-drug-details";

import PnLimitSettings from "./PnLimitSettings";

function mapDispatchToProps(dispatch) {
  return {
    getDrugDetailsPNSummary: (a) => dispatch(getDrugDetailsPNSummary(a)),
  };
}

const mapStateToProps = (state) => {
  return {
    formulary_id: state?.application?.formulary_id,
  };
};

class DrugDetailPN extends React.Component<any, any> {
  state = {
    isSearchOpen: false,
    panelGridTitle1: ["", "NUMBER OF DRUGS", "ADDED DRUGS", "REMOVED DRUGS"],
    panelTitleAlignment1: ["center", "center", "center", "center"],
    panelGridValue1: [],
    isNotesOpen: false,
    activeTabIndex: 0,
    columns: null,
    data: null,
    tabs: [
      { id: 1, text: "Replace" },
      { id: 2, text: "Append" },
      { id: 3, text: "Remove" },
    ],
  };

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

  getPNSummary = () => {
    let apiDetails = {};
    apiDetails["apiPart"] = pnConstants.GET_DRUG_SUMMARY_PN;
    apiDetails["pathParams"] = this.props?.formulary_id;
    apiDetails["keyVals"] = [{ key: pnConstants.KEY_ENTITY_ID, value: this.props?.formulary_id }];

    this.props.getDrugDetailsPNSummary(apiDetails).then((json) => {
      let tmpData = json.payload && json.payload.result ? json.payload.result : [];
      console.log("The PN Temp Data = ", tmpData);

      let rows = tmpData.map((ele) => {
        let curRow = [
          ele["attribute_name"],
          ele["total_drug_count"],
          ele["added_drug_count"],
          ele["removed_drug_count"],
        ];
        return curRow;
      });
      console.log("The PN Rows = ", rows);

      this.setState({
        panelGridValue1: rows,
      });
    });
  }

  componentDidMount() {
    const data = getDrugDetailData();
    const columns = getDrugDetailsColumnPN();
    this.setState({
      columns: columns,
      data: data,
    });
    this.getPNSummary();
  }

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

  render() {
    let dataGrid = <FrxLoader />;
    if (this.state.data) {
      dataGrid = (
        <DrugGrid columns={this.state.columns} data={this.state.data} />
      );
    }
    return (
      <>
        <div className="bordered mb-10">
          <PanelHeader title="pharmacy network" tooltip="pharmacy network" />
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

        <PnLimitSettings />

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
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrugDetailPN);