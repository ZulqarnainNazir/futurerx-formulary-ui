import React, { createRef, Component } from "react";
import DialogPopup from "../../FrxDialogPopup/FrxDialogPopup";
import FrxGridContainer from "../../FrxGrid/FrxDrugGridContainer";
import Chevron from "./Chevron";
import { Checkbox } from "antd";
import "./PureAccordion.scss";
import showMessage from "../../../NewFormulary/Utils/Toast";
import * as commonConstants from "../../../../api/http-commons";
import * as compareConstants from "../../../../api/http-compare-view";
import { getDrugs } from "../../../../redux/slices/formulary/compareView/compareViewService";

interface HeaderType {
  baseFormulary: number | null;
  referenceFormulary: number | null;
  baseOnly: number | null;
  referenceOnly: number | null;
  nonMatch: number | null;
}
interface PureAccordionProps {
  tableType: "COMPARE" | "VIEW";
  title: string;
  titleBG: string;
  content: () => JSX.Element;
  headerData: HeaderType;
  showCheckbox: boolean;
  toggleAllAccordion: boolean;
  baseformulary?: any;
  referenceformulary?: any;
  gridColumns?: any;
  formularyLobId?: any;
  fileType?: any;
  sectionSelected?: (selection, checked) => void;
}

const defaultListPayload = {
  index: 0,
  limit: 10,
  filter: [],
};

class PureAccordion extends Component<PureAccordionProps, any> {
  state = {
    active: "",
    height: "0px",
    rotate: "accordion__icon",
    openDrugsList: false,
    drugGridHeaderName: "",
    rejectedDrug: Array(),
    toggleAll: true,
    drugGridData: Array(),
    drugData: Array(),
    gridColumns: Array(),
    baseFormularyId: "",
    isRowSelectionEnabled: false,
    hiddenColumns: Array(),
    dataCount: 0,
  };

  listPayload: any = {
    index: 0,
    limit: 10,
    filter: [],
  };

  onSettingsIconHandler = (hiddenColumn, visibleColumn) => {
    if (hiddenColumn && hiddenColumn.length > 0) {
      let hiddenColumnKeys = hiddenColumn.map((column) => column["key"]);
      this.setState({
        hiddenColumns: hiddenColumnKeys,
      });
    }
  };
  onApplyFilterHandler = (filters) => {
    /*const fetchedProps = Object.keys(filters)[0];
    console.log('Fetched properties:' + JSON.stringify(fetchedProps) + " Filters:" + JSON.stringify(filters));
    const fetchedOperator = filters[fetchedProps][0].condition === 'is like' ? 'is_like' :
      filters[fetchedProps][0].condition === 'is not' ? 'is_not' :
        filters[fetchedProps][0].condition === 'is not like' ? 'is_not_like' :
          filters[fetchedProps][0].condition === 'does not exist' ? 'does_not_exist' :
            filters[fetchedProps][0].condition;
    const fetchedValues = filters[fetchedProps][0].value !== '' ? [filters[fetchedProps][0].value.toString()] : [];
    const newFilters = [{ prop: fetchedProps, operator: fetchedOperator, values: fetchedValues }];
    this.listPayload.filter = newFilters;
    this.fetchFormularies(this.listPayload);*/
  };
  onPageSize = (pageSize) => {
    this.listPayload = { ...defaultListPayload };
    this.listPayload.limit = pageSize;
    this.populateGridData(this.state.baseFormularyId, this.listPayload);
  };
  onGridPageChangeHandler = (pageNumber: any) => {
    this.listPayload.index = (pageNumber - 1) * this.listPayload.limit;
    this.populateGridData(this.state.baseFormularyId, this.listPayload);
  };
  onClearFilterHandler = () => {
    this.listPayload = { ...defaultListPayload };
    this.populateGridData(this.state.baseFormularyId, this.listPayload);
  };

  private elementContent = createRef<HTMLDivElement>(); // createRef<T>(): RefObject<T>

