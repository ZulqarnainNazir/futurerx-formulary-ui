import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from '@material-ui/core/Box';
import Button from '../../../../../shared/Frx-components/button/Button';
import RadioButton from "../../../../../shared/Frx-components/radio-button/RadioButton";
import PanelHeader from "../../FormularyConfigure/components/PanelHeader";
import {connect} from "react-redux";
import { Checkbox } from 'antd';

class MedicareInformation extends React.Component<any, any> {
    getCheckboxData = () => {
        let data = null;
        if(this.props.contarct_types){
            const  medicare_contract_types = this.props.medicareOptions;
            data = this.props.contarct_types.map(e => {
                const isChecked = medicare_contract_types.indexOf(e.id_medicare_contract_type) !== -1 ? true : false;
                return (
                    <div className="checkbox-wrapper">
                        <Checkbox className="custom-checkbox mb-16" onChange={() => this.props.medicareCheck(e.id_medicare_contract_type)} defaultChecked={isChecked}>{e.medicare_contract_type}</Checkbox>
                    </div>
                )
            })
        }
        return data
    }
    render() {
        console.log(this.props)
        return (
        <div className="medicare-information-container">
            <h4>Medicare Information</h4>
            <div className="medicare-information-container__wrapper setup-label">
                <Grid container>
                    <Grid item xs={6}>
                        <div className="group">
                            <label className="mb-16">MEDICARE CONTRACT TYPE <span className="astrict">*</span></label>
                            <div className="checkbox-ul medicare-information-container__checkbox-ul">
                                {this.getCheckboxData()}
                                <div className="checkbox-wrapper other-checkbox-wrapper">
                                    <Checkbox className="custom-checkbox" onChange={this.props.onMedicareOtherCheck}>Other</Checkbox>
                                    {this.props.generalInfo.medicare_types_ref_other ? (
                                        <div>
                                            <input 
                                                type="text" 
                                                className="setup-input-fields other-input"
                                                onChange={this.props.otherMedicareInfo}/>
                                        </div>
                                     ) : null}
                                </div>
                            </div>
                        </div>
                    </Grid>
                    
                    <Grid item xs={6}>
                        <div className="field-group group setup-panel">
                            <PanelHeader className="field-group__label-container" title="FORMULARY ID" tooltip="FORMULARY ID" required={true}/>
                            
                            <div>
                                <input type="text" className="setup-input-fields field-group__text-field" />
                            </div>
                            
                            <div className="field-group__post-fix-text text-tran-none">NOTE: Formulary ID assigned by CMS fter initial submission in HPMS</div>
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
        mode: state?.application?.mode,
        contarct_types: state?.setupOptions?.medicareOptions,
        medicare_contract_types: state?.setup?.formulary?.medicare_contract_types
    };
};
export default connect(mapStateToProps)(MedicareInformation)
