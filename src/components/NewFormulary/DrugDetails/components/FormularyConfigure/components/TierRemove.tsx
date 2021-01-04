import React from "react";
import { connect } from "react-redux";

import "./Tier.scss";
import { Table } from "antd";
import Grid from "@material-ui/core/Grid";
import { Row, Col } from "antd";
import Button from "../../../../../shared/Frx-components/button/Button";
import AdvanceSearchContainer from "../../../../NewAdvanceSearch/AdvanceSearchContainer";
import * as tierConstants from "../../../../../../api/http-tier";
import * as commonConstants from "../../../../../../api/http-commons";
import FrxDrugGridContainer from "../../../../../shared/FrxGrid/FrxDrugGridContainer";
import { tierColumns, tierColumnsNonMcr } from "../../../../../../utils/grid/columns";
import DropDown from "../../../../../shared/Frx-components/dropdown/DropDown";
import {
  postTierApplyInfo,
  getTier,
} from "../../../../../../redux/slices/formulary/tier/tierActionCreation";
import { setAdvancedSearch } from "../../../../../../redux/slices/formulary/advancedSearch/advancedSearchSlice";
import showMessage from "../../../../Utils/Toast";

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
  selectedCriteria: any[];
  selectedDrugs: any[];
  hiddenColumns: any[];
  selectedRowKeys: any[];
  dataCount: any;
}

const mapStateToProps = (state) => {
  return {
    configureSwitch: state.switchReducer.configureSwitch,
    tierData: state.tierSliceReducer.data,
    applyData: state.tierSliceReducer.applyData,
    formulary_id: state?.application?.formulary_id,
    formulary: state?.application?.formulary,
    formulary_lob_id: state?.application?.formulary_lob_id,
    formulary_type_id: state?.application?.formulary_type_id,
    advancedSearchBody: state?.advancedSearch?.advancedSearchBody,
    populateGrid: state?.advancedSearch?.populateGrid,
    closeDialog: state?.advancedSearch?.closeDialog,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    postTierApplyInfo: (a) => dispatch(postTierApplyInfo(a)),
    getTier: (a) => dispatch(getTier(a)),
    setAdvancedSearch: (a) => dispatch(setAdvancedSearch(a)),
  };
}

class TierRemove extends React.Component<any, tabsState> {
  state = {
    tierGridContainer: false,
    isSearchOpen: false,
    tierValues: Array(),
    fileValues: Array(),
    drugData: Array(),
    drugGridData: Array(),
    selectedCriteria: Array(),
    selectedDrugs: Array(),
    selectedTier: -1,
    selectedFileKey: null,
    selectedFileType: "Full Formulary",
    fileTypes: [
      { type: "FRF", key: "FRF" },
      { type: "ORF/ERF", key: "OTC" },
      { type: "Non FRF Products", key: "NONFRF" },
      { type: "FRF Change Report", key: "FRFCR" },
      { type: "Full Formulary", key: "MCR" },
    ],
    index: 0,
    limit: 10,
    filter: Array(),
    sort_by: Array(),
    hiddenColumns: Array(),
    dataCount: 0,
    selectedRowKeys: Array(),
  };

  constructor(props) {
    super(props);

    var tierOptions = Array();
    if (this.props["tierData"] && this.props["tierData"].length > 0) {
      this.props["tierData"].map((tier) => {
        tierOptions.push(tier.tier_value);
      });
    }
    let fileTypesModified: any[] = [];

    this.state.fileTypes.map((fileType) => {
      if (fileType.type === "Full Formulary") {
        fileType.key = this.props.lobCode;
      }
      fileTypesModified.push(fileType);
      this.state.fileValues.push(fileType.type);
    });
    this.state.fileTypes = fileTypesModified;
    this.state.tierValues = tierOptions;
    this.state.selectedFileKey = this.props.lobCode;
  }

