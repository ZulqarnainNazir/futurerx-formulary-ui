import React from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import PanelHeader from "./PanelHeader";
import PanelGrid from "./panelGrid";
import CustomizedSwitches from "./CustomizedSwitches";
import { TabInfo } from "../../../../../../models/tab.model";
import FrxMiniTabs from "../../../../../shared/FrxMiniTabs/FrxMiniTabs";
import Box from "@material-ui/core/Box";
import Button from "../../../../../shared/Frx-components/button/Button";
import { textFilters } from "../../../../../../utils/grid/filters";
import { getDrugDetailsColumn } from "../DrugGridColumn";
import { getDrugDetailData } from "../../../../../../mocks/DrugGridMock";
import FrxLoader from "../../../../../shared/FrxLoader/FrxLoader";
import DrugGrid from "../../DrugGrid";
import AdvancedSearch from "./search/AdvancedSearch";
import { getDrugDetailsSSMSummary } from "../../../../../../redux/slices/formulary/drugDetails/ssm/ssmActionCreation";

function mapDispatchToProps(dispatch) {
  return {
    getDrugDetailsSSMSummary: (a) => dispatch(getDrugDetailsSSMSummary(a)),
  };
}

class SSM extends React.Component<any, any> {
  state = {
    isSearchOpen: false,
    panelGridTitle1: [
      "Senior Saving Model",
      "Number of Drugs",
      "added drugs",
      "removed drugs",
    ],
    panelTitleAlignment1: ["left", "left", "left", "left"],
    panelGridValue1: [],
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

  componentDidMount() {
    const data = getDrugDetailData();
    const columns = getDrugDetailsColumn();
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

    // this.setState({
    //   columns: columns,
    //   data: data,
    // });

    this.props.getDrugDetailsSSMSummary().then((json) => {
      let tmpData =
        json.payload && json.payload.result ? json.payload.result : [];

      let rows = tmpData.map((ele) => {
        let curRow = [
          ele["attribute_name"],
          ele["total_drug_count"],
          ele["added_drug_count"],
          ele["removed_drug_count"],
        ];
        return curRow;
      });

      this.setState({
        panelGridValue1: rows,
        columns: columns,
        data: data,
      });
    });
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
          <PanelHeader
            title="Senior Saving Model"
            tooltip="Define Senior Savings Model Designation in Drug Grid below for marketing material considerations."
          />
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
                    disabled
                    disabledIndex={1}
                  />
                </div>
              </div>
              <div className="settings-form">
                <Grid container>
                  <Grid item xs={6}>
                    <div className="group">
                      <label>
                        Contract Id <span className="astrict">*</span>
                      </label>
                      <input type="text" />
                    </div>
                    <div className="group">
                      <label>
                        PBP Id <span className="astrict">*</span>
                      </label>
                      <input type="text" />
                    </div>
                  </Grid>
                  <Grid item xs={6}>
                    <div className="group">
                      <label>
                        copay <span className="astrict">*</span>
                      </label>
                      <input type="text" />
                    </div>
                  </Grid>
                </Grid>
                <Box display="flex" justifyContent="flex-end">
                  <Button
                    label="Apply"
                    disabled
                    onClick={this.settingFormApplyHandler}
                  />
                </Box>
              </div>
            </div>
          </div>
        </div>
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

export default connect(null, mapDispatchToProps)(SSM);
