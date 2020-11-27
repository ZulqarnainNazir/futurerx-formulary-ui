import React from "react";
import { Grid } from "@material-ui/core";
import FrxMiniTabs from "../../../../../shared/FrxMiniTabs/FrxMiniTabs";
import { TabInfo } from "../../../../../../models/tab.model";
import {getTapList} from '../../../../../../mocks/formulary/mock-data';
import LAComponent from './DrugDetailLA';
import AFComponent from './DrugDetailAF';
import PBSTComponent from './DrugDetailPBST';
import PGCComponent from './DrugDetailPGC';
import MOMNComponent from './DrugDetailMOMN';
import LISComponent from './DrugDetailLIS';
import IBFComponent from './DrugDetailIBF';
import FGCComponent from './FGC';
import FFFComponent from './FFF';
import HIComponent from './HI';
import VBIDComponent from './VBID';
import CBComponent from './CB';
import SSMComponent from './SSM';
import SOComponent from './SO';
import DrugGrid from '../../DrugGrid';
import CustomizedSwitches from './CustomizedSwitches';

interface drugDetailsState {
  activeTabIndex: number;
  tabs: Array<TabInfo>;
}

export default class DrugDetails extends React.Component<any,drugDetailsState>{
    state = {
        activeTabIndex: 0,
        tabs: getTapList()
    }
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
        switch(tabIndex){
            case 0:
                return <LAComponent />
            case 1:
                return <MOMNComponent/>
            case 2:
                return <IBFComponent/>
            case 3:
                return <FGCComponent />
            case 4:
                return <PGCComponent/>
            case 5:
                return <FFFComponent />
            case 6:
                return <HIComponent />
            case 7:
                return <VBIDComponent />
            case 8:
                return <CBComponent />
            case 9:
                return <LISComponent/>
            case 10:
                return <PBSTComponent/>
            case 11:
                return <SSMComponent />
            case 12:
                return <AFComponent/>
            case 13:
                return <SOComponent />
        }
    }
    
  render() {
    return (
      <>
        <div className="bordered details-top">
          <div className="header">Drug Details</div>
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
