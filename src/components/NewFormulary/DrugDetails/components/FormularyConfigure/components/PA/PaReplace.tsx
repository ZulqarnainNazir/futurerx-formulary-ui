import React, { useState } from "react";
import { connect } from "react-redux";

import PanelHeader from "../PanelHeader";
import PanelGrid from "../panelGrid";
import CustomizedSwitches from "../CustomizedSwitches";
import FrxMiniTabs from "../../../../../../shared/FrxMiniTabs/FrxMiniTabs";
import { getTapList, getMiniTabs } from "../../../../../../../mocks/formulary/mock-data";
import DialogPopup from "../../../../../../shared/FrxDialogPopup/FrxDialogPopup";
import CloneFormularyPopup from "../../../FormularySetUp/components/CloneFormularyPopup";
import showMessage from "../../../../../Utils/Toast";
//import AdvancedSearch from './../search/AdvancedSearch';
import AdvanceSearchContainer from "../../../../../NewAdvanceSearch/AdvanceSearchContainer";
import { setAdvancedSearch } from "../../../../../../../redux/slices/formulary/advancedSearch/advancedSearchSlice";
import FrxDrugGridContainer from "../../../../../../shared/FrxGrid/FrxDrugGridContainer";
import { PaColumns } from "../../../../../../../utils/grid/columns";
import DropDownMap from "../../../../../../shared/Frx-components/dropdown/DropDownMap";
import DropDown from "../../../../../../shared/Frx-components/dropdown/DropDown";
import { Row, Col, Space } from "antd";
import RadioButton from "../../../../../../shared/Frx-components/radio-button/RadioButton";
import Button from "../../../../../../shared/Frx-components/button/Button";
import * as constants from "../../../../../../../api/http-commons";
import { ToastContainer } from "react-toastify";
import "../Tier.scss";
import "./PA.scss";
import { setAdditionalCriteria } from "../../../../../../../redux/slices/formulary/advancedSearch/additionalCriteriaSlice";
import PaGroupDescriptionManagement from "../PaGroupDescriptionManagement";
import "./PaReplace.scss";

// import AdvanceSearchContainer from "../../../../../NewAdvanceSearch/AdvanceSearchContainer";
import {
  getPaSummary,
  getPaGrouptDescriptions,
  getPaGrouptDescription,
  getPaTypes,
  getDrugLists,
  postFormularyDrugPA,
  postRelatedFormularyDrugPA,
  getPaGrouptDescriptionVersions,
  postApplyFormularyDrugPA,
  getLobFormularies,
} from "../../../../../../../redux/slices/formulary/pa/paActionCreation";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { ReactComponent as EditIcon } from "../../../../../../../assets/icons/EditIcon.svg";

function mapDispatchToProps(dispatch) {
  return {
    getPaSummary: (a) => dispatch(getPaSummary(a)),
    getPaGrouptDescriptions: (a) => dispatch(getPaGrouptDescriptions(a)),
    getPaGrouptDescription: (a) => dispatch(getPaGrouptDescription(a)),
    getPaTypes: (a) => dispatch(getPaTypes(a)),
    getDrugLists: (a) => dispatch(getDrugLists(a)),
    postFormularyDrugPA: (a) => dispatch(postFormularyDrugPA(a)),
    getPaGrouptDescriptionVersions: (a) => dispatch(getPaGrouptDescriptionVersions(a)),
    postApplyFormularyDrugPA: (a) => dispatch(postApplyFormularyDrugPA(a)),
    getLobFormularies: (a) => dispatch(getLobFormularies(a)),
    postRelatedFormularyDrugPA: (a) => dispatch(postRelatedFormularyDrugPA(a)),
    setAdvancedSearch: (a) => dispatch(setAdvancedSearch(a)),
    setAdditionalCriteria: (a) => dispatch(setAdditionalCriteria(a)),
  };
}

const mapStateToProps = (state) => {
  return {
    client_id: state.application.clientId,
    current_formulary: state.application.formulary,
    configureSwitch: state.switchReducer.configureSwitch,
    applyData: state.tierSliceReducer.applyData,
    formulary_id: state?.application?.formulary_id,
    formulary: state?.application?.formulary,
    formulary_lob_id: state?.application?.formulary_lob_id,
    formulary_type_id: state?.application?.formulary_type_id,
    advancedSearchBody: state?.advancedSearch?.advancedSearchBody,
    additionalCriteriaBody: state?.additionalCriteria?.additionalCriteriaBody,
    populateGrid: state?.advancedSearch?.populateGrid,
    closeDialog: state?.advancedSearch?.closeDialog,
  };
};

