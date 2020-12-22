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
import { fetchFormularies } from "../.././redux/slices/formulary/dashboard/dashboardSlice";
import { setFormulary } from "../.././redux/slices/formulary/application/applicationSlice";
import { fetchFormularyHeader } from "../.././redux/slices/formulary/header/headerSlice";
import { gridSettingsSlice } from "../.././redux/slices/formulary/gridHandler/gridSettingsSlice";
import { addNewFormulary } from "../.././redux/slices/formulary/application/applicationSlice";
import "./NewFormulary.scss";
import Medicaid from "./Medicaid/Medicaid";

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
}
  
const mapStateToProps = (state) => {
  //console.log("***** DB");
  //console.log(state);
  return {
    formulary_count: state?.dashboard?.formulary_count,
    formulary_list: state?.dashboard?.formulary_list,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    fetchFormularies:(a)=>dispatch(fetchFormularies(a)),
    setFormulary:(arg)=>dispatch(setFormulary(arg)),
    fetchFormularyHeader: (arg)=>dispatch(fetchFormularyHeader(arg)),
    setHiddenColumn: (hiddenColumns) => dispatch(gridSettingsSlice.actions.setHiddenColum(hiddenColumns)),
    clearHiddenColumns: () => dispatch(gridSettingsSlice.actions.clearHiddenColumns(true)),
    addNewFormulary:(arg)=>dispatch(addNewFormulary(arg)),
  };
}


// REFERENCE :: 
// listPayload = {
//   index: 0,
//   limit: 10,
//   filter: [],
//   id_lob: 4,
//   search_by: null,
//   search_key: "",
//   search_value: [],
//   sort_by: ['contract_year','lob_name','formulary_name','status'],
//   sort_order: ['asc','asc','asc','asc'],
// }
const defaultListPayload = {
  index: 0,
  limit: 10,
  filter: [],
  id_lob: 1,
  search_by: null,
  search_key: "",
  search_value: [],
  sort_by: ["cms_formulary_id"],
  sort_order: ["desc"],
}

class Formulary extends React.Component<any, any> {
  state = {
    activeTabIndex: 0,
    tabs: tabs,
    showTabs: true,
    showMassMaintenance: false,
    showDrugDetails: false,
    pageSize: 10
  };

  listPayload: any = {
    index: 0,
    limit: 10,
    filter: [],
    id_lob: 1,
    search_by: null,
    search_key: "",
    search_value: [],
    sort_by: ["cms_formulary_id"],
    sort_order: ["desc"],
  }

  componentDidMount(){
    this.props.fetchFormularies(this.listPayload);
  }

  addNewFormulary = (id: any) => {
    this.props.addNewFormulary();
    this.setState({
      showTabs: !this.state.showTabs,
      showDrugDetails: !this.state.showDrugDetails,
    });
  };
  onClickTab = (selectedTabIndex: number) => {
    let activeTabIndex = 0;

    const tabs = this.state.tabs.map((tab: TabInfo, index: number) => {
      if (index === selectedTabIndex) {
        activeTabIndex = index;
      }
      return tab;
    });
    this.setState({ tabs, activeTabIndex },()=>{
      this.updateGrid(this.state.activeTabIndex);
    });
  };
  updateGrid = (currentTabIndex) => {
    let lob_id = 1;
    if(currentTabIndex === 2){
      lob_id = 4;
    }
    this.listPayload = {...defaultListPayload};
    this.listPayload.id_lob = lob_id;
    this.props.fetchFormularies(this.listPayload);
  }
  drugDetailsClickHandler = (id: any) => {
    let selectedRow:any = null;
    if(id !== undefined){
      selectedRow = this.props.formulary_list[id-1];
    }
    this.props.setFormulary(selectedRow);
    this.props.clearHiddenColumns();
    this.setState({
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
  
  onSettingsIconHandler = (hiddenColumn,visibleColumn) => {
    //console.log(hiddenColumn,visibleColumn);
    this.props.setHiddenColumn(hiddenColumn)
  }
  onApplyFilterHandler = (filters) => {
    const fetchedProps = Object.keys(filters)[0];
    const fetchedOperator = filters[fetchedProps][0].condition === 'is like' ? 'is_like' : 
    filters[fetchedProps][0].condition === 'is not' ? 'is_not' : 
    filters[fetchedProps][0].condition === 'is not like' ? 'is_not_like' : 
    filters[fetchedProps][0].condition === 'does not exist' ? 'does_not_exist' : 
    filters[fetchedProps][0].condition;
    const fetchedValues = filters[fetchedProps][0].value !== '' ? [filters[fetchedProps][0].value.toString()] : [];
    const newFilters = [{ prop: fetchedProps, operator: fetchedOperator,values: fetchedValues}];
    this.listPayload.filter = newFilters;
    this.props.fetchFormularies(this.listPayload);
  }
  onPageSize = (pageSize) => {
    let id_lob = this.listPayload.id_lob
    this.listPayload = {...defaultListPayload};
    this.listPayload.limit = pageSize
    this.listPayload.id_lob = id_lob;
    this.props.fetchFormularies(this.listPayload);
  }
  onGridPageChangeHandler = (pageNumber: any) => {
    this.listPayload.index = (pageNumber - 1) * this.listPayload.limit;
    this.props.fetchFormularies(this.listPayload);
  }
  onClearFilterHandler = () => {
    let id_lob = this.listPayload.id_lob
    this.listPayload = {...defaultListPayload};
    this.listPayload.id_lob = id_lob;
    this.props.fetchFormularies(this.listPayload);
  }
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
              {/* {this.renderActiveTabContent()} */}
              <Medicare
                drugDetailClick={this.drugDetailsClickHandler}
                onMassMaintenanceCLick={this.massMaintenanceCLickHandler}
                onPageSize={this.onPageSize}
                pageSize={this.listPayload.limit}
                selectedCurrentPage={(this.listPayload.index/this.listPayload.limit + 1)}
                onPageChangeHandler={this.onGridPageChangeHandler}
                onClearFilterHandler={this.onClearFilterHandler}
                applyFilter={this.onApplyFilterHandler}
                getColumnSettings={this.onSettingsIconHandler}
                addNewFormulary={this.addNewFormulary}
              />
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
