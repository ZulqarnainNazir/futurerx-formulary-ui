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
import RadioButton from '../../../../../shared/Frx-components/radio-button/RadioButton';
export default class STF extends React.Component<any,any>{
    state={
        panelGridTitle1: ['Value Based Insurance','Number of Drugs','added drugs','removed drugs'],
        panelTitleAlignment1: ['left','left','left','left'],
        panelGridValue1: [],
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
             
                    <div className="modify-wrapper bordered white-bg">
                        <div className="settings-form">
                            <Grid container>
                                <Grid item xs={4}>
                                    <div className="group">
                                        <label>ST GROUP DESCRIPTION<span className="astrict">*</span></label>
                                        <DropDown options={[1,2,3]}/>
                                    </div>

                                    <div className="group mt-10">
                                    <label>What indicator will be configured for Marketing Material?</label>
                                    <div className="marketing-material radio-group">
                                        <RadioButton 
                                            label="ADD File"
                                            name="marketing-material-radio"
                                        />
                                        <RadioButton 
                                            label="Excluded"
                                            name="marketing-material-radio"
                                            checked
                                        />
                                    </div>
                                    </div>

                                    <div className="group mt-10">
                                    <label>What indicator will be configured for Marketing Material?</label>
                                    <div className="marketing-material radio-group">
                                        <RadioButton 
                                            label="ADD File"
                                            name="marketing-material-radio"
                                        />
                                        <RadioButton 
                                            label="Excluded"
                                            name="marketing-material-radio"
                                            checked
                                        />
                                    </div>
                                    </div>
                                </Grid>
                                <Grid item xs={4}>
                                   
                                    <div className="group">
                                        <label>ST TYPE <span className="astrict">*</span></label>
                                        <DropDown options={[1,2,3]}/>
                                    </div>

                                    <div className="group">
                                        <label>ST TYPE <span className="astrict">*</span></label>
                                        <DropDown options={[1,2,3]}/>
                                    </div>
                                </Grid>

                                <Grid item xs={4}>
                                <div className="group">
                                        <label>package <span className="astrict">*</span></label>
                                        <input type="text" />
                                    </div>
                                </Grid>
                            </Grid>
                            <Box display="flex" justifyContent="flex-end">
                                <Button label="Apply" onClick={this.settingFormApplyHandler}/>
                            </Box>
                        </div>
                    </div>
                
            </div>
        )
    }
}