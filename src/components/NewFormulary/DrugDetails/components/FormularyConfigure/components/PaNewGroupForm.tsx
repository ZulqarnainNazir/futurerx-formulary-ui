import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import PanelHeader from './PanelHeader';
import PanelGrid from './panelGrid';
import CustomizedSwitches from './CustomizedSwitches';
import { TabInfo } from "../../../../../../models/tab.model";
import FrxMiniTabs from "../../../../../shared/FrxMiniTabs/FrxMiniTabs";
import Button from '../../../../../shared/Frx-components/button/Button';
import DropDown from "../../../../../shared/Frx-components/dropdown/DropDownMap";
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
import PAGroupHeader from './PAGroupHeader';
import AlertMessages from "./AlertMessages"
import RadioButton from '../../../../../shared/Frx-components/radio-button/RadioButton';
import { getPaGrouptDescription, getPaTypes, getDrugLists,postPAGroupDescription,putPAGroupDescription } from "../../../../../../redux/slices/formulary/pa/paActionCreation";
import SearchableDropdown from "../../../../../shared/Frx-components/SearchableDropdown";
import { Tag } from "antd";
import { ReactComponent as CrossCircleWhiteBGIcon } from "../../../../../../assets/icons/crosscirclewhitebg.svg";


interface Props {
  tooltip?: string;
  formType?: number;
  editable?: boolean;
}

const initialFormData = {
  is_validation_required: true,
  pa_group_description: '',
  pa_criteria:'',
  file_type: 'FAOTC',
  id_pa_type:'', 
  is_rx_drug_type: false,
  is_otc_drug_type: false,
  change_indicator: 0,
  excluded_drug_file: '',
  pa_group_description_name: '',
  mmp_pa_criteria: '',
  pa_criteria_change_indicator: '',
  is_additional_criteria_defined: false,
  is_suppress_criteria_dispaly_cms_approval: false,
  is_display_criteria_drugs_not_frf: false,
  id_indication_indicator: 1,
  off_label_uses: '',
  exclusion_criteria: '',
  required_medical_info: '',
  age_restrictions: '',
  prescriber_restrictions: '',
  coverage_restrictions: "",
  other_criteria: '',
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
        return <div className="pa-form-information-panel__criteria">
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
    getPaGrouptDescription: (a) => dispatch(getPaGrouptDescription(a)),
    postPAGroupDescription: (a) => dispatch(postPAGroupDescription(a)),
    putPAGroupDescription: (a) => dispatch(putPAGroupDescription(a)),
  };
}

function mapStateToProps(state) {
  return {
    formulary_id: state.application.formulary_id,
    formulary_lob_id: state?.application?.formulary_lob_id,
    client_id: state.application.clientId,
    PaGDData: state.paReducer.description,
    version: state.paVersion.paVersion,
  };
}

