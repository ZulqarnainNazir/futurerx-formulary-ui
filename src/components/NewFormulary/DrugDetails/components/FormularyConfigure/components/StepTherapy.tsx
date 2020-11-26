import React from "react";
import { Grid } from "@material-ui/core";
import FrxMiniTabs from "../../../../../shared/FrxMiniTabs/FrxMiniTabs";
import "./DrugDetailLA.scss";
import {
  getTapList,
  getMiniTabs,
} from "../../../../../../mocks/formulary/mock-data";
import CustomizedSwitches from "./tt";
import PanelHeader from "./PanelHeader";
import PanelGrid from "./panelGrid";
import STS from './STS';
import STF from './STF';
interface tabsState {
  activeMiniTabIndex: number;
  miniTabs: any;
  tabs: any;
}

class StepTherapy extends React.Component<any, tabsState> {
  state = {
    miniTabs: getMiniTabs(),
    activeMiniTabIndex: 0,
    tabs: getTapList(),
    panelGridTitle: [
      "TYPE",
      "NUMBER OF GROUPS",
      "ADDED GROUPS",
      "REMOVED GROUPS",
      "NUMBER OF DRUGFS",
      "ADDED DRUGS",
      "REMOVED DRUGS",
    ],
    panelGridValue: [
      ["ST Type 1", "2", "4", "2", "2", "2"],
      ["ST Type 2", "3", "4", "1", "1", "1"],
      ["ST Type 3", "4", "4", "2", "2", "Tick"],
    ],
  };
  onClickMiniTab = (num: number) => {
    this.setState({
      activeMiniTabIndex: num,
    });
  };
  render() {
    return (
      <div className="drug-detail-LA-root">
        <div className="drug-detail-la-container">
          <div className="drug-detail-la-inner">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <div className="limited-access">
                  <PanelHeader
                    title="STEP THERAPY - DRUG SELECTION"
                  />
                  <div className="inner-container">
                    <PanelGrid
                      panelGridTitle={this.state.panelGridTitle}
                      panelGridValue={this.state.panelGridValue}
                    />
                  </div>
                </div>
                <div>
                  <STS />
                  {/* <STF /> */}
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}

export default StepTherapy;