  populateGridData = async (baseFormularyId, payload) => {
    if (this.props.formularyLobId && this.props.formularyLobId === 4) {
      let drugGridData = Array();
      let drugData = Array();
      let apiDetails = {};
      apiDetails["apiPart"] = compareConstants.COMMERCIAL_FORMULARY_DRUGS;
      apiDetails["pathParams"] = baseFormularyId;
      apiDetails["keyVals"] = [];
      apiDetails["keyVals"].push({
        key: commonConstants.KEY_LIMIT,
        value: payload["limit"],
      });
      apiDetails["keyVals"].push({
        key: commonConstants.KEY_INDEX,
        value: payload["index"],
      });

      apiDetails["messageBody"] = {};
      apiDetails["messageBody"]["attribute_field_data_type"] = "";
      apiDetails["messageBody"]["attribute_field_name"] = "";
      apiDetails["messageBody"]["attribute_field_value"] = "";
      apiDetails["messageBody"]["attribute_name"] = "";
      apiDetails["messageBody"]["attribute_type"] = this.props.title;
      apiDetails["messageBody"]["file_type"] = this.props.fileType;
      apiDetails["messageBody"]["filter"] = payload["filter"];
      apiDetails["messageBody"]["is_heading_count"] = true;

      try {
        let data: any = null;

        data = await getDrugs(apiDetails);
        if (data && data["list"] && data["list"].length > 0) {
          let idCount = 1;
          data["list"].map((dataItem) => {
            let value = Object.assign({}, dataItem);
            drugData.push(value);
            let row = {};
            row["id"] = idCount;
            row["key"] = idCount;
            row["label"] = value["drug_label_name"];
            row["fileType"] = value["file_type"];
            row["dataSource"] = value["data_source"];
            row["gpi"] = value["generic_product_identifier"];
            switch (this.props.title) {
              case "Tier":
                row["tier"] = value["tier_value"];
                break;

              case "Prior Authorization (PA)":
                row["paType"] =
                  value["pa_type"] === null ? "" : value["pa_type"];
                row["paGroupDescription"] =
                  value["pa_group_description"] === null
                    ? ""
                    : value["pa_group_description"];
                break;

              case "Step Therpay (ST)":
                row["stType"] =
                  value["st_type"] === null ? "" : value["st_type"];
                row["stGroupDescription"] =
                  value["st_group_description"] === null
                    ? ""
                    : value["st_group_description"];
                row["stValue"] =
                  value["st_value"] === null ? "" : value["st_value"];
                break;

              case "Quantity Limits (QL)":
                row["qlType"] =
                  value["ql_type"] === null ? "" : value["ql_type"];
                row["qlDays"] =
                  value["ql_days"] === null ? "" : value["ql_days"];
                row["qlPeriodofTime"] =
                  value["ql_period_of_time"] === null
                    ? ""
                    : value["ql_period_of_time"];
                row["qlQuantity"] =
                  value["ql_quantity"] === null ? "" : value["ql_quantity"];
                row["fillsAllowed"] =
                  value["fills_allowed"] === null ? "" : value["fills_allowed"];
                row["fullLimitPeriod"] =
                  value["full_limit_period_of_time"] === null
                    ? ""
                    : value["full_limit_period_of_time"];
                break;
            }
            drugGridData.push(row);
            idCount++;
          });
          this.setState({
            drugGridData: drugGridData,
            drugData: drugData,
            gridColumns: this.props.gridColumns,
            baseFormularyId: baseFormularyId,
            dataCount: data["count"],
          });
        } else {
          showMessage("Compare data is empty", "error");
          this.setState({
            drugGridData: Array(),
            drugData: Array(),
            gridColumns: Array(),
            baseFormularyId: "",
            refFormularyId: "",
            dataCount: 0,
          });
        }
      } catch (err) {
        console.log(err);
        showMessage("Error while fetching data", "error");
        this.setState({
          drugGridData: Array(),
          drugData: Array(),
          gridColumns: Array(),
          baseFormularyId: "",
          refFormularyId: "",
          dataCount: 0,
        });
      }
    } else {
      this.setState({
        drugGridData: Array(),
        drugData: Array(),
        gridColumns: Array(),
        baseFormularyId: "",
        refFormularyId: "",
        dataCount: 0,
      });
    }
  };

