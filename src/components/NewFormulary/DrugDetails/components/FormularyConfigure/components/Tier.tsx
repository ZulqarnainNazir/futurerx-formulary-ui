import React from "react";
import { Grid } from "@material-ui/core";
import FrxMiniTabs from "../../../../../shared/FrxMiniTabs/FrxMiniTabs";
import "./Tier.scss";

import {
  getTapList,
  getMiniTabs,
} from "../../../../../../mocks/formulary/mock-data";
import CustomizedSwitches from "./CustomizedSwitches";
import PanelHeader from "./PanelHeader";
import PanelGrid from "./panelGrid";
import DropDown from "../../../../../shared/Frx-components/dropdown/DropDown";
import Button from "../../../../../shared/Frx-components/button/Button";
import Box from "@material-ui/core/Box";
import FrxDrugGridContainer from "../../../../../shared/FrxGrid/FrxDrugGridContainer";
import { tierColumns } from "../../../../../../utils/grid/columns";
import { TierMockData } from "../../../../../../mocks/TierMock";
import { TabInfo } from "../../../../../../models/tab.model";
import TierReplace from "./TierReplace";

interface tabsState {
  activeMiniTabIndex: number;
  miniTabs: any;
  tabs: any;
  tierGridContainer: boolean;
  activeTabIndex: any;
}

class Tier extends React.Component<any, tabsState> {
  state = {
    tierGridContainer: false,
    miniTabs: getMiniTabs(),
    isFetchingData: false,
    activeMiniTabIndex: 0,
    activeTabIndex: 0,
    tabs: [
      { id: 1, text: "Replace" },
      { id: 2, text: "Append" },
      { id: 3, text: "Remove" },
    ],
    panelGridTitle: [
      "TIER NAME",
      "TIER DESCRIPTION",
      "CURRENT ACCOUNT",
      "ADDED",
      "REMOVED",
      "VALIDATION",
    ],
    panelGridValue: [
      ["img", "Tier 0", "OTC", "2", "4", "2", "checkbox"],
      ["img", "Tier 1", "OTC", "2", "4", "2", "checkbox"],
      ["img", "Tier 2", "OTC", "2", "4", "2", "checkbox"],
      ["img", "Tier 3", "OTC", "2", "4", "2", "checkbox"],
    ],
  };

  onClickTab = (selectedTabIndex: number) => {
    let activeTabIndex = 0;

    const tabs = this.state.tabs.map((tab: TabInfo, index: number) => {
      if (index === selectedTabIndex) {
        activeTabIndex = index;
      }
      return tab;
    });
    this.setState({ tabs, activeTabIndex });
  };
  renderTabContent = () => {
    const activeTabIndex = this.state.activeTabIndex;
    switch (activeTabIndex) {
      case 0:
        return (
          <div>
            <TierReplace />
          </div>
        );
      case 1:
        return <div>Append</div>;
      case 2:
        return <div>Remove</div>;
    }
  };

  onClickMiniTab = (num: number) => {
    this.setState({
      activeMiniTabIndex: num,
    });
  };

  openTierGridContainer = () => {
    this.setState({ tierGridContainer: true });
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
                    <div className="inner-container tier-checkbox">
                      <PanelGrid
                        panelGridTitle={this.state.panelGridTitle}
                        panelGridValue={this.state.panelGridValue}
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-10">
                  <div className="limited-access">
                    <PanelHeader title="Tier Definition Settings" />
                    <div className="modify-wrapper white-bg">
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
                            tabList={this.state.tabs}
                            activeTabIndex={this.state.activeTabIndex}
                            onClickTab={this.onClickTab}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="tab-content">{this.renderTabContent()}</div>
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
