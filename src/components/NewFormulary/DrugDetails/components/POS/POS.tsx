import React from "react";
import { connect } from "react-redux";
import { filter } from "lodash";
import PanelHeader from "../../../../shared/Frx-components/panel-header/PanelHeader";
import PanelGrid from "../../../../shared/Frx-components/panel-grid/PanelGrid";
import CustomizedSwitches from "../FormularyConfigure/components/CustomizedSwitches";
import { TabInfo } from "../../../../../models/tab.model";
import FrxMiniTabs from "../../../../shared/FrxMiniTabs/FrxMiniTabs";
import Button from "../../../../shared/Frx-components/button/Button";
import { getDrugDetailsColumnPOS } from "../../../DrugDetails/components/FormularyConfigure/DrugGridColumn";
import { getDrugDetailData } from "../../../../../mocks/DrugGridMock";
import FrxLoader from "../../../../shared/FrxLoader/FrxLoader";
import DrugGrid from "../../../DrugDetails/components/DrugGrid";
import AdvancedSearch from "../../../DrugDetails/components/FormularyConfigure/components/search/AdvancedSearch";
import {
  getDrugDetailsPOSSummary,
  getDrugDetailsPOSSettings,
  getDrugDetailsPOSGridData,
  getDrugDetailsRemoveTab,
  postPOSCriteriaList,
  postRemovePOSDrug,
  postReplacePOSDrug,
} from "../../../../../redux/slices/formulary/drugDetails/pos/posActionCreation";
import * as posConstants from "../../../../../api/http-drug-details";
import getLobCode from "../../../Utils/LobUtils";
import showMessage from "../../../Utils/Toast";

import PosSettings from "./PosSettings";
import FrxGridContainer from "../../../../shared/FrxGrid/FrxGridContainer";
import PosRemove from "./PosRemove";
import FrxDrugGridContainer from "../../../../shared/FrxGrid/FrxDrugGridContainer";
import AdvanceSearchContainer from "../../../NewAdvanceSearch/AdvanceSearchContainer";
import { setAdvancedSearch } from "../../../../../redux/slices/formulary/advancedSearch/advancedSearchSlice";

