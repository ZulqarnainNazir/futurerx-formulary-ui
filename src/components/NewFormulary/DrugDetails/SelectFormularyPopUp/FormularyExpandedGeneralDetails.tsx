import React from "react";
import RadioButton from "../../../shared/Frx-components/radio-button/RadioButton";
import getClassificationName from "../../Utils/FormularyClassificationUtils";
import getSubmissionMonth from "../../Utils/SubmissionMonthUtils";
import { getformulary } from "../../../../redux/slices/formulary/setup/setupService";

export default class FormularyExpandedGeneralDetails extends React.Component<
  any,
  any
> {
  state = {
    formularyType: '',
    formularyName: '',
    formularyAbbrevation: '',
    methodofFormularyBuild:'Y',
    effectiveDate:'',
    serviceYear: '',
    formularyDescription: '',
    formularyClassificationSystem: '',
    formularySubmissionMonth: '',
  };

  fetchFormulary = async () => {
    try {
      let formularyData = await getformulary(this.props.rowData.formularyId);
      if(formularyData.formulary_info){
        this.setState({
          formularyType: this.props.rowData.lob,
          formularyName: this.props.rowData.fromularyName,
          formularyAbbrevation: formularyData.formulary_info.abbreviation ===  null ? '' : formularyData.formulary_info.abbreviation,
          methodofFormularyBuild: formularyData.formulary_info.formulary_build_method,
          effectiveDate: formularyData.formulary_info.effective_date,
          serviceYear: this.props.rowData.serviceYear,
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
    if(this.props.rowData){
      console.log('Row data is:'+JSON.stringify(this.props.rowData));
      this.fetchFormulary();
    }
  }

  render() {
    return (
      <div className="formulary-expanded-details-right__content">
        <div className="formulary-info-field">
          <div className="formulary-info-field__label">
            FORMULARY TYPE
            <span className="formulary-info-field__required">*</span>
          </div>
          <div className="formulary-info-field__value">{this.state.formularyType}</div>
        </div>

        <div className="formulary-info-field">
          <div className="formulary-info-field__label">
            FORMULARY NAME
            <span className="formulary-info-field__required">*</span>
          </div>
          <div className="formulary-info-field__value">{this.state.formularyName}</div>
        </div>

        <div className="formulary-info-field">
          <div className="formulary-info-field__label">ABBREVIATION</div>
          <div className="formulary-info-field__value">{this.state.formularyAbbrevation}</div>
        </div>

        <div className="formulary-info-field">
          <div className="formulary-info-field__label">
            Method of Formulary Build
            <span className="formulary-info-field__required">*</span>
          </div>
          <div className="formulary-info-field__value">
            <RadioButton
              checked={this.state.methodofFormularyBuild === 'Y' ? true : false}
              label="Yes"
              name="method-of-formulary-material-radio"
            />
            <RadioButton checked={this.state.methodofFormularyBuild === 'N' ? true : false} label="No" name="method-of-formulary-material-radio" />
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
          <div className="formulary-info-field__value">{this.state.effectiveDate}</div>
        </div>

        <div className="formulary-info-field">
          <div className="formulary-info-field__label">
            SERVICE YEAR
            <span className="formulary-info-field__required">*</span>
          </div>
          <div className="formulary-info-field__value">{this.state.serviceYear}</div>
        </div>

        <div className="formulary-info-field">
          <div className="formulary-info-field__label">
            FORMULARY DESCRIPTION
          </div>
          <div className="formulary-info-field__value">
            {this.state.formularyDescription}
          </div>
        </div>

        <div className="formulary-info-field">
          <div className="formulary-info-field__label">
            Which prior year's formulary does this most closely resemble?
          </div>
          <div className="formulary-info-field__value"></div>
        </div>

        <div className="formulary-info-field">
          <div className="formulary-info-field__label">
            FORMULARY CLASSIFICATION SYSTEM
          </div>
          <div className="formulary-info-field__value">
            <RadioButton
              checked={this.state.formularyClassificationSystem === 'Medispan' ? true : false}
              label="Medispan"
              name="formulary-classification-material-radio"
            />
            <RadioButton
              checked={this.state.formularyClassificationSystem === 'AHFS' ? true : false}
              label="AHFS"
              name="formulary-classification-material-radio"
            />
            <RadioButton
              checked={this.state.formularyClassificationSystem === 'USP' ? true : false}
              label="USP"
              name="formulary-classification-material-radio"
            />
             <RadioButton
              checked={this.state.formularyClassificationSystem === '25346526526' ? true : false}
              label="25346526526"
              name="formulary-classification-material-radio"
            />
          </div>
        </div>

        <div className="formulary-info-field">
          <div className="formulary-info-field__label">SUBMISSION MONTH</div>
          <div className="formulary-info-field__value">{this.state.formularySubmissionMonth}</div>
        </div>
        <div className="formulary-info-field">
          <button
            onClick={() => {}}
            className="Button select-formulary-popup-root__submit-btn"
          >
            View Full Formulary
          </button>
        </div>
      </div>
    );
  }
}
