import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import DropDown from "../../../../../shared/Frx-components/dropdown/DropDown";
import Label from "../../../../../shared/Frx-components/label/Label";
import RadioButton from "../../../../../shared/Frx-components/radio-button/RadioButton";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Input } from "@material-ui/core";
import "./common.scss";

const FillLimitSettings = (props) => {
  const [selectedCriteria, setSelectedCriteria] = useState("no");
  const { fillsAllowed = "", fillLimitPeriodOfTime = "" } = props.values;

  return (
    <div className="fill-limit-settings-container">
      <Grid container>
        <Grid item xs={4}>
          <div className="input-group">
            <Label required={true}>fills allowed</Label>
            {/* <DropDown options={[1, 2, 3]} /> */}
            <Input
              className="formulary-list-search"
              // placeholder="Search"
              type="number"
              name="fillsAllowed"
              value={fillsAllowed}
              onChange={props.handleOnChange}
              disableUnderline={true}
              disabled={props.isViweAll}
            />
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className="input-group">
            <Label required={false}>fill limit period of time in days</Label>
            {/* <DropDown options={[1, 2, 3]} /> */}
            <div>
              <Input
                className="formulary-list-search"
                // placeholder="Search"
                type="number"
                name="fillLimitPeriodOfTime"
                value={fillLimitPeriodOfTime}
                onChange={props.handleOnChange}
                disableUnderline={true}
                disabled={props.isViweAll}
              />
            </div>
          </div>
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <div className="input-group">
            <Label required={false}>
              do you want to add additional criteria?
            </Label>

            <div className="radio-group">
              <RadioButton
                label="Yes"
                checked={props.is_additional_criteria_defined}
                value="yes"
                onClick={props.onRadioButtonClick}
                name="limit-additional-criteria"
                disabled={props.isViweAll}
              />
              <RadioButton
                label="No"
                checked={!props.is_additional_criteria_defined}
                value="no"
                onChange={props.onRadioButtonClick}
                name="limit-additional-criteria"
                disabled={props.isViweAll}
              />
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default FillLimitSettings;
