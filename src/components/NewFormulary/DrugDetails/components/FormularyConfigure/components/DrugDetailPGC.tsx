import React from "react";
import { connect } from "react-redux";
import PanelHeader from "./PanelHeader";
import PanelGrid from "./panelGrid";
import CustomizedSwitches from "./CustomizedSwitches";
import { TabInfo } from "../../../../../../models/tab.model";
import FrxMiniTabs from "../../../../../shared/FrxMiniTabs/FrxMiniTabs";
import NotesPopup from "../../../../../member/MemberNotesPopup";
import Box from "@material-ui/core/Box";
import Button from "../../../../../shared/Frx-components/button/Button";
import RadioButton from "../../../../../shared/Frx-components/radio-button/RadioButton";
import { textFilters } from "../../../../../../utils/grid/filters";
import { getDrugDetailsColumn } from "../DrugGridColumn";
import { getDrugDetailData } from "../../../../../../mocks/DrugGridMock";
import FrxLoader from "../../../../../shared/FrxLoader/FrxLoader";
import DrugGrid from "../../DrugGrid";
import AdvancedSearch from "./search/AdvancedSearch";
import {
  getDrugDetailsPGCSummary,
  getDrugDetailsPGCList,
  getExcludedDrugsPGCList,
} from "../../../../../../redux/slices/formulary/drugDetails/pgc/pgcActionCreation";
import FrxDrugGridContainer from "../../../../../shared/FrxGrid/FrxDrugGridContainer";

function mapDispatchToProps(dispatch) {
  return {
    getDrugDetailsPGCSummary: (a) => dispatch(getDrugDetailsPGCSummary(a)),
    getDrugDetailsPGCList: (a) => dispatch(getDrugDetailsPGCList(a)),
    getExcludedDrugsPGCList: (a) => dispatch(getExcludedDrugsPGCList(a)),
  };
}

