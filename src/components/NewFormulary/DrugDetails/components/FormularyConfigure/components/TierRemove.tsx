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
import { tierColumns } from "../../../../../../utils/grid/columns";
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
        { key: commonConstants.KEY_INDEX, value: 0 },
        { key: commonConstants.KEY_LIMIT, value: 10 },
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

      const drugGridData = this.props
        .postTierApplyInfo(apiDetails)
        .then((json) => {
          //debugger;
          let tmpData = json.payload.result;
          var data: any[] = [];
          let count = 1;
          var gridData = tmpData.map(function (el) {
            var element = Object.assign({}, el);
            data.push(element);
            let gridItem = {};
            gridItem["id"] = count;
            gridItem["key"] = count;
            gridItem["tier"] = element.tier_value;
            gridItem["fileType"] = element.file_type
              ? "" + element.file_type
              : "";
            gridItem["dataSource"] = element.data_source
              ? "" + element.data_source
              : "";
            gridItem["labelName"] = element.drug_label_name
              ? "" + element.drug_label_name
              : "";
            gridItem["ndc"] = "";
            gridItem["rxcui"] = element.rxcui ? "" + element.rxcui : "";
            gridItem["gpi"] = element.generic_product_identifier
              ? "" + element.generic_product_identifier
              : "";
            gridItem["trademark"] = element.trademark_code
              ? "" + element.trademark_code
              : "";
            gridItem["databaseCategory"] = element.database_category
              ? "" + element.database_category
              : "";
            count++;
            return gridItem;
          });
          this.setState({
            drugData: data,
            drugGridData: gridData,
          });
        });
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
    this.populateGridData();
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
              <div className="header space-between pr-10">
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
                  onSearch={() => {}}
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
