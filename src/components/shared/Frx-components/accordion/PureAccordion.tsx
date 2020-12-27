import React, { useState, useEffect, useRef } from "react";
import DialogPopup from "../../FrxDialogPopup/FrxDialogPopup";
import FrxGridContainer from "../../FrxGrid/FrxDrugGridContainer";
import Chevron from "./Chevron";
import { Checkbox } from "antd";
import "./PureAccordion.scss";
import { getCompareFormularyDrugsListGridColumns } from "../../../../mocks/formulary-grid/FormularyGridColumn";
import { getCompareFormularyDrugsListGridData } from "../../../../mocks/formulary-grid/FormularyGridData";

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
}

function PureAccordion(props: PureAccordionProps) {
  const [setActive, setActiveState] = useState("");
  const [setHeight, setHeightState] = useState("0px");
  const [setRotate, setRotateState] = useState("accordion__icon");

  const [openDrugsList, setDrugsListPopup] = useState(false);
  const [drugGridHeaderName, setDrugGridHeaderName] = useState("");
  const [rejectedDrug, setRejectedDrug] = useState<any | any[]>([]);
  // const [checkbox, setCheckbox] = useState(false);
  // const [actions, setActions] = useState(false);

  const toggleDrugsListGrid = (
    gridCellName: string | null = null,
    showCheckbox: boolean | null = null
  ) => {
    if (gridCellName !== null) setDrugGridHeaderName(gridCellName);
    // if (showCheckbox !== null) {
    // setCheckbox(showCheckbox);
    // setActions(showCheckbox);
    // }
    setDrugsListPopup(!openDrugsList);
  };

  const elementContent = useRef<HTMLDivElement>(null);

  function toggleAccordion() {
    setActiveState(setActive === "" ? "active" : "");
    if (null !== elementContent.current) {
      setHeightState(
        setActive === "active"
          ? "0px"
          : `${elementContent.current.scrollHeight}px`
      );
    }
    setRotateState(
      setActive === "active" ? "accordion__icon" : "accordion__icon rotate"
    );
  }

  function toggleAccordionAll() {
    if (props.toggleAllAccordion) {
      setActiveState("active");
      if (null !== elementContent.current) {
        setHeightState(`${elementContent.current.scrollHeight}px`);
      }
      setRotateState("accordion__icon rotate");
    } else {
      setActiveState("");
      if (null !== elementContent.current) {
        setHeightState("0px");
      }
      setRotateState("accordion__icon");
    }
  }

  function rowSelectionChange(data: any) {
    // setRejectedDrug(data); // if rejected one at a time
    setRejectedDrug([...rejectedDrug, data]); // if rejected many at a time
  }

  function rejectDrugAction() {
    console.log(rejectedDrug);
  }

  useEffect(() => {
    toggleAccordion(); // mount
    return () => {};
  }, []);

  useEffect(() => {
    toggleAccordionAll(); // update
    return () => {};
  }, [props.toggleAllAccordion]);

  switch (props.tableType) {
    case "COMPARE":
      return (
        <div className="accordion__section">
          <div className={`accordion ${setActive}`}>
            <div
              style={{
                backgroundColor: props.titleBG,
              }}
              className="title__header_container"
              onClick={toggleAccordion}
            >
              {props.showCheckbox ? (
                <Checkbox
                  onChange={() => console.log(props.title)}
                  disabled={false}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                />
              ) : null}
              <p className="accordion__title">{props.title}</p>
              <Chevron
                className={`${setRotate}`}
                width={10}
                height={10}
                fill={"#323C47"}
                toggleAccordion={toggleAccordion}
              />
            </div>
            <div
              className={
                props.headerData.baseFormulary === null
                  ? "cell-font-style"
                  : "bg-white cell-font-style"
              }
            >
              <span
                onClick={() => {
                  toggleDrugsListGrid(
                    // `${props.formularyType} - ${data.name}: Base Formulary`,
                    "Base Formulary",
                    false
                  );
                }}
              >
                {props.headerData.baseFormulary}
              </span>
            </div>
            <div
              className={
                props.headerData.referenceFormulary === null
                  ? "cell-font-style"
                  : "bg-white cell-font-style"
              }
            >
              <span
                onClick={() => {
                  toggleDrugsListGrid(
                    // `${props.formularyType} - ${data.name}: Base Formulary`,
                    "Reference Formulary",
                    false
                  );
                }}
              >
                {props.headerData.referenceFormulary}
              </span>
            </div>
            <div
              className={
                props.headerData.baseOnly === null
                  ? "cell-font-style"
                  : "bg-white cell-font-style"
              }
            >
              <span>{props.headerData.baseOnly}</span>
            </div>
            <div
              className={
                props.headerData.referenceOnly === null
                  ? "cell-font-style"
                  : "bg-white cell-font-style"
              }
            >
              <span>{props.headerData.referenceOnly}</span>
            </div>
            <div
              className={
                props.headerData.nonMatch === null
                  ? "cell-font-style no-border"
                  : "bg-white cell-font-style no-border"
              }
            >
              <span>{props.headerData.nonMatch}</span>
            </div>
          </div>
          <div
            ref={elementContent}
            style={{ maxHeight: `${setHeight}` }}
            className="accordion__content"
          >
            <div className="accordion__text">{props.content()}</div>
          </div>
          {openDrugsList ? (
            <DialogPopup
              // showCloseIcon={actions}
              showCloseIcon={true}
              positiveActionText="Reject"
              negativeActionText=""
              title={drugGridHeaderName}
              handleClose={toggleDrugsListGrid}
              handleAction={rejectDrugAction}
              showActions={true}
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
                // isCustomCheckboxEnabled={checkbox}
                // event reference for checkbox (mandotory if checkbox is true)
                // handleCustomRowSelectionChange={(r) => {
                //   console.log(r);
                // }}
                // customSettingIcon={"NONE"}
                isRowSelectionEnabled
                rowSelectionChange={rowSelectionChange}
                isRowSelectorCheckbox
              />
            </DialogPopup>
          ) : null}
        </div>
      );
    case "VIEW":
      return (
        <div className="accordion__section-view">
          <div className={`accordion ${setActive}`}>
            <div
              style={{
                backgroundColor: props.titleBG,
              }}
              className="title__header_container"
              onClick={toggleAccordion}
            >
              {props.showCheckbox ? (
                <Checkbox
                  onChange={() => console.log(props.title)}
                  disabled={false}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                />
              ) : null}
              <p className="accordion__title">{props.title}</p>
              <Chevron
                className={`${setRotate}`}
                width={10}
                height={10}
                fill={"#323C47"}
                toggleAccordion={toggleAccordion}
              />
            </div>
            <div
              className={
                props.headerData.baseFormulary === null
                  ? "cell-font-style"
                  : "bg-white cell-font-style"
              }
            >
              <span
                onClick={() => {
                  toggleDrugsListGrid(
                    // `${props.formularyType} - ${data.name}: Base Formulary`,
                    "Base Formulary",
                    false
                  );
                }}
              >
                {props.headerData.baseFormulary}
              </span>
            </div>
          </div>
          <div
            ref={elementContent}
            style={{ maxHeight: `${setHeight}` }}
            className="accordion__content"
          >
            <div className="accordion__text">{props.content()}</div>
          </div>
          {openDrugsList ? (
            <DialogPopup
              showCloseIcon={true}
              positiveActionText="Reject"
              negativeActionText=""
              title={drugGridHeaderName}
              handleClose={toggleDrugsListGrid}
              handleAction={rejectDrugAction}
              showActions={true}
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
                // isCustomCheckboxEnabled={checkbox}
                // event reference for checkbox (mandotory if checkbox is true)
                // handleCustomRowSelectionChange={(r) => {
                //   console.log(r);
                // }}
                // customSettingIcon={"NONE"}
                isRowSelectionEnabled
                rowSelectionChange={rowSelectionChange}
                isRowSelectorCheckbox
              />
            </DialogPopup>
          ) : null}
        </div>
      );
    default:
      return <h1>NOT MATCHED</h1>;
  }
}

export default PureAccordion;
