import React, { useState, useEffect, Fragment} from 'react';
import { connect } from "react-redux";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Button from '../../../../../shared/Frx-components/button/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import GroupHeader from './GroupHeader';
import { Box, Grid, Input } from '@material-ui/core';
import AlertMessages from "./AlertMessages"
import { ToastContainer } from 'react-toastify';
import showMessage from "../../../../Utils/Toast";
import SearchableDropdown from "../../../../../shared/Frx-components/SearchableDropdown";
import { scrollPage } from '../../../../../../utils/formulary'
import { Tag } from "antd";
import Tags from './Tags'
import { ReactComponent as CrossCircleWhiteBGIcon } from "../../../../../../assets/icons/crosscirclewhitebg.svg";
import { saveGDM,editGDM } from "../../../../../../redux/slices/formulary/gdm/gdmSlice";
import { getStGrouptDescription,getDrugLists } from "../../../../../../redux/slices/formulary/stepTherapy/stepTherapyActionCreation";

interface Props {
  tooltip?: string;
  formType?: number;
  editMode?:boolean;
}

interface initialFormData{
  file_type:any;
  is_rx_drug_type: any;
  is_otc_drug_type: any;
  st_criteria: any;
  change_indicator: any;
  excluded_drug_file: any;
  st_group_description_name: any;
  mmp_st_criteria:  any;
  st_criteria_change_indicator:  any;
  is_additional_criteria_defined:  any;
  is_suppress_criteria_dispaly_cms_approval:  any;
  is_display_criteria_drugs_not_frf:  any;
  is_validation_required:  any;
  st_type:any;
  id_st_type:any;
}

const initialFormData:initialFormData = {
  file_type: 'FAOTC',
  is_rx_drug_type: false,
  is_otc_drug_type: false,
  st_criteria: "",
  change_indicator: "",
  excluded_drug_file: "",
  st_group_description_name: '',
  mmp_st_criteria: '',
  st_criteria_change_indicator: false,
  is_additional_criteria_defined: false,
  is_suppress_criteria_dispaly_cms_approval: false,
  is_display_criteria_drugs_not_frf: false,
  is_validation_required: false,
  st_type:'Always Applies(1)',
  id_st_type:7
}

function mapStateToProps(state) {
  if(state?.saveGdm?.success!=="" && state?.saveGdm?.success!==null){
    showMessage('Saved Successfully', 'info');
  }
  if(state?.saveGdm?.error){
    if(state.saveGdm.error.length>0){
      state.saveGdm.error.map(err => {
        showMessage(err.message, 'error');
      })}else{
      showMessage(state?.saveGdm?.error?.data?.message, 'error');
    }
  }
  return {
    formulary_id: state.application.formulary_id,
    StGDData: state.stepTherapyReducer.description, // earlier it data
    version: state.stVerion.stVersion,
    saveGdm: state.saveGdm,
    client_id: state.application.clientId,
    current_formulary: state.application.formulary,
    formulary: state?.application?.formulary,
    formulary_lob_id: state?.application?.formulary_lob_id, //comme- 4, medicare-1 , medicate-2, exchnage -3 
    formulary_type_id: state?.application?.formulary_type_id,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    saveGDM: (data) => dispatch(saveGDM(data)),
    editGDM: (data) => dispatch(editGDM(data)),
    getStGrouptDescription: (a) => dispatch(getStGrouptDescription(a)),
    getDrugLists: (a) => dispatch(getDrugLists(a)),
  }
}

const drug_list_ids=[
  {
    "name":"my dl1",
    "key":1,
    "show":true,
    "is_list":false,
    "value":"my dl1",
    "type":"",
    "text":"my dl1"
    },
    {
    "name":"my dl2",
    "key":2,
    "show":true,
    "is_list":false,
    "value":"my dl2",
    "type":"",
    "text":"my dl2"
    }
]