  onSettingsIconHandler = (hiddenColumn, visibleColumn) => {
    console.log(
      "Settings icon handler: Hidden" +
      JSON.stringify(hiddenColumn) +
      " Visible:" +
      JSON.stringify(visibleColumn)
    );
    if (hiddenColumn && hiddenColumn.length > 0) {
      let hiddenColumnKeys = hiddenColumn.map(column => column["key"]);
      this.setState({
        hiddenColumns: hiddenColumnKeys
      });
    }
  };
  onApplyFilterHandler = filters => {
    console.log("filtering from be:" + (JSON.stringify(filters)));
    this.state.filter = Array();
    const fetchedKeys = Object.keys(filters);
    if (fetchedKeys && fetchedKeys.length > 0) {
      fetchedKeys.map(fetchedProps => {
        if (filters[fetchedProps]) {
          const fetchedOperator =
            filters[fetchedProps][0].condition === "is like"
              ? "is_like"
              : filters[fetchedProps][0].condition === "is not"
                ? "is_not"
                : filters[fetchedProps][0].condition === "is not like"
                  ? "is_not_like"
                  : filters[fetchedProps][0].condition === "does not exist"
                    ? "does_not_exist"
                    : filters[fetchedProps][0].condition;
          const fetchedValues =
            filters[fetchedProps][0].value !== ""
              ? [filters[fetchedProps][0].value.toString()]
              : [];
          this.state.filter.push({
            prop: fetchedProps,
            operator: fetchedOperator,
            values: fetchedValues
          });
        }
      });
      console.log("Filters:" + JSON.stringify(this.state.filter));
      if (this.props.advancedSearchBody) {
        this.populateGridData(this.props.advancedSearchBody);
      } else {
        this.populateGridData();
      }
    }
  };

  /**
   * the selected sorter details will be availbale here to mak api call
   * @param key the column key
   * @param order the sorting order : 'ascend' | 'descend'
   */
  onApplySortHandler = (key, order) => {
    console.log("sort details ", key, order);
    this.state.sort_by = Array();
    if (order) {
      let sortOrder = order === 'ascend' ? 'asc' : 'desc';
      this.state.sort_by = this.state.sort_by.filter(keyPair => keyPair['key'] !== key);
      this.state.sort_by.push({ key: key, value: sortOrder });
    }
    if (this.props.advancedSearchBody) {
      this.populateGridData(this.props.advancedSearchBody);
    } else {
      this.populateGridData();
    }
  };
  onPageSize = pageSize => {
    console.log("Page size load");
    this.state.limit = pageSize;
    if (this.props.advancedSearchBody) {
      this.populateGridData(this.props.advancedSearchBody);
    } else {
      this.populateGridData();
    }
  };
  onGridPageChangeHandler = (pageNumber: any) => {
    console.log("Page change load");
    this.state.index = (pageNumber - 1) * this.state.limit;
    if (this.props.advancedSearchBody) {
      this.populateGridData(this.props.advancedSearchBody);
    } else {
      this.populateGridData();
    }
  };
  onClearFilterHandler = () => {
    this.state.filter = Array();
    if (this.props.advancedSearchBody) {
      this.populateGridData(this.props.advancedSearchBody);
    } else {
      this.populateGridData();
    }
  };

