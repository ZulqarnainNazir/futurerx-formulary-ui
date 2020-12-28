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
import { getSTGroupDetails,cleanMessages } from "../../../../../../redux/slices/formulary/gdm/gdmSlice";
import { getStSummary, getStGrouptDescriptions, getStTypes, getStGrouptDescriptionVersions, getStGrouptDescription } from "../../../../../../redux/slices/formulary/stepTherapy/stepTherapyActionCreation";

function mapStateToProps(state) {
    return {
        formulary_id: state.application.formulary_id,
        client_id: state.application.clientId,
        current_formulary: state.application.formulary,
        formulary: state?.application?.formulary,
        formulary_lob_id: state?.application?.formulary_lob_id, //comme- 4, medicare-1 , medicate-2, exchnage -3 
        formulary_type_id: state?.application?.formulary_type_id,
        descriptions: state.stepTherapyReducer.descriptions,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getStSummary: (a) => dispatch(getStSummary(a)),
        getStGrouptDescriptions: (a) => dispatch(getStGrouptDescriptions(a)), // Group List
        getStTypes: (a) => dispatch(getStTypes(a)),  // File Type
        getStGrouptDescriptionVersions: (a) => dispatch(getStGrouptDescriptionVersions(a)), //Version
        getStGrouptDescription: (a) => dispatch(getStGrouptDescription(a)), // Group ID Detail
        getSTGroupDetails:(arg)=>dispatch(getSTGroupDetails(arg)),
        cleanMessages: (arg) => dispatch(cleanMessages(arg))
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
        selectedGroup:-1,

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

    selectGroup = (param: any, groupType: string) => {
        this.props.cleanMessages({error:'',success:''})
        let apiDetails= {};
        apiDetails["lob_type"] = this.props.formulary_lob_id;
        apiDetails['pathParams'] = param;

        this.props.getStGrouptDescriptionVersions(apiDetails).then((json) => {
            let tmpData = json.payload.data;
            let dataLength = tmpData.length
            let latestVerion = tmpData.length > 0 ? tmpData[dataLength - 1].id_st_group_description : 0
            
            let apiDetails= {};
            apiDetails["lob_type"] = this.props.formulary_lob_id;
            apiDetails['pathParams'] = latestVerion;

            this.props.getStGrouptDescription(apiDetails)
            this.props.getSTGroupDetails({
                formulary_id: this.props.formulary_id,
                current_group_id: param,
                current_group_des_id: latestVerion
            })
        });
        this.setState({
            newGroup: true,
            selectedGroup: param,
        })
    }
    addNewGroup = () => {
        this.setState({
            newGroup: false
        })
        this.props.getSTGroupDetails({
            formulary_id: this.props.formulary_id,
            current_group_id: 0,
            current_group_des_id: 0
        })

        let apiDetails= {};
        apiDetails["lob_type"] = this.props.formulary_lob_id;
        apiDetails['pathParams'] = 0;

        this.props.cleanMessages({error:'',success:''})
        this.props.getStGrouptDescriptions(apiDetails)
        this.props.getStGrouptDescriptionVersions(apiDetails)
        this.props.getStGrouptDescription(apiDetails)
        this.props.getStTypes(this.props.formulary_id)
    }

    componentDidMount() {
        let apiDetails= {};
        apiDetails["lob_type"] = this.props.formulary_lob_id;
        apiDetails['pathParams'] = this.props?.client_id + '?entity_id='+this.props?.formulary_id;

        this.props.getStGrouptDescriptions(apiDetails).then((json) => {
            let tmpData = json.payload.data;
            var result = tmpData.map(function (el) {
                var element = {};
                element["id"] = el.id_st_group_description;
                element["label"] = el.st_group_description_name;
                element["status"] = el.is_setup_complete ? "completed" : "warning";
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

    componentWillReceiveProps(nextProps) {
        debugger;
        console.log('TIER: componentWillReceiveProps', nextProps);
        
        let tmpData = nextProps.descriptions;
        if (tmpData && Array.isArray(tmpData) && tmpData.length > 0) {
            let groupProp = "";
            if (this.props.formulary_lob_id==1){
                groupProp= "id_mcr_base_st_group_description"
            }else if (this.props.formulary_lob_id==4){
                groupProp = "id_st_group_description"; 
            }
            var result = tmpData.map(function (el) {
                var element = {};
                element["id"] = el[groupProp]; 
                element["label"] = el.st_group_description_name;
                element["status"] = el.is_setup_complete ? "completed" : "warning";
                element["is_archived"] = el.is_archived;
                console.log(element);
                
                return element;
            })
            this.setState({
                groupsData: result,
            });
        }
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
                                        this.state.groupsData.map((group, key) => (
                                            (this.state.searchInput == "" || (this.state.searchInput != "" && group.label.indexOf(this.state.searchInput) > -1)) ? (
                                                (this.state.activeTabIndex == 0 && group.is_archived == false) ?
                                                    <Groups key={key} id={group.id} title={group.label} statusType={group.status} selectGroup={this.selectGroup} isSelected={this.state.selectedGroup==group.id}/>
                                                    : (this.state.activeTabIndex == 1 && group.is_archived == true) ?
                                                        <Groups key={key} id={group.id} title={group.label} statusType={group.status} selectGroup={this.selectGroup} isSelected={this.state.selectedGroup==group.id} />
                                                        : ""
                                            ) : ""
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                        {this.state.newGroup ? <NewGroup tooltip={this.state.tooltip} formType={1} editMode={true}/> : (
                            <NewGroup tooltip={this.state.tooltip} formType={0} title={'NEW GROUP DESCRIPTION'} editMode={false}/>
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