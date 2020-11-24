import React from "react";
import { Grid } from "@material-ui/core";
import FrxMiniTabs from "../../../../../shared/FrxMiniTabs/FrxMiniTabs";
import "./DrugDetailLA.scss";
import {getTapList,getMiniTabs} from '../../../../../../mocks/formulary/mock-data';
import CustomizedSwitches from './tt';


interface tabsState {
  activeMiniTabIndex: number,
  miniTabs:any,
  tabs:any
}

class DrugDetailLA extends React.Component<any,tabsState> {

  state = {
    miniTabs:getMiniTabs(),
    activeMiniTabIndex:0,
    tabs:getTapList()
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
                <div className="limited-access-header">
                  <span>Limited Access</span>
                </div>
                <div className="limited-access-inner">
                  <div className="first">
                    <Grid container spacing={2} justify="space-between" alignItems="center">
                      <Grid xs={12}>
                        <Grid container justify="space-between" alignItems="center"  className='rowheader'>
                          <Grid item xs={3}></Grid>
                          <Grid item xs={3}>
                            <span>Number Of drugs</span>
                          </Grid>
                          <Grid item xs={3}>
                            <span>Added Drugs</span>
                          </Grid>
                          <Grid item xs={3}>
                            <span>Removed drugs</span>
                          </Grid>
                        </Grid>
                        <Grid container justify="space-between" alignItems="center"  className='rowcontent'>
                          <Grid item xs={3}>
                            <span className="text-left">Limited Access</span>
                          </Grid>
                          <Grid item xs={3}>
                            <span>2</span>
                          </Grid>
                          <Grid item xs={3}>
                            <span>2</span>
                          </Grid>
                          <Grid item xs={3}>
                            <span>2</span>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </div>
                  
                  <div className="second">
                    <Grid container spacing={2} justify="space-between" alignItems="center">
                      <Grid xs={12}>
                        <Grid container justify="space-between" alignItems="center"  className='rowcontent'>
                          <Grid item xs={1}></Grid>
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

export default DrugDetailLA;
