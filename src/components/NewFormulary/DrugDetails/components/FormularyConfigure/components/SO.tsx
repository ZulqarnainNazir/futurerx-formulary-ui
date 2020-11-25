import React from 'react';
import Grid from "@material-ui/core/Grid";
import PanelHeader from './PanelHeader';
import PanelGrid from './panelGrid';
import CustomizedSwitches from './tt';
import { TabInfo } from "../../../../../../models/tab.model";
import FrxMiniTabs from "../../../../../shared/FrxMiniTabs/FrxMiniTabs";
import NotesPopup from "../../../../../member/MemberNotesPopup";
import Box from '@material-ui/core/Box';
import Button from '../../../../../shared/Frx-components/button/Button';
import DropDown from '../../../../../shared/Frx-components/dropdown/DropDown';

export default class SO extends React.Component<any,any>{
    state={
        panelGridTitle1: ['Medicare User Defined Field','Number of Drugs','added drugs','removed drugs'],
        panelTitleAlignment1: ['left','center','center','center'],
        panelGridValue1: [
            ['Test1','0','0','0']
        ],
        isNotesOpen: false,
        activeTabIndex: 0,
        tabs: [
            {id: 1,text: "Replace"},
            {id: 2,text: "Append"},
            {id: 3,text: "Remove"}
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
        return (
            <div className="bordered">
                <PanelHeader 
                    title="User Defined Fields"
                    tooltip="User Defined Fields" />
                <div className="inner-container bg-light-grey">
                    <div className="mb-10">
                        <PanelGrid 
                            panelGridTitle={this.state.panelGridTitle1} 
                            panelGridValue={this.state.panelGridValue1}
                            panelTitleAlignment={this.state.panelTitleAlignment1} />
                    </div>
                    <div className="modify-wrapper bordered white-bg">
                        <div className="header-with-notes">
                            <PanelHeader title="USER DEFINED FIELD SETTINGS" />
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
                        <div className="settings-form">
                            <Grid container spacing={8}>
                                <Grid item xs={4}>
                                    <div className="group">
                                        <label>User Defined Field <span className="astrict">*</span></label>
                                        <DropDown options={[1,2,3]}/>
                                    </div>
                                </Grid>
                            </Grid>
                            <Box display="flex" justifyContent="flex-end">
                                <Button label="Apply" disabled onClick={this.settingFormApplyHandler}/>
                            </Box>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}