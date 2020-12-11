import React, { Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import DropDown from "../../../../../shared/Frx-components/dropdown/DropDown";
import Box from '@material-ui/core/Box';
import Button from '../../../../../shared/Frx-components/button/Button';
import {connect} from "react-redux";

const tierCount = {
  medicare: [1,2,3,4,5,6,7],
  commercial: 20
}
class FormularyTiers extends React.Component<any, any> {
  
  getAllTierOptions = () => {
    let options = [];
    let htmlElement:any;
    if(this.props.tierOptionsOptions && this.props.selectedTiersOptions){
      const selectedTierOptions = this.props.selectedTiersOptions.map(e => e.id_tier_label)
      const allOptions = this.props.tierOptionsOptions.map(e => e.tier_label);
      options = selectedTierOptions.map(e => {
        return this.props.tierOptionsOptions.find(el => el.id_tier_label === e) ? this.props.tierOptionsOptions.find(el => el.id_tier_label === e).tier_label : '';
      })
      htmlElement = options.map((e,index) => {
        return (<div className="tier border-bottom">
          <label>
            Tier {index}
            </label>
            <DropDown
              className="formulary-tier-dropdown"
              placeholder={e}
              value={e}
              options={allOptions}
              disabled={index === 0}
            />
        </div>)
      })
    }
    return htmlElement;
  }
  numberOfTiers = () => {
    let htmlElement:any;
    if(this.props.selectedTiersOptions){
      htmlElement = <DropDown
        className="formulary-type-dropdown number-of-tier-dropdown"
        placeholder={this.props.selectedTiersOptions.length}
        options={tierCount.medicare}
        defaultValue={this.props.selectedTiersOptions.length - 1}
      />
    }
    return htmlElement;
  }
  render() {
    return (
      <Fragment>
      <div className="tiers-information-container">
        <h4>TIERS</h4>
        <div className="tiers-information-fields-wrapper setup-label">
          <Grid container>
          <Grid item xs={4}>
              <div className="group">
                <label>
                  NUMBER OF TIERS <span className="astrict">*</span>
                </label>
                {this.numberOfTiers()}
                
              </div>
              <div className="tiers-dropdown-wrapper">
                {this.getAllTierOptions()}
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    tierOptionsOptions: state?.setupOptions?.tierOptions,
    selectedTiersOptions: state?.setup?.formulary?.tiers,
    designOptions: state?.setupOptions?.designOptions,
    editInfo: state?.setup?.formulary?.edit_info
  };
};
export default connect(mapStateToProps)(FormularyTiers)