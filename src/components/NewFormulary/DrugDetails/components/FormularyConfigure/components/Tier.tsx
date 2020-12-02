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

interface tabsState {
  activeMiniTabIndex: number;
  miniTabs: any;
  tabs: any;
  tierGridContainer: boolean;
}

class Tier extends React.Component<any, tabsState> {
  state = {
    tierGridContainer: false,
    miniTabs: getMiniTabs(),
    isFetchingData: false,
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
      ["img", "Tier 0", "OTC", "2", "4", "2", "checkbox"],
      ["img", "Tier 1", "OTC", "2", "4", "2", "checkbox"],
      ["img", "Tier 2", "OTC", "2", "4", "2", "checkbox"],
      ["img", "Tier 3", "OTC", "2", "4", "2", "checkbox"],
    ],
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
                            tabList={this.state.miniTabs}
                            activeTabIndex={this.state.activeMiniTabIndex}
                            onClickTab={this.onClickMiniTab}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="group tier-dropdown white-bg">
                      <Grid container>
                        <Grid item xs={4}>
                          <label>
                            TIER <span className="astrict">*</span>
                          </label>
                          <DropDown options={[1, 2, 3]} />
                        </Grid>
                        <Grid item xs={1}>
                          <Box display="flex" justifyContent="flex-end">
                            <Button
                              label="Apply"
                              onClick={this.openTierGridContainer}
                            />
                          </Box>
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                </div>
                {this.state.tierGridContainer && (
                  <div className="bordered">
                    <div className="header space-between pr-10">
                      Select Drugs From
                      <div className="button-wrapper">
                        <Button
                          className="Button normal"
                          label="Advance Search"
                        />
                        <Button label="Save" disabled />
                      </div>
                    </div>

                    <div className="tier-grid-container">
                      <FrxDrugGridContainer
                        isPinningEnabled={false}
                        enableSearch={false}
                        enableColumnDrag
                        onSearch={() => {}}
                        fixedColumnKeys={[]}
                        pagintionPosition="topRight"
                        gridName="TIER"
                        enableSettings
                        columns={tierColumns()}
                        scroll={{ x: 2000, y: 377 }}
                        isFetchingData={false}
                        enableResizingOfColumns
                        data={TierMockData()}
                        rowSelection={{
                          columnWidth: 50,
                          fixed: true,
                          type: "checkbox",
                        }}
                      />
                    </div>
                  </div>
                )}
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}

export default Tier;
