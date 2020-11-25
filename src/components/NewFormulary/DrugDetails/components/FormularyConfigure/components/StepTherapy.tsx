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
      "TIER NAME",
      "TIER DESCRIPTION",
      "CURRENT ACCOUNT",
      "ADDED",
      "REMOVED",
      "VALIDATION",
    ],
    panelGridValue: [
      ["Tier 0", "OTC", "2", "4", "2", "Tick"],
      ["Tier 1", "OTC", "2", "4", "2", "Tick"],
      ["Tier 2", "OTC", "2", "4", "2", "Tick"],
      ["Tier 3", "OTC", "2", "4", "2", "Tick"],
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
                    title="Tier Definition"
                  />
                  <div className="inner-container">
                    <PanelGrid
                      panelGridTitle={this.state.panelGridTitle}
                      panelGridValue={this.state.panelGridValue}
                    />
                  </div>
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
