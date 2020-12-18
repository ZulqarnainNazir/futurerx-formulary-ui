import React from "react";
import { connect } from "react-redux";
import PanelHeader from "./PanelHeader";
import PanelGrid from "./panelGrid";
import CustomizedSwitches from "./CustomizedSwitches";
import { TabInfo } from "../../../../../../models/tab.model";
import FrxMiniTabs from "../../../../../shared/FrxMiniTabs/FrxMiniTabs";
import Button from "../../../../../shared/Frx-components/button/Button";
import { getDrugDetailsColumn } from "../DrugGridColumn";
import { getDrugDetailData } from "../../../../../../mocks/DrugGridMock";
import { textFilters } from "../../../../../../utils/grid/filters";
import FrxLoader from "../../../../../shared/FrxLoader/FrxLoader";
import AdvancedSearch from "./search/AdvancedSearch";
import { getDrugDetailsFFFSummary, getDrugDetailsFFFList, postRemoveFFFDrug } from "../../../../../../redux/slices/formulary/drugDetails/fff/fffActionCreation";
import FrxDrugGridContainer from "../../../../../shared/FrxGrid/FrxDrugGridContainer";
import showMessage from "../../../../Utils/Toast";
import * as fffConstants from "../../../../../../api/http-drug-details";
import getLobCode from "../../../../Utils/LobUtils";

function mapDispatchToProps(dispatch) {
  return {
    getDrugDetailsFFFSummary: (a) => dispatch(getDrugDetailsFFFSummary(a)),
    getDrugDetailsFFFList: (a) => dispatch(getDrugDetailsFFFList(a)),
    postRemoveFFFDrug: (a) => dispatch(postRemoveFFFDrug(a)),
  };
}

const mapStateToProps = (state) => {
  return {
    formulary_id: state?.application?.formulary_id,
    formulary_lob_id: state?.application?.formulary_lob_id,
  };
};

class FFF extends React.Component<any, any> {
  state = {
    isSearchOpen: false,
    panelGridTitle1: [
      "Free First Fill",
      "Number of Drugs",
      "added drugs",
      "removed drugs",
    ],
    panelTitleAlignment1: ["left", "left", "left", "left"],
    panelGridValue1: [],
    activeTabIndex: 0,
    columns: null,
    data: [],
    tabs: [
      {
        id: 1,
        text: "Replace",
      },
      {
        id: 2,
        text: "Append",
      },
      {
        id: 3,
        text: "Remove",
      },
    ],
    selectedDrugs: Array(),
    drugData: Array(),
    lobCode: null,
  };

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

  advanceSearchClickHandler = (event) => {
    event.stopPropagation();
    this.setState({ isSearchOpen: !this.state.isSearchOpen });
  };

  advanceSearchClosekHandler = () => {
    this.setState({ isSearchOpen: !this.state.isSearchOpen });
  };

  saveClickHandler = () => {
    console.log("Save data");
    if (this.state.selectedDrugs && this.state.selectedDrugs.length > 0 && this.state.activeTabIndex === 0) {
      console.log("-----REMOVE method-------")
      let apiDetails = {};
      apiDetails['apiPart'] = fffConstants.APPLY_FFF_DRUG;
      apiDetails['keyVals'] = [{ key: fffConstants.KEY_ENTITY_ID, value: this.props?.formulary_id }];
      apiDetails['messageBody'] = {};
      apiDetails['messageBody']['selected_drug_ids'] = this.state.selectedDrugs;
      apiDetails['messageBody']['is_select_all'] = false;
      apiDetails['messageBody']['covered'] = {};
      apiDetails['messageBody']['not_covered'] = {};
      apiDetails['messageBody']['selected_criteria_ids'] = [];
      apiDetails['messageBody']['filter'] = [];
      apiDetails['messageBody']['search_key'] = "";
      apiDetails['messageBody']['limited_access'] = "";
      apiDetails['pathParams'] = this.props?.formulary_id + "/" + this.state.lobCode + "/" + fffConstants.TYPE_REMOVE;

      // Remove Drug method call
      this.props.postRemoveFFFDrug(apiDetails).then(json => {
        console.log("postRemoveFFFDrug - response is:" + JSON.stringify(json));
        if (json.payload && json.payload.code && json.payload.code === '200') {
          showMessage('Success', 'success');
          this.getFFFSummary();
          console.log("The Saved State = ", this.state);
        }else{
          showMessage('Failure', 'error');
        }
      });
    }
  };

  onSelectedTableRowChanged = (selectedRowKeys) => {
    this.state.selectedDrugs = [];
    if (selectedRowKeys && selectedRowKeys.length > 0) {
      let selDrugs = selectedRowKeys.map(ele => {
        return this.state.drugData[ele - 1]['md5_id'] ? this.state.drugData[ele - 1]['md5_id'] : ""
      });

      this.setState({ selectedDrugs: selDrugs })
    } else {
      this.setState({ selectedDrugs: [] })
    }
  }

  getFFFSummary = () => {
    let apiDetails = {};
    apiDetails['apiPart'] = fffConstants.GET_DRUG_SUMMARY_FFF;
    apiDetails['pathParams'] = this.props?.formulary_id;
    apiDetails['keyVals'] = [{ key: fffConstants.KEY_ENTITY_ID, value: this.props?.formulary_id }];

    this.props.getDrugDetailsFFFSummary(apiDetails).then((json) => {
      let tmpData =
        json.payload && json.payload.result ? json.payload.result : [];

      let rows = tmpData.map((ele) => {
        let curRow = [
          ele["attribute_name"],
          ele["total_drug_count"],
          ele["added_drug_count"],
          ele["removed_drug_count"],
        ];
        return curRow;
      });

      this.setState({
        panelGridValue1: rows,
        lobCode: getLobCode(this.props.formulary_lob_id),
      });
    });
  }

  getFFFDrugsList = () => {
    let apiDetails = {};
    apiDetails['apiPart'] = fffConstants.GET_FFF_FORMULARY_DRUGS;
    apiDetails['pathParams'] = this.props?.formulary_id + "/" + getLobCode(this.props.formulary_lob_id);
    apiDetails['keyVals'] = [{ key: fffConstants.KEY_ENTITY_ID, value: this.props?.formulary_id }, { key: fffConstants.KEY_INDEX, value: 0 }, { key: fffConstants.KEY_LIMIT, value: 10 }];
    apiDetails["messageBody"] = {};
    apiDetails["messageBody"]["selected_criteria_ids"] = ["Y"];

    this.props.getDrugDetailsFFFList(apiDetails).then((json) => {
      let tmpData = json.payload.result;
      var data: any[] = [];
      let count = 1;
      var gridData = tmpData.map((el) => {
        var element = Object.assign({}, el);
        data.push(element);
        let gridItem = {};
        gridItem["id"] = count;
        gridItem["key"] = count;
        gridItem["labelName"] = element.drug_label_name ? "" + element.drug_label_name : "";
        gridItem["tier"] = element.tier_value;
        gridItem["fileType"] = element.file_type ? "" + element.file_type : "";
        gridItem["dataSource"] = element.data_source ? "" + element.data_source : "";
        gridItem["ndc"] = "";
        gridItem["rxcui"] = element.rxcui ? "" + element.rxcui : "";
        gridItem["gpi"] = element.generic_product_identifier ? "" + element.generic_product_identifier : "";
        gridItem["trademark"] = element.trademark_code ? "" + element.trademark_code : "";
        gridItem["databaseCategory"] = element.database_category ? "" + element.database_category : "";
        gridItem["databaseClass"] = element.database_class ? "" + element.database_class : "";
        gridItem["createdBy"] = element.created_by ? "" + element.created_by : "";
        gridItem["createdOn"] = element.created_date ? "" + element.created_date : "";
        gridItem["modifiedBy"] = element.modified_by ? "" + element.modified_by : "";
        gridItem["modifiedOn"] = element.modified_date ? "" + element.modified_date : "";
        gridItem["paGroupDescription"] = element.pa_group_description ? "" + element.pa_group_description : "";
        gridItem["paType"] = element.pa_type ? "" + element.pa_type : "";
        gridItem["stGroupDescription"] = element.st_group_description ? "" + element.st_group_description : "";
        gridItem["stepTherapyType"] = element.st_type ? "" + element.st_type : "";
        gridItem["stepTherapyValue"] = element.st_value ? "" + element.st_value : "";
        gridItem["qlType"] = element.ql_type ? "" + element.ql_type : "";
        gridItem["qlAmount"] = element.ql_amount ? "" + element.ql_amount : "";
        gridItem["qlDays"] = element.ql_days ? "" + element.ql_days : "";
        gridItem["moIndicator"] = element.is_mo ? "" + element.is_mo : "";
        gridItem["mnIndicator"] = element.is_nm ? "" + element.is_nm : "";
        gridItem["seniorSavingsModel"] = element.is_ssm ? "" + element.is_ssm : "";
        gridItem["indicatedBaseFormulary"] = element.is_ibf ? "" + element.is_ibf : "";
        gridItem["meshCui"] = element.is_ibf ? "" + element.is_ibf : "";
        gridItem["partialGapCoverage"] = element.is_pgc ? "" + element.is_pgc : "";
        count++;
        return gridItem;
      });
      this.setState({
        drugData: data,
        data: gridData,
      });
    });
  }

  componentDidMount() {
    const data = getDrugDetailData();
    const columns = getDrugDetailsColumn();
    const FFFColumn: any = {
      id: 0,
      position: 0,
      textCase: "upper",
      pixelWidth: 238,
      sorter: {},
      isFilterable: true,
      showToolTip: false,
      key: "fff",
      displayTitle: "Free First Fill",
      filters: textFilters,
      dataType: "string",
      hidden: false,
      sortDirections: [],
    };
    columns.unshift(FFFColumn);
    for (let el of data) {
      el["fff"] = "Y";
    }
    this.getFFFSummary();
    this.getFFFDrugsList();
  }

  render() {
    let dataGrid = <FrxLoader />;
    if (this.state.data) {
      dataGrid = (
        <FrxDrugGridContainer
          isPinningEnabled={false}
          enableSearch={false}
          enableColumnDrag
          onSearch={() => {}}
          fixedColumnKeys={[]}
          pagintionPosition="topRight"
          gridName="DRUGSDETAILS"
          enableSettings={false}
          columns={getDrugDetailsColumn()}
          scroll={{ x: 5200, y: 377 }}
          isFetchingData={false}
          enableResizingOfColumns
          data={this.state.data}
          clearFilterHandler={() => {}}
          rowSelection={{
            columnWidth: 50,
            fixed: true,
            type: "checkbox",
            onChange: this.onSelectedTableRowChanged,
          }}
        />
      );
    }

    return (
      <>
        <div className="bordered mb-10">
          <PanelHeader
            title="Free First Fill"
            tooltip="ADD File or delete Free First Fill Status in Drug Grid below for the supplemental HPMS submission file and marketing material display."
          />
          <div className="inner-container bg-light-grey">
            <div className="mb-10">
              <PanelGrid
                panelGridTitle={this.state.panelGridTitle1}
                panelGridValue={this.state.panelGridValue1}
                panelTitleAlignment={this.state.panelTitleAlignment1}
              />
            </div>
            <div className="modify-wrapper bordered white-bg">
              <div className="modify-panel">
                <div className="icon">
                  <span>R</span>
                </div>
                <div className="switch-box">
                  <CustomizedSwitches
                    leftTitle="Modify"
                    rightTitle="view all"
                  />
                </div>
                <div className="mini-tabs">
                  <FrxMiniTabs
                    tabList={this.state.tabs}
                    activeTabIndex={this.state.activeTabIndex}
                    onClickTab={this.onClickTab}
                    disabledIndex={1}
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bordered">
          <div className="header space-between pr-10">
            Drug Grid
            <div className="button-wrapper">
              <Button
                className="Button normal"
                label="Advance Search"
                onClick={this.advanceSearchClickHandler}
              />
              <Button label="Save" onClick={this.saveClickHandler} disabled={!(this.state.selectedDrugs.length > 0)} />
            </div>
          </div>
          {dataGrid}
          {this.state.isSearchOpen ? (
            <AdvancedSearch
              category="Grievances"
              openPopup={this.state.isSearchOpen}
              onClose={this.advanceSearchClosekHandler}
            />
          ) : null}
        </div>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FFF);
