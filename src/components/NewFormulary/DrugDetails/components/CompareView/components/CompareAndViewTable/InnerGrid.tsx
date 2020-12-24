import React, { useState } from "react";
import DialogPopup from "../../../../../../shared/FrxDialogPopup/FrxDialogPopup";
import FrxGridContainer from "../../../../../../shared/FrxGrid/FrxGridContainer";
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
function InnerGrid(props: InnerGridProps) {
  const [openDrugsList, setDrugsListPopup] = useState(false);
  const [drugGridHeaderName, setDrugGridHeaderName] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  const [actions, setActions] = useState(false);

  const toggleDrugsListGrid = (
    gridCellName: string | null = null,
    showCheckbox: boolean | null = null
  ) => {
    if (gridCellName !== null) setDrugGridHeaderName(gridCellName);
    if (showCheckbox !== null) {
      setCheckbox(showCheckbox);
      setActions(showCheckbox);
    }
    setDrugsListPopup(!openDrugsList);
  };
  switch (props.tableType) {
    case "COMPARE":
      return (
        <div className="inner-grid-compare-formularies">
          {props.dataArr.map((data) => (
            <>
              <div className="cell-height cell-head-font-style">
                {data.name}
              </div>
              <div className="cell-height cell-font-style">
                <span
                  onClick={() => {
                    toggleDrugsListGrid(
                      `${props.formularyType} - ${data.name}: Base Formulary`,
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
                    toggleDrugsListGrid(
                      `${props.formularyType} - ${data.name}: Reference Formulary`,
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
                    toggleDrugsListGrid(
                      `${props.formularyType} - ${data.name}: Base Only`,
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
                    toggleDrugsListGrid(
                      `${props.formularyType} - ${data.name}: Reference Formulary`,
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
                    toggleDrugsListGrid(
                      `${props.formularyType} - ${data.name}: Non-Match Base & Reference`,
                      true
                    );
                  }}
                >
                  {data.nonMatch}
                </span>
              </div>
            </>
          ))}
          {openDrugsList ? (
            <DialogPopup
              showCloseIcon={actions}
              positiveActionText="Reject"
              negativeActionText=""
              title={drugGridHeaderName}
              handleClose={toggleDrugsListGrid}
              handleAction={() => {}}
              showActions={actions}
              height="80%"
              width="80%"
              open={openDrugsList}
            >
              <FrxGridContainer
                enableSearch={false}
                enableColumnDrag
                onSearch={() => {}}
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
                isCustomCheckboxEnabled={checkbox}
                // event reference for checkbox (mandotory if checkbox is true)
                handleCustomRowSelectionChange={(r) => {
                  console.log(r);
                }}
                // customSettingIcon={"NONE"}
              />
            </DialogPopup>
          ) : null}
        </div>
      );

    case "VIEW":
      return (
        <div className="inner-grid-view-formularies">
          {props.dataArr.map((data) => (
            <>
              <div className="cell-height cell-head-font-style">
                {data.name}
              </div>
              <div className="cell-height cell-font-style">
                <span
                  onClick={() => {
                    toggleDrugsListGrid(
                      `${props.formularyType} - ${data.name}: Base Formulary`,
                      false
                    );
                  }}
                >
                  {data.baseFormulary}
                </span>
              </div>
            </>
          ))}
          {openDrugsList ? (
            <DialogPopup
              showCloseIcon={actions}
              positiveActionText="Reject"
              negativeActionText=""
              title={drugGridHeaderName}
              handleClose={toggleDrugsListGrid}
              handleAction={() => {}}
              showActions={actions}
              height="80%"
              width="80%"
              open={openDrugsList}
            >
              <FrxGridContainer
                enableSearch={false}
                enableColumnDrag
                onSearch={() => {}}
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
                isCustomCheckboxEnabled={checkbox}
                // event reference for checkbox (mandotory if checkbox is true)
                handleCustomRowSelectionChange={(r) => {
                  console.log(r);
                }}
                // customSettingIcon={"NONE"}
              />
            </DialogPopup>
          ) : null}
        </div>
      );
    default:
      return <h1>NOT MATCHED</h1>;
  }
}

export default InnerGrid;
