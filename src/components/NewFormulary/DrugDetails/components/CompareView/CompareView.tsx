import React from 'react';
import { TabInfo } from "../../../../../models/tab.model";
import FrxTabs from '../../../../shared/FrxTabs/FrxTabs';
import CompareFormularies from './components/CompareFormularies';
import ViewFormularies from './components/ViewFormularies';

const tabs = [
    { id: 1, text: "COMPARE FORMUARIES" },
    { id: 2, text: "VIEW FORMULARIES" },
    { id: 3, text: "HPMS SUMMMARY" },
];

interface configureState{
    tabs: Array<TabInfo>;
    activeTabIndex: number;
}
interface configureProps{}

export default class CompareView extends React.Component<configureProps,configureState>{
    state = {
        tabs: tabs,
        activeTabIndex: 0
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
    renderActiveTabContent = () => {
        const tabIndex = this.state.activeTabIndex;
        switch(tabIndex){
            case 0:
                return <div><CompareFormularies /> </div>
            case 1:
                return <div><ViewFormularies /></div>
            case 2:
                return <div>HPMS SUMMARY</div>
            
        }
    }
    render(){
        return(
            <div className="bordered">
                <FrxTabs
                    tabList={this.state.tabs}
                    activeTabIndex={this.state.activeTabIndex}
                    onClickTab={this.onClickTab}
                />
                <div className="inner-container white-bg">
                    {this.renderActiveTabContent()}
                </div>
            </div>
        )
    }
}