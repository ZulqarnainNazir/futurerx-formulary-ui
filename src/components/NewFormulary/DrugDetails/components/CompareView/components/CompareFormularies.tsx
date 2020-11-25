import React from 'react';
import Grid from "@material-ui/core/Grid";
import Box from '@material-ui/core/Box';
import Button from '../../../../../shared/Frx-components/button/Button';
import './CompareView.scss';
import vector from "../../../../../../assets/img/Vector.png";

export default class CompareFormularies extends React.Component<any,any>{
    render(){
        return (
            <div className="compare-formularies-container">
                <h6>Select formularies for comparison</h6>
                <div className="formulary-form">
                            <Grid container>
                                <Grid item xs={4}>
                                    <div className="group">
                                        <label>Base <span className="astrict">*</span></label>
                                        <input type="text" placeholder="Formulary 1" className="base-input" />
                                    </div>
                                </Grid>
                                <Grid item xs={2}>
                                    <div className="group">
                                        <img src={vector} className="vector-icon" alt="vector" />
                                    </div>
                                </Grid>
                                <Grid item xs={4}>
                                    <div className="group">
                                        <div className="formulary-relative">
                                            <label>Reference <span className="astrict">*</span></label>
                                            <input type="text" className="reference-input" value="" />
                                            <a href="" className="select-formulary">Select Formulary</a>
                                        </div> 
                                    </div>
                                </Grid>
                                <Grid item xs={2}>
                                     <Box display="flex" justifyContent="flex-end" className="compare-btn">
                                        <Button label="Compare" disabled />
                                     </Box>
                                </Grid>
                                {/* <Box display="flex" justifyContent="flex-end">
                                        <Button label="Compare" disabled onClick={this.settingFormApplyHandler}/>
                                     </Box> */}
                            </Grid>
                        </div>
            </div>
        )
    }
}