  populateGridData = (searchBody = null) => {
    if (this.state.selectedCriteria && this.state.selectedCriteria.length > 0) {
      let apiDetails = {};
      apiDetails["apiPart"] =
        this.state.selectedFileKey === this.props.lobCode
          ? tierConstants.FORMULARY_DRUGS_TIER
          : tierConstants.DRUGS_TIER;
      apiDetails["pathParams"] =
        this.props?.formulary_id +
        "/" +
        this.state.selectedFileKey +
        "/" +
        commonConstants.TYPE_REMOVE;
      apiDetails["keyVals"] = [
        { key: commonConstants.KEY_ENTITY_ID, value: this.props?.formulary_id },
        { key: commonConstants.KEY_INDEX, value: this.state.index },
        { key: commonConstants.KEY_LIMIT, value: this.state.limit },
      ];
      apiDetails["messageBody"] = {};
      if (
        this.state.selectedCriteria &&
        this.state.selectedCriteria.length > 0
      ) {
        apiDetails["messageBody"][
          "selected_criteria_ids"
        ] = this.state.selectedCriteria;
      }

      if (searchBody) {
        apiDetails["messageBody"] = Object.assign(
          apiDetails["messageBody"],
          searchBody
        );
      }

      apiDetails['messageBody']['filter'] = this.state.filter;

      if (this.state.sort_by && this.state.sort_by.length > 0) {
        let keys = Array();
        let values = Array();

        this.state.sort_by.map(keyPair => {
          keys.push(keyPair['key']);
          values.push(keyPair['value']);
        });

        apiDetails['messageBody']['sort_by'] = keys;
        apiDetails['messageBody']['sort_order'] = values;
      }

      const thisRef = this;
      const drugGridData = this.props
        .postTierApplyInfo(apiDetails)
        .then((json) => {
          //debugger;
          if(json.payload && json.payload.result){
          let tmpData = json.payload.result;
          var data: any[] = [];
          let count = 1;
          var gridData = tmpData.map(function (el) {
            var element = Object.assign({}, el);
            data.push(element);
            let gridItem = {};
            gridItem["id"] = count;
            gridItem["key"] = count;
            gridItem["tier_value"] = element.tier_value;
            gridItem["file_type"] = element.file_type
              ? "" + element.file_type
              : "";
            gridItem["data_source"] = element.data_source
              ? "" + element.data_source
              : "";
            gridItem["drug_label_name"] = element.drug_label_name
              ? "" + element.drug_label_name
              : "";
            gridItem["ndc"] = "";
            if (thisRef.props.lobCode === 'MCR') {
              gridItem["rxcui"] = element.rxcui ? "" + element.rxcui : "";
            } else {
              gridItem["drug_descriptor_identifier"] = element.drug_descriptor_identifier ? "" + element.drug_descriptor_identifier : "";
            }
            gridItem["generic_product_identifier"] = element.generic_product_identifier
              ? "" + element.generic_product_identifier
              : "";
            gridItem["trademark_code"] = element.trademark_code
              ? "" + element.trademark_code
              : "";
            gridItem["database_category"] = element.database_category
              ? "" + element.database_category
              : "";
            count++;
            return gridItem;
          });
          this.setState({
            drugData: data,
            drugGridData: gridData,
            dataCount: json.payload.count,
          });
        }});
    }
  };

  handleSave = () => {
    if (this.state.selectedDrugs && this.state.selectedDrugs.length > 0) {
      let apiDetails = {};
      apiDetails["apiPart"] = tierConstants.APPLY_TIER;
      apiDetails["pathParams"] =
        this.props?.formulary_id +
        "/" +
        this.state.selectedFileKey +
        "/" +
        commonConstants.TYPE_REMOVE;
      apiDetails["keyVals"] = [];
      apiDetails["messageBody"] = {};
      if (
        this.state.selectedCriteria &&
        this.state.selectedCriteria.length > 0
      ) {
        apiDetails["messageBody"][
          "selected_criteria_ids"
        ] = this.state.selectedCriteria;
      }
      apiDetails["messageBody"]["selected_drug_ids"] = this.state.selectedDrugs;

      const saveData = this.props.postTierApplyInfo(apiDetails).then((json) => {
        console.log("Save response is:" + JSON.stringify(json));
        if (json.payload && json.payload.code && json.payload.code === "200") {
          showMessage("Success", "success");
          this.state.drugData = [];
          this.state.drugGridData = [];
          this.populateGridData();
          apiDetails = {};
          apiDetails["apiPart"] = tierConstants.FORMULARY_TIERS;
          apiDetails["pathParams"] = this.props?.formulary_id;
          apiDetails["keyVals"] = [
            {
              key: commonConstants.KEY_ENTITY_ID,
              value: this.props?.formulary_id,
            },
          ];

          const TierDefinationData = this.props
            .getTier(apiDetails)
            .then((json) => {
              this.setState({ tierGridContainer: true });
            });
        } else {
          showMessage("Failure", "error");
        }
      });
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.advancedSearchBody && nextProps.populateGrid) {
      this.populateGridData(nextProps.advancedSearchBody);
      let payload = {
        advancedSearchBody: nextProps.advancedSearchBody,
        populateGrid: false,
        closeDialog: nextProps.closeDialog,
        listItemStatus: nextProps.listItemStatus,
      };
      if (nextProps.closeDialog) {
        this.state.isSearchOpen = false;
        payload["closeDialog"] = false;
      }
      this.props.setAdvancedSearch(payload);
    }
  }

