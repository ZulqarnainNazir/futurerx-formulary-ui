import React, { Component } from "react";
import PureAccordion from "../../../../../../shared/Frx-components/accordion/PureAccordion";
import { ReactComponent as HideIcon } from "../../../../../../../assets/icons/HideIcon.svg";
import { ReactComponent as ShowIcon } from "../../../../../../../assets/icons/ShowIcon.svg";
import "./CompareTable.scss";
import InnerGrid from "./InnerGrid";
import Button from "../../../../../../shared/Frx-components/button/Button";
import DialogPopup from "../../../../../../shared/FrxDialogPopup/FrxDialogPopup";
import FrxGridContainer from "../../../../../../shared/FrxGrid/FrxGridContainer";
import { getCompareFormularyViewAllGridColumns } from "../../../../../../../mocks/formulary-grid/FormularyGridColumn";
import { getCompareFormularyViewAllGridData } from "../../../../../../../mocks/formulary-grid/FormularyGridData";
import { getMainComparison } from "../../../../../../../redux/slices/formulary/compareView/compareViewService";
import * as commonConstants from "../../../../../../../api/http-commons";
import * as compareConstants from "../../../../../../../api/http-compare-view";
import { connect } from "react-redux";
import showMessage from "../../../../../Utils/Toast";
import {
  dateFilters,
  textFilters,
  numberFilters,
} from "../../../../../../../utils/grid/filters";

function mapDispatchToProps(dispatch) {
  return {};
}

const mapStateToProps = (state) => {
  return {
    formulary_id: state?.application?.formulary_id,
    formulary: state?.application?.formulary,
    formulary_lob_id: state?.application?.formulary_lob_id,
    formulary_type_id: state?.application?.formulary_type_id,
  };
};

class CompareTable extends Component<any, any> {
  state = {
    showCheckbox: false,
    toggleAllAccordion: true,
    showViewAll: false,
    showViewAllNonMatch: false,
    columns: [],
    data: [],
    scroll: {
      x: 4600,
      y: 500,
    },
    formularyTypesGridData: Array(),
  };

  toggleShowViewAll = () => {
    this.setState({
      showViewAll: !this.state.showViewAll,
    });
  };

  getBackgroundColor = (type) => {
    switch (type) {
      case "Tier":
        return "rgba(31, 187, 196, 0.4)";

      case "Category/Class":
        return "rgba(10, 123, 225, 0.4)";

      case "Prior Authorization (PA)":
        return "#FFF5F0";

      case "Step Therpay (ST)":
        return "rgba(244, 175, 100, 0.4)";

      case "Quantity Limits (QL)":
        return "rgba(213, 255, 215, 0.5)";

      case "Drug Details":
        return "rgba(224, 237, 81, 0.4)";

      case "User Defined":
        return "#ECF5FA";
    }
  };