function mapDispatchToProps(dispatch) {
  return {
    getDrugDetailsPOSSummary: (a) => dispatch(getDrugDetailsPOSSummary(a)),
    getDrugDetailsPOSSettings: (a) => dispatch(getDrugDetailsPOSSettings(a)),
    getDrugDetailsPOSGridData: (a) => dispatch(getDrugDetailsPOSGridData(a)),
    getDrugDetailsRemoveTab: (arg) => dispatch(getDrugDetailsRemoveTab(arg)),
    postPOSCriteriaList: (a) => dispatch(postPOSCriteriaList(a)),
    postRemovePOSDrug: (a) => dispatch(postRemovePOSDrug(a)),
    postReplacePOSDrug: (a) => dispatch(postReplacePOSDrug(a)),
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
};

interface posState {
  isSearchOpen: boolean,
  panelGridTitle1: any[],
  panelTitleAlignment1: any[],
  panelGridValue1: any[],
  posSettings: any[],
  removeTabsData: any[],
  posSettingsStatus: any,
  posRemoveSettingsStatus: any,
  posCheckedList: any[],
  listCount: number,
  isNotesOpen: boolean,
  activeTabIndex: number,
  columns: any,
  data: any[],
  tabs: any[],
  isSelectAll: boolean,
  showGrid: boolean,
  selectedList: any[],
  selectedDrugs: any[],
  drugData: any[],
};

const columnFilterMapping = {
  placeOfService: "is_pos",
  coveredPlaceOfService: "covered_place_of_services",
  notCoveredPlaceOfService: "not_covered_place_of_services",
  tier: "tier_value",
  labelName: "drug_label_name",
  ddid: "drug_descriptor_identifier",
  gpi: "generic_product_identifier",
  coverAgeMax: "covered_max_ages",
  notCoverMin: "not_covered_min_operators",
  notCoverAgeMin: "not_covered_min_ages",
  notCoverMax: "not_covered_max_operators",
  notCoverAgeMax: "not_covered_max_ages",
  trademark: "trademark_code",
  databaseCategory: "database_category",
  databaseClass: "database_class",
  createdBy: "created_by",
  createdOn: "created_date",
  modifiedBy: "modified_by",
  modifiedOn: "modified_date",
};

class DrugDetailPOS extends React.Component<any, any> {
  state: posState = {
    isSearchOpen: false,
    panelGridTitle1: ["", "NUMBER OF DRUGS", "ADDED DRUGS", "REMOVED DRUGS"],
    panelTitleAlignment1: ["center", "center", "center", "center"],
    panelGridValue1: [],
    posSettings: [],
    removeTabsData: [],
    posSettingsStatus: {
      type: "covered",
      covered: true,
    },
    posRemoveSettingsStatus: {
      type: "covered",
      covered: true,
    },
    posCheckedList: [],
    listCount: 0,
    isNotesOpen: false,
    activeTabIndex: 0,
    columns: getDrugDetailsColumnPOS(),
    data: getDrugDetailData(),
    tabs: [
      { id: 1, text: "Replace" },
      { id: 2, text: "Append" },
      { id: 3, text: "Remove" },
    ],
    selectedList:[],
    selectedDrugs: Array(),
    drugData: Array(),
    isSelectAll: false,
    showGrid: false,
  };

  listPayload: any = {
    index: 0,
    limit: 10,
    filter: [],
    is_covered: this.state.posSettingsStatus.covered,
  };

  posCriteriaPayload: any = {
    is_advance_search: false,
    filter: [],
    search_key: "",
    is_covered: true
  }

  rmSavePayload: any = {
    is_covered: true,
    selected_drug_ids: [],
    is_select_all: false,
    covered: {},
    not_covered: {},
    selected_criteria_ids: [],
    filter: [],
    search_key: "",
  }

  rpSavePayload: any = {
    is_covered:true,
    selected_drug_ids:[],
    is_select_all:false,
    covered:{},
    not_covered:{},
    place_of_services:[],//[1,2]
    breadcrumb_code_value:"POS",
    filter:[],
    search_key:""
  }

  componentDidMount() {
    this.getPOSSummary();
    this.getPOSSettings();
    // this.getPOSRemoveSettings(true);
    this.getPOSCriteriaList(true);
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
      apiDetails["apiPart"] = posConstants.APPLY_POS_DRUGS;
      apiDetails["keyVals"] = [
        { key: posConstants.KEY_ENTITY_ID, value: this.props?.formulary_id },
      ];

      if (this.state.activeTabIndex === 0) {
        // Replace Drug method call

        let posRows = this.state.posSettings.filter((f) => f.isChecked).map((e) => {
          if (e.isChecked && e.isChecked !== undefined) {
            return e.id_place_of_service_type;
          }
        });

        this.rpSavePayload.selected_drug_ids = this.state.selectedDrugs
        this.rpSavePayload.place_of_services = posRows
        this.rpSavePayload.is_covered = this.state.posSettingsStatus.covered
        apiDetails["messageBody"] = this.rpSavePayload;
        apiDetails["pathParams"] = this.props?.formulary_id + "/" + getLobCode(this.props.formulary_lob_id) + "/" + posConstants.TYPE_REPLACE;
        console.log("The API Details - ", apiDetails);
        
        this.props.postReplacePOSDrug(apiDetails).then((json) => {
          if (json.payload && json.payload.code && json.payload.code === "200") {
            showMessage("Success", "success");
            this.getPOSSummary();
            // this.getPOSDrugsList();
          } else {
            showMessage("Failure", "error");
          }
        });

      }else if(this.state.activeTabIndex === 2) {
        let posCheckedList: any[] = [];
        if(this.state.posCheckedList.length > 0) {
          posCheckedList = this.state.posCheckedList.map(e => e?.key);
        }

        this.rmSavePayload.selected_drug_ids = this.state.selectedDrugs
        this.rmSavePayload.is_covered = this.state.posRemoveSettingsStatus.covered
        this.rmSavePayload.selected_criteria_ids = posCheckedList
        apiDetails["messageBody"] = this.rmSavePayload;
        apiDetails["pathParams"] = this.props?.formulary_id + "/" +  getLobCode(this.props.formulary_lob_id) + "/" + posConstants.TYPE_REMOVE;
        console.log("The API Details - ", apiDetails);

        // Remove Drug method call
        this.props.postRemovePOSDrug(apiDetails).then((json) => {
          console.log("The Remove PT Drug Response = ", json);
          if (json.payload && json.payload.code && json.payload.code === "200") {
            showMessage("Success", "success");
            this.getPOSSummary();
            // this.getPOSDrugsList();
          } else {
            console.log("------REMOVE FAILED-------")
            showMessage("Failure", "error");
          }
        });
      }
    }
  };

  getPOSCriteriaList = (isCovered) => {
    let apiDetails = {};
    apiDetails["apiPart"] = posConstants.GET_POS_CRITERIA_LIST;
    apiDetails["pathParams"] = this.props?.formulary_id;
    apiDetails["keyVals"] = [
      { key: posConstants.KEY_ENTITY_ID, value: this.props?.formulary_id },
    ];
    this.posCriteriaPayload.is_covered = isCovered
    apiDetails['messageBody'] = this.posCriteriaPayload;

    this.props.postPOSCriteriaList(apiDetails).then((json) => {
      let tmpData = json.payload && json.payload.result ? json.payload.result : [];
      console.log("The POS Criteria Data = ", tmpData);

      let rows = tmpData.map((ele) => {
        let curRow = [
          ele["id_place_of_service_type"],
          ele["place_of_service_type_name"],
          ele["is_covered"],
        ];
        return curRow;
      });
      console.log("The POS Criteria Remove Rows = ", rows);

      this.setState({
        removeTabsData: rows,
      });
    });
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
        showGrid: false,
      });
    });
  };

  getPOSRemoveSettings = (isCovered) => {
    this.listPayload["is_covered"] = isCovered;
    let apiDetails = {};
    apiDetails["apiPart"] = posConstants.GET_POS_DRUG_REMOVE_TAB;
    apiDetails["pathParams"] = this.props?.formulary_id;
    apiDetails["keyVals"] = [
      { key: posConstants.KEY_ENTITY_ID, value: this.props?.formulary_id },
    ];
    apiDetails["messageBody"] = this.listPayload;

    this.props.getDrugDetailsRemoveTab(apiDetails).then((json) => {
      let tmpData =
        json.payload && json.payload.result ? json.payload.result : [];
      console.log("The PR Temp Data = ", tmpData);

      let rows = tmpData.map((ele) => {
        let curRow = [
          ele["id_place_of_service_type"],
          ele["place_of_service_type_name"],
          ele["is_covered"],
        ];
        return curRow;
      });
      console.log("The PR Rows = ", rows);

      this.setState({
        removeTabsData: rows,
      });
    });
  };

  getPOSDrugsList = ({ index = 0, limit = 10, listPayload = {}, searchBody = {}} = {}) => {
    let apiDetails = {};
    apiDetails["apiPart"] = posConstants.GET_POS_DRUGS;
    apiDetails["pathParams"] =
      this.props?.formulary_id + "/" + getLobCode(this.props.formulary_lob_id);
    apiDetails["keyVals"] = [
      { key: posConstants.KEY_ENTITY_ID, value: this.props?.formulary_id },
      { key: posConstants.KEY_INDEX, value: index },
      { key: posConstants.KEY_LIMIT, value: limit },
    ];
        
    if(this.state.activeTabIndex === 2) {
      console.log("The POS LIST is Covered = ", this.state.posRemoveSettingsStatus.covered);
      console.log("The POS LIST is Covered = ", this.state.posCheckedList.map(e => e?.key));
      listPayload['is_covered'] = this.state.posRemoveSettingsStatus.covered;
      listPayload['selected_criteria_ids'] = this.state.posCheckedList.map(e => e?.key);
    }

    apiDetails["messageBody"] = listPayload;
    
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
    this.props.getDrugDetailsPOSGridData(apiDetails).then((json) => {
      let tmpData = json.payload && json.payload.result ? json.payload.result : [];
      listCount = json.payload?.count;
      var data: any[] = [];
      let count = 1;
      var gridData = tmpData.map((el) => {
        var element = Object.assign({}, el);
        data.push(element);
        let gridItem = {};
        gridItem["id"] = count;
        gridItem["key"] = count;
        gridItem["placeOfService"] = element.is_pos ? "" + element.is_pos : "";
        gridItem["coveredPlaceOfService"] = element.covered_place_of_services
          ? "" + element.covered_place_of_services
          : "";
        gridItem[
          "notCoveredPlaceOfService"
        ] = element.not_covered_place_of_services
          ? "" + element.not_covered_place_of_services
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
        gridItem["coverAgeMax"] = element.covered_max_ages
          ? "" + element.covered_max_ages
          : "";
        gridItem["notCoverMin"] = element.not_covered_min_operators
          ? "" + element.not_covered_min_operators
          : "";
        gridItem["notCoverAgeMin"] = element.not_covered_min_ages
          ? "" + element.not_covered_min_ages
          : "";
        gridItem["notCoverMax"] = element.not_covered_max_operators
          ? "" + element.not_covered_max_operators
          : "";
        gridItem["notCoverAgeMax"] = element.not_covered_max_ages
          ? "" + element.not_covered_max_ages
          : "";
        gridItem["tier"] = element.tier_value ? "" + element.tier_value : "";
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

  getPOSSettings = () => {
    let apiDetails = {};
    apiDetails["apiPart"] = posConstants.GET_DRUG_SETTING_POS;
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
      this.getPOSDrugsList({ listPayload: this.listPayload });
    }
  }

  onPageSize = (pageSize) => {
    this.listPayload.limit = pageSize;
    this.getPOSDrugsList({
      limit: this.listPayload.limit,
      listPayload: this.listPayload,
    });
  };

  onGridPageChangeHandler = (pageNumber: any) => {
    this.listPayload.index = (pageNumber - 1) * this.listPayload.limit;
    this.getPOSDrugsList({
      index: this.listPayload.index,
      limit: this.listPayload.limit,
      listPayload: this.listPayload,
    });
  };

  onClearFilterHandler = () => {
    this.listPayload.index = 0;
    this.listPayload.limit = 10;
    this.listPayload.filter = [];
    this.getPOSDrugsList({
      index: defaultListPayload.index,
      limit: defaultListPayload.limit,
      listPayload: this.listPayload,
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

  handleStatus = (key: string) => {
    const COVERED = "covered";
    const isCovered: boolean = key === COVERED ? true : false;
    let posSettingsStatus = {
      type: key,
      covered: isCovered,
    };

    this.setState({ posSettingsStatus, showGrid: false });
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

    if (activeTabIndex === 2) {
      this.getPOSCriteriaList(true);
    }

    if(this.props.configureSwitch) {
      this.getPOSDrugsList();
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

  handleChangeEvent = (key: string) => {
    const COVERED = "covered";
    const isCovered: boolean = key === COVERED ? true : false;
    let posRemoveSettingsStatus = {
      type: key,
      covered: isCovered,
    };

    this.setState({ posRemoveSettingsStatus, showGrid: false });
    this.getPOSCriteriaList(isCovered);
  };

  handleRemoveChecked = (selectedRows) => {
    this.setState(
      {
        posCheckedList: selectedRows,
        showGrid: false,
      },
      () => console.log("ROW CHANGE UPDATED STATE: ", this.state.posCheckedList)
    )
  };

  showGridHandler = () => {
    this.setState({
      showGrid: !this.state.showGrid,
    });
    this.getPOSDrugsList();
    console.log("The State of the POS Tab = ", this.state);
  };

  componentWillReceiveProps(nextProps) {
    console.log("-----Component Will Receive Props------", nextProps);
    // if(nextProps.configureSwitch) {
    //   this.getPOSDrugsList();
    // }

    if (nextProps.configureSwitch){
      this.setState({tabs:[
        { id: 1, text: "Replace", disabled: true },
        { id: 2, text: "Append", disabled: true },
        { id: 3, text: "Remove", disabled: true },
      ], activeTabIndex:0});

      this.getPOSDrugsList();
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
      this.getPOSDrugsList({ listPayload: this.listPayload, searchBody: nextProps.advancedSearchBody});
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
            columns={getDrugDetailsColumnPOS()}
            scroll={{ x: 3600, y: 377 }}
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

    const {
      posSettings,
      posSettingsStatus,
      isSelectAll,
      showGrid,
    } = this.state;

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
                    disabled={this.props.configureSwitch}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {(this.state.activeTabIndex == 0 || this.state.activeTabIndex == 1) && (
          <PosSettings
            posSettingsServies={{ posSettings, posSettingsStatus }}
            handleStatus={this.handleStatus}
            serviceSettingsChecked={this.serviceSettingsChecked}
            selectAllHandler={{
              isSelectAll: isSelectAll,
              handleSelectAll: this.handleSelectAll,
            }}
            showGridHandler={this.showGridHandler}
            isDisabled={this.props.configureSwitch}
          />
        )}

        {this.state.activeTabIndex == 2 && (
          <PosRemove
            data={this.state.removeTabsData}
            showGridHandler={this.showGridHandler}
            handleChangeEvent={this.handleChangeEvent}
            handleRemoveChecked={this.handleRemoveChecked}
          />
        )}

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
                {!this.props.configureSwitch ? <Button label="Save" onClick={this.saveClickHandler} disabled={!(this.state.selectedDrugs.length > 0)} /> : null}
              </div>
            </div>
            {dataGrid}
            {/* <div className="inner-container">
              <div className="pinned-table">
                <FrxGridContainer
                  enableSearch={false}
                  enableColumnDrag
                  customSettingIcon={"RED-DOT"}
                  onSearch={() => {}}
                  fixedColumnKeys={[
                    "placeOfService",
                    "coveredPlaceOfService",
                    "notCoveredplaceOfService",
                  ]}
                  pagintionPosition="topRight"
                  gridName="DRUGSDETAILS"
                  enableSettings
                  isFetchingData={false}
                  columns={this.state.columns}
                  isCustomCheckboxEnabled
                  handleCustomRowSelectionChange={() => {}}
                  settingsWidth={15}
                  checkBoxWidth={15}
                  isPinningEnabled={true}
                  scroll={{ x: 4000, y: 377 }}
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
                />
              </div>
            </div> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(DrugDetailPOS);
