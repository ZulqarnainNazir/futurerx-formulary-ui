import React from "react";
import RadioButton from "../../../shared/Frx-components/radio-button/RadioButton";

export default class FormularyExpandedGeneralDetails extends React.Component<
  any,
  any
> {
  render() {
    return (
      <div className="formulary-expanded-details-right__content">
        <div className="formulary-info-field">
          <div className="formulary-info-field__label">
            FORMULARY TYPE
            <span className="formulary-info-field__required">*</span>
          </div>
          <div className="formulary-info-field__value">Commercial</div>
        </div>

        <div className="formulary-info-field">
          <div className="formulary-info-field__label">
            FORMULARY NAME
            <span className="formulary-info-field__required">*</span>
          </div>
          <div className="formulary-info-field__value">2021Care1777</div>
        </div>

        <div className="formulary-info-field">
          <div className="formulary-info-field__label">ABBREVIATION</div>
          <div className="formulary-info-field__value">Care</div>
        </div>

        <div className="formulary-info-field">
          <div className="formulary-info-field__label">
            Method of Formulary Build
            <span className="formulary-info-field__required">*</span>
          </div>
          <div className="formulary-info-field__value">
            <RadioButton
              defaultChecked={true}
              label="Yes"
              name="method-of-formulary-material-radio"
            />
            <RadioButton label="No" name="method-of-formulary-material-radio" />
            <RadioButton label="No" name="method-of-formulary-material-radio" />
          </div>
        </div>

        <div className="formulary-info-field">
          <div className="formulary-info-field__label">
            CLONE FORMULARY
            <span className="formulary-info-field__required">*</span>
          </div>
          <div className="formulary-info-field__value">
            <div className="input-link" onClick={() => {}}>
              Clone Formulary
            </div>
          </div>
        </div>

        <div className="formulary-info-field">
          <div className="formulary-info-field__label">EFFECTIVE DATE</div>
          <div className="formulary-info-field__value">10/03/2020</div>
        </div>

        <div className="formulary-info-field">
          <div className="formulary-info-field__label">
            SERVICE YEAR
            <span className="formulary-info-field__required">*</span>
          </div>
          <div className="formulary-info-field__value">2021</div>
        </div>

        <div className="formulary-info-field">
          <div className="formulary-info-field__label">
            FORMULARY DESCRIPTION
          </div>
          <div className="formulary-info-field__value">
            This is a formulary description. This is a formulary desciption.
          </div>
        </div>

        <div className="formulary-info-field">
          <div className="formulary-info-field__label">
            Which prior year's formulary does this most closely resemble?
          </div>
          <div className="formulary-info-field__value">2019</div>
        </div>

        <div className="formulary-info-field">
          <div className="formulary-info-field__label">
            FORMULARY CLASSIFICATION SYSTEM
          </div>
          <div className="formulary-info-field__value">
            <RadioButton
              defaultChecked={true}
              label="Medispan"
              name="formulary-classification-material-radio"
            />
          </div>
        </div>

        <div className="formulary-info-field">
          <div className="formulary-info-field__label">SUBMISSION MONTH</div>
          <div className="formulary-info-field__value">October</div>
        </div>
        <div className="formulary-info-field">
          <button
            onClick={() => this.props.formularyToggle()}
            className="Button select-formulary-popup-root__submit-btn"
          >
            View Full Formulary
          </button>
        </div>
      </div>
    );
  }
}