  toggleDrugsListGrid = (
    gridCellName: string | null = null,
    showCheckbox: any | null = null,
    isClose: boolean = false,
    baseFormularyId: any | null = null,
    count: any | null = null
  ) => {
    let { drugGridHeaderName } = this.state;
    if (gridCellName !== null) drugGridHeaderName = gridCellName;
    if (isClose) {
      this.setState({
        drugGridHeaderName,
        openDrugsList: !this.state.openDrugsList,
        drugGridData: Array(),
        drugData: Array(),
        gridColumns: Array(),
        baseFormularyId: "",
        refFormularyId: "",
        hiddenColumns: Array(),
        dataCount: 0,
        isRowSelectionEnabled: false,
      });
    } else {
      if (baseFormularyId && count > 0) {
        this.state.openDrugsList = !this.state.openDrugsList;
        this.state.drugGridHeaderName =
          gridCellName !== null ? gridCellName : "";
        this.state.isRowSelectionEnabled = showCheckbox;
        this.listPayload = { ...defaultListPayload };
        this.populateGridData(baseFormularyId, this.listPayload);
      }
    }
  };

  toggleAccordion = () => {
    let active = this.state.active === "" ? "active" : "";
    let rotate =
      this.state.active === "active"
        ? "accordion__icon"
        : "accordion__icon rotate";
    let height = "0px";
    if (null !== this.elementContent.current) {
      height =
        this.state.active === "active"
          ? "0px"
          : `${this.elementContent.current.scrollHeight}px`;
    }
    this.setState({
      active,
      height,
      rotate,
    });
  };

  toggleAccordionAll = () => {
    let active = "";
    let height = "0px";
    let rotate = "accordion__icon";
    if (this.props.toggleAllAccordion) {
      active = "active";
      rotate = "accordion__icon rotate";
      if (null !== this.elementContent.current) {
        height = `${this.elementContent.current.scrollHeight}px`;
      }
    }

    this.setState({
      active,
      height,
      rotate,
    });
  };

  rowSelectionChange = (data: any) => {
    this.setState({
      rejectedDrug: [...this.state.rejectedDrug, data],
    });
  };

  rejectDrugAction = () => {
    console.log(this.state.rejectedDrug);
  };

  componentWillReceiveProps(nextProps) {
    // if (nextProps.toggleAllAccordion !== this.state.toggleAll) {
    //   this.toggleAccordionAll();
    //   this.setState({
    //     toggleAll: nextProps.toggleAllAccordion,
    //   });
    // }
    this.toggleAccordionAll();
  }

