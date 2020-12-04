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
import FrxGridContainer from "../../../../../shared/FrxGrid/FrxGridContainer";
import { tierColumns } from "../../../../../../utils/grid/columns";
import { TierMockData } from "../../../../../../mocks/TierMock";
import {tierDefinationColumns} from './TierDefinationGridColumn';
import {getTierDefinationData} from '../../../../../../mocks/formulary/tierDefinationMock';
import { TabInfo } from "../../../../../../models/tab.model";
import TierReplace from "./TierReplace";
import TierRemove from "./TierRemove";
import { GridMenu } from "../../../../../../models/grid.model";
interface tabsState {
  activeMiniTabIndex: number;
  miniTabs: any;
  tabs: any;
  tierGridContainer: boolean;
  activeTabIndex: any;
  tierDefinationColumns: any;
  tierDefinationData: any;
  columns: any;
  data: any;
  openPopup: boolean;
}

class Tier extends React.Component<any, tabsState> {
  state = {
    tierGridContainer: false,
    miniTabs: getMiniTabs(),
    isFetchingData: false,
    activeMiniTabIndex: 0,
    activeTabIndex: 0,
    columns: [],
    data: [],
    tierDefinationColumns: [],
    tierDefinationData: [],
    openPopup: false,
    tabs: [
      { id: 1, text: "Replace" },
      { id: 2, text: "Append" },
      { id: 3, text: "Remove" },
    ]
  };
  componentDidMount() {
    const TierColumns = tierDefinationColumns();
    const TierDefinationData = getTierDefinationData();
    this.setState({
      tierDefinationColumns: TierColumns,
      tierDefinationData: TierDefinationData
    })
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

  renderTabContent = () => {
    const activeTabIndex = this.state.activeTabIndex;
    switch (activeTabIndex) {
      case 0:
        return <TierReplace />;
      case 1:
        return <div>Append</div>;
      case 2:
        return <TierRemove />;
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
  handleSearch = () => {
    console.log("work")
  }
  settingsTriDotClick = (data: any) => {
    console.log("tri dot clicked ", data);
  };
  settingsTriDotMenuClick = (menuItem: GridMenu) => {
    if (menuItem.title === "Modify Auth or Override") {
      this.setState({
        openPopup: true,
      });
    }
    if (this.props.settingsTriDotMenuClick) {
      console.log("tridot menu clicked", menuItem);
    }
  };
  onNewDefinationAddHandler = () => {
    console.log('add new click')
  }
  render() {
    const tierDefinationColumns = this.state.tierDefinationColumns;
    const tierDefinationData = this.state.tierDefinationData;
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
                    <div className="inner-container tier-defination-grid white-bg">
                      <FrxGridContainer
                        enableSearch={false}
                        enableColumnDrag={false}
                        onSearch={() => {}}
                        fixedColumnKeys={[]}
                        pagintionPosition="topRight"
                        gridName="TIERDEFINATIONGRID"
                        enableSettings
                        isFetchingData={false}
                        columns={tierDefinationColumns}
                        settingsTriDotClick={this.settingsTriDotClick}
                        settingsTriDotMenuClick={this.settingsTriDotMenuClick}
                        isPinningEnabled={false}
                        onSettingsClick="grid-menu"
                        scroll={{y: 377 }}
                        enableResizingOfColumns
                        hideClearFilter
                        hideMultiSort
                        hideItemsPerPage
                        hidePageJumper
                        hidePagination
                        hideResults
                        data={tierDefinationData}
                      />
                      <Box display="flex" justifyContent="flex-end">
                        <Button 
                          label="add new"
                          icon=""
                          className="add-new-defination" 
                          onClick={this.onNewDefinationAddHandler} />
                      </Box>
                    </div>
                    
                  </div>
                </div>
                <div className="mb-10">
                  <div className="limited-access">
                    <PanelHeader title="Tier Definition Settings" />
                    <div className="modify-wrapper white-bg tier-modify-panel">
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
