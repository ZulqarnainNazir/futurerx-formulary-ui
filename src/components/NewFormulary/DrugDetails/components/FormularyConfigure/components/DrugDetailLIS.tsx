import React from "react";
import { Grid } from "@material-ui/core";
import FrxMiniTabs from "../../../../../shared/FrxMiniTabs/FrxMiniTabs";
import "./DrugDetailLIS.scss";
import { getTapList, getMiniTabs } from '../../../../../../mocks/formulary/mock-data';
import CustomizedSwitches from './CustomizedSwitches';
import PanelHeader from './PanelHeader';
import PanelGrid from './panelGrid';
import RadioButtons from './RadioButtons';
interface tabsState {
  activeMiniTabIndex: number,
  miniTabs: any,
  tabs: any,
  input:string
}

class DrugDetailLIS extends React.Component<any, tabsState> {

  state = {
    miniTabs: getMiniTabs(),
    activeMiniTabIndex: 0,
    tabs: getTapList(),
    panelGridTitle: ['LIS COST REDUCTION', 'NUMBER OF DRUGS', 'ADDED DRUGS', 'REMOVED DRUGS'],
    panelGridValue: [
      ['$0.0', '0', '0', '0'],
      ['$0.0', '0', '0', '0']
    ],
    input:'input'
  };
  onClickMiniTab = (num: number) => {
    this.setState({
      activeMiniTabIndex: num
    });

  };
  render() {
    return (
      <div className="drug-detail-LIS-root">
        <div className="drug-detail-lis-container">
          <div className="drug-detail-lis-inner">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <div className="lis-cost-reduction">
                  <PanelHeader
                    title="LIS Cost Sharing Reduction"
                    tooltip="Add or delete Limited Access (LA) Indicators in Drug Grid below for the formulary HPMS submission file and marketing material display. Identified LA drugs must meet CMS' definition of a Limited Access drug." />
                  <div className="inner-container">
                    <PanelGrid
                      panelGridTitle={this.state.panelGridTitle}
                      panelGridValue={this.state.panelGridValue} />
                  </div>
                  <div className="lis-cost-reduction-inner">
                    <div className="Second">
                      <div className="setting-header">
                        <span>LIS Cost Sharing Reduction</span>
                        <span>
                          <svg
                            width="10"
                            height="12"
                            viewBox="0 0 10 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M7 0L10 3H7V0ZM6 0H1C0.447715 0 0 0.447715 0 1V11C0 11.5523 0.447715 12 1 12H9C9.55229 12 10 11.5523 10 11V4H7H6V0Z"
                              fill="#2055B5"
                            />
                          </svg>
                        </span>
                      </div>

                      <div className="setting-header-inner">
                        <Grid container spacing={2} justify="space-between" alignItems="center" className="viewall">
                          <Grid xs={12}>
                            <Grid container justify="space-between" alignItems="center">
                              <Grid item xs={1}>
                                <span className="tabs-with-count"><em>R</em></span>
                              </Grid>
                              <Grid item xs={3}>
                                <CustomizedSwitches />
                              </Grid>
                              <Grid item xs={8}>
                                <FrxMiniTabs
                                  tabList={this.state.miniTabs}
                                  activeTabIndex={this.state.activeMiniTabIndex}
                                  onClickTab={this.onClickMiniTab}
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                        <div className="content">
                        <RadioButtons filetype={'LIS Cost-Sharing Reduction Beyond Statutory Amount'} input={this.state.input}/>
                        </div>
                      </div>
                    </div>
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

export default DrugDetailLIS;