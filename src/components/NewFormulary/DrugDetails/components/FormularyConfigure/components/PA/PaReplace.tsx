
import React, { useState } from "react";
import { connect } from "react-redux";

import PanelHeader from "../PanelHeader";
import PanelGrid from "../panelGrid";
import CustomizedSwitches from "../CustomizedSwitches";
import FrxMiniTabs from "../../../../../../shared/FrxMiniTabs/FrxMiniTabs";
import {
  getTapList,
  getMiniTabs,
} from "../../../../../../../mocks/formulary/mock-data";


import AdvancedSearch from './../search/AdvancedSearch';
import FrxDrugGridContainer from "../../../../../../shared/FrxGrid/FrxDrugGridContainer";
import { PaColumns } from "../../../../../../../utils/grid/columns";
import DropDownMap from "../../../../../../shared/Frx-components/dropdown/DropDownMap";
import DropDown from "../../../../../../shared/Frx-components/dropdown/DropDown";
import { Row, Col, Space } from "antd";
import RadioButton from "../../../../../../shared/Frx-components/radio-button/RadioButton";
import Button from "../../../../../../shared/Frx-components/button/Button";
import * as constants from "../../../../../../../api/http-commons";

import "../Tier.scss";
import "./PA.scss";
import { getPaSummary,getPaGrouptDescriptions, getPaTypes, getDrugLists,postFormularyDrugPA,postRelatedFormularyDrugPA,
  getPaGrouptDescriptionVersions,postApplyFormularyDrugPA,getLobFormularies } from "../../../../../../../redux/slices/formulary/pa/paActionCreation";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

function mapDispatchToProps(dispatch) {
  return {
    getPaSummary:(a)=>dispatch(getPaSummary(a)),
    getPaGrouptDescriptions:(a)=>dispatch(getPaGrouptDescriptions(a)),
    getPaTypes:(a)=>dispatch(getPaTypes(a)),
    getDrugLists:(a)=>dispatch(getDrugLists(a)),
    postFormularyDrugPA:(a) => dispatch(postFormularyDrugPA(a)),
    getPaGrouptDescriptionVersions:(a) => dispatch(getPaGrouptDescriptionVersions(a)),
    postApplyFormularyDrugPA:(a) => dispatch(postApplyFormularyDrugPA(a)),
    getLobFormularies:(a) => dispatch(getLobFormularies(a)),
    postRelatedFormularyDrugPA:(a) => dispatch(postRelatedFormularyDrugPA(a)),
  };
}

const mapStateToProps = (state) => {
  return {
    configureSwitch: state.switchReducer.configureSwitch,
    applyData: state.tierSliceReducer.applyData,
    formulary_id: state?.application?.formulary_id,
    formulary: state?.application?.formulary,
    formulary_lob_id: state?.application?.formulary_lob_id,
    formulary_type_id: state?.application?.formulary_type_id,
    advancedSearchBody: state?.advancedSearch?.advancedSearchBody,
    populateGrid: state?.advancedSearch?.populateGrid,
    closeDialog: state?.advancedSearch?.closeDialog,
  }
}

class PaReplace extends React.Component<any,any> {
  state={
    tierGridContainer: false,
    isSearchOpen:false,
    paTypes:[],
    paGroupDescriptions:Array(),
    drugData: Array(),
    drugGridData: Array(),
    selectedDrugs: Array(),
    selectedGroupDescription:null,
    selectedPaType:null,
    showPaConfiguration:false,
    selectedLastestedVersion:null,
    fileType:null,
    lobFormularies:null,
    selectedLobFormulary:null,
  }

  onSelectedTableRowChanged = (selectedRowKeys) => {
    this.state.selectedDrugs = [];
    if (selectedRowKeys && selectedRowKeys.length > 0) {
      this.state.selectedDrugs = selectedRowKeys.map(tierId => this.state.drugData[tierId - 1]['md5_id']);
    }
  }

  openTierGridContainer = () => {
    this.state.drugData = [];
    this.state.drugGridData = [];
    this.setState({ tierGridContainer: true });
    this.populateGridData();
  };

