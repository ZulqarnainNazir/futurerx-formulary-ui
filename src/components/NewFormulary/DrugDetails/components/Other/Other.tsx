import React from "react";
import { connect } from "react-redux";
import { Table } from "antd";
import { filter } from "lodash";
import Grid from "@material-ui/core/Grid";
import { Row, Col } from "antd";
import PanelHeader from "../../../../shared/Frx-components/panel-header/PanelHeader";
import PanelGrid from "../../../../shared/Frx-components/panel-grid/PanelGrid";
import CustomizedSwitches from "../FormularyConfigure/components/CustomizedSwitches";
import { TabInfo } from "../../../../../models/tab.model";
import FrxMiniTabs from "../../../../shared/FrxMiniTabs/FrxMiniTabs";
import Button from "../../../../shared/Frx-components/button/Button";
import { getDrugDetailsColumnOTHER } from "../../../DrugDetails/components/FormularyConfigure/DrugGridColumn";
import { getDrugDetailData } from "../../../../../mocks/DrugGridMock";
import FrxLoader from "../../../../shared/FrxLoader/FrxLoader";
import AdvancedSearch from "../../../DrugDetails/components/FormularyConfigure/components/search/AdvancedSearch";
import { getDrugDetailsOTHERSummary, getOTHERCriteriaList, getDrugDetailsOtherList, postRemoveOtherDrug, postReplaceOtherDrug } from "../../../../../redux/slices/formulary/drugDetails/other/otherActionCreation";
import * as otConstants from "../../../../../api/http-drug-details";
import getLobCode from "../../../Utils/LobUtils";
import FrxDrugGridContainer from "../../../../shared/FrxGrid/FrxDrugGridContainer";
import showMessage from "../../../Utils/Toast";
import AdvanceSearchContainer from "../../../NewAdvanceSearch/AdvanceSearchContainer";
import { setAdvancedSearch } from "../../../../../redux/slices/formulary/advancedSearch/advancedSearchSlice";

function mapDispatchToProps(dispatch) {
  return {
    getDrugDetailsOTHERSummary: (a) => dispatch(getDrugDetailsOTHERSummary(a)),
    getOTHERCriteriaList: (a) => dispatch(getOTHERCriteriaList(a)),
    getDrugDetailsOtherList: (a) => dispatch(getDrugDetailsOtherList(a)),
    postRemoveOtherDrug: (a) => dispatch(postRemoveOtherDrug(a)),
    postReplaceOtherDrug: (a) => dispatch(postReplaceOtherDrug(a)),
    setAdvancedSearch: (a) => dispatch(setAdvancedSearch(a)),
  };
}

const mapStateToProps = (state) => {
  return {
    configureSwitch: state.switchReducer.configureSwitch,
    formulary_id: state?.application?.formulary_id,
    formulary_lob_id: state?.application?.formulary_lob_id,
    advancedSearchBody: state?.advancedSearch?.advancedSearchBody,
    populateGrid: state?.advancedSearch?.populateGrid,
    closeDialog: state?.advancedSearch?.closeDialog,
  };
};

const defaultListPayload = {
  index: 0,
  limit: 10,
  filter: [],
}

const columnFilterMapping = {
  userDefined: "user_defined",
  tier: "tier_value",
  labelName: "drug_label_name",
  ddid: "drug_descriptor_identifier",
  gpi: "generic_product_identifier",
  trademark: "trademark_code",
  databaseCategory: "database_category",
  databaseClass: "database_class",
  createdBy: "created_by",
  createdOn: "created_date",
  modifiedBy: "modified_by",
  modifiedOn: "modified_date",
}

