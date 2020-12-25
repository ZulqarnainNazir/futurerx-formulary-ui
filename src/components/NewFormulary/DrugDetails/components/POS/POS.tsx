import React from "react";
import { connect } from "react-redux";
import PanelHeader from "../../../../shared/Frx-components/panel-header/PanelHeader";
import PanelGrid from "../../../../shared/Frx-components/panel-grid/PanelGrid";
import CustomizedSwitches from "../FormularyConfigure/components/CustomizedSwitches";
import { TabInfo } from "../../../../../models/tab.model";
import FrxMiniTabs from "../../../../shared/FrxMiniTabs/FrxMiniTabs";
import Button from "../../../../shared/Frx-components/button/Button";
import { textFilters } from "../../../../../utils/grid/filters";
import { getDrugDetailsColumnPOS } from "../../../DrugDetails/components/FormularyConfigure/DrugGridColumn";
import { getDrugDetailData } from "../../../../../mocks/DrugGridMock";
import FrxLoader from "../../../../shared/FrxLoader/FrxLoader";
import DrugGrid from "../../../DrugDetails/components/DrugGrid";
import AdvancedSearch from "../../../DrugDetails/components/FormularyConfigure/components/search/AdvancedSearch";
import {
  getDrugDetailsPOSSummary,
  getDrugDetailsPOSSettings,
  getDrugDetailsPOSGridData,
} from "../../../../../redux/slices/formulary/drugDetails/pos/posActionCreation";
import * as posConstants from "../../../../../api/http-drug-details";
import getLobCode from "../../../Utils/LobUtils";

import PosSettings from "./PosSettings";
import FrxGridContainer from "../../../../shared/FrxGrid/FrxGridContainer";

