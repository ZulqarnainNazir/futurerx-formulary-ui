import React from "react";
import { connect } from "react-redux";

import { Table } from "antd";
import Grid from "@material-ui/core/Grid";
import FrxDrugGridContainer from "../../../../../../shared/FrxGrid/FrxDrugGridContainer";
import { PaColumns } from "../../../../../../../utils/grid/columns";
import { PAMock } from "../../../../../../../mocks/PAMock";
import Button from "../../../../../../shared/Frx-components/button/Button";
import { Row, Col } from "antd";
import PanelHeader from "../PanelHeader";
import {
  postCriteriaListPA,
  postApplyFormularyDrugPA,
  postFormularyDrugPA,
  getPaSummary,
} from "../../../../../../../redux/slices/formulary/pa/paActionCreation";
import * as constants from "../../../../../../../api/http-commons";
import getLobCode from "../../../../../Utils/LobUtils";
import { tierColumns } from "../../../../../../../utils/grid/columns";
import AdvanceSearchContainer from "../../../../../NewAdvanceSearch/AdvanceSearchContainer";
import { setAdvancedSearch } from "../../../../../../../redux/slices/formulary/advancedSearch/advancedSearchSlice";
import showMessage from "../../../../../Utils/Toast";

function mapDispatchToProps(dispatch) {
  return {
    postCriteriaListPA: (a) => dispatch(postCriteriaListPA(a)),
    postApplyFormularyDrugPA: (a) => dispatch(postApplyFormularyDrugPA(a)),
    postFormularyDrugPA: (a) => dispatch(postFormularyDrugPA(a)),
    getPaSummary: (a) => dispatch(getPaSummary(a)),
    setAdvancedSearch: (a) => dispatch(setAdvancedSearch(a)),
  };
}

const mapStateToProps = (state) => {
  return {
    current_formulary: state.application.formulary,
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
class PaRemove extends React.Component<any, any> {
  state = {
    paGroupDescriptions: [],
    isSearchOpen: false,
    fileValues: Array(),
    drugData: Array(),
    drugGridData: Array(),
    selectedCriteria: Array(),
    selectedDrugs: Array(),
    tierGridContainer: false,
    selectedRowKeys: [] as number[],
    fixedSelectedRows: [] as number[]
  };

  onSelectedRowKeysChange = (selectedRowKeys) => {
    this.state.selectedCriteria = [];
    if (selectedRowKeys && selectedRowKeys.length > 0) {
      this.state.selectedCriteria = selectedRowKeys.map((tierId) => tierId);
    }
  };
  componentDidMount() {
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
      .postCriteriaListPA(apiDetails)
      .then((json) => {
        let data: any = [];
        json.payload.result.map((obj) => {
          data.push({
            key: obj.id_pa_group_description,
            pa_group_description_name: obj.pa_group_description_name,
          });
        });
        this.setState({
          paGroupDescriptions: data,
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
    apiDetails["lob_type"] = this.props.formulary_lob_id;
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
      .postFormularyDrugPA(apiDetails)
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
          gridItem["tier"] = element.tier_value;
          gridItem["paGroupDescription"] = element.pa_group_description;
          gridItem["isUmCriteria"] = element.is_um_criteria;
          gridItem["paType"] = element.pa_type;
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
      apiDetails["lob_type"] = this.props.formulary_lob_id;
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
        .postApplyFormularyDrugPA(apiDetails)
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

            this.props
              .getPaSummary(this.props.current_formulary.id_formulary)
              .then((json) => {
                debugger;
                this.setState({ tierGridContainer: true });
              });
          } else {
            showMessage("Failure", "error");
          }
        });
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

  rowSelectionChangeFromCell = (
    key: string,
    selectedRow: any,
    isSelected: boolean
  ) => {
    console.log("data row ", selectedRow, isSelected);
    if (!selectedRow["isDisabled"]) {
      if (isSelected) {
        const data = this.state.drugGridData.map((d: any) => {
          if (d.key === selectedRow.key) d["isChecked"] = true;
          // else d["isChecked"] = false;
          return d;
        });
        const selectedRowKeys = [
          ...this.state.selectedRowKeys,
          selectedRow.key
        ];
        console.log("selected row keys ", selectedRowKeys);
        const selectedRows: number[] = selectedRowKeys.filter(
          k => this.state.fixedSelectedRows.indexOf(k) < 0
        );
        this.onSelectedTableRowChanged(selectedRowKeys);

        this.setState({ drugGridData: data });
      } else {
        const data = this.state.drugGridData.map((d: any) => {
          if (d.key === selectedRow.key) d["isChecked"] = false;
          // else d["isChecked"] = false;
          return d;
        });

        const selectedRowKeys: number[] = this.state.selectedRowKeys.filter(
          k => k !== selectedRow.key
        );
        const selectedRows = selectedRowKeys.filter(
          k => this.state.fixedSelectedRows.indexOf(k) < 0
        );

        this.onSelectedTableRowChanged(selectedRows);
        this.setState({
          drugGridData: data
        });
      }
    }
  };

  onSelectAllRows = (isSelected: boolean) => {
    const selectedRowKeys: number[] = [];
    const data = this.state.drugGridData.map((d: any) => {
      if (!d["isDisabled"]) {
        d["isChecked"] = isSelected;
        if (isSelected) selectedRowKeys.push(d["key"]);
      }

      // else d["isSelected"] = false;
      return d;
    });
    const selectedRows: number[] = selectedRowKeys.filter(
      k => this.state.fixedSelectedRows.indexOf(k) < 0
    );
    this.onSelectedTableRowChanged(selectedRows);
    this.setState({ drugGridData: data });
  };

  render() {
    const columns = [
      {
        title: "PA GROUP DESCRIPTION",
        dataIndex: "pa_group_description_name",
        key: "pa_group_description_name",
      },
    ];
    const searchProps = {
      lobCode: this.props.lobCode,
      // pageType: pageTypes.TYPE_TIER
    };
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
                  enableSettings
                  columns={PaColumns()}
                  scroll={{ x: 2000, y: 377 }}
                  isFetchingData={false}
                  enableResizingOfColumns
                  data={this.state.drugGridData}
                  rowSelectionChangeFromCell={this.rowSelectionChangeFromCell}
                  onSelectAllRows={this.onSelectAllRows}
                  customSettingIcon={"FILL-DOT"}
                  settingsWidth={30}
                  // rowSelection={{
                  //   columnWidth: 50,
                  //   fixed: true,
                  //   type: "checkbox",
                  //   onChange: this.onSelectedTableRowChanged,
                  // }}
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

export default connect(mapStateToProps, mapDispatchToProps)(PaRemove);
