import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import DropDown from "../../../../../shared/Frx-components/dropdown/DropDown";
import Label from "../../../../../shared/Frx-components/label/Label";
import Button from "../../../../../shared/Frx-components/button/Button";
import { Input } from "@material-ui/core";
import "./common.scss";

class Replace extends Component<any, any> {
  // const openTierGridContainer = () => {};
  componentDidMount() {
    this.props.onUpdateSelectedCriteria([]);
  }

  render() {
    return (
      <div className="ql-replace-container">
        <div className="panel-note">
          By inputting ‘Period of Time in Days’ you are creating a Type 2 QL
          indicating Quantity Limit over Time. Populate ‘Quantity’ and ‘Days’ to
          create Type 1 QL indicating Daily Quantity Limit.
        </div>
        <Grid container>
          <Grid item xs={4}>
            <div className="input-group">
              <Label required={true}>QUANTITY</Label>
              {/* <DropDown options={[1, 2, 3]} /> */}
              <Input
                className="formulary-list-search"
                // placeholder="Search"
                type="number"
                name="quantity"
                disableUnderline={true}
                onChange={this.props.handleOnChange}
                required={true}
              />
            </div>
          </Grid>
          <Grid item xs={4}>
            <div className="input-group">
              <Label required={true}>DAYS </Label>
              {/* <DropDown options={[1, 2, 3]} /> */}
              <div>
                <Input
                  className="formulary-list-search"
                  // placeholder="Search"
                  type="number"
                  name="days"
                  onChange={this.props.handleOnChange}
                  disableUnderline={true}
                />
              </div>
            </div>
          </Grid>
          <Grid item xs={4}>
            <div className="input-group">
              <Label required={true}>PERIOD OF TIME IN DAYS</Label>
              {/* <DropDown options={[1, 2, 3]} /> */}
              <Input
                className="formulary-list-search"
                // placeholder="Search"
                type="number"
                name="periodOfTime"
                onChange={this.props.handleOnChange}
                disableUnderline={true}
              />
            </div>
          </Grid>
          {/* <Button
          label="Apply"
          onClick={openTierGridContainer}
          // disabled={this.props.configureSwitch}
        ></Button> */}
        </Grid>
      </div>
    );
  }
}

export default Replace;
