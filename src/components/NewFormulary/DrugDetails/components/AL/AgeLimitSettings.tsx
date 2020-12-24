import React, { useState } from 'react'
import PanelHeader from '../../../../shared/Frx-components/panel-header/PanelHeader';
import DropDown from "../../../../shared/Frx-components/dropdown/DropDown";

import StatusContentFormPanel from '../common/StatusContentFormPanel/StatusContentFormPanel';

import './AL.scss';


const AddIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M15.0312 15.0309C18.3507 11.7115 18.3507 6.32958 15.0312 3.0101C11.7117 -0.309383 6.32985 -0.30934 3.01041 3.0101C-0.309032 6.32954 -0.309075 11.7114 3.01041 15.0309C6.32989 18.3504 11.7118 18.3504 15.0312 15.0309ZM14.3241 14.3238C17.2531 11.3949 17.253 6.64611 14.3241 3.71721C11.3952 0.788307 6.64646 0.788264 3.71751 3.71721C0.788571 6.64615 0.788615 11.3949 3.71751 14.3238C6.64641 17.2527 11.3952 17.2528 14.3241 14.3238Z" fill="#707683"/>
    <path d="M4.52082 9.0205C4.52082 9.29664 4.74468 9.5205 5.02082 9.5205H8.52082V13.0205C8.52082 13.2966 8.74468 13.5205 9.02082 13.5205C9.29696 13.5205 9.52082 13.2966 9.52082 13.0205V9.5205L13.0208 9.5205C13.297 9.5205 13.5208 9.29664 13.5208 9.0205C13.5208 8.74436 13.297 8.5205 13.0208 8.5205H9.52082L9.52082 5.0205C9.52082 4.74436 9.29696 4.5205 9.02082 4.5205C8.74468 4.5205 8.52082 4.74436 8.52082 5.0205V8.5205H5.02082C4.74468 8.5205 4.52082 8.74436 4.52082 9.0205Z" fill="#707683"/>
  </svg>
);

// interface initialFormData {
//   minimumVal: any,
//   maximumVal: any,
//   minimumType: any,
//   maximumType: any,
// }

// interface ageLimitSettingsState {
//   ageLimitsCount: number,
//   ageLimitHtml: any[],
//   maxLimits: number,
//   ageCovered: boolean,
//   formData: initialFormData[],
// }

// const initialFormData: initialFormData = {
//   minimumVal: "",
//   maximumVal: "",
//   minimumType: "IO",
//   maximumType: "IO",
// }

class AgeLimitSettings extends React.Component<any, any> {
  state = {
    ageLimitsCount: 1,
    ageLimitHtml: [],
    maxLimits: 3,
    ageCovered: true,
    // formData: initialFormData,
  }
  
  // formData1: initialFormData = {
  //   minimumVal: "",
  //   maximumVal: "",
  //   minimumType: "IO",
  //   maximumType: "IO",
  // }

  addNewAgeLimit = () => {
    console.log("The State of the app = ", this.state);
    this.setState({ ageLimitsCount: this.state.ageLimitsCount + 1 }, () => this.loadAgeLimits());
  }

  componentDidMount() {
    this.loadAgeLimits();
  }

  // handleMinChange = (e) => {
  //   console.log("The Min input Value = ", e);
  //   console.log("THe Min input value = ", e.target?.value);
  //   this.formData1.minimumVal = e.target?.value;
  //   this.setState({ formData: this.formData1 });
  // };

  // handleMaxChange = (e) => {
  //   console.log("The Max input Value = ", e);
  //   console.log("THe Max input value = ", e.target?.value);
  //   this.formData1.maximumVal = e.target?.value;
  //   this.setState({ formData: this.formData1 });
  // };

  // onMinChangeHandler = (e) => {
  //   console.log("The ON MIN Change Handler data = ", e);
  //   this.formData1.minimumType = (e === "Greater Than") ? "GT" : "IO" ;
  //   this.setState({ formData: this.formData1 });
  // };

  // onMaxChangeHandler = (e) => {
  //   console.log("The ON MAX Change Handler data = ", e);
  //   this.formData1.minimumType = (e === "Less Than") ? "LT" : "IO" ;
  //   this.setState({ formData: this.formData1 });
  // }

  getStatusContentForm = (index) => {
    return (
      <StatusContentFormPanel title="Age" type={this.state.ageCovered ? "covered" : "not-covered"}>
        <div className="input-field-group">
          <div className="input-field-group__label">Minimum</div>
        
          <div className="input-field-group__dropdown-field">
            <DropDown
              className=""
              placeholder="inclusive of"
              options={["inclusive of", "Greater Than"]}
              onChange={() => this.props.onMinChangeHandler(index)}
            />
          </div>
          
          <div className="input-field-group__text-field">
            <input type="text" className="setup-input-fields" onChange={(e) => this.props.handleMinChange(e, index)} />
          </div>
        </div>
  
        <div className="input-field-group">
          <div className="input-field-group__label">Maximum</div>
          
          <div className="input-field-group__dropdown-field">
            <DropDown
              className=""
              placeholder="inclusive of"
              options={["inclusive of", "Less Than"]}
              onChange={() => this.props.onMaxChangeHandler(index)}
            />
          </div>
          
          <div className="input-field-group__text-field">
            <input type="text" className="setup-input-fields" onChange={(e) => this.props.handleMaxChange(e, index)} />
          </div>
        </div>
      </StatusContentFormPanel>
    )
  }

  loadAgeLimits = () => {
    console.log("The Age Limits Count = ", this.state.ageLimitsCount);
    let ageLimitHtml:any = [];
    for(let i=0; i<this.state.ageLimitsCount; i++) {
      ageLimitHtml.push(this.getStatusContentForm(i));
    }
    console.log("The HTML AGE LIMIT = ", ageLimitHtml)
    console.log("The State HTML AGE LIMIT = ", this.state.ageLimitHtml);
    this.setState({ ageLimitHtml })
  }

  render () {
    return (
    <>
      <div className="age-limit-settings bordered mb-10">
        <PanelHeader title="Age Limit Settings" tooltip="Age Limit Settings" />
        
        <div className="inner-container">
          {this.state.ageLimitHtml}
          
          {!(this.state.ageLimitsCount === this.state.maxLimits) ? (
            <div className="age-limit-settings__add-new-form-action" onClick={() => this.addNewAgeLimit()}>
              <AddIcon/>
              <span className="age-limit-settings__add-new-form-action-text">Add New Age Limit Criteria</span>
            </div>
          ) : null }
        </div>
      </div>
    </>
    )
  }
}

export default AgeLimitSettings
