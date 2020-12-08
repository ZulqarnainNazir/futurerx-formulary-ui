import React, { useState } from 'react';
import { connect } from "react-redux";
import PanelHeader from './PanelHeader';
import PanelGrid from './panelGrid';
import CustomizedSwitches from './CustomizedSwitches';
import { TabInfo } from "../../../../../../models/tab.model";
import FrxMiniTabs from "../../../../../shared/FrxMiniTabs/FrxMiniTabs";
import Button from '../../../../../shared/Frx-components/button/Button';
import DropDown from "../../../../../shared/Frx-components/dropdown/DropDown";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { textFilters } from "../../../../../../utils/grid/filters";
import { getDrugDetailsColumn } from "../DrugGridColumn";
import { getDrugDetailData } from "../../../../../../mocks/DrugGridMock";
import FrxLoader from "../../../../../shared/FrxLoader/FrxLoader";
import DrugGrid from '../../DrugGrid';
import Tooltip from '@material-ui/core/Tooltip';
import { Box, Grid, Input } from '@material-ui/core';
import RadioButton from '../../../../../shared/Frx-components/radio-button/RadioButton';
import { getPaGrouptDescription, getPaTypes, getDrugLists,postPAGroupDescription } from "../../../../../../redux/slices/formulary/pa/paActionCreation";

interface Props{
    tooltip?:string;
    formType?:number;
}

const formInformationPanelTabs = [
  {
    id: 1,
    text: "PA Criteria Change Indicator"
  },
  {
      id: 2,
      text: "PA Indication Indicator"
  },
]

const FormInformationPanel = (props: any) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0)

  const onClickTab = (selectedTabIndex: number) => {
    let activeTabIndex = 0;

    const tabs = formInformationPanelTabs.map((tab: TabInfo, index: number) => {
      if (index === selectedTabIndex) {
        activeTabIndex = index;
      }
      return tab;
    });
    
    setActiveTabIndex(activeTabIndex);
  }
  
  const renderActiveTabContent = () => {
    switch (activeTabIndex) {
      case 0:
        return  <div className="pa-form-information-panel__criteria">
          Value is assigned based on a comparison of the current criteria and criteria applied to the previous year's formulary that the current year most closely resembles, defined in the Formulary General Information Page. Any difference will result in the value to be 1.
        </div>
      case 1:
        return ( 
        <div className="pa-form-information-panel__indication">
          <div>
            <div className="pa-form-information-panel__indication-text">
              <span className="prefix-text">1</span>
              <div>
                All FDA-approved Indications. This value cannot be used if the drug that requires PA is subject to Indication-Based Coverage (IBC).
              </div>
            </div>
            <div className="pa-form-information-panel__indication-text">
              <span className="prefix-text">2</span>
              <div>
                Some FDA-approved Indications Only. This value is to be submitted for drugs that are subject to IBC.
              </div>
            </div>
            <div className="pa-form-information-panel__indication-text">
              <span className="prefix-text">3</span>
              <div>
                All Medically-accepted Indications. Drugs for which the PA will be approved for all Part D medically-accepted indications (FDA-approved and compendia-supported) should be submitted with a 3.
              </div>
            </div>
            <div className="pa-form-information-panel__indication-text">
              <span className="prefix-text">4</span>
              <div>
                All FDA-approved Indications, Some Medically-accepted Indications. If the PA will only be approved for specific off-label uses, a 4 should be submitted. The additional off-label uses should be submitted in the subsequent Off-Label Uses field.
              </div>
            </div>
          </div>
        </div>
        );
    }
  };
  
  
  return (
    <div className="pa-form-information-panel">
      <div className="inner-container">   
        <div className="configure-mini-tabs">
          <FrxMiniTabs
            tabList={formInformationPanelTabs}
            activeTabIndex={activeTabIndex}
            onClickTab={onClickTab}
          />
        </div>  
      </div>
      <div>
        {renderActiveTabContent()}
      </div>
    </div>
  )
}






function mapDispatchToProps(dispatch) {
  return {
    getPaGrouptDescription:(a)=>dispatch(getPaGrouptDescription(a)),
    postPAGroupDescription:(a)=>dispatch(postPAGroupDescription(a)),
  };
}

