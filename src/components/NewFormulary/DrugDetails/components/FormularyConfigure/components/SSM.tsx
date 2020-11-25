import React from 'react';
import Grid from "@material-ui/core/Grid";
import PanelHeader from './PanelHeader';
import PanelGrid from './panelGrid';
import CustomizedSwitches from './tt';
import { TabInfo } from "../../../../../../models/tab.model";
import FrxMiniTabs from "../../../../../shared/FrxMiniTabs/FrxMiniTabs";
import Box from '@material-ui/core/Box';
import Button from '../../../../../shared/Frx-components/button/Button';

export default class SSM extends React.Component<any,any>{
    state={
        panelGridTitle1: ['Senior Saving Model','Number of Drugs','added drugs','removed drugs'],
        panelTitleAlignment1: ['left','left','left','left'],
        panelGridValue1: [],
        activeTabIndex: 0,
        tabs:[
            {id: 1,text: "Replace"},
            {id: 2,text: "Append"},
            {id: 3,text: "Remove"}
        ]  
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
    settingFormApplyHandler = () => {
        alert(1)
    }
    render(){
        return (
            <div className="bordered">
                <PanelHeader 
                    title="Senior Saving Model"
                    tooltip="Define Senior Savings Model Designation in Drug Grid below for marketing material considerations." />
                <div className="inner-container bg-light-grey">
                    <div className="mb-10">
                        <PanelGrid 
                            panelGridTitle={this.state.panelGridTitle1} 
                            panelGridValue={this.state.panelGridValue1}
                            panelTitleAlignment={this.state.panelTitleAlignment1} />
                    </div>
                    <div className="modify-wrapper bordered white-bg">
                    <div className="modify-panel">
                            <div className="icon"><span>R</span></div>
                            <div className="switch-box">
                                <CustomizedSwitches leftTitle="Modify" rightTitle="view all"/>
                            </div>
                            <div className="mini-tabs">
                                <FrxMiniTabs
                                    tabList={this.state.tabs}
                                    activeTabIndex={this.state.activeTabIndex}
                                    onClickTab={this.onClickTab}
                                    disabled
                                    disabledIndex={1}
                                />
                            </div>
                        </div>
                        <div className="settings-form">
                            <Grid container>
                                <Grid item xs={6}>
                                    <div className="group">
                                        <label>Contract Id <span className="astrict">*</span></label>
                                        <input type="text" />
                                    </div>
                                    <div className="group">
                                        <label>PBP Id <span className="astrict">*</span></label>
                                        <input type="text" />
                                    </div>
                                </Grid>
                                <Grid item xs={6}>
                                    <div className="group">
                                        <label>copay <span className="astrict">*</span></label>
                                        <input type="text" />
                                    </div>
                                </Grid>
                            </Grid>
                            <Box display="flex" justifyContent="flex-end">
                                <Button label="Apply" disabled onClick={this.settingFormApplyHandler}/>
                            </Box>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}