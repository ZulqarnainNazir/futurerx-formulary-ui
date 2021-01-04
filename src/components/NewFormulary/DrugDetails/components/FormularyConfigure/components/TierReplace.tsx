import React from "react";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import "./Tier.scss";

import DropDown from "../../../../../shared/Frx-components/dropdown/DropDown";
import Button from "../../../../../shared/Frx-components/button/Button";
import Box from "@material-ui/core/Box";
import FrxDrugGridContainer from "../../../../../shared/FrxGrid/FrxDrugGridContainer";
import { tierColumns } from "../../../../../../utils/grid/columns";
import { TierMockData } from "../../../../../../mocks/TierMock";
//import AdvancedSearch from './search/AdvancedSearch';
import AdvanceSearchContainer from "../../../../NewAdvanceSearch/AdvanceSearchContainer";
import {
  postTierApplyInfo,
  getTier
} from "../../../../../../redux/slices/formulary/tier/tierActionCreation";
import * as tierConstants from "../../../../../../api/http-tier";
import * as commonConstants from "../../../../../../api/http-commons";
import pageTypes from "../../../../../../constants/PageTypes";
import { setAdvancedSearch } from "../../../../../../redux/slices/formulary/advancedSearch/advancedSearchSlice";
import showMessage from "../../../../Utils/Toast";
import SearchBox from "../../../../../shared/Frx-components/search-box/SearchBox";
import getLobCode from "../../../../Utils/LobUtils";

interface tabsState {
  tierGridContainer: boolean;
  isSearchOpen: boolean;
  fileTypes: any[];
  tierValues: any[];
  selectedTier: any;
  selectedFileKey: any;
  selectedFileType: any;
  drugData: any[];
  drugGridData: any[];
  selectedDrugs: any[];
  selectedRowKeys: number[];
  fixedSelectedRows: number[];
}

const mapStateToProps = state => {
  return {
    configureSwitch: state.switchReducer.configureSwitch,
    applyData: state.tierSliceReducer.applyData,
    formulary_id: state?.application?.formulary_id,
    formulary: state?.application?.formulary,
    formulary_lob_id: state?.application?.formulary_lob_id,
    formulary_type_id: state?.application?.formulary_type_id,
    advancedSearchBody: state?.advancedSearch?.advancedSearchBody,
    populateGrid: state?.advancedSearch?.populateGrid,
    closeDialog: state?.advancedSearch?.closeDialog
  };
};

function mapDispatchToProps(dispatch) {
  return {
    postTierApplyInfo: a => dispatch(postTierApplyInfo(a)),
    getTier: a => dispatch(getTier(a)),
    setAdvancedSearch: a => dispatch(setAdvancedSearch(a))
  };
}

class TierReplace extends React.Component<any, tabsState> {
  state = {
    tierGridContainer: false,
    isSearchOpen: false,
    tierValues: Array(),
    fileValues: Array(),
    drugData: Array(),
    drugGridData: Array(),
    selectedDrugs: Array(),
    selectedTier: -1,
    selectedFileKey: '',
    selectedFileType: "Full Formulary",
    fileTypes: [
      { type: "FRF", key: "FRF" },
      { type: "ORF/ERF", key: "OTC" },
      { type: "Non FRF Products", key: "NONFRF" },
      { type: "FRF Change Report", key: "FRFCR" },
      { type: "Full Formulary", key: "MCR" }
    ],
    selectedRowKeys: [] as number[],
    fixedSelectedRows: [] as number[]
  };

  constructor(props) {
    super(props);
    console.log(
      "Tier Replace constructor called. Props:" + JSON.stringify(props)
    );

    //this.initialize(this.props, true);
  }

  componentDidMount() {
    console.log('componentDidMount');
    this.initialize(this.props, true);
    if (this.props.configureSwitch) {
      this.state.tierGridContainer = true;
      if (this.props.advancedSearchBody) {
        this.populateGridData(this.props.advancedSearchBody);
      } else {
        this.populateGridData();
      }
    }
  }