class PaReplace extends React.Component<any, any> {
  state = {
    selectFormulary: false,
    tierGridContainer: false,
    isSearchOpen: false,
    paTypes: [],
    paGroupDescriptions: Array(),
    drugData: Array(),
    drugGridData: Array(),
    selectedDrugs: Array(),
    selectedGroupDescription: null,
    selectedGroupDescriptionObj: {},
    selectedPaType: null,
    showPaConfiguration: false,
    selectedLastestedVersion: null,
    fileType: null,
    lobFormularies: null,
    selectedLobFormulary: {},
    groupDescriptionProp: "",
    isAdditionalCriteriaOpen: false,
    additionalCriteriaState: null,
    showPaGroupDescription: false,
    is_additional_criteria_defined: false,
    selectedRowKeys: [] as number[],
    fixedSelectedRows: [] as number[],
  };

  rowSelectionChangeFromCell = (key: string, selectedRow: any, isSelected: boolean) => {
    console.log("data row ", selectedRow, isSelected);
    if (!selectedRow["isDisabled"]) {
      if (isSelected) {
        const data = this.state.drugGridData.map((d: any) => {
          if (d.key === selectedRow.key) d["isChecked"] = true;
          // else d["isChecked"] = false;
          return d;
        });
        const selectedRowKeys = [...this.state.selectedRowKeys, selectedRow.key];
        console.log("selected row keys ", selectedRowKeys);
        const selectedRows: number[] = selectedRowKeys.filter((k) => this.state.fixedSelectedRows.indexOf(k) < 0);
        this.onSelectedTableRowChanged(selectedRowKeys);

        this.setState({ drugGridData: data });
      } else {
        const data = this.state.drugGridData.map((d: any) => {
          if (d.key === selectedRow.key) d["isChecked"] = false;
          // else d["isChecked"] = false;
          return d;
        });

        const selectedRowKeys: number[] = this.state.selectedRowKeys.filter((k) => k !== selectedRow.key);
        const selectedRows = selectedRowKeys.filter((k) => this.state.fixedSelectedRows.indexOf(k) < 0);

        this.onSelectedTableRowChanged(selectedRows);
        this.setState({
          drugGridData: data,
        });
      }
    }
  };

  onSelectedTableRowChanged = (selectedRowKeys) => {
    this.state.selectedDrugs = [];
    if (selectedRowKeys && selectedRowKeys.length > 0) {
      this.state.selectedDrugs = selectedRowKeys.map((tierId) => this.state.drugData[tierId - 1]["md5_id"]);
    }
  };

  openTierGridContainer = () => {
    this.state.drugData = [];
    this.state.drugGridData = [];

    if (this.state.selectedGroupDescription === null) {
      showMessage("Group Description is required", "info");
      return;
    }

    if (this.state.selectedPaType === null) {
      showMessage("PA Type is required", "info");
      return;
    }

    if (this.state.showPaConfiguration && this.state.selectedLobFormulary["id_formulary"] === undefined) {
      showMessage("Related Formulary is required", "info");
      return;
    }

    this.populateGridData();
  };

  onClose = () => {
    console.log("close");
    this.setState({ selectFormulary: false });
    return true;
  };
  handleIconClick = () => {
    this.setState({ selectFormulary: true });
  };

  selectFormularyClick = (dataRow) => {
    console.log(dataRow);
    if (dataRow) {
      this.state.selectedLobFormulary = dataRow;
      // if(this.state.currentPopupType === this.POPUP_TYPE_BASE){
      //  // this.state.baseFormulary = dataRow;
      // }else if(this.state.currentPopupType === this.POPUP_TYPE_REFERENCE){
      //   //this.state.referenceFormulary = dataRow;
      // }
    }
    this.setState({ selectFormulary: false });
  };

