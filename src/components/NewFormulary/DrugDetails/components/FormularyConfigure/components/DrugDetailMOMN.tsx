import React from "react";
import { connect } from "react-redux";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import PanelHeader from "./PanelHeader";
import PanelGrid from "./panelGrid";
import CustomizedSwitches from "./CustomizedSwitches";
import { TabInfo } from "../../../../../../models/tab.model";
import FrxMiniTabs from "../../../../../shared/FrxMiniTabs/FrxMiniTabs";
import NotesPopup from "../../../../../member/MemberNotesPopup";
import Box from "@material-ui/core/Box";
import Button from "../../../../../shared/Frx-components/button/Button";
import { textFilters } from "../../../../../../utils/grid/filters";
import { getDrugDetailsColumn } from "../DrugGridColumn";
import { getDrugDetailData } from "../../../../../../mocks/DrugGridMock";
import FrxLoader from "../../../../../shared/FrxLoader/FrxLoader";
import AdvancedSearch from "./search/AdvancedSearch";
import {
  getDrugDetailsMOMNSummary,
  getDrugDetailsMOList,
  postReplaceMONMDrug,
  postRemoveMONMDrug,
} from "../../../../../../redux/slices/formulary/drugDetails/drugDetailMOMN/drugDetailMOMNActionCreation";
import FrxDrugGridContainer from "../../../../../shared/FrxGrid/FrxDrugGridContainer";
import getLobCode from "../../../../Utils/LobUtils";
import * as momnConstants from "../../../../../../api/http-drug-details";
import showMessage from "../../../../Utils/Toast";

function mapDispatchToProps(dispatch) {
  return {
    getDrugDetailsMOMNSummary: (a) => dispatch(getDrugDetailsMOMNSummary(a)),
    getDrugDetailsMOList: (a) => dispatch(getDrugDetailsMOList(a)),
    postReplaceMONMDrug: (a) => dispatch(postReplaceMONMDrug(a)),
    postRemoveMONMDrug: (a) => dispatch(postRemoveMONMDrug(a)),
  };
}

const mapStateToProps = (state) => {
  return {
    formulary_id: state?.application?.formulary_id,
    formulary_lob_id: state?.application?.formulary_lob_id,
  };
};

const defaultListPayload = {
  index: 0,
  limit: 10,
}

class DrugDetailMOMN extends React.Component<any, any> {
  state = {
    isSearchOpen: false,
    panelGridTitle1: ["", "NUMBER OF DRUGS", "ADDED DRUGS", "REMOVED DRUGS"],
    panelTitleAlignment1: ["left", "center", "center", "center"],
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
    selectedDrugs: Array(),
    drugData: Array(),
    lobCode: null,
    indicatorMM: "",
    showDG: false,
    listCount: 0,
  };

  listPayload: any = {
    index: 0,
    limit: 10,
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
    if (this.state.selectedDrugs && this.state.selectedDrugs.length > 0) {
      let apiDetails = {};
      apiDetails["apiPart"] = momnConstants.APPLY_MONM_DRUG;
      apiDetails["keyVals"] = [
        { key: momnConstants.KEY_ENTITY_ID, value: this.props?.formulary_id },
      ];
      apiDetails["messageBody"] = {};
      apiDetails["messageBody"]["selected_drug_ids"] = this.state.selectedDrugs;
      apiDetails["messageBody"]["is_select_all"] = false;
      apiDetails["messageBody"]["covered"] = {};
      apiDetails["messageBody"]["not_covered"] = {};
      apiDetails["messageBody"]["selected_criteria_ids"] = [];
      apiDetails["messageBody"]["filter"] = [];
      apiDetails["messageBody"]["search_key"] = "";
      apiDetails["messageBody"]["limited_access"] = "";

      if (this.state.activeTabIndex === 0) {
        apiDetails["pathParams"] =
          this.props?.formulary_id +
          "/" +
          this.state.lobCode +
          "/" +
          this.state.indicatorMM +
          "/" +
          momnConstants.TYPE_REPLACE;
        apiDetails["messageBody"]["monm_trademark"] = this.state.indicatorMM;

        // Replace Drug method call
        this.props.postReplaceMONMDrug(apiDetails).then((json) => {
          if (
            json.payload &&
            json.payload.code &&
            json.payload.code === "200"
          ) {
            showMessage("Success", "success");
            this.getMOMNSummary();
            this.getMOMNDrugsList();
          } else {
            showMessage("Failure", "error");
          }
        });
      } else if (this.state.activeTabIndex === 2) {
        apiDetails["pathParams"] =
          this.props?.formulary_id +
          "/" +
          this.state.lobCode +
          "/" +
          this.state.indicatorMM +
          "/" +
          momnConstants.TYPE_REMOVE;
        apiDetails["messageBody"]["monm_trademark"] = this.state.indicatorMM;
        apiDetails["messageBody"]["selected_criteria_ids"] = ["MO/NM"];

        // Remove Drug method call
        this.props.postRemoveMONMDrug(apiDetails).then((json) => {
          if (
            json.payload &&
            json.payload.code &&
            json.payload.code === "200"
          ) {
            showMessage("Success", "success");
            this.getMOMNSummary();
            this.getMOMNDrugsList();
          } else {
            showMessage("Failure", "error");
          }
        });
      }
    }
  };

