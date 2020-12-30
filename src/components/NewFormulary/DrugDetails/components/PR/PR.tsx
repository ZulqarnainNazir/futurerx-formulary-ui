import React from "react";
import { connect } from "react-redux";
import { filter } from "lodash";
import PanelHeader from "../../../../shared/Frx-components/panel-header/PanelHeader";
import PanelGrid from "../../../../shared/Frx-components/panel-grid/PanelGrid";
import CustomizedSwitches from "../FormularyConfigure/components/CustomizedSwitches";
import { TabInfo } from "../../../../../models/tab.model";
import FrxMiniTabs from "../../../../shared/FrxMiniTabs/FrxMiniTabs";
import Button from "../../../../shared/Frx-components/button/Button";
import { getDrugDetailsColumnPR } from "../../../DrugDetails/components/FormularyConfigure/DrugGridColumn";
import FrxLoader from "../../../../shared/FrxLoader/FrxLoader";
import AdvancedSearch from "../../../DrugDetails/components/FormularyConfigure/components/search/AdvancedSearch";
import { getDrugDetailsPRSummary, getPRSettings, getDrugDetailsPRList,getDrugDetailsRemoveTab, postRemovePRDrug, postReplacePRDrug } from "../../../../../redux/slices/formulary/drugDetails/pr/prActionCreation";
import * as prConstants from "../../../../../api/http-drug-details";
import getLobCode from "../../../Utils/LobUtils";
import showMessage from "../../../Utils/Toast";

import PrSettings from "./PrSettings";
import FrxDrugGridContainer from "../../../../shared/FrxGrid/FrxDrugGridContainer";
import PrRemove from './PrRemove'
import AdvanceSearchContainer from "../../../NewAdvanceSearch/AdvanceSearchContainer";
import { setAdvancedSearch } from "../../../../../redux/slices/formulary/advancedSearch/advancedSearchSlice";

