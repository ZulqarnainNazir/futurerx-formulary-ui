import React from "react";
import { connect } from "react-redux";

import Grid from "@material-ui/core/Grid";
import { TabInfo } from "../../../../../../models/tab.model";
import Box from "@material-ui/core/Box";
import Button from "../../../../../shared/Frx-components/button/Button";
import DropDown from "../../../../../shared/Frx-components/dropdown/DropDownMap";
import RadioButton from "../../../../../shared/Frx-components/radio-button/RadioButton";
import {
  getStSummary,
  getStGrouptDescriptions,
  getStTypes,
  getDrugLists,
  postFormularyDrugST,
  getStGrouptDescriptionVersions,
  postApplyFormularyDrugST,
  getLobFormularies,
} from "../../../../../../redux/slices/formulary/stepTherapy/stepTherapyActionCreation";
import "./STF.scss";
import * as constants from "../../../../../../api/http-commons";
import FrxDrugGridContainer from "../../../../../shared/FrxGrid/FrxDrugGridContainer";
import { stColumns } from "../../../../../../utils/grid/columns";
import AdvanceSearchContainer from "../../../../NewAdvanceSearch/AdvanceSearchContainer";
import { setAdvancedSearch } from "../../../../../../redux/slices/formulary/advancedSearch/advancedSearchSlice";
import showMessage from "../../../../Utils/Toast";
import { ToastContainer } from "react-toastify";
import { Row, Col, Space } from "antd";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DialogPopup from "../../../../../shared/FrxDialogPopup/FrxDialogPopup";
import CloneFormularyPopup from "../../FormularySetUp/components/CloneFormularyPopup";
import { ReactComponent as EditIcon } from "../../../../../../assets/icons/EditIcon.svg";

function mapDispatchToProps(dispatch) {
  return {
    getStSummary: (a) => dispatch(getStSummary(a)),
    getStGrouptDescriptions: (a) => dispatch(getStGrouptDescriptions(a)),
    getStTypes: (a) => dispatch(getStTypes(a)),
    getDrugLists: (a) => dispatch(getDrugLists(a)),
    postFormularyDrugST: (a) => dispatch(postFormularyDrugST(a)),
    getStGrouptDescriptionVersions: (a) =>
      dispatch(getStGrouptDescriptionVersions(a)),
    postApplyFormularyDrugST: (a) => dispatch(postApplyFormularyDrugST(a)),
    setAdvancedSearch: (a) => dispatch(setAdvancedSearch(a)),
    getLobFormularies: (a) => dispatch(getLobFormularies(a)),
  };
}

const mapStateToProps = (state) => {
  return {
    client_id: state.application.clientId,
    configureSwitch: state.switchReducer.configureSwitch,
    applyData: state.tierSliceReducer.applyData,
    formulary_id: state?.application?.formulary_id,
    formulary: state?.application?.formulary,
    formulary_lob_id: state?.application?.formulary_lob_id,
    formulary_type_id: state?.application?.formulary_type_id,
    advancedSearchBody: state?.advancedSearch?.advancedSearchBody,
    populateGrid: state?.advancedSearch?.populateGrid,
    closeDialog: state?.advancedSearch?.closeDialog,
  };
};
class STF extends React.Component<any, any> {
  state = {
    selectFormulary: false,
    panelGridTitle1: [
      "Value Based Insurance",
      "Number of Drugs",
      "added drugs",
      "removed drugs",
    ],
    panelTitleAlignment1: ["left", "left", "left", "left"],
    panelGridValue1: [],
    isNotesOpen: false,
    stGroupDescription: [],
    stTypes: [],
    activeTabIndex: 0,
    tabs: [
      { id: 1, text: "Replace" },
      { id: 2, text: "Append" },
      { id: 3, text: "Remove" },
    ],
    tierGridContainer: false,
    showStConfiguration: false,
    isSearchOpen: false,
    selectedLobFormulary: {},
    drugData: Array(),
    drugGridData: Array(),
    selectedDrugs: Array(),
    selectedGroupDescription: null,
    selectedStType: null,
    selectedLastestedVersion: null,
    fileType: null,
    lobFormularies: [],
    stValue: null,
    groupDescriptionProp: "",
  };

  onSelectedTableRowChanged = (selectedRowKeys) => {
    this.state.selectedDrugs = [];
    if (selectedRowKeys && selectedRowKeys.length > 0) {
      this.state.selectedDrugs = selectedRowKeys.map(
        (tierId) => this.state.drugData[tierId - 1]["md5_id"]
      );
    }
  };

