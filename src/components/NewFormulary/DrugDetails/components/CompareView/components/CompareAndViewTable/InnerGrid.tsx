import React, { useState, Component } from "react";
import DialogPopup from "../../../../../../shared/FrxDialogPopup/FrxDialogPopup";
import FrxGridContainer from "../../../../../../shared/FrxGrid/FrxDrugGridContainer";
import { getCompareFormularyDrugsListGridColumns } from "../../../../../../../mocks/formulary-grid/FormularyGridColumn";
import { getCompareFormularyDrugsListGridData } from "../../../../../../../mocks/formulary-grid/FormularyGridData";
import { getDrugs, getAttributeValues } from "../../../../../../../redux/slices/formulary/compareView/compareViewService";
import * as commonConstants from "../../../../../../../api/http-commons";
import * as compareConstants from "../../../../../../../api/http-compare-view";
import showMessage from "../../../../../Utils/Toast";

import "./CompareTable.scss";

interface InnerGridType {
  name: string;
  baseFormulary: number | null;
  referenceFormulary: number | null;
  baseOnly: number | null;
  referenceOnly: number | null;
  nonMatch: number | null;
}

interface InnerGridProps {
  tableType: "COMPARE" | "VIEW";
  dataArr: InnerGridType[];
  formularyType: string;
  baseformulary?: any;
  referenceformulary?: any;
  formularyLobId?: any;
}
class InnerGrid extends Component<InnerGridProps, any>{
  state = {
    openDrugsList: false,
    drugGridHeaderName: '',
    checkbox: false,
    actions: false,
    drugGridData: Array(),
    drugData: Array(),
    gridColumns: Array(),
    attribute_type: '',
    file_type: '',
    attribute_field_data_type: '',
    attribute_field_name: '',
    attribute_field_value: '',
    attribute_name: '',
    source: '',
    baseFormularyId: '',
    refFormularyId: '',
  }