  onSelectedRowKeysChange = (selectedRowKeys) => {
    this.state.selectedCriteria = [];
    if (selectedRowKeys && selectedRowKeys.length > 0) {
      this.state.selectedCriteria = selectedRowKeys.map((tierId) => tierId);
    }
  };

  onSelectedTableRowChanged = (selectedRowKeys) => {
    this.state.selectedDrugs = [];
    if (selectedRowKeys && selectedRowKeys.length > 0) {
      this.state.selectedDrugs = selectedRowKeys.map((tierId) =>
        this.state.drugData[tierId - 1]["formulary_drug_id"]
          ? this.state.drugData[tierId - 1]["formulary_drug_id"]
          : this.state.drugData[tierId - 1]["drug_id"]
      );
    }
    console.log('Selected drugs:'+JSON.stringify(this.state.selectedDrugs));
  };

  rowSelectionChangeFromCell = (
    key: string,
    selectedRow: any,
    isSelected: boolean
  ) => {
    console.log("data row ", selectedRow, isSelected, selectedRow["isDisabled"]);
    if (!selectedRow["isDisabled"]) {
      if (isSelected) {
        const data = this.state.drugGridData.map((d: any) => {
          if (d.key === selectedRow.key) {
            d["isChecked"] = true;
            d["rowStyle"] = "table-row--red-font";
          }
          // else d["isChecked"] = false;
          return d;
        });

        if (!this.state.selectedRowKeys.includes(selectedRow.key)) {
          this.state.selectedRowKeys.push(selectedRow.key);
        }
        this.onSelectedTableRowChanged(this.state.selectedRowKeys);

        this.setState({ drugGridData: data });
      } else {
        const data = this.state.drugGridData.map((d: any) => {
          if (d.key === selectedRow.key) {
            d["isChecked"] = false;
            if (d["rowStyle"])
              delete d["rowStyle"];
          }
          // else d["isChecked"] = false;
          return d;
        });

        this.state.selectedRowKeys = this.state.selectedRowKeys.filter(rowKey => rowKey !== selectedRow.key);
        console.log('Selected row keys:'+JSON.stringify(this.state.selectedRowKeys));
        this.onSelectedTableRowChanged(this.state.selectedRowKeys);

        this.setState({
          drugGridData: data
        });
      }
    }
  };

  onSelectAllRows = (isSelected: boolean) => {
    const selectedRowKeys: number[] = [];
    this.state.selectedRowKeys = Array();
    const data = this.state.drugGridData.map((d: any) => {
      if (!d["isDisabled"]) {
        d["isChecked"] = isSelected;
        if (isSelected) {
          selectedRowKeys.push(d["key"]);
          this.state.selectedRowKeys.push(d["key"]);
          d["rowStyle"] = "table-row--red-font";
        } else {
          if (d["rowStyle"])
            delete d["rowStyle"]
        }
      }

      // else d["isSelected"] = false;
      return d;
    });
    this.onSelectedTableRowChanged(selectedRowKeys);
    this.setState({ drugGridData: data });
  };


