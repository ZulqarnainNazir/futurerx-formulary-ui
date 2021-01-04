import React from "react";
import { connect } from "react-redux";

import { Grid } from "@material-ui/core";
import FrxMiniTabs from "../../../../shared/FrxMiniTabs/FrxMiniTabs";
import Button from "../../../../shared/Frx-components/button/Button";
import FrxDrugGridContainer from "../../../../shared/FrxGrid/FrxDrugGridContainer";
import FrxGridContainer from "../../../../shared/FrxGrid/FrxGridContainer"; // "../../../shared/FrxGrid/FrxGridContainer";
import FrxDrugGrid from "../../../../shared/FrxGrid/FrxDrugGrid";
import {
  getTapList,
  getMiniTabs,
} from "../../../../../mocks/formulary/mock-data";

import CustomizedSwitches from "./../../../DrugDetails/components/FormularyConfigure/components/CustomizedSwitches";
import PanelHeader from "../../../../shared/Frx-components/panel-header/PanelHeader";
import PanelGrid from "../../../../shared/Frx-components/panel-grid/PanelGrid";

import { TabInfo } from "../../../../../models/tab.model";
import { getTier } from "../../../../../redux/slices/formulary/tier/tierActionCreation";
import Replace from "./components/Replace";
import Remove from "./components/Remove";
import FillLimitSettings from "./components/FillLimitSettings";
import {
  getQlSummary,
  postApplyFormularyDrugQl,
  postFormularyDrugQl,
  // postApplyFormularyDrugQl
} from "../../../../../redux/slices/formulary/ql/qlActionCreation";
import * as constants from "../../../../../api/http-commons";
import { QlColumns } from "../../../../../utils/grid/columns";
import showMessage from "../../../Utils/Toast"; //"../../../Utils/Toast";
import { ToastContainer } from "react-toastify";
import AdvanceSearchContainer from "../../../NewAdvanceSearch/AdvanceSearchContainer";
import { setAdvancedSearch } from "../../../../../redux/slices/formulary/advancedSearch/advancedSearchSlice";
import { setAdditionalCriteria } from "../../../../../redux/slices/formulary/advancedSearch/additionalCriteriaSlice";
import "./components/common.scss";

function mapDispatchToProps(dispatch) {
  return {
    // getTier: (a) => dispatch(getTier(a)),
    getQlSummary: (a) => dispatch(getQlSummary(a)),
    postFormularyDrugQl: (a) => dispatch(postFormularyDrugQl(a)),
    postApplyFormularyDrugQl: (a) => dispatch(postApplyFormularyDrugQl(a)),
    setAdvancedSearch: (a) => dispatch(setAdvancedSearch(a)),
    setAdditionalCriteria: (a) => dispatch(setAdditionalCriteria(a)),
  };
}

function mapStateToProps(state) {
  return {
    current_formulary: state.application.formulary,
    qlData: state.qlReducer.data,
    switchState: state.switchReducer.configureSwitch,

    formulary_lob_id: state?.application?.formulary_lob_id,

    advancedSearchBody: state?.advancedSearch?.advancedSearchBody,
    additionalCriteriaBody: state?.additionalCriteria?.additionalCriteriaBody,
    populateGrid: state?.advancedSearch?.populateGrid,
    closeDialog: state?.advancedSearch?.closeDialog,
  };
}

interface newParamterType {
  quantity: number | null;
  days: number | null;
  periodOfTime: number | null;
  fillsAllowed: number | null;
  fillLimitPeriodOfTime: number | null;
}
interface tabsState {
  activeMiniTabIndex: number;
  miniTabs: any;
  tabs: any;
  drugGridContainer: boolean;
  activeTabIndex: any;
  panelGridValue: any;
  drugGridData: any;
  quantityAndFillLimitObject: any; //newParamterType;
  selectedDrugs: any;
  drugData: any;
  drugCount: number;
  selectedCriteria: any;
  errorObject: any;
  selectedTab: string;
  isAdvanceSearchOpen: boolean;
  isAdditionalCriteriaOpen: boolean;
  additionalCriteriaState: null;
  is_additional_criteria_defined: boolean;
  isLoading: boolean;
  fixedSelectedRows: number[];
  selectedRowKeys: number[];
}

class Tier extends React.Component<any, tabsState> {
  state = {
    drugGridContainer: false,
    miniTabs: getMiniTabs(),
    isFetchingData: false,
    activeMiniTabIndex: 0,
    activeTabIndex: 0,
    tabs: [
      { id: 1, text: "Replace" },
      { id: 2, text: "Append" },
      { id: 3, text: "Remove" },
    ],
    panelGridTitle: ["", "NUMBER OF DRUGS", "ADDED DRUGS", "REMOVED DRUGS"],
    panelGridValue: [],
    drugGridData: [],
    quantityAndFillLimitObject: {},
    selectedDrugs: [],
    drugData: [],
    selectedCriteria: [],
    selectedTab: constants.TYPE_REPLACE,
    isAdvanceSearchOpen: false,
    isAdditionalCriteriaOpen: false,
    additionalCriteriaState: null,
    is_additional_criteria_defined: false,
    isLoading: false,
    errorObject: {},
    fixedSelectedRows: Array(),
    selectedRowKeys: Array(),
    drugCount: 0,
  };

  onClickTab = (selectedTabIndex: number) => {
    let activeTabIndex = 0;

    const tabs = this.state.tabs.map((tab: TabInfo, index: number) => {
      if (index === selectedTabIndex) {
        activeTabIndex = index;
      }
      return tab;
    });
    this.setState({
      tabs,
      activeTabIndex,
      drugGridContainer: false,
      quantityAndFillLimitObject: {},
      errorObject: {},
    });
  };

  renderTabContent = () => {
    const activeTabIndex = this.state.activeTabIndex;
    switch (activeTabIndex) {
      case 0:
        return (
          <Replace
            handleOnChange={this.handleOnChange}
            onUpdateSelectedCriteria={this.onUpdateSelectedCriteria}
            values={this.state.quantityAndFillLimitObject}
            errors={this.state.errorObject}
            isViweAll={this.props.switchState}
          />
        );
      case 1:
        return (
          <Replace
            handleOnChange={this.handleOnChange}
            onUpdateSelectedCriteria={this.onUpdateSelectedCriteria}
            values={this.state.quantityAndFillLimitObject}
            errors={this.state.errorObject}
            isViweAll={this.props.switchState}
          />
        );
      case 2:
        return (
          <Remove
            selectedCriteria={this.state.selectedCriteria}
            onUpdateSelectedCriteria={this.onUpdateSelectedCriteria}
          />
        );
    }
  };

  checkForRequiredFields = (quantityAndFillLimitObject) => {
    let tempErr = {};
    console.log(quantityAndFillLimitObject);

    if (Object.keys(quantityAndFillLimitObject).length > 0) {
      const {
        quantity,
        days,
        periodOfTime,
        fillsAllowed,
        fillLimitPeriodOfTime,
      } = quantityAndFillLimitObject;

      // if (
      //   quantity != "" ||
      //   days !== "" ||
      //   periodOfTime != "" ||
      //   fillsAllowed !== "" ||
      //   fillLimitPeriodOfTime != ""
      // ) {
      //   return true;
      // } else {
      //   return false;
      // }
      if (
        quantityAndFillLimitObject.quantity == "" ||
        quantityAndFillLimitObject.quantity == undefined
      ) {
        if (
          days !== "" ||
          periodOfTime != "" ||
          fillsAllowed !== "" ||
          fillLimitPeriodOfTime != ""
        ) {
          tempErr = {
            quantity: false,
            days: false,
          };
          this.setState({ errorObject: tempErr });
          return true;
        }
        // } else if (
        //   quantityAndFillLimitObject.days == "" ||
        //   quantityAndFillLimitObject.days == undefined
        // ) {
        //   tempErr = {
        //     days: true,
        //   };
        //   this.setState({ errorObject: tempErr });
        //   return false;
      } else {
        tempErr = {
          quantity: false,
          days: false,
        };
        this.setState({ errorObject: tempErr });
        return true;
      }
    } else {
      tempErr = {
        quantity: true,
        days: true,
      };
      this.setState({ errorObject: tempErr });
      return false;
    }

    // return false;
  };