class DrugDetailPGC extends React.Component<any, any> {
  state = {
    isSearchOpen: false,
    panelGridTitle1: [
      "PARTIAL GAP COVRAGE",
      "NUMBER OF DRUGS",
      "ADDED DRUGS",
      "REMOVED DRUGS",
    ],
    panelTitleAlignment1: ["center", "center", "center", "center"],
    panelGridValue1: [],
    isNotesOpen: false,
    activeTabIndex: 0,
    columns: null,
    data: [],
    tabs: [
      { id: 1, text: "Replace" },
      { id: 2, text: "Append" },
      { id: 3, text: "Remove" },
    ],
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

    this.props.getDrugDetailsPGCSummary().then((json) => {
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

      console.log("-----The PGC Rows = ", rows);
      console.log("-----THe Columns = ", columns);
      // console.log('-----Data ', data)

      this.setState({
        panelGridValue1: rows,
        columns: columns,
        // data: data,
      });

      this.props.getDrugDetailsPGCList().then((json) => {
        let tmpData = json.payload.result;
        console.log(
          "----------The Get Drug Details PGC list response = ",
          tmpData
        );
        var data: any[] = [];
        let count = 1;
        var gridData = tmpData.map((el) => {
          var element = Object.assign({}, el);
          data.push(element);
          let gridItem = {};
          gridItem["id"] = count;
          gridItem["key"] = count;
          gridItem["labelName"] = element.drug_label_name ? "" + element.drug_label_name : "";
          gridItem["tier"] = element.tier_value;
          gridItem["fileType"] = element.file_type ? "" + element.file_type : "";
          gridItem["dataSource"] = element.data_source ? "" + element.data_source : "";
          gridItem["ndc"] = "";
          gridItem["rxcui"] = element.rxcui ? "" + element.rxcui : "";
          gridItem["gpi"] = element.generic_product_identifier ? "" + element.generic_product_identifier : "";
          gridItem["trademark"] = element.trademark_code ? "" + element.trademark_code : "";
          gridItem["databaseCategory"] = element.database_category ? "" + element.database_category : "";
          gridItem["databaseClass"] = element.database_class ? "" + element.database_class : "";
          gridItem["createdBy"] = element.created_by ? "" + element.created_by : "";
          gridItem["createdOn"] = element.created_date ? "" + element.created_date : "";
          gridItem["modifiedBy"] = element.modified_by ? "" + element.modified_by : "";
          gridItem["modifiedOn"] = element.modified_date ? "" + element.modified_date : "";
          gridItem["paGroupDescription"] = element.pa_group_description ? "" + element.pa_group_description : "";
          gridItem["paType"] = element.pa_type ? "" + element.pa_type : "";
          gridItem["stGroupDescription"] = element.st_group_description ? "" + element.st_group_description : "";
          gridItem["stepTherapyType"] = element.st_type ? "" + element.st_type : "";
          gridItem["stepTherapyValue"] = element.st_value ? "" + element.st_value : "";
          gridItem["qlType"] = element.ql_type ? "" + element.ql_type : "";
          gridItem["qlAmount"] = element.ql_amount ? "" + element.ql_amount : "";
          gridItem["qlDays"] = element.ql_days ? "" + element.ql_days : "";
          gridItem["moIndicator"] = element.is_mo ? "" + element.is_mo : "";
          gridItem["mnIndicator"] = element.is_nm ? "" + element.is_nm : "";
          gridItem["seniorSavingsModel"] = element.is_ssm ? "" + element.is_ssm : "";
          gridItem["indicatedBaseFormulary"] = element.is_ibf ? "" + element.is_ibf : "";
          gridItem["meshCui"] = element.is_ibf ? "" + element.is_ibf : "";
          gridItem["partialGapCoverage"] = element.is_pgc ? "" + element.is_pgc : "";
          count++;
          return gridItem;
        });
        this.setState({
          data: gridData,
        });
      });
    });
  }

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
        // <DrugGrid columns={this.state.columns} data={this.state.data} />
        <FrxDrugGridContainer
          isPinningEnabled={false}
          enableSearch={false}
          enableColumnDrag
          onSearch={() => {}}
          fixedColumnKeys={[]}
          pagintionPosition="topRight"
          gridName="DRUGSDETAILS"
          enableSettings={false}
          columns={getDrugDetailsColumn()}
          scroll={{ x: 5200, y: 377 }}
          isFetchingData={false}
          enableResizingOfColumns
          data={this.state.data}
          rowSelection={{
            columnWidth: 50,
            fixed: true,
            type: "checkbox",
            onChange: () => {},
          }}
        />
      );
    }
    return (
      <>
        <div className="bordered mb-10">
          <PanelHeader
            title="Partial Gap covrage"
            tooltip="Partial Gap Coverage"
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
              <div className="header-with-notes">
                <PanelHeader title="Partial Gap covrage Setting" />
                <svg
                  onClick={this.handleNoteClick}
                  className="note-icon"
                  width="10"
                  height="12"
                  viewBox="0 0 10 12"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7 0L10 3H7V0ZM6 0H1C0.447715 0 0 0.447715 0 1V11C0 11.5523 0.447715 12 1 12H9C9.55229 12 10 11.5523 10 11V4H7H6V0Z"
                    fill="#2055B5"
                  ></path>
                </svg>
                {this.state.isNotesOpen ? (
                  <NotesPopup
                    category="Grievances"
                    openPopup={this.state.isNotesOpen}
                    onClose={this.handleCloseNote}
                  />
                ) : (
                  ""
                )}
              </div>
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
                    disabledIndex={1}
                  />
                </div>
              </div>
              <div className="settings-form">
                <label>What File Type Is This Gap Coverage For?</label>
                <div className="marketing-material radio-group">
                  <RadioButton
                    label="Formulary/OTC"
                    name="marketing-material-radio"
                    checked
                  />
                  <RadioButton
                    label="Excluded"
                    name="marketing-material-radio"
                  />
                </div>
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

export default connect(null, mapDispatchToProps)(DrugDetailPGC);
