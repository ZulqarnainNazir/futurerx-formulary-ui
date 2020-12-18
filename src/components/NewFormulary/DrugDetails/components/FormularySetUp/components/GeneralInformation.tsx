import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import DropDown from "../../../../../shared/Frx-components/dropdown/DropDown";
import RadioButton from "../../../../../shared/Frx-components/radio-button/RadioButton";
import { DatePicker, Select } from "antd";
import PanelHeader from "../../FormularyConfigure/components/PanelHeader";
import Button from '../../../../../shared/Frx-components/button/Button';
import {connect} from "react-redux";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
const mapStateToProps = (state) => {
  console.log(state);
  return {
    formulary: state?.setup?.formulary,
    formulary_mode: state?.setup?.mode,
    general_options: state?.setupOptions?.generalOptions
  };
};

class GeneralInformation extends React.Component<any, any> {
  state = {
    selectedMethod: this.props.formulary?.formulary_info?.formulary_build_method,
    forumalry_description: ''
  }
  UNSAFE_componentWillReceiveProps = (newProps) => {
    if(newProps.formulary){
      this.setState({
        selectedMethod: newProps.formulary.formulary_info.formulary_build_method,
        forumalry_description: newProps.formulary.formulary_info.formulary_description
      })
    }
  }
  getMethods = () => {
    let radioGroup: any = null;
    if(this.props.selectedMethod !== undefined){
      radioGroup = (
        <div className="radio-group">
          
        </div>
      );
    }
    return radioGroup;
  }
  changeMethodHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log((event.target.value))
    this.setState({
      selectedMethod: event.target.value
    })
  }
  getClassificationRadio = () => {
    let classificationRadio:any = null;
    let value = this.props.generalInfo.classification_system;
    const radi = <RadioGroup 
    className="radio-group-custom" 
    aria-label={'classification_system'} 
    name="classification_system"
    value={this.props.generalInfo.classification_system?.toString()} 
    onChange={(e) => this.props.onRadioChange(e,'generalInformation')}>
      {this.props.general_options.classification_systems.map(el => {
        return (
          <FormControlLabel 
            value={el.id_classification_system} 
            control={<Radio />} 
            label={el.classification_system} />
        )
      })}
    </RadioGroup>
    return radi;
    
  }
  render() {
    const FORMULARY = this.props.formulary;
    const disabled = this.props.formulary_mode === 'EXISTING' ? true : false;
    let general_options:any;
    if(this.props.general_options){
      general_options = this.props.general_options.formularyType.map(e => e.formulary_type)
    }
    let FORMULARY_Values:any;
    if(FORMULARY){
      FORMULARY_Values = {
        selected_formulary_type: this.props.formulary_mode === 'EXISTING' ? FORMULARY.formulary_type_info.formulary_type : '',
        formulary_name: FORMULARY.formulary_info?.formulary_name,
        effective_date: FORMULARY.formulary_info?.effective_date,
        formulary_description: FORMULARY.formulary_info?.formulary_description,
        formulary_build_method: FORMULARY.formulary_info?.formulary_build_method,
        abbreviation: FORMULARY.formulary_info?.abbreviation,
        contract_year: this.props.formulary_mode === 'EXISTING' ? [FORMULARY.formulary_info?.contract_year] : ["2021","2022"]
      }
    }
    return (
      <div className="general-information-container">
        <h4>General information</h4>
        <div className="general-information-fields-wrapper setup-label">
          <Grid container>
            <Grid item xs={4}>
              <div className="group">
                <label>
                  FORMULARY TYPE <span className="astrict">*</span>
                </label>
                <DropDown
                  className="formulary-type-dropdown"
                  placeholder="Select"
                  options={this.props.general_options ? general_options : []}
                  value={this.props.generalInfo.type}
                  disabled={disabled}
                  onChange={this.props.formularyTypeChanged}
                />
              </div>
            </Grid>
            <Grid item xs={4}>
              <div className="group">
                <label>
                  FORMULARY NAME <span className="astrict">*</span>
                </label>
                <input type="text" id="name" className="setup-input-fields" name="name" value={this.props.generalInfo.name} onChange={this.props.updateInputField}/>
              </div>
            </Grid>
            <Grid item xs={4}>
              <div className="group">
                <label>ABBREVIATION</label>
                <input type="text" className="setup-input-fields" name="abbreviation" value={this.props.generalInfo.abbreviation} onChange={this.props.updateInputField}/>
              </div>
            </Grid>
            <Grid item sm={4}>
              <label>
                EFFECTIVE DATE <span className="astrict">*</span>
              </label>
              <DatePicker
                className="effective-date"
                placeholder={FORMULARY ? FORMULARY_Values.effective_date : ''}
                disabled={disabled}

                onChange={(e) => this.props.datePickerChange(e,'generalInformation','effective_date')}
                suffixIcon={
                  <svg
                    width="18"
                    height="20"
                    viewBox="0 0 18 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="ant-picker-suffix"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M16 20H2C0.897 20 0 19.103 0 18V4C0 2.897 0.897 2 2 2H4V0H6V2H12V0H14V2H16C17.103 2 18 2.897 18 4V18C18 19.103 17.103 20 16 20ZM16.001 18L16 6H2V18H16.001ZM6 9H4V11H6V9ZM6 13H4V15H6V13ZM10 9H8V11H10V9ZM10 13H8V15H10V13ZM14 9H12V11H14V9ZM14 13H12V15H14V13Z"
                      fill="#C4C4C4"
                    />
                  </svg>
                }
              />
            </Grid>
            <Grid item xs={this.props.generalInfo.method === 'clone' ? 4 : 8}>
              <div className="group">
                <label>
                  Method of Formulary Build <span className="astrict">*</span>
                </label>
                <div className="marketing-material radio-group no-transform">
                  <RadioGroup 
                    className="radio-group-custom" 
                    aria-label={this.props.generalInfo.method} 
                    name="method"
                    value={this.props.generalInfo.method?.toString()} 
                    onChange={(e) => this.props.onRadioChange(e,'generalInformation')}>
                    <FormControlLabel value="clone" control={<Radio />} label="Clone" />
                    <FormControlLabel value="upload" control={<Radio />} label="Upload" />
                    <FormControlLabel value="N" control={<Radio />} label="Create New" />
                  </RadioGroup>
                </div>
                
                {
                  this.props.generalInfo.method === 'upload' && 
                  <div>
                    <Button label="Upload" htmlFor="upload-file" className="upload-button"/>
                  </div>
                }
              </div>
            </Grid>
            
            { 
              this.props.generalInfo.method === 'clone' && 
              <Grid item xs={4}>
                <div className="group">
                  <label>CLONE FORMULARY <span className="astrict">*</span></label>
                  <a href="#" className="input-link clone-formulary-link">Clone Formulary</a>
                </div>
              </Grid>
            }
            <Grid item xs={4}>
              <div className="group">
                <label>
                  SERVICE YEAR <span className="astrict">*</span>
                </label>
                <DropDown
                  className="formulary-type-dropdown"
                  options={this.props.general_options.contractYear?.map(e => e.contract_year)}
                  value={this.props.generalInfo.service_year}
                  disabled={disabled}
                  onChange={(e) => this.props.onDropdownChange(e,'generalInformation','service_year')}
                />
              </div>
            </Grid>
            <Grid item xs={4}>
              <div className="group">
                <label>FORMULARY DESCRIPTION</label>
                <input type="text" className="setup-input-fields" name="description" value={this.props.generalInfo.description} onChange={this.props.updateInputField}/>
              </div>
            </Grid>
            <Grid item xs={4}>
              <div className="group">
                <label>Which prior year's formulary does this most closely resemble?</label>
                <a href="#" className="input-link select-formulary-link">Select Formulary</a>
              </div>
            </Grid>
            <Grid item xs={4}>
              <div className="group setup-panel">
                <PanelHeader
                  title="FORMULARY CLASSIFICATION SYSTEM"
                  tooltip="FORMULARY CLASSIFICATION SYSTEM"
                  required
                />
                <div className="marketing-material radio-group">
                  <RadioGroup 
                  className="radio-group-custom" 
                  aria-label={'classification_system'} 
                  name="classification_system"
                  value={parseInt(this.props.generalInfo.classification_system)} 
                  onChange={(e) => this.props.onRadioChange(e,'generalInformation')}>
                    {this.props.general_options.classification_systems.map(el => {
                      return (
                        <FormControlLabel 
                          value={el.id_classification_system} 
                          control={<Radio />} 
                          label={el.classification_system} />
                      )
                    })}
                  </RadioGroup>
                  {/* {this.getClassificationRadio()} */}
                  {/* <RadioGroup 
                      className="radio-group-custom" 
                      aria-label={'classification_system'} 
                      name="classification_system"
                      value={this.props.generalInfo?.classification_system?.toString()} 
                      onChange={(e) => this.props.onRadioChange(e,'generalInformation')}>
                      {this.props.generalInfo.type !== 'Commercial' ? (
                        <>
                        <FormControlLabel value="1" control={<Radio />} label="USP" />
                        <FormControlLabel value="2" control={<Radio />} label="AHFS" />
                        </>
                      ): null}
                      <FormControlLabel value="3" control={<Radio />} label="Medispan" />
                  </RadioGroup> */}
                </div>
              </div>
            </Grid>
            {this.props.generalInfo.type === 'Commercial' ? (
              <Grid item xs={4}>
                <div className="group setup-panel">
                  <PanelHeader
                    title="IS THIS A CLOSED OR OPEN FORMULARY"
                    tooltip="FORMULARY CLASSIFICATION SYSTEM"
                    required
                  />
                  <div className="marketing-material radio-group">
                    <RadioGroup 
                        className="radio-group-custom" 
                        aria-label={'classification_system'} 
                        name="is_formulary_open"
                        value={this.props.generalInfo?.is_closed_formulary?.toString()} 
                        onChange={(e) => this.props.onRadioChange(e,"generalInformation")}>
                        <FormControlLabel value="true" control={<Radio />} label="Closed" />
                        <FormControlLabel value="false" control={<Radio />} label="Open" />
                    </RadioGroup>
                  </div>
                </div>
              </Grid>
            ) : null}
            {this.props.generalInfo.type_id === 2 ? (
              <Grid item xs={4}>
                <div className="group state-group">
                  <label>
                    What State is this formulary for? <span className="astrict">*</span>
                  </label>
                  <DropDown
                    className="formulary-type-dropdown"
                    options={this.props.general_options.states.map(e => e.state_name)}
                    value={this.props.generalInfo.selectedState}
                    disabled={disabled}
                    onChange={(e) => this.props.onDropdownChange(e,'generalInformation','selectedState')}
                  />
                </div>
              </Grid>
            ) : null}
            <Grid item xs={4}>
              <div className="group reporting-tag-group">
                <label>reporting tags</label>
                <div className="add-tag-input-wrapper">
                  <input
                    type="text"
                    className="reporting-tags setup-input-fields"
                  />
                  <svg
                    className="reporting-tag-icon"
                    width="14"
                    height="12"
                    viewBox="0 0 14 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.31944 1.95083L11.4074 4.06489C11.4954 4.15395 11.4954 4.29926 11.4074 4.38833L6.35185 9.50707L4.2037 9.74848C3.91667 9.78129 3.67361 9.5352 3.70602 9.24457L3.94444 7.06957L9 1.95083C9.08796 1.86177 9.23148 1.86177 9.31944 1.95083ZM13.0694 1.41411L11.9398 0.270361C11.588 -0.0858886 11.0162 -0.0858886 10.662 0.270361L9.84259 1.10005C9.75463 1.18911 9.75463 1.33442 9.84259 1.42349L11.9306 3.53755C12.0185 3.62661 12.162 3.62661 12.25 3.53755L13.0694 2.70786C13.4213 2.34927 13.4213 1.77036 13.0694 1.41411ZM8.88889 8.11489V10.5008H1.48148V3.00083H6.80093C6.875 3.00083 6.94444 2.97036 6.99769 2.9188L7.92361 1.9813C8.09954 1.80317 7.97454 1.50083 7.72685 1.50083H1.11111C0.497685 1.50083 0 2.00473 0 2.62583V10.8758C0 11.4969 0.497685 12.0008 1.11111 12.0008H9.25926C9.87269 12.0008 10.3704 11.4969 10.3704 10.8758V7.17739C10.3704 6.92661 10.0718 6.80239 9.89583 6.97817L8.96991 7.91567C8.91898 7.96957 8.88889 8.03989 8.88889 8.11489Z"
                      fill="#1D54B4"
                    />
                  </svg>
                  <a href="" className="add-tag">
                    Add a tag
                  </a>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}
export default connect(mapStateToProps)(GeneralInformation);