  showDrugGrid = (searchBody = null) => {
    this.setState({ drugGridContainer: true });
    console.log("{searchBody}", this.props.advancedSearchBody);

    let apiDetails = {
      formulary_id: this.props.current_formulary.id_formulary,
      pathParams:
        this.props.current_formulary.id_formulary +
        "/" +
        this.props.current_formulary.formulary_type_info.formulary_type_code,

      keyVals: [
        { key: constants.KEY_INDEX, value: 0 },
        { key: constants.KEY_LIMIT, value: 10 },
      ],
    };
    apiDetails["messageBody"] = {};
    apiDetails["messageBody"][
      "selected_criteria_ids"
    ] = this.state.selectedCriteria;
    if (searchBody) {
      apiDetails["messageBody"] = Object.assign({}, searchBody);
    }
    console.log("[apiDetails]:", apiDetails);
    this.props.postFormularyDrugQl(apiDetails).then((json) => {
      console.log("[QlDetail]:", json.payload);
      // if (json.payload) {
      this.loadGridData(json);
      console.log("{drugCount", json.payload.count);
      this.setState({ drugCount: json.payload.count });
      // } else {
      // showMessage("something went wrong", "error");
      // }
    });
    // }
  };

  goToSettingSection = () => {
    window.scrollTo({
      top: 420,
      left: 0,
      behavior: "smooth",
    });
  };

