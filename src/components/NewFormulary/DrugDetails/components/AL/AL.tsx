import React from "react";
import { connect } from "react-redux";
import PanelHeader from "../../../../shared/Frx-components/panel-header/PanelHeader";
import PanelGrid from "../../../../shared/Frx-components/panel-grid/PanelGrid";
import CustomizedSwitches from "../FormularyConfigure/components/CustomizedSwitches";
import { TabInfo } from "../../../../../models/tab.model";
import FrxMiniTabs from "../../../../shared/FrxMiniTabs/FrxMiniTabs";
import Button from "../../../../shared/Frx-components/button/Button";
import { getDrugDetailsColumnAL } from "../../../DrugDetails/components/FormularyConfigure/DrugGridColumn";
import { getDrugDetailData } from "../../../../../mocks/DrugGridMock";
import FrxLoader from "../../../../shared/FrxLoader/FrxLoader";
import AdvancedSearch from "../../../DrugDetails/components/FormularyConfigure/components/search/AdvancedSearch";
import { getDrugDetailsALSummary, getDrugDetailsALList, postReplaceALDrug } from "../../../../../redux/slices/formulary/drugDetails/al/alActionCreation";
import * as alConstants from "../../../../../api/http-drug-details";
import getLobCode from "../../../Utils/LobUtils";

import AgeLimitSettings from "./AgeLimitSettings";
import FrxDrugGridContainer from "../../../../shared/FrxGrid/FrxDrugGridContainer";
import showMessage from "../../../Utils/Toast";

function mapDispatchToProps(dispatch) {
  return {
    getDrugDetailsALSummary: (a) => dispatch(getDrugDetailsALSummary(a)),
    getDrugDetailsALList: (a) => dispatch(getDrugDetailsALList(a)),
    postReplaceALDrug: (a) => dispatch(postReplaceALDrug(a)),
  };
}

const mapStateToProps = (state) => {
  return {
    formulary_id: state?.application?.formulary_id,
    formulary_lob_id: state?.application?.formulary_lob_id,
  };
};

interface initialFormData {
  minimumVal: any,
  maximumVal: any,
  minimumType: any,
  maximumType: any,
  index: any,
}

interface drugDetailALState {
  isSearchOpen: boolean,
  panelGridTitle1: any,
  panelTitleAlignment1: any,
  panelGridValue1: any,
  isNotesOpen: boolean,
  activeTabIndex: number,
  columns: any,
  data: any,
  tabs: any,
  selectedDrugs: any,
  drugData: any,
  lobCode: any,
  listCount: number,
  ageLimitsCount: number,
  isCovered: boolean,
  formData: initialFormData[],
}

const defaultListPayload = {
  index: 0,
  limit: 10,
  filter: [],
}

const initialFormData: initialFormData = {
  minimumVal: "",
  maximumVal: "",
  minimumType: "IO",
  maximumType: "IO",
  index: "",
}

class DrugDetailAL extends React.Component<any, any> {
  state: drugDetailALState = {
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
    selectedDrugs: Array(),
    drugData: Array(),
    lobCode: null,
    listCount: 0,
    ageLimitsCount: 1,
    isCovered: true,
    formData: [],
  };

  listPayload: any = {
    index: 0,
    limit: 10,
    filter: [],
  }
  
  formData1: initialFormData[] = [
    {
      minimumVal: "",
      maximumVal: "",
      minimumType: "IO",
      maximumType: "IO",
      index: ""
    }
  ]

  advanceSearchClickHandler = (event) => {
    event.stopPropagation();
    this.setState({ isSearchOpen: !this.state.isSearchOpen });
  };

  advanceSearchClosekHandler = () => {
    this.setState({ isSearchOpen: !this.state.isSearchOpen });
  };

