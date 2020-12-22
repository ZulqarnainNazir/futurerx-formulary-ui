import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from '@material-ui/core/Box';
import Button from '../../../../../shared/Frx-components/button/Button';
import PanelHeader from "../../FormularyConfigure/components/PanelHeader";
import {connect} from "react-redux";
import { Checkbox } from 'antd';
class SupplementalModels extends React.Component<any, any> {
    state = {
        custom_design: []
    }
    getChecked = (id) => {
        let isChecked = false;
        if(this.props.edit_info){
            isChecked = this.props.edit_info.edits.indexOf(id) !== -1;
        }
        return isChecked;
    }
    renderCustomCheckbox = () => {
        let checkbox:any = [];
        let custom:any=[];
        if(this.props.designOptions){
            custom = this.props.designOptions?.filter(e => e.is_custom === true);
            if(custom.length > 0){
                checkbox = custom?.map(el => {
                    return <input type="text" className="setup-input-fields other-input" value={el.edit_name} /> 
                })
            }
        }
        let finalEle = (
            <div>
                <Checkbox 
                    className="custom-checkbox mb-16" 
                    onChange={() => {}} 
                    checked={custom.length > 0}>
                        Other
                </Checkbox>
                {checkbox}
            </div>
        )
        return finalEle;
    }
    renderCheckbox = () => {
        let checkbox = [];
        let custom=[];
        if(this.props.designOptions){
            const des_opt = this.props.designOptions?.filter(e => (e.is_custom === false && e.edit_name !== 'Prescriber Taxonomy' && e.edit_name !=='N/A'));
            custom = this.props.designOptions?.filter(e => e.is_custom === true);
            let count = 0;
            checkbox = des_opt?.map(el => {
                return <Grid item xs={6}>
                    <Checkbox 
                        className="custom-checkbox mb-16" 
                        onChange={() => {}} 
                        checked={this.getChecked(el.id_edit)}>
                            {el.edit_name}
                    </Checkbox>
                </Grid>
            })
        }
        return checkbox; 
    }
    renderPrescribeCheckbox = () => {
        let checkbox = [];
        if(this.props.designOptions){
            const des_opt = this.props.designOptions?.filter(e => (e.is_custom === false && e.edit_name === 'Prescriber Taxonomy'));
            checkbox = des_opt?.map(el => {
                return <Checkbox 
                        className="custom-checkbox mb-16" 
                        onChange={() => {}} 
                        checked={this.getChecked(el.id_edit)}>
                            {el.edit_name}
                    </Checkbox>
            })
        }
        return checkbox; 
    }
  render() {
    return (
      <div className="supplemental-models-container">
        <h4>FORMULARY DESIGN</h4>
        <div className="formulary-design-fields-wrapper setup-label">
        <Grid container>
            <Grid item xs={11}>
                <Checkbox 
                    className="custom-checkbox mb-16" 
                    onChange={() => this.props.checkUncheckAllSupplemental('uncheck')} 
                    checked={true}>
                        N/A
                </Checkbox>
            </Grid>
            <Grid item xs={1}>
                <ul>
                    <li>
                    <Box display="flex" justifyContent="flex-end" className="compare-btn">
                        {this.props.edit_info.edits.length > 0 ? (
                            <Button label="Uncheck All" className="uncheck-btn" onClick={() => this.props.checkUncheckAllSupplemental('uncheck')}/>
                        ) : (
                            <Button label="Check All" className="uncheck-btn" onClick={() => this.props.checkUncheckAllSupplemental('check')}/>
                        )}
                    </Box>
                    </li>
                </ul>
            </Grid>
        </Grid>
        <Grid container>
            <Grid item xs={11}>
                <Grid container>
                    <Grid item xs={8}>
                        <Grid container>
                            {this.renderCheckbox()}
                        </Grid>
                    </Grid>
                    <Grid item xs={4}>
                        {this.renderPrescribeCheckbox()}
                        {this.renderCustomCheckbox()}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        <Grid container>
            <Grid item xs={11}>
                <Grid container>
                    
                </Grid>
            </Grid>
        </Grid>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
    return {
        designOptions: state?.setupOptions?.designOptions,
        supplemental_benefits: state?.setup?.formulary?.supplemental_benefits
    };
};
export default connect(mapStateToProps)(SupplementalModels)