  loadGridData(json: any) {
    let tmpData = json.payload.result;
    var data: any[] = [];
    var switchState = this.props.switchState;
    let count = 1;
    var gridData: any = tmpData.map(function (el) {
      var element = Object.assign({}, el);
      data.push(element);
      let gridItem = {};
      gridItem["id"] = count;
      gridItem["key"] = count;
      gridItem["is_um_criteria"] = element.is_um_criteria;
      gridItem["covered_genders"] = element.covered_genders;
      gridItem["covered_icds"] = element.covered_icds;
      gridItem["covered_max_ages"] = element.covered_max_ages;
      gridItem["covered_max_operators"] = element.covered_max_operators
        ? "" + element.covered_max_operators
        : "";

      if (switchState) {
        gridItem["isDisabled"] = true;
      }

      gridItem["covered_min_ages"] = element.covered_min_ages
        ? "" + element.covered_min_ages
        : "";
      gridItem["drug_label_name"] = element.drug_label_name
        ? "" + element.drug_label_name
        : "";
      gridItem["covered_min_operators"] = "";
      gridItem[
        "covered_patient_residences"
      ] = element.covered_patient_residences
        ? "" + element.covered_patient_residences
        : "";
      gridItem["covered_pharmacy_networks"] = element.covered_pharmacy_networks
        ? "" + element.covered_pharmacy_networks
        : "";
      gridItem["trademark_code"] = element.trademark_code
        ? "" + element.trademark_code
        : "";
      gridItem["database_category"] = element.database_category
        ? "" + element.database_category
        : "";
      gridItem["covered_place_of_services"] = element.covered_place_of_services
        ? "" + element.covered_place_of_services
        : "";
      gridItem[
        "covered_prescriber_taxonomies"
      ] = element.covered_prescriber_taxonomies
        ? "" + element.covered_prescriber_taxonomies
        : "";
      gridItem["created_by"] = element.created_by
        ? "" + element.created_by
        : "";

      gridItem["created_date"] = element.created_date
        ? "" + element.created_date
        : "";
      gridItem["data_source"] = element.data_source
        ? "" + element.data_source
        : "";
      gridItem[
        "drug_descriptor_identifier"
      ] = element.drug_descriptor_identifier
        ? "" + element.drug_descriptor_identifier
        : "";
      gridItem["file_type"] = element.file_type ? "" + element.file_type : "";
      gridItem["fills_allowed"] = element.fills_allowed
        ? "" + element.fills_allowed
        : "";
      gridItem["formulary_drug_id"] = element.formulary_drug_id
        ? "" + element.formulary_drug_id
        : "";
      gridItem["full_limit_period_of_time"] = element.full_limit_period_of_time
        ? "" + element.full_limit_period_of_time
        : "";
      gridItem[
        "generic_product_identifier"
      ] = element.generic_product_identifier
        ? "" + element.generic_product_identifier
        : "";
      gridItem["is_al"] = element.is_al ? "" + element.is_al : "";
      gridItem["is_fff"] = element.is_fff ? "" + element.is_fff : "";
      gridItem["is_gl"] = element.is_gl ? "" + element.is_gl : "";
      gridItem["is_patrs"] = element.is_patrs ? "" + element.is_patrs : "";
      gridItem["is_phnw"] = element.is_phnw ? "" + element.is_phnw : "";
      gridItem["is_pos"] = element.is_pos ? "" + element.is_pos : "";
      gridItem["is_prtx"] = element.is_prtx ? "" + element.is_prtx : "";
      gridItem["is_user_defined_1"] = element.is_user_defined_1
        ? "" + element.is_user_defined_1
        : "";
      gridItem["is_user_defined_2"] = element.is_user_defined_2
        ? "" + element.is_user_defined_2
        : "";
      gridItem["is_user_defined_2"] = element.is_user_defined_2
        ? "" + element.is_user_defined_2
        : "";
      gridItem["is_user_defined_3"] = element.is_user_defined_3
        ? "" + element.is_user_defined_3
        : "";
      gridItem["is_user_defined_4"] = element.is_user_defined_4
        ? "" + element.is_user_defined_4
        : "";
      gridItem["is_user_defined_5"] = element.is_user_defined_5
        ? "" + element.is_user_defined_5
        : "";
      gridItem["lookback_days"] = element.lookback_days
        ? "" + element.lookback_days
        : "";
      gridItem["md5_id"] = element.md5_id ? "" + element.md5_id : "";
      gridItem["modified_by"] = element.modified_by
        ? "" + element.modified_by
        : "";
      gridItem["modified_date"] = element.modified_date
        ? "" + element.modified_date
        : "";
      gridItem["not_covered_genders"] = element.not_covered_genders
        ? "" + element.not_covered_genders
        : "";
      gridItem["not_covered_icds"] = element.not_covered_icds
        ? "" + element.not_covered_icds
        : "";
      gridItem["not_covered_max_ages"] = element.not_covered_max_ages
        ? "" + element.not_covered_max_ages
        : "";
      gridItem["not_covered_max_operators"] = element.not_covered_max_operators
        ? "" + element.not_covered_max_operators
        : "";
      gridItem["not_covered_max_operators"] = element.not_covered_max_operators
        ? "" + element.not_covered_max_operators
        : "";
      gridItem["not_covered_min_ages"] = element.not_covered_min_ages
        ? "" + element.not_covered_min_ages
        : "";
      gridItem["not_covered_min_operators"] = element.not_covered_min_operators
        ? "" + element.not_covered_min_operators
        : "";
      gridItem[
        "not_covered_patient_residences"
      ] = element.not_covered_patient_residences
        ? "" + element.not_covered_patient_residences
        : "";
      gridItem[
        "not_covered_pharmacy_networks"
      ] = element.not_covered_pharmacy_networks
        ? "" + element.not_covered_pharmacy_networks
        : "";
      gridItem[
        "not_covered_place_of_services"
      ] = element.not_covered_place_of_services
        ? "" + element.not_covered_place_of_services
        : "";
      gridItem[
        "not_covered_prescriber_taxonomies"
      ] = element.not_covered_prescriber_taxonomies
        ? "" + element.not_covered_prescriber_taxonomies
        : "";
      gridItem["override_category"] = element.override_category
        ? "" + element.override_category
        : "";
      gridItem["override_class"] = element.override_class
        ? "" + element.override_class
        : "";
      gridItem["pa_group_description"] = element.pa_group_description
        ? "" + element.pa_group_description
        : "";
      gridItem["pa_type"] = element.pa_type ? "" + element.pa_type : "";
      gridItem["ql_days"] = element.ql_days ? "" + element.ql_days : "";
      gridItem["ql_period_of_time"] = element.ql_period_of_time
        ? "" + element.ql_period_of_time
        : "";
      gridItem["ql_quantity"] = element.ql_quantity
        ? "" + element.ql_quantity
        : "";
      gridItem["ql_type"] = element.ql_type ? "" + element.ql_type : "";
      gridItem["st_group_description"] = element.st_group_description
        ? "" + element.st_group_description
        : "";
      gridItem["st_type"] = element.st_type ? "" + element.st_type : "";
      gridItem["st_value"] = element.st_value ? "" + element.st_value : "";
      gridItem["tier_value"] = element.tier_value
        ? "" + element.tier_value
        : "";
      gridItem["user_defined"] = element.user_defined
        ? "" + element.user_defined
        : "";

      count++;
      return gridItem;
    });
    this.setState({
      drugData: data,
      drugGridData: gridData,
      drugGridContainer: true,
    });
  }