  handleSave = () => {
    if (this.state.selectedDrugs && this.state.selectedDrugs.length > 0) {
      let apiDetails = {};
     // apiDetails['apiPart'] = constants.APPLY_TIER;

      apiDetails['pathParams'] = this.props?.formulary_id + "/" + this.state.fileType + "/" + constants.TYPE_REPLACE;
      apiDetails['keyVals'] = [{ key: constants.KEY_ENTITY_ID, value: this.props?.formulary_id }];
      apiDetails['messageBody'] = {};
      apiDetails['messageBody']['selected_drug_ids'] = this.state.selectedDrugs;
      apiDetails['messageBody']['base_pa_group_description_id'] = this.state.selectedGroupDescription;
      apiDetails['messageBody']['id_pa_group_description'] = this.state.selectedLastestedVersion;
      apiDetails['messageBody']['id_pa_type'] = Number(this.state.selectedPaType);
      apiDetails['messageBody']['search_key'] = "";
      //apiDetails['messageBody']['id_tier'] = this.state.selectedTier;
     
      
      const saveData = this.props.postApplyFormularyDrugPA(apiDetails).then((json => {
        console.log("Save response is:" + JSON.stringify(json));
        if (json.payload && json.payload.code === '200') {
          this.state.drugData = [];
          this.state.drugGridData = [];
          this.populateGridData();
          apiDetails = {};
          apiDetails['pathParams'] = this.props?.formulary_id;
          apiDetails['keyVals'] = [{ key: constants.KEY_ENTITY_ID, value: this.props?.formulary_id }];

        }
      }))
    }
  }
  
  advanceSearchClickHandler = (event) => {
    event.stopPropagation();
    this.setState({ isSearchOpen: !this.state.isSearchOpen })
  }
  advanceSearchClosekHandler = () => {
    this.setState({ isSearchOpen: !this.state.isSearchOpen })
  }
  dropDownSelectHandlerGroupDescription = (value, event) => {
    let tmp_index = event.key;
    let tmp_value = event.value;

   this.setState({ selectedGroupDescription: tmp_value });
   this.props.getPaGrouptDescriptionVersions(tmp_value).then((json)=>{
     let data = json.payload.data;
     
     this.setState({
       selectedLastestedVersion: data[0].id_pa_group_description,
       fileType: data[0].file_type,
     });
   });
  }

  dropDownSelectHandlerPaType = (value, event) => {
    let tmp_index = event.key;
    let tmp_value = event.value;
    this.setState({ selectedPaType: tmp_value });
  }

  dropDownSelectHandlerLob = (value, event) => {
    let tmp_index = event.key;
    let tmp_value = event.value;
    this.setState({ selectedLobFormulary: tmp_value });
  }

  pa_configurationChange = (event, value) => {
    let tmp_index = event.target.key;
    let tmp_value = event.target.value;

    if (tmp_value=="true"){
        this.setState({showPaConfiguration: true});
    }else{
      this.setState({showPaConfiguration: false});
    }
  }

  handleChange = (e:any) => {
    let tmp_value = e.target.value;
    let tmp_key = e.target.name;
    if (e.target.value=='true'){
      tmp_value= true;
    }else if (e.target.value=='false'){
      tmp_value=false;
    }
    this.setState(
     { tmp_key :e.target.value.trim()}
    )
    
  };

  populateGridData = (searchBody = null) => {
    console.log('Populate grid data is called');
    let apiDetails = {};
    
   // let tmpGroup :any = this.state.paGroupDescriptions.filter(obj  => obj.id_mcr_base_pa_group_description === this.state.selectedGroupDescription);

   
    
    apiDetails['keyVals'] = [{ key: constants.KEY_ENTITY_ID, value: this.props?.formulary_id }, { key: constants.KEY_INDEX, value: 0 }, { key: constants.KEY_LIMIT, value: 10 }];
    apiDetails['messageBody'] = {};

    apiDetails['messageBody']['base_pa_group_description_id'] = this.state.selectedGroupDescription;
    apiDetails['messageBody']['id_pa_type'] = this.state.selectedPaType;

    if(searchBody){
      apiDetails['messageBody'] = Object.assign(apiDetails['messageBody'],searchBody);
    }
    if (this.state.showPaConfiguration){
      apiDetails['pathParams'] = this.props?.formulary_id + "/" + this.state.selectedLobFormulary + '/' +this.state.fileType + "/PA/" ;
      this.props.postRelatedFormularyDrugPA(apiDetails).then((json => this.loadGridData(json) ));
     }else{
      apiDetails['pathParams'] = this.props?.formulary_id + "/" + this.state.fileType + "/" ;
      this.props.postFormularyDrugPA(apiDetails).then((json => this.loadGridData(json) ));
     }
    
  }

