import React from 'react';
import PanelHeader from './PanelHeader';
import CustomizedSwitches from './CustomizedSwitches';
import { TabInfo } from "../../../../../../models/tab.model";
import FrxMiniTabs from "../../../../../shared/FrxMiniTabs/FrxMiniTabs";
import STF from './STF';
import FrxGrid from '../../../../../shared/FrxGrid/FrxGrid'
import { getAuditMockColumns } from "../../../../../../utils/grid/columns";

interface MemberAuditPopupState {
    activeMiniTabIndex: number;
    miniTabs: any;
    filteredData: any;
    isFetchingData: boolean;
    data: any;
}


export default class STS extends React.Component<any,any>{
    state={
        panelGridValue1: [],
        filteredData: [],
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

    renderActiveTabContent = () => {
        const tabIndex = this.state.activeTabIndex;
        const columns = getAuditMockColumns();
        switch (tabIndex) {
          case 0:
            return <STF />;

        case 1:
            return <STF />;

        case 2:
            return <FrxGrid
            showSettingsMenu={false}
            enableColumnDrag={false}
            pagintionPosition="topRight"
            columns={columns}
            data={this.state.filteredData}
            gridName={"Audit"}
            fixedColumnKeys={['record_type']}
            hideClearFilter={true}
            hideItemsPerPage={true}
            hideMultiSort={true}
            hidePageJumper={true}
            hideResults={true}
            scroll={{ x: 300, y: 400 }}
            enableSettings={false}
            hidePagination={true}
        />
        }
      };
      
    render(){
        return (
            <>
                <div className="bordered">
                    <PanelHeader 
                        title="STEP THERAPY SETTING" />
                    <div className="inner-container bg-light-grey">
  
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
                    <div className="tabs-info">{this.renderActiveTabContent()}</div>
                </div>
            </>
        )
    }
}