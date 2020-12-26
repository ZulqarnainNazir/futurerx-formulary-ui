import React from "react";
import { connect } from "react-redux";
import PanelHeader from "../../../../shared/Frx-components/panel-header/PanelHeader";
import PanelGrid from "../../../../shared/Frx-components/panel-grid/PanelGrid";
import CustomizedSwitches from "../FormularyConfigure/components/CustomizedSwitches";
import { TabInfo } from "../../../../../models/tab.model";
import FrxMiniTabs from "../../../../shared/FrxMiniTabs/FrxMiniTabs";
import Button from "../../../../shared/Frx-components/button/Button";
import { getDrugDetailsColumnPR } from "../../../DrugDetails/components/FormularyConfigure/DrugGridColumn";
import { getDrugDetailData } from "../../../../../mocks/DrugGridMock";
import FrxLoader from "../../../../shared/FrxLoader/FrxLoader";
import DrugGrid from "../../../DrugDetails/components/DrugGrid";
import AdvancedSearch from "../../../DrugDetails/components/FormularyConfigure/components/search/AdvancedSearch";
import { getDrugDetailsPRSummary, getPRSettings, getDrugDetailsPRList } from "../../../../../redux/slices/formulary/drugDetails/pr/prActionCreation";
import * as prConstants from "../../../../../api/http-drug-details";
import getLobCode from "../../../Utils/LobUtils";

import PrSettings from "./PrSettings";
import FrxDrugGridContainer from "../../../../shared/FrxGrid/FrxDrugGridContainer";

function mapDispatchToProps(dispatch) {
  return {
    getDrugDetailsPRSummary: (a) => dispatch(getDrugDetailsPRSummary(a)),
    getPRSettings: (a) => dispatch(getPRSettings(a)),
    getDrugDetailsPRList: (a) => dispatch(getDrugDetailsPRList(a)),
  };
}

const mapStateToProps = (state) => {
  return {
    formulary_id: state?.application?.formulary_id,
    formulary_lob_id: state?.application?.formulary_lob_id,
  };
};

const defaultListPayload = {
  index: 0,
  limit: 10,
  filter: [],
}

class DrugDetailPR extends React.Component<any, any> {
  state = {
    isSearchOpen: false,
    panelGridTitle1: ["", "NUMBER OF DRUGS", "ADDED DRUGS", "REMOVED DRUGS"],
    panelTitleAlignment1: ["center", "center", "center", "center"],
    panelGridValue1: [],
    isNotesOpen: false,
    activeTabIndex: 0,
    columns: null,
    data: [],
    tabs: [
      { id: 1, text: "Replace" },
      { id: 2, text: "Append" },
      { id: 3, text: "Remove" },
    ],
    prSettings: [],
    prSettingsStatus: {
      type: "covered",
      covered: true,
    },
    listCount: 0,
    showGrid: false,
    isSelectAll: false,
    selectedDrugs: Array(),
    drugData: Array(),
  };

  listPayload: any = {
    index: 0,
    limit: 10,
    filter: [],
    is_covered: this.state.prSettingsStatus.covered
  }

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

  onPageSize = (pageSize) => {
    this.listPayload.limit = pageSize
    this.getPRDrugsList({ limit: this.listPayload.limit });
  }

  onGridPageChangeHandler = (pageNumber: any) => {
    this.listPayload.index = (pageNumber - 1) * this.listPayload.limit;
    this.getPRDrugsList({ index: this.listPayload.index, limit: this.listPayload.limit });
  }

  onClearFilterHandler = () => {
    this.listPayload.index = 0;
    this.listPayload.limit = 10;
    this.getPRDrugsList({ index: defaultListPayload.index, limit: defaultListPayload.limit });
  }

