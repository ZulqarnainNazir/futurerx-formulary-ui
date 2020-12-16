import React from "react";
import { connect } from "react-redux";
import PanelHeader from "./PanelHeader";
import PanelGrid from "./panelGrid";
import CustomizedSwitches from "./CustomizedSwitches";
import { TabInfo } from "../../../../../../models/tab.model";
import FrxMiniTabs from "../../../../../shared/FrxMiniTabs/FrxMiniTabs";
import Button from "../../../../../shared/Frx-components/button/Button";
import { textFilters } from "../../../../../../utils/grid/filters";
import { getDrugDetailsColumn } from "../DrugGridColumn";
import { getDrugDetailData } from "../../../../../../mocks/DrugGridMock";
import FrxLoader from "../../../../../shared/FrxLoader/FrxLoader";
import DrugGrid from "../../DrugGrid";
import AdvancedSearch from "./search/AdvancedSearch";
import { getDrugDetailsAFSummary, getDrugDetailsAFList } from "../../../../../../redux/slices/formulary/drugDetails/af/afActionCreation";
import FrxDrugGridContainer from "../../../../../shared/FrxGrid/FrxDrugGridContainer";

function mapDispatchToProps(dispatch) {
  return {
    getDrugDetailsAFSummary: (a) => dispatch(getDrugDetailsAFSummary(a)),
    getDrugDetailsAFList: (a) => dispatch(getDrugDetailsAFList(a)),
  };
}

class DrugDetailAF extends React.Component<any, any> {
  state = {
    isSearchOpen: false,
    panelGridTitle1: ["", "NUMBER OF DRUGS", "ADDED DRUGS", "REMOVED DRUGS"],
    panelTitleAlignment1: ["left", "center", "center", "center"],
    panelGridValue1: [["Abridged Formulary", "0", "0", "0"]],
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
  };

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

    // this.setState({
    //   columns: columns,
    //   data: data,
    // });

    this.props.getDrugDetailsAFSummary().then((json) => {
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
      });
    });

    this.props.getDrugDetailsAFList().then((json) => {
      let tmpData = json.payload.result;
      console.log(
        "----------The Get Drug Details AF list response = ",
        tmpData
      );
      var data: any[] = [];
      let count = 1;
      var gridData = tmpData.map((el) => {
        var element = Object.assign({}, el);
        data.push(element);
        let gridItem = {};
        gridItem["id"] = count;
        gridItem["key"] = count;
        gridItem["labelName"] = element.drug_label_name
          ? "" + element.drug_label_name
          : "";
        gridItem["tier"] = element.tier_value;
        gridItem["fileType"] = element.file_type ? "" + element.file_type : "";
        gridItem["dataSource"] = element.data_source
          ? "" + element.data_source
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
        gridItem["databaseClass"] = element.database_class
          ? "" + element.database_class
          : "";
        gridItem["createdBy"] = element.created_by
          ? "" + element.created_by
          : "";
        gridItem["createdOn"] = element.created_date
          ? "" + element.created_date
          : "";
        gridItem["modifiedBy"] = element.modified_by
          ? "" + element.modified_by
          : "";
        gridItem["modifiedOn"] = element.modified_date
          ? "" + element.modified_date
          : "";
        gridItem["paGroupDescription"] = element.pa_group_description
          ? "" + element.pa_group_description
          : "";
        gridItem["paType"] = element.pa_type ? "" + element.pa_type : "";
        gridItem["stGroupDescription"] = element.st_group_description
          ? "" + element.st_group_description
          : "";
        gridItem["stepTherapyType"] = element.st_type
          ? "" + element.st_type
          : "";
        gridItem["stepTherapyValue"] = element.st_value
          ? "" + element.st_value
          : "";
        gridItem["qlType"] = element.ql_type ? "" + element.ql_type : "";
        gridItem["qlAmount"] = element.ql_amount ? "" + element.ql_amount : "";
        gridItem["qlDays"] = element.ql_days ? "" + element.ql_days : "";
        gridItem["moIndicator"] = element.is_mo ? "" + element.is_mo : "";
        gridItem["mnIndicator"] = element.is_nm ? "" + element.is_nm : "";
        gridItem["seniorSavingsModel"] = element.is_ssm
          ? "" + element.is_ssm
          : "";
        gridItem["indicatedBaseFormulary"] = element.is_ibf
          ? "" + element.is_ibf
          : "";
        gridItem["meshCui"] = element.is_ibf ? "" + element.is_ibf : "";
        gridItem["partialGapCoverage"] = element.is_pgc
          ? "" + element.is_pgc
          : "";
        count++;
        return gridItem;
      });
      this.setState({
        data: gridData,
      });
    });
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

  render() {
    let dataGrid = <FrxLoader />;
    if (this.state.data) {
      dataGrid = (
        // <DrugGrid columns={this.state.columns} data={this.state.data} />
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
          scroll={{ x: 2000, y: 377 }}
          isFetchingData={false}
          enableResizingOfColumns
          data={this.state.data}
          rowSelection={{
            columnWidth: 50,
            fixed: true,
            type: "checkbox",
            onChange: () => {},
          }}
        />
      );
    }

    return (
      <>
        <div className="bordered mb-10">
          <PanelHeader
            title="Abridged Formulary"
            tooltip="Define Abridged Formulary inclusion in Drug Grid below for marketing material considerations."
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
              <Button label="Save" onClick={this.saveClickHandler} disabled />
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

export default connect(null, mapDispatchToProps)(DrugDetailAF);
