import React from 'react';
import PanelHeader from './PanelHeader';
import PanelGrid from './panelGrid';
import Button from '../../../../../shared/Frx-components/button/Button';
import CustomizedSwitches from './CustomizedSwitches';
import { TabInfo } from "../../../../../../models/tab.model";
import FrxMiniTabs from "../../../../../shared/FrxMiniTabs/FrxMiniTabs";
import { textFilters } from "../../../../../../utils/grid/filters";
import { getDrugDetailsColumn } from "../DrugGridColumn";
import { getDrugDetailData } from "../../../../../../mocks/DrugGridMock";
import FrxLoader from "../../../../../shared/FrxLoader/FrxLoader";
import DrugGrid from '../../DrugGrid';

export default class DrugDetailPBST extends React.Component<any,any>{
    state={
        panelGridTitle1: ['PART B STEP THERAPY','NUMBER OF DRUGS','ADDED DRUGS','REMOVED DRUGS'],
        panelGridValue1: [],
        activeTabIndex: 0,
        columns: null,
        data: null,
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
    advanceSearchClickHandler = () => {
        console.log('Advance Search Button Click');
    }
    saveClickHandler = () => {
        console.log('Save data');
    }
    componentDidMount() {
        const data = getDrugDetailData();
        const columns = getDrugDetailsColumn();
        const FFFColumn: any = {
            id: 0,
            position: 0,
            textCase: "upper",
            pixelWidth: 238,
            sorter: {},
            isFilterable: true,
            showToolTip: false,
            key: "fff",
            displayTitle: "Free First Fill",
            filters: textFilters,
            dataType: "string",
            hidden: false,
            sortDirections: [],
        }
        columns.unshift(FFFColumn);
        for (let el of data) {
            el['fff'] = 'Y';
        }
        this.setState({
            columns: columns,
            data: data
        });

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
        let dataGrid = <FrxLoader />;
        if (this.state.data) {
            dataGrid = <DrugGrid columns={this.state.columns} data={this.state.data} />
        }
        return (
            <>
            <div className="bordered mb-10">
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
            <div className="bordered">
                    <div className="header space-between pr-10">
                        Drug Grid
                        <div className="button-wrapper">
                            <Button className="Button normal" label="Advance Search" onClick={this.advanceSearchClickHandler} />
                            <Button label="Save" onClick={this.saveClickHandler} disabled />
                        </div>
                    </div>
                    {dataGrid}
                </div>
            </>
        )
    }
}