function NewGroup(props: any) {
  // class NewGroup extends React.Component <any ,any> {
  const [formData, updateFormData] = React.useState(initialFormData);
  const [placeHolder, setPlaceHolder] = React.useState(props.versionTitle);
  const [latestId, setLatestId] = React.useState(props.latestVerion);
  const [panelColor, setPanelColor] = React.useState('');
  const handleChange = (e) => {
    debugger;
    let tmp_value = e.target.value;
    if (e.target.value == 'true') {
      tmp_value = true;
    } else if (e.target.value == 'false') {
      tmp_value = false;
    }
    const formVal = (e.target.value === 'yes' || e.target.value === 'true') ? true : (e.target.value === 'no' || e.target.value === 'false') ? false : e.target.value;
    updateFormData({
      ...formData,
      [e.target.name]: formVal
    });
  };

  const handleChange_1 = (e) => {
    updateFormData({
      ...formData,
      change_indicator: e
    });
  };

  const handleChange_2 = (e) => {
    updateFormData({
      ...formData,
      id_indication_indicator: e
    });
  };
 

  const saveGroupDescription = (is_validation: boolean) => {

    let requestData = {};
    
    debugger;
    //requestData['keyVals'] = [{ key: 'index', value: 0 }, { key: 'limit', value: 10 }, { key: 'entity_id', value: 1262 }];
    formData["is_validation_required"] = is_validation;
    requestData["lob_type"] = props.formulary_lob_id;
    requestData['messageBody'] ={};
    if (props.formulary_lob_id==1){
      requestData['messageBody'] ['is_validation_required'] = formData['is_validation_required'];
      requestData['messageBody'] ['file_type'] = formData['file_type'];
      requestData['messageBody'] ['is_rx_drug_type'] = formData['is_rx_drug_type'];
      requestData['messageBody'] ['is_otc_drug_type'] = formData['is_otc_drug_type'];
      requestData['messageBody'] ['change_indicator'] = formData['change_indicator'];
      requestData['messageBody'] ['excluded_drug_file'] = formData['excluded_drug_file'];
      requestData['messageBody'] ['pa_group_description_name'] = formData['pa_group_description_name'];
      requestData['messageBody'] ['mmp_pa_criteria'] = formData['mmp_pa_criteria'];
      requestData['messageBody'] ['pa_criteria_change_indicator'] = formData['pa_criteria_change_indicator'];
      requestData['messageBody'] ['is_additional_criteria_defined'] = formData['is_additional_criteria_defined'];
      requestData['messageBody'] ['is_suppress_criteria_dispaly_cms_approval'] = formData['is_suppress_criteria_dispaly_cms_approval'];
      requestData['messageBody'] ['is_display_criteria_drugs_not_frf'] = formData['is_display_criteria_drugs_not_frf'];
      requestData['messageBody'] ['id_indication_indicator'] = formData['id_indication_indicator'];
      requestData['messageBody'] ['off_label_uses'] = formData['off_label_uses'];
      requestData['messageBody'] ['exclusion_criteria'] = formData['exclusion_criteria'];
      requestData['messageBody'] ['required_medical_info'] = formData['required_medical_info'];
      requestData['messageBody'] ['age_restrictions'] = formData['age_restrictions'];
      requestData['messageBody'] ['prescriber_restrictions'] = formData['prescriber_restrictions'];
      requestData['messageBody'] ['coverage_restrictions'] = formData['coverage_restrictions'];
      requestData['messageBody'] ['other_criteria'] = formData['other_criteria'];

      if (props.formType==1){
        requestData['apiPart'] = 'api/1/mcr-pa-group-description';
        requestData['pathParams'] = '/'+formData["id_pa_group_description"]+'/'+props?.formulary_id + '?entity_id=0';
        props.putPAGroupDescription(requestData);
      }else{
        requestData['apiPart'] = 'api/1/mcr-pa-group-description/'+props.client_id;
        requestData['pathParams'] = '/'+props?.formulary_id + '?entity_id=0';
        props.postPAGroupDescription(requestData);
      }
    }else{
      requestData['messageBody'] ['is_validation_required'] = formData['is_validation_required'];
      requestData['messageBody'] ['pa_group_description_name'] = formData['pa_group_description_name'];
      requestData['messageBody'] ['pa_criteria'] = formData['pa_criteria'];
      requestData['messageBody'] ['id_pa_type'] = Number(formData['id_pa_type']);
      requestData['messageBody'] ['is_additional_criteria_defined'] = formData['is_additional_criteria_defined'];
      if (props.formType==1){
        requestData['pathParams'] = '/'+formData["id_pa_group_description"]+'/'+props?.formulary_id + '?entity_id=0';
        props.putPAGroupDescription(requestData);
      }else{
        requestData['pathParams'] = '/'+props?.formulary_id + '?entity_id=0';
        props.postPAGroupDescription(requestData);
      }
    }
    
    
  };

  const onChange = (e) => {
    console.log(props.version);
    const latestVerion = Object.keys(props.version).length > 0 ? props.version[Number(e)]?.id_pa_group_description : 0;
    setLatestId(latestVerion)
    if (Object.keys(props.PaGDData).length > 0) {
      updateFormData({
        ...formData,
        ...props.PaGDData
      });
    }
  }

  const handleCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData({
      ...formData,
      [event.target.name]: event.target.checked
    });
  };

  const [isAdditionalCriteriaPopupOpen, setAdditionalCriteriaPopup] = useState(
    false
  );
  const additionalCriteriaHandler = () => {
    setAdditionalCriteriaPopup(!isAdditionalCriteriaPopupOpen);
  };

  useEffect(() => {
    //debugger;
    setPanelColor(props.editable ? '-green' : '')
    setLatestId(props.latestVerion)
    updateFormData(initialFormData)
    setPlaceHolder(props.versionTitle)
    if (Object.keys(props.PaGDData).length > 0) {
      updateFormData({
        ...formData,
        ...props.PaGDData
      });
    }
  }, [props.PaGDData || props.versionList || props.activeTabIndex])

  return (
    <div className="new-group-des">
      <div className="panel header">
        <span>{props.title ? props.title : formData.pa_group_description_name}</span>
      </div>
      <PAGroupHeader popuptitle={props.title ? props.title : formData.pa_group_description_name} onChange={onChange} /> 
      { (props.formulary_lob_id==1) ? (
      <div className="inner-container pa-new-group-form">
        <div className="setting-1">
          <span>What file type is this group description for? *</span>
          <AlertMessages delay="10000" />
          <div className="marketing-material radio-group">
            <RadioGroup aria-label="marketing-material-radio1" className="gdp-radio" name="file_type" onChange={handleChange}>
              <FormControlLabel value="FAOTC" control={<Radio checked={formData.file_type === "FAOTC" ? true : false} />} label="Formulary/OTC" disabled={props.editable} />
              <FormControlLabel value="ExD" control={<Radio checked={formData.file_type === "ExD" ? true : false} />} label="Excluded" disabled={props.editable} />
              <FormControlLabel value="ADD" control={<Radio checked={formData.file_type === "ADD" ? true : false} />} label="ADD" disabled={props.editable} />
            </RadioGroup>
          </div>
          <Grid container>
            <Grid container item xs={6}>
              <Grid item xs={12}>
                <div className="group group-padding">
                  <label>PA GROUP DESCRIPTION <span className="astrict">*</span></label>
                  <input type="text" name="pa_group_description_name" onChange={handleChange} defaultValue={formData.pa_group_description_name} disabled={props.editable} />
                </div>
              </Grid>
              <Grid item xs={12}>
                <div className="group group-padding">
                  <label>PA Criteria Change Indicator <span className="astrict">*</span></label>
                  <DropDown
                    name="change_indicator"
                    className="formulary-type-dropdown"
                    placeHolder={props.change_indicator}
                    options={[{ key: 0, value: 0 }, { key: 1, value: 1 }]}
                    //options={[0,1]}
                    valueProp="key" dispProp="value"
                    onChange={handleChange_1}
                    disabled={props.editable}
                  />
                </div>
              </Grid>
              <Grid item xs={12}>
                <div className="group group-padding">
                  <label>PA INDICATION Indicator<span className="astrict">*</span></label>
                  <DropDown
                    name="id_indication_indicator"
                    className="formulary-type-dropdown"
                    placeHolder={props.id_indication_indicator}
                    options={[{ key: 1, value: 1 }, { key: 2, value: 2 }, { key: 3, value: 3 }, { key: 4, value: 4 }]}
                    valueProp="key" dispProp="value"
                    onChange={handleChange_2}
                    disabled={props.editable}
                  />
                </div>
              </Grid>
            </Grid>

            <Grid item xs={6}>
              <FormInformationPanel />
            </Grid>

            <Grid item xs={12}>
              <div className="group">
                <label>Off-LABEL USES</label>
                <input type="text" className="setup-input-fields" name="off_label_uses" defaultValue={formData.off_label_uses} onChange={handleChange} disabled={props.editable} />
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className="group">
                <label>EXCLUSION CRITERIA</label>
                <input type="text" className="setup-input-fields" name="exclusion_criteria" defaultValue={formData.exclusion_criteria} onChange={handleChange} disabled={props.editable} />
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className="group">
                <label>REQUIRED MEDICAL INFORMATION</label>
                <input type="text" className="setup-input-fields" name="required_medical_info" defaultValue={formData.required_medical_info} onChange={handleChange} disabled={props.editable} />
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className="group">
                <label>AGE RESTRICTIONS</label>
                <input type="text" className="setup-input-fields" name="age_restrictions" defaultValue={formData.age_restrictions} onChange={handleChange} disabled={props.editable} />
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className="group">
                <label>PRESCRIBER RESTRICTIONS</label>
                <input name="prescriber_restrictions" type="text" className="setup-input-fields" defaultValue={formData.prescriber_restrictions} onChange={handleChange} disabled={props.editable} />
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className="group">
                <label>COVERAGE DURATION<span className="astrict">*</span></label>
                <input name="coverage_restrictions" type="text" className="setup-input-fields" defaultValue={formData.coverage_restrictions} onChange={handleChange} disabled={props.editable} />
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className="group">
                <label>OTHER CRITERIA</label>
                <input name="other_criteria" type="text" className="setup-input-fields" defaultValue={formData.other_criteria} onChange={handleChange} disabled={props.editable} />
              </div>
            </Grid>
          </Grid>

        </div>
        <div className="setting-1 mb-20">
          <span>MARKETING MATERIAL CONSIDERATIONS</span>
          <div className="marketing-material-chk">
            <div className="checkbox">
              <Checkbox
                checked={formData.is_suppress_criteria_dispaly_cms_approval}
                onChange={handleCheckBox} disabled={props.editable}
                name="is_suppress_criteria_dispaly_cms_approval"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
              <span>Supress Criteria and Display: Pending CMS Approval</span>
            </div>
            <div className="checkbox">
              <Checkbox
                checked={formData.is_display_criteria_drugs_not_frf}
                onChange={handleCheckBox} disabled={props.editable}
                name="is_display_criteria_drugs_not_frf"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
              <span>Display Criteria for Drugs not on FRF</span>
            </div>
            {/* <FormControlLabel control={<Checkbox value="true" name="is_suppress_criteria_dispaly_cms_approval" color="primary" checked={formData.is_suppress_criteria_dispaly_cms_approval } disabled={props.editable} />} label='Supress Criteria and Display: Pending CMS Approval' />
                        <FormControlLabel control={<Checkbox value="true" name="is_display_criteria_drugs_not_frf" color="primary" checked={formData.is_display_criteria_drugs_not_frf } disabled={props.editable}/>} label='Display Criteria for Drugs not on FRF' /> */}
          </div>
          <span>do you want to add additional criteria?<span className="astrict">*</span></span>
          <div className="marketing-material radio-group">

            <RadioGroup aria-label="marketing-material-radio1" className="gdp-radio" name="is_additional_criteria_defined" onChange={handleChange} value={formData.is_additional_criteria_defined}>
              <FormControlLabel value={true} control={<Radio />} label="Yes" disabled={props.editable} />
              <FormControlLabel value={false} control={<Radio />} label="No" disabled={props.editable} />
            </RadioGroup>
          </div>
        </div>

        <div className="button-wrapper">
          <Button label="Save Version Progress" className="Button" onClick={() => saveGroupDescription(false)} />
          <Button label="Version to Initiate Change Request" className="Button" onClick={() => saveGroupDescription(false)} />
          <Button label="Version Submitted to CMS" className="Button" onClick={() => saveGroupDescription(true)} />
        </div>
      </div>
      ):null}
      { (props.formulary_lob_id==4) ? (
      <div className='inner-container pa-new-group-form'>
        <div className='setting-1'>
          <span className='required-field'>
            What is the default pa type for this description?
          </span>
          <div className='marketing-material radio-group'>

          <RadioGroup aria-label="marketing-material-radio1" className="gdp-radio" name="id_pa_type" onChange={handleChange}>
              <FormControlLabel value="8" control={<Radio checked={formData.id_pa_type == "8" ? true : false} />} label="Always Applies" disabled={props.editable} />
              <FormControlLabel value="9" control={<Radio checked={formData.id_pa_type == "9" ? true : false} />} label="New Starts Only" disabled={props.editable} />
          </RadioGroup>

          </div>
          <Grid container>
            <Grid item xs={12}>
              <div className='group'>
                <label className='required-field'>PA GROUP DESCRIPTION</label>
                <input type="text" name="pa_group_description_name" onChange={handleChange} defaultValue={formData.pa_group_description_name} disabled={props.editable} />
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className='group'>
                <label className='required-field'>PA Criteria</label>
                <input type="text" name="pa_criteria" onChange={handleChange} defaultValue={formData.pa_criteria} disabled={props.editable} />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className='group'>
                <label className='required-field'>LIST</label>
                <SearchableDropdown options={[1, 2, 3]} />
                <Box className='pg-group-list-tags-box'>
                  <Tag
                    className='pg-group-list-tags'
                    closable
                    onClose={() => {}}
                    closeIcon={<CrossCircleWhiteBGIcon />}
                  >
                    Tag 1
                  </Tag>
                  <Tag
                    className='pg-group-list-tags'
                    closable
                    onClose={() => {}}
                    closeIcon={<CrossCircleWhiteBGIcon />}
                  >
                    Tag 4
                  </Tag>
                </Box>
              </div>
            </Grid>
            <Grid className='additional-criteria' item xs={6}>
              <span className='required-field'>
                do you want to add additional criteria?
              </span>
              <div className='marketing-material radio-group'>
                <RadioButton
                  defaultChecked={true}
                  onClick={
                    !props.isReadOnly
                      ? () => additionalCriteriaHandler()
                      : () => {}
                  }
                  label='Yes'
                  name='additional-criteria-material-radio'
                />
                <RadioButton
                  label='No'
                  name='additional-criteria-material-radio'
                />
              </div>
            </Grid>
          </Grid>
        </div>
        <div className='button-wrapper'>
          {!props.isReadOnly ? (
            <>
              <Button label='Save Version Progress' className='Button'  onClick={() => saveGroupDescription(false)} />
              <Button
                label='Save Final Version and Continue' className='Button'  onClick={() => saveGroupDescription(true)}
              />
            </>
          ) : null}
        </div>
      </div>
      ):null}

    </div>
  )

}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewGroup);