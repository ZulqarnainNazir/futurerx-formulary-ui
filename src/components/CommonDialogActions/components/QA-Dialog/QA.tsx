import React from "react";
import './QA.scss';
import {Grid} from "@material-ui/core";
import DropDown from "../../../shared/Frx-components/dropdown/DropDownMap";
import Question from './Question';

export default class WorkFlow extends React.Component<any, any> {  
  render() {
    return (
        <div>
            <Grid container className="containerQA">
                <Grid item xs={12}>
                    <div className="headerTitle">Find answers in Formulary</div>
                </Grid>
                <Grid item xs={9} className="paddingTop0">
                    <div className="main">
                      <div className="form-group has-search">
                        <span className="fa fa-search form-control-feedback"></span>
                        <input type="text" className="form-control" placeholder="Search"/>
                      </div>
                    </div>
                </Grid>
                <Grid item xs={3} className="paddingTop0">
                    <DropDown
                        options={["most helpful", "less helpful"]}
                        defaultValue="most helpful"
                        className="dropdown-input"
                      />
                </Grid>
                <Question votes="5"/>
                <Question votes="5"/>
                <Question votes="5"/>
                <Question votes="5"/>
                <Question votes="5"/>
            </Grid>
        </div>
    );
  }
}