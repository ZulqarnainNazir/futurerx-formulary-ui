import React from "react";
import { connect } from "react-redux";
import { filter } from "lodash";
import { ToastContainer } from "react-toastify";
import PanelHeader from "../../../../shared/Frx-components/panel-header/PanelHeader";
import PanelGrid from "../../../../shared/Frx-components/panel-grid/PanelGrid";
import CustomizedSwitches from "../FormularyConfigure/components/CustomizedSwitches";
import { TabInfo } from "../../../../../models/tab.model";
import FrxMiniTabs from "../../../../shared/FrxMiniTabs/FrxMiniTabs";
import Button from "../../../../shared/Frx-components/button/Button";
import { getDrugDetailsColumnFFFCOMM } from "../../../DrugDetails/components/FormularyConfigure/DrugGridColumn";
import FrxLoader from "../../../../shared/FrxLoader/FrxLoader";
import AdvancedSearch from "../../../DrugDetails/components/FormularyConfigure/components/search/AdvancedSearch";
import { getDrugDetailsFFFSummary, getDrugDetailsFFFList, postRemoveFFFDrug, postReplaceFFFDrug } from "../../../../../redux/slices/formulary/drugDetails/fff/fffActionCreation";
import * as fffConstants from "../../../../../api/http-drug-details";
import getLobCode from "../../../Utils/LobUtils";
import FrxDrugGridContainer from "../../../../shared/FrxGrid/FrxDrugGridContainer";
import showMessage from "../../../Utils/Toast";
import AdvanceSearchContainer from "../../../NewAdvanceSearch/AdvanceSearchContainer";
import { setAdvancedSearch } from "../../../../../redux/slices/formulary/advancedSearch/advancedSearchSlice";

