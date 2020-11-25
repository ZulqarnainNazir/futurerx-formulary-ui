import React from "react";
import FrxMiniTabs from "../../../../../shared/FrxMiniTabs/FrxMiniTabs";

// import css
import "./Tier.scss";

import { TabInfo } from "../../../../../../models/tab.model";
import { getTapList } from "../../../../../../mocks/formulary/mock-data";

interface TierState {
  activeTabIndex: number;
  tabs: Array<TabInfo>;
}

export default class Tier extends React.Component<any, TierState> {
  state = {
    activeTabIndex: 0,
    tabs: getTapList(),
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

  render() {
    return (
      <>
        <div className="bordered details-top">
          <div className="header">Tier Definitionaaaaaa</div>
        </div>
      </>
    );
  }
}