  handleOnChange = (e) => {
    let tempObject = {
      ...this.state.quantityAndFillLimitObject,
      [e.target.name]: Number(e.target.value),
    };
    let temError = {
      ...this.state.errorObject,
      [e.target.name]: false,
    };

    this.setState({
      quantityAndFillLimitObject: tempObject,
      errorObject: temError,
    });
  };
  onSelectedTableRowChanged = (selectedRowKeys) => {
    this.state.selectedDrugs = [];
    console.log("[selectedRowKeys]:", selectedRowKeys);

    if (selectedRowKeys && selectedRowKeys.length > 0) {
      this.state.selectedDrugs = selectedRowKeys.map(
        (tierId) => this.state.drugData[tierId - 1]["md5_id"]
      );
    }
  };

  onUpdateSelectedCriteria = (currentSelectedCriteriaIds) => {
    this.setState({ selectedCriteria: currentSelectedCriteriaIds });
  };

  componentDidMount() {
    this.props
      .getQlSummary(this.props.current_formulary.id_formulary)
      .then((json) => {
        console.log("[json.payload]", json.payload);
        this.initailizeQlSummary(json);
      });
    console.log("in ql, [curenformulary]:", this.props.current_formulary);
  }

  initailizeQlSummary(json: any) {
    let tmpData =
      json.payload && json.payload.result ? json.payload.result : [];

    var rows = tmpData.map(function (el) {
      var curRow = [
        el["ql_type_name"],
        el["total_group_description_count"],
        el["added_group_description_count"],
        el["removed_group_description_count"],
      ];
      return curRow;
    });

    console.log(rows);
    this.setState({
      panelGridValue: rows,
    });
  }

  getCurrentAction = () => {
    const activeTabIndex = this.state.activeTabIndex;
    switch (activeTabIndex) {
      case 0:
        return constants.TYPE_REPLACE;
      case 1:
        return "append";
      case 2:
        return constants.TYPE_REMOVE;
    }
  };