  initialize = (props, initFileKey = false) => {
    var tierOptions = Array();
    let lobCode = getLobCode(this.props.formulary_lob_id);
    console.log('Initialize called:' + lobCode);
    if (props.tierOptions) {
      props.tierOptions.map(tier => {
        tierOptions.push(tier.tier_value);
      });
    }
    if (lobCode === "MCR") {
      let fileTypesModified: any[] = [];
      if (
        lobCode === "MCR" &&
        props.formulary_type_id &&
        props.formulary_type_id == 2
      ) {
        fileTypesModified.push({ type: "ADD", key: "ADD" });
        fileTypesModified.push({ type: "Full Formulary", key: lobCode });
      } else {
        this.state.fileTypes.map(fileType => {
          if (fileType.type === "Full Formulary") {
            fileType.key = lobCode;
          }
          fileTypesModified.push(fileType);
        });
      }
      this.state.fileTypes = fileTypesModified;
    } else if (lobCode === "COMM") {
      let fileTypesModified: any[] = [];
      fileTypesModified.push({ type: "Drug Table", key: "COMMDF" });
      fileTypesModified.push({ type: "Full Formulary", key: lobCode });
      this.state.fileValues = Array();

      this.state.fileValues.push("Drug Table");
      this.state.fileValues.push("Full Formulary");

      this.state.fileTypes = fileTypesModified;
    }
    this.state.tierValues = tierOptions;
    if (initFileKey) {
      this.state.selectedFileKey = lobCode;
    }
  };

  populateGridData = (searchBody = null) => {
    console.log("Populate grid data is called:" + this.state.selectedFileKey);
    let apiDetails = {};
    apiDetails["apiPart"] =
      this.state.selectedFileKey === this.props.lobCode
        ? tierConstants.FORMULARY_DRUGS_TIER
        : tierConstants.DRUGS_TIER;
    apiDetails["pathParams"] =
      this.props?.formulary_id +
      "/" +
      this.state.selectedFileKey +
      "/" +
      commonConstants.TYPE_REPLACE;
    apiDetails["keyVals"] = [
      { key: commonConstants.KEY_ENTITY_ID, value: this.props?.formulary_id },
      { key: commonConstants.KEY_INDEX, value: 0 },
      { key: commonConstants.KEY_LIMIT, value: 10 }
    ];
    apiDetails["messageBody"] = {};

    if (searchBody) {
      apiDetails["messageBody"] = Object.assign(
        apiDetails["messageBody"],
        searchBody
      );
    }

    const { selectedTier } = this.state;
    const drugGridDate = this.props.postTierApplyInfo(apiDetails).then(json => {
      //debugger;
      let tmpData = json.payload.result;
      var data: any[] = [];
      let count = 1;
      var gridData = tmpData.map(function(el, idx) {
        var element = Object.assign({}, el);
        data.push(element);
        let gridItem = {};
        gridItem["id"] = count;
        gridItem["key"] = count;
        //for preseelct items with selected tier value
        if (selectedTier === parseInt(element.tier_value)) {
          console.log("element value tier ", selectedTier, element.tier_value);
          gridItem["isChecked"] = true;
          gridItem["isDisabled"] = true;
          // decide on class names based on data properties conditionally
          // the required styles are added under each classNames in FrxGrid.scss (towards the end)
          //table-row--red-font (for red) table-row--green-font (for green) table-row--blue-font for default (for blue)
          gridItem["rowStyle"] = "table-row--blue-font";
        }
        //end
        gridItem["tier"] = element.tier_value;
        gridItem["fileType"] = element.file_type ? "" + element.file_type : "";
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
        fixedSelectedRows: gridData
          .filter(item => item.isChecked)
          .map(item => item.key),
        selectedRowKeys: gridData
          .filter(item => item.isChecked)
          .map(item => item.key)
      });
    });
  };