function mapStateToProps(state){
  return {
    formulary_count:state?.dashboard?.formulary_count,
  }
}
class NewGroup extends React.Component <any ,any> {
  state = {
    pa_group_description:"",
    file_type:"FA",
    is_rx_drug_type:false,
    is_otc_drug_type:false,
    id_indication_indicator:false,
    change_indicator:null,
    off_label_uses:null,
    exclusion_criteria:null,
    required_medical_info:null,
    age_restrictions:null,
    prescriber_restrictions:null,
    coverage_restrictions:null,
    other_criteria:null,
    excluded_drug_file:null,
    mmp_pa_criteria:null,
    is_suppress_criteria_dispaly_cms_approval:false,
    is_display_criteria_drugs_not_frf:false,
    is_additional_criteria_defined:false,
  }

  onNewDefinationAddHandler = () => {
    console.log(this.props.formulary_count)
  }
  saveGroupDescription = () =>{
    console.log(this.props.formulary_count);
    let requestData = {};
    debugger;
    requestData['apiPart'] = 'api/1/mcr-pa-group-description/1';
    requestData['pathParams'] = '/3086?entity_id=0';
    requestData['keyVals'] = [{key: 'index', value: 0},{key: 'limit', value: 10},{key: 'entity_id', value: 1262}];
    let data = {};
    data["pa_group_description_name"]=this.state.pa_group_description;
    //data["id_pa_type"]=8;
    data["is_validation_required"]=true;
    data["pa_group_description_name"]=this.state.pa_group_description;
    data["file_type"]=this.state.file_type;
    data["is_rx_drug_type"]=this.state.is_rx_drug_type;
    data["is_otc_drug_type"]=this.state.is_otc_drug_type;
    data["id_indication_indicator"]=this.state.id_indication_indicator;
    data["change_indicator"]=this.state.change_indicator;
    data["off_label_uses"]=this.state.off_label_uses;
    data["exclusion_criteria"]=this.state.exclusion_criteria;
    data["required_medical_info"]=this.state.required_medical_info
    data["age_restrictions"]=this.state.age_restrictions
    data["prescriber_restrictions"]=this.state.prescriber_restrictions;
data["coverage_restrictions"]=this.state.coverage_restrictions;
data["other_criteria"]=this.state.other_criteria
data["excluded_drug_file"]=this.state.excluded_drug_file;
data["mmp_pa_criteria"]=this.state.mmp_pa_criteria;
data["is_suppress_criteria_dispaly_cms_approval"]=this.state.is_suppress_criteria_dispaly_cms_approval;
data["is_display_criteria_drugs_not_frf"]=this.state.is_display_criteria_drugs_not_frf;
data["is_additional_criteria_defined"]=this.state.is_additional_criteria_defined;

    requestData['messageBody'] = data;
    this.props.postPAGroupDescription(requestData);
  };

