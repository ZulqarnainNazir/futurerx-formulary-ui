import React from "react";
import { Grid } from "@material-ui/core";
import FrxMiniTabs from "../../../../../shared/FrxMiniTabs/FrxMiniTabs";
import "./DrugDetailPBST.scss";
import {getTapList,getMiniTabs} from '../../../../../../mocks/formulary/mock-data';
import CustomizedSwitches from './CustomizedSwitches';
import PanelHeader from './PanelHeader';
import PanelGrid from './panelGrid';
interface tabsState {
  activeMiniTabIndex: number,
  miniTabs:any,
  tabs:any
}

class DrugDetailPBST extends React.Component<any,tabsState> {

  state = {
    miniTabs:getMiniTabs(),
    activeMiniTabIndex:0,
    tabs:getTapList(),
    panelGridTitle: ['PART B STEP THERAPY','NUMBER OF DRUGS','ADDED DRUGS','REMOVED DRUGS'],
    panelGridValue: []
  };
  onClickMiniTab = (num: number) => {
    this.setState({
      activeMiniTabIndex: num
    });

  };
  render() {
    return (
      <div className="drug-detail-PBST-root">
      <div className="drug-detail-pbst-container">
        <div className="drug-detail-pbst-inner">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div className="part-b-step-therapy">
              <PanelHeader 
                    title="Part B step Therapy" 
                    tooltip="Add or delete Limited Access (LA) Indicators in Drug Grid below for the formulary HPMS submission file and marketing material display. Identified LA drugs must meet CMS' definition of a Limited Access drug."/>
                <div className="inner-container">  
                  <PanelGrid 
                    panelGridTitle={this.state.panelGridTitle} 
                    panelGridValue={this.state.panelGridValue}/>
                </div>
                <div className="part-b-step-therapy-inner">
                <div className="second">
                    <Grid container spacing={2} justify="space-between" alignItems="center">
                      <Grid xs={12}>
                        <Grid container justify="space-between" alignItems="center"  className='rowcontent'>
                          <Grid item xs={1}>
                            <span className="tabs-with-count"><em>R</em></span>
                          </Grid>
                          <Grid item xs={3}>
                          <CustomizedSwitches/>
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

export default DrugDetailPBST;