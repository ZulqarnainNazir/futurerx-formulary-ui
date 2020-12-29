import React from "react";
import { connect } from "react-redux";
import Box from "@material-ui/core/Box";
import { Row, Col } from "antd";
import { Table } from "antd";
import Grid from "@material-ui/core/Grid";
import PanelHeader from "../../../../shared/Frx-components/panel-header/PanelHeader";
import PanelGrid from "../../../../shared/Frx-components/panel-grid/PanelGrid";
import CustomizedSwitches from "../FormularyConfigure/components/CustomizedSwitches";
import { TabInfo } from "../../../../../models/tab.model";
import FrxMiniTabs from "../../../../shared/FrxMiniTabs/FrxMiniTabs";
import Button from "../../../../shared/Frx-components/button/Button";
import { getDrugDetailsColumnAL } from "../../../DrugDetails/components/FormularyConfigure/DrugGridColumn";
import { getDrugDetailData } from "../../../../../mocks/DrugGridMock";
import FrxLoader from "../../../../shared/FrxLoader/FrxLoader";
import AdvancedSearch from "../../../DrugDetails/components/FormularyConfigure/components/search/AdvancedSearch";
import { getDrugDetailsALSummary, getDrugDetailsALList, postReplaceALDrug, getALCriteriaList, postRemoveALDrug } from "../../../../../redux/slices/formulary/drugDetails/al/alActionCreation";
import * as alConstants from "../../../../../api/http-drug-details";
import getLobCode from "../../../Utils/LobUtils";

import AgeLimitSettings from "./AgeLimitSettings";
import FrxDrugGridContainer from "../../../../shared/FrxGrid/FrxDrugGridContainer";
import showMessage from "../../../Utils/Toast";
import ALRemove from "./alRemove";
import AdvanceSearchContainer from "../../../NewAdvanceSearch/AdvanceSearchContainer";
import { setAdvancedSearch } from "../../../../../redux/slices/formulary/advancedSearch/advancedSearchSlice";