  handleSave = () => {
    console.log(" selected drugs ", this.state.selectedDrugs);
    if (
      this.state.selectedDrugs &&
      this.state.selectedDrugs.length > 0 &&
      this.state.selectedTier !== -1
    ) {
      let apiDetails = {};
      apiDetails["apiPart"] = tierConstants.APPLY_TIER;
      apiDetails["pathParams"] =
        this.props?.formulary_id +
        "/" +
        this.state.selectedFileKey +
        "/" +
        commonConstants.TYPE_REPLACE;
      apiDetails["keyVals"] = [];
      apiDetails["messageBody"] = {};
      apiDetails["messageBody"]["selected_drug_ids"] = this.state.selectedDrugs;
      apiDetails["messageBody"]["id_tier"] = this.state.selectedTier;

      const saveData = this.props.postTierApplyInfo(apiDetails).then(json => {
        console.log("Save response is:" + JSON.stringify(json));
        if (json.payload && json.payload.code && json.payload.code === "200") {
          showMessage("Success", "success");
          this.state.drugData = [];
          this.state.drugGridData = [];
          this.populateGridData();

          apiDetails = {};
          apiDetails["apiPart"] = tierConstants.FORMULARY_TIERS;
          apiDetails["pathParams"] = this.props?.formulary_id;
          apiDetails["keyVals"] = [
            {
              key: commonConstants.KEY_ENTITY_ID,
              value: this.props?.formulary_id
            }
          ];

          const TierDefinationData = this.props
            .getTier(apiDetails)
            .then(json => {
              this.setState({
                tierGridContainer: true
              });
            });
        } else {
          showMessage("Failure", "error");
        }
      });
    }
  };

  componentWillReceiveProps(nextProps) {
    console.log('TIER REPLACE: componentWillReceiveProps');
    this.initialize(nextProps, true);
    if (nextProps.advancedSearchBody && nextProps.populateGrid) {
      this.populateGridData(nextProps.advancedSearchBody);
      let payload = {
        advancedSearchBody: nextProps.advancedSearchBody,
        populateGrid: false,
        closeDialog: nextProps.closeDialog,
        listItemStatus: nextProps.listItemStatus
      };
      if (nextProps.closeDialog) {
        this.state.isSearchOpen = false;
        payload["closeDialog"] = false;
      }
      this.props.setAdvancedSearch(payload);
    }
    if (this.props.configureSwitch !== nextProps.configureSwitch) {
      if (nextProps.configureSwitch) {
        this.state.selectedFileKey = this.props.lobCode;
        this.state.selectedFileType = "Full Formulary";
        this.state.selectedTier = -1;

        if(!this.state.tierGridContainer){
          this.state.tierGridContainer = true;
        }

        if (this.props.advancedSearchBody) {
          this.populateGridData(this.props.advancedSearchBody);
        } else {
          this.populateGridData();
        }
      } else {
        this.state.selectedFileKey = 'COMMDF';
        this.state.selectedFileType = "Drug Table";

        if (this.state.selectedTier != -1) {
          if (this.props.advancedSearchBody) {
            this.populateGridData(this.props.advancedSearchBody);
          } else {
            this.populateGridData();
          }
        } else {
          this.setState({
            tierGridContainer: false
          });
        }
      }
    }
  }

  onSelectedTableRowChanged = selectedRowKeys => {
    console.log("selected row ", selectedRowKeys);

    this.state.selectedDrugs = [];
    this.setState({
      selectedRowKeys: [...selectedRowKeys]
    });
    if (selectedRowKeys && selectedRowKeys.length > 0) {
      this.state.selectedDrugs = selectedRowKeys.map(tierId => {
        let item = {};
        if (
          this.state.drugData[tierId - 1]["formulary_drug_id"] &&
          this.state.drugData[tierId - 1]["drug_id"]
        ) {
          item = {
            formulary_drug_id: this.state.drugData[tierId - 1][
              "formulary_drug_id"
            ],
            drug_id: this.state.drugData[tierId - 1]["drug_id"]
          };
        } else if (this.state.drugData[tierId - 1]["formulary_drug_id"]) {
          item = {
            formulary_drug_id: this.state.drugData[tierId - 1][
              "formulary_drug_id"
            ]
          };
        } else if (this.state.drugData[tierId - 1]["drug_id"]) {
          item = {
            drug_id: this.state.drugData[tierId - 1]["drug_id"],
            formulary_drug_id: this.state.drugData[tierId - 1][
              "formulary_drug_id"
            ]
          };
        }
        return item;
      });
    }
  };

  tierDropDownSelectHandler = (value, event) => {
    let tierIndex = event.key;
    let tierValue = event.value;

    if (this.props.lobCode === "MCR") {
      this.state.fileValues = [];
      this.state.selectedFileKey = this.props.lobCode;
      if (this.props.tierOptions && tierIndex < this.props.tierOptions.length) {
        let tierObject = this.props.tierOptions[tierIndex];
        if (
          this.props.lobCode === "MCR" &&
          this.props.formulary_type_id &&
          this.props.formulary_type_id == 2
        ) {
          this.state.fileTypes.map(fileType => {
            this.state.fileValues.push(fileType.type);
          });
        } else {
          if (tierObject.tier_label && tierObject.tier_label === "OTC") {
            this.state.fileValues.push("ORF/ERF");
            this.state.fileValues.push("Full Formulary");
          } else {
            this.state.fileTypes.map(fileType => {
              this.state.fileValues.push(fileType.type);
            });
          }
        }
      }
    }
    this.setState({ selectedTier: tierValue });
  };