  onPageSize = (pageSize) => {
    this.listPayload.limit = pageSize
    this.getMOMNDrugsList({ limit: this.listPayload.limit });
  }

  onGridPageChangeHandler = (pageNumber: any) => {
    this.listPayload.index = (pageNumber - 1) * this.listPayload.limit;
    this.getMOMNDrugsList({ index: this.listPayload.index, limit: this.listPayload.limit });
  }

  onClearFilterHandler = () => {
    this.listPayload.index = 0;
    this.listPayload.limit = 10;
    this.getMOMNDrugsList({ index: defaultListPayload.index, limit: defaultListPayload.limit });
  }

  onSelectedTableRowChanged = (selectedRowKeys) => {
    this.state.selectedDrugs = [];
    if (selectedRowKeys && selectedRowKeys.length > 0) {
      let selDrugs = selectedRowKeys.map((ele) => {
        return this.state.drugData[ele - 1]["md5_id"]
          ? this.state.drugData[ele - 1]["md5_id"]
          : "";
      });

      this.setState({ selectedDrugs: selDrugs });
    } else {
      this.setState({ selectedDrugs: [] });
    }
  };

  getMOMNSummary = () => {
    let apiDetails = {};
    apiDetails["apiPart"] = momnConstants.GET_DRUG_SUMMARY_MONM;
    apiDetails["pathParams"] = this.props?.formulary_id;
    apiDetails["keyVals"] = [
      { key: momnConstants.KEY_ENTITY_ID, value: this.props?.formulary_id },
    ];

    this.props.getDrugDetailsMOMNSummary(apiDetails).then((json) => {
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
        lobCode: getLobCode(this.props.formulary_lob_id),
      });
    });
  };

  getMOMNDrugsList = ({index = 0, limit = 10} = {}) => {
    if (this.state.indicatorMM) {
      let apiDetails = {};
      apiDetails["apiPart"] = momnConstants.GET_MONM_FORMULARY_DRUGS;
      apiDetails["pathParams"] =
        this.props?.formulary_id +
        "/" +
        getLobCode(this.props.formulary_lob_id) +
        "/" +
        "MO";
      apiDetails["keyVals"] = [
        { key: momnConstants.KEY_ENTITY_ID, value: this.props?.formulary_id },
        { key: momnConstants.KEY_INDEX, value: index },
        { key: momnConstants.KEY_LIMIT, value: limit },
      ];

      if (this.state.activeTabIndex === 2) {
        apiDetails["messageBody"] = {};
        apiDetails["messageBody"]["selected_criteria_ids"] = ["Y"];
      }

      let listCount = 0;
      this.props.getDrugDetailsMOList(apiDetails).then((json) => {
        let tmpData = json.payload.result;
        listCount = json.payload.count;
        var data: any[] = [];
        let count = 1;
        var gridData = tmpData.map((el) => {
          var element = Object.assign({}, el);
          data.push(element);
          let gridItem = {};
          gridItem["id"] = count;
          gridItem["key"] = count;
          gridItem["is_abr_formulary"] = element.is_abr_formulary ? "" + element.is_abr_formulary : "";
          gridItem["is_cb"] = element.is_cb ? "" + element.is_cb : "";
          gridItem["is_fff"] = element.is_fff ? "" + element.is_fff : "";
          gridItem["is_gc"] = element.is_gc ? "" + element.is_gc : "";
          gridItem["is_hi"] = element.is_hi ? "" + element.is_hi : "";
          gridItem["is_ibf"] = element.is_ibf ? "" + element.is_ibf : "";
          gridItem["is_la"] = element.is_la ? "" + element.is_la : "";
          gridItem["is_lis"] = element.is_lis ? "" + element.is_lis : "";
          gridItem["is_mo"] = element.is_mo ? "" + element.is_mo : "";
          gridItem["is_nm"] = element.is_nm ? "" + element.is_nm : "";
          gridItem["is_pgc"] = element.is_pgc ? "" + element.is_pgc : "";
          gridItem["is_pbst"] = element.is_pbst ? "" + element.is_pbst : "";
          gridItem["is_ssm"] = element.is_ssm ? "" + element.is_ssm : "";
          gridItem["is_vbid"] = element.is_vbid ? "" + element.is_vbid : "";
          gridItem["labelName"] = element.drug_label_name
            ? "" + element.drug_label_name
            : "";
          gridItem["tier"] = element.tier_value;
          gridItem["fileType"] = element.file_type
            ? "" + element.file_type
            : "";
          gridItem["dataSource"] = element.data_source
            ? "" + element.data_source
            : "";
          gridItem["ndc"] = "";
          gridItem["rxcui"] = element.rxcui ? "" + element.rxcui : "";
          gridItem["gpi"] = element.generic_product_identifier
            ? "" + element.generic_product_identifier
            : "";
          gridItem["trademark"] = element.trademark_code
            ? "" + element.trademark_code
            : "";
          gridItem["databaseCategory"] = element.database_category
            ? "" + element.database_category
            : "";
          gridItem["databaseClass"] = element.database_class
            ? "" + element.database_class
            : "";
          gridItem["createdBy"] = element.created_by
            ? "" + element.created_by
            : "";
          gridItem["createdOn"] = element.created_date
            ? "" + element.created_date
            : "";
          gridItem["modifiedBy"] = element.modified_by
            ? "" + element.modified_by
            : "";
          gridItem["modifiedOn"] = element.modified_date
            ? "" + element.modified_date
            : "";
          gridItem["paGroupDescription"] = element.pa_group_description
            ? "" + element.pa_group_description
            : "";
          gridItem["paType"] = element.pa_type ? "" + element.pa_type : "";
          gridItem["stGroupDescription"] = element.st_group_description
            ? "" + element.st_group_description
            : "";
          gridItem["stepTherapyType"] = element.st_type
            ? "" + element.st_type
            : "";
          gridItem["stepTherapyValue"] = element.st_value
            ? "" + element.st_value
            : "";
          gridItem["qlType"] = element.ql_type ? "" + element.ql_type : "";
          gridItem["qlAmount"] = element.ql_amount
            ? "" + element.ql_amount
            : "";
          gridItem["qlDays"] = element.ql_days ? "" + element.ql_days : "";
          gridItem["moIndicator"] = element.is_mo ? "" + element.is_mo : "";
          gridItem["mnIndicator"] = element.is_nm ? "" + element.is_nm : "";
          gridItem["seniorSavingsModel"] = element.is_ssm
            ? "" + element.is_ssm
            : "";
          gridItem["indicatedBaseFormulary"] = element.is_ibf
            ? "" + element.is_ibf
            : "";
          gridItem["meshCui"] = element.is_ibf ? "" + element.is_ibf : "";
          gridItem["partialGapCoverage"] = element.is_pgc
            ? "" + element.is_pgc
            : "";
          count++;
          return gridItem;
        });
        this.setState({
          drugData: data,
          data: gridData,
          showDG: true,
          listCount: listCount,
        });
      });
    }
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
    this.getMOMNSummary();
    this.getMOMNDrugsList();
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
    // alert(1);
    this.getMOMNDrugsList();
  };

  onRadioChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      indicatorMM: event.target.value,
      showDG: false,
    });
  };

  render() {
    let dataGrid = <FrxLoader />;
    if (this.state.data) {
      dataGrid = (
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
          scroll={{ x: 7000, y: 377 }}
          isFetchingData={false}
          enableResizingOfColumns
          data={this.state.data}
          getPerPageItemSize={this.onPageSize}
          selectedCurrentPage={(this.listPayload.index/this.listPayload.limit + 1)}
          pageSize={this.listPayload.limit}
          onGridPageChangeHandler={this.onGridPageChangeHandler}
          totalRowsCount={this.state.listCount}
          clearFilterHandler={this.onClearFilterHandler}
          rowSelection={{
            columnWidth: 50,
            fixed: true,
            type: "checkbox",
            onChange: this.onSelectedTableRowChanged,
          }}
        />
      );
    }

    return (
      <>
        <div className="bordered mb-10">
          <PanelHeader
            title="Mo/Mn Indicator"
            tooltip="Add or delete Mail Order (MO) or Non-Mail Order (NM) Indicators on appropriate drugs/products in the Drug Grid below for marketing material display."
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
                <PanelHeader title="MO/NM INDICATOR SETTINGS" />
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
                    disabled
                  />
                </div>
              </div>
              <div className="settings-form">
                <label>
                  What indicator will be configured for Marketing Material?
                </label>
                <div className="marketing-material radio-group no-transform">
                  <RadioGroup
                    className="radio-group-custom"
                    name="indicatorMM"
                    onChange={(e) => this.onRadioChangeHandler(e)}
                  >
                    <FormControlLabel
                      value="MO"
                      control={<Radio />}
                      label="MO"
                    />
                    <FormControlLabel
                      value="NM"
                      control={<Radio />}
                      label="NM"
                    />
                  </RadioGroup>
                </div>
                <Box display="flex" justifyContent="flex-end">
                  <Button
                    label="Apply"
                    onClick={this.settingFormApplyHandler}
                    disabled={!this.state.indicatorMM}
                  />
                </Box>
              </div>
            </div>
          </div>
        </div>
        {this.state.showDG ? (
          <div className="bordered">
            <div className="header space-between pr-10">
              Drug Grid
              <div className="button-wrapper">
                <Button
                  className="Button normal"
                  label="Advance Search"
                  onClick={this.advanceSearchClickHandler}
                />
                <Button
                  label="Save"
                  onClick={this.saveClickHandler}
                  disabled={!(this.state.selectedDrugs.length > 0)}
                />
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

export default connect(mapStateToProps, mapDispatchToProps)(DrugDetailMOMN);
