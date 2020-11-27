import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper';
import PanelHeader from './../NewFormulary/DrugDetails/components/FormularyConfigure/components/PanelHeader';
import FrxProcessStepper from './../shared/FrxProcessStepper/FrxProcessStepper';
import FrxMiniTabs from './../shared/FrxMiniTabs/FrxMiniTabs';

import './FormularyExpandedDetails.scss';

const miniTabs = [
  {id: 1, text: "General"},
  {id: 2, text: "Medicare"},
  {id: 3, text: "Formulary Design"},
  {id: 4, text: "Tiers"},
  {id: 5, text: "Supplemental Benefits/Alternative Model"}
]


const FormularyExpandedDetails = () => {
  const [activeMiniTabIndex, setActiveMiniTabIndex ] = useState(0);
  
  return (
    <div className="formulary-expanded-details">
      <Paper elevation={0}>
        <div className="formulary-expanded-details__container">
          {/* Left Container Starting*/}
          <div className="formulary-expanded-details-left">
            <div className="formulary-expanded-details-left__container">
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
            </div>
          </div>
          {/* Left Container Ending*/}
          
          {/* Right Container Starting*/}
          
            <div className="formulary-expanded-details-right">
              <div className="formulary-expanded-details-right__header">
                <FrxProcessStepper/>
              </div>
              <div className="formulary-expanded-details-right__tabs">
                <FrxMiniTabs tabList={miniTabs} activeTabIndex={activeMiniTabIndex} onClickTab={(selectedTabIndex)=> setActiveMiniTabIndex(selectedTabIndex)}/>
              </div>
              
              {
                activeMiniTabIndex ===  0 &&
                <div className="formulary-expanded-details-right__content">
                  <div className="formulary-info-field">
                    <div className="formulary-info-field__label">FORMULARY TYPE <span className="formulary-info-field__required">*</span></div>
                    <div className="formulary-info-field__value">Medicare</div>
                  </div>

                  <div className="formulary-info-field">
                    <div className="formulary-info-field__label">FORMULARY NAME <span className="formulary-info-field__required">*</span></div>
                    <div className="formulary-info-field__value">2021Care1777</div>
                  </div>

                  <div className="formulary-info-field">
                    <div className="formulary-info-field__label">ABBREVIATION</div>
                    <div className="formulary-info-field__value">Medicare</div>
                  </div>
                  
                  
                  <div className="formulary-info-field">
                    <div className="formulary-info-field__label">Method of Formulary Build<span className="formulary-info-field__required">*</span></div>
                    <div className="formulary-info-field__value">Radios</div>
                  </div>

                  <div className="formulary-info-field">
                    <div className="formulary-info-field__label">CLONE FORMULARY<span className="formulary-info-field__required">*</span></div>
                    <div className="formulary-info-field__value">Clone Formulary</div>
                  </div>

                  <div className="formulary-info-field">
                    <div className="formulary-info-field__label">EFFECTIVE DATE</div>
                    <div className="formulary-info-field__value">10/03/2020</div>
                  </div>
                  
                  
                  <div className="formulary-info-field">
                    <div className="formulary-info-field__label">SERVICE YEAR<span className="formulary-info-field__required">*</span></div>
                    <div className="formulary-info-field__value">2021</div>
                  </div>

                  <div className="formulary-info-field">
                    <div className="formulary-info-field__label">FORMULARY DESCRIPTION</div>
                    <div className="formulary-info-field__value">This is a formulary description.  This is a formulary desciption.</div>
                  </div>

                  <div className="formulary-info-field">
                    <div className="formulary-info-field__label">Which prior year's formulary does this most closely resemble?</div>
                    <div className="formulary-info-field__value">2019</div>
                  </div>

                  <div className="formulary-info-field">
                    <div className="formulary-info-field__label">FORMULARY CLASSIFICATION SYSTEM</div>
                    <div className="formulary-info-field__value">Radios</div>
                  </div>

                  <div className="formulary-info-field">
                    <div className="formulary-info-field__label">SUBMISSION MONTH</div>
                    <div className="formulary-info-field__value">October</div>
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

export default FormularyExpandedDetails
