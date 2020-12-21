import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import DropDown from "../../../../../shared/Frx-components/dropdown/DropDown";
import Label from "../../../../../shared/Frx-components/label/Label";
import RadioButton from "../../../../../shared/Frx-components/radio-button/RadioButton";
import "./common.scss";

const FillLimitSettings = () => {
  const [selectedCriteria, setSelectedCriteria] = useState("yes");

  return (
    <div className="fill-limit-settings-container">
      <Grid container>
        <Grid item xs={4}>
          <div className="input-group">
            <Label required={true}>fills allowed</Label>
            <DropDown options={[1, 2, 3]} />
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className="input-group">
            <Label required={true}>fill limit period of time in days</Label>
            <DropDown options={[1, 2, 3]} />
          </div>
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <div className="input-group">
            <Label required={true}>
              do you want to add additional criteria?
            </Label>

            <div className="radio-group">
              <RadioButton
                label="Yes"
                checked={selectedCriteria === "yes"}
                value="yes"
                onChange={(e) => setSelectedCriteria(e.target.value)}
                name="limit-additional-criteria"
              />
              <RadioButton
                label="No"
                checked={selectedCriteria === "no"}
                value="no"
                onChange={(e) => setSelectedCriteria(e.target.value)}
                name="limit-additional-criteria"
              />
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default FillLimitSettings;