function mapDispatchToProps(dispatch) {
  return {
    getDrugDetailsPRSummary: (a) => dispatch(getDrugDetailsPRSummary(a)),
    getPRSettings: (a) => dispatch(getPRSettings(a)),
    getDrugDetailsPRList: (a) => dispatch(getDrugDetailsPRList(a)),
    getDrugDetailsRemoveTab: (arg) => dispatch(getDrugDetailsRemoveTab(arg)),
    postRemovePRDrug: (arg) => dispatch(postRemovePRDrug(arg)),
    postReplacePRDrug: (arg) => dispatch(postReplacePRDrug(arg)),
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

interface prState {
  isSearchOpen: boolean,
  panelGridTitle1: any[],
  panelTitleAlignment1: any[],
  panelGridValue1: any[],
  isNotesOpen: boolean,
  activeTabIndex: number,
  columns: any,
  removeTabsData: any[],
  posCheckedList: any[],
  posRemoveSettingsStatus: any,
  data: any[],
  tabs: any[],
  prSettings: any[],
  prSettingsStatus: any,
  listCount: number,
  showGrid: boolean,
  isSelectAll: boolean,
  selectedDrugs: any[],
  drugData: any[],
};

const columnFilterMapping = {
  patientResidence: "is_patrs",
  coveredpatientResidence: "covered_patient_residences",
  notCoveredpatientResidence: "not_covered_patient_residences",
  tier: "tier_value",
  labelName: "drug_label_name",
  ddid: "drug_descriptor_identifier",
  gpi: "generic_product_identifier",
  trademark: "trademark_code",
  databaseCategory: "database_category",
  databaseClass: "database_class",
  createdBy: "created_by",
  createdOn: "created_date",
  modifiedBy: "modified_by",
  modifiedOn: "modified_date",
};

class DrugDetailPR extends React.Component<any, any> {
  state:prState = {
    isSearchOpen: false,
    panelGridTitle1: ["", "NUMBER OF DRUGS", "ADDED DRUGS", "REMOVED DRUGS"],
    panelTitleAlignment1: ["center", "center", "center", "center"],
    panelGridValue1: [],
    isNotesOpen: false,
    activeTabIndex: 0,
    columns: null,
    removeTabsData:[],
    posCheckedList:[],
    posRemoveSettingsStatus: {
      type: "covered",
      covered: true,
    },
    data: [],
    tabs: [
      { id: 1, text: "Replace" },
      { id: 2, text: "Append" },
      { id: 3, text: "Remove" },
    ],
    prSettings: [],
    prSettingsStatus: {
      type: "covered",
      covered: true,
    },
    listCount: 0,
    showGrid: false,
    isSelectAll: false,
    selectedDrugs: Array(),
    drugData: Array(),
  };

  listPayload: any = {
    index: 0,
    limit: 10,
    filter: [],
  }

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

  rpSavePayload: any = {
    is_covered: true,
    selected_drug_ids: [],
    is_select_all: false,
    covered: {},
    not_covered: {},
    patient_residences: [], // Selected Checkbox id 
    breadcrumb_code_value: "PATRS",
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

  saveClickHandler = () => {
    console.log("Save data");
    console.log("The Selected Drugs For Save = ", this.state.selectedDrugs);
    if (this.state.selectedDrugs && this.state.selectedDrugs.length > 0) {
      let apiDetails = {};
      apiDetails["apiPart"] = prConstants.APPLY_PR_DRUGS;
      apiDetails["keyVals"] = [
        { key: prConstants.KEY_ENTITY_ID, value: this.props?.formulary_id },
      ];
      apiDetails["messageBody"] = {};

      if (this.state.activeTabIndex === 0) {
        // let patientResidences: any[] = [];
        // if(this.state.prSettings.length > 0) {
        //   patientResidences = this.state.prSettings.map(e => e?.key);
        // }

        let patientResidences = this.state.prSettings.filter((f) => f.isChecked).map((e) => {
          if (e.isChecked && e.isChecked !== undefined) {
            return e.id_patient_residence_type;
          }
        });

        console.log("----SAVE PR Ids === ", patientResidences);
        this.rpSavePayload.selected_drug_ids = this.state.selectedDrugs
        this.rpSavePayload.is_covered = this.state.prSettingsStatus.covered //this.state.posCheckedList
        this.rpSavePayload.patient_residences = patientResidences;
        apiDetails["messageBody"] = this.rpSavePayload;
        apiDetails["pathParams"] = this.props?.formulary_id + "/" +  getLobCode(this.props.formulary_lob_id) + "/" + prConstants.TYPE_REPLACE;
        console.log("The API Details - ", apiDetails);

        // Replace Drug method call
        this.props.postReplacePRDrug(apiDetails).then((json) => {
          if (json.payload && json.payload.code && json.payload.code === "200") {
            showMessage("Success", "success");
            this.getPRSummary();
          } else {
            showMessage("Failure", "error");
          }
        });

      } else if(this.state.activeTabIndex === 2) {
        let prCheckedList: any[] = [];
        if(this.state.posCheckedList.length > 0) {
          prCheckedList = this.state.posCheckedList.map(e => e?.key);
        }

        this.rmSavePayload.selected_drug_ids = this.state.selectedDrugs
        this.rmSavePayload.is_covered = this.state.posRemoveSettingsStatus.covered
        this.rmSavePayload.selected_criteria_ids = prCheckedList
        apiDetails["messageBody"] = this.rmSavePayload;
        apiDetails["pathParams"] = this.props?.formulary_id + "/" +  getLobCode(this.props.formulary_lob_id) + "/" + prConstants.TYPE_REMOVE;
        console.log("The API Details - ", apiDetails);

        // Remove Drug method call
        this.props.postRemovePRDrug(apiDetails).then((json) => {
          console.log("The Remove PR Drug Response = ", json);
          if (json.payload && json.payload.code && json.payload.code === "200") {
            showMessage("Success", "success");
            this.getPRSummary();
          } else {
            console.log("------REMOVE FAILED-------")
            showMessage("Failure", "error");
          }
        });
      }
    }
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
      this.getPRDrugsList({ listPayload: this.listPayload });
    }
  }

  onPageSize = (pageSize) => {
    this.listPayload.limit = pageSize
    this.getPRDrugsList({ limit: this.listPayload.limit });
  }

  onGridPageChangeHandler = (pageNumber: any) => {
    this.listPayload.index = (pageNumber - 1) * this.listPayload.limit;
    this.getPRDrugsList({ index: this.listPayload.index, limit: this.listPayload.limit });
  }

  onClearFilterHandler = () => {
    this.listPayload.index = 0;
    this.listPayload.limit = 10;
    this.listPayload.filter = [];
    this.getPRDrugsList({ index: defaultListPayload.index, limit: defaultListPayload.limit });
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

  getPRSummary = () => {
    let apiDetails = {};
    apiDetails["apiPart"] = prConstants.GET_DRUG_SUMMARY_PR;
    apiDetails["pathParams"] = this.props?.formulary_id;
    apiDetails["keyVals"] = [
      { key: prConstants.KEY_ENTITY_ID, value: this.props?.formulary_id },
    ];

    this.props.getDrugDetailsPRSummary(apiDetails).then((json) => {
      let tmpData =
        json.payload && json.payload.result ? json.payload.result : [];
      console.log("The PR Temp Data = ", tmpData);

      let rows = tmpData.map((ele) => {
        let curRow = [
          ele["attribute_name"],
          ele["total_drug_count"],
          ele["added_drug_count"],
          ele["removed_drug_count"],
        ];
        return curRow;
      });
      console.log("The PR Rows = ", rows);

      this.setState({
        panelGridValue1: rows,
        showGrid: false,
      });
    });
  };

  getPRRemoveSettings = (isCovered) => {
    this.listPayload['is_covered'] = isCovered
    let apiDetails = {};
    apiDetails["apiPart"] = prConstants.GET_PR_DRUG_REMOVE_TAB;
    apiDetails["pathParams"] = this.props?.formulary_id;
    apiDetails["keyVals"] = [
      { key: prConstants.KEY_ENTITY_ID, value: this.props?.formulary_id },
    ];
    apiDetails['messageBody'] = this.listPayload;

    this.props.getDrugDetailsRemoveTab(apiDetails).then((json) => {
      let tmpData =
        json.payload && json.payload.result ? json.payload.result : [];
      console.log("The PR Temp Data = ", tmpData);

      let rows = tmpData.map((ele) => {
        let curRow = [
          ele["id_patient_residence_type"],
          ele["patient_residence_type_code"],
          ele["patient_residence_type_name"],
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

  handleChangeEvent = (key: string) =>{
    const COVERED = "covered";
    const isCovered: boolean = key === COVERED ? true : false;
    let posRemoveSettingsStatus = {
      type: key,
      covered: isCovered,
    };

    this.setState({ posRemoveSettingsStatus, showGrid: false });
    this.getPRRemoveSettings(isCovered)
  }

  
  handleRemoveChecked = (selectedRows) => {
    this.setState(
      {
        posCheckedList: selectedRows,
        showGrid: false,
      },
      () => console.log("ROW CHANGE UPDATED STATE: ", this.state.posCheckedList)
    );
  };

  getPRSettings = () => {
    let apiDetails = {};
    apiDetails["apiPart"] = prConstants.GET_PR_SETTINGS_LIST;
    this.props.getPRSettings(apiDetails).then((json) => {
      const prSettings = json.payload && json.payload.data ? json.payload.data : [];

      prSettings.forEach((s) => {
        s["isChecked"] = false;
      });
      this.setState({
        prSettings,
      });
    });
  };

  getPRDrugsList = ({index = 0, limit = 10, listPayload = {}, searchBody = {}} = {}) => {
    let apiDetails = {};
    apiDetails['apiPart'] = prConstants.GET_PR_FORMULARY_DRUGS;
    apiDetails['pathParams'] = this.props?.formulary_id + "/" + getLobCode(this.props.formulary_lob_id);
    apiDetails['keyVals'] = [{ key: prConstants.KEY_ENTITY_ID, value: this.props?.formulary_id }, { key: prConstants.KEY_INDEX, value: index }, { key: prConstants.KEY_LIMIT, value: limit }];
    
    if(this.state.activeTabIndex === 2) {
      console.log("----LIST TAB 2 PR Ids === ", this.state.posCheckedList.map(e => e?.key));
      console.log("----LIST TAB 2 PR COVERED Status = ", this.state.posRemoveSettingsStatus.covered);
      listPayload['is_covered'] = this.state.posRemoveSettingsStatus.covered;
      listPayload['selected_criteria_ids'] = this.state.posCheckedList.map(e => e?.key);
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
    this.props.getDrugDetailsPRList(apiDetails).then((json) => {
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
        gridItem["patientResidence"] = element.is_patrs ? "" + element.is_patrs : "";
        gridItem["coveredpatientResidence"] = element.covered_patient_residences ? "" + element.covered_patient_residences : "";
        gridItem["notCoveredpatientResidence"] = element.not_covered_patient_residences ? "" + element.not_covered_patient_residences : "";
        gridItem["tier"] = element.tier_value ? "" + element.tier_value : "";
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

  componentDidMount() {
    this.getPRSummary();
    this.getPRSettings();
    this.getPRRemoveSettings(true)
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
      this.getPRRemoveSettings(true);
    }

    if(this.props.configureSwitch) {
      this.getPRDrugsList();
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

  handleStatus = (key: string) => {
    const COVERED = "covered";
    const isCovered: boolean = key === COVERED ? true : false;
    let prSettingsStatus = {
      type: key,
      covered: isCovered,
    };

    this.setState({ prSettingsStatus, showGrid: false }, () => {console.log("THe Pr Settings Status = ", this.state.prSettingsStatus)});
  };

  serviceSettingsChecked = (e) => {
    const { prSettings } = this.state;

    prSettings.forEach((s: any) => {
      if (s.id_patient_residence_type === e.target.id) {
        s.isChecked = e.target.checked;
      }
    });

    this.setState({
      prSettings,
    });
  };

  handleSelectAll = () => {
    const { prSettings, isSelectAll } = this.state;
    prSettings.forEach((s: any) => {
      s.isChecked = !isSelectAll;
    });

    this.setState({
      prSettings,
      isSelectAll: !isSelectAll,
    });
  };

  showGridHandler = () => {
    console.log("Called-----THe Show Grid Handler-----")
    // this.getPOSDrugsList();
    console.log("The State of the Tab = ", this.state);
    // this.setState({ showGrid: true });
    this.getPRDrugsList();
  };

  componentWillReceiveProps(nextProps) {
    console.log("-----Component Will Receive Props------", nextProps);
    // if(nextProps.configureSwitch) {
    //   this.getPRDrugsList();
    // }

    if (nextProps.configureSwitch){
      this.setState({tabs:[
        { id: 1, text: "Replace", disabled: true },
        { id: 2, text: "Append", disabled: true },
        { id: 3, text: "Remove", disabled: true },
      ], activeTabIndex:0});

      this.getPRDrugsList();
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
      this.getPRDrugsList({ listPayload: this.listPayload, searchBody: nextProps.advancedSearchBody});
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
            columns={getDrugDetailsColumnPR()}
            scroll={{ x: 3500, y: 377 }}
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
      prSettings,
      prSettingsStatus,
      isSelectAll,
      showGrid,
    } = this.state;

    return (
      <>
        <div className="bordered mb-10">
          <PanelHeader title="patient residence" tooltip="patient residence" />
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
        {(this.state.activeTabIndex==0 || this.state.activeTabIndex==1)&&<PrSettings
          prSettingsServies={{ prSettings, prSettingsStatus }}
          handleStatus={this.handleStatus}
          serviceSettingsChecked={this.serviceSettingsChecked}
          selectAllHandler={{
            isSelectAll: isSelectAll,
            handleSelectAll: this.handleSelectAll,
          }}
          showGridHandler={this.showGridHandler}
          isDisabled={this.props.configureSwitch}
        />}

        {this.state.activeTabIndex==2&&<PrRemove 
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
        ) : null }
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrugDetailPR);
