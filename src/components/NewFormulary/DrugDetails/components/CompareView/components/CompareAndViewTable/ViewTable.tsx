import React, { Component } from "react";
import { ReactComponent as HideIcon } from "../../../../../../../assets/icons/HideIcon.svg";
import { ReactComponent as ShowIcon } from "../../../../../../../assets/icons/ShowIcon.svg";
import PureAccordion from "../../../../../../shared/Frx-components/accordion/PureAccordion";
import { formularyTypesGridData } from "./CompareTable";
import InnerGrid from "./InnerGrid";

class ViewTable extends Component {
  state = {
    showCheckbox: false,
    toggleAllAccordion: true,
    showViewAll: false,
    showViewAllNonMatch: false,
    columns: [],
    data: [],
  };
  render() {
    const { showCheckbox, toggleAllAccordion } = this.state;
    return (
      <>
        <div className="bordered-grid">
          <div className="__root_compare-grid-container">
            <div className="__root_view-grid-container-parent-el">
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
            </div>
            {formularyTypesGridData.map((accordionHeader) => (
              <div key={accordionHeader.id}>
                <PureAccordion
                  tableType={"VIEW"}
                  title={accordionHeader.title}
                  titleBG={accordionHeader.titleBG}
                  showCheckbox={showCheckbox}
                  content={() => {
                    return (
                      <InnerGrid
                        tableType={"VIEW"}
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
        </div>
      </>
    );
  }
}

export default ViewTable;
