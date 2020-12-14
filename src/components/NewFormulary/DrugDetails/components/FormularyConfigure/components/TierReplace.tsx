import React from "react";
import { connect } from 'react-redux'
import { Grid } from "@material-ui/core";
import "./Tier.scss";

import DropDown from "../../../../../shared/Frx-components/dropdown/DropDown";
import Button from "../../../../../shared/Frx-components/button/Button";
import Box from "@material-ui/core/Box";
import FrxDrugGridContainer from "../../../../../shared/FrxGrid/FrxDrugGridContainer";
import { tierColumns } from "../../../../../../utils/grid/columns";
import { TierMockData } from "../../../../../../mocks/TierMock";
import AdvancedSearch from './search/AdvancedSearch';
import { postTierApplyInfo, getTier } from "../../../../../../redux/slices/formulary/tier/tierActionCreation";
import * as tierConstants from "../../../../../../api/http-tier";
import pageTypes from "../../../../../../constants/PageTypes";

interface tabsState {
  tierGridContainer: boolean;
  isSearchOpen: boolean;
  fileTypes: any[];
  tierValues: any[];
  selectedTier: any;
  selectedFileKey: any;
  selectedFileType: any;
  drugData: any[];
  drugGridData: any[];
  selectedDrugs: any[];
}

const mapStateToProps = (state) => {
  return {
    configureSwitch: state.switchReducer.configureSwitch,
    applyData: state.tierSliceReducer.applyData,
    formulary_id: state?.application?.formulary_id,
    formulary: state?.application?.formulary,
    formulary_lob_id: state?.application?.formulary_lob_id,
    formulary_type_id: state?.application?.formulary_type_id,
    tierAdvancedSearchBody: state?.advancedSearch?.tierAdvancedSearchBody
  }
}

function mapDispatchToProps(dispatch) {
  return {
    postTierApplyInfo: (a) => dispatch(postTierApplyInfo(a)),
    getTier: (a) => dispatch(getTier(a))
  };
}

class TierReplace extends React.Component<any, tabsState> {
  state = {
    tierGridContainer: false,
    isSearchOpen: false,
    tierValues: Array(),
    fileValues: Array(),
    drugData: Array(),
    drugGridData: Array(),
    selectedDrugs: Array(),
    selectedTier: -1,
    selectedFileKey: null,
    selectedFileType: 'Full Formulary',
    fileTypes: [
      { 'type': 'FRF', 'key': 'FRF' },
      { 'type': 'ORF/ERF', 'key': 'OTC' },
      { 'type': 'Non FRF Products', 'key': 'NONFRF' },
      { 'type': 'FRF Change Report', 'key': 'FRFCR' },
      { 'type': 'Full Formulary', 'key': 'MCR' }
    ]
  };

  constructor(props) {
    super(props);

    var tierOptions = Array();
    if (this.props.tierOptions) {
      this.props.tierOptions.map(tier => {
        tierOptions.push(tier.tier_value);
      });
    }
    let fileTypesModified: any[] = [];

    this.state.fileTypes.map(fileType => {
      if (fileType.type === 'Full Formulary') {
        fileType.key = this.props.lobCode;
      }
      fileTypesModified.push(fileType);
    });
    this.state.fileTypes = fileTypesModified;
    this.state.tierValues = tierOptions;
    this.state.selectedFileKey = this.props.lobCode;
  }