  handleSave = () => {
    // debugger;
    const { quantityAndFillLimitObject } = this.state;
    let currentAction = this.getCurrentAction();
    console.log(
      "[quantityAndFillLimitObject]:",
      this.state.quantityAndFillLimitObject
    );
    console.log("[selectedDrug]", this.state.selectedDrugs);
    console.log("[drugData]:", this.state.drugData);
    console.log("[action]:", currentAction);

    let apiDetails = {};

    apiDetails["pathParams"] =
      this.props.current_formulary.id_formulary +
      "/" +
      this.props.current_formulary.formulary_type_info.formulary_type_code +
      "/" +
      currentAction;
    apiDetails["messageBody"] = {};
    apiDetails["messageBody"]["selected_drug_ids"] = this.state.selectedDrugs;
    // apiDetails["messageBody"]["covered"] = { drug_list_ids: [] };
    // apiDetails["messageBody"]["not_covered"] = {
    //   formulary_drug_ids: [],
    //   drug_ids: [],
    // };

    apiDetails["messageBody"]["quantity"] = quantityAndFillLimitObject[
      "quantity"
    ]
      ? quantityAndFillLimitObject["quantity"]
      : null;
    apiDetails["messageBody"][
      "quantity_limit_days"
    ] = quantityAndFillLimitObject["days"]
      ? quantityAndFillLimitObject["days"]
      : null;
    apiDetails["messageBody"]["quantity_limit_period_of_time"] =
      quantityAndFillLimitObject["periodOfTime"];
    apiDetails["messageBody"]["fills_allowed"] = quantityAndFillLimitObject[
      "fillsAllowed"
    ]
      ? quantityAndFillLimitObject["fillsAllowed"]
      : null;
    apiDetails["messageBody"][
      "full_limit_period_of_time"
    ] = quantityAndFillLimitObject["fillLimitPeriodOfTime"]
      ? quantityAndFillLimitObject["fillLimitPeriodOfTime"]
      : null;
    apiDetails["messageBody"]["is_select_all"] = false;
    apiDetails["messageBody"]["search_key"] = "";
    apiDetails["messageBody"][
      "selected_criteria_ids"
    ] = this.state.selectedCriteria;
    if (
      this.state.additionalCriteriaState != null &&
      this.state.is_additional_criteria_defined
    ) {
      apiDetails["messageBody"]["is_custom_additional_criteria"] = true;
      apiDetails["messageBody"][
        "um_criteria"
      ] = this.state.additionalCriteriaState;
    }

    apiDetails["messageBody"]["filter"] = [];

    console.log("[path]:", apiDetails["pathParams"]);
    console.log("{apiDetails}", apiDetails);

    const saveData = this.props
      .postApplyFormularyDrugQl(apiDetails)
      .then((json) => {
        console.log("Save response is:" + JSON.stringify(json));
        console.log("[json]", json);

        if (json.payload && json.payload.code === "200") {
          showMessage("Success", "success");
          this.state.drugData = [];
          this.state.drugGridData = [];
          let payload = {
            additionalCriteriaBody: this.props.additionalCriteriaBody,
          };

          payload.additionalCriteriaBody = [];

          this.props.setAdditionalCriteria(payload);
          // this.setState({ quantityAndFillLimitObject: {} });
          this.goToSettingSection();
          this.showDrugGrid();

          this.props
            .getQlSummary(this.props.current_formulary.id_formulary)
            .then((json) => {
              console.log("[new ql summary]", json);
              this.initailizeQlSummary(json);
            });
          // window.scrollTo(0, 50);
        } else {
          showMessage("Failure", "error");
        }
      });
  };

  advanceSearchClickHandler = () => {
    this.setState({ isAdvanceSearchOpen: !this.state.isAdvanceSearchOpen });
  };

  openAdditionalCriteria = () => {
    if (this.state.is_additional_criteria_defined) {
      this.setState({
        is_additional_criteria_defined: false,
        isAdditionalCriteriaOpen: false,
      });
    } else {
      this.setState({
        is_additional_criteria_defined: true,
        isAdditionalCriteriaOpen: true,
      });
    }
  };
  closeAdditonalCriteria = () => {
    this.setState({
      isAdditionalCriteriaOpen: false,
    });
  };

  onRadioButtohandleChange = (e) => {
    let tmp_value = e.target.value;
    let tmp_key = e.target.name;
    if (e.target.value == "true") {
      tmp_value = true;
    } else if (e.target.value == "false") {
      tmp_value = false;
    }
    this.setState({ is_additional_criteria_defined: tmp_value });
  };

  onApply = () => {
    if (this.getCurrentAction() !== constants.TYPE_REMOVE) {
      if (
        this.checkForRequiredFields({
          ...this.state.quantityAndFillLimitObject,
        })
      ) {
        this.showDrugGrid();
      } else {
        showMessage("Please fill the required fields", "error");
      }
    } else {
      if (this.state.selectedCriteria.length == 0) {
        showMessage("Select Crieria to Remove Drugs", "error");
      } else {
        this.showDrugGrid();
      }
    }
  };