  openTierGridContainer = () => {
    this.state.drugData = [];
    this.state.drugGridData = [];

    if (this.state.selectedGroupDescription === null) {
      showMessage("Group Description is required", "info");
      return;
    }

    if (this.state.selectedStType === null) {
      showMessage("ST Type is required", "info");
      return;
    }

    if (this.state.stValue === null) {
      showMessage("ST Value is required", "info");
      return;
    }

    if (
      this.state.showStConfiguration &&
      this.state.selectedLobFormulary["id_formulary"] === undefined
    ) {
      showMessage("Related Formulary is required", "info");
      return;
    }
    this.populateGridData();
  };

  dropDownSelectHandlerLob = (value, event) => {
    let tmp_index = event.key;
    let tmp_value = event.value;
    this.setState({ selectedLobFormulary: tmp_value });
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

  handleSave = () => {
    if (this.state.selectedDrugs && this.state.selectedDrugs.length > 0) {
      let apiDetails = {};
      // apiDetails['apiPart'] = constants.APPLY_TIER;
      debugger;
      apiDetails["lob_type"] = this.props.formulary_lob_id;
      apiDetails["pathParams"] =
        this.props?.formulary_id +
        "/" +
        this.state.fileType +
        "/" +
        this.props.tab_type;
      apiDetails["keyVals"] = [
        { key: constants.KEY_ENTITY_ID, value: this.props?.formulary_id },
      ];
      apiDetails["messageBody"] = {};
      apiDetails["messageBody"]["selected_drug_ids"] = this.state.selectedDrugs;
      apiDetails["messageBody"]["base_st_group_description_id"] = Number(
        this.state.selectedGroupDescription
      );
      apiDetails["messageBody"][
        "id_st_group_description"
      ] = this.state.selectedLastestedVersion;
      apiDetails["messageBody"]["id_st_type"] = Number(
        this.state.selectedStType
      );
      apiDetails["messageBody"]["search_key"] = "";
      apiDetails["messageBody"]["st_value"] = Number(this.state.stValue);

      const saveData = this.props
        .postApplyFormularyDrugST(apiDetails)
        .then((json) => {
          console.log("Save response is:" + JSON.stringify(json));
          if (json.payload && json.payload.code === "200") {
            this.state.drugData = [];
            this.state.drugGridData = [];
            this.populateGridData();
            this.props.getStSummary(this.props?.formulary_id).then((json) => {
              this.setState({ tierGridContainer: true });
            });
          }
        });
    }
  };

  advanceSearchClickHandler = (event) => {
    event.stopPropagation();
    this.setState({ isSearchOpen: !this.state.isSearchOpen });
  };
  advanceSearchClosekHandler = () => {
    this.setState({ isSearchOpen: !this.state.isSearchOpen });
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
    if (nextProps.configureSwitch){
      this.populateGridData();
    }else{
      this.setState({ tierGridContainer: false });
    }
  }
  dropDownSelectHandlerGroupDescription = (value, event) => {
    let tmp_index = event.key;
    let tmp_value = event.value;

    this.setState({ selectedGroupDescription: tmp_value });
    let apiDetails = {};
    apiDetails["lob_type"] = this.props.formulary_lob_id;
    apiDetails["pathParams"] = "/" + tmp_value;
    debugger;
    this.props.getStGrouptDescriptionVersions(apiDetails).then((json) => {
      debugger;
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
      debugger;
      this.setState({
        selectedLastestedVersion: data[0].id_st_group_description,
        fileType: ftype,
      });
      this.setState({
        tierGridContainer: false,
        gridData: [],
        drugGridData: [],
      });
    });
  };

  dropDownSelectHandlerStType = (value, event) => {
    let tmp_index = event.key;
    let tmp_value = event.value;
    this.setState({ selectedStType: tmp_value });
    this.setState({
      tierGridContainer: false,
      gridData: [],
      drugGridData: [],
    });
  };

  st_configurationChange = (event, value) => {
    let tmp_index = event.target.key;
    let tmp_value = event.target.value;

    if (tmp_value == "true") {
      this.setState({ showStConfiguration: true });
    } else {
      this.setState({ showStConfiguration: false });
    }
  };

  handleChange = (e: any) => {
    let tmp_value = e.target.value;
    let tmp_key = e.target.name;
    if (e.target.value == "true") {
      tmp_value = true;
    } else if (e.target.value == "false") {
      tmp_value = false;
    }
    this.setState({ [tmp_key]: e.target.value.trim() });
  };

  populateGridData = (searchBody = null) => {
    console.log("Populate grid data is called");
    let apiDetails = {};
    apiDetails["lob_type"] = this.props.formulary_lob_id;
    // let tmpGroup :any = this.state.paGroupDescriptions.filter(obj  => obj.id_mcr_base_pa_group_description === this.state.selectedGroupDescription);
    let tmp_fileType:any='';
    if ( this.props.configureSwitch){
      apiDetails["messageBody"]["base_st_group_description_id"] = this.state.selectedGroupDescription;
      apiDetails["messageBody"]["id_st_type"] = this.state.selectedStType;
      apiDetails["messageBody"]["st_value"] = this.state.stValue;
      tmp_fileType=this.state.fileType;
    }else{
      switch (this.props.formulary_lob_id) {
        case 1:
          tmp_fileType='MCR';
          break;
        case 4:
            tmp_fileType='COMM';
            break;
        default:
          break;
      }

    }
    apiDetails["pathParams"] = this.props?.formulary_id + "/" + tmp_fileType + "/";
    apiDetails["keyVals"] = [
      { key: constants.KEY_ENTITY_ID, value: this.props?.formulary_id },
      { key: constants.KEY_INDEX, value: 0 },
      { key: constants.KEY_LIMIT, value: 10 },
    ];
    apiDetails["messageBody"] = {};

    if (searchBody) {
      apiDetails["messageBody"] = Object.assign(
        apiDetails["messageBody"],
        searchBody
      );
    }

    
    

    const drugGridDate = this.props
      .postFormularyDrugST(apiDetails)
      .then((json) => {
        debugger;
        let tmpData = json.payload.result;
        var data: any[] = [];
        let count = 1;
        var gridData = tmpData.map(function (el) {
          var element = Object.assign({}, el);
          data.push(element);
          let gridItem = {};
          gridItem["id"] = count;
          gridItem["key"] = count;
          gridItem["tier"] = element.tier_value;
          gridItem["stGroupDescription"] = element.st_group_description;
          gridItem["stType"] = element.st_type;
          gridItem["stValue"] = element.st_value;
          gridItem["fileType"] = element.file_type
            ? "" + element.file_type
            : "";
          gridItem["dataSource"] = element.data_source
            ? "" + element.data_source
            : "";
          gridItem["labelName"] = element.drug_label_name
            ? "" + element.drug_label_name
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
          count++;
          return gridItem;
        });
        this.setState({
          drugData: data,
          drugGridData: gridData,
        });
      });
    this.setState({ tierGridContainer: true });
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
  handleNoteClick = (event: React.ChangeEvent<{}>) => {
    event.stopPropagation();
    this.setState({ isNotesOpen: !this.state.isNotesOpen });
  };
  handleCloseNote = () => {
    this.setState({ isNotesOpen: !this.state.isNotesOpen });
  };
  settingFormApplyHandler = () => {
    this.state.drugData = [];
    this.state.drugGridData = [];

    this.populateGridData();
  };
  
  componentDidMount() {
    switch (this.props.formulary_lob_id) {
      case 1:
        this.setState({
          groupDescriptionProp: "id_st_group_description",
        });
        break;
      case 4:
        this.setState({
          groupDescriptionProp: "id_st_group_description",
        });
        break;
      default:
        break;
    }
    let apiDetails_1 = {};
    apiDetails_1["lob_type"] = this.props.formulary_lob_id;
    apiDetails_1["pathParams"] = "/" + this.props?.client_id;
    this.props.getStGrouptDescriptions(apiDetails_1).then((json) => {
      debugger;
      let result = json.payload.data.filter(
        (obj) => !obj.is_archived && obj.is_setup_complete
      );
      this.setState({
        stGroupDescription: result,
      });
    });

    this.props.getStTypes(this.props.formulary_lob_id).then((json) => {
      this.setState({
        stTypes: json.payload.data,
      });
    });
    let apiDetails = {
      formulary_type_id: this.props?.formulary_type_id,
      formulary_lob_id: this.props?.formulary_lob_id,
    };
    this.props.getLobFormularies(apiDetails).then((json) => {
      debugger;
      this.setState({
        lobFormularies: json.payload.result,
      });
    });
  }
  render() {
    const searchProps = {
      lobCode: this.props.lobCode,
      // pageType: pageTypes.TYPE_TIER
    };
    return (
      <div className="bordered stf-root">
        <div className="modify-wrapper bordered white-bg">
          <div className="settings-form">
            <Grid container>
              <Grid item xs={4}>
                <div className="group">
                  <label>
                    ST GROUP DESCRIPTION<span className="astrict">*</span>
                  </label>
                  <DropDown
                    options={this.state.stGroupDescription}
                    valueProp={this.state.groupDescriptionProp}
                    dispProp="text"
                    onSelect={this.dropDownSelectHandlerGroupDescription}
                    disabled={this.props.configureSwitch}
                  />
                </div>

                <div className="group mt-10">
                  <label>
                    Do you want to view existing ST configurations in another
                    formulary? <span className="astrict">*</span>
                  </label>
                  <Space size="large">
                    <div className="marketing-material radio-group">
                      <RadioButton
                        label="Yes"
                        value="true"
                        name="st_configuration"
                        onChange={this.st_configurationChange}
                        disabled={this.props.configureSwitch}
                      />
                      <RadioButton
                        label="No"
                        value="false"
                        name="st_configuration"
                        onChange={this.st_configurationChange}
                        disabled={this.props.configureSwitch}
                      />
                    </div>
                  </Space>
                </div>

                <div className="group mt-10">
                  <label>
                    do you want to add additional criteria?{" "}
                    <span className="astrict">*</span>
                  </label>
                  <Space size="large">
                    <RadioButton label="Yes" disabled={this.props.configureSwitch} />
                    <RadioButton label="No" disabled={this.props.configureSwitch}/>
                  </Space>
                </div>
              </Grid>
              <Grid item xs={4}>
                <div className="group">
                  <label>
                    ST Type <span className="astrict">*</span>
                  </label>
                  <DropDown
                    options={this.state.stTypes}
                    valueProp="id_st_type"
                    dispProp="st_type_name"
                    onSelect={this.dropDownSelectHandlerStType}
                    disabled={this.props.configureSwitch}
                  />
                </div>
                {this.state.showStConfiguration ? (
                  <div className="group">
                    <label>
                      Select Related Formulary to View Existing configuration?{" "}
                      <span className="astrict">*</span>
                    </label>
                    {/* <DropDown options={this.state.lobFormularies} valueProp="id_formulary" dispProp="formulary_name" onSelect={this.dropDownSelectHandlerLob} disabled={this.props.configureSwitch}/> */}
                    <div className="input-element">
                      <div className="bordered pointer bg-green">
                        <span
                          onClick={(e) => this.handleIconClick()}
                          className="inner-font"
                        >
                          {this.state.selectedLobFormulary["formulary_name"]
                            ? this.state.selectedLobFormulary["formulary_name"]
                            : "Select Formulary"}
                        </span>
                        <EditIcon
                          onClick={(e) => this.handleIconClick()}
                          className={"hide-edit-icon"}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </Grid>

              <Grid item xs={4}>
                <div className="group">
                  <label>
                    ST Value <span className="astrict">*</span>
                  </label>
                  <input
                    type="text"
                    name="stValue"
                    onChange={this.handleChange}
                    disabled={this.props.configureSwitch}
                  />
                </div>
              </Grid>
            </Grid>
            <Box display="flex" justifyContent="flex-end">
              <Button
                label="Apply"
                onClick={this.settingFormApplyHandler}
                disabled={this.props.configureSwitch}
              />
            </Box>
          </div>

          {this.state.tierGridContainer && (
            <div className="select-drug-from-table">
              <div className="bordered white-bg">
                { !this.props.configureSwitch && (
                <div className="header space-between pr-10">
                  <div className="button-wrapper">
                    <Button
                      className="Button normal"
                      label="Advance Search"
                      onClick={this.advanceSearchClickHandler}
                      disabled={this.props.configureSwitch}
                    />
                    <Button label="Save" onClick={this.handleSave} />
                  </div>
                </div>
                )}

                <div className="tier-grid-container">
                  <FrxDrugGridContainer
                    isPinningEnabled={false}
                    enableSearch={false}
                    enableColumnDrag
                    onSearch={() => {}}
                    fixedColumnKeys={[]}
                    pagintionPosition="topRight"
                    gridName="TIER"
                    enableSettings={false}
                    columns={stColumns()}
                    scroll={{ x: 2000, y: 377 }}
                    isFetchingData={false}
                    enableResizingOfColumns
                    data={this.state.drugGridData}
                    rowSelection={{
                      columnWidth: 50,
                      fixed: true,
                      type: "checkbox",
                      onChange: this.onSelectedTableRowChanged,
                    }}
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
        </div>
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

        <ToastContainer />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(STF);
