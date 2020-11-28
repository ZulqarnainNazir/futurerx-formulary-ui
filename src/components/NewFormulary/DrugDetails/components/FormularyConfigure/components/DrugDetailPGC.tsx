import React from 'react';
import Grid from "@material-ui/core/Grid";
import PanelHeader from './PanelHeader';
import PanelGrid from './panelGrid';
import CustomizedSwitches from './CustomizedSwitches';
import { TabInfo } from "../../../../../../models/tab.model";
import FrxMiniTabs from "../../../../../shared/FrxMiniTabs/FrxMiniTabs";
import NotesPopup from "../../../../../member/MemberNotesPopup";
import Box from '@material-ui/core/Box';
import Button from '../../../../../shared/Frx-components/button/Button';
import RadioButton from '../../../../../shared/Frx-components/radio-button/RadioButton';
import { textFilters } from "../../../../../../utils/grid/filters";
import { getDrugDetailsColumn } from "../DrugGridColumn";
import { getDrugDetailData } from "../../../../../../mocks/DrugGridMock";
import FrxLoader from "../../../../../shared/FrxLoader/FrxLoader";
import DrugGrid from '../../DrugGrid';

export default class DrugDetailPGC extends React.Component<any, any>{
    state = {
        panelGridTitle1: ['PARTIAL GAP COVRAGE', 'NUMBER OF DRUGS', 'ADDED DRUGS', 'REMOVED DRUGS'],
        panelTitleAlignment1: ['center', 'center', 'center', 'center'],
        panelGridValue1: [
            ['Gap covrage', '0', '0', '0'],
            ['Partial Gap covrage', '0', '0', '0']
        ],
        isNotesOpen: false,
        activeTabIndex: 0,
        columns: null,
        data: null,
        tabs: [
            { id: 1, text: "Replace" },
            { id: 2, text: "Append" },
            { id: 3, text: "Remove" }
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
    handleNoteClick = (event: React.ChangeEvent<{}>) => {
        event.stopPropagation();
        this.setState({ isNotesOpen: !this.state.isNotesOpen });
    };
    handleCloseNote = () => {
        this.setState({ isNotesOpen: !this.state.isNotesOpen });
    };
    settingFormApplyHandler = () => {
        alert(1)
    }
    render() {
        let dataGrid = <FrxLoader />;
        if (this.state.data) {
            dataGrid = <DrugGrid columns={this.state.columns} data={this.state.data} />
        }
        return (
            <>
                <div className="bordered mb-10">
                    <PanelHeader
                        title="Partial Gap covrage"
                        tooltip="Partial Gap Coverage" />
                    <div className="inner-container bg-light-grey">
                        <div className="mb-10">
                            <PanelGrid
                                panelGridTitle={this.state.panelGridTitle1}
                                panelGridValue={this.state.panelGridValue1}
                                panelTitleAlignment={this.state.panelTitleAlignment1} />
                        </div>
                        <div className="modify-wrapper bordered white-bg">
                            <div className="header-with-notes">
                                <PanelHeader title="Partial Gap covrage Setting" />
                                <svg onClick={this.handleNoteClick} className="note-icon" width="10" height="12" viewBox="0 0 10 12" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M7 0L10 3H7V0ZM6 0H1C0.447715 0 0 0.447715 0 1V11C0 11.5523 0.447715 12 1 12H9C9.55229 12 10 11.5523 10 11V4H7H6V0Z" fill="#2055B5"></path></svg>
                                {this.state.isNotesOpen ? (
                                    <NotesPopup
                                        category="Grievances"
                                        openPopup={this.state.isNotesOpen}
                                        onClose={this.handleCloseNote}
                                    />) : (
                                        ""
                                    )}
                            </div>
                            <div className="modify-panel">
                                <div className="icon"><span>R</span></div>
                                <div className="switch-box">
                                    <CustomizedSwitches leftTitle="Modify" rightTitle="view all" />
                                </div>
                                <div className="mini-tabs">
                                    <FrxMiniTabs
                                        tabList={this.state.tabs}
                                        activeTabIndex={this.state.activeTabIndex}
                                        onClickTab={this.onClickTab}
                                        disabledIndex={1}
                                    />
                                </div>
                            </div>
                            <div className="settings-form">
                                <label>What File Type Is This Gap Coverage For?</label>
                                <div className="marketing-material radio-group">
                                    <RadioButton
                                        label="Formulary/OTC"
                                        name="marketing-material-radio"
                                        checked
                                    />
                                    <RadioButton
                                        label="Excluded"
                                        name="marketing-material-radio"
                                    />
                                </div>
                                <Box display="flex" justifyContent="flex-end">
                                    <Button label="Apply" disabled onClick={this.settingFormApplyHandler} />
                                </Box>
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
                    {/* <DrugGrid columns={this.state.columns} data={this.state.data}/> */}
                </div>
            </>
        )
    }
}