  rowSelectionChangeFromCell = (
    key: string,
    selectedRow: any,
    isSelected: boolean
  ) => {
    console.log("data row ", selectedRow, isSelected);
    if (!selectedRow["isDisabled"]) {
      if (isSelected) {
        const data = this.state.drugGridData.map((d: any) => {
          if (d.key === selectedRow.key) d["isChecked"] = true;
          // else d["isChecked"] = false;
          return d;
        });
        const selectedRowKeys = [
          ...this.state.selectedRowKeys,
          selectedRow.key,
        ];
        console.log("selected row keys ", selectedRowKeys);
        const selectedRows: number[] = selectedRowKeys.filter(
          (k) => this.state.fixedSelectedRows.indexOf(k) < 0
        );
        this.onSelectedTableRowChanged(selectedRowKeys);

        this.setState({ drugGridData: data });
      } else {
        const data = this.state.drugGridData.map((d: any) => {
          if (d.key === selectedRow.key) d["isChecked"] = false;
          // else d["isChecked"] = false;
          return d;
        });

        const selectedRowKeys: number[] = this.state.selectedRowKeys.filter(
          (k) => k !== selectedRow.key
        );
        const selectedRows = selectedRowKeys.filter(
          (k) => this.state.fixedSelectedRows.indexOf(k) < 0
        );

        this.onSelectedTableRowChanged(selectedRows);
        this.setState({
          drugGridData: data,
        });
      }
    }
  };

  onSelectAllRows = (isSelected: boolean) => {
    const selectedRowKeys: number[] = [];
    const data = this.state.drugGridData.map((d: any) => {
      if (!d["isDisabled"]) {
        d["isChecked"] = isSelected;
        if (isSelected) selectedRowKeys.push(d["key"]);
      }

      // else d["isSelected"] = false;
      return d;
    });
    const selectedRows: number[] = selectedRowKeys.filter(
      (k) => this.state.fixedSelectedRows.indexOf(k) < 0
    );
    this.onSelectedTableRowChanged(selectedRows);
    this.setState({ drugGridData: data });
  };

  componentDidUpdate = (prevState) => {
    // debugger;
    // if (
    //   this.state.drugGridContainer &&
    //   Object.keys(this.state.quantityAndFillLimitObject).length > 0
    // ) {
    //   window.scrollTo({
    //     top: 420,
    //     left: 0,
    //     behavior: "smooth",
    //   });
    // }
  };
  UNSAFE_componentWillReceiveProps(nextProps) {
    // debugger;
    if (nextProps.switchState) {
      this.showDrugGrid({ ...nextProps.advancedSearchBody });
      this.setState({
        tabs: this.state.tabs.map((tab) => {
          tab["disabled"] = true;
          return tab;
        }),
        is_additional_criteria_defined: false,
      });
      this.onClickTab(0);
    } else {
      this.setState({
        tabs: [
          { id: 1, text: "Replace" },
          { id: 2, text: "Append" },
          { id: 3, text: "Remove" },
        ],
        drugGridContainer: false,
      });
    }

    if (nextProps.advancedSearchBody && nextProps.populateGrid) {
      this.showDrugGrid({ ...nextProps.advancedSearchBody });
      let payload = {
        advancedSearchBody: nextProps.advancedSearchBody,
        populateGrid: false,
        closeDialog: nextProps.closeDialog,
        listItemStatus: nextProps.listItemStatus,
      };
      if (nextProps.closeDialog) {
        this.state.isAdvanceSearchOpen = false;
        payload["closeDialog"] = false;
      }
      this.props.setAdvancedSearch(payload);
    }

    if (nextProps.additionalCriteriaBody) {
      const additionalCriteriaState = nextProps.additionalCriteriaBody;
      this.setState({ additionalCriteriaState }, () =>
        console.log(this.state.additionalCriteriaState)
      );
    }
  }

