import React, { Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import DropDown from "../../../../../shared/Frx-components/dropdown/DropDown";
import Box from '@material-ui/core/Box';
import Button from '../../../../../shared/Frx-components/button/Button';

export default class FormularyTiers extends React.Component<any, any> {
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
                <DropDown
                  className="formulary-type-dropdown number-of-tier-dropdown"
                  placeholder="2"
                  options={[1, 3, 5]}
                />
              </div>
              <div className="tiers-dropdown-wrapper">
                  <div className="tier border-bottom">
                  <label>
                    TIER 0
                    </label>
                    <DropDown
                    className="formulary-tier-dropdown tier-zero"
                    placeholder="2"
                    options={[1, 3, 5]}
                    />
                  </div>
                  <div className="tier border-bottom">
                  <label>
                    TIER 1
                    </label>
                    <DropDown
                    className="formulary-tier-dropdown"
                    options={[1, 3, 5]}
                    />
                  </div>
                  <div className="tier">
                  <label>
                    TIER 2
                    </label>
                    <DropDown
                    className="formulary-tier-dropdown"
                    options={[1, 3, 5]}
                    />
                  </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
      </Fragment>
    );
  }
}