class DrugDetailOther extends React.Component<any, any> {
  state = {
    isSearchOpen: false,
    panelGridTitle1: ["", "NUMBER OF DRUGS", "ADDED DRUGS", "REMOVED DRUGS"],
    panelTitleAlignment1: ["center", "center", "center", "center"],
    panelGridValue1: [],
    isNotesOpen: false,
    activeTabIndex: 0,
    columns: null,
    data: [],
    selectedCriteria: [],
    selectedDrugs: [],
    drugData: [],
    tabs: [
      { id: 1, text: "Replace" },
      { id: 2, text: "Append" },
      { id: 3, text: "Remove" },
    ],
    listCount: 0,
    showGrid: false,
    otherColumns: [
      {
        title: "User Defined Field",
        dataIndex: "udf",
        key: "udf",
      },
    ],
    otherData: [
      {
        key: "1",
        udf: "Some Value",
        code_value: ""
      },
    ],
  };

  listPayload: any = {
    index: 0,
    limit: 10,
    filter: [],
  }

  rpSavePayload: any = {
    is_covered: true,
    selected_drug_ids: [],
    is_select_all: false,
    covered: {},
    not_covered: {},
    id_edit: null,
    breadcrumb_code_value: null,
    filter: [],
    search_key: "",
  }

  rmSavePayload: any = {
    is_covered: true,
    selected_drug_ids: [],
    is_select_all: false,
    covered: {},
    not_covered: {},
    selected_criteria_ids: [],
    filter: [],
    search_key: ""
  }

  advanceSearchClickHandler = (event) => {
    event.stopPropagation();
    this.setState({ isSearchOpen: !this.state.isSearchOpen });
  };

  advanceSearchClosekHandler = () => {
    this.setState({ isSearchOpen: !this.state.isSearchOpen });
  };

  saveClickHandler = () => {
    console.log("Save METHOD");
    console.log("The Selected Drugs For Save = ", this.state.selectedDrugs);
    if (this.state.selectedDrugs && this.state.selectedDrugs.length > 0) {
      let apiDetails = {};
      apiDetails["apiPart"] = otConstants.APPLY_OTHER_DRUGS;
      apiDetails["keyVals"] = [
        { key: otConstants.KEY_ENTITY_ID, value: this.props?.formulary_id },
      ];
      apiDetails["messageBody"] = {};

      if (this.state.activeTabIndex === 0) {
        this.rpSavePayload.selected_drug_ids = this.state.selectedDrugs
        apiDetails["messageBody"] = this.rpSavePayload;
        apiDetails["pathParams"] = this.props?.formulary_id + "/" +  getLobCode(this.props.formulary_lob_id) + "/" + otConstants.TYPE_REPLACE;
        console.log("The API Details - ", apiDetails);

        // Replace Drug method call
        this.props.postReplaceOtherDrug(apiDetails).then((json) => {
          if (json.payload && json.payload.code && json.payload.code === "200") {
            showMessage("Success", "success");
            this.getOTHERSummary();
          } else {
            showMessage("Failure", "error");
          }
        });

      } else if(this.state.activeTabIndex === 2) {
        this.rmSavePayload.selected_drug_ids = this.state.selectedDrugs
        apiDetails["messageBody"] = this.rmSavePayload;
        apiDetails["pathParams"] = this.props?.formulary_id + "/" +  getLobCode(this.props.formulary_lob_id) + "/" + otConstants.TYPE_REMOVE;
        console.log("The API Details - ", apiDetails);

        // Remove Drug method call
        this.props.postRemoveOtherDrug(apiDetails).then((json) => {
          if (json.payload && json.payload.code && json.payload.code === "200") {
            showMessage("Success", "success");
            this.getOTHERSummary();
          } else {
            showMessage("Failure", "error");
          }
        });

      }
    }
  };
  