  componentWillReceiveProps(nextProps) {
    //this.initialize(nextProps);
    if (nextProps.advancedSearchBody && nextProps.populateGrid) {
      this.populateGridData(nextProps.advancedSearchBody);
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
      this.props.setAdvancedSearch(payload);
    }
    if (nextProps.additionalCriteriaBody) {
      this.setState({
        additionalCriteriaState: nextProps.additionalCriteriaBody,
      });
    }
    if (nextProps.configureSwitch) {
      this.setState({
        showPaConfiguration: false,
        selectedGroupDescription: null,
        selectedPaType: null,
        is_additional_criteria_defined: false,
      });
      this.populateGridData();
    } else {
      this.setState({ tierGridContainer: false });
    }
  }

  advanceSearchClickHandler = (event) => {
    event.stopPropagation();
    this.setState({ isSearchOpen: !this.state.isSearchOpen });
  };
  advanceSearchClosekHandler = () => {
    this.setState({ isSearchOpen: !this.state.isSearchOpen });
  };

  handleSave = () => {
    if (this.state.selectedDrugs && this.state.selectedDrugs.length > 0) {
      let apiDetails = {};
      // apiDetails['apiPart'] = constants.APPLY_TIER;
      apiDetails["lob_type"] = this.props.formulary_lob_id;
      apiDetails["pathParams"] = this.props?.formulary_id + "/" + this.state.fileType + "/" + this.props.tab_type;
      apiDetails["keyVals"] = [{ key: constants.KEY_ENTITY_ID, value: this.props?.formulary_id }];
      apiDetails["messageBody"] = {};
      apiDetails["messageBody"]["selected_drug_ids"] = this.state.selectedDrugs;
      apiDetails["messageBody"]["base_pa_group_description_id"] = this.state.selectedGroupDescription;
      apiDetails["messageBody"]["id_pa_group_description"] = this.state.selectedLastestedVersion;
      apiDetails["messageBody"]["id_pa_type"] = Number(this.state.selectedPaType);
      apiDetails["messageBody"]["search_key"] = "";

      if (this.state.additionalCriteriaState != null && this.state.is_additional_criteria_defined) {
        apiDetails["messageBody"]["is_custom_additional_criteria"] = true;
        apiDetails["messageBody"]["um_criteria"] = this.state.additionalCriteriaState;
      } else {
        apiDetails["messageBody"]["is_custom_additional_criteria"] = false;
        apiDetails["messageBody"]["um_criteria"] = [];
      }

      //apiDetails['messageBody']['id_tier'] = this.state.selectedTier;

      const saveData = this.props.postApplyFormularyDrugPA(apiDetails).then((json) => {
        console.log("Save response is:" + JSON.stringify(json));
        if (json.payload && json.payload.code === "200") {
          showMessage("Success", "success");
          this.state.drugData = [];
          this.state.drugGridData = [];
          this.populateGridData();

          this.props.getPaSummary(this.props.current_formulary.id_formulary).then((json) => {
            debugger;
            this.setState({ tierGridContainer: true });
          });
        } else {
          showMessage("Failure", "error");
        }
      });
    }
  };

  
  dropDownSelectHandlerGroupDescription = (tmp_value, event) => {
    debugger;
    // let tmp_index = event.key;
    // let tmp_value = event.value;
    this.setState({ selectedGroupDescription: tmp_value });
    let apiDetails = {};
    apiDetails["lob_type"] = this.props.formulary_lob_id;
    apiDetails["pathParams"] = "/" + tmp_value;
    this.state.showPaGroupDescription=false;
    let selected = this.state.paGroupDescriptions.filter(
      (obj) => obj[this.state.groupDescriptionProp] == tmp_value
    )[0];
    this.setState({
      selectedGroupDescriptionObj : selected
    });
    this.props.getPaGrouptDescriptionVersions(apiDetails).then((json) => {
      let data = json.payload.data;
      let ftype = "";
      switch (this.props.formulary_lob_id) {
        case 1:
          ftype = data[0].file_type;
          break;
        case 4:
          ftype = "COMM";
          break;
        default:
          break;
      }
      let latestVersionId = -1;
      data.forEach((element) => {
        if (element.id_pa_group_description > latestVersionId) {
          latestVersionId = element.id_pa_group_description;
        }
      });
      let tmp_additionalCriteria = false;
      this.props
        .getPaGrouptDescription({
          lob_type: this.props.formulary_lob_id,
          pathParams: "/" + latestVersionId,
        })
        .then((json) => {
          debugger;
          this.props.setAdditionalCriteria([]);
          if (json.payload && json.payload.code === "200") {
            if (json.payload.data["um_criteria"] != null && json.payload.data["um_criteria"].length > 0) {
              let payload: any = {};
              payload.additionalCriteriaBody = json.payload.data["um_criteria"];
              this.props.setAdditionalCriteria(payload);
              tmp_additionalCriteria = true;
            }
          }
          this.setState({
            is_additional_criteria_defined: tmp_additionalCriteria,
          });
        });
      this.setState({
        selectedLastestedVersion: latestVersionId,
        fileType: ftype,
      });
    });
    this.setState({
      tierGridContainer: false,
      gridData: [],
      drugGridData: [],
    });
  };

