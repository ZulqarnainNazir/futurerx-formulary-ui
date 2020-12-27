import React from "react";
import { connect } from "react-redux";
import PanelHeader from "../../../../shared/Frx-components/panel-header/PanelHeader";
import PanelGrid from "../../../../shared/Frx-components/panel-grid/PanelGrid";
import CustomizedSwitches from "../FormularyConfigure/components/CustomizedSwitches";
import { TabInfo } from "../../../../../models/tab.model";
import FrxMiniTabs from "../../../../shared/FrxMiniTabs/FrxMiniTabs";
import Button from "../../../../shared/Frx-components/button/Button";
import { getDrugDetailsColumnGL } from "../../../DrugDetails/components/FormularyConfigure/DrugGridColumn";
import { getDrugDetailData } from "../../../../../mocks/DrugGridMock";
import FrxLoader from "../../../../shared/FrxLoader/FrxLoader";
import AdvancedSearch from "../../../DrugDetails/components/FormularyConfigure/components/search/AdvancedSearch";
import { getDrugDetailsGLSummary, getDrugDetailsGLList, postReplaceGLDrug, postGLCriteriaList } from "../../../../../redux/slices/formulary/drugDetails/gl/glActionCreation";
import * as glConstants from "../../../../../api/http-drug-details";
import getLobCode from "../../../Utils/LobUtils";

import GenderLimitSettings from "./GenderLimitSettings";
import FrxDrugGridContainer from "../../../../shared/FrxGrid/FrxDrugGridContainer";
import showMessage from "../../../Utils/Toast";

