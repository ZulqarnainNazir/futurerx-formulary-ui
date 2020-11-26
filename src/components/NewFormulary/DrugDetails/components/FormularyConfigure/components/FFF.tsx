import React from 'react';
import PanelHeader from './PanelHeader';
import PanelGrid from './panelGrid';
import CustomizedSwitches from './CustomizedSwitches';
import { TabInfo } from "../../../../../../models/tab.model";
import FrxMiniTabs from "../../../../../shared/FrxMiniTabs/FrxMiniTabs";
import DrugGrid from '../../DrugGrid';
export default class FFF extends React.Component<any,any>{
    state={
        panelGridTitle1: ['Free First Fill','Number of Drugs','added drugs','removed drugs'],
        panelTitleAlignment1: ['left','left','left','left'],
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
            <>
                <div className="bordered mb-10">
                    <PanelHeader 
                        title="Free First Fill"
                        tooltip="ADD File or delete Free First Fill Status in Drug Grid below for the supplemental HPMS submission file and marketing material display." />
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
                <DrugGrid />
            </>
        )
    }
}