  dropDownSelectHandlerPaType = (value, event) => {
    let tmp_index = event.key;
    let tmp_value = event.value;
    this.setState({
      selectedPaType: tmp_value,
      tierGridContainer: false,
      gridData: [],
      drugGridData: [],
    });
  };

  dropDownSelectHandlerLob = (value, event) => {
    let tmp_index = event.key;
    let tmp_value = event.value;
    this.setState({ selectedLobFormulary: tmp_value });
  };

  pa_configurationChange = (event, value) => {
    let tmp_index = event.target.key;
    let tmp_value = event.target.value;

    if (tmp_value == "true") {
      this.setState({ showPaConfiguration: true });
    } else {
      this.setState({ showPaConfiguration: false });
    }
  };

  handleChange = (e: any) => {
    debugger;
    let tmp_value = e.target.value;
    let tmp_key = e.target.name;
    if (e.target.value == "true") {
      tmp_value = true;
    } else if (e.target.value == "false") {
      tmp_value = false;
    }
    this.setState({ [tmp_key]: tmp_value });
  };

  populateGridData = (searchBody = null) => {
    console.log("Populate grid data is called");
    let apiDetails = {};

    // let tmpGroup :any = this.state.paGroupDescriptions.filter(obj  => obj.id_mcr_base_pa_group_description === this.state.selectedGroupDescription);

    apiDetails["keyVals"] = [
      { key: constants.KEY_ENTITY_ID, value: this.props?.formulary_id },
      { key: constants.KEY_INDEX, value: 0 },
      { key: constants.KEY_LIMIT, value: 10 },
    ];
    apiDetails["messageBody"] = {};
    if (searchBody) {
      apiDetails["messageBody"] = Object.assign(apiDetails["messageBody"], searchBody);
    }
    debugger;

    let tmp_fileType: any = "";

    if (this.props.configureSwitch) {
      apiDetails["messageBody"]["base_pa_group_description_id"] = this.state.selectedGroupDescription;
      apiDetails["messageBody"]["id_pa_type"] = this.state.selectedPaType;
      tmp_fileType = this.state.fileType;
    } else {
      switch (this.props.formulary_lob_id) {
        case 1:
          tmp_fileType = "MCR";
          break;
        case 4:
          tmp_fileType = "COMM";
          break;
        default:
          break;
      }
    }

    if (this.state.showPaConfiguration) {
      apiDetails["pathParams"] =
        this.props?.formulary_id + "/" + this.state.selectedLobFormulary["id_formulary"] + "/" + tmp_fileType + "/PA/";
      this.props.postRelatedFormularyDrugPA(apiDetails).then((json) => this.loadGridData(json));
    } else {
      apiDetails["pathParams"] = this.props?.formulary_id + "/" + tmp_fileType + "/";
      this.props.postFormularyDrugPA(apiDetails).then((json) => this.loadGridData(json));
    }

    this.setState({ tierGridContainer: true });
  };

