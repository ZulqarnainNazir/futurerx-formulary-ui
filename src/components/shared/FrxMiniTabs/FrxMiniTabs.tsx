// React imports
import React from "react";

// Material imports
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Tooltip, Button } from "@material-ui/core";

// Shared models
import { TabInfo } from "../../../models/tab.model";

// Styling imports
import "./FrxMiniTabs.scss";

interface TabProps {
  tabList: TabInfo[];
  activeTabIndex: number;
  onClickTab: (clickedTab: number) => void;
}

interface TabState {}

class FrxMiniTabs extends React.Component<TabProps, TabState> {
  /**
   * @function onClickTab
   * triggered when you switch a tab
   */
  onClickTab = (event: React.ChangeEvent<{}>, clickedTab: number) => {
    this.props.onClickTab(clickedTab);
  };

  render() {
    return (
      <AppBar className="frx-mini-tabs-root">
        <Tabs
          value={this.props.activeTabIndex}
          indicatorColor="primary"
          textColor="primary"
          onChange={this.onClickTab}
          aria-label="tabs"
          className="frx-mini-tabs-root__tabs"
        >
          {this.props.tabList.map((tab: TabInfo) => (
            <Tab
              className="frx-mini-tabs-root__tabs__tab"
              key={tab.id}
              label={tab.text}
            />
          ))}
        </Tabs>
        <div className="frx-mini-tabs-root__active-line" />

        {/* <div className="dev-status wip">
          TODO: 3px white space below the active-line needs to be removed
        </div> */}
      </AppBar>
    );
  }
}

export default FrxMiniTabs;
