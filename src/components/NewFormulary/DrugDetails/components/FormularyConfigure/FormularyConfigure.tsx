import React from "react";
import { TabInfo } from "../../../../../models/tab.model";
import FrxTabs from "../../../../shared/FrxTabs/FrxTabs";
import DrugDetails from "./components/DrugDetails";
import Tier from "./components/Tier";
import StepTherapy from "./components/StepTherapy";

const tabs = [
  { id: 1, text: "TIER" },
  { id: 2, text: "CATEGORY/CLASS" },
  { id: 3, text: "PA" },
  { id: 4, text: "ST" },
  { id: 5, text: "QL" },
  { id: 6, text: "DRUG DETAILS" },
];

interface configureState {
  tabs: Array<TabInfo>;
  activeTabIndex: number;
}
interface configureProps {}

export default class FormularyConfigure extends React.Component<
  configureProps,
  configureState
> {
  state = {
    tabs: tabs,
    activeTabIndex: 0,
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
  renderActiveTabContent = () => {
    const tabIndex = this.state.activeTabIndex;
    switch (tabIndex) {
      case 0:
        return (
          <div>
            <Tier />
          </div>
        );
      case 1:
        return <div>CATEGORY/CLASS</div>;
      case 2:
        return <div>PA</div>;
      case 3:
        return <div><StepTherapy /></div>;
      case 4:
        return <div>QL</div>;
      case 5:
        return <DrugDetails />;
    }
  };
  render() {
    return (
      <div className="bordered">
        <FrxTabs
          tabList={this.state.tabs}
          activeTabIndex={this.state.activeTabIndex}
          onClickTab={this.onClickTab}
        />
        <div className="inner-container white-bg">
          {this.renderActiveTabContent()}
        </div>
      </div>
    );
  }
}
