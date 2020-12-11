import React from 'react';
import { connect } from "react-redux";

import PanelHeader from './PanelHeader';
import PanelGrid from './panelGrid';
import CustomizedSwitches from './CustomizedSwitches';
import { TabInfo } from "../../../../../../models/tab.model";
import FrxMiniTabs from "../../../../../shared/FrxMiniTabs/FrxMiniTabs";
import Button from '../../../../../shared/Frx-components/button/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { textFilters } from "../../../../../../utils/grid/filters";
import { getDrugDetailsColumn } from "../DrugGridColumn";
import { getDrugDetailData } from "../../../../../../mocks/DrugGridMock";
import FrxLoader from "../../../../../shared/FrxLoader/FrxLoader";
import DrugGrid from '../../DrugGrid';
import Tooltip from '@material-ui/core/Tooltip';
import { Box, Grid, Input } from '@material-ui/core';
import RadioButton from '../../../../../shared/Frx-components/radio-button/RadioButton';
import Groups from './Groups'
import NewGroup from './NewGroup'

import { getStSummary, getStGrouptDescriptions, getStTypes, getStGrouptDescriptionVersions, getStGrouptDescription } from "../../../../../../redux/slices/formulary/stepTherapy/stepTherapyActionCreation";

function mapStateToProps(state) {
    return {
        formulary_id: state.application.formulary_id
    }
}


function mapDispatchToProps(dispatch) {
    return {
        getStSummary: (a) => dispatch(getStSummary(a)),
        getStGrouptDescriptions: (a) => dispatch(getStGrouptDescriptions(a)),
        getStTypes: (a) => dispatch(getStTypes(a)),
        getStGrouptDescriptionVersions: (a) => dispatch(getStGrouptDescriptionVersions(a)),
        getStGrouptDescription: (a) => dispatch(getStGrouptDescription(a)),
    };
}

