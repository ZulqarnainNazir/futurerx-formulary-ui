import React from 'react';
import { TabInfo } from "../../models/tab.model";
import FrxTabs from '../shared/FrxTabs/FrxTabs';
import Medicare from './Medicare/Medicare';
import DrugDetails from './DrugDetails/DrugDetails';

import './NewFormulary.scss';

const tabs = [
    { id: 1, text: "MEDICARE" },
    { id: 2, text: "MEDICAID" },
    { id: 3, text: "COMMERCIAL" },
    { id: 4, text: "EXCHANGE" }
];

interface State {
    tabs: Array<TabInfo>;
    activeTabIndex: number;
    showTabs: boolean;
    showDrugDetails: boolean;
}

export default class Formulary extends React.Component<any,any>{
    state = {
        activeTabIndex: 0,
        tabs: tabs,
        showTabs: true,
        showDrugDetails: false
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
    drugDetailsClickHandler = () => {
        this.setState({
            showTabs: !this.state.showTabs,
            showDrugDetails: !this.state.showDrugDetails
        })
    }
    renderActiveTabContent = () => {
        const tabIndex = this.state.activeTabIndex;
        switch(tabIndex){
            case 0:
                return <Medicare drugDetailClick={this.drugDetailsClickHandler}/>
            case 1:
                return <div>MEDICAID</div>
            case 2:
                return <div>COMMERCIAL</div>
            case 3:
                return <div>EXCHANGE</div>
        }
    }
    render(){
        return (
            <div className="formulary-root">
                { this.state.showTabs ? (
                    <>
                        <FrxTabs
                        tabList={this.state.tabs}
                        activeTabIndex={this.state.activeTabIndex}
                        onClickTab={this.onClickTab}
                        />
                        <div className="formulary-tabs-info">
                        {this.renderActiveTabContent()}
                        </div>
                    </>
                ) : this.state.showDrugDetails ? (
                    <>
                        <DrugDetails />
                    </>
                ) : null}
            </div>
        )
    }
}