  fileTypeDropDownSelectHandler = (value, event) => {
    let fileType = event.value.toString().trim();
    let fileKey = this.props.lobCode;

    if (fileType) {
      let filtered = this.state.fileTypes.filter(
        fileObject => fileObject.type.toString().trim() === fileType
      );
      if (filtered && filtered.length > 0) {
        fileKey = filtered[0].key;
      }
    }
    console.log("Selected file key is:" + fileKey);
    this.state.selectedFileKey = fileKey;
    //this.setState({ selectedFileKey: fileKey });

    if (this.props.advancedSearchBody) {
      this.populateGridData(this.props.advancedSearchBody);
    } else {
      this.populateGridData();
    }
  };

  openTierGridContainer = () => {
    this.state.drugData = [];
    this.state.drugGridData = [];
    this.setState({ tierGridContainer: true });
    if (this.props.advancedSearchBody) {
      this.populateGridData(this.props.advancedSearchBody);
    } else {
      this.populateGridData();
    }
  };
  advanceSearchClickHandler = event => {
    event.stopPropagation();
    this.setState({ isSearchOpen: !this.state.isSearchOpen });
  };
  advanceSearchClosekHandler = () => {
    this.setState({ isSearchOpen: !this.state.isSearchOpen });
  };

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
    const searchProps = {
      lobCode: this.props.lobCode,
      pageType: pageTypes.TYPE_TIER
    };
    return (
      <>
        <div className="group tier-dropdown white-bg">
          <Grid container>
            <Grid item xs={4}>
              <label>
                TIER <span className="astrict">*</span>
              </label>
              <DropDown
                value={this.state.selectedTier !== -1 ? this.state.selectedTier : ''}
                options={this.state.tierValues}
                disabled={this.props.configureSwitch}
                onSelect={this.tierDropDownSelectHandler}
              />
            </Grid>
            <Grid item xs={1}>
              <Box display="flex" justifyContent="flex-end">
                <Button
                  label="Apply"
                  onClick={this.openTierGridContainer}
                  disabled={this.props.configureSwitch}
                />
              </Box>
            </Grid>
          </Grid>
        </div>
        {this.state.tierGridContainer && (
          <div className="select-drug-from-table">
            <div className="bordered white-bg">
              <div className="header pr-10">
                {(this.props.lobCode === "MCR" || this.props.lobCode === "COMM") && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between"
                    }}
                  >
                    <span style={{ marginRight: 10 }}>Select Drugs From</span>
                    <DropDown
                      options={this.state.fileValues}
                      disabled={this.props.configureSwitch}
                      onSelect={this.fileTypeDropDownSelectHandler}
                      defaultValue={this.state.selectedFileType}
                    />
                  </div>
                )}
                <div className="tier-drug-grid-header-actions">
                  <SearchBox
                    iconPosition="left"
                    className="search-input"
                    placeholder="Search"
                  />
                  <Button
                    className="Button normal"
                    label="Advance Search"
                    onClick={this.advanceSearchClickHandler}
                  />
                  <Button
                    label="Save"
                    onClick={this.handleSave}
                    disabled={this.props.configureSwitch}
                  />
                </div>
              </div>

              <div className="tier-grid-container">
                <FrxDrugGridContainer
                  isPinningEnabled={false}
                  enableSearch={false}
                  enableColumnDrag
                  onSearch={() => { }}
                  fixedColumnKeys={[]}
                  pagintionPosition="topRight"
                  gridName="TIER"
                  enableSettings
                  columns={tierColumns()}
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
                  //   selectedRowKeys: this.state.selectedRowKeys,
                  // 	fixed: true,

                  //   type: "checkbox",
                  //   onChange: this.onSelectedTableRowChanged
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

export default connect(mapStateToProps, mapDispatchToProps)(TierReplace);
