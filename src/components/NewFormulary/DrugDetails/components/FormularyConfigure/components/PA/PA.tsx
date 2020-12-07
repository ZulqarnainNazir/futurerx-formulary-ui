import React, { useState } from "react";
import PanelHeader from "../PanelHeader";
import PanelGrid from "../panelGrid";
import CustomizedSwitches from "../CustomizedSwitches";
import FrxMiniTabs from "../../../../../../shared/FrxMiniTabs/FrxMiniTabs";
import {
  getTapList,
  getMiniTabs,
} from "../../../../../../../mocks/formulary/mock-data";
import DropDown from "../../../../../../shared/Frx-components/dropdown/DropDown";
import { Grid } from "@material-ui/core";
import { Row, Col, Space } from "antd";
import RadioButton from "../../../../../../shared/Frx-components/radio-button/RadioButton";
import Button from "../../../../../../shared/Frx-components/button/Button";
import { TabInfo } from "../../../../../../../models/tab.model";
import PaReplace from "./PaReplace";
import PaRemove from "./PaRemove";

import "../Tier.scss";
import "./PA.scss";

class PA extends React.Component {
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
      "TYPE",
      "NUMBER OF GROUPS",
      "ADDED GROUPS",
      "REMOVED GROUPS",
      "NUMBER OF DRUGS",
      "ADDED DRUGS",
      "REMOVED DRUGS",
    ],
    panelGridValue: [
      ["PA Type 1", "1", "2", "3", "4", "5", "6"],
      ["PA Type 2", "1", "2", "3", "4", "5", "6"],
      ["PA Type 3", "1", "2", "3", "4", "5", "6"],
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
        return <PaReplace />;
      case 1:
        return <div>Append</div>;
      case 2:
        return <PaRemove />;
    }
  };

  render() {
    return (
      <>
        <div className="drug-detail-LA-root">
          <div className="drug-detail-la-container">
            <div className="drug-detail-la-inner">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <div className="mb-10">
                    <div className="limited-access">
                      <PanelHeader title="Prior Authorization - DRUG SELECTION" />
                      <div className="inner-container">
                        <PanelGrid
                          panelGridTitle={this.state.panelGridTitle}
                          panelGridValue={this.state.panelGridValue}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="limited-access">
                    <PanelHeader title="Prior Authorization Settings" />
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
                        <div>
                          <div className="PA-list">
                            <span>LIST</span>
                            <DropDown options={[1, 2, 3]} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="pa-tab-content">
                      {this.renderTabContent()}
                    </div>
                  </div>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default PA;
