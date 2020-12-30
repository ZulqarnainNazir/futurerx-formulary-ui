import React from "react";
import { connect } from "react-redux";
import { filter } from "lodash";
import PanelHeader from "../../../../shared/Frx-components/panel-header/PanelHeader";
import PanelGrid from "../../../../shared/Frx-components/panel-grid/PanelGrid";
import CustomizedSwitches from "../FormularyConfigure/components/CustomizedSwitches";
import { TabInfo } from "../../../../../models/tab.model";
import FrxMiniTabs from "../../../../shared/FrxMiniTabs/FrxMiniTabs";
import Button from "../../../../shared/Frx-components/button/Button";
import { getDrugDetailsColumnICD } from "../../../DrugDetails/components/FormularyConfigure/DrugGridColumn";
import FrxLoader from "../../../../shared/FrxLoader/FrxLoader";
import AdvancedSearch from "../../../DrugDetails/components/FormularyConfigure/components/search/AdvancedSearch";
import { getDrugDetailsICDSummary, getDrugDetailsICDList,getICDReplaceSrch, postICDCriteriaList, postRemoveICDDrug, postReplaceICDDrug } from "../../../../../redux/slices/formulary/drugDetails/icd/icdActionCreation";
import * as icdConstants from "../../../../../api/http-drug-details";
import getLobCode from "../../../Utils/LobUtils";

import IcdLimitSettings from "./IcdLimitSettings";
import FrxDrugGridContainer from "../../../../shared/FrxGrid/FrxDrugGridContainer";
import ICDRemove from "./ICDRemove";
import showMessage from "../../../Utils/Toast";
import AdvanceSearchContainer from "../../../NewAdvanceSearch/AdvanceSearchContainer";
import { setAdvancedSearch } from "../../../../../redux/slices/formulary/advancedSearch/advancedSearchSlice";

function mapDispatchToProps(dispatch) {
  return {
    getDrugDetailsICDSummary: (a) => dispatch(getDrugDetailsICDSummary(a)),
    getDrugDetailsICDList: (a) => dispatch(getDrugDetailsICDList(a)),
    getICDReplaceSrch: (arg) => dispatch(getICDReplaceSrch(arg)),
    postICDCriteriaList: (a) => dispatch(postICDCriteriaList(a)),
    postRemoveICDDrug: (a) => dispatch(postRemoveICDDrug(a)),
    postReplaceICDDrug: (a) => dispatch(postReplaceICDDrug(a)),
    setAdvancedSearch: (a) => dispatch(setAdvancedSearch(a)),
  };
}

const mapStateToProps = (state) => {
  return {
    configureSwitch: state.switchReducer.configureSwitch,
    formulary_id: state?.application?.formulary_id,
    formulary_lob_id: state?.application?.formulary_lob_id,
    advancedSearchBody: state?.advancedSearch?.advancedSearchBody,
    populateGrid: state?.advancedSearch?.populateGrid,
    closeDialog: state?.advancedSearch?.closeDialog,
  };
};

const defaultListPayload = {
  index: 0,
  limit: 10,
  filter: [],
}

interface icdState {
  isSearchOpen: boolean,
  panelGridTitle1: any[],
  panelTitleAlignment1: any[],
  panelGridValue1: any[],
  isNotesOpen: boolean,
  activeTabIndex: number,
  columns: any,
  data: any,
  selectedList: any[],
  replaceTab: any,
  lookBackDays: number,
  icdSettingsStatus: any,
  listCount: number,
  selectedDrugs: any[],
  drugData: any[],
  tabs: any[],
  removeTabsData: any[],
  icdRemoveCheckedList: any[],
  icdRemoveSettingsStatus: any,
  showGrid: boolean,
};

const columnFilterMapping = {
  icdLimit: "is_icdl",
  coveredIcd: "covered_icds",
  icdLookBack: "lookback_days",
  not_covered_icds: "not_covered_icds",
  tier_value: "tier_value",
  labelName: "drug_label_name",
  ddid: "drug_descriptor_identifier",
  gpi: "generic_product_identifier",
  trademark: "trademark_code",
  databaseCategory: "database_category",
  databaseClass: "database_class",
  createdBy: "created_by",
  createdOn: "created_date",
  modifiedBy: "modified_by",
  modifiedOn: "modified_date"
};

