import React from "react";
import { Grid } from "@material-ui/core";
import FrxMiniTabs from "../../../../../shared/FrxMiniTabs/FrxMiniTabs";
import "./DrugDetailLA.scss";
import { TabInfo } from "../../../../../../models/tab.model";
import { getStTabs } from "../../../../../../mocks/formulary/mock-data";
import StepTherpay from "./StepTherapy";
import FGCComponent from "./FGC";
import FFFComponent from "./FFF";
import HIComponent from "./HI";
import VBIDComponent from "./VBID";
import CBComponent from "./CB";
import SSMComponent from "./SSM";
import SOComponent from "./SO";
import DrugGrid from "../../DrugGrid";
import CustomizedSwitches from "./CustomizedSwitches";

interface drugDetailsState {
  activeTabIndex: number;
  tabs: Array<TabInfo>;
}

export default class StepTherpayDetails extends React.Component<
  any,
  drugDetailsState
> {
  state = {
    activeTabIndex: 0,
    tabs: getStTabs(),
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
        return <StepTherpay />;
      case 1:
        return <div>MO/NM</div>;
      case 2:
        return <div>IBF</div>;

    }
  };
  render() {
    return (
      <>
        <div className="bordered details-top">
          <div className="inner-container">
            <div className="configure-mini-tabs">
              <FrxMiniTabs
                tabList={this.state.tabs}
                activeTabIndex={this.state.activeTabIndex}
                onClickTab={this.onClickTab}
              />
            </div>
            <div className="tabs-info">{this.renderActiveTabContent()}</div>
          </div>
        </div>
      </>
    );
  }
}
