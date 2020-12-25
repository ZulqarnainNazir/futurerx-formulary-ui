import React from 'react'
import Box from "@material-ui/core/Box";
import PanelHeader from '../../../../shared/Frx-components/panel-header/PanelHeader';
import DropDown from "../../../../shared/Frx-components/dropdown/DropDown";
import Button from "../../../../shared/Frx-components/button/Button";

import StatusContentFormPanel from '../common/StatusContentFormPanel/StatusContentFormPanel';

import './AL.scss';


const AddIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M15.0312 15.0309C18.3507 11.7115 18.3507 6.32958 15.0312 3.0101C11.7117 -0.309383 6.32985 -0.30934 3.01041 3.0101C-0.309032 6.32954 -0.309075 11.7114 3.01041 15.0309C6.32989 18.3504 11.7118 18.3504 15.0312 15.0309ZM14.3241 14.3238C17.2531 11.3949 17.253 6.64611 14.3241 3.71721C11.3952 0.788307 6.64646 0.788264 3.71751 3.71721C0.788571 6.64615 0.788615 11.3949 3.71751 14.3238C6.64641 17.2527 11.3952 17.2528 14.3241 14.3238Z" fill="#707683"/>
    <path d="M4.52082 9.0205C4.52082 9.29664 4.74468 9.5205 5.02082 9.5205H8.52082V13.0205C8.52082 13.2966 8.74468 13.5205 9.02082 13.5205C9.29696 13.5205 9.52082 13.2966 9.52082 13.0205V9.5205L13.0208 9.5205C13.297 9.5205 13.5208 9.29664 13.5208 9.0205C13.5208 8.74436 13.297 8.5205 13.0208 8.5205H9.52082L9.52082 5.0205C9.52082 4.74436 9.29696 4.5205 9.02082 4.5205C8.74468 4.5205 8.52082 4.74436 8.52082 5.0205V8.5205H5.02082C4.74468 8.5205 4.52082 8.74436 4.52082 9.0205Z" fill="#707683"/>
  </svg>
);

class AgeLimitSettings extends React.Component<any, any> {
  state = {
    ageLimitsCount: 1,
    ageLimitHtml: [],
  }

  addNewAgeLimit = () => {
    this.setState({ ageLimitsCount: this.state.ageLimitsCount + 1 }, () => this.loadAgeLimits());
  }

  componentDidMount() {
    this.loadAgeLimits();
    console.log("The Form Data in Age Limit Settings = ", this.props.formData);
  }

  getStatusContentForm = (index) => {
    return (
      <StatusContentFormPanel title="Age" type={this.props.formData[index].covered ? "covered" : "not-covered"} coveredHandler={this.props.coveredHandler}>
        <div className="input-field-group">
          <div className="input-field-group__label">Minimum</div>
        
          <div className="input-field-group__dropdown-field">
            <DropDown
              className=""
              placeholder="inclusive of"
              options={["inclusive of", "Greater Than"]}
              onChange={(e) => this.props.onMinChangeHandler(e, index)}
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
              onChange={(e) => this.props.onMaxChangeHandler(e, index)}
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
    let ageLimitHtml:any = [];
    for(let i=0; i<this.state.ageLimitsCount; i++) {
      ageLimitHtml.push(this.getStatusContentForm(i));
    }
    this.setState({ ageLimitHtml })
  }

  render () {
    console.log("--RENDER ON AGE LIMIT------");
    return (
    <>
      <div className="age-limit-settings bordered mb-10">
        <PanelHeader title="Age Limit Settings" tooltip="Age Limit Settings" />
        
        <div className="inner-container">
          {this.state.ageLimitHtml}
          
          {!(this.state.ageLimitsCount === this.props.formData.length) ? (
            <div className="age-limit-settings__add-new-form-action" onClick={() => this.addNewAgeLimit()}>
              <AddIcon/>
              <span className="age-limit-settings__add-new-form-action-text">Add New Age Limit Criteria</span>
            </div>
          ) : null }

          <Box display="flex" justifyContent="flex-end">
            <Button
              label="Apply"
              onClick={() => this.props.showGrid()}
              disabled={!(this.props.showApply)}
            />
          </Box>
        </div>
      </div>
    </>
    )
  }
}

export default AgeLimitSettings
