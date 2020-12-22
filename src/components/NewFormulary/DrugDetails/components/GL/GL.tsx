import React from 'react';
import Grid from "@material-ui/core/Grid";
import PanelHeader from '../../../../shared/Frx-components/panel-header/PanelHeader';
import PanelGrid from '../../../../shared/Frx-components/panel-grid/PanelGrid';
import CustomizedSwitches from '../FormularyConfigure/components/CustomizedSwitches';
import { TabInfo } from "../../../../../models/tab.model";
import FrxMiniTabs from "../../../../shared/FrxMiniTabs/FrxMiniTabs";
import NotesPopup from "../../../../member/MemberNotesPopup";
import Box from '@material-ui/core/Box';
import Button from '../../../../shared/Frx-components/button/Button';
import { textFilters } from "../../../../../utils/grid/filters";
import { getDrugDetailsColumnGL } from "../../../DrugDetails/components/FormularyConfigure/DrugGridColumn";
import { getDrugDetailData } from "../../../../../mocks/DrugGridMock";
import FrxLoader from "../../../../shared/FrxLoader/FrxLoader";
import DrugGrid from "../../../DrugDetails/components/DrugGrid";
import AdvancedSearch from "../../../DrugDetails/components/FormularyConfigure/components/search/AdvancedSearch";

import GenderLimitSettings from './GenderLimitSettings';

export default class DrugDetailGL extends React.Component<any,any>{
    state={
        isSearchOpen: false,
        panelGridTitle1: ['', 'NUMBER OF DRUGS', 'ADDED DRUGS', 'REMOVED DRUGS'],
        panelTitleAlignment1: ['center','center','center','center'],
        panelGridValue1: [
          ['Gender Limit - Covered', '2', '2', '2'],
          ['Gender Limit - Not Covered', '2', '2', '2']
        ],
        isNotesOpen: false,
        activeTabIndex: 0,
        columns: null,
        data: null,
        tabs: [
            {id: 1,text: "Replace"},
            {id: 2,text: "Append"},
            {id: 3,text: "Remove"}
        ]   
    }
    advanceSearchClickHandler = (event) => {
        event.stopPropagation();
        this.setState({isSearchOpen: !this.state.isSearchOpen})
    }
    advanceSearchClosekHandler = () =>{
        this.setState({isSearchOpen: !this.state.isSearchOpen})
    }
    saveClickHandler = () => {
        console.log('Save data');
    }
    componentDidMount() {
        const data = getDrugDetailData();
        const columns = getDrugDetailsColumnGL();
        // const FFFColumn: any = {
        //     id: 0,
        //     position: 0,
        //     textCase: "upper",
        //     pixelWidth: 238,
        //     sorter: {},
        //     isFilterable: true,
        //     showToolTip: false,
        //     key: "fff",
        //     displayTitle: "Free First Fill",
        //     filters: textFilters,
        //     dataType: "string",
        //     hidden: false,
        //     sortDirections: [],
        // }
        // columns.unshift(FFFColumn);
        // for (let el of data) {
        //     el['fff'] = 'Y';
        // }
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
    handleNoteClick = (event: React.ChangeEvent<{}>) => {
        event.stopPropagation();
        this.setState({isNotesOpen: !this.state.isNotesOpen});
    };
    handleCloseNote = () => {
        this.setState({isNotesOpen: !this.state.isNotesOpen});
    };
    settingFormApplyHandler = () => {
        alert(1)
    }
    render(){
        let dataGrid = <FrxLoader />;
        if (this.state.data) {
            dataGrid = <DrugGrid columns={this.state.columns} data={this.state.data} />
        }
        return (
            <>
            <div className="bordered mb-10">
                <PanelHeader 
                    title="Gender Limit"
                    tooltip="Gender Limit" />
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
                                    
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <GenderLimitSettings/>
            
            <div className="bordered">
                    <div className="header space-between pr-10">
                        Drug Grid
                        <div className="button-wrapper">
                            <Button className="Button normal" label="Advance Search" onClick={this.advanceSearchClickHandler} />
                            <Button label="Save" onClick={this.saveClickHandler} disabled />
                        </div>
                    </div>
                    {dataGrid}
                    {this.state.isSearchOpen ? (
                        <AdvancedSearch
                                category="Grievances"
                                openPopup={this.state.isSearchOpen}
                                onClose={this.advanceSearchClosekHandler}/>
                    ) : (
                        null
                    )}
                </div>
            </>
        )
    }
}