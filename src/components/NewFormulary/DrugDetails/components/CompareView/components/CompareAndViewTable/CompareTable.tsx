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

class CompareTable extends Component {
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
  };

  toggleShowViewAll = () => {
    this.setState({
      showViewAll: !this.state.showViewAll,
    });
  };

  componentDidMount() {
    this.setState({
      columns: getCompareFormularyViewAllGridColumns(),
      data: getCompareFormularyViewAllGridData(),
    });
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
      // formularyTypesGridData,
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
                    <p>{toggleAllAccordion ? "Collapse All" : "Expand All"}</p>
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
                  content={() => {
                    return (
                      <InnerGrid
                        tableType={"COMPARE"}
                        dataArr={accordionHeader.formularies}
                        formularyType={accordionHeader.title}
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
            handleAction={() => {}}
            showActions={true}
            height="80%"
            width="80%"
            open={showViewAll}
          >
            <FrxGridContainer
              enableSearch={false}
              enableColumnDrag
              onSearch={() => {}}
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

export default CompareTable;

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