  saveClickHandler = () => {
    console.log("Save data");
    console.log("The Saved Form Data - ", this.state.formData);
    console.log("The Selected Drugs For Save = ", this.state.selectedDrugs);
    if (this.state.selectedDrugs && this.state.selectedDrugs.length > 0) {
      let apiDetails = {};
      apiDetails["apiPart"] = alConstants.APPLY_AL_DRUG;
      apiDetails["keyVals"] = [
        { key: alConstants.KEY_ENTITY_ID, value: this.props?.formulary_id },
      ];
      apiDetails["messageBody"] = {};
      apiDetails["messageBody"]["selected_drug_ids"] = this.state.selectedDrugs;
      apiDetails["messageBody"]["is_select_all"] = false;
      apiDetails["messageBody"]["covered"] = {};
      apiDetails["messageBody"]["not_covered"] = {};
      apiDetails["messageBody"]["selected_criteria_ids"] = [];
      apiDetails["messageBody"]["filter"] = [];
      apiDetails["messageBody"]["search_key"] = "";
      apiDetails["messageBody"]["limited_access"] = "";
      apiDetails["messageBody"]["is_covered"] = this.state.isCovered;
      apiDetails["messageBody"]["age_limits"] = [{"min_age_condition":"GT","min_age_limit":10,"max_age_condition":"LT","max_age_limit":50,"sequence_number":1}];

      if (this.state.activeTabIndex === 0) {
        apiDetails["pathParams"] =
          this.props?.formulary_id +
          "/" + 
          getLobCode(this.props.formulary_lob_id) +
          "/" +
          alConstants.TYPE_REPLACE;
          console.log("The API Details - ", apiDetails);

        // Replace Drug method call
        // this.props.postReplaceAFDrug(apiDetails).then((json) => {
        //   if (
        //     json.payload &&
        //     json.payload.code &&
        //     json.payload.code === "200"
        //   ) {
        //     showMessage("Success", "success");
        //     // this.getAFSummary();
        //     // this.getAFDrugsList();
        //   } else {
        //     showMessage("Failure", "error");
        //   }
        // });
      // } else if (this.state.activeTabIndex === 2) {
      //   apiDetails["pathParams"] =
      //     this.props?.formulary_id +
      //     "/" +
      //     this.state.lobCode +
      //     "/" +
      //     alConstants.TYPE_REMOVE;

      //   // Remove Drug method call
      //   this.props.postRemoveAFDrug(apiDetails).then((json) => {
      //     if (
      //       json.payload &&
      //       json.payload.code &&
      //       json.payload.code === "200"
      //     ) {
      //       showMessage("Success", "success");
      //       // this.getAFSummary();
      //       // this.getAFDrugsList();
      //     } else {
      //       showMessage("Failure", "error");
      //     }
      //   });
      }
    }
  };

  onPageSize = (pageSize) => {
    this.listPayload.limit = pageSize
    this.getALDrugsList({ limit: this.listPayload.limit });
  }

  onGridPageChangeHandler = (pageNumber: any) => {
    this.listPayload.index = (pageNumber - 1) * this.listPayload.limit;
    this.getALDrugsList({ index: this.listPayload.index, limit: this.listPayload.limit });
  }

