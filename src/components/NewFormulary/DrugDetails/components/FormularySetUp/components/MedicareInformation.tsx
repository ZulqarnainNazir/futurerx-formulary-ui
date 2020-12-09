import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from '@material-ui/core/Box';
import Button from '../../../../../shared/Frx-components/button/Button';
import RadioButton from "../../../../../shared/Frx-components/radio-button/RadioButton";
import PanelHeader from "../../FormularyConfigure/components/PanelHeader";
import {connect} from "react-redux";

class MedicareInformation extends React.Component<any, any> {
getCheckboxData = () => {
    let data = null;
    if(this.props.medicare_contract_types && this.props.contarct_types){
        const  medicare_contract_types = this.props.medicare_contract_types.map(e => e.id_medicare_contract_type);
        data = this.props.contarct_types.map(e => {
            const isChecked = medicare_contract_types.indexOf(e.id_medicare_contract_type) !== -1 ? true : false;
            return (<li>
                <div className="checkbox-wrapper">
                    <input type="checkbox" className="checkbox-btn" name="N/A" value="N/A" checked={isChecked} />
            <label htmlFor="N/A" className="checkbox-label">{e.medicare_contract_type}</label>
                </div>
            </li>)
        })
    }
    return data
}
render() {
    
    return (
    <div className="medicare-information-container">
        <h4>Medicare Information</h4>
        <div className="medicare-information-container__wrapper setup-label">
            <Grid container>
                <Grid item xs={6}>
                    <div className="group">
                        <label>MEDICARE CONTRACT TYPE <span className="astrict">*</span></label>
                        <ul className="checkbox-ul medicare-information-container__checkbox-ul">
                            {this.getCheckboxData()}
                            <li>
                                <div className="checkbox-wrapper">
                                    <input type="checkbox" className="checkbox-btn" name="N/A" value="N/A" />
                                    <label htmlFor="N/A" className="checkbox-label">Other</label>
                                </div>
                            </li>
                        </ul>
                    </div>
                </Grid>
                
                <Grid item xs={6}>
                    <div className="field-group group setup-panel">
                        <PanelHeader className="field-group__label-container" title="FORMULARY ID" tooltip="FORMULARY ID" required={true}/>
                        
                        <div>
                            <input type="text" className="setup-input-fields field-group__text-field" />
                        </div>
                        
                        <div className="field-group__post-fix-text">NOTE: Formulary ID assigned by CMS fter initial submission in HPMS</div>
                    </div>
                    
                    <div className="field-group group setup-panel">
                        <PanelHeader
                            title="IS THIS A CLOSED OR OPEN FORMULARY"
                            tooltip="IS THIS A CLOSED OR OPEN FORMULARY"
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
const mapStateToProps = (state) => {
    return {
      contarct_types: state?.setup?.medicareOptions,
      medicare_contract_types: state?.setup?.formulary?.medicare_contract_types
    };
  };
export default connect(mapStateToProps)(MedicareInformation)
