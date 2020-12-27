import React, { useState, Component } from "react";
import DialogPopup from "../../../../../../shared/FrxDialogPopup/FrxDialogPopup";
import FrxGridContainer from "../../../../../../shared/FrxGrid/FrxDrugGridContainer";
import { getCompareFormularyDrugsListGridColumns } from "../../../../../../../mocks/formulary-grid/FormularyGridColumn";
import { getCompareFormularyDrugsListGridData } from "../../../../../../../mocks/formulary-grid/FormularyGridData";

import "./CompareTable.scss";

interface InnerGridType {
  name: string;
  baseFormulary: number | null;
  referenceFormulary: number | null;
  baseOnly: number | null;
  referenceOnly: number | null;
  nonMatch: number | null;
}

interface InnerGridProps {
  tableType: "COMPARE" | "VIEW";
  dataArr: InnerGridType[];
  formularyType: string;
}
class InnerGrid extends Component<InnerGridProps, any>{
  state = {
    openDrugsList: false,
    drugGridHeaderName: '',
    checkbox: false,
    actions: false,
  }

  toggleDrugsListGrid = (
    gridCellName: string | null = null,
    showCheckbox: boolean | null = null
  ) => {
    if (gridCellName !== null) this.state.drugGridHeaderName = gridCellName;
    if (showCheckbox !== null) {
      this.state.checkbox = showCheckbox;
      this.state.actions = showCheckbox;
    }
    this.setState({
      openDrugsList: !this.state.openDrugsList
    });
  };

  render() {
    switch (this.props.tableType) {
      case "COMPARE":
        return (
          <div className="inner-grid-compare-formularies">
            {this.props.dataArr.map((data) => (
              <>
                <div className="cell-height cell-head-font-style">
                  {data.name}
                </div>
                <div className="cell-height cell-font-style">
                  <span
                    onClick={() => {
                      this.toggleDrugsListGrid(
                        `${this.props.formularyType} - ${data.name}: Base Formulary`,
                        false
                      );
                    }}
                  >
                    {data.baseFormulary}
                  </span>
                </div>
                <div className="cell-height cell-font-style">
                  <span
                    onClick={() => {
                      this.toggleDrugsListGrid(
                        `${this.props.formularyType} - ${data.name}: Reference Formulary`,
                        false
                      );
                    }}
                  >
                    {data.referenceFormulary}
                  </span>
                </div>
                <div className="cell-height cell-font-style">
                  <span
                    onClick={() => {
                      this.toggleDrugsListGrid(
                        `${this.props.formularyType} - ${data.name}: Base Only`,
                        true
                      );
                    }}
                  >
                    {data.baseOnly}
                  </span>
                </div>
                <div className="cell-height cell-font-style">
                  <span
                    onClick={() => {
                      this.toggleDrugsListGrid(
                        `${this.props.formularyType} - ${data.name}: Reference Formulary`,
                        true
                      );
                    }}
                  >
                    {data.referenceOnly}
                  </span>
                </div>
                <div className="cell-height cell-font-style no-border">
                  <span
                    onClick={() => {
                      this.toggleDrugsListGrid(
                        `${this.props.formularyType} - ${data.name}: Non-Match Base & Reference`,
                        true
                      );
                    }}
                  >
                    {data.nonMatch}
                  </span>
                </div>
              </>
            ))}
            {this.state.openDrugsList ? (
              <DialogPopup
                showCloseIcon={this.state.actions}
                positiveActionText="Reject"
                negativeActionText=""
                title={this.state.drugGridHeaderName}
                handleClose={this.toggleDrugsListGrid}
                handleAction={() => { }}
                showActions={this.state.actions}
                height="80%"
                width="80%"
                open={this.state.openDrugsList}
              >
                <FrxGridContainer
                  enableSearch={false}
                  enableColumnDrag
                  onSearch={() => { }}
                  fixedColumnKeys={[]}
                  pagintionPosition="topRight"
                  gridName="MEDICARE"
                  isFetchingData={false}
                  columns={getCompareFormularyDrugsListGridColumns()}
                  scroll={{ x: 1000, y: 500 }}
                  enableResizingOfColumns={false}
                  data={getCompareFormularyDrugsListGridData()}
                  // pinning columns
                  isPinningEnabled={true}
                  // setting gear 1st column
                  enableSettings={true}
                  // checkbox 2nd column
                  customSettingIcon={"NONE"}
                />
              </DialogPopup>
            ) : null}
          </div>
        );

      case "VIEW":
        return (
          <div className="inner-grid-view-formularies">
            {this.props.dataArr.map((data) => (
              <>
                <div className="cell-height cell-head-font-style">
                  {data.name}
                </div>
                <div className="cell-height cell-font-style">
                  <span
                    onClick={() => {
                      this.toggleDrugsListGrid(
                        `${this.props.formularyType} - ${data.name}: Base Formulary`,
                        false
                      );
                    }}
                  >
                    {data.baseFormulary}
                  </span>
                </div>
              </>
            ))}
            {this.state.openDrugsList ? (
              <DialogPopup
                showCloseIcon={this.state.actions}
                positiveActionText="Reject"
                negativeActionText=""
                title={this.state.drugGridHeaderName}
                handleClose={this.toggleDrugsListGrid}
                handleAction={() => { }}
                showActions={this.state.actions}
                height="80%"
                width="80%"
                open={this.state.openDrugsList}
              >
                <FrxGridContainer
                  enableSearch={false}
                  enableColumnDrag
                  onSearch={() => { }}
                  fixedColumnKeys={[]}
                  pagintionPosition="topRight"
                  gridName="MEDICARE"
                  isFetchingData={false}
                  columns={getCompareFormularyDrugsListGridColumns()}
                  scroll={{ x: 1000, y: 500 }}
                  enableResizingOfColumns={false}
                  data={getCompareFormularyDrugsListGridData()}
                  // pinning columns
                  isPinningEnabled={true}
                  // setting gear 1st column
                  enableSettings={true}
                  // checkbox 2nd column
                  // event reference for checkbox (mandotory if checkbox is true)
                  customSettingIcon={"NONE"}
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

export default InnerGrid;