  render() {
    console.log("in ql [data]", this.props.qlData);
    console.log("[drugGridData]", this.state.drugGridData);
    const searchProps = {
      lobCode: this.props.formulary_lob_id,
    };
    const dataLength = this.state.drugGridData.length > 0 ? true : false;
    return (
      <div className="drug-detail-LA-root">
        <div className="drug-detail-la-container">
          <div className="drug-detail-la-inner">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <div className="mb-10">
                  <div className="limited-access">
                    <PanelHeader
                      title="SELECT Quantity Limit CRITERIA"
                      tooltip="This section allows for Addition or Removal of product only. To define coverage for all Medicare covered and/or Supplemental products, go to Drug Details"
                    />
                    <div className="inner-container tier-checkbox white-bg">
                      <PanelGrid
                        panelGridTitle={this.state.panelGridTitle}
                        panelGridValue={this.state.panelGridValue}
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-10">
                  <div className="limited-access">
                    <PanelHeader title="QUANTITY LIMIT SETTINGS" />
                    <div className="modify-wrapper white-bg tier-modify-panel">
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
                            disabled={this.props.switchState}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="tab-content">{this.renderTabContent()}</div>
                  </div>
                </div>
                <div className="mb-10">
                  {this.state.activeTabIndex !== 2 && (
                    <div className="limited-access">
                      <PanelHeader title="FILL LIMIT SETTINGS" />
                      <FillLimitSettings
                        handleOnChange={this.handleOnChange}
                        values={this.state.quantityAndFillLimitObject}
                        isViweAll={this.props.switchState}
                        isChecked={this.state.isAdditionalCriteriaOpen}
                        onRadioButtonClick={this.openAdditionalCriteria}
                        is_additional_criteria_defined={
                          this.state.is_additional_criteria_defined
                        }
                      />
                      {this.state.isAdditionalCriteriaOpen && (
                        <AdvanceSearchContainer
                          {...searchProps}
                          openPopup={this.state.isAdditionalCriteriaOpen}
                          onClose={this.closeAdditonalCriteria}
                          isAdvanceSearch={false}
                        />
                      )}
                    </div>
                  )}
                </div>
              </Grid>
              <div
                className="apply-button"
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  width: "100%",
                }}
              >
                <Button
                  label="Apply"
                  onClick={this.onApply}
                  disabled={this.props.switchState}
                ></Button>
              </div>
            </Grid>
            {this.state.drugGridContainer && dataLength && (
              <div className="select-drug-from-table">
                <div className="bordered white-bg">
                  {/* {!this.props.switchState && ( */}
                  <div
                    className="header space-between pr-10"
                    style={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <div className="button-wrapper">
                      <Button
                        className="Button normal"
                        label="Advance Search"
                        onClick={this.advanceSearchClickHandler}
                      />
                      {!this.props.switchState && (
                        <Button label="Save" onClick={this.handleSave} />
                      )}
                    </div>
                  </div>
                  {/* )} */}
                  <div className="tier-grid-container">
                    <FrxDrugGridContainer
                      isPinningEnabled={false}
                      enableSearch={false}
                      enableColumnDrag
                      settingsWidth={10}
                      onSearch={() => {}}
                      fixedColumnKeys={[]}
                      totalRowsCount={this.state.drugCount}
                      pagintionPosition="topRight"
                      gridName="DRUG GRID"
                      enableSettings
                      columns={QlColumns()}
                      scroll={{ x: 12000, y: 377 }}
                      isFetchingData={false}
                      enableResizingOfColumns
                      data={this.state.drugGridData}
                      rowSelectionChangeFromCell={
                        this.rowSelectionChangeFromCell
                      }
                      onSelectAllRows={this.onSelectAllRows}
                      customSettingIcon={"FILL-DOT"}
                      // rowSelection={{
                      //   // columnWidth: 50,
                      //   fixed: true,
                      //   type: "checkbox",
                      //   // onChange: this.onSelectedTableRowChanged,
                      // }}
                    />
                    {/* 
                    <FrxDrugGridContainer
                      isPinningEnabled={false}
                      enableSearch={false}
                      enableColumnDrag
                      onSearch={() => {}}
                      fixedColumnKeys={[]}
                      pagintionPosition="topRight"
                      gridName="DRUG GRID"
                      enableSettings={false}
                      columns={QlColumns()}
                      scroll={{ x: 13000, y: 377 }}
                      isFetchingData={false}
                      enableResizingOfColumns
                      data={this.state.drugGridData}
                      // settingsWidth={10}
                      rowSelection={{
                        columnWidth: 10,
                        // fixed: true,
                        type: "checkbox",
                        onChange: this.onSelectedTableRowChanged,
                      }}
                    /> */}
                  </div>
                </div>
              </div>
            )}
          </div>
          {this.state.isAdvanceSearchOpen && (
            <AdvanceSearchContainer
              {...searchProps}
              openPopup={this.state.isAdvanceSearchOpen}
              onClose={this.advanceSearchClickHandler}
              isAdvanceSearch={true}
            />
          )}
        </div>
        <ToastContainer />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tier);
