import React from 'react';
import PanelHeader from './PanelHeader';
import PanelGrid from './panelGrid';
import CustomizedSwitches from './CustomizedSwitches';
import { TabInfo } from "../../../../../../models/tab.model";
import FrxMiniTabs from "../../../../../shared/FrxMiniTabs/FrxMiniTabs";

export default class DrugDetailPBST extends React.Component<any,any>{
    state={
        panelGridTitle1: ['PART B STEP THERAPY','NUMBER OF DRUGS','ADDED DRUGS','REMOVED DRUGS'],
        panelGridValue1: [],
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
                    title="Part B step Therapy"
                    tooltip="Add or delete Part B Step Therapy Status in Drug Grid below for the marketing material display." />
                <div className="inner-container bg-light-grey">
                    <div className="mb-10">
                        <PanelGrid 
                            panelGridTitle={this.state.panelGridTitle1} 
                            panelGridValue={this.state.panelGridValue1}/>
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