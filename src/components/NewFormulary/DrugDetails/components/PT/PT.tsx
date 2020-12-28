import React from "react";
import { connect } from "react-redux";
import PanelHeader from "../../../../shared/Frx-components/panel-header/PanelHeader";
import PanelGrid from "../../../../shared/Frx-components/panel-grid/PanelGrid";
import CustomizedSwitches from "../FormularyConfigure/components/CustomizedSwitches";
import { TabInfo } from "../../../../../models/tab.model";
import FrxMiniTabs from "../../../../shared/FrxMiniTabs/FrxMiniTabs";
import Button from "../../../../shared/Frx-components/button/Button";
import { getDrugDetailsColumnPT } from "../../../DrugDetails/components/FormularyConfigure/DrugGridColumn";
import FrxLoader from "../../../../shared/FrxLoader/FrxLoader";
import AdvancedSearch from "../../../DrugDetails/components/FormularyConfigure/components/search/AdvancedSearch";
import {
  getDrugDetailsPTSummary,
  getPTDrugList,
  getPTReplaceSrch,
  postPTCriteriaList,
  postRemovePTDrug,
  postReplacePTDrug,
} from "../../../../../redux/slices/formulary/drugDetails/pt/ptActionCreation";
import * as ptConstants from "../../../../../api/http-drug-details";
import getLobCode from "../../../Utils/LobUtils";
import showMessage from "../../../Utils/Toast";

import PtSettings from "./PtSettings";
import FrxDrugGridContainer from "../../../../shared/FrxGrid/FrxDrugGridContainer";
import PTRemove from "./PTRemove";

