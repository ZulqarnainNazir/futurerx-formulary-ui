import React from "react";
import { Grid } from "@material-ui/core";
import FrxMiniTabs from "../../../../../shared/FrxMiniTabs/FrxMiniTabs";
import "./DrugDetailLA.scss";
import {getTapList,getMiniTabs} from '../../../../../../mocks/formulary/mock-data';
import CustomizedSwitches from './CustomizedSwitches';
import PanelHeader from './PanelHeader';
import PanelGrid from './panelGrid';
interface tabsState {
  activeMiniTabIndex: number,
  miniTabs:any,
  tabs:any
}

class DrugDetailLA extends React.Component<any,tabsState> {

  state = {
    miniTabs:getMiniTabs(),
    activeMiniTabIndex:0,
    tabs:getTapList(),
    panelGridTitle: ['','NUMBER OF DRUGS','ADDED DRUGS','REMOVED DRUGS'],
    panelGridValue: [
      ['Limited Access','2','2','2']
    ]
  };
  onClickMiniTab = (num: number) => {
    this.setState({
      activeMiniTabIndex: num
    });

  };
  render() {
    return (
      <div className="drug-detail-LA-root">
      <div className="drug-detail-la-container">
        <div className="drug-detail-la-inner">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div className="limited-access">
              <PanelHeader 
                    title="Limited Access" 
                    tooltip="Add or delete Limited Access (LA) Indicators in Drug Grid below for the formulary HPMS submission file and marketing material display. Identified LA drugs must meet CMS' definition of a Limited Access drug."/>
                <div className="inner-container">  
                  <PanelGrid 
                    panelGridTitle={this.state.panelGridTitle} 
                    panelGridValue={this.state.panelGridValue}/>
                </div>
                <div className="limited-access-inner">
                <div className="second">
                    <Grid container spacing={2} justify="space-between" alignItems="center">
                      <Grid xs={12}>
                        <Grid container justify="space-between" alignItems="center"  className='rowcontent'>
                          <Grid item xs={1}>
                            <span className="tabs-with-count"><em>R</em></span>
                          </Grid>
                          <Grid item xs={3}>
                          <CustomizedSwitches leftTitle="Off" rightTitle="On"/>
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

export default DrugDetailLA;
