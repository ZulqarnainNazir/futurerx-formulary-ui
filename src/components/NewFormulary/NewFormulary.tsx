import React from "react";
import {connect} from "react-redux";

import { TabInfo } from "../../models/tab.model";
import FrxTabs from "../shared/FrxTabs/FrxTabs";
import Medicare from "./Medicare/Medicare";
import DrugDetails from "./DrugDetails/FormularyDetails";
import DrugDetailsContext from "./FormularyDetailsContext";
import MassMaintenanceContext from "./FormularyDetailsContext";
import MassMaintenance from "./MassMaintenance/MassMaintenance";
import FormularyDashboardStats from "./../FormularyDashboardStats/FormularyDashboardStats";
import { getFormularyDetails } from "../../mocks/formulary/formularyDetails";
import { getBase } from "../.././redux/slices/formulary/formularyBase/formularyBaseActionCreator";
import { formularyBaseSlice } from "../.././redux/slices/formulary/formularyBase/formularyBaseSlice";
import { fetchFormularies } from "../.././redux/slices/formulary/dashboard/dashboardSlice";

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
  showMassMaintenance: boolean;
  showDrugDetails: boolean;
  baseData: any;
  current_formulary: any;
}

  
const mapStateToProps = (state) => {
  console.log("- - - - - - - - - - - - - - - - - - -");
  console.log(state);
  return {
    data: state.data
  };
};

function mapDispatchToProps(dispatch) {
  return {
    getBase:(a)=>dispatch(getBase(a)),
    setCurrentForumulary: (selectedFormulary) => dispatch(formularyBaseSlice.actions.getCurrentFormulary(selectedFormulary)),
    fetchFormularies:(a)=>dispatch(fetchFormularies(a)),
  };
}

class Formulary extends React.Component<any, any> {
  state = {
    activeTabIndex: 0,
    tabs: tabs,
    showTabs: true,
    showMassMaintenance: false,
    showDrugDetails: false,
    baseData: [],
    current_formulary: null
  };


  componentDidMount(){
    this.props.getBase("1").then((json) => {
      let resp = json.payload.data
      console.log(resp);
      this.setState({baseData: resp})
    });
    this.props.fetchFormularies({lob:1});
  }

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
  drugDetailsClickHandler = (id: any) => {
    let selectedRow:any;
    if(id !== undefined){
      selectedRow = this.state.baseData[id-1];
    }
    this.props.setCurrentForumulary(selectedRow)
    this.setState({
      current_formulary: selectedRow,
      showTabs: !this.state.showTabs,
      showDrugDetails: !this.state.showDrugDetails,
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
            baseData={this.state.baseData}
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
            <FormularyDashboardStats />
            <FrxTabs
              tabList={this.state.tabs}
              activeTabIndex={this.state.activeTabIndex}
              onClickTab={this.onClickTab}
            />
            <div className="formulary-tabs-info">
              {this.renderActiveTabContent()}
            </div>
          </>
        ) : this.state.showDrugDetails ? (
          <DrugDetailsContext.Provider
            value={{ showDetailHandler: () => this.drugDetailsClickHandler }}
          >
            <DrugDetails data={getFormularyDetails()}/>
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

export default connect(mapStateToProps, mapDispatchToProps )(Formulary);