  loadGridData(json: any){
    {

      let tmpData = json.payload.result;
      var data: any[] = [];
      let count = 1;
      var gridData = tmpData.map(function (el) {
        var element = Object.assign({}, el);
        data.push(element)
        let gridItem = {};
        gridItem['id'] = count;
        gridItem['key'] = count;
        gridItem['tier'] = element.tier_value;
        gridItem['paGroupDescription'] = element.pa_group_description;
        gridItem['paType'] = element.pa_type;
        gridItem['fileType'] = element.file_type ? "" + element.file_type : "";
        gridItem['dataSource'] = element.data_source ? "" + element.data_source : "";
        gridItem['labelName'] = element.drug_label_name ? "" + element.drug_label_name : "";
        gridItem['ndc'] = "";
        gridItem['rxcui'] = element.rxcui ? "" + element.rxcui : "";
        gridItem['gpi'] = element.generic_product_identifier ? "" + element.generic_product_identifier : "";
        gridItem['trademark'] = element.trademark_code ? "" + element.trademark_code : "";
        gridItem['databaseCategory'] = element.database_category ? "" + element.database_category : "";
        count++;
        return gridItem;
      })
      this.setState({
        drugData: data,
        drugGridData: gridData
      })
    }
  }
  componentDidMount() {
                   
    this.props.getPaGrouptDescriptions(this.props?.formulary_lob_id).then((json:any) =>{
        let result = json.payload.data.filter(obj  => !obj.is_archived &&  obj.is_setup_complete);
        this.setState({
          paGroupDescriptions: result,
        });
        
    });

    this.props.getPaSummary(this.props?.formulary_id).then((json) =>{
        this.setState({
          paTypes: json.payload.result,
          });
        
    });

    let apiDetails = {formulary_type_id: this.props?.formulary_type_id,
      formulary_lob_id: this.props?.formulary_lob_id}
    this.props.getLobFormularies(apiDetails).then((json) =>{
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
      <>
        <div className="group tier-dropdown white-bg">
          <Row>
            <Col lg={8} className="mb-10">
              <label>
                PA GROUP DESCRIPTION<span className="astrict">*</span>
              </label>
              <DropDownMap options={this.state.paGroupDescriptions} valueProp="id_mcr_base_pa_group_description" dispProp="text" onSelect={this.dropDownSelectHandlerGroupDescription} disabled={this.props.configureSwitch}/>
            </Col>
            <Col lg={4}></Col>
            <Col lg={8} className="mb-10">
              <label>
                PA TYPE <span className="astrict">*</span>
              </label>
              <DropDownMap options={this.state.paTypes} valueProp="id_pa_type" dispProp="pa_type_name" onSelect={this.dropDownSelectHandlerPaType} disabled={this.props.configureSwitch}/>

            </Col>
            <Col lg={8}>
              <label>
                Do you want to view existing PA configurations in another
                formulary? <span className="astrict">*</span>
              </label>
              <Space size="large">
              <div className="marketing-material radio-group">
                <RadioGroup aria-label="marketing-material-radio1" className="gdp-radio" name="pa_configuration" onChange={this.pa_configurationChange} >
                  <FormControlLabel value="true" control={<Radio  disabled={this.props.configureSwitch} />}label="Yes" />
                  <FormControlLabel value="false" control={<Radio disabled={this.props.configureSwitch} />} label="No" />
                </RadioGroup>
               </div>
              </Space>
            </Col>
            <Col lg={4}></Col>
            {this.state.showPaConfiguration ? (
              <Col lg={8} >
                <label>
                  Select Related Formulary to View Existing configuration?{" "}
                  <span className="astrict">*</span>
                </label>
                <DropDownMap options={this.state.lobFormularies} valueProp="id_formulary" dispProp="formulary_name" onSelect={this.dropDownSelectHandlerLob} disabled={this.props.configureSwitch}/>

              </Col>
            ):(<Col lg={8} ></Col>)}
            <Col lg={4}></Col>
            <Col lg={8}>
              <label>
                do you want to add additional criteria?{" "}
                <span className="astrict">*</span>
              </label>
              <Space size="large">
                <RadioButton label="Yes" />
                <RadioButton label="No" />
              </Space>
            </Col>
          </Row>
        </div>
        <div className="white-bg">
          <Row justify="end">
            <Col>
              <Button label="Apply" onClick={this.openTierGridContainer} disabled={this.props.configureSwitch}></Button>
            </Col>
          </Row>
        </div>
        {this.state.tierGridContainer  && (
          <div className="select-drug-from-table">
            <div className="bordered white-bg">
              <div className="header space-between pr-10">
                
                <div className="button-wrapper">
                  <Button className="Button normal" label="Advance Search" onClick={this.advanceSearchClickHandler}  />
                  <Button label="Save" onClick={this.handleSave}  />
                </div>
              </div>

              <div className="tier-grid-container">
                <FrxDrugGridContainer
                  isPinningEnabled={false}
                  enableSearch={false}
                  enableColumnDrag
                  onSearch={() => { }}
                  fixedColumnKeys={[]}
                  pagintionPosition="topRight"
                  gridName="DRUG GRID"
                  enableSettings={false}
                  columns={PaColumns()}
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
              <AdvancedSearch
                {...searchProps}
                category="Grievances"
                openPopup={this.state.isSearchOpen}
                onClose={this.advanceSearchClosekHandler} />
            ) : (
                null
              )}
          </div>
        )}
      </>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaReplace);

