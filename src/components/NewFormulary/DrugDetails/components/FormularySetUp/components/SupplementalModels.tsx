import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from '@material-ui/core/Box';
import Button from '../../../../../shared/Frx-components/button/Button';
import PanelHeader from "../../FormularyConfigure/components/PanelHeader";
import {connect} from "react-redux";

class SupplementalModels extends React.Component<any, any> {
    getChecked = (id) => {
        let isChecked = false;
        if(this.props.supplemental_benefits){
            const supplemental_benefits = this.props.supplemental_benefits.map(e => e.id_supplemental_benefit);
            isChecked = supplemental_benefits.indexOf(id) !== -1;
        }
        return isChecked;
    }
  render() {
    return (
      <div className="supplemental-models-container">
        <h4>SUPPLEMENTAL BENEFITS OR ALTERNATIVE MODELS</h4>
        <div className="formulary-design-fields-wrapper setup-label">
        <Grid container>
            <Grid item xs={11}>
                <Grid container>
                    <Grid item xs={4}>
                        <ul>
                            <li>
                            <div className="checkbox-wrapper">
                                <input type="checkbox" className="checkbox-btn" name="N/A" value="N/A" />
                                <label htmlFor="N/A" className="checkbox-label"> N/A</label>
                            </div>
                            </li>
                            <li>
                            <div className="checkbox-wrapper">
                                <input type="checkbox" className="checkbox-btn" name="N/A" value="N/A" checked={this.getChecked(1)}/>
                                <label htmlFor="N/A" className="checkbox-label"> Free First Fill</label>
                            </div>
                            </li>
                            <li>
                            <div className="checkbox-wrapper">
                                <input type="checkbox" className="checkbox-btn" name="N/A" value="N/A" checked={this.getChecked(4)}/>
                                <label htmlFor="N/A" className="checkbox-label"> Home Infusion</label>
                            </div>
                            </li>
                            <li>
                            <div className="checkbox-wrapper">
                                <input type="checkbox" className="checkbox-btn" name="N/A" value="N/A" checked={this.getChecked(7)}/>
                                <label htmlFor="N/A" className="checkbox-label"> Additional Demonstration Drugs (MMP only)</label>
                                <PanelHeader
                                    tooltip="AGE LIMIT"
                                />
                            </div>
                            </li>
                            <li>
                            <div className="checkbox-wrapper">
                                <input type="checkbox" className="checkbox-btn" name="N/A" value="N/A" checked={this.getChecked(10)}/>
                                <label htmlFor="N/A" className="checkbox-label"> Value-Based Insurance Design</label>
                            </div>
                            </li>
                        </ul>
                    </Grid>
                    <Grid item xs={4}>
                        <ul className="checkbox-ul">
                            <li></li>
                            <li>
                            <div className="checkbox-wrapper">
                                <input type="checkbox" className="checkbox-btn" name="N/A" value="N/A" checked={this.getChecked(2)}/>
                                <label htmlFor="N/A" className="checkbox-label"> Full Gap Coverage</label>
                            </div>
                            </li>
                            <li>
                            <div className="checkbox-wrapper">
                                <input type="checkbox" className="checkbox-btn" name="N/A" value="N/A" checked={this.getChecked(5)}/>
                                <label htmlFor="N/A" className="checkbox-label"> Over the Counter Coverage</label>
                                <PanelHeader
                                    tooltip="Over the Counter Coverage"
                                />
                            </div>
                            </li>
                            <li>
                            <div className="checkbox-wrapper">
                                <input type="checkbox" className="checkbox-btn" name="N/A" value="N/A" checked={this.getChecked(8)}/>
                                <label htmlFor="N/A" className="checkbox-label"> Indication-Based Coverage</label>
                                
                            </div>
                            </li>
                            <li>
                            <div className="checkbox-wrapper">
                                <input type="checkbox" className="checkbox-btn" name="N/A" value="N/A" checked={this.getChecked(11)}/>
                                <label htmlFor="N/A" className="checkbox-label"> Senior Savings Model</label>
                            </div>
                            </li>
                        </ul>
                    </Grid>
                    <Grid item xs={4}>
                        <ul className="checkbox-ul">
                            <li></li>
                            <li>
                            <div className="checkbox-wrapper">
                                <input type="checkbox" className="checkbox-btn" name="N/A" value="N/A" checked={this.getChecked(3)}/>
                                <label htmlFor="N/A" className="checkbox-label"> Partial Gap Coverage</label>
                            </div>
                            </li>
                            <li>
                            <div className="checkbox-wrapper">
                                <input type="checkbox" className="checkbox-btn" name="N/A" value="N/A" checked={this.getChecked(6)}/>
                                <label htmlFor="N/A" className="checkbox-label"> Excluded Drugs</label>
                            </div>
                            </li>
                            <li>
                            <div className="checkbox-wrapper">
                                <input type="checkbox" className="checkbox-btn" name="N/A" value="N/A" checked={this.getChecked(9)}/>
                                <label htmlFor="N/A" className="checkbox-label"> LIS Cost-Sharing Reduction</label>
                            </div>
                            </li>
                            <li>
                            <div className="checkbox-wrapper">
                                <input type="checkbox" className="checkbox-btn" name="N/A" value="N/A"/>
                                <label htmlFor="N/A" className="checkbox-label"> Other</label>
                            </div>
                            </li>
                            <li>
                            <div className="checkbox-wrapper">
                                <input type="checkbox" name="N/A" value="N/A" className="checkbox-btn hide-cbx" />
                                <input type="text" className="add-new-cbx" />
                                <span>
                                <svg width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.75004 13.0417C1.75004 13.9125 2.46254 14.625 3.33337 14.625H9.66671C10.5375 14.625 11.25 13.9125 11.25 13.0417V3.54167H1.75004V13.0417ZM12.0417 1.16667H9.27087L8.47921 0.375H4.52087L3.72921 1.16667H0.958374V2.75H12.0417V1.16667Z" fill="#999999"/>
                                </svg>
                                </span>
                            </div>
                            </li>
                            <li>
                            <div className="checkbox-wrapper">
                            <input type="checkbox" name="N/A" value="N/A" className="checkbox-btn hide-cbx" />
                            <div className="add-new-cbx-btn-wrapper">
                                <div className="add-new-cbx-btn">
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M15.0312 15.0312C18.3507 11.7118 18.3507 6.32989 15.0312 3.01041C11.7117 -0.309078 6.32985 -0.309034 3.01041 3.01041C-0.309032 6.32985 -0.309075 11.7117 3.01041 15.0312C6.32989 18.3507 11.7118 18.3507 15.0312 15.0312ZM14.3241 14.3241C17.2531 11.3952 17.253 6.64641 14.3241 3.71751C11.3952 0.788612 6.64646 0.788569 3.71751 3.71751C0.788571 6.64646 0.788615 11.3952 3.71751 14.3241C6.64641 17.253 11.3952 17.2531 14.3241 14.3241Z" fill="#707683"/>
                                        <path d="M4.52082 9.02081C4.52082 9.29695 4.74468 9.52081 5.02082 9.52081H8.52082V13.0208C8.52082 13.2969 8.74468 13.5208 9.02082 13.5208C9.29696 13.5208 9.52082 13.2969 9.52082 13.0208V9.52081L13.0208 9.52081C13.297 9.52081 13.5208 9.29695 13.5208 9.02081C13.5208 8.74466 13.297 8.52081 13.0208 8.52081H9.52082L9.52082 5.02081C9.52082 4.74466 9.29696 4.52081 9.02082 4.52081C8.74468 4.52081 8.52082 4.74467 8.52082 5.02081V8.52081H5.02082C4.74468 8.52081 4.52082 8.74466 4.52082 9.02081Z" fill="#707683"/>
                                    </svg>
                                    </div>
                                <div className="add-new-text">
                                    <a href="#">add new</a>
                                </div>
                            </div>
                            </div>
                            </li>
                        </ul>
                    </Grid>
                    
                </Grid>
            </Grid>
            <Grid item xs={1}>
                <ul>
                    <li>
                    <Box display="flex" justifyContent="flex-end" className="compare-btn">
                        <Button label="Uncheck All" className="uncheck-btn" />
                    </Box>
                    </li>
                </ul>
            </Grid>
        </Grid>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
    return {
        supplementalOptions: state?.setup?.supplementalOptions,
        supplemental_benefits: state?.setup?.formulary?.supplemental_benefits
    };
  };
export default connect(mapStateToProps)(SupplementalModels)