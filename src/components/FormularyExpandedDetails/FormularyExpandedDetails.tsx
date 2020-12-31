import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper';
import PanelHeader from './../NewFormulary/DrugDetails/components/FormularyConfigure/components/PanelHeader';
import FrxProcessStepper from './../shared/FrxProcessStepper/FrxProcessStepper';
import FrxMiniTabs from './../shared/FrxMiniTabs/FrxMiniTabs';
import { fetchSelectedFormulary } from "../.././redux/slices/formulary/setup/setupSlice";
import { fetchDesignOptions } from "../.././redux/slices/formulary/setup/setupOptionsSlice";
import { getformulary } from "../.././redux/slices/formulary/setup/setupService";
import getClassificationName from "../NewFormulary/Utils/FormularyClassificationUtils";
import getSubmissionMonth from "../NewFormulary/Utils/SubmissionMonthUtils";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Box from "@material-ui/core/Box";
import Button from ".././shared/Frx-components/button/Button";

import { connect } from "react-redux";

import './FormularyExpandedDetails.scss';

const miniTabs = [
  {id: 1, text: "General"},
  // {id: 2, text: "Medicare"},
  {id: 2, text: "Formulary Design",disabled: true},
  {id: 3, text: "Tiers",disabled: true},
  // {id: 5, text: "Supplemental Benefits/Alternative Model"}
]
const mapStateToProps = (state) => {
  return {
    dashboard: state?.dashboard.formulary_list
  }
}
class FormularyExpandedDetails extends React.Component<any,any>{
  state = {
    activeMiniTabIndex: 0,
    formularyType: '',
    formularyName: '',
    formularyAbbrevation: '',
    methodofFormularyBuild:'Y',
    effectiveDate:'',
    serviceYear: '',
    formularyDescription: '',
    formularyClassificationSystem: '',
    formularySubmissionMonth: '',
    formulayId: ''
  };
  fetchFormulary = async () => {
    try {
      let formularyData = await getformulary(parseInt(this.props.rowData.data.id_formulary));
      const selectedRow = this.props.dashboard.filter(e => e.id_formulary === parseInt(this.props.rowData.data.id_formulary))
      
      if(formularyData.formulary_info){
        console.log(formularyData)
        this.setState({
          formulayId: this.props.rowData.data.id,
          formularyType: selectedRow[0].formulary_type,
          formularyName: selectedRow[0].formulary_name,
          formularyAbbrevation: formularyData.formulary_info.abbreviation ===  null ? '' : formularyData.formulary_info.abbreviation,
          methodofFormularyBuild: formularyData.formulary_info.formulary_build_method,
          effectiveDate: selectedRow[0].effective_date,
          serviceYear: selectedRow[0].contract_year,
          formularyDescription: formularyData.formulary_info.formulary_description,
          formularyClassificationSystem: getClassificationName(formularyData.formulary_info.id_classification_system),
          formularySubmissionMonth: formularyData.formulary_info.id_submission_month === null ? '' : getSubmissionMonth(formularyData.formulary_info.id_submission_month),
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
  componentDidMount(){
    if(this.props.rowData && this.props.dashboard){
      console.log(this.state);
      this.fetchFormulary();
    }
  }
  setActiveMiniTabIndex = (tabIndex) => {
    this.setState({
      activeMiniTabIndex: tabIndex
    })
  }
  render(){
    return (
      <div className="formulary-expanded-details">
        <Paper elevation={0}>
          <div className="formulary-expanded-details__container">
            {/* Left Container Starting*/}
            <div className="formulary-expanded-details-left">
              {/* <div className="formulary-expanded-details-left__container">
                <div className="formulary-expanded-details-left__title">Versions</div>
                <div className="formulary-expanded-details-left__list">
                  <div className="formulary-expanded-details-left__list-item">
                    <span className="formulary-expanded-details-left__list-item-indicator formulary-expanded-details-left__list-item-indicator--active" />Version 4
                  </div>
                  <div className="formulary-expanded-details-left__list-item">
                    <span className="formulary-expanded-details-left__list-item-indicator formulary-expanded-details-left__list-item-indicator--active" />Version 3
                  </div>
                  <div className="formulary-expanded-details-left__list-item">
                    <span className="formulary-expanded-details-left__list-item-indicator formulary-expanded-details-left__list-item-indicator--inactive" />Version 2
                  </div>
                  
                  <div className="formulary-expanded-details-left__list-add-item">+ add new version</div>
                  
                </div>
              </div> */}
            </div>
            {/* Left Container Ending*/}
            
            {/* Right Container Starting*/}
            
              <div className="formulary-expanded-details-right">
                {/* <div className="formulary-expanded-details-right__header">
                  <FrxProcessStepper/>
                </div> */}
                <div className="formulary-expanded-details-right__tabs">
                  <FrxMiniTabs 
                    tabList={miniTabs} 
                    activeTabIndex={this.state.activeMiniTabIndex} 
                    onClickTab={(selectedTabIndex)=> this.setActiveMiniTabIndex(selectedTabIndex)}
                    disabled
                    disabledIndex={2}/>
                </div>
                
                {
                  this.state.activeMiniTabIndex ===  0 &&
                  <div className="formulary-expanded-details-right__content">
                    <div className="formulary-info-field">
                      <div className="formulary-info-field__label">FORMULARY TYPE <span className="formulary-info-field__required">*</span></div>
                      <div className="formulary-info-field__value">{this.state.formularyType}</div>
                    </div>

                    <div className="formulary-info-field">
                      <div className="formulary-info-field__label">FORMULARY NAME <span className="formulary-info-field__required">*</span></div>
                      <div className="formulary-info-field__value">{this.state.formularyName}</div>
                    </div>

                    <div className="formulary-info-field">
                      <div className="formulary-info-field__label">ABBREVIATION</div>
                      <div className="formulary-info-field__value">{this.state.formularyAbbrevation}</div>
                    </div>
                    
                    
                    <div className="formulary-info-field">
                      <div className="formulary-info-field__label">Method of Formulary Build<span className="formulary-info-field__required">*</span></div>
                      <div className="formulary-info-field__value radio-group">
                        <RadioGroup
                          className="radio-group-custom"
                          aria-label={this.state.methodofFormularyBuild}
                          name="method"
                          value={this.state.methodofFormularyBuild}>
                          <FormControlLabel
                            disabled={true}
                            value="C"
                            control={<Radio />}
                            label="Clone"/>
                          <FormControlLabel
                            disabled={true}
                            value="U"
                            control={<Radio />}
                            label="Upload"/>
                          <FormControlLabel
                            disabled={true}
                            value="N"
                            control={<Radio />}
                            label="Create New"/>
                        </RadioGroup>
                      </div>
                    </div>

                    

                    <div className="formulary-info-field">
                      <div className="formulary-info-field__label">EFFECTIVE DATE</div>
                      <div className="formulary-info-field__value">{this.state.effectiveDate}</div>
                    </div>
                    <div className="formulary-info-field">
                      {/* <div className="formulary-info-field__label">CLONE FORMULARY<span className="formulary-info-field__required">*</span></div>
                      <div className="formulary-info-field__value">Clone Formulary</div> */}
                    </div>
                    
                    <div className="formulary-info-field">
                      <div className="formulary-info-field__label">SERVICE YEAR<span className="formulary-info-field__required">*</span></div>
                      <div className="formulary-info-field__value">{this.state.serviceYear}</div>
                    </div>

                    <div className="formulary-info-field">
                      <div className="formulary-info-field__label">FORMULARY DESCRIPTION</div>
                      <div className="formulary-info-field__value">{this.state.formularyDescription}</div>
                    </div>
                    
                    {this.state.formularyType !== 'Commercial' ? (
                      <div className="formulary-info-field">
                        <div className="formulary-info-field__label">Which prior year's formulary does this most closely resemble?</div>
                        <div className="formulary-info-field__value">2019</div>
                      </div>
                    ) : <div className="formulary-info-field"></div>}

                    <div className="formulary-info-field">
                      <div className="formulary-info-field__label">FORMULARY CLASSIFICATION SYSTEM</div>
                      <div className="formulary-info-field__value radio-group">
                        <RadioGroup
                          className="radio-group-custom"
                          aria-label={this.state.formularyClassificationSystem}
                          name="classification"
                          value={this.state.formularyClassificationSystem}>
                            {this.state.formularyType !== 'Commercial' ? (
                              <>
                              <FormControlLabel
                              disabled={true}
                              value="USP"
                              control={<Radio />}
                              label="USP"/>
                              <FormControlLabel
                              disabled={true}
                              value="AHFS"
                              control={<Radio />}
                              label="AHFS"/>
                              </>
                            ): null}
                          <FormControlLabel
                            disabled={true}
                            value="Medispan"
                            control={<Radio />}
                            label="Medispan"/>
                        </RadioGroup>
                      </div>
                    </div>
                    
                    {this.state.formularyType !== 'Commercial' ? (
                      <div className="formulary-info-field">
                        <div className="formulary-info-field__label">SUBMISSION MONTH</div>
                        <div className="formulary-info-field__value">October</div>
                      </div>
                    ) : null}
                    <div className="formulary-info-field"></div>
                    <div className="formulary-info-field view-fl-field">
                      <Box display="flex" justifyContent="flex-end">
                        <Button className="Button view-fl-btn" label="View Full Formulary" onClick={() => this.props.drugDetailClick(this.state.formulayId)} />
                      </Box>
                    </div>
                  </div>
                }
              </div>
            {/* Right Container Ending*/}
          </div>
        </Paper>
      </div>
    )
  }
}

export default connect(mapStateToProps)(FormularyExpandedDetails);