  getGridColumns = (type, subType: any = null) => {
    let columns = [
      {
        id: 1,
        position: 1,
        sorter: {},
        textCase: "upper",
        pixelWidth: 100,
        key: "label",
        displayTitle: "Label Name",
        dataType: "string",
        isFilterable: true,
        filters: textFilters,
        hidden: false,
        sortDirections: ["ascend", "descend"],
      },

      {
        id: 2,
        position: 2,
        sorter: {},
        textCase: "upper",
        pixelWidth: 100,
        key: "fileType",
        displayTitle: "File Type",
        dataType: "string",
        isFilterable: true,
        filters: textFilters,
        hidden: false,
        sortDirections: ["ascend", "descend"],
      },

      {
        id: 3,
        position: 3,
        sorter: {},
        textCase: "upper",
        pixelWidth: 100,
        key: "dataSource",
        displayTitle: "Data Source",
        dataType: "string",
        isFilterable: true,
        filters: textFilters,
        hidden: false,
        sortDirections: ["ascend", "descend"],
      },

      {
        id: 4,
        position: 4,
        sorter: {},
        textCase: "upper",
        pixelWidth: 100,
        key: "gpi",
        displayTitle: "GPI",
        dataType: "string",
        isFilterable: true,
        filters: textFilters,
        hidden: false,
        sortDirections: ["ascend", "descend"],
      },
    ];
    switch (type) {
      case "Tier":
        columns = [
          ...columns,
          ...[
            {
              id: 5,
              position: 5,
              sorter: {},
              textCase: "upper",
              pixelWidth: 100,
              key: "tier",
              displayTitle: "Tier",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
          ],
        ];
        return columns;

      case "Category/Class":
        columns = [
          {
            id: 1,
            position: 1,
            sorter: {},
            textCase: "upper",
            pixelWidth: 100,
            key: "category",
            displayTitle: "Category",
            dataType: "string",
            isFilterable: true,
            filters: textFilters,
            hidden: false,
            sortDirections: ["ascend", "descend"],
          },
          {
            id: 2,
            position: 2,
            sorter: {},
            textCase: "upper",
            pixelWidth: 100,
            key: "class",
            displayTitle: "Class",
            dataType: "string",
            isFilterable: true,
            filters: textFilters,
            hidden: false,
            sortDirections: ["ascend", "descend"],
          },
        ];
        return columns;

      case "PA Group Descriptions":
        columns = [
          {
            id: 1,
            position: 1,
            sorter: {},
            textCase: "upper",
            pixelWidth: 100,
            key: "groupDescription",
            displayTitle: "Group Description",
            dataType: "string",
            isFilterable: true,
            filters: textFilters,
            hidden: false,
            sortDirections: ["ascend", "descend"],
          },
        ];
        return columns;

      case "Prior Authorization (PA)":
        columns = [
          ...columns,
          ...[
            {
              id: 5,
              position: 5,
              sorter: {},
              textCase: "upper",
              pixelWidth: 100,
              key: "paType",
              displayTitle: "PA Type",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
            {
              id: 6,
              position: 6,
              sorter: {},
              textCase: "upper",
              pixelWidth: 100,
              key: "paGroupDescription",
              displayTitle: "PA Group Description",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
          ],
        ];
        return columns;

      case "Step Therpay (ST)":
        columns = [
          ...columns,
          ...[
            {
              id: 5,
              position: 5,
              sorter: {},
              textCase: "upper",
              pixelWidth: 100,
              key: "stType",
              displayTitle: "ST Type",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
            {
              id: 6,
              position: 6,
              sorter: {},
              textCase: "upper",
              pixelWidth: 100,
              key: "stGroupDescription",
              displayTitle: "ST Group Description",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
            {
              id: 7,
              position: 7,
              sorter: {},
              textCase: "upper",
              pixelWidth: 100,
              key: "stValue",
              displayTitle: "ST Value",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
          ],
        ];
        return columns;

      case "ST Group Descriptions":
        columns = [
          {
            id: 1,
            position: 1,
            sorter: {},
            textCase: "upper",
            pixelWidth: 100,
            key: "groupDescription",
            displayTitle: "Group Description",
            dataType: "string",
            isFilterable: true,
            filters: textFilters,
            hidden: false,
            sortDirections: ["ascend", "descend"],
          },
        ];
        return columns;

      case "Quantity Limits (QL)":
        columns = [
          ...columns,
          ...[
            {
              id: 5,
              position: 5,
              sorter: {},
              textCase: "upper",
              pixelWidth: 100,
              key: "qlType",
              displayTitle: "QL Type",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
            {
              id: 6,
              position: 6,
              sorter: {},
              textCase: "upper",
              pixelWidth: 100,
              key: "qlDays",
              displayTitle: "QL Days",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
            {
              id: 7,
              position: 7,
              sorter: {},
              textCase: "upper",
              pixelWidth: 100,
              key: "qlPeriodofTime",
              displayTitle: "QL Period of Time",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
            {
              id: 8,
              position: 8,
              sorter: {},
              textCase: "upper",
              pixelWidth: 100,
              key: "qlQuantity",
              displayTitle: "QL Quantity",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
            {
              id: 9,
              position: 9,
              sorter: {},
              textCase: "upper",
              pixelWidth: 100,
              key: "fillsAllowed",
              displayTitle: "Fills Allowed",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
            {
              id: 10,
              position: 10,
              sorter: {},
              textCase: "upper",
              pixelWidth: 100,
              key: "fullLimitPeriod",
              displayTitle: "Full Limit Period of Time",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
          ],
        ];
        return columns;

      case "Drug Details":
        switch (subType) {
          case "Age Limits":
            columns = [
              ...columns,
              ...[
                {
                  id: 5,
                  position: 5,
                  sorter: {},
                  textCase: "upper",
                  pixelWidth: 100,
                  key: "minCovered",
                  displayTitle: "Minimum Age [Covered]",
                  dataType: "string",
                  isFilterable: true,
                  filters: textFilters,
                  hidden: false,
                  sortDirections: ["ascend", "descend"],
                },
                {
                  id: 6,
                  position: 6,
                  sorter: {},
                  textCase: "upper",
                  pixelWidth: 100,
                  key: "maxCovered",
                  displayTitle: "Maximum Age [Covered]",
                  dataType: "string",
                  isFilterable: true,
                  filters: textFilters,
                  hidden: false,
                  sortDirections: ["ascend", "descend"],
                },
                {
                  id: 7,
                  position: 7,
                  sorter: {},
                  textCase: "upper",
                  pixelWidth: 100,
                  key: "minCoveredCond",
                  displayTitle: "Minimum Condition [Covered]",
                  dataType: "string",
                  isFilterable: true,
                  filters: textFilters,
                  hidden: false,
                  sortDirections: ["ascend", "descend"],
                },
                {
                  id: 8,
                  position: 8,
                  sorter: {},
                  textCase: "upper",
                  pixelWidth: 100,
                  key: "maxCoveredCond",
                  displayTitle: "Maximum Condition [Covered]",
                  dataType: "string",
                  isFilterable: true,
                  filters: textFilters,
                  hidden: false,
                  sortDirections: ["ascend", "descend"],
                },
                {
                  id: 9,
                  position: 9,
                  sorter: {},
                  textCase: "upper",
                  pixelWidth: 100,
                  key: "minNotCovered",
                  displayTitle: "Minimum Age [Not Covered]",
                  dataType: "string",
                  isFilterable: true,
                  filters: textFilters,
                  hidden: false,
                  sortDirections: ["ascend", "descend"],
                },
                {
                  id: 10,
                  position: 10,
                  sorter: {},
                  textCase: "upper",
                  pixelWidth: 100,
                  key: "maxNotCovered",
                  displayTitle: "Maximum Age [Not Covered]",
                  dataType: "string",
                  isFilterable: true,
                  filters: textFilters,
                  hidden: false,
                  sortDirections: ["ascend", "descend"],
                },
                {
                  id: 11,
                  position: 11,
                  sorter: {},
                  textCase: "upper",
                  pixelWidth: 100,
                  key: "minNotCoveredCond",
                  displayTitle: "Minimum Condition [Not Covered]",
                  dataType: "string",
                  isFilterable: true,
                  filters: textFilters,
                  hidden: false,
                  sortDirections: ["ascend", "descend"],
                },
                {
                  id: 12,
                  position: 12,
                  sorter: {},
                  textCase: "upper",
                  pixelWidth: 100,
                  key: "maxNotCoveredCond",
                  displayTitle: "Maximum Condition [Not Covered]",
                  dataType: "string",
                  isFilterable: true,
                  filters: textFilters,
                  hidden: false,
                  sortDirections: ["ascend", "descend"],
                },
              ],
            ];
            return columns;

          default:
            columns = [
              ...columns,
              ...[
                {
                  id: 5,
                  position: 5,
                  sorter: {},
                  textCase: "upper",
                  pixelWidth: 100,
                  key: "covered",
                  displayTitle: "Covered",
                  dataType: "string",
                  isFilterable: true,
                  filters: textFilters,
                  hidden: false,
                  sortDirections: ["ascend", "descend"],
                },
                {
                  id: 6,
                  position: 6,
                  sorter: {},
                  textCase: "upper",
                  pixelWidth: 100,
                  key: "notCovered",
                  displayTitle: "Not Covered",
                  dataType: "string",
                  isFilterable: true,
                  filters: textFilters,
                  hidden: false,
                  sortDirections: ["ascend", "descend"],
                },
              ],
            ];
            return columns;
        }

      case "User Defined":
        columns = [
          ...columns,
          ...[
            {
              id: 5,
              position: 5,
              sorter: {},
              textCase: "upper",
              pixelWidth: 100,
              key: "userDefined",
              displayTitle: "User Defined",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
          ],
        ];
        return columns;
    }
    return Array();
  };

  areAllNull = (type) => {
    switch (type) {
      case "Category/Class":
        return true;

      case "Drug Details":
        return true;

      case "User Defined":
        return true;

      default:
        return false;
    }
  };

  areOnlyLastThreeNull = (type) => {
    switch (type) {
      case "Tier":
        return true;

      case "Prior Authorization (PA)":
        return true;

      case "Step Therpay (ST)":
        return true;

      case "Quantity Limits (QL)":
        return true;

      default:
        return false;
    }
  };

  populateComparisionData = async () => {
    if (this.props.formulary_lob_id && this.props.formulary_lob_id === 4) {
      let formularyTypesGridData = Array();
      let apiDetails = {};
      apiDetails["apiPart"] = compareConstants.COMMERCIAL_COMPARE_ALL;
      apiDetails["pathParams"] =
        this.props.baseformulary["id_formulary"] +
        "/" +
        this.props.referenceformulary["id_formulary"];

      try {
        const data = await getMainComparison(apiDetails);
        if (data && data.length > 0) {
          let idCount = 1;
          data.map((value) => {
            let header = {
              id: idCount,
              title: value["attribute_type"],
              titleBG: this.getBackgroundColor(value["attribute_type"]),
              attribute_type: value["attribute_type"],
              file_type: value["file_type"],
              headDrugsCount: {
                baseFormulary: null,
                referenceFormulary: null,
                baseOnly: null,
                referenceOnly: null,
                nonMatch: null,
              },
              formularies: Array(),
            };
            if (!this.areAllNull(value["attribute_type"])) {
              if (this.areOnlyLastThreeNull(value["attribute_type"])) {
                header.headDrugsCount.baseFormulary =
                  value["total_base_drugs_count"];
                header.headDrugsCount.referenceFormulary =
                  value["total_reference_drugs_count"];
                header.headDrugsCount.baseOnly =
                  value["total_drugs_in_base_not_in_reference"];
                header.headDrugsCount.referenceOnly =
                  value["total_drugs_in_reference_not_in_base"];
                header.headDrugsCount.nonMatch =
                  value["total_matching_formulary_drugs_count"];
              } else {
                header.headDrugsCount.baseFormulary =
                  value["total_base_drugs_count"];
                header.headDrugsCount.referenceFormulary =
                  value["total_reference_drugs_count"];
              }
            }
            let valueId = 1;
            if (value["values"] && value["values"].length > 0) {
              value["values"].map((subValue) => {
                let gridColumns: any[] = Array();
                if (
                  subValue["attribute_name"] === "PA Group Descriptions" ||
                  subValue["attribute_name"] === "ST Group Descriptions"
                ) {
                  gridColumns = this.getGridColumns(subValue["attribute_name"]);
                } else if (value["attribute_type"] === "Drug Details") {
                  gridColumns = this.getGridColumns(
                    value["attribute_type"],
                    subValue["attribute_name"]
                  );
                } else {
                  gridColumns = this.getGridColumns(value["attribute_type"]);
                }
                let subItem = {
                  name: subValue["attribute_name"],
                  baseFormulary: subValue["base_formulary_drugs_count"],
                  referenceFormulary:
                    subValue["reference_formulary_drugs_count"],
                  baseOnly: subValue["drugs_in_base_not_in_reference"],
                  referenceOnly: subValue["drugs_in_reference_not_in_base"],
                  nonMatch: subValue["matching_formulary_drugs_count"],
                  attribute_type: value["attribute_type"],
                  file_type: value["file_type"],
                  attribute_field_data_type:
                    subValue["attribute_field_data_type"],
                  attribute_field_name: subValue["attribute_field_name"],
                  attribute_field_value: subValue["attribute_field_value"],
                  attribute_name: subValue["attribute_name"],
                  source: subValue["source"],
                  gridColumns: gridColumns,
                };
                header.formularies.push(subItem);
                valueId++;
              });
            }
            formularyTypesGridData.push(header);
            idCount++;
          });
          this.setState({
            formularyTypesGridData: formularyTypesGridData,
            columns: getCompareFormularyViewAllGridColumns(),
            data: getCompareFormularyViewAllGridData(),
          });
        } else {
          showMessage("Compare data is empty", "error");
          this.setState({
            formularyTypesGridData: formularyTypesGridData,
            columns: getCompareFormularyViewAllGridColumns(),
            data: getCompareFormularyViewAllGridData(),
          });
        }
      } catch (err) {
        console.log(err);
        showMessage("Error while fetching data", "error");
        this.setState({
          formularyTypesGridData: formularyTypesGridData,
          columns: getCompareFormularyViewAllGridColumns(),
          data: getCompareFormularyViewAllGridData(),
        });
      }
    } else {
      this.setState({
        formularyTypesGridData: formularyTypesGridData,
        columns: getCompareFormularyViewAllGridColumns(),
        data: getCompareFormularyViewAllGridData(),
      });
    }
  };

  componentDidMount() {
    if (
      this.props.baseformulary &&
      this.props.referenceformulary &&
      this.props.baseformulary["id_formulary"] &&
      this.props.referenceformulary["id_formulary"]
    ) {
      this.populateComparisionData();
    }
  }

  render() {
    const {
      showCheckbox,
      toggleAllAccordion,
      showViewAll,
      showViewAllNonMatch,
      scroll,
      data,
      columns,
      formularyTypesGridData,
    } = this.state;
    return (
      <>
        <div className="bordered-grid">
          <div className="__root_compare-grid-container">
            <div className="__root_compare-grid-container-parent-el">
              {/* Top Header Grid*/}
              <div className="border-bottom accordion-section-wrapper-first-col">
                <div className="header-first-child-container">
                  <div
                    className="header-first-child-container-child"
                    onClick={() =>
                      this.setState({
                        showCheckbox: !this.state.showCheckbox,
                      })
                    }
                  >
                    {showCheckbox ? (
                      <HideIcon
                        style={{
                          margin: "2px 3px 0 0",
                        }}
                      />
                    ) : (
                        <ShowIcon
                          style={{
                            margin: "2px 3px 0 0",
                          }}
                        />
                      )}
                    <p>{showCheckbox ? "Hide" : "Show"} Checkboxes</p>
                  </div>
                  <div
                    className="header-first-child-container-child"
                    onClick={() => {
                      this.setState({
                        toggleAllAccordion: !toggleAllAccordion,
                      });
                    }}
                  >
                    <p>{!toggleAllAccordion ? "Collapse All" : "Expand All"}</p>
                  </div>
                </div>
              </div>
              <div className="border-bottom font-style bg-grey">
                <span>BASE FORMULARY</span>
              </div>
              <div className="border-bottom font-style bg-green">
                <span>reference FORMULARY</span>
              </div>
              <div className="border-bottom font-style">
                <span>BASE ONLY</span>
              </div>
              <div className="border-bottom font-style">
                <span>reference only</span>
              </div>
              <div className="border-bottom font-style no-border">
                <span>non-match base & reference</span>
              </div>
            </div>
            {/* First Accordion Grid */}
            {/* <div className="tier-header"> */}
            {formularyTypesGridData.map((accordionHeader) => (
              <div key={accordionHeader.id}>
                <PureAccordion
                  tableType={"COMPARE"}
                  title={accordionHeader.title}
                  titleBG={accordionHeader.titleBG}
                  showCheckbox={showCheckbox}
                  baseformulary={this.props.baseformulary}
                  referenceformulary={this.props.referenceformulary}
                  content={() => {
                    return (
                      <InnerGrid
                        tableType={"COMPARE"}
                        dataArr={accordionHeader.formularies}
                        formularyType={accordionHeader.title}
                        baseformulary={this.props.baseformulary}
                        referenceformulary={this.props.referenceformulary}
                        formularyLobId={this.props.formulary_lob_id}
                      />
                    );
                  }}
                  headerData={accordionHeader.headDrugsCount}
                  toggleAllAccordion={toggleAllAccordion}
                />
              </div>
            ))}
          </div>
          <div className="__root_compare-grid-footer-container">
            <div className="border-none"></div>
            <div className="border-cells-t-l view-all-btn">
              <Button label={"View All"} />
            </div>
            <div className="border-cells-t-l view-all-btn">
              <Button label={"View All"} />
            </div>
            <div className="border-cells-t-l view-all-btn">
              <Button label={"View All"} onClick={this.toggleShowViewAll} />
            </div>
            <div className="border-cells-t-l border-right-none view-all-btn">
              <Button label={"View All"} onClick={this.toggleShowViewAll} />
            </div>
          </div>
        </div>
        {showViewAll ? (
          <DialogPopup
            showCloseIcon={true}
            positiveActionText="Reject"
            negativeActionText=""
            title="view all"
            handleClose={this.toggleShowViewAll}
            handleAction={() => { }}
            showActions={true}
            height="80%"
            width="80%"
            open={showViewAll}
          >
            <FrxGridContainer
              enableSearch={false}
              enableColumnDrag
              onSearch={() => { }}
              fixedColumnKeys={[]}
              pagintionPosition="topRight"
              gridName=""
              isFetchingData={false}
              columns={columns}
              scroll={scroll}
              enableResizingOfColumns={false}
              data={data}
              // pinning columns
              isPinningEnabled={true}
              // setting gear 1st column
              enableSettings={true}
              // checkbox 2nd column
              isCustomCheckboxEnabled={true}
              // event reference for checkbox (mandotory if checkbox is true)
              handleCustomRowSelectionChange={(r) => {
                console.log(r);
              }}
              // settingsWidth
              settingsWidth={15}
              // checkBoxWidth
              checkBoxWidth={15}
              // settings icon prop
              customSettingIcon={"NONE"}
            />
          </DialogPopup>
        ) : null}
      </>
    );
  }
}

const temporaryObj1 = {
  baseFormulary: 11,
  referenceFormulary: 25,
  baseOnly: null,
  referenceOnly: null,
  nonMatch: null,
};

const temporaryObj2 = {
  baseFormulary: 11,
  referenceFormulary: null,
  baseOnly: 10,
  referenceOnly: null,
  nonMatch: 50,
};

const temporaryObj3 = {
  baseFormulary: 11,
  referenceFormulary: null,
  baseOnly: 22,
  referenceOnly: 45,
  nonMatch: 20,
};

const temporaryObj4 = {
  baseFormulary: null,
  referenceFormulary: null,
  baseOnly: null,
  referenceOnly: null,
  nonMatch: null,
};

export const formularyTypesGridData = [
  {
    id: 1,
    title: "TIER",
    titleBG: "rgba(31, 187, 196, 0.4)",
    headDrugsCount: temporaryObj1,
    formularies: [
      {
        name: "Tier 1",
        baseFormulary: 11,
        referenceFormulary: 4,
        baseOnly: 10,
        referenceOnly: 9,
        nonMatch: 50,
      },
      {
        name: "Tier 2",
        baseFormulary: 11,
        referenceFormulary: 9,
        baseOnly: 22,
        referenceOnly: 45,
        nonMatch: 20,
      },
      {
        name: "Tier 3",
        baseFormulary: 11,
        referenceFormulary: 25,
        baseOnly: 0,
        referenceOnly: 4,
        nonMatch: 8,
      },
      {
        name: "Tier 4",
        baseFormulary: 11,
        referenceFormulary: 25,
        baseOnly: 0,
        referenceOnly: 4,
        nonMatch: 8,
      },
    ],
  },
  {
    id: 2,
    title: "CATEGORY/VIEW",
    titleBG: "rgba(10, 123, 225, 0.4)",
    headDrugsCount: temporaryObj4,
    formularies: [
      {
        name: "TX category",
        baseFormulary: 11,
        referenceFormulary: 4,
        baseOnly: 10,
        referenceOnly: 9,
        nonMatch: 50,
      },
      {
        name: "TX Class",
        baseFormulary: 11,
        referenceFormulary: 9,
        baseOnly: 22,
        referenceOnly: 45,
        nonMatch: 20,
      },
    ],
  },
  {
    id: 3,
    title: "PRIOR AUTHORIZATION (PA)",
    titleBG: "#FFF5F0",
    headDrugsCount: temporaryObj3,
    formularies: [
      {
        name: "pa type 1",
        baseFormulary: 11,
        referenceFormulary: 4,
        baseOnly: 10,
        referenceOnly: 9,
        nonMatch: 50,
      },
      {
        name: "pa type 2",
        baseFormulary: 11,
        referenceFormulary: 9,
        baseOnly: 22,
        referenceOnly: 45,
        nonMatch: 20,
      },
      {
        name: "pa type 3",
        baseFormulary: 11,
        referenceFormulary: 25,
        baseOnly: 0,
        referenceOnly: 4,
        nonMatch: 8,
      },
      {
        name: "pa group descriptions",
        baseFormulary: 11,
        referenceFormulary: 25,
        baseOnly: 0,
        referenceOnly: 4,
        nonMatch: 8,
      },
    ],
  },
  {
    id: 4,
    title: "STEP THERAPY (ST)",
    titleBG: "rgba(244, 175, 100, 0.4)",
    headDrugsCount: temporaryObj1,
    formularies: [
      {
        name: "st type 1",
        baseFormulary: 11,
        referenceFormulary: 4,
        baseOnly: 10,
        referenceOnly: 9,
        nonMatch: 50,
      },
      {
        name: "st type 2",
        baseFormulary: 11,
        referenceFormulary: 9,
        baseOnly: 22,
        referenceOnly: 45,
        nonMatch: 20,
      },
      {
        name: "st group descriptions",
        baseFormulary: 11,
        referenceFormulary: 25,
        baseOnly: 0,
        referenceOnly: 4,
        nonMatch: 8,
      },
      {
        name: "step value 1",
        baseFormulary: 11,
        referenceFormulary: 25,
        baseOnly: 0,
        referenceOnly: 4,
        nonMatch: 8,
      },
      {
        name: "step value 2",
        baseFormulary: 11,
        referenceFormulary: 25,
        baseOnly: 0,
        referenceOnly: 4,
        nonMatch: 8,
      },
      {
        name: "step value 3",
        baseFormulary: 11,
        referenceFormulary: 25,
        baseOnly: 0,
        referenceOnly: 4,
        nonMatch: 8,
      },
    ],
  },
  {
    id: 5,
    title: "QUANTITY LIMITS (QT)",
    titleBG: "rgba(213, 255, 215, 0.5)",
    headDrugsCount: temporaryObj3,
    formularies: [
      {
        name: "ql type 1",
        baseFormulary: 11,
        referenceFormulary: 4,
        baseOnly: 10,
        referenceOnly: 9,
        nonMatch: 50,
      },
      {
        name: "ql type 2",
        baseFormulary: 11,
        referenceFormulary: 4,
        baseOnly: 10,
        referenceOnly: 9,
        nonMatch: 50,
      },
    ],
  },
  {
    id: 6,
    title: "ADDITIONAL DEMONSTRATION DURGS (ADD)",
    titleBG: "rgba(248, 144, 144, 0.4)",
    headDrugsCount: temporaryObj2,
    formularies: [
      {
        name: "mmp ql",
        baseFormulary: 11,
        referenceFormulary: 4,
        baseOnly: 10,
        referenceOnly: 9,
        nonMatch: 50,
      },
      {
        name: "mmp capped benefits",
        baseFormulary: 11,
        referenceFormulary: 9,
        baseOnly: 22,
        referenceOnly: 45,
        nonMatch: 20,
      },
      {
        name: "mmp pa",
        baseFormulary: 11,
        referenceFormulary: 25,
        baseOnly: 0,
        referenceOnly: 4,
        nonMatch: 8,
      },
      {
        name: "mmp pa group descriptions",
        baseFormulary: 11,
        referenceFormulary: 25,
        baseOnly: 0,
        referenceOnly: 4,
        nonMatch: 8,
      },
      {
        name: "mmp st",
        baseFormulary: 11,
        referenceFormulary: 25,
        baseOnly: 0,
        referenceOnly: 4,
        nonMatch: 8,
      },
      {
        name: "mmp st group descriptions",
        baseFormulary: 11,
        referenceFormulary: 25,
        baseOnly: 0,
        referenceOnly: 4,
        nonMatch: 8,
      },
    ],
  },
  {
    id: 7,
    title: "DRUG DETAILS",
    titleBG: "rgba(224, 237, 81, 0.4)",
    headDrugsCount: temporaryObj4,
    formularies: [
      {
        name: "** null **",
        baseFormulary: 11,
        referenceFormulary: 4,
        baseOnly: 10,
        referenceOnly: 9,
        nonMatch: 50,
      },
    ],
  },
  {
    id: 8,
    title: "OVER-THE-COUNTER",
    titleBG: "rgba(104, 73, 153, 0.2)",
    headDrugsCount: temporaryObj3,
    formularies: [
      {
        name: "otc general um program (not st)",
        baseFormulary: 11,
        referenceFormulary: 4,
        baseOnly: 10,
        referenceOnly: 9,
        nonMatch: 50,
      },
      {
        name: "otc formal st",
        baseFormulary: 11,
        referenceFormulary: 4,
        baseOnly: 10,
        referenceOnly: 9,
        nonMatch: 50,
      },
      {
        name: "otc group descriptions",
        baseFormulary: 11,
        referenceFormulary: 4,
        baseOnly: 10,
        referenceOnly: 9,
        nonMatch: 50,
      },
    ],
  },
  {
    id: 9,
    title: "EXCLUDED DRUGS",
    titleBG: "rgba(128, 196, 131, 0.4)",
    headDrugsCount: temporaryObj2,
    formularies: [
      {
        name: "** null **",
        baseFormulary: 11,
        referenceFormulary: 4,
        baseOnly: 10,
        referenceOnly: 9,
        nonMatch: 50,
      },
    ],
  },
  {
    id: 10,
    title: "VALUE-BASED INSURANCE DESIGN (VBID)",
    titleBG: "rgba(112, 118, 131, 0.3)",
    headDrugsCount: temporaryObj1,
    formularies: [
      {
        name: "** null **",
        baseFormulary: 11,
        referenceFormulary: 4,
        baseOnly: 10,
        referenceOnly: 9,
        nonMatch: 50,
      },
    ],
  },
  {
    id: 11,
    title: "LIS COST-SHARING REDUCTION",
    titleBG: "rgba(146, 178, 235, 0.4)",
    headDrugsCount: temporaryObj1,
    formularies: [
      {
        name: "** null **",
        baseFormulary: 11,
        referenceFormulary: 4,
        baseOnly: 10,
        referenceOnly: 9,
        nonMatch: 50,
      },
    ],
  },
  {
    id: 12,
    title: "USER DEFINED",
    titleBG: "#ECF5FA",
    headDrugsCount: temporaryObj4,
    formularies: [
      {
        name: "** null **",
        baseFormulary: 11,
        referenceFormulary: 4,
        baseOnly: 10,
        referenceOnly: 9,
        nonMatch: 50,
      },
    ],
  },
];

export default connect(mapStateToProps, mapDispatchToProps)(CompareTable);