function NewGroup(props: any) {
  const [formData, updateFormData] = React.useState(initialFormData);
  const [editable, setEditable] = React.useState(false);
  const [changeEvent, setChangeEvent] = React.useState(false);
  const [showHeader, setShowHeader] = React.useState(props.formType);
  const [errorClass, setErrorClass] = React.useState('');

  const handleChange = (e) => {
    const formVal = (e.target.value === 'yes' || e.target.value === 'true') ? true : (e.target.value === 'no' || e.target.value === 'false') ? false : e.target.value;
    updateFormData({
      ...formData,
      [e.target.name]: formVal
    });
  };

  const handleCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData({
      ...formData,
      [event.target.name]: event.target.checked
    });
  };

  const onChange = (e) => {
    if (Object.keys(props.StGDData).length > 0 && e && e != 'no') {
      //const verLength = Object.keys(props.version).length;
      const isEditable = props.version[Number(e.split(' ')[1])-1]?props.version[Number(e.split(' ')[1])-1].is_setup_complete:false
      setEditable(isEditable)
      setChangeEvent(true)
      updateFormData({
        ...formData,
        ...props.StGDData
      });
    } else {
      setChangeEvent(false)
    }
  }

  useEffect(() => {
    updateFormData(initialFormData)
    if (Object.keys(props.StGDData).length > 0) {
      if (!changeEvent) {
        const verLength = Object.keys(props.version).length;
        const isEditable = props.version[verLength - 1]?props.version[verLength - 1].is_setup_complete:false
        setEditable(isEditable)
      }
      updateFormData({
        ...formData,
        ...props.StGDData
      });
    }
    if(!props.editMode){
      setEditable(false)
    }
    setShowHeader(0)
    setErrorClass('');
  }, [props.StGDData || props.saveGdm || props.editMode])

  const handleSubmit = (e,is_validation: boolean) => {
    e.preventDefault()
    if(props.formType===0 && props.formulary_lob_id===1){
      let msg:string[]=[];
      if(formData.st_group_description_name === ''){
          msg.push("Formulary Description Name is required.");
      }
      if(formData.st_criteria === ''){
          msg.push("ST Criteria is required.");
      }
      if(formData.change_indicator === ''){
        msg.push("Change Indicator is required.");
      }
      if(msg.length>0){
          console.log(msg)
          setErrorClass('invalid');
          return;
      }
    }
    if(props.formType===1 && props.formulary_lob_id===1){
      let msg:string[]=[];
      if(formData.st_group_description_name === ''){
          msg.push("Formulary Description Name is required.");
      }
      if(msg.length>0){
          console.log(msg)
          setErrorClass('invalid');
          return;
      }
    }

    if(props.formType===0 && props.formulary_lob_id===4){
      let msg:string[]=[];
      if(formData.st_group_description_name === ''){
          msg.push("Formulary Description Name is required.");
      }
      if(msg.length>0){
          console.log(msg)
          setErrorClass('invalid');
          return;
      }
    }
    if(props.formType===1 && props.formulary_lob_id===4){
      let msg:string[]=[];
      if(formData.st_group_description_name === ''){
          msg.push("Formulary Description Name is required.");
      }
      if(msg.length>0){
          console.log(msg)
          setErrorClass('invalid');
          return;
      }
    }
    setErrorClass('');
    formData["id_st_type"] = (formData["st_type"]==="New Starts Only (2)")?8:7;
    formData["is_validation_required"] = is_validation;
    let requestData = {};
    if (props.formType==1){
      requestData['messageBody'] = {...formData}
      requestData["lob_type"] = props.formulary_lob_id;
      requestData['apiPart'] = 'api/1/mcr-st-group-description';
      let id_st_group_description = formData["id_st_group_description"]?formData["id_st_group_description"]:0;
      requestData['pathParams'] = '/'+id_st_group_description+'/'+props?.formulary_id + '?entity_id=0';
      props.editGDM(requestData)
    }else{
      formData.change_indicator = parseInt(formData.change_indicator)
      requestData['messageBody'] = {...formData}
      requestData["lob_type"] = props.formulary_lob_id;
      requestData['apiPart'] = 'api/1/mcr-st-group-description/'+props.client_id;
      requestData['pathParams'] = '/'+props?.formulary_id + '?entity_id=0';
      props.saveGDM(requestData)
    }
    setShowHeader(1)
    scrollPage(0, 500)
  };
  const getAutoCompleteChangeHandler = (val) => {
    // drug_list_ids = [...val];
    updateFormData({
      ...formData,
      val
    });
    console.log('*****')
    console.log(val)
    console.log('*****')
  }
  return (
    <div className="new-group-des">
      <div className="panel header">
        <span>{showHeader>0&&formData.st_group_description_name ? formData.st_group_description_name : props.title}</span>
      </div>
      {(props.formType > 0 || showHeader>0) && <GroupHeader popuptitle={formData.st_group_description_name ? formData.st_group_description_name : props.title} onChange={onChange}/>}
      {props.formulary_lob_id===1&&<div className="inner-container">
        <div className="setting-1">
          <span>What file type is this group description for? *</span>
          {/* <AlertMessages delay="10000" error={props.saveGdm.error} success={props.saveGdm.success} /> */}
          <div className="marketing-material radio-group">
            <RadioGroup aria-label="marketing-material-radio1" className="gdp-radio" name="file_type" onChange={handleChange}>
              <FormControlLabel value="FAOTC" control={<Radio checked={formData.file_type === "FAOTC" ? true : false} />} label="Formulary/OTC" disabled={editable} />
              <FormControlLabel value="ExD" control={<Radio checked={formData.file_type === "ExD" ? true : false} />} label="Excluded" disabled={editable} />
              <FormControlLabel value="ADD" control={<Radio checked={formData.file_type === "ADD" ? true : false} />} label="ADD" disabled={editable} />
            </RadioGroup>
          </div>
          <Grid container>
            <Grid item xs={6}>
              <div className="group">
                <label>ST GROUP DESCRIPTION<span className="astrict">*</span></label>
                <input type="text" name="st_group_description_name" onChange={handleChange} defaultValue={formData.st_group_description_name} disabled={editable} className={errorClass} />
              </div>
            </Grid>
          </Grid>
          {props.formType > 0 && (<Grid container className="mb-20">
            <Grid item xs={6}>
              <div className="group">
                <label>EXCLUDED DRUG FILE</label>
                <input type="text" name="excluded_drug_file" onChange={handleChange} defaultValue={formData.excluded_drug_file} disabled={editable} />
              </div>
            </Grid>
          </Grid>)}
        </div>
        {props.formType === 0 && (<div className="setting-1 mb-20">
          <span>What type of drugs will this group contain? Select all that apply.</span>
          <div className="marketing-material-chks checkbox-group">
              <div className="checkbox">
                <Checkbox
                    checked={formData.is_rx_drug_type}
                    onChange={handleCheckBox} disabled={editable}
                    name="is_rx_drug_type"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                /> 
                RX
              </div>
              <div className="checkbox">
              <Checkbox
                  checked={formData.is_otc_drug_type}
                  onChange={handleCheckBox} disabled={editable}
                  name="is_otc_drug_type"
                  inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
              OTC
              </div>
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
                <input type="text" name="st_criteria" onChange={handleChange} value={formData.st_criteria} disabled={editable} className={errorClass} />
              </div>
            </Grid>
          </Grid>
          <Grid container className="mb-20">
            <Grid item xs={6}>
              <div className="group">
                <label>ST CRITERIA CHANGE INDICATOR<span className="astrict">*</span></label>
                <input type="text" name="change_indicator" onChange={handleChange} value={formData.change_indicator} disabled={editable} className={errorClass}/>
              </div>
            </Grid>
          </Grid>
        </div>)}
        <div className="setting-1 mb-20">
          <span>MARKETING MATERIAL CONSIDERATIONS</span>
          <div className="marketing-material-chks">
           <div className="checkbox">
              <Checkbox
                checked={formData.is_suppress_criteria_dispaly_cms_approval}
                onChange={handleCheckBox} disabled={editable}
                name="is_suppress_criteria_dispaly_cms_approval"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
              <span>Supress Criteria and Display: Pending CMS Approval</span>
           </div>
            <div className="checkbox">
            <Checkbox
                checked={formData.is_display_criteria_drugs_not_frf}
                onChange={handleCheckBox} disabled={editable}
                name="is_display_criteria_drugs_not_frf"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
              <span>Display Criteria for Drugs not on FRF</span>
            </div>
          </div>

          <span>do you want to add additional criteria?<span className="astrict">*</span></span>
          <div className="marketing-material radio-group">
            <RadioGroup aria-label="marketing-material-radio1" name="is_additional_criteria_defined" onChange={handleChange} className="gdp-radio" value={formData.is_additional_criteria_defined}>
              <FormControlLabel value={true} control={<Radio />} label='Yes' disabled={editable} />
              <FormControlLabel value={false} control={<Radio />} label='No' disabled={editable} />
            </RadioGroup>
          </div>
        </div>
        <div className="button-wrapper">
          <Button label="Save Version Progress" className="Button" onClick={(event)=>handleSubmit(event,false)} />
          <Button label="Version to Initiate Change Request" className="Button" onClick={(event)=>handleSubmit(event,false)}/>
          <Button label="Version Submitted to CMS" className="Button" onClick={(event)=>handleSubmit(event,true)}/>
        </div>
      </div>}
      {props.formulary_lob_id===4&&<div className="inner-container">
                <div className="setting-1">
                  <Fragment>
                    <span>What is the defualt ST Type for this description? <span className="astrict">*</span></span>
                    <div className="marketing-material radio-group">
                      <RadioGroup aria-label="marketing-material-radio1" className="gdp-radio" name="st_type" onChange={handleChange}>
                        <FormControlLabel value="Always Applies(1)" control={<Radio checked={formData.id_st_type === 7 ? true : false} />} label="Always Applies" disabled={editable} />
                        <FormControlLabel value="New Starts Only (2)" control={<Radio checked={formData.id_st_type ===8 ? true : false} />} label="New Starts Only" disabled={editable} />
                      </RadioGroup>
                    </div> 
                    </Fragment>
                    <Grid container>
                        <Grid item xs={6}>
                            <div className="group">
                                <label>ST GROUP DESCRIPTION <span className="astrict">*</span></label>
                                <input type="text" name="st_group_description_name" onChange={handleChange} defaultValue={formData.st_group_description_name} disabled={editable} className={errorClass} />
                            </div>
                        </Grid>
                    </Grid>
                    {props.formType>0 && (<Grid container className="mb-20">
                        <Grid item xs={6}>
                            <div className="group">
                                <label>EXCLUDED DRUG FILE</label>
                                <input type="text" name="excluded_drug_file" onChange={handleChange} defaultValue={formData.excluded_drug_file} disabled={editable} />
                            </div>
                        </Grid>
                    </Grid>)}
                </div>
                {props.formType===0 && (<div className="setting-1 mb-20">
                    <Grid container>
                        <Grid item xs={6}>
                            <div className="group">
                           
                                <input type="text" />
                            </div>
                        </Grid>
                    </Grid>
                </div>)}
                <Fragment>
                      <Grid item xs={6}>
                      <label className="st-label">List <span className="astrict">*</span></label>
                      <Tags options={drug_list_ids} getAutoCompleteChange={getAutoCompleteChangeHandler}/>
                      </Grid>
                    </Fragment>
                <div className="setting-1 mb-20">
                  <span>do you want to add additional criteria? <span className="astrict">*</span></span>
                  <div className="marketing-material radio-group">
                      <RadioGroup aria-label="marketing-material-radio1" name="is_additional_criteria_defined" onChange={handleChange} className="gdp-radio" value={formData.is_additional_criteria_defined}>
                        <FormControlLabel value={true} control={<Radio />} label='Yes' disabled={editable} />
                        <FormControlLabel value={false} control={<Radio />} label='No' disabled={editable} />
                      </RadioGroup>
                  </div>
                </div>
                <div className="button-wrapper st-button-wrapper">
                  <Button label="Save Version Progress" className="Button" onClick={(event)=>handleSubmit(event,false)}/>
                  <Button label="Save Final Version And Continue" className="Button" onClick={(event)=>handleSubmit(event,false)}/>
                </div>
      </div>}
      <ToastContainer/>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(NewGroup)