class DrugDetailICD extends React.Component<any, any> {
  state: icdState = {
    isSearchOpen: false,
    panelGridTitle1: ["", "NUMBER OF DRUGS", "ADDED DRUGS", "REMOVED DRUGS"],
    panelTitleAlignment1: ["center", "center", "center", "center"],
    panelGridValue1: [],
    isNotesOpen: false,
    activeTabIndex: 0,
    columns: null,
    data: [],
    selectedList:[],
    replaceTab:{
      searchResult:[]
    },
    lookBackDays:0,
    icdSettingsStatus:{
      type: "covered",
      covered: true,
    },
    listCount: 0,
    selectedDrugs: Array(),
    drugData: Array(),
    tabs: [
      { id: 1, text: "Replace" },
      { id: 2, text: "Append" },
      { id: 3, text: "Remove" },
    ],
    removeTabsData:[],
    icdRemoveCheckedList:[],
    icdRemoveSettingsStatus: {
      type: "covered",
      covered: true,
    },
    showGrid: false,
  };

  listPayload: any = {
    index: 0,
    limit: 10,
    filter: [],
  }

  icdCriteriaPayload: any = {
    is_advance_search: false,
    filter: [],
    search_key: "",
    is_covered: true
  }

  rpSavePayload: any = {
    is_covered: true,
    selected_drug_ids: [],
    is_select_all: false,
    covered: {},
    not_covered: {},
    icd_limits: {
      lookback_days: null,
      icds: [],
    },
    breadcrumb_code_value: "ICDL",
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
    search_key: ""
  }

  advanceSearchClickHandler = (event) => {
    event.stopPropagation();
    this.setState({ isSearchOpen: !this.state.isSearchOpen });
  };

  advanceSearchClosekHandler = () => {
    this.setState({ isSearchOpen: !this.state.isSearchOpen });
  };

  handleChangeEvent = (key: string) =>{
    const COVERED = "covered";
    const isCovered: boolean = key === COVERED ? true : false;
    let icdRemoveSettingsStatus = {
      type: key,
      covered: isCovered,
    };

    this.setState({ icdRemoveSettingsStatus, showGrid: false });
    this.getICDCriteriaList(isCovered)
  }

  saveClickHandler = () => {
    console.log("Save data");

    if (this.state.selectedDrugs && this.state.selectedDrugs.length > 0) {
      let apiDetails = {};
      apiDetails["apiPart"] = icdConstants.APPLY_ICD_DRUGS;
      apiDetails["keyVals"] = [
        { key: icdConstants.KEY_ENTITY_ID, value: this.props?.formulary_id },
      ];

      if (this.state.activeTabIndex === 0) {
        // Replace Drug method call
        this.rpSavePayload.selected_drug_ids = this.state.selectedDrugs;
        this.rpSavePayload.icd_limits.lookback_days = +this.state.lookBackDays;
        this.rpSavePayload.icd_limits.icds = this.state.selectedList;
        this.rpSavePayload.breadcrumb_code_value = "ICDL";
        this.rpSavePayload.is_covered = this.state.icdSettingsStatus.covered;
        apiDetails["messageBody"] = this.rpSavePayload;
        apiDetails["pathParams"] = this.props?.formulary_id + "/" + getLobCode(this.props.formulary_lob_id) + "/" + icdConstants.TYPE_REPLACE;
        console.log("The API Details - ", apiDetails);

        // Replace Drug method call
        this.props.postReplaceICDDrug(apiDetails).then((json) => {
          if (json.payload && json.payload.code && json.payload.code === "200") {
            showMessage("Success", "success");
            this.getICDSummary();
            // this.getICDDrugsList();
          } else {
            showMessage("Failure", "error");
          }
        });

      }else if(this.state.activeTabIndex === 2) {
        let icdCheckedList: any[] = [];
        if(this.state.icdRemoveCheckedList.length > 0) {
          icdCheckedList = this.state.icdRemoveCheckedList.map(e => e?.key);
        }

        this.rmSavePayload.selected_drug_ids = this.state.selectedDrugs
        this.rmSavePayload.is_covered = this.state.icdRemoveSettingsStatus.covered
        this.rmSavePayload.selected_criteria_ids = icdCheckedList
        apiDetails["messageBody"] = this.rmSavePayload;
        apiDetails["pathParams"] = this.props?.formulary_id + "/" +  getLobCode(this.props.formulary_lob_id) + "/" + icdConstants.TYPE_REMOVE;
        console.log("The API Details - ", apiDetails);

        // Remove Drug method call
        this.props.postRemoveICDDrug(apiDetails).then((json) => {
          console.log("The Remove ICD Drug Response = ", json);
          if (json.payload && json.payload.code && json.payload.code === "200") {
            showMessage("Success", "success");
            this.getICDSummary();
            // this.getICDDrugsList();
          } else {
            console.log("------REMOVE FAILED-------")
            showMessage("Failure", "error");
          }
        });
      }
    }
  };