  render() {
    let gridColumns = [...this.state.gridColumns];
    if (
      this.state.gridColumns.length > 0 &&
      this.state.hiddenColumns.length > 0
    )
      gridColumns = this.state.gridColumns.filter(
        (column) => !this.state.hiddenColumns.includes(column["key"])
      );
    switch (this.props.tableType) {
      case "COMPARE":
        return (
          <div className="accordion__section">
            <div className={`accordion ${this.state.active}`}>
              <div
                style={{
                  backgroundColor: this.props.titleBG,
                }}
                className="title__header_container"
                onClick={this.toggleAccordion}
              >
                {this.props.showCheckbox ? (
                  <Checkbox
                    onChange={(e) => {
                      if (this.props.sectionSelected) {
                        this.props.sectionSelected(
                          this.props.title,
                          e.target.checked
                        );
                      }
                    }}
                    disabled={false}
                    onClick={(e) => {}}
                  />
                ) : null}
                <p className="accordion__title">{this.props.title}</p>
                <Chevron
                  className={`${this.state.rotate}`}
                  width={10}
                  height={10}
                  fill={"#323C47"}
                  toggleAccordion={this.toggleAccordion}
                />
              </div>
              <div
                className={
                  this.props.headerData.baseFormulary === null
                    ? "cell-font-style"
                    : "bg-white cell-font-style"
                }
              >
                <span
                  onClick={() => {
                    this.toggleDrugsListGrid(
                      // `${props.formularyType} - ${data.name}: Base Formulary`,
                      "Base Formulary",
                      false,
                      false,
                      this.props.baseformulary["id_formulary"],
                      this.props.headerData.baseFormulary
                    );
                  }}
                >
                  {this.props.headerData.baseFormulary}
                </span>
              </div>
              <div
                className={
                  this.props.headerData.referenceFormulary === null
                    ? "cell-font-style"
                    : "bg-white cell-font-style"
                }
              >
                <span
                  onClick={() => {
                    this.toggleDrugsListGrid(
                      // `${props.formularyType} - ${data.name}: Base Formulary`,
                      "Reference Formulary",
                      false,
                      false,
                      this.props.referenceformulary["id_formulary"],
                      this.props.headerData.referenceFormulary
                    );
                  }}
                >
                  {this.props.headerData.referenceFormulary}
                </span>
              </div>
              <div
                className={
                  this.props.headerData.baseOnly === null
                    ? "cell-font-style"
                    : "bg-white cell-font-style"
                }
              >
                <span>{this.props.headerData.baseOnly}</span>
              </div>
              <div
                className={
                  this.props.headerData.referenceOnly === null
                    ? "cell-font-style"
                    : "bg-white cell-font-style"
                }
              >
                <span>{this.props.headerData.referenceOnly}</span>
              </div>
              <div
                className={
                  this.props.headerData.nonMatch === null
                    ? "cell-font-style no-border"
                    : "bg-white cell-font-style no-border"
                }
              >
                <span>{this.props.headerData.nonMatch}</span>
              </div>
            </div>
            <div
              ref={this.elementContent}
              style={{ maxHeight: `${this.state.height}` }}
              className="accordion__content"
            >
              <div className="accordion__text">{this.props.content()}</div>
            </div>
            {this.state.openDrugsList ? (
              <DialogPopup
                // showCloseIcon={actions}
                showCloseIcon={true}
                positiveActionText="Reject"
                negativeActionText=""
                title={this.state.drugGridHeaderName}
                handleClose={() => {
                  this.toggleDrugsListGrid(null, false, true, null, null);
                }}
                handleAction={this.rejectDrugAction}
                showActions={true}
                height="80%"
                width="80%"
                open={this.state.openDrugsList}
                className="dialog-popup clone-dialog-popup"
              >
                <FrxGridContainer
                  enableSearch={false}
                  enableColumnDrag
                  onSearch={() => {}}
                  fixedColumnKeys={[]}
                  pagintionPosition="topRight"
                  gridName="MEDICARE"
                  isFetchingData={false}
                  columns={gridColumns}
                  scroll={{ x: 1000, y: 500 }}
                  enableResizingOfColumns={false}
                  data={this.state.drugGridData}
                  // pinning columns
                  isPinningEnabled={true}
                  // setting gear 1st column
                  enableSettings={true}
                  customSettingIcon={
                    this.state.isRowSelectionEnabled ? null : "NONE"
                  }
                  isRowSelectionEnabled={this.state.isRowSelectionEnabled}
                  rowSelectionChange={this.rowSelectionChange}
                  isRowSelectorCheckbox
                  getPerPageItemSize={this.onPageSize}
                  onGridPageChangeHandler={this.onGridPageChangeHandler}
                  clearFilterHandler={this.onClearFilterHandler}
                  applyFilter={this.onApplyFilterHandler}
                  getColumnSettings={this.onSettingsIconHandler}
                  pageSize={this.listPayload.limit}
                  selectedCurrentPage={
                    this.listPayload.index / this.listPayload.limit + 1
                  }
                  totalRowsCount={this.state.dataCount}
                />
              </DialogPopup>
            ) : null}
          </div>
        );
      case "VIEW":
        return (
          <div className="accordion__section-view">
            <div className={`accordion ${this.state.active}`}>
              <div
                style={{
                  backgroundColor: this.props.titleBG,
                }}
                className="title__header_container"
                onClick={this.toggleAccordion}
              >
                {this.props.showCheckbox ? (
                  <Checkbox
                    onChange={() => console.log(this.props.title)}
                    disabled={false}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  />
                ) : null}
                <p className="accordion__title">{this.props.title}</p>
                <Chevron
                  className={`${this.state.rotate}`}
                  width={10}
                  height={10}
                  fill={"#323C47"}
                  toggleAccordion={this.toggleAccordion}
                />
              </div>
              <div
                className={
                  this.props.headerData.baseFormulary === null
                    ? "cell-font-style"
                    : "bg-white cell-font-style"
                }
              >
                <span
                  onClick={() => {
                    this.toggleDrugsListGrid(
                      // `${props.formularyType} - ${data.name}: Base Formulary`,
                      "Base Formulary",
                      false,
                      false,
                      this.props.baseformulary["id_formulary"],
                      this.props.headerData.baseFormulary
                    );
                  }}
                >
                  {this.props.headerData.baseFormulary}
                </span>
              </div>
            </div>
            <div
              ref={this.elementContent}
              style={{ maxHeight: `${this.state.height}` }}
              className="accordion__content"
            >
              <div className="accordion__text">{this.props.content()}</div>
            </div>
            {this.state.openDrugsList ? (
              <DialogPopup
                showCloseIcon={true}
                positiveActionText=""
                negativeActionText=""
                title={this.state.drugGridHeaderName}
                handleClose={() => {
                  this.toggleDrugsListGrid(null, false, true, null, null);
                }}
                handleAction={this.rejectDrugAction}
                showActions={true}
                height="80%"
                width="80%"
                open={this.state.openDrugsList}
                className="dialog-popup clone-dialog-popup"
              >
                <FrxGridContainer
                  enableSearch={false}
                  enableColumnDrag
                  onSearch={() => {}}
                  fixedColumnKeys={[]}
                  pagintionPosition="topRight"
                  gridName="MEDICARE"
                  isFetchingData={false}
                  columns={gridColumns}
                  scroll={{ x: 1000, y: 500 }}
                  enableResizingOfColumns={false}
                  data={this.state.drugGridData}
                  // pinning columns
                  isPinningEnabled={true}
                  // setting gear 1st column
                  enableSettings={true}
                  // checkbox 2nd column
                  // isCustomCheckboxEnabled={checkbox}
                  // event reference for checkbox (mandotory if checkbox is true)
                  // handleCustomRowSelectionChange={(r) => {
                  //   console.log(r);
                  // }}
                  customSettingIcon={
                    this.state.isRowSelectionEnabled ? null : "NONE"
                  }
                  isRowSelectionEnabled={this.state.isRowSelectionEnabled}
                  isRowSelectorCheckbox
                  getPerPageItemSize={this.onPageSize}
                  onGridPageChangeHandler={this.onGridPageChangeHandler}
                  clearFilterHandler={this.onClearFilterHandler}
                  applyFilter={this.onApplyFilterHandler}
                  getColumnSettings={this.onSettingsIconHandler}
                  pageSize={this.listPayload.limit}
                  selectedCurrentPage={
                    this.listPayload.index / this.listPayload.limit + 1
                  }
                  totalRowsCount={this.state.dataCount}
                />
              </DialogPopup>
            ) : null}
          </div>
        );
      default:
        return <h1>NOT MATCHED</h1>;
    }
  }
}

export default PureAccordion;
