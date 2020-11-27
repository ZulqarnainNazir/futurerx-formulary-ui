import React from 'react';
import PanelHeader from './PanelHeader';
import PanelGrid from './panelGrid';
import CustomizedSwitches from './CustomizedSwitches';
import { TabInfo } from "../../../../../../models/tab.model";
import FrxMiniTabs from "../../../../../shared/FrxMiniTabs/FrxMiniTabs";

export default class DrugDetailLA extends React.Component<any,any>{
    state={
        panelGridTitle1: ['','NUMBER OF DRUGS','ADDED DRUGS','REMOVED DRUGS'],
        panelTitleAlignment1: ['left','center','center','center'],
        panelGridValue1: [
          ['Limited Access','2','2','2']
        ],
        activeTabIndex: 0,
        tabs: [
            {
                id: 1,
                text: "Replace"
            },
            {
                id: 2,
                text: "Append"
            },
            {
                id: 3,
                text: "Remove"
            },
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
    render(){
        return (
            <div className="bordered">
                <PanelHeader 
                    title="Limited Access"
                    tooltip="Add or delete Limited Access (LA) Indicators in Drug Grid below for the formulary HPMS submission file and marketing material display. Identified LA drugs must meet CMS' definition of a Limited Access drug." />
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
                                    disabledIndex={1}
                                    disabled
                                />
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}