  handleRemoveChecked = (selectedRows) => {
    this.setState(
      {
        icdRemoveCheckedList: selectedRows,
        showGrid: false,
      },
      () => console.log("icdRemoveCheckedList: ", this.state.icdRemoveCheckedList)
    );
  };

  getICDCriteriaList = (isCovered) => {
    let apiDetails = {};
    apiDetails["apiPart"] = icdConstants.GET_ICD_CRITERIA_LIST;
    apiDetails["pathParams"] = this.props?.formulary_id;
    apiDetails["keyVals"] = [
      { key: icdConstants.KEY_ENTITY_ID, value: this.props?.formulary_id },
    ];
    this.icdCriteriaPayload.is_covered = isCovered
    apiDetails['messageBody'] = this.icdCriteriaPayload;

    this.props.postICDCriteriaList(apiDetails).then((json) => {
      let tmpData = json.payload && json.payload.result ? json.payload.result : [];
      console.log("The ICD Criteria Data = ", tmpData);

      let rows = tmpData.map((ele) => {
        let curRow = [
          ele["id_icd_code"],
          ele["icd_code"],
          ele["icd_code_description"],
          ele["is_covered"],
        ];
        return curRow;
      });
      console.log("The ICD Criteria Remove Rows = ", rows);

      this.setState({
        removeTabsData: rows,
      });
    });
  };

  getICDSummary = () => {
    let apiDetails = {};
    apiDetails["apiPart"] = icdConstants.GET_DRUG_SUMMARY_ICD;
    apiDetails["pathParams"] = this.props?.formulary_id;
    apiDetails["keyVals"] = [{ key: icdConstants.KEY_ENTITY_ID, value: this.props?.formulary_id }];

    this.props.getDrugDetailsICDSummary(apiDetails).then((json) => {
      let tmpData = json.payload && json.payload.result ? json.payload.result : [];
      console.log("The ICD Temp Data = ", tmpData);

      let rows = tmpData.map((ele) => {
        let curRow = [
          ele["attribute_name"],
          ele["total_drug_count"],
          ele["added_drug_count"],
          ele["removed_drug_count"],
        ];
        return curRow;
      });
      console.log("The ICD Rows = ", rows);

      this.setState({
        panelGridValue1: rows,
        showGrid: false,
      });
    });
  }

