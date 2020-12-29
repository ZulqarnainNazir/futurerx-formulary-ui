import React from "react";
import { connect } from "react-redux";
import PanelHeader from "../../../../shared/Frx-components/panel-header/PanelHeader";
import PanelGrid from "../../../../shared/Frx-components/panel-grid/PanelGrid";
import CustomizedSwitches from "../FormularyConfigure/components/CustomizedSwitches";
import { TabInfo } from "../../../../../models/tab.model";
import FrxMiniTabs from "../../../../shared/FrxMiniTabs/FrxMiniTabs";
import Button from "../../../../shared/Frx-components/button/Button";
import { getDrugDetailsColumnPN } from "../../../DrugDetails/components/FormularyConfigure/DrugGridColumn";
import FrxLoader from "../../../../shared/FrxLoader/FrxLoader";
import AdvancedSearch from "../../../DrugDetails/components/FormularyConfigure/components/search/AdvancedSearch";
import {
  getDrugDetailsPNSummary,
  getDrugDetailsPNList,
  getPNReplaceSrch,
  postPNCriteriaList,
  postRemovePNDrug,
  postReplacePNDrug,
} from "../../../../../redux/slices/formulary/drugDetails/pn/pnActionCreation";
import * as pnConstants from "../../../../../api/http-drug-details";
import getLobCode from "../../../Utils/LobUtils";

import PnLimitSettings from "./PnLimitSettings";
import FrxDrugGridContainer from "../../../../shared/FrxGrid/FrxDrugGridContainer";
import PNRemove from "./PNRemove";
import showMessage from "../../../Utils/Toast";

function mapDispatchToProps(dispatch) {
  return {
    getDrugDetailsPNSummary: (a) => dispatch(getDrugDetailsPNSummary(a)),
    getDrugDetailsPNList: (a) => dispatch(getDrugDetailsPNList(a)),
    getPNReplaceSrch: (arg) => dispatch(getPNReplaceSrch(arg)),
    postPNCriteriaList: (a) => dispatch(postPNCriteriaList(a)),
    postRemovePNDrug: (a) => dispatch(postRemovePNDrug(a)),
    postReplacePNDrug: (a) => dispatch(postReplacePNDrug(a)),
  };
}

const mapStateToProps = (state) => {
  return {
    configureSwitch: state.switchReducer.configureSwitch,
    formulary_id: state?.application?.formulary_id,
    formulary_lob_id: state?.application?.formulary_lob_id,
  };
};

const defaultListPayload = {
  index: 0,
  limit: 10,
  filter: [],
};

interface pnState {
  isSearchOpen: boolean;
  panelGridTitle1: any[];
  panelTitleAlignment1: any[];
  panelGridValue1: any[];
  isNotesOpen: boolean;
  activeTabIndex: number;
  replaceTab: any;
  pnSettingsStatus: any;
  columns: any;
  selectedList: any[];
  data: any[];
  listCount: number;
  tabs: any[];
  selectedDrugs: any[];
  drugData: any[];
  removeTabsData: any[];
  pnRemoveCheckedList: any[];
  pnRemoveSettingsStatus: any;
  showGrid: boolean;
}

