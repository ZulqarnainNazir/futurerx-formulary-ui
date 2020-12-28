import React from "react";
import { connect } from "react-redux";

import FrxDrugGridContainer from "../../../../../shared/FrxGrid/FrxDrugGridContainer";
import {
  getStDetails,
  getStDetailsCol2,
} from "../../FormularyConfigure/DrugGridColumn";
import { stData, stDataTableTwo } from "../../../../../../mocks/DrugGridMock";
import "../../../../../ClaimsGrid/ClaimsGrid.scss";
import "./STRemove.scss";
import * as constants from "../../../../../../api/http-commons";
import getLobCode from "../../../../Utils/LobUtils";
import { stColumns } from "../../../../../../utils/grid/columns";
import AdvancedSearch from "./search/AdvancedSearch";
import showMessage from "../../../../Utils/Toast";
import Button from "../../../../../shared/Frx-components/button/Button";
import { Row, Col } from "antd";
import { Table } from "antd";
import Grid from "@material-ui/core/Grid";
import {
  postCriteriaListST,
  postApplyFormularyDrugST,
  postFormularyDrugST,
  getStSummary,
} from "../../../../../../redux/slices/formulary/stepTherapy/stepTherapyActionCreation";
import AdvanceSearchContainer from "../../../../NewAdvanceSearch/AdvanceSearchContainer";
import { setAdvancedSearch } from "../../../../../../redux/slices/formulary/advancedSearch/advancedSearchSlice";

function mapDispatchToProps(dispatch) {
  return {
    postCriteriaListST: (a) => dispatch(postCriteriaListST(a)),
    postApplyFormularyDrugST: (a) => dispatch(postApplyFormularyDrugST(a)),
    postFormularyDrugST: (a) => dispatch(postFormularyDrugST(a)),
    getStSummary: (a) => dispatch(getStSummary(a)),
    setAdvancedSearch: (a) => dispatch(setAdvancedSearch(a)),
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
  };
};

class DrugGrid extends React.Component<any, any> {
  state = {
    isFetchingData: false,
    data: [] as any[],
    filteredData: [] as any[],
    filteredDataForTwo: [] as any[],
    stGroupDescriptions: [],
    isSearchOpen: false,
    fileValues: Array(),
    drugData: Array(),
    drugGridData: Array(),
    selectedCriteria: Array(),
    selectedDrugs: Array(),
    tierGridContainer: false,
  };

  onSelectedRowKeysChange = (selectedRowKeys) => {
    this.state.selectedCriteria = [];
    if (selectedRowKeys && selectedRowKeys.length > 0) {
      this.state.selectedCriteria = selectedRowKeys.map((tierId) => tierId);
    }
  };