function mapDispatchToProps(dispatch) {
  return {
    getDrugDetailsGLSummary: (a) => dispatch(getDrugDetailsGLSummary(a)),
    getDrugDetailsGLList: (a) => dispatch(getDrugDetailsGLList(a)),
    postReplaceGLDrug: (a) => dispatch(postReplaceGLDrug(a)),
    postGLCriteriaList: (a) => dispatch(postGLCriteriaList(a)),
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

class DrugDetailGL extends React.Component<any, any> {
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
    selectedDrugs: Array(),
    drugData: Array(),
    lobCode: null,
    listCount: 0,
    showGrid: false,
    glSettings: [
      { index: 0, isChecked: false, gl_type_name: "female", gl_code: "F" },
      { index: 1, isChecked: false, gl_type_name: "male", gl_code: "M" },
      { index: 2, isChecked: false, gl_type_name: "unknown", gl_code: "U" },
    ],
    glSettingsStatus: {
      type: "covered",
      covered: true,
    },
  };

  listPayload: any = {
    index: 0,
    limit: 10,
    filter: [],
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

    let glRows = this.state.glSettings.filter(f => f.isChecked).map(e => {
      if(e.isChecked && e.isChecked !== undefined) {
        return e.gl_code
      }
    });

    console.log("The Selected Drugs For Save = ", this.state.selectedDrugs);
    console.log("The GL Rows = ", glRows);

    if (this.state.selectedDrugs && this.state.selectedDrugs.length > 0) {
      let apiDetails = {};
      apiDetails["apiPart"] = glConstants.APPLY_GL_DRUGS;
      apiDetails["keyVals"] = [
        { key: glConstants.KEY_ENTITY_ID, value: this.props?.formulary_id },
      ];
      apiDetails["messageBody"] = {};
      apiDetails["messageBody"]["is_covered"] = this.state.glSettingsStatus.covered;
      apiDetails["messageBody"]["selected_drug_ids"] = this.state.selectedDrugs;
      apiDetails["messageBody"]["is_select_all"] = false;
      apiDetails["messageBody"]["covered"] = {};
      apiDetails["messageBody"]["not_covered"] = {};
      apiDetails["messageBody"]["gender_limits"] = glRows;
      apiDetails["messageBody"]["breadcrumb_code_value"] = "GL";
      apiDetails["messageBody"]["filter"] = [];
      apiDetails["messageBody"]["search_key"] = "";

      if (this.state.activeTabIndex === 0) {
        apiDetails["pathParams"] = this.props?.formulary_id + "/" + getLobCode(this.props.formulary_lob_id) + "/" + glConstants.TYPE_REPLACE;
        console.log("The API Details - ", apiDetails);

        // Replace Drug method call
        this.props.postReplaceGLDrug(apiDetails).then((json) => {
          if (
            json.payload &&
            json.payload.code &&
            json.payload.code === "200"
          ) {
            showMessage("Success", "success");
            this.getGLSummary();
            this.getGLDrugsList();
          } else {
            showMessage("Failure", "error");
          }
        });
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
    this.getGLDrugsList({ limit: this.listPayload.limit });
  }

  onGridPageChangeHandler = (pageNumber: any) => {
    this.listPayload.index = (pageNumber - 1) * this.listPayload.limit;
    this.getGLDrugsList({ index: this.listPayload.index, limit: this.listPayload.limit });
  }

  onClearFilterHandler = () => {
    this.listPayload.index = 0;
    this.listPayload.limit = 10;
    this.getGLDrugsList({ index: defaultListPayload.index, limit: defaultListPayload.limit });
  }

  onSelectedTableRowChanged = (selectedRowKeys) => {
    this.state.selectedDrugs = [];
    if (selectedRowKeys && selectedRowKeys.length > 0) {
      let selDrugs = selectedRowKeys.map((ele) => {
        return this.state.drugData[ele - 1]["md5_id"]
          ? this.state.drugData[ele - 1]["md5_id"]
          : "";
      });

      this.setState({ selectedDrugs: selDrugs }, () => console.log("The Selected Drugs = ",  this.state.selectedDrugs));
    } else {
      this.setState({ selectedDrugs: [] });
    }
  };

  handleStatus = (key: string) => {
    const COVERED = "covered";
    const isCovered: boolean = key === COVERED ? true : false;
    let glSettingsStatus = {
      type: key,
      covered: isCovered,
    };

    this.setState({ glSettingsStatus, showGrid: false });
  };

  getGLSummary = () => {
    let apiDetails = {};
    apiDetails["apiPart"] = glConstants.GET_DRUG_SUMMARY_GL;
    apiDetails["pathParams"] = this.props?.formulary_id;
    apiDetails["keyVals"] = [{ key: glConstants.KEY_ENTITY_ID, value: this.props?.formulary_id }];

    this.props.getDrugDetailsGLSummary(apiDetails).then((json) => {
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

  getGLCriteriaList = () => {
    let apiDetails = {};
    apiDetails["apiPart"] = glConstants.APPLY_GL_DRUGS;
    apiDetails["keyVals"] = [
      { key: glConstants.KEY_ENTITY_ID, value: this.props?.formulary_id },
    ];
    apiDetails["messageBody"] = {};
    apiDetails["messageBody"]["is_advance_search"] = false;
    apiDetails["messageBody"]["filter"] = [];
    apiDetails["messageBody"]["search_key"] = "";
    apiDetails["messageBody"]["is_covered"] = this.state.glSettingsStatus.covered;
    apiDetails["messageBody"]["selected_criteria_ids"] = [];
    apiDetails["messageBody"]["not_covered"] = {};
    
    this.props.postGLCriteriaList(apiDetails).then((json) => {
      // {"code":"200","message":"ok","result":[{"id_gender_type":3,"gender_type_code":"U","gender_type_name":"Unknown","is_covered":false}]}
    });
  }

  getGLDrugsList = ({index = 0, limit = 10, listPayload = {}} = {}) => {
    let apiDetails = {};
    apiDetails['apiPart'] = glConstants.GET_GL_DRUGS;
    apiDetails['pathParams'] = this.props?.formulary_id + "/" + getLobCode(this.props.formulary_lob_id);
    apiDetails['keyVals'] = [{ key: glConstants.KEY_ENTITY_ID, value: this.props?.formulary_id }, { key: glConstants.KEY_INDEX, value: index }, { key: glConstants.KEY_LIMIT, value: limit }];
    apiDetails['messageBody'] = listPayload;

    let listCount = 0;
    this.props.getDrugDetailsGLList(apiDetails).then((json) => {
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
        gridItem["genderLimit"] = element.is_gl ? "" + element.is_gl : "";
        gridItem["coveredGender"] = element.covered_genders ? "" + element.covered_genders : "";
        gridItem["coverAgeMin"] = element.covered_min_ages ? "" + element.covered_min_ages : "";
        gridItem["coverMax"] = element.covered_max_operators ? "" + element.covered_max_operators : "";
        gridItem["coverAgeMax"] = element.covered_max_ages ? "" + element.covered_max_ages : "";
        gridItem["noCoveredGender"] = element.not_covered_genders ? "" + element.not_covered_genders : "";
        gridItem["notCoverAgeMin"] = element.not_covered_min_ages ? "" + element.not_covered_min_ages : "";
        gridItem["notCoverMax"] = element.not_covered_max_operators ? "" + element.not_covered_max_operators : "";
        gridItem["notCoverAgeMax"] = element.not_covered_max_ages ? "" + element.not_covered_max_ages : "";
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
    const data = getDrugDetailData();
    const columns = getDrugDetailsColumnGL();
    this.setState({
      columns: columns,
      data: data,
    });
    this.getGLSummary();
    // this.getGLDrugsList();
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

  serviceSettingsChecked = (e) => {
    const { glSettings } = this.state;

    glSettings.forEach((s: any) => {
      if (s.index === e.target.id) {
        s.isChecked = e.target.checked;
      }
    });

    this.setState({
      glSettings,
    });
  };

  showGridHandler = () => {
    this.getGLDrugsList();
    // this.setState(
    //   {
    //     showGrid: !this.state.showGrid,
    //   },
    //   () => {
    //     console.log({
    //       settings: this.state.glSettings,
    //       status: this.state.glSettingsStatus,
    //     });
    //   }
    // );
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
            columns={getDrugDetailsColumnGL()}
            scroll={{ x: 3200, y: 377 }}
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
      glSettings,
      glSettingsStatus,
      showGrid,
    } = this.state;

    return (
      <>
        <div className="bordered mb-10">
          <PanelHeader title="Gender Limit" tooltip="Gender Limit" />
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

        <GenderLimitSettings glSettingsServies={{ glSettings, glSettingsStatus }} handleStatus={this.handleStatus} serviceSettingsChecked={this.serviceSettingsChecked} showGridHandler={this.showGridHandler} />

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
        ) : null}
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrugDetailGL);
