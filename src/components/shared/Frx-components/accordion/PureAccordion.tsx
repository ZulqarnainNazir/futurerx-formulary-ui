import React, {
  useState,
  useEffect,
  useRef,
  createRef,
  Component,
} from "react";
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
  baseformulary?: any;
  referenceformulary?: any;
}

class PureAccordion extends Component<PureAccordionProps, any> {
  state = {
    active: "",
    height: "0px",
    rotate: "accordion__icon",
    openDrugsList: false,
    drugGridHeaderName: "",
    rejectedDrug: Array(),
  };

  // private elementContent = createRef<T>(): RefObject<T>
  private elementContent = createRef<HTMLDivElement>();

  // function createRef<T>()
  // constructor(props) {
  //   super(props);
  //   this.elementContent = React.createRef();
  // }

  toggleDrugsListGrid = (a, b) => {}; // to delete
  // toggleDrugsListGrid = (
  //   gridCellName: string | null = null,
  //   showCheckbox: boolean | null = null
  // ) => {
  //   if (gridCellName !== null) this.state.drugGridHeaderName = gridCellName;
  //   this.setState({
  //     openDrugsList: !this.state.openDrugsList,
  //   });
  // };

  // elementContent = useRef<HTMLDivElement>(null);

  toggleAccordion = () => {
    // this.state.active = this.state.active === "" ? "active" : "";
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
      // this.state.setHeight =
      //   this.state.setActive === "active"
      //     ? "0px"
      //     : `${this.elementContent.current.scrollHeight}px`;
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
      // this.setState({
      //   setRotate: "accordion__icon rotate",
      // });
    }
    // else {
    // this.state.setActive = "";
    // if (null !== this.elementContent.current) {
    //   this.state.setHeight = "0px";
    // }
    // this.setState({
    //   active,
    //   setRotate: "accordion__icon",
    // });
    // }

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

  componentDidMount() {
    // this.toggleAccordion();
  }

  componentDidUpdate() {
    // this.toggleAccordionAll();
    // this.props.toggleAllAccordion();
  }

  render() {
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
                      false
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
                      false
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
            {/* {this.state.openDrugsList ? (
              <DialogPopup
                // showCloseIcon={actions}
                showCloseIcon={true}
                positiveActionText="Reject"
                negativeActionText=""
                title={this.state.drugGridHeaderName}
                handleClose={this.toggleDrugsListGrid}
                handleAction={this.rejectDrugAction}
                showActions={true}
                height="80%"
                width="80%"
                open={this.state.openDrugsList}
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
                  //customSettingIcon={"NONE"}
                  isRowSelectionEnabled
                  rowSelectionChange={this.rowSelectionChange}
                  isRowSelectorCheckbox
                />
              </DialogPopup>
            ) : null} */}
          </div>
        );
      // case "VIEW":
      //   return (
      //     <div className="accordion__section-view">
      //       <div className={`accordion ${this.state.setActive}`}>
      //         <div
      //           style={{
      //             backgroundColor: this.props.titleBG,
      //           }}
      //           className="title__header_container"
      //           onClick={this.toggleAccordion}
      //         >
      //           {this.props.showCheckbox ? (
      //             <Checkbox
      //               onChange={() => console.log(this.props.title)}
      //               disabled={false}
      //               onClick={(e) => {
      //                 e.stopPropagation();
      //               }}
      //             />
      //           ) : null}
      //           <p className="accordion__title">{this.props.title}</p>
      //           <Chevron
      //             className={`${this.state.setRotate}`}
      //             width={10}
      //             height={10}
      //             fill={"#323C47"}
      //             toggleAccordion={this.toggleAccordion}
      //           />
      //         </div>
      //         <div
      //           className={
      //             this.props.headerData.baseFormulary === null
      //               ? "cell-font-style"
      //               : "bg-white cell-font-style"
      //           }
      //         >
      //           <span
      //             onClick={() => {
      //               this.toggleDrugsListGrid(
      //                 // `${props.formularyType} - ${data.name}: Base Formulary`,
      //                 "Base Formulary",
      //                 false
      //               );
      //             }}
      //           >
      //             {this.props.headerData.baseFormulary}
      //           </span>
      //         </div>
      //       </div>
      //       <div
      //         ref={this.elementContent}
      //         style={{ maxHeight: `${this.state.setHeight}` }}
      //         className="accordion__content"
      //       >
      //         <div className="accordion__text">{this.props.content()}</div>
      //       </div>
      //       {this.state.openDrugsList ? (
      //         <DialogPopup
      //           showCloseIcon={true}
      //           positiveActionText="Reject"
      //           negativeActionText=""
      //           title={this.state.drugGridHeaderName}
      //           handleClose={this.toggleDrugsListGrid}
      //           handleAction={this.rejectDrugAction}
      //           showActions={true}
      //           height="80%"
      //           width="80%"
      //           open={this.state.openDrugsList}
      //         >
      //           <FrxGridContainer
      //             enableSearch={false}
      //             enableColumnDrag
      //             onSearch={() => {}}
      //             fixedColumnKeys={[]}
      //             pagintionPosition="topRight"
      //             gridName="MEDICARE"
      //             isFetchingData={false}
      //             columns={getCompareFormularyDrugsListGridColumns()}
      //             scroll={{ x: 1000, y: 500 }}
      //             enableResizingOfColumns={false}
      //             data={getCompareFormularyDrugsListGridData()}
      //             // pinning columns
      //             isPinningEnabled={true}
      //             // setting gear 1st column
      //             enableSettings={true}
      //             // checkbox 2nd column
      //             // isCustomCheckboxEnabled={checkbox}
      //             // event reference for checkbox (mandotory if checkbox is true)
      //             // handleCustomRowSelectionChange={(r) => {
      //             //   console.log(r);
      //             // }}
      //             // customSettingIcon={"NONE"}
      //             isRowSelectionEnabled
      //             rowSelectionChange={this.rowSelectionChange}
      //             isRowSelectorCheckbox
      //           />
      //         </DialogPopup>
      //       ) : null}
      //     </div>
      //   );
      default:
        return <h1>NOT MATCHED</h1>;
    }
  }
}

export default PureAccordion;