  advanceSearchClickHandler = (event) => {
    event.stopPropagation();
    this.setState({ isSearchOpen: !this.state.isSearchOpen });
  };
  advanceSearchClosekHandler = () => {
    this.setState({ isSearchOpen: !this.state.isSearchOpen });
  };
  componentWillReceiveProps(nextProps) {
    //this.initialize(nextProps);
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

  componentDidMount() {
    //fetch data from API
    const data = stData();
    const data2 = stDataTableTwo();
    this.setState({ data, filteredData: data });
    this.setState({ data2, filteredDataForTwo: data2 });

    let apiDetails = {};

    apiDetails["pathParams"] =
      this.props?.formulary_id +
      "/" +
      getLobCode(this.props?.formulary_lob_id) +
      "/";
    apiDetails["keyVals"] = [
      { key: constants.KEY_ENTITY_ID, value: this.props?.formulary_id },
    ];
    apiDetails["messageBody"] = {};

    const drugGridDate = this.props
      .postCriteriaListST(apiDetails)
      .then((json) => {
        let data: any = [];
        json.payload.result.map((obj) => {
          data.push({
            key: obj.id_st_group_description,
            st_group_description_name: obj.st_group_description_name,
          });
        });
        this.setState({
          stGroupDescriptions: data,
        });
      });
  }

  openTierGridContainer = () => {
    this.state.drugData = [];
    this.state.drugGridData = [];

    this.populateGridData();
  };

  onSelectedTableRowChanged = (selectedRowKeys) => {
    this.state.selectedDrugs = [];
    if (selectedRowKeys && selectedRowKeys.length > 0) {
      this.state.selectedDrugs = selectedRowKeys.map(
        (tierId) => this.state.drugData[tierId - 1]["md5_id"]
      );
    }
  };
  populateGridData = (searchBody = null) => {
    console.log("Populate grid data is called");
    let apiDetails = {};

    apiDetails["pathParams"] =
      this.props?.formulary_id + "/" + getLobCode(this.props?.formulary_lob_id);
    apiDetails["keyVals"] = [
      { key: constants.KEY_ENTITY_ID, value: this.props?.formulary_id },
      { key: constants.KEY_INDEX, value: 0 },
      { key: constants.KEY_LIMIT, value: 10 },
    ];
    apiDetails["messageBody"] = {};

    if (searchBody) {
      apiDetails["messageBody"] = Object.assign(
        apiDetails["messageBody"],
        searchBody
      );
    }

    if (this.state.selectedCriteria === null) {
      showMessage("Select criteria to remove Drugs", "info");
      return;
    }

    apiDetails["messageBody"][
      "selected_criteria_ids"
    ] = this.state.selectedCriteria;

    const drugGridDate = this.props
      .postFormularyDrugST(apiDetails)
      .then((json) => {
        let tmpData = json.payload.result;
        var data: any[] = [];
        let count = 1;
        var gridData = tmpData.map(function (el) {
          var element = Object.assign({}, el);
          data.push(element);
          let gridItem = {};
          gridItem["id"] = count;
          gridItem["key"] = count;
          gridItem["stGroupDescription"] = element.st_group_description;
          gridItem["stType"] = element.st_type;
          gridItem["stValue"] = element.st_value;
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

        this.setState({ tierGridContainer: true });
      });
  };

  handleSave = () => {
    if (this.state.selectedDrugs && this.state.selectedDrugs.length > 0) {
      let apiDetails = {};
      //apiDetails['apiPart'] = constants.APPLY_TIER;
      apiDetails["pathParams"] =
        this.props?.formulary_id +
        "/" +
        getLobCode(this.props?.formulary_lob_id) +
        "/" +
        constants.TYPE_REMOVE;
      apiDetails["keyVals"] = [
        { key: constants.KEY_ENTITY_ID, value: this.props?.formulary_id },
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
      apiDetails["messageBody"]["selected_drug_ids"] = this.state.selectedDrugs;

      const saveData = this.props
        .postApplyFormularyDrugST(apiDetails)
        .then((json) => {
          console.log("Save response is:" + JSON.stringify(json));
          if (
            json.payload &&
            json.payload.code &&
            json.payload.code === "200"
          ) {
            showMessage("Success", "success");
            this.state.drugData = [];
            this.state.drugGridData = [];
            this.populateGridData();
            this.props.getStSummary(this.props?.formulary_id).then((json) => {
              this.setState({ tierGridContainer: true });
            });
          } else {
            showMessage("Failure", "error");
          }
        });
    }
  };

  handleSearch = (searchObject) => {
    console.log(searchObject);
    this.setState({ isFetchingData: true });
    if (searchObject && searchObject.status) {
      setTimeout(() => {
        const newData = this.state.data.filter(
          (d) => d.status === searchObject.status
        );
        this.setState({ isFetchingData: false, filteredData: newData });
      }, 2000);
    } else {
      this.setState({ isFetchingData: false });
    }
  };
  render() {
    const columns = [
      {
        title: "ST GROUP DESCRIPTION",
        dataIndex: "st_group_description_name",
        key: "st_group_description_name",
      },
    ];
    const searchProps = {
      lobCode: this.props.lobCode,
      // pageType: pageTypes.TYPE_TIER
    };
    return (
      <>
        <div className="bordered ns-border">
          <div className="header">Drug Grid</div>
          <Grid item xs={5}>
            <div className="tier-grid-remove-container">
              <Table
                columns={columns}
                dataSource={this.state.stGroupDescriptions}
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
        <br />
        <div className="white-bg">
          <Row justify="end">
            <Col>
              <Button
                label="Apply"
                onClick={this.openTierGridContainer}
                disabled={this.props.configureSwitch}
              />
            </Col>
          </Row>
        </div>
        {this.state.tierGridContainer && (
          <div className="select-drug-from-table">
            <div className="bordered white-bg">
              <div className="header space-between pr-10">
                <div className="button-wrapper">
                  <Button
                    className="Button normal"
                    label="Advance Search"
                    onClick={this.advanceSearchClickHandler}
                    disabled={this.props.configureSwitch}
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
                  gridName="DRUG GRID"
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
              <AdvanceSearchContainer
                {...searchProps}
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

export default connect(mapStateToProps, mapDispatchToProps)(DrugGrid);
