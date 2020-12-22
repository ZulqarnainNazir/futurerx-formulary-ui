import React from 'react'
import { Grid } from "@material-ui/core";
import DropDown from "../../../../../shared/Frx-components/dropdown/DropDown";
import Label from "../../../../../shared/Frx-components/label/Label";
import './common.scss';

const Replace = () => {
  return (
    <div className="ql-replace-container">
      <div className="panel-note">By inputting ‘Period of Time in Days’ you are creating a Type 2 QL indicating Quantity Limit over Time. Populate ‘Quantity’ and ‘Days’ to create Type 1 QL indicating Daily Quantity Limit.</div>
      <Grid container>
        <Grid item xs={4}>
            <div className="input-group">      
              <Label required={true}>QUANTITY</Label> 
              <DropDown options={[1, 2, 3]} />
            </div>
        </Grid>      
        <Grid item xs={4}>
            <div className="input-group">      
              <Label required={true}>DAYS</Label> 
              <DropDown options={[1, 2, 3]} />
            </div>
        </Grid>      
        <Grid item xs={4}>
            <div className="input-group">      
              <Label required={true}>PERIOD OF TIME IN DAYS</Label> 
              <DropDown options={[1, 2, 3]} />
            </div>
        </Grid>      
      </Grid>      
    </div>
  )
}

export default Replace
