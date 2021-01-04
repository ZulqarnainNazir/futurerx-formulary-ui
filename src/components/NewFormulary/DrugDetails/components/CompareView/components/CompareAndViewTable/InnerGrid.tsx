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
import getLobCode from "../../../../../Utils/LobUtils";

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
  clientId?: any;
  onRejectClicked?: (a) => void;
}

const defaultListPayload = {
  index: 0,
  limit: 10,
  filter: [],
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
    rowData: {},
    baseFormularyId: '',
    refFormularyId: '',
    hiddenColumns: Array(),
    dataCount: 0,
    isLastColumn: false,
    rejectedKeys: Array(),
    rejectedDrugIds: Array(),
  }

  listPayload: any = {
    index: 0,
    limit: 10,
    filter: [],
  }

  onSettingsIconHandler = (hiddenColumn, visibleColumn) => {
    if (hiddenColumn && hiddenColumn.length > 0) {
      let hiddenColumnKeys = hiddenColumn.map(column => column['key']);
      this.setState({
        hiddenColumns: hiddenColumnKeys
      });
    }
  }
  getRejectMessageBody = () => {
    let messageBody = {
      attribute_field_name: '',
      drug_key: '',
      attribute_current_value: '',
      is_single_update: true,
      file_type: getLobCode(this.props.formularyLobId),
      multi_update_type: ''
    };
    if (this.state.rowData['attribute_field_name'] === 'tierValue') {
      messageBody.attribute_field_name = 'tier_value';
    } else if (this.state.rowData['attribute_name'] === 'Tx Category') {
      messageBody.attribute_field_name = 'category';
    } else if (this.state.rowData['attribute_name'] === 'Tx Class') {
      messageBody.attribute_field_name = 'class';
    } else if (this.state.rowData['attribute_field_name'] === 'paType') {
      messageBody.attribute_field_name = 'pa_type';
    } else if (this.state.rowData['attribute_field_name'] === 'paGroupDescription') {
      messageBody.attribute_field_name = 'pa_group_description';
    } else if (this.state.rowData['attribute_field_name'] === 'stType') {
      messageBody.attribute_field_name = 'st_type';
    } else if (this.state.rowData['attribute_field_name'] === 'stGroupDescription') {
      messageBody.attribute_field_name = 'st_group_description';
    } else if (this.state.rowData['attribute_field_name'] === 'qlType') {
      messageBody.attribute_field_name = 'ql_type';
    } else if (this.state.rowData['attribute_field_name'] === 'isAL') {
      messageBody.attribute_field_name = 'age_limit';
    } else if (this.state.rowData['attribute_field_name'] === 'isGL') {
      messageBody.attribute_field_name = 'gender_limit';
    } else if (this.state.rowData['attribute_field_name'] === 'isICDL') {
      messageBody.attribute_field_name = 'icd_limit';
    } else if (this.state.rowData['attribute_field_name'] === 'isPATRS') {
      messageBody.attribute_field_name = 'patient_residence';
    } else if (this.state.rowData['attribute_field_name'] === 'isPHNW') {
      messageBody.attribute_field_name = 'pharamcy_network';
    } else if (this.state.rowData['attribute_field_name'] === 'isPRTX') {
      messageBody.attribute_field_name = 'prescriber_taxonomy';
    } else if (this.state.rowData['attribute_field_name'] === 'isPOS') {
      messageBody.attribute_field_name = 'place_of_service';
    } else if (this.state.rowData['attribute_type'] === 'User Defined') {
      messageBody.attribute_field_name = 'user_defined';
    }
    return messageBody;
  }
  onDialogAction = (type) => {
    console.log('Rejected drugs:' + JSON.stringify(this.state.rejectedDrugIds));
    if (type === 'positive' && this.state.rejectedDrugIds.length > 0) {
      console.log('Rejected drugs:' + JSON.stringify(this.state.rejectedDrugIds));
      if (this.state.rowData) {
        let messageTemplate = this.getRejectMessageBody();
        let apiBody = {
          user_id: this.props.clientId,
          attributes: Array()
        };
        this.state.rejectedDrugIds.map(attributeData => {
          let newTemplate = Object.assign({}, messageTemplate);
          newTemplate.attribute_current_value = attributeData.value;
          newTemplate.drug_key = attributeData.drugId;
          apiBody.attributes.push(newTemplate);
        });

        if (this.props.onRejectClicked) {
          this.props.onRejectClicked(apiBody);
        }
      }
      this.toggleDrugsListGrid(null, null, null, true);
    }
  }
  onApplyFilterHandler = (filters) => {
    /*const fetchedProps = Object.keys(filters)[0];
    console.log('Fetched properties:' + JSON.stringify(fetchedProps) + " Filters:" + JSON.stringify(filters));
    const fetchedOperator = filters[fetchedProps][0].condition === 'is like' ? 'is_like' :
      filters[fetchedProps][0].condition === 'is not' ? 'is_not' :
        filters[fetchedProps][0].condition === 'is not like' ? 'is_not_like' :
          filters[fetchedProps][0].condition === 'does not exist' ? 'does_not_exist' :
            filters[fetchedProps][0].condition;
    const fetchedValues = filters[fetchedProps][0].value !== '' ? [filters[fetchedProps][0].value.toString()] : [];
    const newFilters = [{ prop: fetchedProps, operator: fetchedOperator, values: fetchedValues }];
    this.listPayload.filter = newFilters;
    this.fetchFormularies(this.listPayload);*/
  }
  onPageSize = (pageSize) => {
    this.listPayload = { ...defaultListPayload };
    this.listPayload.limit = pageSize;
    this.populateGridData(this.state.rowData, this.state.baseFormularyId, this.state.refFormularyId, this.listPayload, this.state.isLastColumn);
  }
  onGridPageChangeHandler = (pageNumber: any) => {
    this.listPayload.index = (pageNumber - 1) * this.listPayload.limit;
    this.populateGridData(this.state.rowData, this.state.baseFormularyId, this.state.refFormularyId, this.listPayload, this.state.isLastColumn);
  }
  onClearFilterHandler = () => {
    this.listPayload = { ...defaultListPayload };
    this.populateGridData(this.state.rowData, this.state.baseFormularyId, this.state.refFormularyId, this.listPayload, this.state.isLastColumn);
  }

  populateGridData = async (rowData, baseFormularyId, refFormularyId, payload, isLastColumn) => {
    if (this.props.formularyLobId && this.props.formularyLobId === 4) {
      let drugGridData = Array();
      let drugData = Array();
      let apiDetails = {};
      let isCategoricalRow = (rowData['attribute_name'] === 'PA Group Descriptions' || rowData['attribute_name'] === 'ST Group Descriptions' || rowData['attribute_type'] === 'Category/Class');
      apiDetails['apiPart'] = isCategoricalRow ? compareConstants.COMMERCIAL_ATTRIBUTE_VALUES : (isLastColumn ? compareConstants.COMMERCIAL_FORMULARY_DRUGS_NON_MATCH : compareConstants.COMMERCIAL_FORMULARY_DRUGS);
      if (refFormularyId) {
        apiDetails['pathParams'] = baseFormularyId + '/' + refFormularyId;
      } else {
        apiDetails['pathParams'] = baseFormularyId;
      }
      apiDetails['keyVals'] = [];
      apiDetails['keyVals'].push({ key: commonConstants.KEY_LIMIT, value: payload['limit'] });
      apiDetails['keyVals'].push({ key: commonConstants.KEY_INDEX, value: payload['index'] });
      if (isCategoricalRow) {
        apiDetails['keyVals'].push({ key: 'source', value: rowData['source'] });
        apiDetails['keyVals'].push({ key: 'file_type', value: rowData['file_type'] });
      } else {
        apiDetails['messageBody'] = {};
        apiDetails['messageBody']['attribute_field_data_type'] = rowData['attribute_field_data_type'];
        apiDetails['messageBody']['attribute_field_name'] = rowData['attribute_field_name'];
        apiDetails['messageBody']['attribute_field_value'] = rowData['attribute_field_value'];
        apiDetails['messageBody']['attribute_name'] = rowData['attribute_name'];
        apiDetails['messageBody']['file_type'] = rowData['file_type'];
        apiDetails['messageBody']['filter'] = payload['filter'];
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
              if (isLastColumn) {
                row['label'] = value['drug_label_name_base'];
                row['fileType'] = value['file_type_base'];
                row['dataSource'] = value['data_source_base'];
                row['gpi'] = value['generic_product_identifier_base'];
              } else {
                row['label'] = value['drug_label_name'];
                row['fileType'] = value['file_type'];
                row['dataSource'] = value['data_source'];
                row['gpi'] = value['generic_product_identifier'];
              }
              switch (rowData['attribute_type']) {
                case 'Tier':
                  if (isLastColumn) {
                    row['tier'] = value['tier_value_base'];
                    row['tierRef'] = value['tier_value_ref'];
                  } else {
                    row['tier'] = value['tier_value'];
                  }
                  break;

                case 'Prior Authorization (PA)':
                  if (isLastColumn) {
                    row['paType'] = value['pa_type_base'] === null ? '' : value['pa_type_base'];
                    row['paGroupDescription'] = value['pa_group_description_base'] === null ? '' : value['pa_group_description_base'];
                    row['paTypeRef'] = value['pa_type_ref'] === null ? '' : value['pa_type_ref'];
                    row['paGroupDescriptionRef'] = value['pa_group_description_ref'] === null ? '' : value['pa_group_description_ref'];
                  } else {
                    row['paType'] = value['pa_type'] === null ? '' : value['pa_type'];
                    row['paGroupDescription'] = value['pa_group_description'] === null ? '' : value['pa_group_description'];
                  }
                  break;

                case 'Step Therpay (ST)':
                  if (isLastColumn) {
                    row['stType'] = value['st_type_base'] === null ? '' : value['st_type_base'];
                    row['stGroupDescription'] = value['st_group_description_base'] === null ? '' : value['st_group_description_base'];
                    row['stValue'] = value['st_value_base'] === null ? '' : value['st_value_base'];
                    row['stTypeRef'] = value['st_type_ref'] === null ? '' : value['st_type_ref'];
                    row['stGroupDescriptionRef'] = value['st_group_description_ref'] === null ? '' : value['st_group_description_ref'];
                    row['stValueRef'] = value['st_value_ref'] === null ? '' : value['st_value_ref'];
                  } else {
                    row['stType'] = value['st_type'] === null ? '' : value['st_type'];
                    row['stGroupDescription'] = value['st_group_description'] === null ? '' : value['st_group_description'];
                    row['stValue'] = value['st_value'] === null ? '' : value['st_value'];
                  }
                  break;

                case 'Quantity Limits (QL)':
                  if (isLastColumn) {
                    row['qlType'] = value['ql_type_base'] === null ? '' : value['ql_type_base'];
                    row['qlDays'] = value['ql_days_base'] === null ? '' : value['ql_days_base'];
                    row['qlPeriodofTime'] = value['ql_period_of_time_base'] === null ? '' : value['ql_period_of_time_base'];
                    row['qlQuantity'] = value['ql_quantity_base'] === null ? '' : value['ql_quantity_base'];
                    row['fillsAllowed'] = value['fills_allowed_base'] === null ? '' : value['fills_allowed_base'];
                    row['fullLimitPeriod'] = value['full_limit_period_of_time_base'] === null ? '' : value['full_limit_period_of_time_base'];

                    row['qlTypeRef'] = value['ql_type_ref'] === null ? '' : value['ql_type_ref'];
                    row['qlDaysRef'] = value['ql_days_ref'] === null ? '' : value['ql_days_ref'];
                    row['qlPeriodofTimeRef'] = value['ql_period_of_time_ref'] === null ? '' : value['ql_period_of_time_ref'];
                    row['qlQuantityRef'] = value['ql_quantity_ref'] === null ? '' : value['ql_quantity_ref'];
                    row['fillsAllowedRef'] = value['fills_allowed_ref'] === null ? '' : value['fills_allowed_ref'];
                    row['fullLimitPeriodRef'] = value['full_limit_period_of_time_ref'] === null ? '' : value['full_limit_period_of_time_ref'];
                  } else {
                    row['qlType'] = value['ql_type'] === null ? '' : value['ql_type'];
                    row['qlDays'] = value['ql_days'] === null ? '' : value['ql_days'];
                    row['qlPeriodofTime'] = value['ql_period_of_time'] === null ? '' : value['ql_period_of_time'];
                    row['qlQuantity'] = value['ql_quantity'] === null ? '' : value['ql_quantity'];
                    row['fillsAllowed'] = value['fills_allowed'] === null ? '' : value['fills_allowed'];
                    row['fullLimitPeriod'] = value['full_limit_period_of_time'] === null ? '' : value['full_limit_period_of_time'];
                  }
                  break;

                case 'Drug Details':
                  switch (rowData['attribute_name']) {
                    case 'Age Limits':
                      if (isLastColumn) {
                        row['minCovered'] = value['covered_min_ages_base'] === null ? '' : value['covered_min_ages_base'];
                        row['maxCovered'] = value['covered_max_ages_base'] === null ? '' : value['covered_max_ages_base'];
                        row['minCoveredCond'] = value['covered_min_operators_base'] === null ? '' : value['covered_min_operators_base'];
                        row['maxCoveredCond'] = value['covered_max_operators_base'] === null ? '' : value['covered_max_operators_base'];
                        row['minNotCovered'] = value['not_covered_min_ages_base'] === null ? '' : value['not_covered_min_ages_base'];
                        row['maxNotCovered'] = value['not_covered_max_ages_base'] === null ? '' : value['not_covered_max_ages_base'];
                        row['minNotCoveredCond'] = value['not_covered_min_operators_base'] === null ? '' : value['not_covered_min_operators_base'];
                        row['maxNotCoveredCond'] = value['not_covered_max_operators_base'] === null ? '' : value['not_covered_max_operators_base'];

                        row['minCoveredRef'] = value['covered_min_ages_ref'] === null ? '' : value['covered_min_ages_ref'];
                        row['maxCoveredRef'] = value['covered_max_ages_ref'] === null ? '' : value['covered_max_ages_ref'];
                        row['minCoveredCondRef'] = value['covered_min_operators_ref'] === null ? '' : value['covered_min_operators_ref'];
                        row['maxCoveredCondRef'] = value['covered_max_operators_ref'] === null ? '' : value['covered_max_operators_ref'];
                        row['minNotCoveredRef'] = value['not_covered_min_ages_ref'] === null ? '' : value['not_covered_min_ages_ref'];
                        row['maxNotCoveredRef'] = value['not_covered_max_ages_ref'] === null ? '' : value['not_covered_max_ages_ref'];
                        row['minNotCoveredCondRef'] = value['not_covered_min_operators_ref'] === null ? '' : value['not_covered_min_operators_ref'];
                        row['maxNotCoveredCondRef'] = value['not_covered_max_operators_ref'] === null ? '' : value['not_covered_max_operators_ref'];
                      } else {
                        row['minCovered'] = value['covered_min_ages'] === null ? '' : value['covered_min_ages'];
                        row['maxCovered'] = value['covered_max_ages'] === null ? '' : value['covered_max_ages'];
                        row['minCoveredCond'] = value['covered_min_operators'] === null ? '' : value['covered_min_operators'];
                        row['maxCoveredCond'] = value['covered_max_operators'] === null ? '' : value['covered_max_operators'];
                        row['minNotCovered'] = value['not_covered_min_ages'] === null ? '' : value['not_covered_min_ages'];
                        row['maxNotCovered'] = value['not_covered_max_ages'] === null ? '' : value['not_covered_max_ages'];
                        row['minNotCoveredCond'] = value['not_covered_min_operators'] === null ? '' : value['not_covered_min_operators'];
                        row['maxNotCoveredCond'] = value['not_covered_max_operators'] === null ? '' : value['not_covered_max_operators'];
                      }
                      break;

                    case 'Gender Limits':
                      if (isLastColumn) {
                        row['covered'] = value['covered_genders_base'] === null ? '' : value['covered_genders_base'];
                        row['notCovered'] = value['not_covered_genders_base'] === null ? '' : value['not_covered_genders_base'];

                        row['coveredRef'] = value['covered_genders_ref'] === null ? '' : value['covered_genders_ref'];
                        row['notCoveredRef'] = value['not_covered_genders_ref'] === null ? '' : value['not_covered_genders_ref'];
                      } else {
                        row['covered'] = value['covered_genders'] === null ? '' : value['covered_genders'];
                        row['notCovered'] = value['not_covered_genders'] === null ? '' : value['not_covered_genders'];
                      }
                      break;

                    case 'ICD Limits':
                      if (isLastColumn) {
                        row['covered'] = value['covered_icds_base'] === null ? '' : value['covered_icds_base'];
                        row['notCovered'] = value['not_covered_icds_base'] === null ? '' : value['not_covered_icds_base'];

                        row['coveredRef'] = value['covered_icds_ref'] === null ? '' : value['covered_icds_ref'];
                        row['notCoveredRef'] = value['not_covered_icds_ref'] === null ? '' : value['not_covered_icds_ref'];
                      } else {
                        row['covered'] = value['covered_icds'] === null ? '' : value['covered_icds'];
                        row['notCovered'] = value['not_covered_icds'] === null ? '' : value['not_covered_icds'];
                      }
                      break;

                    case 'Patient Residence':
                      if (isLastColumn) {
                        row['covered'] = value['covered_patient_residences_base'] === null ? '' : value['covered_patient_residences_base'];
                        row['notCovered'] = value['not_covered_patient_residences_base'] === null ? '' : value['not_covered_patient_residences_base'];

                        row['coveredRef'] = value['covered_patient_residences_ref'] === null ? '' : value['covered_patient_residences_ref'];
                        row['notCoveredRef'] = value['not_covered_patient_residences_ref'] === null ? '' : value['not_covered_patient_residences_ref'];
                      } else {
                        row['covered'] = value['covered_patient_residences'] === null ? '' : value['covered_patient_residences'];
                        row['notCovered'] = value['not_covered_patient_residences'] === null ? '' : value['not_covered_patient_residences'];
                      }
                      break;

                    case 'Pharmacy Network':
                      if (isLastColumn) {
                        row['covered'] = value['covered_pharmacy_networks_base'] === null ? '' : value['covered_pharmacy_networks_base'];
                        row['notCovered'] = value['not_covered_pharmacy_networks_base'] === null ? '' : value['not_covered_pharmacy_networks_base'];

                        row['coveredRef'] = value['covered_pharmacy_networks_ref'] === null ? '' : value['covered_pharmacy_networks_ref'];
                        row['notCoveredRef'] = value['not_covered_pharmacy_networks_ref'] === null ? '' : value['not_covered_pharmacy_networks_ref'];
                      } else {
                        row['covered'] = value['covered_pharmacy_networks'] === null ? '' : value['covered_pharmacy_networks'];
                        row['notCovered'] = value['not_covered_pharmacy_networks'] === null ? '' : value['not_covered_pharmacy_networks'];
                      }
                      break;

                    case 'Prescriber Taxonomy':
                      if (isLastColumn) {
                        row['covered'] = value['covered_prescriber_taxonomies_base'] === null ? '' : value['covered_prescriber_taxonomies_base'];
                        row['notCovered'] = value['not_covered_prescriber_taxonomies_base'] === null ? '' : value['not_covered_prescriber_taxonomies_base'];

                        row['coveredRef'] = value['covered_prescriber_taxonomies_ref'] === null ? '' : value['covered_prescriber_taxonomies_ref'];
                        row['notCoveredRef'] = value['not_covered_prescriber_taxonomies_ref'] === null ? '' : value['not_covered_prescriber_taxonomies_ref'];
                      } else {
                        row['covered'] = value['covered_prescriber_taxonomies'] === null ? '' : value['covered_prescriber_taxonomies'];
                        row['notCovered'] = value['not_covered_prescriber_taxonomies'] === null ? '' : value['not_covered_prescriber_taxonomies'];
                      }
                      break;

                    case 'Place of Service':
                      if (isLastColumn) {
                        row['covered'] = value['covered_place_of_services_base'] === null ? '' : value['covered_place_of_services_base'];
                        row['notCovered'] = value['not_covered_place_of_services_base'] === null ? '' : value['not_covered_place_of_services_base'];

                        row['coveredRef'] = value['covered_place_of_services_ref'] === null ? '' : value['covered_place_of_services_ref'];
                        row['notCoveredRef'] = value['not_covered_place_of_services_ref'] === null ? '' : value['not_covered_place_of_services_ref'];
                      } else {
                        row['covered'] = value['covered_place_of_services'] === null ? '' : value['covered_place_of_services'];
                        row['notCovered'] = value['not_covered_place_of_services'] === null ? '' : value['not_covered_place_of_services'];
                      }
                      break;
                  }

                case 'User Defined':
                  if (isLastColumn) {
                    row['userDefined'] = value['user_defined_base'] === null ? '' : value['user_defined_base'];
                    row['userDefinedRef'] = value['user_defined_ref'] === null ? '' : value['user_defined_ref'];
                  } else {
                    row['userDefined'] = value['user_defined'] === null ? '' : value['user_defined'];
                  }
                  break;
              }
              drugGridData.push(row);
            }
            idCount++;
          });
          console.log('Row data is:' + JSON.stringify(rowData));
          this.setState({
            drugGridData: drugGridData,
            drugData: drugData,
            gridColumns: isLastColumn ? rowData['gridColumnsNonMatch'] : rowData['gridColumns'],
            rowData: rowData,
            baseFormularyId: baseFormularyId,
            refFormularyId: refFormularyId,
            dataCount: data['count'],
            isLastColumn: isLastColumn,
          });
        } else {
          showMessage('Compare data is empty', 'error');
          this.setState({
            drugGridData: Array(),
            drugData: Array(),
            gridColumns: Array(),
            rowData: {},
            baseFormularyId: '',
            refFormularyId: '',
            dataCount: 0,
            isLastColumn: isLastColumn,
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
          rowData: {},
          baseFormularyId: '',
          refFormularyId: '',
          dataCount: 0,
          isLastColumn: isLastColumn,
        });
      }
    } else {
      this.setState({
        drugGridData: Array(),
        drugData: Array(),
        gridColumns: Array(),
        rowData: {},
        baseFormularyId: '',
        refFormularyId: '',
        dataCount: 0,
        isLastColumn: isLastColumn,
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
    isLastColumn: boolean | null = false
  ) => {
    if (isClose) {
      if (gridCellName !== null) this.state.drugGridHeaderName = gridCellName;
      if (showCheckbox !== null) {
        this.state.checkbox = showCheckbox;
        this.state.actions = showCheckbox;
      }
      this.setState({
        openDrugsList: !this.state.openDrugsList,
        drugGridData: Array(),
        drugData: Array(),
        gridColumns: Array(),
        rowData: {},
        baseFormularyId: '',
        refFormularyId: '',
        hiddenColumns: Array(),
        dataCount: 0,
        rejectedKeys: Array(),
        rejectedDrugIds: Array(),
      });
    } else {
      if (dataCount > 0) {
        if (gridCellName !== null) this.state.drugGridHeaderName = gridCellName;
        if (showCheckbox !== null) {
          this.state.checkbox = showCheckbox;
          this.state.actions = showCheckbox;
        }
        this.state.openDrugsList = !this.state.openDrugsList;
        this.listPayload = { ...defaultListPayload };
        //console.log('Base formulary ID:' + baseFormularyId + ' Ref formulary ID:' + refFormularyId + ' ' + JSON.stringify(this.props.baseformulary) + ' ' + JSON.stringify(this.props.referenceformulary));
        this.populateGridData(rowData, baseFormularyId, refFormularyId, this.listPayload, isLastColumn);
      }
    }
  };

  getAttributeValue = (row) => {
    if (this.state.rowData['attribute_field_name'] === 'tierValue') {
      return ''+row['tier'];
    } else if (this.state.rowData['attribute_name'] === 'Tx Category') {
      return ''+row['category'];
    } else if (this.state.rowData['attribute_name'] === 'Tx Class') {
      return ''+row['class'];
    } else if (this.state.rowData['attribute_field_name'] === 'paType') {
      return ''+row['paType'];
    } else if (this.state.rowData['attribute_field_name'] === 'paGroupDescription') {
      return ''+row['groupDescription'];
    } else if (this.state.rowData['attribute_field_name'] === 'stType') {
      return ''+row['stType'];
    } else if (this.state.rowData['attribute_field_name'] === 'stGroupDescription') {
      return ''+row['groupDescription'];
    } else if (this.state.rowData['attribute_field_name'] === 'qlType') {
      return ''+row['qlType'];
    } else if (this.state.rowData['attribute_field_name'] === 'isAL') {
      return '';
    } else if (this.state.rowData['attribute_field_name'] === 'isGL') {
      return '';
    } else if (this.state.rowData['attribute_field_name'] === 'isICDL') {
      return '';
    } else if (this.state.rowData['attribute_field_name'] === 'isPATRS') {
      return '';
    } else if (this.state.rowData['attribute_field_name'] === 'isPHNW') {
      return '';
    } else if (this.state.rowData['attribute_field_name'] === 'isPRTX') {
      return '';
    } else if (this.state.rowData['attribute_field_name'] === 'isPOS') {
      return '';
    } else if (this.state.rowData['attribute_type'] === 'User Defined') {
      return '';
    }
    return '';
  }

  rowSelectionChange = async (data: any, event) => {
    console.log('Row:' + JSON.stringify(data));
    let isCategoricalRow = (this.state.rowData['attribute_name'] === 'PA Group Descriptions' || this.state.rowData['attribute_name'] === 'ST Group Descriptions' || this.state.rowData['attribute_type'] === 'Category/Class');
    if (event.target.checked) {
      if (!this.state.rejectedKeys.includes(data['key'])) {
        this.state.rejectedKeys.push(data['key']);
        if (isCategoricalRow) {
          let apiDetails = {};
          let attributeValue = this.getAttributeValue(data);
          apiDetails['apiPart'] = (this.state.isLastColumn ? compareConstants.COMMERCIAL_FORMULARY_DRUGS_NON_MATCH : compareConstants.COMMERCIAL_FORMULARY_DRUGS);
          apiDetails['pathParams'] = this.state.baseFormularyId + '/' + this.state.refFormularyId;
          apiDetails['keyVals'] = [];
          apiDetails['keyVals'].push({ key: commonConstants.KEY_LIMIT, value: 10000 });
          apiDetails['keyVals'].push({ key: commonConstants.KEY_INDEX, value: 0 });

          apiDetails['messageBody'] = {};

          switch (this.state.rowData['attribute_name']) {
            case 'PA Group Descriptions':
              apiDetails['messageBody']['attribute_field_data_type'] = 'STR';
              apiDetails['messageBody']['attribute_field_name'] = this.state.rowData['attribute_field_name'];
              apiDetails['messageBody']['attribute_field_value'] = attributeValue;
              apiDetails['messageBody']['attribute_name'] = this.state.rowData['attribute_name'];
              apiDetails['messageBody']['file_type'] = this.state.rowData['file_type'];
              apiDetails['messageBody']['filter'] = [];
              break;
            case 'ST Group Descriptions':
              apiDetails['messageBody']['attribute_field_data_type'] = 'STR';
              apiDetails['messageBody']['attribute_field_name'] = this.state.rowData['attribute_field_name'];
              apiDetails['messageBody']['attribute_field_value'] = attributeValue;
              apiDetails['messageBody']['attribute_name'] = this.state.rowData['attribute_name'];
              apiDetails['messageBody']['file_type'] = this.state.rowData['file_type'];
              apiDetails['messageBody']['filter'] = [];
              break;
            case 'Tx Category':
              apiDetails['messageBody']['attribute_field_data_type'] = 'STR';
              apiDetails['messageBody']['attribute_field_name'] = 'drugCategory';
              apiDetails['messageBody']['attribute_field_value'] = attributeValue.replace(/[*]/g,"");
              apiDetails['messageBody']['attribute_name'] = this.state.rowData['attribute_name'];
              apiDetails['messageBody']['file_type'] = this.state.rowData['file_type'];
              apiDetails['messageBody']['filter'] = [];
              break;
            case 'Tx Class':
              apiDetails['messageBody']['attribute_field_data_type'] = 'STR';
              apiDetails['messageBody']['attribute_field_name'] = 'drugClass';
              apiDetails['messageBody']['attribute_field_value'] = attributeValue.replace(/[*]/g,"");
              apiDetails['messageBody']['attribute_name'] = this.state.rowData['attribute_name'];
              apiDetails['messageBody']['file_type'] = this.state.rowData['file_type'];
              apiDetails['messageBody']['filter'] = [];
              break;
          }


          let drugs = await getDrugs(apiDetails);
          if (drugs && drugs['list'] && drugs['list'].length > 0) {
            drugs['list'].map(drugValue => {
              let drugId = null;
              if (this.state.isLastColumn) {
                drugId = drugValue['md5_id_base'];
              } else {
                drugId = drugValue['md5_id'];
              }
              if (drugId)
                this.state.rejectedDrugIds.push({ drugId: drugId, value: attributeValue });
            })
          }
        } else {
          if (this.state.drugData.length > 0 && (data['key'] - 1) < this.state.drugData.length) {
            let drugId = null;
            if (this.state.isLastColumn) {
              drugId = this.state.drugData[data['key'] - 1]['md5_id_base'];
            } else {
              drugId = this.state.drugData[data['key'] - 1]['md5_id'];
            }
            if (drugId)
              this.state.rejectedDrugIds.push({ drugId: drugId, value: this.getAttributeValue(data) });
          }
        }
      }
    } else {
      this.state.rejectedKeys = this.state.rejectedKeys.filter(item => item !== data['key']);

      if (isCategoricalRow) {
        let attributeValue = this.getAttributeValue(data);
        this.state.rejectedDrugIds = this.state.rejectedDrugIds.filter(item => item['value'] !== attributeValue);
      } else {
        if (this.state.drugData.length > 0 && (data['key'] - 1) < this.state.drugData.length) {
          let drugId = null;
          if (this.state.isLastColumn) {
            drugId = this.state.drugData[data['key'] - 1]['md5_id_base'];
          } else {
            drugId = this.state.drugData[data['key'] - 1]['md5_id'];
          }
          if (drugId)
            this.state.rejectedDrugIds = this.state.rejectedDrugIds.filter(item => item['drugId'] !== drugId);
        }
      }
    }
  };

  render() {
    let gridColumns = [...this.state.gridColumns];
    if (this.state.gridColumns.length > 0 && this.state.hiddenColumns.length > 0)
      gridColumns = this.state.gridColumns.filter(column => !this.state.hiddenColumns.includes(column['key']));
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
                        data.baseFormulary,
                        false
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
                        data.referenceFormulary,
                        false
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
                        data.baseOnly,
                        false
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
                        `${this.props.formularyType} - ${data.name}: Reference Only`,
                        true,
                        data,
                        false,
                        this.props.referenceformulary['id_formulary'],
                        this.props.baseformulary['id_formulary'],
                        data.referenceOnly,
                        false
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
                        data,
                        false,
                        this.props.baseformulary['id_formulary'],
                        this.props.referenceformulary['id_formulary'],
                        data.nonMatch,
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
                handleAction={(type) => { this.onDialogAction(type) }}
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
                  columns={gridColumns}
                  scroll={{ x: 1000, y: 500 }}
                  enableResizingOfColumns={false}
                  data={this.state.drugGridData}
                  // pinning columns
                  isPinningEnabled={true}
                  // setting gear 1st column
                  enableSettings={true}
                  // checkbox 2nd column
                  customSettingIcon={this.state.checkbox ? null : "NONE"}
                  isRowSelectionEnabled={this.state.checkbox}
                  isRowSelectorCheckbox
                  getPerPageItemSize={this.onPageSize}
                  onGridPageChangeHandler={this.onGridPageChangeHandler}
                  clearFilterHandler={this.onClearFilterHandler}
                  applyFilter={this.onApplyFilterHandler}
                  getColumnSettings={this.onSettingsIconHandler}
                  rowSelectionChange={this.rowSelectionChange}
                  pageSize={this.listPayload.limit}
                  selectedCurrentPage={(this.listPayload.index / this.listPayload.limit + 1)}
                  totalRowsCount={this.state.dataCount}
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
                        false,
                        data,
                        false,
                        this.props.baseformulary['id_formulary'],
                        null,
                        data.baseFormulary,
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
                positiveActionText=""
                negativeActionText=""
                title={this.state.drugGridHeaderName}
                handleClose={() => this.toggleDrugsListGrid(null, null, null, true)}
                handleAction={(type) => { }}
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
                  columns={gridColumns}
                  scroll={{ x: 1000, y: 500 }}
                  enableResizingOfColumns={false}
                  data={this.state.drugGridData}
                  // pinning columns
                  isPinningEnabled={true}
                  // setting gear 1st column
                  enableSettings={true}
                  // checkbox 2nd column
                  // event reference for checkbox (mandotory if checkbox is true)
                  customSettingIcon={this.state.checkbox ? null : "NONE"}
                  isRowSelectionEnabled={this.state.checkbox}
                  isRowSelectorCheckbox
                  getPerPageItemSize={this.onPageSize}
                  onGridPageChangeHandler={this.onGridPageChangeHandler}
                  clearFilterHandler={this.onClearFilterHandler}
                  applyFilter={this.onApplyFilterHandler}
                  getColumnSettings={this.onSettingsIconHandler}
                  pageSize={this.listPayload.limit}
                  selectedCurrentPage={(this.listPayload.index / this.listPayload.limit + 1)}
                  totalRowsCount={this.state.dataCount}
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