function mapDispatchToProps(dispatch) {
  return {
    getDrugDetailsPOSSummary: (a) => dispatch(getDrugDetailsPOSSummary(a)),
    getDrugDetailsPOSSettings: (a) => dispatch(getDrugDetailsPOSSettings(a)),
    getDrugDetailsPOSGridData: (a) => dispatch(getDrugDetailsPOSGridData(a)),
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

class DrugDetailPOS extends React.Component<any, any> {
  state = {
    isSearchOpen: false,
    panelGridTitle1: ["", "NUMBER OF DRUGS", "ADDED DRUGS", "REMOVED DRUGS"],
    panelTitleAlignment1: ["center", "center", "center", "center"],
    panelGridValue1: [],
    posSettings: [],
    posSettingsStatus: {
      type: "covered",
      covered: true,
    },
    listCount: 0,

    isNotesOpen: false,
    activeTabIndex: 0,
    columns: getDrugDetailsColumnPOS(),
    data: getDrugDetailData(),
    tabs: [
      { id: 1, text: "Replace" },
      { id: 2, text: "Append" },
      { id: 3, text: "Remove" },
    ],

    isSelectAll: false,
    showGrid: false,
  };

  listPayload: any = {
    index: 0,
    limit: 10,
    filter: [],
    is_covered: this.state.posSettingsStatus.covered
  }

  componentDidMount() {
    // const columns = getDrugDetailsColumnPOS();
    // const data = getDrugDetailData();

    // this.setState({
    //   columns: columns,
    //   data: data,
    // });
    this.getPOSSummary();
    this.getPOSSettings();
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

  getPOSSummary = () => {
    let apiDetails = {};
    apiDetails["apiPart"] = posConstants.GET_DRUG_SUMMARY_POS;
    apiDetails["pathParams"] = this.props?.formulary_id;
    apiDetails["keyVals"] = [
      { key: posConstants.KEY_ENTITY_ID, value: this.props?.formulary_id },
    ];

    console.log("apiDetails 1: ", apiDetails);
    this.props.getDrugDetailsPOSSummary(apiDetails).then((json) => {
      let tmpData =
        json.payload && json.payload.result ? json.payload.result : [];
      // console.log("The POS Temp Data = ", tmpData);

      let rows = tmpData.map((ele) => {
        let curRow = [
          ele["attribute_name"],
          ele["total_drug_count"],
          ele["added_drug_count"],
          ele["removed_drug_count"],
        ];
        return curRow;
      });
      console.log("The POS Rows = ", rows);

      this.setState({
        panelGridValue1: rows,
      });
    });
  };

  getPOSDrugsList = ({index = 0, limit = 10, listPayload = {}} = {}) => {
    let apiDetails = {};
    apiDetails['apiPart'] = posConstants.GET_POS_DRUGS;
    apiDetails['pathParams'] = this.props?.formulary_id + "/" + getLobCode(this.props.formulary_lob_id);
    apiDetails['keyVals'] = [{ key: posConstants.KEY_ENTITY_ID, value: this.props?.formulary_id }, { key: posConstants.KEY_INDEX, value: index }, { key: posConstants.KEY_LIMIT, value: limit }];
    apiDetails['messageBody'] = listPayload;

    let listCount = 0;
    this.props.getDrugDetailsPOSGridData(apiDetails).then((json) => {
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
        gridItem["placeOfService"] = element.is_pos ? "" + element.is_pos : "";
        gridItem["coveredPlaceOfService"] = element.covered_place_of_services ? "" + element.covered_place_of_services : "";
        gridItem["notCoveredPlaceOfService"] = element.not_covered_place_of_services ? "" + element.not_covered_place_of_services : "";
        gridItem["tier"] = element.tier_value ? "" + element.tier_value : "";
        gridItem["labelName"] = element.drug_label_name ? "" + element.drug_label_name : "";
        gridItem["ddid"] = element.drug_descriptor_identifier ? "" + element.drug_descriptor_identifier : "";
        gridItem["gpi"] = element.generic_product_identifier ? "" + element.generic_product_identifier : "";
        gridItem["coverAgeMax"] = element.covered_max_ages ? "" + element.covered_max_ages : "";
        gridItem["notCoverMin"] = element.not_covered_min_operators ? "" + element.not_covered_min_operators : "";
        gridItem["notCoverAgeMin"] = element.not_covered_min_ages ? "" + element.not_covered_min_ages : "";
        gridItem["notCoverMax"] = element.not_covered_max_operators ? "" + element.not_covered_max_operators : "";
        gridItem["notCoverAgeMax"] = element.not_covered_max_ages ? "" + element.not_covered_max_ages : "";
        gridItem["tier"] = element.tier_value ? "" + element.tier_value : "";
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

  getPOSSettings = () => {
    let apiDetails = {};
    apiDetails["apiPart"] = posConstants.GET_DRUG_SETTING_POS;
    this.props.getDrugDetailsPOSSettings(apiDetails).then((json) => {
      const posSettings =
        json.payload && json.payload.data ? json.payload.data : [];

      posSettings.forEach((s) => {
        s["isChecked"] = false;
      });
      this.setState({
        posSettings,
      });
    });
  };

  onPageSize = (pageSize) => {
    this.listPayload.limit = pageSize
    this.getPOSDrugsList({ limit: this.listPayload.limit, listPayload: this.listPayload });
  }

  onGridPageChangeHandler = (pageNumber: any) => {
    this.listPayload.index = (pageNumber - 1) * this.listPayload.limit;
    this.getPOSDrugsList({ index: this.listPayload.index, limit: this.listPayload.limit, listPayload: this.listPayload });
  }

  onClearFilterHandler = () => {
    this.listPayload.index = 0;
    this.listPayload.limit = 10;
    this.getPOSDrugsList({ index: defaultListPayload.index, limit: defaultListPayload.limit, listPayload: this.listPayload });
  }

  handleStatus = (key: string) => {
    const COVERED = "covered";
    const isCovered: boolean = key === COVERED ? true : false;
    let posSettingsStatus = {
      type: key,
      covered: isCovered,
    };

    this.setState({ posSettingsStatus, showGrid: false });
  };

  serviceSettingsChecked = (e) => {
    // console.log(e.target.id);
    // console.log(e.target.name);
    // console.log(e.target.checked);

    const { posSettings } = this.state;

    posSettings.forEach((s: any) => {
      if (s.id_place_of_service_type === e.target.id) {
        s.isChecked = e.target.checked;
      }
    });

    this.setState({
      posSettings,
    });
  };

  handleSelectAll = () => {
    const { posSettings, isSelectAll } = this.state;
    posSettings.forEach((s: any) => {
      s.isChecked = !isSelectAll;
    });

    this.setState({
      posSettings,
      isSelectAll: !isSelectAll,
    });
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

  showGridHandler = () => {
    this.getPOSDrugsList(this.listPayload);
  };

  render() {
    let dataGrid = <FrxLoader />;
    if (this.state.data) {
      dataGrid = (
        <DrugGrid columns={this.state.columns} data={this.state.data} />
      );
    }
    const {
      posSettings,
      posSettingsStatus,
      isSelectAll,
      showGrid,
    } = this.state;
    return (
      <>
        <div className="bordered mb-10">
          <PanelHeader title="place of service" tooltip="place of service" />
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

        <PosSettings
          posSettingsServies={{ posSettings, posSettingsStatus }}
          handleStatus={this.handleStatus}
          serviceSettingsChecked={this.serviceSettingsChecked}
          selectAllHandler={{
            isSelectAll: isSelectAll,
            handleSelectAll: this.handleSelectAll,
          }}
          showGridHandler={this.showGridHandler}
        />

        {showGrid ? (
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
            {/* {dataGrid} */}
            <div className="inner-container">
              <div className="pinned-table">
                <FrxGridContainer
                  enableSearch={false}
                  enableColumnDrag
                  customSettingIcon={"RED-DOT"}
                  onSearch={() => {}}
                  fixedColumnKeys={[
                    "placeOfService",
                    "coveredPlaceOfService",
                    "notCoveredplaceOfService",
                  ]}
                  pagintionPosition="topRight"
                  gridName="DRUGSDETAILS"
                  enableSettings
                  isFetchingData={false}
                  columns={this.state.columns}
                  isCustomCheckboxEnabled
                  handleCustomRowSelectionChange={() => {}}
                  settingsWidth={15}
                  checkBoxWidth={15}
                  isPinningEnabled={true}
                  scroll={{ x: 4000, y: 377 }}
                  enableResizingOfColumns
                  data={this.state.data}
                  getPerPageItemSize={this.onPageSize}
                  selectedCurrentPage={(this.listPayload.index/this.listPayload.limit + 1)}
                  pageSize={this.listPayload.limit}
                  onGridPageChangeHandler={this.onGridPageChangeHandler}
                  totalRowsCount={this.state.listCount}
                  clearFilterHandler={this.onClearFilterHandler}
                />
              </div>
            </div>
            {this.state.isSearchOpen ? (
              <AdvancedSearch
                category="Grievances"
                openPopup={this.state.isSearchOpen}
                onClose={this.advanceSearchClosekHandler}
              />
            ) : null}
          </div>
        ) : null}
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrugDetailPOS);
