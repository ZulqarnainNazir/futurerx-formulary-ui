import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from '@material-ui/core/Box';
import Button from '../../../../../shared/Frx-components/button/Button';
import RadioButton from "../../../../../shared/Frx-components/radio-button/RadioButton";
import PanelHeader from "../../FormularyConfigure/components/PanelHeader";


export default class FormularyDesign extends React.Component<any, any> {
  render() {
    return (
      <div className="formulary-design-container">
        <h4>FORMULARY DESIGN</h4>
        <div className="formulary-design-fields-wrapper setup-label">
        <Grid container>
        <Grid item xs={6}>
            <div className="field-group group setup-panel">
                <PanelHeader
                    title="WHAT PRIOR AUTHORIZATION TYPES(S) ARE INCLUDED IN THIS FORMULARY? *"
                    tooltip="WHAT PRIOR AUTHORIZATION TYPES(S) ARE INCLUDED IN THIS FORMULARY? *"
                    required={true}
                />
                
                <div className="radio-group field-group__radio-group">
                    <div className="label-wrapper checkbox-wrapper">
                        <input type="checkbox" className="checkbox-btn" name="N/A" value="N/A" />
                        <label htmlFor="N/A" className="checkbox-label">Type 1</label>
                    </div>
                    <div className="label-wrapper checkbox-wrapper">
                        <input type="checkbox" className="checkbox-btn" name="N/A" value="N/A" />
                        <label htmlFor="N/A" className="checkbox-label">Type 2</label>
                    </div>
                    <div className="label-wrapper checkbox-wrapper">
                        <input type="checkbox" className="checkbox-btn" name="N/A" value="N/A" />
                        <label htmlFor="N/A" className="checkbox-label">Type 3</label>
                    </div>
                    <div className="label-wrapper checkbox-wrapper">
                        <input type="checkbox" className="checkbox-btn" name="N/A" value="N/A" />
                        <label htmlFor="N/A" className="checkbox-label">N/A</label>
                    </div>
                </div>
            </div>
            <div className="field-group group setup-panel">
                <PanelHeader
                    title="DO ANY DRUGS IN THE FORMULARY HAVE QUANTITY LIMITS?"
                    tooltip="DO ANY DRUGS IN THE FORMULARY HAVE QUANTITY LIMITS?"
                    required={true}
                />
                <div className="radio-group field-group__radio-group">
                    <RadioButton label="Yes" />
                    <RadioButton label="No" />
                </div>
            </div>
            <div className="field-group group setup-panel">
                <PanelHeader
                    title="IS ACCESS TO ANY FORMULARY DRUG RESTRICTED TO CERTAIN PHARMACIES?"
                    tooltip="IS ACCESS TO ANY FORMULARY DRUG RESTRICTED TO CERTAIN PHARMACIES?"
                    required={true}
                />
                <div className="radio-group field-group__radio-group">
                    <RadioButton label="Yes" />
                    <RadioButton label="No" />
                </div>
            </div>
            <div className="field-group group setup-panel">
                <PanelHeader
                    title="SUBJECT TO EXPEDITED GENERIC SUBSTITUTION?"
                    tooltip="SUBJECT TO EXPEDITED GENERIC SUBSTITUTION?"
                    required={true}
                />
                <div className="radio-group field-group__radio-group">
                    <RadioButton label="Yes" />
                    <RadioButton label="No" />
                </div>
            </div>
        </Grid>
        <Grid item xs={6}>
            <div className="field-group group setup-panel">
                <PanelHeader
                    title="ARE PART D DRUGS REQUIRED IN PART B STEP THERAPY PROTOCOLS? *"
                    tooltip="SUBJECT TO EXPEDITED GENERIC SUBSTITUTION?"
                    required={true}
                />
                <div className="radio-group field-group__radio-group">
                    <RadioButton label="Yes" />
                    <RadioButton label="No" />
                </div>
            </div>
            <div className="field-group group setup-panel">
                <PanelHeader
                    title="WHAT STEP THERAPY TYPE(S) ARE INCLUDED IN THIS FORMULARY?"
                    tooltip="WHAT STEP THERAPY TYPE(S) ARE INCLUDED IN THIS FORMULARY?"
                    required={true}
                />
                            <div className="radio-group field-group__radio-group">
                    <div className="checkbox-wrapper">
                        <input type="checkbox" className="checkbox-btn" name="N/A" value="N/A" />
                        <label htmlFor="N/A" className="checkbox-label">Type 1</label>
                    </div>
                    <div className="checkbox-wrapper">
                        <input type="checkbox" className="checkbox-btn" name="N/A" value="N/A" />
                        <label htmlFor="N/A" className="checkbox-label">Type 2</label>
                    </div>
                    <div className="checkbox-wrapper">
                        <input type="checkbox" className="checkbox-btn" name="N/A" value="N/A" />
                        <label htmlFor="N/A" className="checkbox-label">N/A</label>
                    </div>
                </div>
            </div>
            <div className="field-group group setup-panel">
                <PanelHeader
                    title="ARE OTCS INCLUDED AS PART OF A STEP THERAPY PROTOCOL?"
                    tooltip="ARE OTCS INCLUDED AS PART OF A STEP THERAPY PROTOCOL?"
                    required={true}
                />
                <div className="radio-group field-group__radio-group">
                    <RadioButton label="Yes" />
                    <RadioButton label="No" />
                </div>
            </div>
        </Grid>
        </Grid>
        </div>
      </div>
    );
  }
}
