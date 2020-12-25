import React, { Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import DropDown from "../../../../../shared/Frx-components/dropdown/DropDown";
import Box from '@material-ui/core/Box';
import Button from '../../../../../shared/Frx-components/button/Button';
import {connect} from "react-redux";

const tierCount = {
  medicare: 7,
  commercial: 20
}
class FormularyTiers extends React.Component<any, any> {
  getTierDropDownVal = () => {
    const type = this.props.generalInfo.type.toLowerCase();
    const val:any = [];
    for(let i=1; i<=tierCount[type]; i++){
      val.push(i)
    }
    return val;
  }
  getAllTierOptions = () => {
    let options = [] as any;
    let htmlElement:any;
    if(this.props.tiers){
      const selectedTierOptions = this.props.tiers;
      const allOptions = this.props.tierOptionsOptions?.map(e => e.tier_label);
      options = selectedTierOptions.map(e => {
        if(e.id_tier_label === null){
          return {
            selecedVal: '',
            tierName: e.tier_name
          }
        }else{
          return this.props.tierOptionsOptions.find(el => el.id_tier_label === e.id_tier_label) ? {
            seletedVal: this.props.tierOptionsOptions.find(el => el.id_tier_label === e.id_tier_label).tier_label,
            tierName: e.tier_name
          } : '';
        }
      });
      htmlElement = options.map((e,index) => {
        return (<div className="tier border-bottom">
          <label>
            {e.tierName}
            </label>
            <DropDown
              className="formulary-tier-dropdown"
              value={e.seletedVal}
              options={allOptions}
              onChange={(el) => this.props.changeTierValue(el,e.tierName)}
            />
        </div>)
      });
      return htmlElement;
    }
  }
  numberOfTiers = () => {
    let selectedCount = this.props.tiers ? this.props.tiers.length : null;
    // if(this.props.selectedTiersOptions){
    let htmlElement = <DropDown
        className="formulary-type-dropdown number-of-tier-dropdown"
        placeholder="Select Tiers"
        options={this.getTierDropDownVal()}
        value={selectedCount}
        onChange={this.props.selectTier}
      />
    // }
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
    editInfo: state?.setup?.formulary?.edit_info
  };
};
export default connect(mapStateToProps)(FormularyTiers)