  populateGridData = async (rowData, baseFormularyId, refFormularyId) => {
    if (this.props.formularyLobId && this.props.formularyLobId === 4) {
      let drugGridData = Array();
      let drugData = Array();
      let apiDetails = {};
      let isCategoricalRow = (rowData['attribute_name'] === 'PA Group Descriptions' || rowData['attribute_name'] === 'ST Group Descriptions' || rowData['attribute_type'] === 'Category/Class');
      apiDetails['apiPart'] = isCategoricalRow ? compareConstants.COMMERCIAL_ATTRIBUTE_VALUES : compareConstants.COMMERCIAL_FORMULARY_DRUGS;
      if (refFormularyId) {
        apiDetails['pathParams'] = baseFormularyId + '/' + refFormularyId;
      } else {
        apiDetails['pathParams'] = baseFormularyId;
      }
      apiDetails['keyVals'] = [];
      apiDetails['keyVals'].push({key:commonConstants.KEY_LIMIT, value: 10});
      apiDetails['keyVals'].push({key:commonConstants.KEY_INDEX, value: 0});
      if (isCategoricalRow) {
        apiDetails['keyVals'].push({key:'source', value: rowData['source']});
        apiDetails['keyVals'].push({key:'file_type', value: rowData['file_type']});
      } else {
        apiDetails['messageBody'] = {};
        apiDetails['messageBody']['attribute_field_data_type'] = rowData['attribute_field_data_type'];
        apiDetails['messageBody']['attribute_field_name'] = rowData['attribute_field_name'];
        apiDetails['messageBody']['attribute_field_value'] = rowData['attribute_field_value'];
        apiDetails['messageBody']['attribute_name'] = rowData['attribute_name'];
        apiDetails['messageBody']['file_type'] = rowData['file_type'];
        apiDetails['messageBody']['filter'] = [];
      }

      try {
        let data: any = null;
        if (isCategoricalRow) {
          data = await getAttributeValues(apiDetails);
        } else {
          data = await getDrugs(apiDetails);
        }
        if (data && data['list'] && data['list'].length > 0) {
          let idCount = 1;
          data['list'].map(dataItem => {
            let value = Object.assign({}, dataItem);
            drugData.push(value);
            if (isCategoricalRow) {
              let row = {};
              switch (rowData['attribute_name']) {
                case 'PA Group Descriptions':
                  row['id'] = idCount;
                  row['key'] = idCount;
                  row['groupDescription'] = value['group_description_name'];
                  break;
                case 'ST Group Descriptions':
                  row['id'] = idCount;
                  row['key'] = idCount;
                  row['groupDescription'] = value['group_description_name'];
                  break;
                case 'Tx Category':
                  row['id'] = idCount;
                  row['key'] = idCount;
                  row['category'] = value['category'];
                  row['class'] = value['class'];
                  break;
                case 'Tx Class':
                  row['id'] = idCount;
                  row['key'] = idCount;
                  row['category'] = value['category'];
                  row['class'] = value['class'];
                  break;

              }
              drugGridData.push(row);
            } else {
              let row = {};
              row['id'] = idCount;
              row['key'] = idCount;
              row['label'] = value['drug_label_name'];
              row['fileType'] = value['file_type'];
              row['dataSource'] = value['data_source'];
              row['gpi'] = value['generic_product_identifier'];
              switch (rowData['attribute_type']) {
                case 'Tier':
                  row['tier'] = value['tier_value'];
                  break;

                case 'Prior Authorization (PA)':
                  row['paType'] = value['pa_type'] === null ? '' : value['pa_type'];
                  row['paGroupDescription'] = value['pa_group_description'] === null ? '' : value['pa_group_description'];
                  break;

                case 'Step Therpay (ST)':
                  row['stType'] = value['st_type'] === null ? '' : value['st_type'];
                  row['stGroupDescription'] = value['st_group_description'] === null ? '' : value['st_group_description'];
                  row['stValue'] = value['st_value'] === null ? '' : value['st_value'];
                  break;

                case 'Quantity Limits (QL)':
                  row['qlType'] = value['ql_type'] === null ? '' : value['ql_type'];
                  row['qlDays'] = value['ql_days'] === null ? '' : value['ql_days'];
                  row['qlPeriodofTime'] = value['ql_period_of_time'] === null ? '' : value['ql_period_of_time'];
                  row['qlQuantity'] = value['ql_quantity'] === null ? '' : value['ql_quantity'];
                  row['fillsAllowed'] = value['fills_allowed'] === null ? '' : value['fills_allowed'];
                  row['fullLimitPeriod'] = value['full_limit_period_of_time'] === null ? '' : value['full_limit_period_of_time'];
                  break;

                case 'Drug Details':
                  switch (rowData['attribute_name']) {
                    case 'Age Limits':
                      row['minCovered'] = value['covered_min_ages'] === null ? '' : value['covered_min_ages'];
                      row['maxCovered'] = value['covered_max_ages'] === null ? '' : value['covered_max_ages'];
                      row['minCoveredCond'] = value['covered_min_operators'] === null ? '' : value['covered_min_operators'];
                      row['maxCoveredCond'] = value['covered_max_operators'] === null ? '' : value['covered_max_operators'];
                      row['minNotCovered'] = value['not_covered_min_ages'] === null ? '' : value['not_covered_min_ages'];
                      row['maxNotCovered'] = value['not_covered_max_ages'] === null ? '' : value['not_covered_max_ages'];
                      row['minNotCoveredCond'] = value['not_covered_min_operators'] === null ? '' : value['not_covered_min_operators'];
                      row['maxNotCoveredCond'] = value['not_covered_max_operators'] === null ? '' : value['not_covered_max_operators'];
                      break;

                    case 'Gender Limits':
                      row['covered'] = value['covered_genders'] === null ? '' : value['covered_genders'];
                      row['notCovered'] = value['not_covered_genders'] === null ? '' : value['not_covered_genders'];
                      break;

                    case 'ICD Limits':
                      row['covered'] = value['covered_icds'] === null ? '' : value['covered_icds'];
                      row['notCovered'] = value['not_covered_icds'] === null ? '' : value['not_covered_icds'];
                      break;

                    case 'Patient Residence':
                      row['covered'] = value['covered_patient_residences'] === null ? '' : value['covered_patient_residences'];
                      row['notCovered'] = value['not_covered_patient_residences'] === null ? '' : value['not_covered_patient_residences'];
                      break;

                    case 'Pharmacy Network':
                      row['covered'] = value['covered_pharmacy_networks'] === null ? '' : value['covered_pharmacy_networks'];
                      row['notCovered'] = value['not_covered_pharmacy_networks'] === null ? '' : value['not_covered_pharmacy_networks'];
                      break;

                    case 'Prescriber Taxonomy':
                      row['covered'] = value['covered_prescriber_taxonomies'] === null ? '' : value['covered_prescriber_taxonomies'];
                      row['notCovered'] = value['not_covered_prescriber_taxonomies'] === null ? '' : value['not_covered_prescriber_taxonomies'];
                      break;

                    case 'Place of Service':
                      row['covered'] = value['covered_place_of_services'] === null ? '' : value['covered_place_of_services'];
                      row['notCovered'] = value['not_covered_place_of_services'] === null ? '' : value['not_covered_place_of_services'];
                      break;
                  }

                case 'User Defined':
                  row['userDefined'] = value['user_defined'] === null ? '' : value['user_defined'];
                  break;
              }
              drugGridData.push(row);
            }
            idCount++;
          });
          this.setState({
            drugGridData: drugGridData,
            drugData: drugData,
            gridColumns: rowData['gridColumns'],
            file_type: rowData['file_type'],
            attribute_field_data_type: rowData['attribute_field_data_type'],
            attribute_field_name: rowData['attribute_field_name'],
            attribute_field_value: rowData['attribute_field_value'],
            attribute_name: rowData['attribute_name'],
            source: rowData['source'],
            baseFormularyId: baseFormularyId,
            refFormularyId: refFormularyId,
            openDrugsList: !this.state.openDrugsList
          });
        } else {
          showMessage('Compare data is empty', 'error');
          this.setState({
            drugGridData: Array(),
            drugData: Array(),
            gridColumns: Array(),
            file_type: '',
            attribute_field_data_type: '',
            attribute_field_name: '',
            attribute_field_value: '',
            attribute_name: '',
            source: '',
            baseFormularyId: '',
            refFormularyId: '',
          });
        }
      }
      catch (err) {
        console.log(err);
        showMessage('Error while fetching data', 'error');
        this.setState({
          drugGridData: Array(),
          drugData: Array(),
          gridColumns: Array(),
          file_type: '',
          attribute_field_data_type: '',
          attribute_field_name: '',
          attribute_field_value: '',
          attribute_name: '',
          source: '',
          baseFormularyId: '',
          refFormularyId: '',
        });
      }
    } else {
      this.setState({
        drugGridData: Array(),
        drugData: Array(),
        gridColumns: Array(),
        file_type: '',
        attribute_field_data_type: '',
        attribute_field_name: '',
        attribute_field_value: '',
        attribute_name: '',
        source: '',
        baseFormularyId: '',
        refFormularyId: '',
      });
    }
  }