  loadGridData(json: any) {
    {
      if (json.payload != null && json.payload.code === "200") {
        this.setState({ tierGridContainer: true });
        let tmpData = json.payload.result;
        var data: any[] = [];
        let count = 1;

        let selected = this.state.paGroupDescriptions.filter(
          (obj) => obj[this.state.groupDescriptionProp] == this.state.selectedGroupDescription
        )[0];
        debugger;
        var gridData = tmpData.map(function (el) {
          var element = Object.assign({}, el);
          data.push(element);
          let gridItem = {};
          gridItem["id"] = count;
          gridItem["key"] = count;
          debugger;

          if (selected["pa_group_description_name"] === element.pa_group_description) {
            //console.log("element value tier ", selectedGroup, element.pa_group_description);
            gridItem["isChecked"] = true;
            gridItem["isDisabled"] = true;
            // decide on class names based on data properties conditionally
            // the required styles are added under each classNames in FrxGrid.scss (towards the end)
            //table-row--red-font (for red) table-row--green-font (for green) table-row--blue-font for default (for blue)
            gridItem["rowStyle"] = "table-row--blue-font";
          }
          gridItem["tier"] = element.tier_value;
          gridItem["isUmCriteria"] = element.is_um_criteria;
          gridItem["paGroupDescription"] = element.pa_group_description;
          gridItem["paType"] = element.pa_type;
          gridItem["fileType"] = element.file_type ? "" + element.file_type : "";
          gridItem["dataSource"] = element.data_source ? "" + element.data_source : "";
          gridItem["labelName"] = element.drug_label_name ? "" + element.drug_label_name : "";
          gridItem["ndc"] = "";
          gridItem["rxcui"] = element.rxcui ? "" + element.rxcui : "";
          gridItem["gpi"] = element.generic_product_identifier ? "" + element.generic_product_identifier : "";
          gridItem["trademark"] = element.trademark_code ? "" + element.trademark_code : "";
          gridItem["databaseCategory"] = element.database_category ? "" + element.database_category : "";
          count++;
          return gridItem;
        });
        this.setState({
          drugData: data,
          drugGridData: gridData,
        });
      }
    }
  }
  componentDidMount() {
    switch (this.props.formulary_lob_id) {
      case 1:
        this.setState({
          groupDescriptionProp: "id_mcr_base_pa_group_description",
        });
        break;
      case 4:
        this.setState({
          groupDescriptionProp: "id_base_pa_group_description",
        });
        break;
      default:
        break;
    }
    let apiDetails_1 = {};
    apiDetails_1["lob_type"] = this.props.formulary_lob_id;
    apiDetails_1["pathParams"] = "/" + this.props?.client_id;

    this.props.getPaGrouptDescriptions(apiDetails_1).then((json: any) => {
      let result = json.payload.data.filter((obj) => !obj.is_archived && obj.is_setup_complete);
      this.setState({
        paGroupDescriptions: result,
      });
    });

    this.props.getPaSummary(this.props?.formulary_id).then((json) => {
      this.setState({
        paTypes: json.payload.result,
      });
    });

    let apiDetails = {
      formulary_type_id: this.props?.formulary_type_id,
      formulary_lob_id: this.props?.formulary_lob_id,
    };
    this.props.getLobFormularies(apiDetails).then((json) => {
      this.setState({
        lobFormularies: json.payload.result,
      });
    });

    if (this.props.configureSwitch) {
      this.populateGridData();
    }
  }