  onApplyFilterHandler = (filters) => {
    this.listPayload.filter = Array();
    if (filters && filter.length > 0) {
      const fetchedKeys = Object.keys(filters);
      fetchedKeys.map(fetchedProps => {
        if (filters[fetchedProps] && columnFilterMapping[fetchedProps]) {
          const fetchedOperator = filters[fetchedProps][0].condition === 'is like' ? 'is_like' :
            filters[fetchedProps][0].condition === 'is not' ? 'is_not' :
              filters[fetchedProps][0].condition === 'is not like' ? 'is_not_like' :
                filters[fetchedProps][0].condition === 'does not exist' ? 'does_not_exist' :
                  filters[fetchedProps][0].condition;
          
          let fetchedPropsValue;
          if(filters[fetchedProps][0].value !== '') {
            const fetchedPropsValueNum = Number(filters[fetchedProps][0].value.toString());
            fetchedPropsValue = isNaN(fetchedPropsValueNum) ? filters[fetchedProps][0].value.toString() : fetchedPropsValueNum
          }
          const fetchedValues = filters[fetchedProps][0].value !== '' ? [fetchedPropsValue] : [];
          this.listPayload.filter.push({ prop: columnFilterMapping[fetchedProps], operator: fetchedOperator, values: fetchedValues });
        }
      });
      this.getOtherList({ listPayload: this.listPayload });
    }
  }

  onPageSize = (pageSize) => {
    this.listPayload.limit = pageSize
    this.getOtherList({ limit: this.listPayload.limit });
  }

  onGridPageChangeHandler = (pageNumber: any) => {
    this.listPayload.index = (pageNumber - 1) * this.listPayload.limit;
    this.getOtherList({ index: this.listPayload.index, limit: this.listPayload.limit });
  }

