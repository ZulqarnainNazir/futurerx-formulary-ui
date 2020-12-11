import React,{useState,useEffect} from 'react';
import { connect } from "react-redux";
import DropDown from "../../../../../shared/Frx-components/dropdown/DropDown";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Button from '../../../../../shared/Frx-components/button/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import { Box, Grid, Input } from '@material-ui/core';
import RadioButton from '../../../../../shared/Frx-components/radio-button/RadioButton';
import { saveGDM } from '../../../../../../redux/slices/formulary/gdm/gdmActionCreation'
import { getStGrouptDescription } from "../../../../../../redux/slices/formulary/stepTherapy/stepTherapyActionCreation";

interface Props{
    tooltip?:string;
    formType?:number;
    editable?:boolean;
}


const initialFormData = {
  st_group_description:'',
  file_type:'FAOTC',
  is_rx_drug_type:false,
  is_otc_drug_type:false,
  st_criteria: "",
  change_indicator:'',
  excluded_drug_file:"",
  st_group_description_name:'',
  mmp_st_criteria:'',
  st_criteria_change_indicator:'',
  is_additional_criteria_defined:'',
  is_suppress_criteria_dispaly_cms_approval:false,
  is_display_criteria_drugs_not_frf:false
}

function mapStateToProps(state){
  return{
      formulary_id: state.application.formulary_id,
      StGDData:state.stepTherapyReducer.data,
      version:state.stVerion.stVersion
  }
}

function mapDispatchToProps(dispatch){
  return{
    saveGDM:(data)=>dispatch(saveGDM(data)),
    getStGrouptDescription: (a) => dispatch(getStGrouptDescription(a)),
  }
}