class GPM extends React.Component<any, any>{
    state = {
        activeTabIndex: 0,
        tooltip: "ST CRITERIA",
        newGroup: false,
        stGroupDescriptions: [],
        stTypes: [],
        stGroupDescriptionVersion: null,
        selectedGrp:'',
        versionList:[{value:'Version 1'}],
        versionTitle:"Group Description Version 1",
        latestVerion:0,
        tabs: [
            {
                id: 1,
                text: "Active"
            },
            {
                id: 2,
                text: "Archived"
            }
        ],
        groupsData: [
            {
                id: 1,
                label: 'Group 1',
                status: 'warning',
                is_archived: false,
            }
        ],
        searchInput: "",

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

    selectGroup = (param: any,groupType:string) => {
        this.props.getStGrouptDescriptionVersions(param).then((json) => {
            let tmpData = json.payload.data;
            let dataLength = tmpData.length
            var result = tmpData.map(function (el) {
                var element = {};
                element["value"] = el.value;
                return element;
            })
            let latestVerion = tmpData[dataLength-1].id_st_group_description
            this.setState({
                versionList:result,
                versionTitle:`Group Description ${tmpData[dataLength-1].value}`,
                latestVerion:latestVerion
            })
            this.props.getStGrouptDescription(latestVerion)
        });
        this.setState({
            newGroup: true,
            selectedGrp:groupType==='warning'?false:true
        })
    }
    addNewGroup = () => {
        this.setState({
            newGroup: false
        })
    }

    componentDidMount() {
        this.props.getStGrouptDescriptions(this.props.formulary_id).then((json) => {
            let tmpData = json.payload.data;
            var result = tmpData.map(function (el) {
                var element = {};
                element["id"] = el.id_st_group_description;
                element["label"] = el.st_group_description_name;
                element["status"] = el.is_setup_complete?"completed":"warning";
                element["is_archived"] = el.is_archived;
                return element;
            })

            this.setState({
                groupsData: result,
            });

        });

        this.props.getStTypes(this.props.formulary_id).then((json) => {
            this.setState({
                stTypes: json.payload.data,
            });

        });
    }

    handleInputChange = (event) => {
        this.setState({
            searchInput: event.currentTarget.value,
        });
    };
    render() {
        return (
            <>
                <div className="bordered">

                    <PanelHeader
                        title="STEP THERAPY - Group Description Management" />
                    <div className="inner-container bg-light-grey display-flex">
                        <div className="group-des">
                            <div className="panel header">
                                <span>GROUP DESCRIPTION</span>
                                <Box display="flex" justifyContent="flex-end">
                                    <Button label="+ Add New" className="Button" onClick={this.addNewGroup} />
                                </Box>
                            </div>
                            <div className="inner-container">
                                <div className="search-input">
                                    <Input disableUnderline placeholder="Search..." inputProps={{
                                        startAdornment: <span>{
                                            <svg
                                                className="test-claim-search__icon"
                                                width="11"
                                                height="11"
                                                viewBox="0 0 11 11"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M10.8504 9.5102L8.70825 7.36842C8.61157 7.27175 8.4805 7.21805 8.34299 7.21805H7.99277C8.58578 6.45972 8.93815 5.50591 8.93815 4.46831C8.93815 2 6.93781 0 4.46908 0C2.00034 0 0 2 0 4.46831C0 6.93663 2.00034 8.93663 4.46908 8.93663C5.50685 8.93663 6.46082 8.58432 7.21928 7.99141V8.34157C7.21928 8.47905 7.27299 8.6101 7.36968 8.70677L9.51183 10.8485C9.7138 11.0505 10.0404 11.0505 10.2402 10.8485L10.8483 10.2406C11.0502 10.0387 11.0502 9.71214 10.8504 9.5102ZM4.46908 7.21805C2.95002 7.21805 1.71888 5.98926 1.71888 4.46831C1.71888 2.94952 2.94787 1.71858 4.46908 1.71858C5.98813 1.71858 7.21928 2.94737 7.21928 4.46831C7.21928 5.98711 5.99028 7.21805 4.46908 7.21805Z"
                                                    fill="#999999"
                                                />
                                            </svg>
                                        }</span>
                                    }} onChange={this.handleInputChange} />
                                </div>
                                <div className="mini-tabs">
                                    <FrxMiniTabs
                                        tabList={this.state.tabs}
                                        activeTabIndex={this.state.activeTabIndex}
                                        onClickTab={this.onClickTab}
                                    />
                                </div>
                                <div className="group-wrapper scrollbar scrollbar-primary  mt-5 mx-auto view-com-sec">
                                    {
                                        // this.state.groupsData.map((group,key) => (
                                        // <Groups key={key} id={group.id} title={group.label} statusType={group.status} selectGroup={this.selectGroup}/>        
                                        // ))    

                                        this.state.groupsData.map((group, key) => (
                                            (this.state.searchInput == "" || (this.state.searchInput != "" && group.label.indexOf(this.state.searchInput) > -1)) ? (
                                                (this.state.activeTabIndex == 0 && group.is_archived == false) ?
                                                    <Groups key={key} id={group.id} title={group.label} statusType={group.status} selectGroup={this.selectGroup} />
                                                    : (this.state.activeTabIndex == 1 && group.is_archived == true) ?
                                                        <Groups key={key} id={group.id} title={group.label} statusType={group.status} selectGroup={this.selectGroup} />
                                                        : ""
                                            ) : ""
                                        ))
                                    }
                                    {/* <Groups title={'Group1'} statusType={1} selectGroup={this.selectGroup}/>
                                        <Groups title={'Group2'} statusType={2} selectGroup={this.selectGroup}/>
                                        <Groups title={'Group3'} statusType={1} selectGroup={this.selectGroup}/>
                                        <Groups title={'Group4'} statusType={1} selectGroup={this.selectGroup}/>
                                        <Groups title={'Group5'} statusType={1} selectGroup={this.selectGroup}/>
                                        <Groups title={'Group6'} statusType={1} selectGroup={this.selectGroup}/> */}
                                </div>
                            </div>
                        </div>
                        {this.state.newGroup ? <NewGroup tooltip={this.state.tooltip} formType={1} editable={this.state.selectedGrp} versionList={this.state.versionList} versionTitle={this.state.versionTitle} activeTabIndex={this.state.activeTabIndex} latestVerion={this.state.latestVerion}/> : (
                            <NewGroup tooltip={this.state.tooltip} formType={0} editable={this.state.selectedGrp} versionList={this.state.versionList} title={'NEW GROUP DESCRIPTION'} versionTitle={this.state.versionTitle} activeTabIndex={this.state.activeTabIndex} latestVerion={this.state.latestVerion}/>
                        )}
                    </div>

                </div>
            </>
        )
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GPM);