  onClearFilterHandler = () => {
    this.listPayload.index = 0;
    this.listPayload.limit = 10;
    this.listPayload.filter = [];
    this.getOtherList({ index: defaultListPayload.index, limit: defaultListPayload.limit });
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

  getOTHERSummary = () => {
    let apiDetails = {};
    apiDetails["apiPart"] = otConstants.GET_DRUG_SUMMARY_OTHER;
    apiDetails["pathParams"] = this.props?.formulary_id;
    apiDetails["keyVals"] = [
      { key: otConstants.KEY_ENTITY_ID, value: this.props?.formulary_id },
    ];

    this.props.getDrugDetailsOTHERSummary(apiDetails).then((json) => {
      let tmpData =
        json.payload && json.payload.result ? json.payload.result : [];

      let rows = tmpData.map((ele) => {
        let curRow = [
          ele["edit_name"],
          ele["total_drug_count"],
          ele["added_drug_count"],
          ele["removed_drug_count"],
        ];
        return curRow;
      });

      let settingsRows = tmpData.map((ele) => {
        let curRow = {
          "key": ele["id_edit"],
          "udf": ele["edit_name"],
          "code_value": ele["code_value"]
        };
        return curRow;
      });

      this.setState({
        panelGridValue1: rows,
        otherData: settingsRows,
        showGrid: this.props.configureSwitch,
      });
    });
  };

  getOTHERCriteriaList = () => {
    let apiDetails = {};
    apiDetails["apiPart"] = otConstants.GET_OTHER_CRITERIA_LIST;
    apiDetails["pathParams"] = this.props?.formulary_id;
    apiDetails["keyVals"] = [
      { key: otConstants.KEY_ENTITY_ID, value: this.props?.formulary_id },
    ];

    this.props.getOTHERCriteriaList(apiDetails).then((json) => {
      let tmpData =
        json.payload && json.payload.result ? json.payload.result : [];

      let settingsRows = tmpData.map((ele) => {
        let curRow = {
          "key": ele["id_edit"],
          "udf": ele["edit_name"],
          "code_value": ele["code_value"]
        };
        return curRow;
      });

      this.setState({
        otherData: settingsRows,
      });
    });
  }

  getOtherList = ({index = 0, limit = 10, listPayload = {}, searchBody = {}} = {}) => {
    let apiDetails = {};
    apiDetails['apiPart'] = otConstants.GET_OTHER_DRUGS;
    apiDetails['pathParams'] = this.props?.formulary_id + "/" + getLobCode(this.props.formulary_lob_id);
    apiDetails['keyVals'] = [{ key: otConstants.KEY_ENTITY_ID, value: this.props?.formulary_id }, { key: otConstants.KEY_INDEX, value: index }, { key: otConstants.KEY_LIMIT, value: limit }];
    apiDetails['messageBody'] = listPayload;
    
    if (searchBody) {
      console.log("THe Search Body = ", searchBody, " and List Payload = ", listPayload);
      let merged = {...listPayload, ...searchBody};
      console.log("Merged Body = ", merged);
      apiDetails["messageBody"] = Object.assign(
        apiDetails["messageBody"],
        merged
      );
    }

    if(this.state.activeTabIndex === 2) {
      apiDetails['messageBody']['selected_criteria_ids'] = this.rmSavePayload.selected_criteria_ids;
    }

    let listCount = 0;
    this.props.getDrugDetailsOtherList(apiDetails).then((json) => {
      let tmpData = json.payload && json.payload.result ? json.payload.result : [];
      listCount = json.payload?.count;
      var data: any[] = [];
      let count = 1;
      var gridData = tmpData.map((el) => {
        var element = Object.assign({}, el);
        data.push(element);
        let gridItem = {};
        gridItem["id"] = count;
        gridItem["key"] = count;
        gridItem["userDefined"] = element.user_defined ? "" + element.user_defined : "";
        
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
    const columns = getDrugDetailsColumnOTHER();
    this.setState({
      columns: columns,
      data: data,
    });

    this.getOTHERSummary();
  }

  onClickTab = (selectedTabIndex: number) => {
    let activeTabIndex = 0;

    const tabs = this.state.tabs.map((tab: TabInfo, index: number) => {
      if (index === selectedTabIndex) {
        activeTabIndex = index;
      }
      return tab;
    });

    if(activeTabIndex === 0 || activeTabIndex === 1) {
      this.setState({ otherData: [] }, () => this.getOTHERSummary());
      
    } else if(activeTabIndex === 2) {
      this.setState({ otherData: [] }, () => this.getOTHERCriteriaList());
    }

    if(this.props.configureSwitch) {
      this.getOtherList();
    }

    this.clearSearch();

    this.setState({ tabs, activeTabIndex, showGrid: false, selectedCriteria: [] }, () => console.log("THe Selected Criteria = ", this.state.selectedCriteria));
  };

  clearSearch = () => {
    let payload = { advancedSearchBody: {}, populateGrid: false, closeDialog: false, listItemStatus: {} };
    this.props.setAdvancedSearch(payload);
  }

  componentWillUnmount() {
    this.clearSearch();
  }

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

  onSelectedRowKeysChange = (selectedRowKeys) => {
    this.state.selectedCriteria = [];
    if (selectedRowKeys && selectedRowKeys.length > 0) {
      console.log("The Selectetd Rows = ", selectedRowKeys);
      console.log("The other data = ", this.state.otherData);
      console.log("The Selected Row Keys Code value = ", selectedRowKeys[0], "   The Other data find = ", this.state.otherData.find(e => e.key === selectedRowKeys[0]))

      if(this.state.activeTabIndex === 0) {
        let codeValue = "", idEdit = "";
        for(let i=0; i<this.state.otherData.length; i++) {
          if(this.state.otherData[i].key === selectedRowKeys[0]) {
            console.log("The State code value = ", this.state.otherData[i].code_value)
            codeValue = this.state.otherData[i].code_value;
            idEdit = this.state.otherData[i].key;
          }
        }

        this.rpSavePayload.breadcrumb_code_value = codeValue;
        this.rpSavePayload.id_edit = idEdit;
        this.rmSavePayload.selected_criteria_ids = [];
        console.log("The Codevalue = ", codeValue, "---THe REPLACE Save Payload = ", this.rpSavePayload);

      } else if(this.state.activeTabIndex === 2) {
        let criteriaIds: any[] = [];
        for(let i=0; i<this.state.otherData.length; i++) {
          if(this.state.otherData[i].key === selectedRowKeys[i]) {
            console.log("The State code value = ", this.state.otherData[i].code_value)
            criteriaIds.push(this.state.otherData[i].code_value);
          }
        }

        this.rmSavePayload.selected_criteria_ids = criteriaIds;
        this.rpSavePayload.breadcrumb_code_value = "";
        this.rpSavePayload.id_edit = "";
        console.log("The criteriaIds = ", criteriaIds, "---THe REMOVE Save Payload = ", this.rmSavePayload);
      }

      this.setState({selectedCriteria: selectedRowKeys.map(otId => otId)});
    }
  }

  openOtherGridContainer = () => {
    this.getOtherList();
  };

  componentWillReceiveProps(nextProps) {
    console.log("-----Component Will Receive Props------", nextProps);
    // if(nextProps.configureSwitch) {
    //   this.getOtherList();
    // }

    if (nextProps.configureSwitch){
      this.setState({tabs:[
        { id: 1, text: "Replace", disabled: true },
        { id: 2, text: "Append", disabled: true },
        { id: 3, text: "Remove", disabled: true },
      ], activeTabIndex:0});

      this.getOtherList();
    } else {
      this.setState({tabs:[
        { id: 1, text: "Replace", disabled:false },
        { id: 2, text: "Append", disabled:true },
        { id: 3, text: "Remove", disabled:false },
      ]});
    }

    if (nextProps.advancedSearchBody && nextProps.populateGrid) {
      console.log("-----Inside Advance search Body if Condition-----advancedSearchBody ", nextProps.advancedSearchBody);
      console.log("-----Inside Advance search Body if Condition-----populateGrid ", nextProps.advancedSearchBody);
      this.getOtherList({ listPayload: this.listPayload, searchBody: nextProps.advancedSearchBody});
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

      console.log("---_Set Advanced Search payload = ", payload);
      this.props.setAdvancedSearch(payload);
    }
  }

  render() {
    const searchProps = {
      lobCode: this.props.lobCode,
      pageType: 0,
    };
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
            columns={getDrugDetailsColumnOTHER()}
            scroll={{ x: 2500, y: 377 }}
            isFetchingData={false}
            enableResizingOfColumns
            data={this.state.data}
            getPerPageItemSize={this.onPageSize}
            selectedCurrentPage={(this.listPayload.index/this.listPayload.limit + 1)}
            pageSize={this.listPayload.limit}
            onGridPageChangeHandler={this.onGridPageChangeHandler}
            totalRowsCount={this.state.listCount}
            clearFilterHandler={this.onClearFilterHandler}
            applyFilter={this.onApplyFilterHandler}
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
          <PanelHeader title="user defined" tooltip="user defined" />
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
                    disabled={this.props.configureSwitch}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="white-bg">
          <Grid item xs={5}>
            <div className="tier-grid-remove-container">
              <Table
                columns={this.state.otherColumns}
                dataSource={this.state.otherData}
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
          {!this.props.configureSwitch ? (
            <Row justify="end">
              <Col>
                <Button label="Apply" onClick={this.openOtherGridContainer} disabled={!(this.state.selectedCriteria.length > 0)}></Button>
              </Col>
            </Row>
          ) : null}
        </div>

        { this.state.showGrid ? (
        <div className="bordered">
          <div className="header space-between pr-10">
            Drug Grid
            <div className="button-wrapper">
              <Button
                className="Button normal"
                label="Advance Search"
                onClick={this.advanceSearchClickHandler}
              />
              {!this.props.configureSwitch ? <Button label="Save" onClick={this.saveClickHandler} disabled={!(this.state.selectedDrugs.length > 0)} /> : null}
            </div>
          </div>
          {dataGrid}
          {this.state.isSearchOpen ? (
            // <AdvancedSearch
            //   category="Grievances"
            //   openPopup={this.state.isSearchOpen}
            //   onClose={this.advanceSearchClosekHandler}
            // />
            <AdvanceSearchContainer
              {...searchProps}
              openPopup={this.state.isSearchOpen}
              onClose={this.advanceSearchClosekHandler}
              isAdvanceSearch={true}
            />
          ) : null}
        </div>
        ) : null }
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrugDetailOther);
