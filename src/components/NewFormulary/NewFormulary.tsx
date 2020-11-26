import React from "react";
import { TabInfo } from "../../models/tab.model";
import FrxTabs from "../shared/FrxTabs/FrxTabs";
import Medicare from "./Medicare/Medicare";
import DrugDetails from "./DrugDetails/FormularyDetails";
import DrugDetailsContext from "./FormularyDetailsContext";
import MassMaintenanceContext from "./FormularyDetailsContext";
import { getFormularyDetails } from "../../mocks/formulary/formularyDetails";
import MassMaintenance from "./MassMaintenance/MassMaintenance";
import "./NewFormulary.scss";

const tabs = [
  { id: 1, text: "MEDICARE" },
  { id: 2, text: "MEDICAID" },
  { id: 3, text: "COMMERCIAL" },
  { id: 4, text: "EXCHANGE" },
];

interface State {
  tabs: Array<TabInfo>;
  activeTabIndex: number;
  showTabs: boolean;
  showFormulary: boolean;
  showMassMaintenance: boolean;
}

export default class Formulary extends React.Component<any, any> {
  state = {
    activeTabIndex: 0,
    tabs: tabs,
    showTabs: true,
    showFormulary: false,
    showMassMaintenance: false,
  };
  onClickTab = (selectedTabIndex: number) => {
    let activeTabIndex = 0;

    const tabs = this.state.tabs.map((tab: TabInfo, index: number) => {
      if (index === selectedTabIndex) {
        activeTabIndex = index;
      }
      return tab;
    });
    this.setState({ tabs, activeTabIndex });
  };
  drugDetailsClickHandler = () => {
    this.setState({
      showTabs: !this.state.showTabs,
      showFormulary: !this.state.showFormulary,
    });
  };

  massMaintenanceCLickHandler = () => {
    this.setState({
      showTabs: !this.state.showTabs,
      showMassMaintenance: !this.state.showMassMaintenance,
    });
  };

  renderActiveTabContent = () => {
    const tabIndex = this.state.activeTabIndex;
    switch (tabIndex) {
      case 0:
        return (
          <Medicare
            drugDetailClick={this.drugDetailsClickHandler}
            onMassMaintenanceCLick={this.massMaintenanceCLickHandler}
          />
        );
      case 1:
        return <div>MEDICAID</div>;
      case 2:
        return <div>COMMERCIAL</div>;
      case 3:
        return <div>EXCHANGE</div>;
    }
  };
  render() {
    return (
      <div className="formulary-root">
        {this.state.showTabs ? (
          <>
            <FrxTabs
              tabList={this.state.tabs}
              activeTabIndex={this.state.activeTabIndex}
              onClickTab={this.onClickTab}
            />
            <div className="formulary-tabs-info">
              {this.renderActiveTabContent()}
            </div>
          </>
        ) : this.state.showFormulary ? (
          <DrugDetailsContext.Provider
            value={{ showDetailHandler: this.drugDetailsClickHandler }}
          >
            <DrugDetails data={getFormularyDetails()} />
          </DrugDetailsContext.Provider>
        ) : this.state.showMassMaintenance ? (
          <MassMaintenanceContext.Provider
            value={{ showDetailHandler: this.massMaintenanceCLickHandler }}
          >
            <MassMaintenance data={getFormularyDetails()} />
          </MassMaintenanceContext.Provider>
        ) : null}
      </div>
    );
  }
}