  onSelectedTableRowChanged = (selectedRowKeys) => {
    this.state.selectedDrugs = [];
    if (selectedRowKeys && selectedRowKeys.length > 0) {
      let selDrugs = selectedRowKeys.map((ele) => {
        return this.state.drugData[ele - 1]["md5_id"]
          ? this.state.drugData[ele - 1]["md5_id"]
          : "";
      });

      this.setState({ selectedDrugs: selDrugs });
    } else {
      this.setState({ selectedDrugs: [] });
    }
  };

  getPRSummary = () => {
    let apiDetails = {};
    apiDetails["apiPart"] = prConstants.GET_DRUG_SUMMARY_PR;
    apiDetails["pathParams"] = this.props?.formulary_id;
    apiDetails["keyVals"] = [
      { key: prConstants.KEY_ENTITY_ID, value: this.props?.formulary_id },
    ];

    this.props.getDrugDetailsPRSummary(apiDetails).then((json) => {
      let tmpData =
        json.payload && json.payload.result ? json.payload.result : [];
      console.log("The PR Temp Data = ", tmpData);

      let rows = tmpData.map((ele) => {
        let curRow = [
          ele["attribute_name"],
          ele["total_drug_count"],
          ele["added_drug_count"],
          ele["removed_drug_count"],
        ];
        return curRow;
      });
      console.log("The PR Rows = ", rows);

      this.setState({
        panelGridValue1: rows,
      });
    });
  };

  getPRSettings = () => {
    let apiDetails = {};
    apiDetails["apiPart"] = prConstants.GET_PR_SETTINGS_LIST;
    this.props.getPRSettings(apiDetails).then((json) => {
      const prSettings = json.payload && json.payload.data ? json.payload.data : [];

      prSettings.forEach((s) => {
        s["isChecked"] = false;
      });
      this.setState({
        prSettings,
      });
    });
  };

  getPRDrugsList = ({index = 0, limit = 10, listPayload = {}} = {}) => {
    let apiDetails = {};
    apiDetails['apiPart'] = prConstants.GET_PR_FORMULARY_DRUGS;
    apiDetails['pathParams'] = this.props?.formulary_id + "/" + getLobCode(this.props.formulary_lob_id);
    apiDetails['keyVals'] = [{ key: prConstants.KEY_ENTITY_ID, value: this.props?.formulary_id }, { key: prConstants.KEY_INDEX, value: index }, { key: prConstants.KEY_LIMIT, value: limit }];
    apiDetails['messageBody'] = listPayload;

    let listCount = 0;
    this.props.getDrugDetailsPRList(apiDetails).then((json) => {
      let tmpData = json.payload.result;
      listCount = json.payload.count;
      var data: any[] = [];
      let count = 1;
      var gridData = tmpData.map((el) => {
        var element = Object.assign({}, el);
        data.push(element);
        let gridItem = {};
        gridItem["id"] = count;
        gridItem["key"] = count;
        gridItem["patientResidence"] = element.is_patrs ? "" + element.is_patrs : "";
        gridItem["coveredpatientResidence"] = element.covered_patient_residences ? "" + element.covered_patient_residences : "";
        gridItem["notCoveredpatientResidence"] = element.not_covered_patient_residences ? "" + element.not_covered_patient_residences : "";
        gridItem["tier"] = element.tier_value ? "" + element.tier_value : "";
        gridItem["labelName"] = element.drug_label_name ? "" + element.drug_label_name : "";
        gridItem["ddid"] = element.drug_descriptor_identifier ? "" + element.drug_descriptor_identifier : "";
        gridItem["gpi"] = element.generic_product_identifier ? "" + element.generic_product_identifier : "";
        gridItem["trademark"] = element.trademark_code ? "" + element.trademark_code : "";
        gridItem["databaseCategory"] = element.database_category ? "" + element.database_category : "";
        gridItem["databaseClass"] = element.database_class ? "" + element.database_class : "";
        gridItem["createdBy"] = element.created_by ? "" + element.created_by : "";
        gridItem["createdOn"] = element.created_date ? "" + element.created_date : "";
        gridItem["modifiedBy"] = element.modified_by ? "" + element.modified_by : "";
        gridItem["modifiedOn"] = element.modified_date ? "" + element.modified_date : "";
        gridItem["md5_id"] = element.md5_id ? "" + element.md5_id : "";
        count++;
        return gridItem;
      });
      this.setState({
        drugData: data,
        data: gridData,
        listCount: listCount,
        showGrid: true,
      });
    });
  }

