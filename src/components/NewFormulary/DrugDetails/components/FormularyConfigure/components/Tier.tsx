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
import DropDown from "../../../../../shared/Frx-components/dropdown/DropDown";

interface tabsState {
  activeMiniTabIndex: number;
  miniTabs: any;
  tabs: any;
}

class Tier extends React.Component<any, tabsState> {
  state = {
    miniTabs: getMiniTabs(),
    activeMiniTabIndex: 0,
    activeTabIndex: 0,
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
      ["img", "Tier 0", "OTC", "2", "4", "2", "Tick"],
      ["img", "Tier 1", "OTC", "2", "4", "2", "Tick"],
      ["img", "Tier 2", "OTC", "2", "4", "2", "Tick"],
      ["img", "Tier 3", "OTC", "2", "4", "2", "Tick"],
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
                <div className="mb-10">
                  <div className="limited-access">
                    <PanelHeader
                      title="Tier Definition"
                      tooltip="This section allows for Addition or Removal of product only. To define coverage for all Medicare covered and/or Supplemental products, go to Drug Details"
                    />
                    <div className="inner-container">
                      <PanelGrid
                        panelGridTitle={this.state.panelGridTitle}
                        panelGridValue={this.state.panelGridValue}
                      />
                    </div>
                  </div>
                </div>
                <div className="limited-access">
                  <PanelHeader title="Tier Definition Settings" />
                  <div className="modify-wrapper bordered white-bg">
                    <div className="modify-panel">
                      <div className="icon">
                        <span>R</span>
                      </div>
                      <div className="switch-box">
                        <CustomizedSwitches
                          leftTitle="Modify"
                          rightTitle="view all"
                        />
                      </div>
                      <div className="mini-tabs">
                        <FrxMiniTabs
                          tabList={this.state.miniTabs}
                          activeTabIndex={this.state.activeMiniTabIndex}
                          onClickTab={this.onClickMiniTab}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="group">
                    <label>
                      QUANTITY <span className="astrict">*</span>
                    </label>
                    <DropDown options={[1, 2, 3]} />
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

export default Tier;