  fileTypeDropDownSelectHandler = (value, event) => {
    let fileType = event.value.toString().trim();
    let fileKey = this.props.lobCode;

    if (fileType) {
      let filtered = this.state.fileTypes.filter(
        (fileObject) => fileObject.type.toString().trim() === fileType
      );
      if (filtered && filtered.length > 0) {
        fileKey = filtered[0].key;
      }
    }
    console.log("Selected file key is:" + fileKey);
    this.setState({ selectedFileKey: fileKey });

    this.populateGridData();
  };

  openTierGridContainer = () => {
    this.setState({ tierGridContainer: true });
    this.state.drugData = [];
    this.state.drugGridData = [];
    if (this.props.advancedSearchBody) {
      this.populateGridData(this.props.advancedSearchBody);
    } else {
      this.populateGridData();
    }
  };
  advanceSearchClickHandler = (event) => {
    event.stopPropagation();
    this.setState({ isSearchOpen: !this.state.isSearchOpen });
  };
  advanceSearchClosekHandler = () => {
    this.setState({ isSearchOpen: !this.state.isSearchOpen });
  };

  render() {
    const dataSource: any[] = [];

    if (this.props["tierData"].length > 0) {
      this.props["tierData"].map((tier) => {
        if (tier.added_count > 0) {
          dataSource.push({ key: tier.id_tier, tierName: tier.tier_name });
        }
      });
    }

    const columns = [
      {
        title: "Tier Name",
        dataIndex: "tierName",
        key: "tierName",
      },
    ];
    let gridColumns = this.props.lobCode === 'MCR' ? tierColumns() : tierColumnsNonMcr();
    if (this.state.hiddenColumns.length > 0) {
      gridColumns = gridColumns.filter(key => !this.state.hiddenColumns.includes(key));
    }
    return (
      <>
        {!this.props.configureSwitch && (
          <div className="white-bg">
            <Grid item xs={5}>
              <div className="tier-grid-remove-container">
                <Table
                  columns={columns}
                  dataSource={dataSource}
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
            <Row justify="end">
              <Col>
                <Button
                  label="Apply"
                  onClick={this.openTierGridContainer}
                ></Button>
              </Col>
            </Row>
          </div>
        )}
        {this.state.tierGridContainer && !this.props.configureSwitch && (
          <div className="select-drug-from-table">
            <div className="bordered white-bg">
              <div className="header remove-btn-wrapper-right pr-10">
                <div className="button-wrapper">
                  <Button
                    className="Button normal"
                    label="Advance Search"
                    onClick={this.advanceSearchClickHandler}
                  />
                  <Button label="Save" onClick={this.handleSave} />
                </div>
              </div>

              <div className="tier-grid-container">
                <FrxDrugGridContainer
                  isPinningEnabled={false}
                  enableSearch={false}
                  enableColumnDrag
                  settingsWidth={50}
                  onSearch={() => { }}
                  fixedColumnKeys={[]}
                  pagintionPosition="topRight"
                  gridName="TIER"
                  enableSettings
                  columns={gridColumns}
                  scroll={{ x: 2000, y: 377 }}
                  isFetchingData={false}
                  enableResizingOfColumns
                  data={this.state.drugGridData}
                  rowSelectionChangeFromCell={this.rowSelectionChangeFromCell}
                  onSelectAllRows={this.onSelectAllRows}
                  customSettingIcon={"FILL-DOT"}
                  totalRowsCount={this.state.dataCount}
                  getPerPageItemSize={this.onPageSize}
                  onGridPageChangeHandler={this.onGridPageChangeHandler}
                  clearFilterHandler={this.onClearFilterHandler}
                  applyFilter={this.onApplyFilterHandler}
                  applySort={this.onApplySortHandler}
                  getColumnSettings={this.onSettingsIconHandler}
                  pageSize={this.state.limit}
                  selectedCurrentPage={
                    this.state.index / this.state.limit + 1
                  }
                />
              </div>
            </div>
            {this.state.isSearchOpen ? (
              <AdvanceSearchContainer
                openPopup={this.state.isSearchOpen}
                onClose={this.advanceSearchClosekHandler}
                isAdvanceSearch={true}
              />
            ) : null}
          </div>
        )}
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TierRemove);