function mapDispatchToProps(dispatch) {
  return {
    getDrugDetailsFFFSummary: (a) => dispatch(getDrugDetailsFFFSummary(a)),
    getDrugDetailsFFFList: (a) => dispatch(getDrugDetailsFFFList(a)),
    postRemoveFFFDrug: (a) => dispatch(postRemoveFFFDrug(a)),
    postReplaceFFFDrug: (a) => dispatch(postReplaceFFFDrug(a)),
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
}

const columnFilterMapping = {
  freeFirstFill: "is_fff",
  tier: "tier_value",
  labelNamae: "drug_label_name",
  ddid: "drug_descriptor_identifier",
  gpi: "generic_product_identifier",
  trademark: "trademark_code",
  databaseCategory: "database_category",
  databaseClass: "database_class",
  createdBy: "created_by",
  createdOn: "created_date",
  modifiedBy: "modified_by",
  modifiedOn: "modified_date",
};

class DrugDetailFFF extends React.Component<any, any> {
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
      { id: 1, text: "Replace", disabled: false  },
      { id: 2, text: "Append", disabled: false  },
      { id: 3, text: "Remove", disabled: false  },
    ],
    listCount: 0,
    selectedDrugs: Array(),
    drugData: Array(),
  };

  listPayload: any = {
    index: 0,
    limit: 10,
    selected_criteria_ids: [],
  }

  rpSavePayload: any = {
    selected_drug_ids: [],
    is_select_all: false,
    covered: {},
    not_covered: {},
    selected_criteria_ids: [],
    filter: [],
    search_key: "",
    free_first_fill: ""
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
      apiDetails["apiPart"] = fffConstants.APPLY_FFF_DRUG;
      apiDetails["keyVals"] = [
        { key: fffConstants.KEY_ENTITY_ID, value: this.props?.formulary_id },
      ];
      apiDetails["messageBody"] = {};

      if (this.state.activeTabIndex === 0 || this.state.activeTabIndex === 1) {
        this.rpSavePayload.selected_drug_ids = this.state.selectedDrugs
        apiDetails["messageBody"] = this.rpSavePayload;
        apiDetails["pathParams"] = this.props?.formulary_id + "/" +  getLobCode(this.props.formulary_lob_id) + "/" + fffConstants.TYPE_REPLACE;
        console.log("The API Details - ", apiDetails);

        // Replace and Append Drug method call
        this.props.postReplaceFFFDrug(apiDetails).then((json) => {
          if (json.payload && json.payload.code && json.payload.code === "200") {
            showMessage("Success", "success");
            this.getFFFSummary();
            this.getFFFDrugsList();
          } else {
            showMessage("Failure", "error");
          }
        });

      } else if(this.state.activeTabIndex === 2) {
        this.rmSavePayload.selected_drug_ids = this.state.selectedDrugs
        apiDetails["messageBody"] = this.rmSavePayload;
        apiDetails["pathParams"] = this.props?.formulary_id + "/" +  getLobCode(this.props.formulary_lob_id) + "/" + fffConstants.TYPE_REMOVE;
        console.log("The API Details - ", apiDetails);

        // Remove Drug method call
        this.props.postRemoveFFFDrug(apiDetails).then((json) => {
          if (json.payload && json.payload.code && json.payload.code === "200") {
            showMessage("Success", "success");
            this.getFFFSummary();
            this.getFFFDrugsList();
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
      this.getFFFDrugsList({ listPayload: this.listPayload });
    }
  }

  onPageSize = (pageSize) => {
    this.listPayload.limit = pageSize
    this.getFFFDrugsList({ limit: this.listPayload.limit });
  }

  onGridPageChangeHandler = (pageNumber: any) => {
    this.listPayload.index = (pageNumber - 1) * this.listPayload.limit;
    this.getFFFDrugsList({ index: this.listPayload.index, limit: this.listPayload.limit });
  }

  onClearFilterHandler = () => {
    this.listPayload.index = 0;
    this.listPayload.limit = 10;
    this.listPayload.filter = [];
    this.getFFFDrugsList({ index: defaultListPayload.index, limit: defaultListPayload.limit });
  }

  onSelectedTableRowChanged = (selectedRowKeys) => {
    this.state.selectedDrugs = [];
    if (selectedRowKeys && selectedRowKeys.length > 0) {
      let selDrugs = selectedRowKeys.map(ele => {
        return this.state.drugData[ele - 1]['md5_id'] ? this.state.drugData[ele - 1]['md5_id'] : ""
      });

      
      if(this.state.activeTabIndex === 0) {
        this.rpSavePayload.selected_drug_ids = selDrugs;
        this.rmSavePayload.selected_drug_ids = [];
      } else if(this.state.activeTabIndex === 2) {
        this.rmSavePayload.selected_drug_ids = selDrugs;
        this.rpSavePayload.selected_drug_ids = [];
      }

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
        console.log("THE FFF from COmmercial = ", tmpData);

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

  getFFFDrugsList = ({index = 0, limit = 10, listPayload = {}, searchBody = {}} = {}) => {
    let apiDetails = {};
    apiDetails['apiPart'] = fffConstants.GET_FFF_FORMULARY_DRUGS;
    apiDetails['pathParams'] = this.props?.formulary_id + "/" + getLobCode(this.props.formulary_lob_id);
    apiDetails['keyVals'] = [{ key: fffConstants.KEY_ENTITY_ID, value: this.props?.formulary_id }, { key: fffConstants.KEY_INDEX, value: index }, { key: fffConstants.KEY_LIMIT, value: limit }];
    apiDetails["messageBody"] = {};
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

    console.log("The FFF List Payload = ", listPayload);
    console.log("The FFF List Api Details = ", apiDetails);

    let listCount = 0;
    this.props.getDrugDetailsFFFList(apiDetails).then((json) => {
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
        gridItem["freeFirstFill"] = element.is_fff && element.is_fff === true ? "Y" : "";
        gridItem["tier"] = element.tier_value ? "" + element.tier_value : "";
        gridItem["labelNamae"] = element.drug_label_name ? "" + element.drug_label_name : "";
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
      });
    });
  }

  componentDidMount() {
    this.getFFFSummary();

    console.log("The Active Tab index MOUNT = ", this.state.activeTabIndex);
    if(this.state.activeTabIndex === 0) {
      this.getFFFDrugsList();
    }
  }

  onClickTab = (selectedTabIndex: number) => {
    let activeTabIndex = 0;

    const tabs = this.state.tabs.map((tab: TabInfo, index: number) => {
      if (index === selectedTabIndex) {
        activeTabIndex = index;
      }
      return tab;
    });

    console.log("The Active tab index = ", activeTabIndex)

    if(activeTabIndex === 0 || activeTabIndex === 1) {
      this.listPayload.selected_criteria_ids = [];
      this.getFFFDrugsList({ listPayload: this.listPayload });
    } else if(activeTabIndex === 2) {
      console.log("GET LISTTHe Active Tab Index ===== 2")
      this.listPayload.selected_criteria_ids = ["Y"];
      this.getFFFDrugsList({ listPayload: this.listPayload });
    }

    // let payload = { advancedSearchBody: {}, populateGrid: false, closeDialog: false, listItemStatus: {} };
    // this.props.setAdvancedSearch(payload);
    this.clearSearch();

    this.setState({ tabs, activeTabIndex, showGrid: false });
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

  componentWillReceiveProps(nextProps) {
    console.log("-----Component Will Receive Props------", nextProps);

    if (nextProps.configureSwitch){
      this.setState({tabs:[
        { id: 1, text: "Replace", disabled: true },
        { id: 2, text: "Append", disabled: true },
        { id: 3, text: "Remove", disabled: true },
      ], activeTabIndex:0});

      this.getFFFDrugsList();
    } else {
      this.setState({tabs:[
        { id: 1, text: "Replace", disabled: false },
        { id: 2, text: "Append", disabled: false },
        { id: 3, text: "Remove", disabled: false },
      ]});
    }

    if (nextProps.advancedSearchBody && nextProps.populateGrid) {
      console.log("-----Inside Advance search Body if Condition-----advancedSearchBody ", nextProps.advancedSearchBody);
      console.log("-----Inside Advance search Body if Condition-----populateGrid ", nextProps.advancedSearchBody);
      this.getFFFDrugsList({ listPayload: this.listPayload, searchBody: nextProps.advancedSearchBody});
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
        <FrxDrugGridContainer
          isPinningEnabled={false}
          enableSearch={false}
          enableColumnDrag
          onSearch={() => {}}
          fixedColumnKeys={[]}
          pagintionPosition="topRight"
          gridName="DRUGSDETAILS"
          enableSettings={false}
          columns={getDrugDetailsColumnFFFCOMM()}
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
      );
    }

    return (
      <>
        <div className="bordered mb-10">
          <PanelHeader title="free first fill" tooltip="free first fill" />
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
        <ToastContainer />
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrugDetailFFF);