  onClearFilterHandler = () => {
    this.listPayload.index = 0;
    this.listPayload.limit = 10;
    this.getALDrugsList({ index: defaultListPayload.index, limit: defaultListPayload.limit });
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

  handleMinChange = (e, index) => {
    console.log("The Min input Value = ", e);
    console.log("THe Min input value = ", e.target?.value);
    this.formData1[index].minimumVal = e.target?.value;
    this.formData1[index].index = index;
    this.setState({ formData: this.formData1 });
  };

  handleMaxChange = (e, index) => {
    console.log("The Max input Value = ", e);
    console.log("THe Max input value = ", e.target?.value);
    this.formData1[index].maximumVal = e.target?.value;
    this.formData1[index].index = index;
    this.setState({ formData: this.formData1 });
  };

  onMinChangeHandler = (e, index) => {
    console.log("The ON MIN Change Handler data = ", e);
    console.log("The on MIN Change Index data = ", index);
    this.formData1[index].minimumType = (e === "Greater Than") ? "GT" : "IO" ;
    this.formData1[index].index = index;
    this.setState({ formData: this.formData1 });
  };

  onMaxChangeHandler = (e, index) => {
    console.log("The ON MAX Change Handler data = ", e);
    console.log("The on MAX Change Index data = ", index);
    this.formData1[index].maximumType = (e === "Less Than") ? "LT" : "IO" ;
    this.formData1[index].index = index;
    this.setState({ formData: this.formData1 });
  }

  getALSummary = () => {
    let apiDetails = {};
    apiDetails["apiPart"] = alConstants.GET_DRUG_SUMMARY_AL;
    apiDetails["pathParams"] = this.props?.formulary_id;
    apiDetails["keyVals"] = [{ key: alConstants.KEY_ENTITY_ID, value: this.props?.formulary_id }];

    this.props.getDrugDetailsALSummary(apiDetails).then((json) => {
      let tmpData = json.payload && json.payload.result ? json.payload.result : [];

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
  }

  getALDrugsList = ({index = 0, limit = 10, listPayload = {}} = {}) => {
    let apiDetails = {};
    apiDetails['apiPart'] = alConstants.GET_AL_DRUGS;
    apiDetails['pathParams'] = this.props?.formulary_id + "/" + getLobCode(this.props.formulary_lob_id);
    apiDetails['keyVals'] = [{ key: alConstants.KEY_ENTITY_ID, value: this.props?.formulary_id }, { key: alConstants.KEY_INDEX, value: index }, { key: alConstants.KEY_LIMIT, value: limit }];
    apiDetails['messageBody'] = listPayload;

    let listCount = 0;
    this.props.getDrugDetailsALList(apiDetails).then((json) => {
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
        gridItem["ageLimit"] = element.is_al ? "" + element.is_al : "";
        gridItem["coverMin"] = element.covered_min_operators ? "" + element.covered_min_operators : "";
        gridItem["coverAgeMin"] = element.covered_min_ages ? "" + element.covered_min_ages : "";
        gridItem["coverMax"] = element.covered_max_operators ? "" + element.covered_max_operators : "";
        gridItem["coverAgeMax"] = element.covered_max_ages ? "" + element.covered_max_ages : "";
        gridItem["notCoverMin"] = element.not_covered_min_operators ? "" + element.not_covered_min_operators : "";
        gridItem["notCoverAgeMin"] = element.not_covered_min_ages ? "" + element.not_covered_min_ages : "";
        gridItem["notCoverMax"] = element.not_covered_max_operators ? "" + element.not_covered_max_operators : "";
        gridItem["notCoverAgeMax"] = element.not_covered_max_ages ? "" + element.not_covered_max_ages : "";
        gridItem["tier"] = element.tier_value ? "" + element.tier_value : "";
        gridItem["labelNamae"] = element.drug_label_name ? "" + element.drug_label_name : "";
        gridItem["ddid"] = element.drug_descriptor_identifier ? "" + element.drug_descriptor_identifier : "";
        gridItem["gpi"] = element.generic_product_identifier ? "" + element.generic_product_identifier : "";
        gridItem["trademark"] = element.trademark_code ? "" + element.trademark_code : "";
        gridItem["databaseCategory"] = element.database_category ? "" + element.database_category : "";
        gridItem["databaseClass"] = element.database_class ? "" + element.database_class : "";
        gridItem["created_by"] = element.created_by ? "" + element.created_by : "";
        gridItem["created_date"] = element.created_date ? "" + element.created_date : "";
        gridItem["modified_by"] = element.modified_by ? "" + element.modified_by : "";
        gridItem["modified_date"] = element.modified_date ? "" + element.modified_date : "";
        gridItem["md5_id"] = element.md5_id ? "" + element.md5_id : "";
        count++;
        return gridItem;
      });
      this.setState({
        drugData: data,
        data: gridData,
        listCount: listCount,
      });
    });
  }

  componentDidMount() {
    const data = getDrugDetailData();
    const columns = getDrugDetailsColumnAL();
    this.setState({
      columns: columns,
      data: data,
    });
    this.getALSummary();
    this.getALDrugsList();
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
            columns={getDrugDetailsColumnAL()}
            scroll={{ x: 7000, y: 377 }}
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
    
    return (
      <>
        <div className="bordered mb-10">
          <PanelHeader title="Age Limit" tooltip="Age Limit" />
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

        <AgeLimitSettings handleMinChange={this.handleMinChange} handleMaxChange={this.handleMaxChange} onMinChangeHandler={this.onMinChangeHandler} onMaxChangeHandler={this.onMaxChangeHandler}/>

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

export default connect(mapStateToProps, mapDispatchToProps)(DrugDetailAL);