  // additional criteria toggle
  closeAdditionalCriteria = () => {
    this.setState({ isAdditionalCriteriaOpen: false });
  };
  openAdditionalCriteria = () => {
    debugger;
    this.setState({ isAdditionalCriteriaOpen: true });
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
    const selectedRows: number[] = selectedRowKeys.filter((k) => this.state.fixedSelectedRows.indexOf(k) < 0);
    this.onSelectedTableRowChanged(selectedRows);
    this.setState({ drugGridData: data });
  };
  // additional criteria toggle
  render() {
    const searchProps = {
      lobCode: this.props.lobCode,
      // pageType: pageTypes.TYPE_TIER
    };
    const { isAdditionalCriteriaOpen } = this.state;
    return (
      <>
        <div className="group tier-dropdown white-bg">
          <Row>
            <Col lg={8} className="mb-10">
              <label>
                PA GROUP DESCRIPTION<span className="astrict">*</span>
              </label>
              {/* <DropDownMap
                options={this.state.paGroupDescriptions}
                valueProp={this.state.groupDescriptionProp}
                dispProp="text"
                onSelect={this.dropDownSelectHandlerGroupDescription}
                disabled={this.props.configureSwitch}
                value={this.state.selectedGroupDescription}
              /> */}
              <div className="input-element">
                  <div className="bordered pointer bg-green">
                    <span onClick={(e) => {this.setState({ showPaGroupDescription: true });}} className="inner-font">
                      {this.state.selectedGroupDescriptionObj["pa_group_description_name"]
                        ? this.state.selectedGroupDescriptionObj["pa_group_description_name"]
                        : "Select Group Description"}
                    </span>
                    <EditIcon onClick={(e) =>{this.setState({ showPaGroupDescription: true });}} className={"hide-edit-icon"} />
                  </div>
                </div>
            </Col>
            <Col lg={4}></Col>
            <Col lg={8} className="mb-10">
              <label>
                PA TYPE <span className="astrict">*</span>
              </label>
              <DropDownMap
                options={this.state.paTypes}
                valueProp="id_pa_type"
                dispProp="pa_type_name"
                onSelect={this.dropDownSelectHandlerPaType}
                disabled={this.props.configureSwitch}
                value={this.state.selectedPaType}
              />
              
            </Col>
            <Col lg={8}>
              <label>
                Do you want to view existing PA configurations in another formulary? <span className="astrict">*</span>
              </label>
              <Space size="large">
                <div className="marketing-material radio-group">
                  <RadioButton
                    label="Yes"
                    name="add-filter-1"
                    // checked={isAdditionalCriteriaOpen}
                    onClick={() => this.setState({ showPaConfiguration: true })}
                    disabled={this.props.configureSwitch}
                  />
                  <RadioButton
                    label="No"
                    name="add-filter-1"
                    // checked={!isAdditionalCriteriaOpen}
                    onClick={() => this.setState({ showPaConfiguration: false })}
                    disabled={this.props.configureSwitch}
                  />
                  {/* <RadioGroup
                    aria-label="marketing-material-radio1"
                    className="gdp-radio"
                    name="pa_configuration"
                    onChange={this.pa_configurationChange}
                  >
                    <FormControlLabel
                      value="true"
                      control={<Radio disabled={this.props.configureSwitch} />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="false"
                      control={<Radio disabled={this.props.configureSwitch} />}
                      label="No"
                    />
                  </RadioGroup> */}
                </div>
              </Space>
            </Col>
            <Col lg={4}></Col>
            {this.state.showPaConfiguration ? (
              <Col lg={8}>
                <label>
                  Select Related Formulary to View Existing configuration? <span className="astrict">*</span>
                </label>
                {/* <DropDownMap options={this.state.lobFormularies} valueProp="id_formulary" dispProp="formulary_name" onSelect={this.dropDownSelectHandlerLob} disabled={this.props.configureSwitch}/> */}

                <div className="input-element">
                  <div className="bordered pointer bg-green">
                    <span onClick={(e) => this.handleIconClick()} className="inner-font">
                      {this.state.selectedLobFormulary["formulary_name"]
                        ? this.state.selectedLobFormulary["formulary_name"]
                        : "Select Formulary"}
                    </span>
                    <EditIcon onClick={(e) => this.handleIconClick()} className={"hide-edit-icon"} />
                  </div>
                </div>
              </Col>
            ) : (
              <Col lg={8}></Col>
            )}
            <Col lg={4}></Col>
            <Col lg={8}>
              <label>
                do you want to add additional criteria? <span className="astrict">*</span>
              </label>
              <Space size="large">
                <div className="marketing-material radio-group">
                  <RadioButton
                    label="Yes"
                    name="add-filter"
                    // checked={isAdditionalCriteriaOpen}
                    onClick={() => {
                      this.setState({ isAdditionalCriteriaOpen: true });
                      this.setState({ is_additional_criteria_defined: true });
                    }}
                    disabled={this.props.configureSwitch}
                  />
                  <RadioButton
                    label="No"
                    name="add-filter"
                    // checked={!isAdditionalCriteriaOpen}
                    onClick={() => {
                      this.setState({ is_additional_criteria_defined: false });
                    }}
                    disabled={this.props.configureSwitch}
                  />
                </div>
                {/* <RadioGroup
                  aria-label="marketing-material-radio1"
                  className="gdp-radio"
                  name="is_additional_criteria_defined"
                  onChange={this.handleChange}
                  value={this.state.is_additional_criteria_defined}
                >
                  <FormControlLabel
                    value={true}
                    control={<Radio disabled={this.props.configureSwitch} />}
                    label="Yes"
                    disabled={this.props.configureSwitch}
                    onClick={this.openAdditionalCriteria}
                  />
                  <FormControlLabel
                    value={false}
                    control={<Radio disabled={this.props.configureSwitch} />}
                    label="No"
                    disabled={this.props.editable}
                  />
                </RadioGroup> */}
              </Space>
            </Col>
          </Row>
         
         
          {isAdditionalCriteriaOpen ? (
            <AdvanceSearchContainer
              openPopup={isAdditionalCriteriaOpen}
              onClose={this.closeAdditionalCriteria}
              isAdvanceSearch={false}
            />
          ) : null}
        </div>
        <div className="white-bg">
          <Row justify="end">
            <Col>
              <Button label="Apply" onClick={this.openTierGridContainer} disabled={this.props.configureSwitch}></Button>
            </Col>
          </Row>
        </div>
        {this.state.tierGridContainer && (
          <div className="select-drug-from-table">
            <div className="bordered white-bg">
              <div className="header space-between pr-10">
                <div className="button-wrapper">
                  <Button
                    className="Button normal"
                    label="Advance Search"
                    onClick={this.advanceSearchClickHandler}
                    disabled={this.props.configureSwitch}
                  />
                  {!this.props.configureSwitch && <Button label="Save" onClick={this.handleSave} />}
                </div>
              </div>

              <div className="tier-grid-container">
                <FrxDrugGridContainer
                  isPinningEnabled={false}
                  enableSearch={false}
                  enableColumnDrag
                  onSearch={() => {}}
                  fixedColumnKeys={[]}
                  pagintionPosition="topRight"
                  gridName="DRUG GRID"
                  enableSettings
                  columns={PaColumns()}
                  scroll={{ x: 2000, y: 377 }}
                  isFetchingData={false}
                  enableResizingOfColumns
                  data={this.state.drugGridData}
                  rowSelectionChangeFromCell={this.rowSelectionChangeFromCell}
                  onSelectAllRows={this.onSelectAllRows}
                  customSettingIcon={"FILL-DOT"}
                  settingsWidth={30}
                  // rowSelection={{
                  //   columnWidth: 50,
                  //   fixed: true,
                  //   type: "checkbox",
                  //   onChange: this.onSelectedTableRowChanged,
                  // }}
                />
              </div>
            </div>
            {this.state.isSearchOpen ? (
              <AdvanceSearchContainer
                {...searchProps}
                openPopup={this.state.isSearchOpen}
                onClose={this.advanceSearchClosekHandler}
                isAdvanceSearch={true}
              />
            ) : null}
          </div>
        )}
        {this.state.selectFormulary ? (
          <DialogPopup
            positiveActionText=""
            negativeActionText="Close"
            title={"Select Formulary"}
            handleClose={() => {
              this.setState({
                selectFormulary: !this.state.selectFormulary,
              });
            }}
            handleAction={() => {}}
            open={this.state.selectFormulary}
            showActions={false}
            className=""
            height="80%"
            width="90%"
          >
            {/* <SelectFormularyPopUp formularyToggle={this.formularyToggle} /> */}
            {/* <CloneFormularyPopup type="medicare" /> */}
            <CloneFormularyPopup
              type="commercial" // type will be dynamic based on the LOB
              selectFormularyClick={this.selectFormularyClick}
            />
          </DialogPopup>
        ) : null}
        {this.state.showPaGroupDescription && (
          <DialogPopup
            positiveActionText=""
            negativeActionText="Close"
            title={"Select Group Description"}
            handleClose={() => {
              this.setState({
                showPaGroupDescription: !this.state.showPaGroupDescription,
              });
            }}
            handleAction={() => {}}
            open={this.state.showPaGroupDescription}
            showActions={false}
            className=""
            height="80%"
            width="90%"
          >
            {/* <SelectFormularyPopUp formularyToggle={this.formularyToggle} /> */}
            {/* <CloneFormularyPopup type="medicare" /> */}
            <PaGroupDescriptionManagement isPopUpView={true} selectGroupDescriptionClick={this.dropDownSelectHandlerGroupDescription} />
          </DialogPopup>
        )}
        <ToastContainer />
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaReplace);