function mapDispatchToProps(dispatch) {
  return {
    getDrugDetailsPTSummary: (a) => dispatch(getDrugDetailsPTSummary(a)),
    getPTDrugList: (a) => dispatch(getPTDrugList(a)),
    getPTReplaceSrch: (arg) => dispatch(getPTReplaceSrch(arg)),
    postPTCriteriaList: (a) => dispatch(postPTCriteriaList(a)),
    postRemovePTDrug: (a) => dispatch(postRemovePTDrug(a)),
    postReplacePTDrug: (a) => dispatch(postReplacePTDrug(a)),
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
  filter: [],
};

interface ptState {
  isSearchOpen: boolean;
  panelGridTitle1: any[];
  panelTitleAlignment1: any[];
  panelGridValue1: any[];
  replaceTab: any;
  isNotesOpen: boolean;
  activeTabIndex: number;
  columns: any;
  data: any[];
  tabs: any[];
  ptSettingsStatus: any;
  listCount: number;
  selectedList: any[];
  selectedDrugs: any[];
  drugData: any[];
  removeTabsData: any[];
  ptRemoveCheckedList: any[];
  ptRemoveSettingsStatus: any;
  showGrid: boolean;
}

class DrugDetailPT extends React.Component<any, any> {
  state: ptState = {
    isSearchOpen: false,
    panelGridTitle1: ["", "NUMBER OF DRUGS", "ADDED DRUGS", "REMOVED DRUGS"],
    panelTitleAlignment1: ["center", "center", "center", "center"],
    panelGridValue1: [],
    replaceTab: {
      searchResult: [],
    },
    isNotesOpen: false,
    activeTabIndex: 0,
    columns: null,
    data: [],
    tabs: [
      { id: 1, text: "Replace" },
      { id: 2, text: "Append" },
      { id: 3, text: "Remove" },
    ],
    ptSettingsStatus: {
      type: "covered",
      covered: true,
    },
    listCount: 0,
    selectedList: [],
    selectedDrugs: Array(),
    drugData: Array(),
    removeTabsData: [],
    ptRemoveCheckedList: [],
    ptRemoveSettingsStatus: {
      type: "covered",
      covered: true,
    },
    showGrid: false,
  };

  listPayload: any = {
    index: 0,
    limit: 10,
    filter: [],
  };

  ptCriteriaPayload: any = {
    is_advance_search: false,
    filter: [],
    search_key: "",
    is_covered: true,
  };

  rpSavePayload: any = {
    is_covered: true,
    selected_drug_ids: [],
    is_select_all: false,
    covered: {},
    not_covered: {},
    prescriber_taxonomies: [], //{"key":2,"value":"Med Prescribers","text":"Med Prescribers","is_list":false}
    breadcrumb_code_value: "PRTX",
    filter: [],
    search_key: "",
  };

  rmSavePayload: any = {
    is_covered: true,
    selected_drug_ids: [],
    is_select_all: false,
    covered: {},
    not_covered: {},
    selected_criteria_ids: [],
    filter: [],
    search_key: "",
  };

  advanceSearchClickHandler = (event) => {
    event.stopPropagation();
    this.setState({ isSearchOpen: !this.state.isSearchOpen });
  };

  advanceSearchClosekHandler = () => {
    this.setState({ isSearchOpen: !this.state.isSearchOpen });
  };

  handleChangeEvent = (key: string) => {
    const COVERED = "covered";
    const isCovered: boolean = key === COVERED ? true : false;
    let ptRemoveSettingsStatus = {
      type: key,
      covered: isCovered,
    };

    this.setState({ ptRemoveSettingsStatus, showGrid: false });
    this.getPTCriteriaList(isCovered);
  };

  saveClickHandler = () => {
    console.log("Save data");

    if (this.state.selectedDrugs && this.state.selectedDrugs.length > 0) {
      let apiDetails = {};
      apiDetails["apiPart"] = ptConstants.APPLY_PT_DRUGS;
      apiDetails["keyVals"] = [
        { key: ptConstants.KEY_ENTITY_ID, value: this.props?.formulary_id },
      ];

      if (this.state.activeTabIndex === 0) {
        // Replace Drug method call
        this.rpSavePayload.selected_drug_ids = this.state.selectedDrugs;
        this.rpSavePayload.prescriber_taxonomies = this.state.selectedList;
        this.rpSavePayload.breadcrumb_code_value = "PRTX";
        this.rpSavePayload.is_covered = this.state.ptSettingsStatus.covered;
        apiDetails["messageBody"] = this.rpSavePayload;
        apiDetails["pathParams"] =
          this.props?.formulary_id +
          "/" +
          getLobCode(this.props.formulary_lob_id) +
          "/" +
          ptConstants.TYPE_REPLACE;
        console.log("The API Details - ", apiDetails);

        // Replace Drug method call
        this.props.postReplacePTDrug(apiDetails).then((json) => {
          if (
            json.payload &&
            json.payload.code &&
            json.payload.code === "200"
          ) {
            showMessage("Success", "success");
            this.getPTSummary();
            // this.getPTDrugsList();
          } else {
            showMessage("Failure", "error");
          }
        });
      } else if (this.state.activeTabIndex === 2) {
        let ptCheckedList: any[] = [];
        if (this.state.ptRemoveCheckedList.length > 0) {
          ptCheckedList = this.state.ptRemoveCheckedList.map((e) => e?.key);
        }

        this.rmSavePayload.selected_drug_ids = this.state.selectedDrugs;
        this.rmSavePayload.is_covered = this.state.ptRemoveSettingsStatus.covered;
        this.rmSavePayload.selected_criteria_ids = ptCheckedList;
        apiDetails["messageBody"] = this.rmSavePayload;
        apiDetails["pathParams"] =
          this.props?.formulary_id +
          "/" +
          getLobCode(this.props.formulary_lob_id) +
          "/" +
          ptConstants.TYPE_REMOVE;
        console.log("The API Details - ", apiDetails);

        // Remove Drug method call
        this.props.postRemovePTDrug(apiDetails).then((json) => {
          console.log("The Remove PT Drug Response = ", json);
          if (
            json.payload &&
            json.payload.code &&
            json.payload.code === "200"
          ) {
            showMessage("Success", "success");
            this.getPTSummary();
            // this.getPTDrugsList();
          } else {
            console.log("------REMOVE FAILED-------");
            showMessage("Failure", "error");
          }
        });
      }
    }
  };

  showGridHandler = () => {
    this.getPTDrugsList();
    console.log("The State of the PT Tab = ", this.state);
  };

  handleStatus = (key: string) => {
    const COVERED = "covered";
    const isCovered: boolean = key === COVERED ? true : false;
    let ptSettingsStatus = {
      type: key,
      covered: isCovered,
    };

    this.setState({ ptSettingsStatus, showGrid: false });
  };

  onPageSize = (pageSize) => {
    this.listPayload.limit = pageSize;
    this.getPTDrugsList({ limit: this.listPayload.limit });
  };

  onGridPageChangeHandler = (pageNumber: any) => {
    this.listPayload.index = (pageNumber - 1) * this.listPayload.limit;
    this.getPTDrugsList({
      index: this.listPayload.index,
      limit: this.listPayload.limit,
    });
  };

  onClearFilterHandler = () => {
    this.listPayload.index = 0;
    this.listPayload.limit = 10;
    this.getPTDrugsList({
      index: defaultListPayload.index,
      limit: defaultListPayload.limit,
    });
  };

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

  handleRemoveChecked = (selectedRows) => {
    this.setState(
      {
        ptRemoveCheckedList: selectedRows,
        showGrid: false,
      },
      () => console.log("ptRemoveCheckedList: ", this.state.ptRemoveCheckedList)
    );
  };

  getPTCriteriaList = (isCovered) => {
    let apiDetails = {};
    apiDetails["apiPart"] = ptConstants.GET_PT_CRITERIA_LIST;
    apiDetails["pathParams"] = this.props?.formulary_id;
    apiDetails["keyVals"] = [
      { key: ptConstants.KEY_ENTITY_ID, value: this.props?.formulary_id },
    ];
    this.ptCriteriaPayload.is_covered = isCovered;
    apiDetails["messageBody"] = this.ptCriteriaPayload;

    this.props.postPTCriteriaList(apiDetails).then((json) => {
      let tmpData =
        json.payload && json.payload.result ? json.payload.result : [];
      console.log("The PT Criteria Data = ", tmpData);

      let rows = tmpData.map((ele) => {
        let curRow = [
          ele["id_prescriber_network"],
          ele["prescriber_taxonomy_code"],
          ele["prescriber_network_name"],
          ele["is_covered"],
        ];
        return curRow;
      });
      console.log("The PT Criteria Remove Rows = ", rows);

      this.setState({
        removeTabsData: rows,
      });
    });
  };

  getPTSummary = () => {
    let apiDetails = {};
    apiDetails["apiPart"] = ptConstants.GET_DRUG_SUMMARY_PT;
    apiDetails["pathParams"] = this.props?.formulary_id;
    apiDetails["keyVals"] = [
      { key: ptConstants.KEY_ENTITY_ID, value: this.props?.formulary_id },
    ];

    this.props.getDrugDetailsPTSummary(apiDetails).then((json) => {
      let tmpData =
        json.payload && json.payload.result ? json.payload.result : [];
      console.log("The PT Temp Data = ", tmpData);

      let rows = tmpData.map((ele) => {
        let curRow = [
          ele["attribute_name"],
          ele["total_drug_count"],
          ele["added_drug_count"],
          ele["removed_drug_count"],
        ];
        return curRow;
      });
      console.log("The PT Rows = ", rows);

      this.setState({
        panelGridValue1: rows,
        showGrid: false,
      });
    });
  };

  getPTDrugsList = ({ index = 0, limit = 10, listPayload = {} } = {}) => {
    let apiDetails = {};
    apiDetails["apiPart"] = ptConstants.GET_PT_DRUGS;
    apiDetails["pathParams"] =
      this.props?.formulary_id + "/" + getLobCode(this.props.formulary_lob_id);
    apiDetails["keyVals"] = [
      { key: ptConstants.KEY_ENTITY_ID, value: this.props?.formulary_id },
      { key: ptConstants.KEY_INDEX, value: index },
      { key: ptConstants.KEY_LIMIT, value: limit },
    ];

    if (this.state.activeTabIndex === 2) {
      console.log(
        "The PT LIST is Covered = ",
        this.state.ptRemoveSettingsStatus.covered
      );
      console.log(
        "The PT LIST is Covered = ",
        this.state.ptRemoveCheckedList.map((e) => e?.key)
      );
      listPayload["is_covered"] = this.state.ptRemoveSettingsStatus.covered;
      listPayload["selected_criteria_ids"] = this.state.ptRemoveCheckedList.map(
        (e) => e?.key
      );
    }

    apiDetails["messageBody"] = listPayload;

    let listCount = 0;
    this.props.getPTDrugList(apiDetails).then((json) => {
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
        gridItem["prescriberTaxonomy"] = element.is_prtx
          ? "" + element.is_prtx
          : "";
        gridItem["coveredTaxonomy"] = element.covered_prescriber_taxonomies
          ? "" + element.covered_prescriber_taxonomies
          : "";
        gridItem[
          "notCoveredTaxonomy"
        ] = element.not_covered_prescriber_taxonomies
          ? "" + element.not_covered_prescriber_taxonomies
          : "";
        gridItem["tier"] = element.tier_value ? "" + element.tier_value : "";
        gridItem["labelName"] = element.drug_label_name
          ? "" + element.drug_label_name
          : "";
        gridItem["ddid"] = element.drug_descriptor_identifier
          ? "" + element.drug_descriptor_identifier
          : "";
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
        gridItem["md5_id"] = element.md5_id ? "" + element.md5_id : "";
        count++;
        return gridItem;
      });
      this.setState({
        drugData: data,
        data: gridData,
        listCount: listCount,
        showGrid: true,
      });
    });
  };

  getPTReplaceSrch = (searchTxt) => {
    let apiDetails = {};
    apiDetails["apiPart"] = ptConstants.GET_PT_DRUGS_REPLACE;
    apiDetails["pathParams"] = "";
    apiDetails["keyVals"] = [
      { key: ptConstants.KEY_ENTITY_ID, value: this.props?.formulary_id },
      { key: ptConstants.SEARCHKEY, value: searchTxt },
    ];

    this.props.getPTReplaceSrch(apiDetails).then((json) => {
      let curRow = json.payload && json.payload.data ? json.payload.data : [];
      this.setState({
        replaceTab: {
          searchResult: curRow,
        },
      });
    });
  };

  componentDidMount() {
    this.getPTSummary();
    this.getPTCriteriaList(true);
  }

  onClickTab = (selectedTabIndex: number) => {
    let activeTabIndex = 0;

    const tabs = this.state.tabs.map((tab: TabInfo, index: number) => {
      if (index === selectedTabIndex) {
        activeTabIndex = index;
      }
      return tab;
    });
    this.setState({ tabs, activeTabIndex, showGrid: false });
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

  handleReplaceSrch = (selectedItem) => {
    this.setState({
      selectedList: selectedItem,
    });
    this.getPTReplaceSrch(selectedItem);
  };

  render() {
    let dataGrid = <FrxLoader />;
    if (this.state.data) {
      dataGrid = (
        <div className="tier-grid-container">
          <FrxDrugGridContainer
            isPinningEnabled={false}
            enableSearch={false}
            enableColumnDrag
            onSearch={() => {}}
            fixedColumnKeys={[]}
            pagintionPosition="topRight"
            gridName="DRUGSDETAILS"
            enableSettings={false}
            columns={getDrugDetailsColumnPT()}
            scroll={{ x: 3200, y: 377 }}
            isFetchingData={false}
            enableResizingOfColumns
            data={this.state.data}
            getPerPageItemSize={this.onPageSize}
            selectedCurrentPage={
              this.listPayload.index / this.listPayload.limit + 1
            }
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
        </div>
      );
    }

    return (
      <>
        <div className="bordered mb-10">
          <PanelHeader
            title="prescriber taxonomy"
            tooltip="prescriber taxonomy"
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
                    disabledIndex={1}
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {(this.state.activeTabIndex == 0 || this.state.activeTabIndex == 1) && (
          <PtSettings
            options={this.state.replaceTab.searchResult}
            handleReplaceSrch={this.handleReplaceSrch}
            handleStatus={this.handleStatus}
            showGridHandler={this.showGridHandler}
            ptSettingsStatus={this.state.ptSettingsStatus}
          />
        )}

        {this.state.activeTabIndex == 2 && (
          <PTRemove
            data={this.state.removeTabsData}
            showGridHandler={this.showGridHandler}
            handleChangeEvent={this.handleChangeEvent}
            handleRemoveChecked={this.handleRemoveChecked}
          />
        )}

        {this.state.showGrid ? (
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

export default connect(mapStateToProps, mapDispatchToProps)(DrugDetailPT);