  componentDidMount() {
    debugger;               
    console.log("##################" );
    this.props.getPaGrouptDescription(this.props.selectedGroupId);
  }
  componentDidUpdate(){
    debugger;               
    console.log("##################" );
    this.props.getPaGrouptDescription(this.props.selectedGroupId);
  }
  handleChange(changeObject) {
    debugger;
    this.setState(changeObject)
  }
    render (){
      debugger;
      console.log("*************" );

      console.log(this.props.selectedGroupId);
    
    return (
        <div className="new-group-des">
            <div className="panel header">
                <span>NEW GROUP DESCRIPTION</span>
            </div>
            <div className="version-wrapper">
              <div className="item-text version-dd">
                Group Description Version 1
                <svg xmlns="http://www.w3.org/2000/svg" width="7" height="4" viewBox="0 0 7 4" fill="none">
                  <path d="M0.471003 0H6.529C6.94809 0 7.15763 0.509932 6.86097 0.808776L3.83315 3.86125C3.64951 4.04625 3.35049 4.04625 3.16685 3.86125L0.139026 0.808776C-0.157635 0.509932 0.051911 0 0.471003 0Z" fill="#F65A1C"/>
                </svg>
              </div>
              <div className="item">
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 11 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.8281 5.48992C10.8336 8.42555 8.43949 10.826 5.50387 10.8281C4.23597 10.829 3.07134 10.387 2.15613 9.64838C1.91815 9.4563 1.90036 9.09964 2.11662 8.88338L2.35868 8.64132C2.54364 8.45636 2.83892 8.43612 3.04384 8.59869C3.71813 9.13376 4.57147 9.45312 5.5 9.45312C7.68507 9.45312 9.45312 7.68472 9.45312 5.5C9.45312 3.31493 7.68472 1.54688 5.5 1.54688C4.45126 1.54688 3.49875 1.95441 2.79151 2.61963L3.88193 3.71005C4.09849 3.92661 3.94511 4.29688 3.63887 4.29688H0.515625C0.325768 4.29688 0.171875 4.14298 0.171875 3.95312V0.829877C0.171875 0.523639 0.542137 0.370262 0.758699 0.586803L1.81943 1.64753C2.77597 0.733391 4.07241 0.171875 5.5 0.171875C8.43928 0.171875 10.8227 2.55191 10.8281 5.48992ZM6.94134 7.18255L7.15238 6.9112C7.32722 6.68641 7.28673 6.36245 7.06193 6.18763L6.1875 5.5075V3.26562C6.1875 2.98085 5.95665 2.75 5.67187 2.75H5.32812C5.04335 2.75 4.8125 2.98085 4.8125 3.26562V6.18L6.21777 7.273C6.44256 7.44782 6.7665 7.40734 6.94134 7.18255Z"
                    fill="#F65A1C"
                  />
                </svg>
                Version History
              </div>
              <div className="item">
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 13 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.7812 0C12.4544 0 13 0.545645 13 1.21875V8.53125C13 9.20436 12.4544 9.75 11.7812 9.75H4.46875C3.79564 9.75 3.25 9.20436 3.25 8.53125V1.21875C3.25 0.545645 3.79564 0 4.46875 0H11.7812ZM4.46875 10.5625C3.34872 10.5625 2.4375 9.65128 2.4375 8.53125V3.25H1.21875C0.545645 3.25 0 3.79564 0 4.46875V11.7812C0 12.4544 0.545645 13 1.21875 13H8.53125C9.20436 13 9.75 12.4544 9.75 11.7812V10.5625H4.46875Z"
                    fill="#F65A1C"
                  />
                </svg>
                Clone
              </div>
              <div className="item">
                <svg
                  width="13"
                  height="12"
                  viewBox="0 0 13 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.61523 0C3.47441 0 0.927734 2.54668 0.927734 5.6875C0.927734 8.82832 3.47441 11.375 6.61523 11.375C9.75605 11.375 12.3027 8.82832 12.3027 5.6875C12.3027 2.54668 9.75605 0 6.61523 0ZM9.05273 5.99219C9.05273 6.04805 9.00703 6.09375 8.95117 6.09375H7.02148V8.02344C7.02148 8.0793 6.97578 8.125 6.91992 8.125H6.31055C6.25469 8.125 6.20898 8.0793 6.20898 8.02344V6.09375H4.2793C4.22344 6.09375 4.17773 6.04805 4.17773 5.99219V5.38281C4.17773 5.32695 4.22344 5.28125 4.2793 5.28125H6.20898V3.35156C6.20898 3.2957 6.25469 3.25 6.31055 3.25H6.91992C6.97578 3.25 7.02148 3.2957 7.02148 3.35156V5.28125H8.95117C9.00703 5.28125 9.05273 5.32695 9.05273 5.38281V5.99219Z"
                    fill="#F65A1C"
                  />
                </svg>
                New Version
              </div>
              <div className="item">
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 11 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M11 5.5C11 6.95869 10.4205 8.35764 9.38909 9.38909C8.35764 10.4205 6.95869 11 5.5 11C4.04131 11 2.64236 10.4205 1.61091 9.38909C0.579463 8.35764 0 6.95869 0 5.5C0 4.04131 0.579463 2.64236 1.61091 1.61091C2.64236 0.579463 4.04131 0 5.5 0C6.95869 0 8.35764 0.579463 9.38909 1.61091C10.4205 2.64236 11 4.04131 11 5.5ZM8.14962 3.33713C8.21417 3.27258 8.25043 3.18503 8.25043 3.09375C8.25043 3.00247 8.21417 2.91492 8.14962 2.85037C8.08508 2.78583 7.99753 2.74957 7.90625 2.74957C7.81497 2.74957 7.72742 2.78583 7.66288 2.85037L5.5 5.01394L3.33713 2.85037C3.30516 2.81841 3.26722 2.79306 3.22546 2.77577C3.18371 2.75847 3.13895 2.74957 3.09375 2.74957C3.04855 2.74957 3.00379 2.75847 2.96204 2.77577C2.92028 2.79306 2.88234 2.81841 2.85037 2.85037C2.81841 2.88234 2.79306 2.92028 2.77577 2.96204C2.75847 3.00379 2.74957 3.04855 2.74957 3.09375C2.74957 3.13895 2.75847 3.18371 2.77577 3.22546C2.79306 3.26722 2.81841 3.30516 2.85037 3.33713L5.01394 5.5L2.85037 7.66288C2.78583 7.72742 2.74957 7.81497 2.74957 7.90625C2.74957 7.99753 2.78583 8.08508 2.85037 8.14962C2.91492 8.21417 3.00247 8.25043 3.09375 8.25043C3.18503 8.25043 3.27258 8.21417 3.33713 8.14962L5.5 5.98606L7.66288 8.14962C7.69484 8.18159 7.73278 8.20694 7.77454 8.22423C7.81629 8.24153 7.86105 8.25043 7.90625 8.25043C7.95145 8.25043 7.99621 8.24153 8.03796 8.22423C8.07972 8.20694 8.11766 8.18159 8.14962 8.14962C8.18159 8.11766 8.20694 8.07972 8.22423 8.03796C8.24153 7.99621 8.25043 7.95145 8.25043 7.90625C8.25043 7.86105 8.24153 7.81629 8.22423 7.77454C8.20694 7.73278 8.18159 7.69484 8.14962 7.66288L5.98606 5.5L8.14962 3.33713Z"
                    fill="#F65A1C"
                  />
                </svg>
                Delete
              </div>
              <div className="item">
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 11 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.6875 9.625C0.6875 10.0053 0.994727 10.3125 1.375 10.3125H9.625C10.0053 10.3125 10.3125 10.0053 10.3125 9.625V3.4375H0.6875V9.625ZM4.125 5.07031C4.125 4.92852 4.24102 4.8125 4.38281 4.8125H6.61719C6.75898 4.8125 6.875 4.92852 6.875 5.07031V5.24219C6.875 5.38398 6.75898 5.5 6.61719 5.5H4.38281C4.24102 5.5 4.125 5.38398 4.125 5.24219V5.07031ZM10.3125 0.6875H0.6875C0.307227 0.6875 0 0.994727 0 1.375V2.40625C0 2.59531 0.154687 2.75 0.34375 2.75H10.6562C10.8453 2.75 11 2.59531 11 2.40625V1.375C11 0.994727 10.6928 0.6875 10.3125 0.6875Z"
                    fill="#F65A1C"
                  />
                </svg>
                Archive
              </div>
            </div>
            
            <div className="inner-container pa-new-group-form">
                <div className="setting-1">
                    <span>What file type is this group description for? *</span>
                    <div className="marketing-material radio-group" >
                        <RadioButton label="Formulary/OTC" name="marketing-material-radio1" checked value="FA"  onChange={(e) => this.handleChange({ file_type: e.target.value })}/>
                        <RadioButton label="Excluded" name="marketing-material-radio1" value="ExD"  onChange={(e) => this.handleChange({ file_type: e.target.value })}/>
                        <RadioButton label="ADD" name="marketing-material-radio1" value="ADD" onChange={(e) => this.handleChange({ file_type: e.target.value })}/>
                    </div>
                    <Grid container>
                      <Grid container item xs={6}>
                        <Grid item xs={12}>
                              <div className="group group-padding">
                                  <label>PA GROUP DESCRIPTION <span className="astrict">*</span></label>
                                  <input type="textarea" className="setup-input-fields"  onChange={(e) => this.handleChange({ pa_group_description: e.target.value })} />
                              </div>
                          </Grid>
                          <Grid item xs={12}>
                              <div className="group group-padding">
                                  <label>PA Criteria Change Indicator <span className="astrict">*</span></label>
                                  <DropDown
                                    className="formulary-type-dropdown"
                                    placeholder=""
                                    options={[{key:0,value:0}, {key:1,value:1}]}
                                    valueProp="key" dispProp="value"
                                    onChange={(e) => this.handleChange({"change_indicator": e.target.value })}
                                  />
                              </div>
                          </Grid>
                          <Grid item xs={12}>
                              <div className="group group-padding">
                                  <label>PA INDICATION Indicator<span className="astrict">*</span></label>
                                  <DropDown
                                    className="formulary-type-dropdown"
                                    placeholder=""
                                    options={[{key:1,value:1}, {key:2,value:2},{key:3,value:3},{key:4,value:4}]}
                                    valueProp="key" dispProp="value"
                                    onChange={(e) => this.handleChange({id_indication_indicator: e.target.value })}
                                  />
                              </div>
                          </Grid>
                      </Grid>
                      
                      <Grid item xs={6}>
                        <FormInformationPanel/>
                      </Grid>
                      
                        <Grid item xs={12}>
                            <div className="group">
                                <label>Off-LABEL USES</label>
                                <input type="textarea" className="setup-input-fields" onChange={(e) => this.handleChange({"off_label_uses": e.target.value })}/>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div className="group">
                                <label>EXCLUSION CRITERIA</label>
                                <input type="textarea" className="setup-input-fields" onChange={(e) => this.handleChange({"exclusion_criteria": e.target.value })} />
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div className="group">
                                <label>REQUIRED MEDICAL INFORMATION</label>
                                <input type="textarea" className="setup-input-fields" onChange={(e) => this.handleChange({"required_medical_info": e.target.value })} />
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div className="group">
                                <label>AGE RESTRICTIONS</label>
                                <input type="textarea" className="setup-input-fields" onChange={(e) => this.handleChange({"age_restrictions": e.target.value })} />
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div className="group">
                                <label>PRESCRIBER RESTRICTIONS</label>
                                <input type="textarea" className="setup-input-fields" onChange={(e) => this.handleChange({"prescriber_restrictions": e.target.value })}/>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div className="group">
                                <label>COVERAGE DURATION<span className="astrict">*</span></label>
                                <input type="textarea" className="setup-input-fields" onChange={(e) => this.handleChange({"coverage_restrictions": e.target.value })} />
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div className="group">
                                <label>OTHER CRITERIA</label>
                                <input type="textarea" className="setup-input-fields" onChange={(e) => this.handleChange({"other_criteria": e.target.value })}/>
                            </div>
                        </Grid>
                    </Grid>
                    {/* {props.formType>0 && (<Grid container className="mb-20">
                        <Grid item xs={6}>
                            <div className="group">
                                <label>EXCLUDED DRUG FILE</label>
                                <input type="text" />
                            </div>
                        </Grid>
                    </Grid>)} */}
                </div>
                <div className="setting-1 mb-20">
                    <span>MARKETING MATERIAL CONSIDERATIONS</span>
                    <div className="marketing-material-chk">
                        <FormControlLabel control={<Checkbox onChange={(e) => this.handleChange({"is_suppress_criteria_dispaly_cmsroval": e.target.value })}/>} label='Supress Criteria and Display: Pending CMS Approval' />
                        <FormControlLabel control={<Checkbox onChange={(e) => this.handleChange({"is_display_criteria_drugs_not_frf": e.target.value })} />} label='Display Criteria for Drugs not on FRF' />
                    </div>
                    <span>do you want to add additional criteria?<span className="astrict">*</span></span>
                    <div className="marketing-material radio-group">
                        <RadioButton label="Yes" name="marketing-material-radio" value="true" checked onChange={(e) => this.handleChange({"is_additional_criteria_defined": e.target.value })}/>
                        <RadioButton label="No" name="marketing-material-radio" value="false" onChange={(e) => this.handleChange({"is_additional_criteria_defined": e.target.value })}/>
                    </div>
                </div>
                <div className="button-wrapper">
                    <Button label="Save Version Progress" className="Button" />
                    <Button label="Version to Initiate Change Request" className="Button" />
                    <Button label="Version Submitted to CMS" className="Button"  onClick={this.saveGroupDescription} />
                </div>
            </div>

        </div>
    )
    }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewGroup);