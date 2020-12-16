import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Button from '../../../../../shared/Frx-components/button/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import GroupHeader from './GroupHeader';
import { Grid } from '@material-ui/core';
import AlertMessages from "./AlertMessages"
import { scrollPage } from '../../../../../../utils/formulary'
import { saveGDM } from "../../../../../../redux/slices/formulary/gdm/gdmSlice";
import { getStGrouptDescription } from "../../../../../../redux/slices/formulary/stepTherapy/stepTherapyActionCreation";

interface Props {
  tooltip?: string;
  formType?: number;
}

const initialFormData = {
  st_group_description: '',
  file_type: 'FAOTC',
  is_rx_drug_type: false,
  is_otc_drug_type: false,
  st_criteria: "",
  change_indicator: 0,
  excluded_drug_file: "",
  st_group_description_name: '',
  mmp_st_criteria: '',
  st_criteria_change_indicator: false,
  is_additional_criteria_defined: false,
  is_suppress_criteria_dispaly_cms_approval: false,
  is_display_criteria_drugs_not_frf: false,
  is_validation_required: false
}

function mapStateToProps(state) {
  return {
    formulary_id: state.application.formulary_id,
    StGDData: state.stepTherapyReducer.data,
    version: state.stVerion.stVersion,
    saveGdm: state.saveGdm
  }
}

function mapDispatchToProps(dispatch) {
  return {
    saveGDM: (data) => dispatch(saveGDM(data)),
    getStGrouptDescription: (a) => dispatch(getStGrouptDescription(a)),
  }
}

function NewGroup(props: any) {
  const [formData, updateFormData] = React.useState(initialFormData);
  const [editable, setEditable] = React.useState(false);
  const [changeEvent, setChangeEvent] = React.useState(false);

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
      const isEditable = props.version[Number(e.split(' ')[1])-1].is_setup_complete
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
        const isEditable = props.version[verLength - 1].is_setup_complete
        setEditable(isEditable)
      }
      updateFormData({
        ...formData,
        ...props.StGDData
      });
    }
  }, [props.StGDData || props.saveGdm])

  const handleSubmit = (e) => {
    e.preventDefault()
    updateFormData({
      ...formData,
      'change_indicator': 0,
      [e.target.name]: e.target.value.trim()
    });
    props.saveGDM({
      formularyId: props.formulary_id,
      latestId: props.saveGdm.current_group_des_id,
      ...formData
    })
    scrollPage(0, 500)
  };
  return (
    <div className="new-group-des">
      <div className="panel header">
        <span>{props.title ? props.title : formData.st_group_description_name}</span>
      </div>
      <GroupHeader popuptitle={props.title ? props.title : formData.st_group_description_name} onChange={onChange}/>
      <div className="inner-container">
        <div className="setting-1">
          <span>What file type is this group description for? *</span>
          <AlertMessages delay="10000" />
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
                <input type="text" name="st_group_description_name" onChange={handleChange} defaultValue={formData.st_group_description_name} disabled={editable} />
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
          <div className="marketing-material-chks radio-group">
              <span>
                <Checkbox
                    defaultChecked={formData.is_rx_drug_type}
                    onChange={handleCheckBox} disabled={editable}
                    name="is_rx_drug_type"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                /> 
                RX
              </span>
              <span>
              <Checkbox
                  defaultChecked={formData.is_otc_drug_type}
                  onChange={handleCheckBox} disabled={editable}
                  name="is_otc_drug_type"
                  inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
              OTC
              </span>
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
                <input type="text" name="st_criteria" onChange={handleChange} value={formData.st_criteria} disabled={editable} />
              </div>
            </Grid>
          </Grid>
          <Grid container className="mb-20">
            <Grid item xs={6}>
              <div className="group">
                <label>ST CRITERIA CHANGE INDICATOR<span className="astrict">*</span></label>
                <input type="text" name="change_indicator" onChange={handleChange} value={formData.change_indicator} disabled={editable} />
              </div>
            </Grid>
          </Grid>
        </div>)}
        <div className="setting-1 mb-20">
          <span>MARKETING MATERIAL CONSIDERATIONS</span>
          <div className="marketing-material-chks">
           <div>
              <Checkbox
                checked={formData.is_suppress_criteria_dispaly_cms_approval}
                onChange={handleCheckBox} disabled={editable}
                name="is_suppress_criteria_dispaly_cms_approval"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
              <span>Supress Criteria and Display: Pending CMS Approval</span>
           </div>
            <div>
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
          <Button label="Save Version Progress" className="Button" onClick={handleSubmit} />
          <Button label="Version to Initiate Change Request" className="Button" />
          <Button label="Version Submitted to CMS" className="Button" />
        </div>
      </div>

    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(NewGroup)