  populateGridData = () => {
    let apiDetails = {};
    apiDetails['apiPart'] = this.state.selectedFileKey === this.props.lobCode ? tierConstants.FORMULARY_DRUGS_TIER : tierConstants.DRUGS_TIER;
    apiDetails['pathParams'] = this.props?.formulary_id + "/" + this.state.selectedFileKey + "/" + tierConstants.TYPE_REPLACE;
    apiDetails['keyVals'] = [{ key: tierConstants.KEY_ENTITY_ID, value: this.props?.formulary_id }, { key: tierConstants.KEY_INDEX, value: 0 }, { key: tierConstants.KEY_LIMIT, value: 10 }];

    const drugGridDate = this.props.postTierApplyInfo(apiDetails).then((json => {
      //debugger;
      let tmpData = json.payload.result;
      var data: any[] = [];
      let count = 1;
      var gridData = tmpData.map(function (el) {
        var element = Object.assign({}, el);
        data.push(element)
        let gridItem = {};
        gridItem['id'] = count;
        gridItem['key'] = count;
        gridItem['tier'] = element.tier_value ? "" + element.tier_value : "";
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

  handleSave = () => {
    if (this.state.selectedDrugs && this.state.selectedDrugs.length > 0 && this.state.selectedTier !== -1) {
      let apiDetails = {};
      apiDetails['apiPart'] = tierConstants.APPLY_TIER;
      apiDetails['pathParams'] = this.props?.formulary_id + "/" + this.state.selectedFileKey + "/" + tierConstants.TYPE_REPLACE;
      apiDetails['keyVals'] = [];
      apiDetails['messageBody'] = {};
      apiDetails['messageBody']['selected_drug_ids'] = this.state.selectedDrugs;
      apiDetails['messageBody']['id_tier'] = this.state.selectedTier;

      const saveData = this.props.postTierApplyInfo(apiDetails).then((json => {
        console.log("Save response is:" + JSON.stringify(json));
        if (json.payload && json.payload.code === '200') {
          this.state.drugData = [];
          this.state.drugGridData = [];
          this.populateGridData();
          apiDetails = {};
          apiDetails['apiPart'] = tierConstants.FORMULARY_TIERS;
          apiDetails['pathParams'] = this.props?.formulary_id;
          apiDetails['keyVals'] = [{ key: tierConstants.KEY_ENTITY_ID, value: this.props?.formulary_id }];

          const TierDefinationData = this.props.getTier(apiDetails).then((json => {
            this.setState({ tierGridContainer: true });
          }))
        }
      }))
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('TIER REPLACE: componentWillReceiveProps', nextProps);
  }

  onSelectedTableRowChanged = (selectedRowKeys) => {
    this.state.selectedDrugs = [];
    if (selectedRowKeys && selectedRowKeys.length > 0) {
      this.state.selectedDrugs = selectedRowKeys.map(tierId => {
        let item = {};
        if (this.state.drugData[tierId - 1]['formulary_drug_id'] && this.state.drugData[tierId - 1]['drug_id']) {
          item = { formulary_drug_id: this.state.drugData[tierId - 1]['formulary_drug_id'] , drug_id: this.state.drugData[tierId - 1]['drug_id'] }
        } else if(this.state.drugData[tierId - 1]['formulary_drug_id']){
          item = { formulary_drug_id: this.state.drugData[tierId - 1]['formulary_drug_id'] }
        }
        return item;
      });
    }
  }

  tierDropDownSelectHandler = (value, event) => {
    let tierIndex = event.key;
    let tierValue = event.value;

    this.state.fileValues = [];
    this.state.selectedFileKey = this.props.lobCode;
    if (this.props.tierOptions && tierIndex < this.props.tierOptions.length) {
      let tierObject = this.props.tierOptions[tierIndex]
      if (tierObject.tier_label && tierObject.tier_label === 'OTC') {
        this.state.fileValues.push('ORF/ERF');
        this.state.fileValues.push('Full Formulary');
      } else {
        this.state.fileTypes.map(fileType => {
          this.state.fileValues.push(fileType.type);
        });
      }
    }
    this.setState({ selectedTier: tierValue });
  }

  fileTypeDropDownSelectHandler = (value, event) => {
    let fileType = event.value.toString().trim();
    let fileKey = this.props.lobCode;

    if (fileType) {
      let filtered = this.state.fileTypes.filter(fileObject => fileObject.type.toString().trim() === fileType);
      if (filtered && filtered.length > 0) {
        fileKey = filtered[0].key;
      }
    }
    console.log("Selected file key is:" + fileKey);
    this.setState({ selectedFileKey: fileKey });

    this.populateGridData();
  }

  openTierGridContainer = () => {
    this.state.drugData = [];
    this.state.drugGridData = [];
    this.setState({ tierGridContainer: true });
    this.populateGridData();
  };
  advanceSearchClickHandler = (event) => {
    event.stopPropagation();
    this.setState({ isSearchOpen: !this.state.isSearchOpen })
  }
  advanceSearchClosekHandler = () => {
    this.setState({ isSearchOpen: !this.state.isSearchOpen })
  }
  render() {
    const searchProps = {
      lobCode: this.props.lobCode,
      pageType: pageTypes.TYPE_TIER
    };
    return (
      <>
        <div className="group tier-dropdown white-bg">
          <Grid container>
            <Grid item xs={4}>
              <label>
                TIER <span className="astrict">*</span>
              </label>
              <DropDown options={this.state.tierValues} disabled={this.props.configureSwitch} onSelect={this.tierDropDownSelectHandler} />
            </Grid>
            <Grid item xs={1}>
              <Box display="flex" justifyContent="flex-end">
                <Button label="Apply" onClick={this.openTierGridContainer} disabled={this.props.configureSwitch} />
              </Box>
            </Grid>
          </Grid>
        </div>
        {this.state.tierGridContainer && (
          <div className="select-drug-from-table">
            <div className="bordered white-bg">
              <div className="header space-between pr-10">
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ marginRight: 10 }}>Select Drugs From</span>
                  <DropDown options={this.state.fileValues} disabled={this.props.configureSwitch} onSelect={this.fileTypeDropDownSelectHandler} defaultValue={this.state.selectedFileType} />
                </div>
                <div className="button-wrapper">
                  <Button className="Button normal" label="Advance Search" onClick={this.advanceSearchClickHandler} />
                  <Button label="Save" onClick={this.handleSave} />
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
                  columns={tierColumns()}
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
      </>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TierReplace);
