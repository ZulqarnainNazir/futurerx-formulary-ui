import React from "react";
import { connect } from "react-redux";

import { Table } from "antd";
import Grid from "@material-ui/core/Grid";
import FrxDrugGridContainer from "../../../../../../shared/FrxGrid/FrxDrugGridContainer";
import { PaRemoveColumns } from "../../../../../../../utils/grid/columns";
import { PAMock } from "../../../../../../../mocks/PAMock";
import Button from "../../../../../../shared/Frx-components/button/Button";
import { Row, Col } from "antd";
import PanelHeader from "../PanelHeader";
import { postCriteriaListPA,postApplyFormularyDrugPA,postFormularyDrugPA } from "../../../../../../../redux/slices/formulary/pa/paActionCreation";
import * as constants from "../../../../../../../api/http-tier";
import getLobCode from "../../../../../Utils/LobUtils";
import { tierColumns } from "../../../../../../../utils/grid/columns";
import AdvancedSearch from './../search/AdvancedSearch';
import showMessage from "../../../../../Utils/Toast";

function mapDispatchToProps(dispatch) {
  return {
    postCriteriaListPA:(a)=>dispatch(postCriteriaListPA(a)),
    postApplyFormularyDrugPA:(a)=>dispatch(postApplyFormularyDrugPA(a)),
    postFormularyDrugPA:(a)=>dispatch(postFormularyDrugPA(a)),

  };
}

const mapStateToProps = (state) => {
  return {
    configureSwitch: state.switchReducer.configureSwitch,
    formulary_id: state?.application?.formulary_id,
    formulary: state?.application?.formulary,
    formulary_lob_id: state?.application?.formulary_lob_id,
    formulary_type_id: state?.application?.formulary_type_id,
    advancedSearchBody: state?.advancedSearch?.advancedSearchBody,
    populateGrid: state?.advancedSearch?.populateGrid,
    closeDialog: state?.advancedSearch?.closeDialog,
  }
}
class PaRemove extends React.Component<any,any> {
  state={
    paGroupDescriptions:[],
    isSearchOpen: false,
    fileValues: Array(),
    drugData: Array(),
    drugGridData: Array(),
    selectedCriteria: Array(),
    selectedDrugs: Array(),
    tierGridContainer:false,
  }

  onSelectedRowKeysChange = (selectedRowKeys) => {
    
    this.state.selectedCriteria = [];
    if (selectedRowKeys && selectedRowKeys.length > 0) {
      this.state.selectedCriteria = selectedRowKeys.map(tierId => tierId);
    }
  }
  componentDidMount() {
    let apiDetails = {};
    
    
    apiDetails['pathParams'] = this.props?.formulary_id + "/" + getLobCode(this.props?.formulary_lob_id) + "/" ;
    apiDetails['keyVals'] = [{ key: constants.KEY_ENTITY_ID, value: this.props?.formulary_id }];
    apiDetails['messageBody'] = {};

   
    const drugGridDate = this.props.postCriteriaListPA(apiDetails).then((json) => {
      
     let data:any = [];
     json.payload.result.map(obj => {
        data.push({'key':obj.id_pa_group_description ,pa_group_description_name: obj.pa_group_description_name});
     });
      this.setState({
        paGroupDescriptions: data,
      });
    });
                   
    
  }

  openTierGridContainer = () => {
    this.state.drugData = [];
    this.state.drugGridData = [];
    this.setState({ tierGridContainer: true });
    this.populateGridData();
  };

  onSelectedTableRowChanged = (selectedRowKeys) => {
    this.state.selectedDrugs = [];
    if (selectedRowKeys && selectedRowKeys.length > 0) {
      this.state.selectedDrugs = selectedRowKeys.map(tierId => this.state.drugData[tierId - 1]['md5_id']);
    }
  }

  populateGridData = (searchBody = null) => {
    console.log('Populate grid data is called');
    let apiDetails = {};

    apiDetails['pathParams'] = this.props?.formulary_id + "/"  +getLobCode(this.props?.formulary_lob_id);
    apiDetails['keyVals'] = [{ key: constants.KEY_ENTITY_ID, value: this.props?.formulary_id }, { key: constants.KEY_INDEX, value: 0 }, { key: constants.KEY_LIMIT, value: 10 }];
    apiDetails['messageBody'] = {};

    apiDetails['messageBody']['selected_criteria_ids']=this.state.selectedCriteria;

    if (searchBody) {
      apiDetails['messageBody'] = Object.assign(apiDetails['messageBody'], searchBody);
    }
    const drugGridDate = this.props.postFormularyDrugPA(apiDetails).then((json => {
      
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
    if (this.state.selectedDrugs && this.state.selectedDrugs.length > 0) {
      let apiDetails = {};
      apiDetails['apiPart'] = constants.APPLY_TIER;
      apiDetails['pathParams'] = this.props?.formulary_id + "/" + getLobCode(this.props?.formulary_lob_id) + "/" + constants.TYPE_REMOVE;
      apiDetails['keyVals'] = [{ key: constants.KEY_ENTITY_ID, value: this.props?.formulary_id }];
      apiDetails['messageBody'] = {};
      if (this.state.selectedCriteria && this.state.selectedCriteria.length > 0) {
        apiDetails['messageBody']['selected_criteria_ids'] = this.state.selectedCriteria;
      }
      apiDetails['messageBody']['selected_drug_ids'] = this.state.selectedDrugs;

      const saveData = this.props.postApplyFormularyDrugPA(apiDetails).then((json => {
        console.log("Save response is:" + JSON.stringify(json));
        if (json.payload && json.payload.code && json.payload.code === '200') {
          showMessage('Success', 'success');
          this.state.drugData = [];
          this.state.drugGridData = [];
          this.populateGridData();
          apiDetails = {};
          apiDetails['apiPart'] =constants.FORMULARY_TIERS;
          apiDetails['pathParams'] = this.props?.formulary_id;
          apiDetails['keyVals'] = [{ key: constants.KEY_ENTITY_ID, value: this.props?.formulary_id }];

        }else{
          showMessage('Failure', 'error');
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
  render() {
    const columns = [
      {
        title: "PA Group Description",
        dataIndex: "pa_group_description_name",
        key: "pa_group_description_name",
      },
    ];
    return (
      <>
        <div className="pa-settings-grid-container white-bg">
          
          <Grid item xs={5}>
              <div className="tier-grid-remove-container">
                <Table
                  columns={columns}
                  dataSource={this.state.paGroupDescriptions}
                  pagination={false}
                  rowSelection={{
                    columnWidth: 20,
                    fixed: true,
                    type: "checkbox",
                    onChange: this.onSelectedRowKeysChange,
                  }}
                />
              </div>
            </Grid>
        </div>
        <div className="white-bg">
          <Row justify="end">
            <Col>
              <Button label="Apply" onClick={this.openTierGridContainer}  />
            </Col>
          </Row>
        </div>
        {this.state.tierGridContainer  && (
          <div className="select-drug-from-table">
            <div className="bordered white-bg">
              <div className="header space-between pr-10">
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
)(PaRemove);

