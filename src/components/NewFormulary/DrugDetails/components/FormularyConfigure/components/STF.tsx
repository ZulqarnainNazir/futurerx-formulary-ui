import React from 'react';
import { connect } from "react-redux";

import Grid from "@material-ui/core/Grid";
import { TabInfo } from "../../../../../../models/tab.model";
import Box from '@material-ui/core/Box';
import Button from '../../../../../shared/Frx-components/button/Button';
import DropDown from '../../../../../shared/Frx-components/dropdown/DropDownMap';
import RadioButton from '../../../../../shared/Frx-components/radio-button/RadioButton';
import { getStSummary,getStGrouptDescriptions, getStTypes, getDrugLists,postFormularyDrugST,getStGrouptDescriptionVersions,postApplyFormularyDrugST } from "../../../../../../redux/slices/formulary/stepTherapy/stepTherapyActionCreation";
import "./STF.scss";
import * as constants from "../../../../../../api/http-commons";
import FrxDrugGridContainer from "../../../../../shared/FrxGrid/FrxDrugGridContainer";
import { stColumns } from "../../../../../../utils/grid/columns";
import AdvancedSearch from './search/AdvancedSearch';

function mapDispatchToProps(dispatch) {
    return {
      getStSummary:(a)=>dispatch(getStSummary(a)),
      getStGrouptDescriptions:(a)=>dispatch(getStGrouptDescriptions(a)),
      getStTypes:(a)=>dispatch(getStTypes(a)),
      getDrugLists:(a)=>dispatch(getDrugLists(a)),
      postFormularyDrugST:(a) => dispatch(postFormularyDrugST(a)),
      getStGrouptDescriptionVersions:(a) => dispatch(getStGrouptDescriptionVersions(a)),
      postApplyFormularyDrugST:(a) => dispatch(postApplyFormularyDrugST(a)),
    };
  }

   
  const mapStateToProps = (state) => {
    return {
      configureSwitch: state.switchReducer.configureSwitch,
      applyData: state.tierSliceReducer.applyData,
      formulary_id: state?.application?.formulary_id,
      formulary: state?.application?.formulary,
      formulary_lob_id: state?.application?.formulary_lob_id,
      formulary_type_id: state?.application?.formulary_type_id,
      advancedSearchBody: state?.advancedSearch?.advancedSearchBody,
      populateGrid: state?.advancedSearch?.populateGrid,
      closeDialog: state?.advancedSearch?.closeDialog,
    }
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
        ],
        tierGridContainer: false,
        isSearchOpen:false,
        drugData: Array(),
        drugGridData: Array(),
        selectedDrugs: Array(),
        selectedGroupDescription:null,
        selectedStType:null,
        showPaConfiguration:false,
        selectedLastestedVersion:null,
        fileType:null,
        stValue:null,
    }

    onSelectedTableRowChanged = (selectedRowKeys) => {
        this.state.selectedDrugs = [];
        if (selectedRowKeys && selectedRowKeys.length > 0) {
          this.state.selectedDrugs = selectedRowKeys.map(tierId => this.state.drugData[tierId - 1]['md5_id']);
        }
      }
    
      openTierGridContainer = () => {
        this.state.drugData = [];
        this.state.drugGridData = [];
        this.setState({ tierGridContainer: true });
        this.populateGridData();
      };
    
      handleSave = () => {
        if (this.state.selectedDrugs && this.state.selectedDrugs.length > 0) {
          let apiDetails = {};
         // apiDetails['apiPart'] = constants.APPLY_TIER;
    
          apiDetails['pathParams'] = this.props?.formulary_id + "/" + this.state.fileType + "/" + constants.TYPE_REPLACE;
          apiDetails['keyVals'] = [{ key: constants.KEY_ENTITY_ID, value: this.props?.formulary_id }];
          apiDetails['messageBody'] = {};
          apiDetails['messageBody']['selected_drug_ids'] = this.state.selectedDrugs;
          apiDetails['messageBody']['base_st_group_description_id'] = this.state.selectedGroupDescription;
          apiDetails['messageBody']['id_st_group_description'] = this.state.selectedLastestedVersion;
          apiDetails['messageBody']['id_st_type'] = Number(this.state.selectedStType);
          apiDetails['messageBody']['search_key'] = "";
          apiDetails['messageBody']['st_value'] = Number(this.state.stValue);
          
          const saveData = this.props.postApplyFormularyDrugST(apiDetails).then((json => {
            console.log("Save response is:" + JSON.stringify(json));
            if (json.payload && json.payload.code === '200') {
              this.state.drugData = [];
              this.state.drugGridData = [];
              this.populateGridData();
              apiDetails = {};
              apiDetails['pathParams'] = this.props?.formulary_id;
              apiDetails['keyVals'] = [{ key: constants.KEY_ENTITY_ID, value: this.props?.formulary_id }];
    
            }
          }))
        }
      }
      
      advanceSearchClickHandler = (event) => {
        event.stopPropagation();
        this.setState({ isSearchOpen: !this.state.isSearchOpen })
      }
      advanceSearchClosekHandler = () => {
        this.setState({ isSearchOpen: !this.state.isSearchOpen })
      }
      dropDownSelectHandlerGroupDescription = (value, event) => {
        let tmp_index = event.key;
        let tmp_value = event.value;
    
       this.setState({ selectedGroupDescription: tmp_value });
       this.props.getStGrouptDescriptionVersions(tmp_value).then((json)=>{
         let data = json.payload.data;
         
         this.setState({
           selectedLastestedVersion: data[0].id_st_group_description,
           fileType: data[0].file_type,
         });
       });
      }
    
      dropDownSelectHandlerStType = (value, event) => {
        let tmp_index = event.key;
        let tmp_value = event.value;
        this.setState({ selectedStType: tmp_value });
      }
    
      pa_configurationChange = (event, value) => {
        let tmp_index = event.target.key;
        let tmp_value = event.target.value;
    
        if (tmp_value=="true"){
            this.setState({showPaConfiguration: true});
        }else{
          this.setState({showPaConfiguration: false});
        }
      }
    
      handleChange = (e:any) => {
          
        let tmp_value = e.target.value;
        let tmp_key = e.target.name;
        if (e.target.value=='true'){
          tmp_value= true;
        }else if (e.target.value=='false'){
          tmp_value=false;
        }
        this.setState(
         { [tmp_key]:e.target.value.trim()}
        );
        
      };
    
      populateGridData = (searchBody = null) => {
        console.log('Populate grid data is called');
        let apiDetails = {};
        
       // let tmpGroup :any = this.state.paGroupDescriptions.filter(obj  => obj.id_mcr_base_pa_group_description === this.state.selectedGroupDescription);
        apiDetails['pathParams'] = this.props?.formulary_id + "/" + this.state.fileType + "/" ;
        apiDetails['keyVals'] = [{ key: constants.KEY_ENTITY_ID, value: this.props?.formulary_id }, { key: constants.KEY_INDEX, value: 0 }, { key: constants.KEY_LIMIT, value: 10 }];
        apiDetails['messageBody'] = {};
    
        apiDetails['messageBody']['base_st_group_description_id'] = this.state.selectedGroupDescription;
        apiDetails['messageBody']['id_st_type'] = this.state.selectedStType;
    
        if(searchBody){
          apiDetails['messageBody'] = Object.assign(apiDetails['messageBody'],searchBody);
        }
        const drugGridDate = this.props.postFormularyDrugST(apiDetails).then((json => {
    
          let tmpData = json.payload.result;
          var data: any[] = [];
          let count = 1;
          var gridData = tmpData.map(function (el) {
            var element = Object.assign({}, el);
            data.push(element)
            let gridItem = {};
            gridItem['id'] = count;
            gridItem['key'] = count;
            gridItem['tier'] = element.tier_value;
            gridItem['stGroupDescription'] = element.st_group_description;
            gridItem['stType'] = element.st_type;
            gridItem['stValue'] = element.st_value;
            gridItem['fileType'] = element.file_type ? "" + element.file_type : "";
            gridItem['dataSource'] = element.data_source ? "" + element.data_source : "";
            gridItem['labelName'] = element.drug_label_name ? "" + element.drug_label_name : "";
            gridItem['ndc'] = "";
            gridItem['rxcui'] = element.rxcui ? "" + element.rxcui : "";
            gridItem['gpi'] = element.generic_product_identifier ? "" + element.generic_product_identifier : "";
            gridItem['trademark'] = element.trademark_code ? "" + element.trademark_code : "";
            gridItem['databaseCategory'] = element.database_category ? "" + element.database_category : "";
            count++;
            return gridItem;
          })
          this.setState({
            drugData: data,
            drugGridData: gridData
          })
        }))
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
        this.state.drugData = [];
        this.state.drugGridData = [];
        this.setState({ tierGridContainer: true });
        this.populateGridData();
    }
    componentDidMount() {
                   
        this.props.getStGrouptDescriptions(this.props.formulary_id).then((json) =>{
            let result = json.payload.data.filter(obj  => !obj.is_archived &&  obj.is_setup_complete);
              this.setState({
                stGroupDescription: result,
              });
            
        });

        this.props.getStTypes(this.props.formulary_id).then((json) =>{
            this.setState({
                stTypes: json.payload.data,
              });
            
        });
    }
    render(){
        const searchProps = {
            lobCode: this.props.lobCode,
           // pageType: pageTypes.TYPE_TIER
          };
        return (
            <div className="bordered stf-root">
                    <div className="modify-wrapper bordered white-bg">
                        <div className="settings-form">
                            <Grid container>
                                <Grid item xs={4}>
                                    <div className="group">
                                        <label>ST GROUP DESCRIPTION<span className="astrict">*</span></label>
                                        <DropDown options={this.state.stGroupDescription} valueProp="id_st_group_description" dispProp="text" onSelect={this.dropDownSelectHandlerGroupDescription} disabled={this.props.configureSwitch}/>
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
                                        <DropDown options={this.state.stTypes} valueProp="st_type_value" dispProp="st_type_name" onSelect={this.dropDownSelectHandlerStType} disabled={this.props.configureSwitch}/>
                                    </div>

                                    <div className="group">
                                        <label>ST Value <span className="astrict">*</span></label>
                                        <input type="text" name="stValue" onChange={this.handleChange} disabled={this.props.configureSwitch} />
                                    </div>
                                </Grid>

                                <Grid item xs={4}>
                                <div className="group">
                                        <label>package <span className="astrict">*</span></label>
                                        <input type="text" disabled={this.props.configureSwitch} />
                                    </div>
                                </Grid>
                            </Grid>
                            <Box display="flex" justifyContent="flex-end">
                                <Button label="Apply" onClick={this.settingFormApplyHandler} disabled={this.props.configureSwitch}/>
                            </Box>
                        </div>

                        {this.state.tierGridContainer  && (
          <div className="select-drug-from-table">
            <div className="bordered white-bg">
              <div className="header space-between pr-10">
                
                <div className="button-wrapper">
                  <Button className="Button normal" label="Advance Search" onClick={this.advanceSearchClickHandler}  />
                  <Button label="Save" onClick={this.handleSave}  />
                </div>
              </div>

              <div className="tier-grid-container">
                <FrxDrugGridContainer
                  isPinningEnabled={false}
                  enableSearch={false}
                  enableColumnDrag
                  onSearch={() => { }}
                  fixedColumnKeys={[]}
                  pagintionPosition="topRight"
                  gridName="TIER"
                  enableSettings={false}
                  columns={stColumns()}
                  scroll={{ x: 2000, y: 377 }}
                  isFetchingData={false}
                  enableResizingOfColumns
                  data={this.state.drugGridData}
                  rowSelection={{
                    columnWidth: 50,
                    fixed: true,
                    type: "checkbox",
                  onChange: this.onSelectedTableRowChanged,
                  }}
                />
              </div>
            </div>
            {this.state.isSearchOpen ? (
              <AdvancedSearch
                {...searchProps}
                category="Grievances"
                openPopup={this.state.isSearchOpen}
                onClose={this.advanceSearchClosekHandler} />
            ) : (
                null
              )}
          </div>
        )}
                    </div>
                
            </div>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(STF);