  getICDDrugsList = ({index = 0, limit = 10, listPayload = {}, searchBody = {}} = {}) => {
    let apiDetails = {};
    apiDetails['apiPart'] = icdConstants.GET_ICD_DRUGS;
    apiDetails['pathParams'] = this.props?.formulary_id + "/" + getLobCode(this.props.formulary_lob_id);
    apiDetails['keyVals'] = [{ key: icdConstants.KEY_ENTITY_ID, value: this.props?.formulary_id }, { key: icdConstants.KEY_INDEX, value: index }, { key: icdConstants.KEY_LIMIT, value: limit }];
    
    if(this.state.activeTabIndex === 2) {
      console.log("The ICD LIST is COvered = ", this.state.icdRemoveSettingsStatus.covered);
      console.log("The ICD LIST is COvered = ", this.state.icdRemoveCheckedList.map(e => e?.key));
      listPayload['is_covered'] = this.state.icdRemoveSettingsStatus.covered;
      listPayload['selected_criteria_ids'] = this.state.icdRemoveCheckedList.map(e => e?.key);
    }
    
    apiDetails['messageBody'] = listPayload;
    
    if (searchBody) {
      console.log("THe Search Body = ", searchBody, " and List Payload = ", listPayload);
      let merged = {...listPayload, ...searchBody};
      console.log("Merged Body = ", merged);
      apiDetails["messageBody"] = Object.assign(
        apiDetails["messageBody"],
        merged
      );
    }

    let listCount = 0;
    this.props.getDrugDetailsICDList(apiDetails).then((json) => {
      let tmpData = json.payload && json.payload.result ? json.payload.result : [];
      console.log("The GEt ICd LIst Resp = ", tmpData);
      listCount = json.payload?.count;
      var data: any[] = [];
      let count = 1;
      var gridData = tmpData.map((el) => {
        var element = Object.assign({}, el);
        data.push(element);
        let gridItem = {};
        gridItem["id"] = count;
        gridItem["key"] = count;
        gridItem["icdLimit"] = element.is_icdl ? "" + element.is_icdl : "";
        gridItem["coveredIcd"] = element.covered_icds ? "" + element.covered_icds : "";
        gridItem["icdLookBack"] = element.lookback_days ? "" + element.lookback_days : "";
        gridItem["not_covered_icds"] = element.not_covered_icds ? "" + element.not_covered_icds : "";
        gridItem["tier_value"] = element.tier_value ? "" + element.tier_value : "";
        gridItem["labelName"] = element.drug_label_name ? "" + element.drug_label_name : "";
        gridItem["ddid"] = element.drug_descriptor_identifier ? "" + element.drug_descriptor_identifier : "";
        gridItem["gpi"] = element.generic_product_identifier ? "" + element.generic_product_identifier : "";
        gridItem["trademark"] = element.trademark_code ? "" + element.trademark_code : "";
        gridItem["databaseCategory"] = element.database_category ? "" + element.database_category : "";
        gridItem["databaseClass"] = element.database_class ? "" + element.database_class : "";
        
        gridItem["createdBy"] = element.created_by ? "" + element.created_by : "";
        gridItem["createdOn"] = element.created_date ? "" + element.created_date : "";
        gridItem["modifiedBy"] = element.modified_by ? "" + element.modified_by : "";
        gridItem["modifiedOn"] = element.modified_date ? "" + element.modified_date : "";
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
  }

  getICDReplaceSrch = (searchTxt) => {
    let apiDetails = {};
    apiDetails["apiPart"] = icdConstants.GET_ICD_DRUGS_REPLACE;
    apiDetails["pathParams"] = this.props?.formulary_id;
    apiDetails["keyVals"] = [
      { key: icdConstants.KEY_ENTITY_ID, value: this.props?.formulary_id },
      { key: icdConstants.SEARCHKEY, value: searchTxt }
    ];

    this.props.getICDReplaceSrch(apiDetails).then((json) => {
      let curRow = json.payload && json.payload.data ? json.payload.data : [];
      this.setState({
        replaceTab: {
          searchResult: curRow.slice(0, 10)
        },
      });
    });
  }

  componentDidMount() {
    const columns = getDrugDetailsColumnICD();
    this.setState({
      columns: columns,
    });
    this.getICDSummary();
    this.getICDCriteriaList(true);
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
      this.getICDCriteriaList(true);
    }

    if(this.props.configureSwitch) {
      this.getICDDrugsList();
    }

    // let payload = { advancedSearchBody: {}, populateGrid: false, closeDialog: false, listItemStatus: {} };
    // this.props.setAdvancedSearch(payload);
    this.clearSearch();

    this.setState({ tabs, activeTabIndex, showGrid: false });
  };

  clearSearch = () => {
    let payload = { advancedSearchBody: {}, populateGrid: false, closeDialog: false, listItemStatus: {} };
    this.props.setAdvancedSearch(payload);
  }

  componentWillUnmount() {
    this.clearSearch();
  }

  onPageSize = (pageSize) => {
    this.listPayload.limit = pageSize
    this.getICDDrugsList({ limit: this.listPayload.limit, listPayload: this.listPayload });
  }

  onGridPageChangeHandler = (pageNumber: any) => {
    this.listPayload.index = (pageNumber - 1) * this.listPayload.limit;
    this.getICDDrugsList({ index: this.listPayload.index, limit: this.listPayload.limit, listPayload: this.listPayload });
  }

  onClearFilterHandler = () => {
    this.listPayload.index = 0;
    this.listPayload.limit = 10;
    this.listPayload.filter = [];
    this.getICDDrugsList({ index: defaultListPayload.index, limit: defaultListPayload.limit, listPayload: this.listPayload });
  }

  onSelectedTableRowChanged = (selectedRowKeys) => {
    this.state.selectedDrugs = [];
    if (selectedRowKeys && selectedRowKeys.length > 0) {
      let selDrugs = selectedRowKeys.map((ele) => {
        return this.state.drugData[ele - 1]["md5_id"]
          ? this.state.drugData[ele - 1]["md5_id"]
          : "";
      });

      this.setState({ selectedDrugs: selDrugs }, () => console.log("The Selected Drugs = ",  this.state.selectedDrugs));
    } else {
      this.setState({ selectedDrugs: [] });
    }
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

  handleReplaceSrch = (selectedItem) =>{
    this.setState({
      selectedList:selectedItem
    })
    this.getICDReplaceSrch(selectedItem)
  }

  showGridHandler = () => {
    this.getICDDrugsList();
    console.log("The State of the ICD Tab = ", this.state);
  };

  handleStatus = (key: string) => {
    const COVERED = "covered";
    const isCovered: boolean = key === COVERED ? true : false;
    let icdSettingsStatus = {
      type: key,
      covered: isCovered,
    };

    this.setState({ icdSettingsStatus, showGrid: false });
  };

  handleLookBackDays = (lookDays) =>{
    this.setState({
      lookBackDays:lookDays
    })
  }

  // onApplyFilterHandler = (filters) => {
  //   console.log("------The FIlters = ", filters)
  //   const fetchedProps = Object.keys(filters)[0];
  //   console.log("The Fetched Props = ", fetchedProps);
  //   const fetchedOperator = filters[fetchedProps][0].condition === 'is like' ? 'is_like' : 
  //   filters[fetchedProps][0].condition === 'is not' ? 'is_not' : 
  //   filters[fetchedProps][0].condition === 'is not like' ? 'is_not_like' : 
  //   filters[fetchedProps][0].condition === 'does not exist' ? 'does_not_exist' : 
  //   filters[fetchedProps][0].condition;
  //   const fetchedValues = filters[fetchedProps][0].value !== '' ? [filters[fetchedProps][0].value.toString()] : [];
  //   const newFilters = [{ prop: fetchedProps, operator: fetchedOperator,values: fetchedValues}];
  //   console.log("------THe New Filters = ", newFilters);
  //   this.listPayload.filter = newFilters;
  //   // this.props.fetchFormularies(this.listPayload);
  //   console.log("THe List Payload inside APPLy filter Handler = ", this.listPayload);
  //   this.getICDDrugsList({ index: this.listPayload.index, limit: this.listPayload.limit, listPayload: this.listPayload });
  // }
  
  onApplyFilterHandler = (filters) => {
    this.listPayload.filter = Array();
    if (filters && filter.length > 0) {
      const fetchedKeys = Object.keys(filters);
      fetchedKeys.map(fetchedProps => {
        if (filters[fetchedProps] && columnFilterMapping[fetchedProps]) {
          const fetchedOperator = filters[fetchedProps][0].condition === 'is like' ? 'is_like' :
            filters[fetchedProps][0].condition === 'is not' ? 'is_not' :
              filters[fetchedProps][0].condition === 'is not like' ? 'is_not_like' :
                filters[fetchedProps][0].condition === 'does not exist' ? 'does_not_exist' :
                  filters[fetchedProps][0].condition;
          
          let fetchedPropsValue;
          if(filters[fetchedProps][0].value !== '') {
            const fetchedPropsValueNum = Number(filters[fetchedProps][0].value.toString());
            fetchedPropsValue = isNaN(fetchedPropsValueNum) ? filters[fetchedProps][0].value.toString() : fetchedPropsValueNum
          }
          const fetchedValues = filters[fetchedProps][0].value !== '' ? [fetchedPropsValue] : [];
          this.listPayload.filter.push({ prop: columnFilterMapping[fetchedProps], operator: fetchedOperator, values: fetchedValues });
        }
      });
      this.getICDDrugsList({ listPayload: this.listPayload });
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log("-----Component Will Receive Props------", nextProps);
    // if(nextProps.configureSwitch) {
    //   this.getICDDrugsList();
    // }

    if (nextProps.configureSwitch){
      this.setState({tabs:[
        { id: 1, text: "Replace", disabled: true },
        { id: 2, text: "Append", disabled: true },
        { id: 3, text: "Remove", disabled: true },
      ], activeTabIndex:0});

      this.getICDDrugsList();
    } else {
      this.setState({tabs:[
        { id: 1, text: "Replace", disabled:false },
        { id: 2, text: "Append", disabled:true },
        { id: 3, text: "Remove", disabled:false },
      ]});
    }

    if (nextProps.advancedSearchBody && nextProps.populateGrid) {
      console.log("-----Inside Advance search Body if Condition-----advancedSearchBody ", nextProps.advancedSearchBody);
      console.log("-----Inside Advance search Body if Condition-----populateGrid ", nextProps.advancedSearchBody);
      this.getICDDrugsList({ listPayload: this.listPayload, searchBody: nextProps.advancedSearchBody});
      let payload = {
        advancedSearchBody: nextProps.advancedSearchBody,
        populateGrid: false,
        closeDialog: nextProps.closeDialog,
        listItemStatus: nextProps.listItemStatus,
      };
      if (nextProps.closeDialog) {
        this.state.isSearchOpen = false;
        payload["closeDialog"] = false;
      }

      console.log("---_Set Advanced Search payload = ", payload);
      this.props.setAdvancedSearch(payload);
    }
  }

  render() {
    const searchProps = {
      lobCode: this.props.lobCode,
      pageType: 0,
    };
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
            columns={getDrugDetailsColumnICD()}
            scroll={{ x: 3200, y: 377 }}
            isFetchingData={false}
            enableResizingOfColumns
            data={this.state.data}
            getPerPageItemSize={this.onPageSize}
            selectedCurrentPage={(this.listPayload.index/this.listPayload.limit + 1)}
            pageSize={this.listPayload.limit}
            onGridPageChangeHandler={this.onGridPageChangeHandler}
            totalRowsCount={this.state.listCount}
            clearFilterHandler={this.onClearFilterHandler}
            applyFilter={this.onApplyFilterHandler}
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
          <PanelHeader title="ICD Limit" tooltip="ICD Limit" />
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
                    disabled={this.props.configureSwitch}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {(this.state.activeTabIndex==0 || this.state.activeTabIndex==1) && <IcdLimitSettings 
          options={this.state.replaceTab.searchResult} 
          handleReplaceSrch={this.handleReplaceSrch}
          handleStatus={this.handleStatus}
          showGridHandler={this.showGridHandler}
          icdSettingsStatus={this.state.icdSettingsStatus}
          handleLookBackDays = {this.handleLookBackDays}
          isDisabled={this.props.configureSwitch}
        />}
        
        {this.state.activeTabIndex==2 && <ICDRemove 
          data={this.state.removeTabsData} 
          showGridHandler={this.showGridHandler} 
          handleChangeEvent={this.handleChangeEvent}
          handleRemoveChecked={this.handleRemoveChecked}
        />}

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
                {!this.props.configureSwitch ? <Button label="Save" onClick={this.saveClickHandler} disabled={!(this.state.selectedDrugs.length > 0)} /> : null}
              </div>
            </div>
            {dataGrid}
            {this.state.isSearchOpen ? (
              // <AdvancedSearch
              //   category="Grievances"
              //   openPopup={this.state.isSearchOpen}
              //   onClose={this.advanceSearchClosekHandler}
              // />
              <AdvanceSearchContainer
                {...searchProps}
                openPopup={this.state.isSearchOpen}
                onClose={this.advanceSearchClosekHandler}
                isAdvanceSearch={true}
              />
            ) : null}
          </div>
        ) : null}
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrugDetailICD);