  toggleDrugsListGrid = (
    gridCellName: string | null = null,
    showCheckbox: boolean | null = null,
    rowData: any = null,
    isClose = false,
    baseFormularyId = null,
    refFormularyId = null,
    dataCount: number | any = 0,
  ) => {
    if (isClose) {
      if (gridCellName !== null) this.state.drugGridHeaderName = gridCellName;
      if (showCheckbox !== null) {
        this.state.checkbox = showCheckbox;
        this.state.actions = showCheckbox;
      }
      this.setState({
        openDrugsList: !this.state.openDrugsList
      });
    } else {
      if (dataCount > 0) {
        if (gridCellName !== null) this.state.drugGridHeaderName = gridCellName;
        if (showCheckbox !== null) {
          this.state.checkbox = showCheckbox;
          this.state.actions = showCheckbox;
        }
        //console.log('Base formulary ID:' + baseFormularyId + ' Ref formulary ID:' + refFormularyId + ' ' + JSON.stringify(this.props.baseformulary) + ' ' + JSON.stringify(this.props.referenceformulary));
        this.populateGridData(rowData, baseFormularyId, refFormularyId);
      }
    }
  };

  render() {
    switch (this.props.tableType) {
      case "COMPARE":
        return (
          <div className="inner-grid-compare-formularies">
            {this.props.dataArr.map((data) => (
              <>
                <div className="cell-height cell-head-font-style">
                  {data.name}
                </div>
                <div className="cell-height cell-font-style">
                  <span
                    onClick={() => {
                      this.toggleDrugsListGrid(
                        `${this.props.formularyType} - ${data.name}: Base Formulary`,
                        false,
                        data,
                        false,
                        this.props.baseformulary['id_formulary'],
                        null,
                        data.baseFormulary
                      );
                    }}
                  >
                    {data.baseFormulary}
                  </span>
                </div>
                <div className="cell-height cell-font-style">
                  <span
                    onClick={() => {
                      this.toggleDrugsListGrid(
                        `${this.props.formularyType} - ${data.name}: Reference Formulary`,
                        false,
                        data,
                        false,
                        this.props.referenceformulary['id_formulary'],
                        null,
                        data.referenceFormulary
                      );
                    }}
                  >
                    {data.referenceFormulary}
                  </span>
                </div>
                <div className="cell-height cell-font-style">
                  <span
                    onClick={() => {
                      this.toggleDrugsListGrid(
                        `${this.props.formularyType} - ${data.name}: Base Only`,
                        true,
                        data,
                        false,
                        this.props.baseformulary['id_formulary'],
                        this.props.referenceformulary['id_formulary'],
                        data.baseOnly
                      );
                    }}
                  >
                    {data.baseOnly}
                  </span>
                </div>
                <div className="cell-height cell-font-style">
                  <span
                    onClick={() => {
                      this.toggleDrugsListGrid(
                        `${this.props.formularyType} - ${data.name}: Reference Formulary`,
                        true,
                        data,
                        false,
                        this.props.referenceformulary['id_formulary'],
                        this.props.baseformulary['id_formulary'],
                        data.referenceOnly
                      );
                    }}
                  >
                    {data.referenceOnly}
                  </span>
                </div>
                <div className="cell-height cell-font-style no-border">
                  <span
                    onClick={() => {
                      this.toggleDrugsListGrid(
                        `${this.props.formularyType} - ${data.name}: Non-Match Base & Reference`,
                        true,
                        null,
                        true
                      );
                    }}
                  >
                    {data.nonMatch}
                  </span>
                </div>
              </>
            ))}
            {this.state.openDrugsList ? (
              <DialogPopup
                showCloseIcon={this.state.actions}
                positiveActionText="Reject"
                negativeActionText=""
                title={this.state.drugGridHeaderName}
                handleClose={() => this.toggleDrugsListGrid(null, null, null, true)}
                handleAction={() => { }}
                showActions={this.state.actions}
                height="80%"
                width="80%"
                open={this.state.openDrugsList}
              >
                <FrxGridContainer
                  enableSearch={false}
                  enableColumnDrag
                  onSearch={() => { }}
                  fixedColumnKeys={[]}
                  pagintionPosition="topRight"
                  gridName="MEDICARE"
                  isFetchingData={false}
                  columns={this.state.gridColumns}
                  scroll={{ x: 1000, y: 500 }}
                  enableResizingOfColumns={false}
                  data={this.state.drugGridData}
                  // pinning columns
                  isPinningEnabled={true}
                  // setting gear 1st column
                  enableSettings={true}
                  // checkbox 2nd column
                  customSettingIcon={"NONE"}
                />
              </DialogPopup>
            ) : null}
          </div>
        );

      case "VIEW":
        return (
          <div className="inner-grid-view-formularies">
            {this.props.dataArr.map((data) => (
              <>
                <div className="cell-height cell-head-font-style">
                  {data.name}
                </div>
                <div className="cell-height cell-font-style">
                  <span
                    onClick={() => {
                      this.toggleDrugsListGrid(
                        `${this.props.formularyType} - ${data.name}: Base Formulary`,
                        false
                      );
                    }}
                  >
                    {data.baseFormulary}
                  </span>
                </div>
              </>
            ))}
            {this.state.openDrugsList ? (
              <DialogPopup
                showCloseIcon={this.state.actions}
                positiveActionText="Reject"
                negativeActionText=""
                title={this.state.drugGridHeaderName}
                handleClose={() => this.toggleDrugsListGrid(null, null, null, true)}
                handleAction={() => { }}
                showActions={this.state.actions}
                height="80%"
                width="80%"
                open={this.state.openDrugsList}
              >
                <FrxGridContainer
                  enableSearch={false}
                  enableColumnDrag
                  onSearch={() => { }}
                  fixedColumnKeys={[]}
                  pagintionPosition="topRight"
                  gridName="MEDICARE"
                  isFetchingData={false}
                  columns={this.state.gridColumns}
                  scroll={{ x: 1000, y: 500 }}
                  enableResizingOfColumns={false}
                  data={this.state.drugGridData}
                  // pinning columns
                  isPinningEnabled={true}
                  // setting gear 1st column
                  enableSettings={true}
                  // checkbox 2nd column
                  // event reference for checkbox (mandotory if checkbox is true)
                  customSettingIcon={"NONE"}
                />
              </DialogPopup>
            ) : null}
          </div>
        );
      default:
        return <h1>NOT MATCHED</h1>;
    }
  }
}

export default InnerGrid;