class DrugDetailPN extends React.Component<any, any> {
  state: pnState = {
    isSearchOpen: false,
    panelGridTitle1: ["", "NUMBER OF DRUGS", "ADDED DRUGS", "REMOVED DRUGS"],
    panelTitleAlignment1: ["center", "center", "center", "center"],
    panelGridValue1: [],
    isNotesOpen: false,
    activeTabIndex: 0,
    replaceTab: {
      searchResult: [],
    },
    pnSettingsStatus: {
      type: "covered",
      covered: true,
    },
    columns: null,
    selectedList: [],
    data: [],
    listCount: 0,
    tabs: [
      { id: 1, text: "Replace" },
      { id: 2, text: "Append" },
      { id: 3, text: "Remove" },
    ],
    selectedDrugs: Array(),
    drugData: Array(),
    removeTabsData: [],
    pnRemoveCheckedList: [],
    pnRemoveSettingsStatus: {
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

  pnCriteriaPayload: any = {
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
    pharmacy_networks: [], //{"key":1,"value":"network1","text":"network1","is_list":false}
    breadcrumb_code_value: "PHNW",
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
    let pnRemoveSettingsStatus = {
      type: key,
      covered: isCovered,
    };

    this.setState({ pnRemoveSettingsStatus, showGrid: false });
    this.getPNCriteriaList(isCovered);
  };

  saveClickHandler = () => {
    console.log("Save data");

    if (this.state.selectedDrugs && this.state.selectedDrugs.length > 0) {
      let apiDetails = {};
      apiDetails["apiPart"] = pnConstants.APPLY_PN_DRUGS;
      apiDetails["keyVals"] = [
        { key: pnConstants.KEY_ENTITY_ID, value: this.props?.formulary_id },
      ];

      if (this.state.activeTabIndex === 0) {
        // Replace Drug method call
        this.rpSavePayload.selected_drug_ids = this.state.selectedDrugs;
        this.rpSavePayload.pharmacy_networks = this.state.selectedList;
        this.rpSavePayload.breadcrumb_code_value = "PHNW";
        this.rpSavePayload.is_covered = this.state.pnSettingsStatus.covered;
        apiDetails["messageBody"] = this.rpSavePayload;
        apiDetails["pathParams"] =
          this.props?.formulary_id +
          "/" +
          getLobCode(this.props.formulary_lob_id) +
          "/" +
          pnConstants.TYPE_REPLACE;
        console.log("The API Details - ", apiDetails);

        // Replace Drug method call
        this.props.postReplacePNDrug(apiDetails).then((json) => {
          if (
            json.payload &&
            json.payload.code &&
            json.payload.code === "200"
          ) {
            showMessage("Success", "success");
            this.getPNSummary();
            // this.getPNDrugsList();
          } else {
            showMessage("Failure", "error");
          }
        });
      } else if (this.state.activeTabIndex === 2) {
        let pnCheckedList: any[] = [];
        if (this.state.pnRemoveCheckedList.length > 0) {
          pnCheckedList = this.state.pnRemoveCheckedList.map((e) => e?.key);
        }

        this.rmSavePayload.selected_drug_ids = this.state.selectedDrugs;
        this.rmSavePayload.is_covered = this.state.pnRemoveSettingsStatus.covered;
        this.rmSavePayload.selected_criteria_ids = pnCheckedList;
        apiDetails["messageBody"] = this.rmSavePayload;
        apiDetails["pathParams"] =
          this.props?.formulary_id +
          "/" +
          getLobCode(this.props.formulary_lob_id) +
          "/" +
          pnConstants.TYPE_REMOVE;
        console.log("The API Details - ", apiDetails);

        // Remove Drug method call
        this.props.postRemovePNDrug(apiDetails).then((json) => {
          console.log("The Remove PN Drug Response = ", json);
          if (
            json.payload &&
            json.payload.code &&
            json.payload.code === "200"
          ) {
            showMessage("Success", "success");
            this.getPNSummary();
            // this.getPNDrugsList();
          } else {
            console.log("------REMOVE FAILED-------");
            showMessage("Failure", "error");
          }
        });
      }
    }
  };

  onPageSize = (pageSize) => {
    this.listPayload.limit = pageSize;
    this.getPNDrugsList({ limit: this.listPayload.limit });
  };

  onGridPageChangeHandler = (pageNumber: any) => {
    this.listPayload.index = (pageNumber - 1) * this.listPayload.limit;
    this.getPNDrugsList({
      index: this.listPayload.index,
      limit: this.listPayload.limit,
    });
  };

  onClearFilterHandler = () => {
    this.listPayload.index = 0;
    this.listPayload.limit = 10;
    this.getPNDrugsList({
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

      this.setState({ selectedDrugs: selDrugs }, () =>
        console.log("The Selected Drugs = ", this.state.selectedDrugs)
      );
    } else {
      this.setState({ selectedDrugs: [] });
    }
  };

  handleRemoveChecked = (selectedRows) => {
    this.setState(
      {
        pnRemoveCheckedList: selectedRows,
        showGrid: false,
      },
      () => console.log("pnRemoveCheckedList: ", this.state.pnRemoveCheckedList)
    );
  };

  getPNCriteriaList = (isCovered) => {
    let apiDetails = {};
    apiDetails["apiPart"] = pnConstants.GET_PN_CRITERIA_LIST;
    apiDetails["pathParams"] = this.props?.formulary_id;
    apiDetails["keyVals"] = [
      { key: pnConstants.KEY_ENTITY_ID, value: this.props?.formulary_id },
    ];
    this.pnCriteriaPayload.is_covered = isCovered;
    apiDetails["messageBody"] = this.pnCriteriaPayload;

    this.props.postPNCriteriaList(apiDetails).then((json) => {
      let tmpData =
        json.payload && json.payload.result ? json.payload.result : [];
      console.log("The PN Criteria Data = ", tmpData);

      let rows = tmpData.map((ele) => {
        let curRow = [
          ele["id_pharmacy_network"],
          ele["pharmacy_npi"],
          ele["pharmacy_network_name"],
          ele["is_covered"],
        ];
        return curRow;
      });
      console.log("The PN Criteria Remove Rows = ", rows);

      this.setState({
        removeTabsData: rows,
      });
    });
  };

  getPNSummary = () => {
    let apiDetails = {};
    apiDetails["apiPart"] = pnConstants.GET_DRUG_SUMMARY_PN;
    apiDetails["pathParams"] = this.props?.formulary_id;
    apiDetails["keyVals"] = [
      { key: pnConstants.KEY_ENTITY_ID, value: this.props?.formulary_id },
    ];

    this.props.getDrugDetailsPNSummary(apiDetails).then((json) => {
      let tmpData =
        json.payload && json.payload.result ? json.payload.result : [];
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
        showGrid: false,
      });
    });
  };

  getPNDrugsList = ({ index = 0, limit = 10, listPayload = {} } = {}) => {
    let apiDetails = {};
    apiDetails["apiPart"] = pnConstants.GET_PN_DRUGS;
    apiDetails["pathParams"] =
      this.props?.formulary_id + "/" + getLobCode(this.props.formulary_lob_id);
    apiDetails["keyVals"] = [
      { key: pnConstants.KEY_ENTITY_ID, value: this.props?.formulary_id },
      { key: pnConstants.KEY_INDEX, value: index },
      { key: pnConstants.KEY_LIMIT, value: limit },
    ];

    if (this.state.activeTabIndex === 2) {
      console.log(
        "The PN LIST is Covered = ",
        this.state.pnRemoveSettingsStatus.covered
      );
      console.log(
        "The PN LIST is Covered = ",
        this.state.pnRemoveCheckedList.map((e) => e?.key)
      );
      listPayload["is_covered"] = this.state.pnRemoveSettingsStatus.covered;
      listPayload["selected_criteria_ids"] = this.state.pnRemoveCheckedList.map(
        (e) => e?.key
      );
    }

    apiDetails["messageBody"] = listPayload;

    let listCount = 0;
    this.props.getDrugDetailsPNList(apiDetails).then((json) => {
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
        gridItem["pharmacyNetwork"] = element.is_phnw
          ? "" + element.is_phnw
          : "";
        gridItem["coveredNetwork"] = element.covered_pharmacy_networks
          ? "" + element.covered_pharmacy_networks
          : "";
        gridItem["notCoveredNetwork"] = element.not_covered_pharmacy_networks
          ? "" + element.not_covered_pharmacy_networks
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

  getPNReplaceSrch = (searchTxt) => {
    let apiDetails = {};
    apiDetails["apiPart"] = pnConstants.GET_PN_DRUGS_REPLACE;
    apiDetails["pathParams"] = this.props?.formulary_id;
    apiDetails["keyVals"] = [
      { key: pnConstants.KEY_ENTITY_ID, value: this.props?.formulary_id },
      { key: pnConstants.SEARCHKEY, value: searchTxt },
    ];

    this.props.getPNReplaceSrch(apiDetails).then((json) => {
      let curRow = json.payload && json.payload.data ? json.payload.data : [];
      this.setState({
        replaceTab: {
          searchResult: curRow,
        },
      });
    });
  };

  componentDidMount() {
    this.getPNSummary();
    this.getPNCriteriaList(true);
  }

  onClickTab = (selectedTabIndex: number) => {
    let activeTabIndex = 0;

    const tabs = this.state.tabs.map((tab: TabInfo, index: number) => {
      if (index === selectedTabIndex) {
        activeTabIndex = index;
      }
      return tab;
    });

    if (activeTabIndex === 2) {
      this.getPNCriteriaList(true);
    }

    if(this.props.configureSwitch) {
      this.getPNDrugsList();
    }

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

  showGridHandler = () => {
    this.getPNDrugsList();
    console.log("The State of the PN Tab = ", this.state);
  };

  handleReplaceSrch = (selectedItem) => {
    this.setState({
      selectedList: selectedItem,
    });
    this.getPNReplaceSrch(selectedItem);
  };

  handleStatus = (key: string) => {
    const COVERED = "covered";
    const isCovered: boolean = key === COVERED ? true : false;
    let pnSettingsStatus = {
      type: key,
      covered: isCovered,
    };

    this.setState({ pnSettingsStatus, showGrid: false });
  };

  componentWillReceiveProps(nextProps) {
    console.log("-----Component Will Receive Props------", nextProps);
    if(nextProps.configureSwitch) {
      this.getPNDrugsList();
    }
  }

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
            columns={getDrugDetailsColumnPN()}
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
                    disabledIndex={1}
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {(this.state.activeTabIndex == 0 || this.state.activeTabIndex == 1) && (
          <PnLimitSettings
            options={this.state.replaceTab.searchResult}
            handleReplaceSrch={this.handleReplaceSrch}
            handleStatus={this.handleStatus}
            showGridHandler={this.showGridHandler}
            pnSettingsStatus={this.state.pnSettingsStatus}
            isDisabled={this.props.configureSwitch}
          />
        )}

        {this.state.activeTabIndex == 2 && (
          <PNRemove
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
                {!this.props.configureSwitch ? <Button
                  label="Save"
                  onClick={this.saveClickHandler}
                  disabled={!(this.state.selectedDrugs.length > 0)}
                /> : null}
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

export default connect(mapStateToProps, mapDispatchToProps)(DrugDetailPN);