function mapDispatchToProps(dispatch) {
  return {
    getDrugDetailsALSummary: (a) => dispatch(getDrugDetailsALSummary(a)),
    getDrugDetailsALList: (a) => dispatch(getDrugDetailsALList(a)),
    postReplaceALDrug: (a) => dispatch(postReplaceALDrug(a)),
    getALCriteriaList: (a) => dispatch(getALCriteriaList(a)),
    postRemoveALDrug: (a) => dispatch(postRemoveALDrug(a)),
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

interface initialFormData {
  minimumVal: any,
  maximumVal: any,
  minimumType: any,
  maximumType: any,
  index: any,
  covered: boolean,
}

interface drugDetailALState {
  isSearchOpen: boolean,
  panelGridTitle1: any,
  panelTitleAlignment1: any,
  panelGridValue1: any,
  isNotesOpen: boolean,
  activeTabIndex: number,
  columns: any,
  data: any,
  tabs: any,
  selectedDrugs: any,
  drugData: any,
  lobCode: any,
  listCount: number,
  ageLimitsCount: number,
  isCovered: boolean,
  formData: initialFormData[],
  showGrid: boolean,
  showApply: boolean,
  removeData: any,
  removeTabsData: any[],
  alRemoveCheckedList: any[],
  alRemoveSettingsStatus: any,
  alSettings: initialFormData[],
}

const defaultListPayload = {
  index: 0,
  limit: 10,
  filter: [],
}

const initialFormData: initialFormData = {
  minimumVal: "",
  maximumVal: "",
  minimumType: "IO",
  maximumType: "IO",
  index: "",
  covered: true,
}

class DrugDetailAL extends React.Component<any, any> {
  state: drugDetailALState = {
    isSearchOpen: false,
    panelGridTitle1: ["", "NUMBER OF DRUGS", "ADDED DRUGS", "REMOVED DRUGS"],
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
    selectedDrugs: Array(),
    drugData: Array(),
    lobCode: null,
    listCount: 0,
    ageLimitsCount: 1,
    isCovered: true,
    showGrid: false,
    showApply: false,
    removeData: [],
    removeTabsData:[],
    alRemoveCheckedList: [],
    alRemoveSettingsStatus: {
      type: "covered",
      covered: true,
    },
    formData: [
      {
        minimumVal: "",
        maximumVal: "",
        minimumType: "IO",
        maximumType: "IO",
        index: 0,
        covered: true,
      },
      {
        minimumVal: "",
        maximumVal: "",
        minimumType: "IO",
        maximumType: "IO",
        index: 1,
        covered: true,
      },
      {
        minimumVal: "",
        maximumVal: "",
        minimumType: "IO",
        maximumType: "IO",
        index: 2,
        covered: true,
      }
    ],
    alSettings: [
      {
        minimumVal: "",
        maximumVal: "",
        minimumType: "IO",
        maximumType: "IO",
        index: 0,
        covered: true,
      }
    ]
  };

  listPayload: any = {
    index: 0,
    limit: 10,
    filter: [],
  }

  alCriteriaPayload: any = {
    is_advance_search: false,
    filter: [],
    search_key: "",
    is_covered: true,
  }

  rpSavePayload: any = {
    is_covered:true,
    selected_drug_ids:[],
    is_select_all:false,
    covered:{},
    not_covered:{},
    age_limits:[],//{"min_age_condition":"GT","min_age_limit":10,"max_age_condition":"","max_age_limit":null,"sequence_number":1}
    filter:[],
    search_key:""
  }
  
  formData1: initialFormData[] = [
    {
      minimumVal: "",
      maximumVal: "",
      minimumType: "IO",
      maximumType: "IO",
      index: 0,
      covered: true,
    },
    {
      minimumVal: "",
      maximumVal: "",
      minimumType: "IO",
      maximumType: "IO",
      index: 1,
      covered: true,
    },
    {
      minimumVal: "",
      maximumVal: "",
      minimumType: "IO",
      maximumType: "IO",
      index: 2,
      covered: true,
    }
  ]

  formData2: initialFormData[] = [
    {
      minimumVal: "",
      maximumVal: "",
      minimumType: "IO",
      maximumType: "IO",
      index: 0,
      covered: true,
    }
  ]

  rmSavePayload: any = {    
    is_covered: true,
    selected_drug_ids: [],
    is_select_all: false,
    covered: {},
    not_covered: {},
    selected_criteria_ids: [], //key
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
    console.log("The Saved Form Data - ", this.state.formData);
    console.log("The Selected Drugs For Save = ", this.state.selectedDrugs);
    if (this.state.selectedDrugs && this.state.selectedDrugs.length > 0) {
      let apiDetails = {};
      apiDetails["apiPart"] = alConstants.APPLY_AL_DRUG;
      apiDetails["keyVals"] = [
        { key: alConstants.KEY_ENTITY_ID, value: this.props?.formulary_id },
      ];

      let ageLimits: any[] = [];
      for(let i=0; i<this.state.alSettings.length; i++) {
        let ageObj = {
          min_age_condition: this.formData2[i].minimumType,
          min_age_limit: +this.formData2[i].minimumVal,
          max_age_condition: this.formData2[i].maximumType,
          max_age_limit: +this.formData2[i].maximumVal,
          sequence_number: this.formData2[i].index + 1,
        }
        ageLimits.push(ageObj);
      }
      console.log("***********The Age Limits = ", ageLimits);
      
      this.rpSavePayload.selected_drug_ids = this.state.selectedDrugs
      this.rpSavePayload.age_limits = ageLimits
      this.rpSavePayload.is_covered = this.state.alSettings[0].covered
      apiDetails["messageBody"] = this.rpSavePayload;

      if (this.state.activeTabIndex === 0) {
        apiDetails["pathParams"] =
          this.props?.formulary_id +
          "/" + 
          getLobCode(this.props.formulary_lob_id) +
          "/" +
          alConstants.TYPE_REPLACE;
          console.log("The API Details - ", apiDetails);

        // Replace Drug method call
        this.props.postReplaceALDrug(apiDetails).then((json) => {
          if (json.payload && json.payload.code && json.payload.code === "200") {
            showMessage("Success", "success");
            this.getALSummary();
            // this.getALDrugsList();
          } else {
            showMessage("Failure", "error");
          }
        });
      } else if(this.state.activeTabIndex === 2) {
        let alCheckedList: any[] = [];
        if(this.state.alRemoveCheckedList.length > 0) {
          alCheckedList = this.state.alRemoveCheckedList.map(e => e?.key);
        }

        this.rmSavePayload.selected_drug_ids = this.state.selectedDrugs
        this.rmSavePayload.is_covered = this.state.alRemoveSettingsStatus.covered
        this.rmSavePayload.selected_criteria_ids = alCheckedList
        apiDetails["messageBody"] = this.rmSavePayload;
        apiDetails["pathParams"] = this.props?.formulary_id + "/" +  getLobCode(this.props.formulary_lob_id) + "/" + alConstants.TYPE_REMOVE;
        console.log("The API Details - ", apiDetails);

        // Remove Drug method call
        this.props.postRemoveALDrug(apiDetails).then((json) => {
          console.log("The Remove AL Drug Response = ", json);
          if (json.payload && json.payload.code && json.payload.code === "200") {
            showMessage("Success", "success");
            this.getALSummary();
            // this.getALDrugsList();
          } else {
            console.log("------REMOVE FAILED-------")
            showMessage("Failure", "error");
          }
        });
      }
    }
  };

  onApplyFilterHandler = (filters) => {
    console.log("------The FIlters = ", filters)
    const fetchedProps = Object.keys(filters)[0];
    console.log("The Fetched Props = ", fetchedProps);
    const fetchedOperator = filters[fetchedProps][0].condition === 'is like' ? 'is_like' : 
    filters[fetchedProps][0].condition === 'is not' ? 'is_not' : 
    filters[fetchedProps][0].condition === 'is not like' ? 'is_not_like' : 
    filters[fetchedProps][0].condition === 'does not exist' ? 'does_not_exist' : 
    filters[fetchedProps][0].condition;
    const fetchedValues = filters[fetchedProps][0].value !== '' ? [filters[fetchedProps][0].value.toString()] : [];
    const newFilters = [{ prop: fetchedProps, operator: fetchedOperator,values: fetchedValues}];
    console.log("------THe New Filters = ", newFilters);
    this.listPayload.filter = newFilters;
    // this.props.fetchFormularies(this.listPayload);
    console.log("THe List Payload inside APPLy filter Handler = ", this.listPayload);
    this.getALDrugsList({ index: this.listPayload.index, limit: this.listPayload.limit, listPayload: this.listPayload });
  }

  // enableApplyButton = () => {
  //   for(let i=0; i<this.state.alSettings.length; i++){
  //     this.state.alsetting
  //   }
  // }

  onPageSize = (pageSize) => {
    this.listPayload.limit = pageSize
    this.getALDrugsList({ limit: this.listPayload.limit });
  }

  onGridPageChangeHandler = (pageNumber: any) => {
    this.listPayload.index = (pageNumber - 1) * this.listPayload.limit;
    this.getALDrugsList({ index: this.listPayload.index, limit: this.listPayload.limit });
  }

  onClearFilterHandler = () => {
    this.listPayload.index = 0;
    this.listPayload.limit = 10;
    this.getALDrugsList({ index: defaultListPayload.index, limit: defaultListPayload.limit });
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

  handleMinChange = (e, args) => {
    console.log("THe Handle Min change Arguments = ", args, " -- THe Event = ", e.target.value, " -THe formdata 2 = ", this.formData2);
    // console.log("The FormData 2 = ", this.formData2);
    // for(let i=0; this.state.alSettings.length; i++) {
    //   if(this.state.alSettings[i]?.index === args){
        this.formData2[args].minimumVal = e.target.value
    //   }
    // }
    // console.log("The Min input Value = ", e);
    // console.log("THe Min input value = ", e.target?.value);
    // this.formData1[index].minimumVal = e.target?.value;
    // this.formData1[index].index = index;
    // this.setState({ formData: this.formData1, showApply: true });
  };

  handleMaxChange = (e, args) => {
    console.log("THe Handle Max change Arguments = ", args, " -- THe Event = ", e.target.value, " -THe formdata 2 = ", this.formData2);
    this.formData2[args].maximumVal = e.target.value
    // for(let i=0; this.formData2.length; i++) {
    //   if(this.formData2[i].index === args){
    //     this.formData2[i].maximumVal = e.target.value
    //   }
    // }
    // console.log("The Max input Value = ", e);
    // console.log("THe Max input value = ", e.target?.value);
    // this.formData1[index].maximumVal = e.target?.value;
    // this.formData1[index].index = index;
    // this.setState({ formData: this.formData1, showApply: true });
  };

  onMinChangeHandler = (e, args) => {
    console.log("THe ON Min change Arguments = ", args, " -- THe Event = ", e);
    this.formData2[args].minimumType = (e === "Greater Than") ? "GT" : "IO" ;
    // console.log("The ON MIN Change Handler data = ", e);
    // console.log("The on MIN Change Index data = ", index);
    // this.formData1[index].minimumType = (e === "Greater Than") ? "GT" : "IO" ;
    // this.formData1[index].index = index;
    // this.setState({ formData: this.formData1 });
  };

  onMaxChangeHandler = (e, args) => {
    console.log("THe ON MAx change Arguments = ", args, " -- THe Event = ", e);
    this.formData2[args].maximumType = (e === "Less Than") ? "LT" : "IO" ;
    // console.log("The ON MAX Change Handler data = ", e);
    // console.log("The on MAX Change Index data = ", index);
    // this.formData1[index].maximumType = (e === "Less Than") ? "LT" : "IO" ;
    // this.formData1[index].index = index;
    // this.setState({ formData: this.formData1 });
  }

  handleStatus = (key: string, args) => {
    const COVERED = "covered";
    const isCovered: boolean = key === COVERED ? true : false;
    // let posSettingsStatus = {
    //   type: key,
    //   covered: isCovered,
    // };
    console.log("The HandleStatus Key = ", key)
    console.log("The HandleStatus args = ", args);
    this.formData2[args].covered = isCovered;
    this.setState({ alSettings: this.formData2 });

    // this.setState({ posSettingsStatus, showGrid: false });
  };

  coveredHandler = (e, index) => {
    // this.formData1[index].covered = e.value === "covered" ? true : false;
    let covered = e.value === "covered" ? true : false;
    this.formData1.forEach(ele => {
      ele.covered = covered
    });
    console.log("The covered formData1 = ", this.formData1);
    this.setState({ formData: this.formData1 });
  }

  showGrid = () => {
    this.getALDrugsList();
    console.log("The State of the Tab = ", this.state);
  }

  getALSummary = () => {
    let apiDetails = {};
    apiDetails["apiPart"] = alConstants.GET_DRUG_SUMMARY_AL;
    apiDetails["pathParams"] = this.props?.formulary_id;
    apiDetails["keyVals"] = [{ key: alConstants.KEY_ENTITY_ID, value: this.props?.formulary_id }];

    this.props.getDrugDetailsALSummary(apiDetails).then((json) => {
      let tmpData = json.payload && json.payload.result ? json.payload.result : [];

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
  }

  getALCriteriaList = (isCovered) => {
    let apiDetails = {};
    apiDetails["apiPart"] = alConstants.GET_AL_CRITERIA_LIST;
    apiDetails["pathParams"] = this.props?.formulary_id;
    apiDetails["keyVals"] = [{ key: alConstants.KEY_ENTITY_ID, value: this.props?.formulary_id }];
    apiDetails["messageBody"] = {};
    // apiDetails["messageBody"]["is_advance_search"] = false;
    // apiDetails["messageBody"]["filter"] = [];
    // apiDetails["messageBody"]["search_key"] = "";
    // apiDetails["messageBody"]["selected_criteria_ids"] = [];
    // apiDetails["messageBody"]["not_covered"] = {};
    // apiDetails["messageBody"]["is_covered"] = this.state.isCovered;
    this.alCriteriaPayload.is_covered = isCovered
    apiDetails['messageBody'] = this.alCriteriaPayload;
    console.log("The Api Details for Criteria Request = ", apiDetails);

    this.props.getALCriteriaList(apiDetails).then((json) => {
      let tmpData = json.payload && json.payload.result ? json.payload.result : [];
      console.log("The Criteria LIst = ", tmpData);

      let rows: any[] = []
      for(let i=0; i<tmpData.length; i++) {
        let obj = {};
        obj["key"] = tmpData[i]["id_age_limit_criteria"];
        obj["minAgeLimit"] = tmpData[i]["min_age_limit"];
        obj["maxAgeLimit"] = tmpData[i]["max_age_limit"];

        rows.push(obj);
      }

      console.log("The Remove Rows = ", rows);
      this.setState({ removeData: rows, removeTabsData: rows });
    });
  }

  getALDrugsList = ({index = 0, limit = 10, listPayload = {}, searchBody = {}} = {}) => {
    let apiDetails = {};
    apiDetails['apiPart'] = alConstants.GET_AL_DRUGS;
    apiDetails['pathParams'] = this.props?.formulary_id + "/" + getLobCode(this.props.formulary_lob_id);
    apiDetails['keyVals'] = [{ key: alConstants.KEY_ENTITY_ID, value: this.props?.formulary_id }, { key: alConstants.KEY_INDEX, value: index }, { key: alConstants.KEY_LIMIT, value: limit }];
    
    if(this.state.activeTabIndex === 2) {
      console.log("The AL LIST is COvered = ", this.state.alRemoveSettingsStatus.covered);
      console.log("The AL LIST is COvered = ", this.state.alRemoveCheckedList.map(e => e?.key));
      listPayload['is_covered'] = this.state.alRemoveSettingsStatus.covered;
      listPayload['selected_criteria_ids'] = this.state.alRemoveCheckedList.map(e => e?.key);
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
    this.props.getDrugDetailsALList(apiDetails).then((json) => {
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
        gridItem["ageLimit"] = element.is_al ? "" + element.is_al : "";
        gridItem["coverMin"] = element.covered_min_operators ? "" + element.covered_min_operators : "";
        gridItem["coverAgeMin"] = element.covered_min_ages ? "" + element.covered_min_ages : "";
        gridItem["coverMax"] = element.covered_max_operators ? "" + element.covered_max_operators : "";
        gridItem["coverAgeMax"] = element.covered_max_ages ? "" + element.covered_max_ages : "";
        gridItem["notCoverMin"] = element.not_covered_min_operators ? "" + element.not_covered_min_operators : "";
        gridItem["notCoverAgeMin"] = element.not_covered_min_ages ? "" + element.not_covered_min_ages : "";
        gridItem["notCoverMax"] = element.not_covered_max_operators ? "" + element.not_covered_max_operators : "";
        gridItem["notCoverAgeMax"] = element.not_covered_max_ages ? "" + element.not_covered_max_ages : "";
        gridItem["tier"] = element.tier_value ? "" + element.tier_value : "";
        gridItem["labelNamae"] = element.drug_label_name ? "" + element.drug_label_name : "";
        gridItem["ddid"] = element.drug_descriptor_identifier ? "" + element.drug_descriptor_identifier : "";
        gridItem["gpi"] = element.generic_product_identifier ? "" + element.generic_product_identifier : "";
        gridItem["trademark"] = element.trademark_code ? "" + element.trademark_code : "";
        gridItem["databaseCategory"] = element.database_category ? "" + element.database_category : "";
        gridItem["databaseClass"] = element.database_class ? "" + element.database_class : "";
        gridItem["created_by"] = element.created_by ? "" + element.created_by : "";
        gridItem["created_date"] = element.created_date ? "" + element.created_date : "";
        gridItem["modified_by"] = element.modified_by ? "" + element.modified_by : "";
        gridItem["modified_date"] = element.modified_date ? "" + element.modified_date : "";
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
    // const data = getDrugDetailData();
    // const columns = getDrugDetailsColumnAL();
    // this.setState({
    //   columns: columns,
    //   data: data,
    // });
    this.getALSummary();
    this.getALCriteriaList(true);
  
    // let newAlSettings: initialFormData = {
    //   minimumVal: "",
    //   maximumVal: "",
    //   minimumType: "IO",
    //   maximumType: "IO",
    //   index: 0,
    //   covered: true,
    // }
    // this.setState({ alSettings: newAlSettings });
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
      this.getALCriteriaList(true);
    }

    if(this.props.configureSwitch) {
      this.getALDrugsList();
    }

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

  handleChangeEvent = (key: string) =>{
    const COVERED = "covered";
    const isCovered: boolean = key === COVERED ? true : false;
    let alRemoveSettingsStatus = {
      type: key,
      covered: isCovered,
    };

    this.setState({ alRemoveSettingsStatus, showGrid: false });
    this.getALCriteriaList(isCovered)
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

  showGridHandler = () => {
    this.getALDrugsList();
    console.log("The State of the Tab = ", this.state);
  };

  handleRemoveChecked = (selectedRows) => {
    this.setState(
      {
        alRemoveCheckedList: selectedRows,
        showGrid: false,
      },
      () => console.log("alRemoveCheckedList: ", this.state.alRemoveCheckedList)
    );
  };

  addNewAgeLimit = () => {
    if(this.state.alSettings.length < 3) {
      console.log("----INside Add New Age Limit------")
      let newAgeLimit = {
        minimumVal: "",
        maximumVal: "",
        minimumType: "IO",
        maximumType: "IO",
        index: this.state.alSettings.length,
        covered: true,
      }

      let alSettings = [...this.state.alSettings];
      alSettings.push(newAgeLimit);
      this.formData2.push(newAgeLimit);
      this.setState({ alSettings }, () => {console.log("The AL Settings State = ", this.state.alSettings)});
    }
  }

  deleteAlLimit = () => {
    if(this.state.alSettings.length > 1) {
      let alSettings = [...this.state.alSettings];
      this.formData2.pop();
      alSettings.pop();
      this.setState({ alSettings });
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log("-----Component Will Receive Props------", nextProps);
    // if(nextProps.configureSwitch) {
    //   this.getALDrugsList();
    // }

    if (nextProps.advancedSearchBody && nextProps.populateGrid) {
      console.log("-----Inside Advance search Body if Condition-----advancedSearchBody ", nextProps.advancedSearchBody);
      console.log("-----Inside Advance search Body if Condition-----populateGrid ", nextProps.advancedSearchBody);
      this.getALDrugsList({ listPayload: this.listPayload, searchBody: nextProps.advancedSearchBody});
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
            columns={getDrugDetailsColumnAL()}
            scroll={{ x: 5200, y: 377 }}
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

    const removeColumns = [
      {
        title: "Min Age Limit",
        dataIndex: "minAgeLimit",
        key: "minAgeLimit",
      },
      {
        title: "Maximum Age Limit",
        dataIndex: "maxAgeLimit",
        key: "maxAgeLimit",
      },
    ];

    console.log("The Remove columns = ", removeColumns)
    console.log("Remove State Data = ", this.state.removeData);
    console.log("Remove TABS State Data = ", this.state.removeTabsData);
    
    return (
      <>
        <div className="bordered mb-10">
          <PanelHeader title="Age Limit" tooltip="Age Limit" />
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

        {(this.state.activeTabIndex==0 || this.state.activeTabIndex==1) && <AgeLimitSettings
          handleMinChange={this.handleMinChange}
          handleMaxChange={this.handleMaxChange}
          onMinChangeHandler={this.onMinChangeHandler}
          onMaxChangeHandler={this.onMaxChangeHandler}
          formData={this.state.formData}
          showApply={true}
          showGrid={this.showGrid}
          coveredHandler={this.coveredHandler}
          alSettings={this.state.alSettings}
          addNewAgeLimit={this.addNewAgeLimit}
          deleteAlLimit={this.deleteAlLimit}
          handleStatus={this.handleStatus}
          isDisabled={this.props.configureSwitch}
        />}
        
        {this.state.activeTabIndex==2 && <ALRemove 
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

export default connect(mapStateToProps, mapDispatchToProps)(DrugDetailAL);
