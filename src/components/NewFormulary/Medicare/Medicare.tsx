import React from 'react';
import { TabInfo } from "../../../models/tab.model";
import FrxMiniTabs from '../../shared/FrxMiniTabs/FrxMiniTabs';

interface State{
    miniTabs: Array<TabInfo>;
    activeMiniTabIndex: number;
}

const miniTabs = [
    {id: 1, text: "Formulary"},
    {id: 2, text: "Mass Maintenance"},
    {id: 3, text: "Alternatives"},
    {id: 4, text: "Decision Tree"},
    {id: 5, text: "Group Description Management"}
]

export default class Medicare extends React.Component<any,any> {
    state = {
        miniTabs: miniTabs,
        activeMiniTabIndex: 0
    }
    onClickMiniTab = (selectedTabIndex: number) => {
        let activeMiniTabIndex = 0;
    
        const tabs = this.state.miniTabs.map((tab: TabInfo, index: number) => {
          if (index === selectedTabIndex) {
            activeMiniTabIndex = index;
          }
          return tab;
        });
        this.setState({ tabs, activeMiniTabIndex });
    };
    renderActiveMiniTabContent = () => {
        const miniTabIndex = this.state.activeMiniTabIndex;
        switch(miniTabIndex){
            case 0:
                return (
                    <div>
                        <div className="drug-detail" onClick={() => this.props.drugDetailClick()}>Drug Details</div>
                    </div>
                )
            case 1:
                return <div>Mass Maintenance</div>
            case 2:
                return <div>Alternatives</div>
            case 3:
                return <div>Decision Tree</div>
            case 4:
                return <div>Group Description Management</div>
        }
    }
    render(){
        return(
            <>
                <FrxMiniTabs
                    tabList={this.props.tabs ? this.props.tabs : this.state.miniTabs}
                    activeTabIndex={this.state.activeMiniTabIndex}
                    onClickTab={this.onClickMiniTab}
                />
                <div className="formulary-mini-tabs-info">
                    {this.renderActiveMiniTabContent()}
                </div>
            </>
        )
    }
}