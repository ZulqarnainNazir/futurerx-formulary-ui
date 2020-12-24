import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import FrxMiniTabs from "../../../shared/FrxMiniTabs/FrxMiniTabs";
import FormularyExpandedGeneralDetails from "./FormularyExpandedGeneralDetails";
import FormularyExpandedFormularyDesignlDetails from "./FormularyExpandedFormularyDesignlDetails";
import FormularyExpandedTiersDetails from "./FormularyExpandedTiersDetails";

const miniTabs = [
  { id: 1, text: "General" },
  { id: 3, text: "Formulary Design" },
  { id: 4, text: "Tiers" },
];

interface FormularyExpandedDetailsState {
  activeMiniTabIndex: number;
}
export default class FormularyExpandedDetails extends React.Component<
  any,
  FormularyExpandedDetailsState
> {
  state: FormularyExpandedDetailsState = {
    activeMiniTabIndex: 0,
  };

  renderActiveTabContent = () => {
    switch (this.state.activeMiniTabIndex) {
      case 0:
        return (
          <FormularyExpandedGeneralDetails
            formularyToggle={this.props.formularyToggle}
          />
        );
      case 1:
        return (
          <FormularyExpandedFormularyDesignlDetails
            formularyToggle={this.props.formularyToggle}
          />
        );
      case 2:
        return (
          <FormularyExpandedTiersDetails
            formularyToggle={this.props.formularyToggle}
          />
        );
      default:
        return null;
    }
  };

  render() {
    return (
      <div className="formulary-expanded-details custom-formulary-expanded-details">
        <Paper elevation={0}>
          <div className="formulary-expanded-details__container">
            <div className="formulary-expanded-details-right">
              <div className="formulary-expanded-details-right__tabs">
                <FrxMiniTabs
                  tabList={miniTabs}
                  activeTabIndex={this.state.activeMiniTabIndex}
                  onClickTab={(selectedTabIndex) =>
                    this.setState({ activeMiniTabIndex: selectedTabIndex })
                  }
                />
              </div>
              {this.renderActiveTabContent()}
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}
