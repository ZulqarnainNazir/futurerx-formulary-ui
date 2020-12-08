import React from 'react';
import { connect } from "react-redux";

import Grid from "@material-ui/core/Grid";
import { TabInfo } from "../../../../../../models/tab.model";
import Box from '@material-ui/core/Box';
import Button from '../../../../../shared/Frx-components/button/Button';
import DropDown from '../../../../../shared/Frx-components/dropdown/DropDown';
import RadioButton from '../../../../../shared/Frx-components/radio-button/RadioButton';
import { getStSummary,getStGrouptDescriptions, getStTypes, getDrugLists } from "../../../../../../redux/slices/formulary/stepTherapy/stepTherapyActionCreation";
import "./STF.scss";

function mapDispatchToProps(dispatch) {
    return {
      getStSummary:(a)=>dispatch(getStSummary(a)),
      getStGrouptDescriptions:(a)=>dispatch(getStGrouptDescriptions(a)),
      getStTypes:(a)=>dispatch(getStTypes(a)),
      getDrugLists:(a)=>dispatch(getDrugLists(a)),
    };
  }

 class STF extends React.Component<any,any>{
    state={
        panelGridTitle1: ['Value Based Insurance','Number of Drugs','added drugs','removed drugs'],
        panelTitleAlignment1: ['left','left','left','left'],
        panelGridValue1: [],
        isNotesOpen: false,
        stGroupDescription: [],
        stTypes:[],
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
    componentDidMount() {
                   
        this.props.getStGrouptDescriptions("3132").then((json) =>{
            debugger;
            this.setState({
                stGroupDescription: json.payload.data,
              });
            
        });

        this.props.getStTypes("3132").then((json) =>{
            debugger;
            this.setState({
                stTypes: json.payload.data,
              });
            
        });
    }
    render(){
        return (
            <div className="bordered stf-root">
                    <div className="modify-wrapper bordered white-bg">
                        <div className="settings-form">
                            <Grid container>
                                <Grid item xs={4}>
                                    <div className="group">
                                        <label>ST GROUP DESCRIPTION<span className="astrict">*</span></label>
                                        <DropDown options={this.state.stGroupDescription} valueProp="text" />
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
                                        <label>ST Type <span className="astrict">*</span></label>
                                        <DropDown options={this.state.stTypes} valueProp="st_type_name"/>
                                    </div>

                                    <div className="group">
                                        <label>ST Value <span className="astrict">*</span></label>
                                        <input type="text" />
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

export default connect(
    null,
    mapDispatchToProps
  )(STF);