function NewGroup(props: any) {
  const [formData, updateFormData] = React.useState(initialFormData);
  const [placeHolder, setPlaceHolder] = React.useState(props.versionTitle);
  const [latestId, setLatestId] = React.useState(props.latestVerion);
  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim()
    });
  };

  const onChange = (e) =>{
    const latestVerion = Object.keys(props.version).length>0?props.version[Number(e.split(" ")[1])-1].id_st_group_description:0;
    setLatestId(latestVerion)
    props.getStGrouptDescription(latestVerion)
    if(Object.keys(props.StGDData).length>0){ 
      updateFormData({
        ...formData,
        ...props.StGDData
      });
    }
  }

  useEffect(() => {
    setLatestId(props.latestVerion)
    updateFormData(initialFormData)
    setPlaceHolder(props.versionTitle)
    if(Object.keys(props.StGDData).length>0){ 
      updateFormData({
        ...formData,
        ...props.StGDData
      });
    }
  },[props.StGDData || props.versionList || props.activeTabIndex])
  
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
    props.saveGDM({formularyId:props.formulary_id,latestId:latestId,body:formData})
  };

    return (
        <div className="new-group-des">
            <div className="panel header">
                <span>{props.title?props.title:formData.st_group_description_name}</span>
            </div>
            <div className="version-wrapper">
              <DropDown className="formulary-type-dropdown formulary-versions" placeholder={placeHolder} options={props.versionList.map(e => e.value)} onChange={onChange}/>
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
            <div className="inner-container">
                <div className="setting-1">
                    <span>What file type is this group description for? *</span>
                    {/* <div className="marketing-material radio-group">
                        <RadioButton label="Formulary/OTC" name="marketing-material-radio1" checked />
                        <RadioButton label="Excluded" name="marketing-material-radio1" />
                        <RadioButton label="ADD" name="marketing-material-radio1" />
                    </div> */}
                    <div className="marketing-material radio-group">
                        <RadioGroup aria-label="marketing-material-radio1" className="gdp-radio" name="file_type" onChange={handleChange}>
                          <FormControlLabel value="FAOTC" control={<Radio checked={formData.file_type==="FAOTC"?true:false} />} label="Formulary/OTC" disabled={props.editable}/>
                          <FormControlLabel value="ExD" control={<Radio checked={formData.file_type==="ExD"?true:false}/>} label="Excluded" disabled={props.editable}/>
                          <FormControlLabel value="ADD" control={<Radio checked={formData.file_type==="ADD"?true:false}/>} label="ADD" disabled={props.editable}/>
                        </RadioGroup>
                    </div>
                    <Grid container>
                        <Grid item xs={6}>
                            <div className="group">
                                <label>ST GROUP DESCRIPTION<span className="astrict">*</span></label>
                                <input type="text" name="st_group_description" onChange={handleChange} defaultValue={formData.st_group_description_name} disabled={props.editable}/>
                            </div>
                        </Grid>
                    </Grid>
                    {props.formType>0 && (<Grid container className="mb-20">
                        <Grid item xs={6}>
                            <div className="group">
                                <label>EXCLUDED DRUG FILE</label>
                                <input type="text" name="exclude_drug_file" onChange={handleChange} defaultValue={formData.excluded_drug_file} disabled={props.editable}/>
                            </div>
                        </Grid>
                    </Grid>)}
                </div>
                {props.formType===0 && (<div className="setting-1 mb-20">
                    <span>What type of drugs will this group contain? Select all that apply.</span>
                    <div className="marketing-material-chk radio-group">
                        <FormControlLabel control={<Checkbox name="is_rx_drug_type" checked={formData.is_rx_drug_type} value='RX'/>} label='RX' disabled={props.editable}/>
                        <FormControlLabel control={<Checkbox name="is_otc_drug_type" checked={formData.is_otc_drug_type} value='OTC'/>} label='OTC' disabled={props.editable}/>
                    </div>
                    <Grid container>
                        <Grid item xs={6}>
                            <div className="group">
                                <label>ST CRITERIA<span className="astrict">*</span>
                                    <div className="panel-tooltip">
                                        <Tooltip
                                            classes={{
                                                tooltip: 'custom-tooltip panel-tooltip'
                                            }}
                                            title={props.tooltip}
                                            placement="top-start"
                                            arrow>
                                            <svg className="info-icon" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.3335 3.66732H7.66683V5.00065H6.3335V3.66732ZM6.3335 6.33398H7.66683V10.334H6.3335V6.33398ZM7.00016 0.333984C3.32016 0.333984 0.333496 3.32065 0.333496 7.00065C0.333496 10.6807 3.32016 13.6673 7.00016 13.6673C10.6802 13.6673 13.6668 10.6807 13.6668 7.00065C13.6668 3.32065 10.6802 0.333984 7.00016 0.333984ZM7.00016 12.334C4.06016 12.334 1.66683 9.94065 1.66683 7.00065C1.66683 4.06065 4.06016 1.66732 7.00016 1.66732C9.94016 1.66732 12.3335 4.06065 12.3335 7.00065C12.3335 9.94065 9.94016 12.334 7.00016 12.334Z" fill="#1D54B4" />
                                            </svg>
                                        </Tooltip>
                                    </div>
                                </label>
                                <input type="text" name="st_criteria" onChange={handleChange} value={formData.st_criteria} disabled={props.editable}/>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container className="mb-20">
                        <Grid item xs={6}>
                            <div className="group">
                                <label>ST CRITERIA CHANGE INDICATOR<span className="astrict">*</span></label>
                                <input type="text" name="change_indicator" onChange={handleChange} value={formData.change_indicator} disabled={props.editable}/>
                            </div>
                        </Grid>
                    </Grid>
                </div>)}
                <div className="setting-1 mb-20">
                    <span>MARKETING MATERIAL CONSIDERATIONS</span>
                    <div className="marketing-material-chk">
                        <FormControlLabel control={<Checkbox name="is_suppress_criteria_dispaly_cms_approval" checked={formData.is_suppress_criteria_dispaly_cms_approval}/>} label='Supress Criteria and Display: Pending CMS Approval' onChange={handleChange} disabled={props.editable}/>
                        <FormControlLabel control={<Checkbox name="is_display_criteria_drugs_not_frf" checked={formData.is_display_criteria_drugs_not_frf}/>} label='Display Criteria for Drugs not on FRF' onChange={handleChange} disabled={props.editable}/>
                    </div>
                    
                    <span>do you want to add additional criteria?<span className="astrict">*</span></span>
                    {/* <div className="marketing-material radio-group">
                        <RadioButton label="Yes" name="marketingmaterialradio" checked onChange={handleChange}/>
                        <RadioButton label="No" name="marketingmaterialradio" onChange={handleChange}/>
                    </div> */}
                    <div className="marketing-material radio-group">
                        <RadioGroup aria-label="marketing-material-radio1" name="is_additional_criteria_defined" onChange={handleChange} className="gdp-radio" >
                          <FormControlLabel value="yes" control={<Radio checked={formData.is_additional_criteria_defined==='yes'}/>} label='Yes' disabled={props.editable}/>
                          <FormControlLabel value="no" control={<Radio checked={formData.is_additional_criteria_defined==='no'}/>} label='No' disabled={props.editable}/>
                        </RadioGroup>
                    </div>
                </div>
                <div className="button-wrapper">
                    <Button label="Save Version Progress" className="Button" onClick={handleSubmit}/>
                    <Button label="Version to Initiate Change Request" className="Button" />
                    <Button label="Version Submitted to CMS" className="Button" />
                </div>
            </div>

        </div>
    )
}

export default connect(mapStateToProps,mapDispatchToProps)(NewGroup)