  componentDidMount() {
    this.getPRSummary();
    this.getPRSettings();
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

  handleNoteClick = (event: React.ChangeEvent<{}>) => {
    event.stopPropagation();
    this.setState({ isNotesOpen: !this.state.isNotesOpen });
  };

  handleCloseNote = () => {
    this.setState({ isNotesOpen: !this.state.isNotesOpen });
  };

  settingFormApplyHandler = () => {
    alert(1);
  };

  handleStatus = (key: string) => {
    const COVERED = "covered";
    const isCovered: boolean = key === COVERED ? true : false;
    let prSettingsStatus = {
      type: key,
      covered: isCovered,
    };

    this.setState({ prSettingsStatus, showGrid: false });
  };

  serviceSettingsChecked = (e) => {
    const { prSettings } = this.state;

    prSettings.forEach((s: any) => {
      if (s.id_patient_residence_type === e.target.id) {
        s.isChecked = e.target.checked;
      }
    });

    this.setState({
      prSettings,
    });
  };

  handleSelectAll = () => {
    const { prSettings, isSelectAll } = this.state;
    prSettings.forEach((s: any) => {
      s.isChecked = !isSelectAll;
    });

    this.setState({
      prSettings,
      isSelectAll: !isSelectAll,
    });
  };

  showGridHandler = () => {
    console.log("Called-----THe Show Grid Handler-----")
    // this.getPOSDrugsList();
    console.log("The State of the Tab = ", this.state);
    // this.setState({ showGrid: true });
    this.getPRDrugsList();
  };

  render() {
    let dataGrid = <FrxLoader />;
    if (this.state.data) {
      dataGrid = (
        <div className="tier-grid-container">
          <FrxDrugGridContainer
            isPinningEnabled={false}
            enableSearch={false}
            enableColumnDrag
            onSearch={() => {}}
            fixedColumnKeys={[]}
            pagintionPosition="topRight"
            gridName="DRUGSDETAILS"
            enableSettings={false}
            columns={getDrugDetailsColumnPR()}
            scroll={{ x: 3500, y: 377 }}
            isFetchingData={false}
            enableResizingOfColumns
            data={this.state.data}
            getPerPageItemSize={this.onPageSize}
            selectedCurrentPage={(this.listPayload.index/this.listPayload.limit + 1)}
            pageSize={this.listPayload.limit}
            onGridPageChangeHandler={this.onGridPageChangeHandler}
            totalRowsCount={this.state.listCount}
            clearFilterHandler={this.onClearFilterHandler}
            rowSelection={{
              columnWidth: 50,
              fixed: true,
              type: "checkbox",
              onChange: this.onSelectedTableRowChanged,
            }}
          />
        </div>
      );
    }
    const {
      prSettings,
      prSettingsStatus,
      isSelectAll,
      showGrid,
    } = this.state;

    return (
      <>
        <div className="bordered mb-10">
          <PanelHeader title="patient residence" tooltip="patient residence" />
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
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <PrSettings
          prSettingsServies={{ prSettings, prSettingsStatus }}
          handleStatus={this.handleStatus}
          serviceSettingsChecked={this.serviceSettingsChecked}
          selectAllHandler={{
            isSelectAll: isSelectAll,
            handleSelectAll: this.handleSelectAll,
          }}
          showGridHandler={this.showGridHandler}
        />

        {this.state.showGrid ? (
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
        ) : null }
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrugDetailPR);
