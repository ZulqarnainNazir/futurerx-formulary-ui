import React from "react";
import { connect } from "react-redux";

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
import {
  setFormulary,
  setLocation,
  setLocationHome,
  clearApplication,
} from "../.././redux/slices/formulary/application/applicationSlice";

import {
  fetchSelectedFormulary,
  clearSetup,
} from "../.././redux/slices/formulary/setup/setupSlice";
import {
  fetchDesignOptions,
  clearSetupOptions,
} from "../.././redux/slices/formulary/setup/setupOptionsSlice";

import { fetchFormularyHeader } from "../.././redux/slices/formulary/header/headerSlice";
import { gridSettingsSlice } from "../.././redux/slices/formulary/gridHandler/gridSettingsSlice";
import { addNewFormulary } from "../.././redux/slices/formulary/application/applicationSlice";
import "./NewFormulary.scss";
import Medicaid from "./Medicaid/Medicaid";

// const tabs = [
//   { id: 1, text: "MEDICARE" },
//   { id: 2, text: "MEDICAID" },
//   { id: 3, text: "COMMERCIAL" },
//   { id: 4, text: "EXCHANGE" },
// ];
const tabs = [
  { id: 1, text: "COMMERCIAL" },
  { id: 2, text: "MEDICARE" },
  { id: 3, text: "MEDICAID" },
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
    location_home: state?.application?.location_home,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    fetchFormularies: (a) => dispatch(fetchFormularies(a)),
    setFormulary: (arg) => dispatch(setFormulary(arg)),
    fetchFormularyHeader: (arg) => dispatch(fetchFormularyHeader(arg)),
    setHiddenColumn: (hiddenColumns) =>
      dispatch(gridSettingsSlice.actions.setHiddenColum(hiddenColumns)),
    clearHiddenColumns: () =>
      dispatch(gridSettingsSlice.actions.clearHiddenColumns(true)),
    addNewFormulary: (arg) => dispatch(addNewFormulary(arg)),
    setLocation: (arg) => dispatch(setLocation(arg)),
    fetchSelectedFormulary: (a) => dispatch(fetchSelectedFormulary(a)),
    fetchDesignOptions: (a) => dispatch(fetchDesignOptions(a)),
    setLocationHome: (a) => dispatch(setLocationHome(a)),
    clearApplication: (a) => dispatch(clearApplication(a)),
    clearSetup: (a) => dispatch(clearSetup(a)),
    clearSetupOptions: (a) => dispatch(clearSetupOptions(a)),
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
  id_lob: 4,
  search_by: null,
  search_key: "",
  search_value: [],
  sort_by: ["cms_formulary_id"],
  sort_order: ["desc"],
};

class Formulary extends React.Component<any, any> {
  //TODO Remove
  snow: boolean = true;

  state = {
    activeTabIndex: 0,
    tabs: tabs,
    showTabs: true,
    showMassMaintenance: false,
    showDrugDetails: false,
    pageSize: 10,
  };

  listPayload: any = {
    index: 0,
    limit: 10,
    filter: [],
    id_lob: 4,
    search_by: null,
    search_key: "",
    search_value: [],
    sort_by: ["cms_formulary_id"],
    sort_order: ["desc"],
  };

  componentDidMount() {
    this.props.fetchFormularies(this.listPayload);
  }

  onClickTab = (selectedTabIndex: number) => {
    let activeTabIndex = 0;

    const tabs = this.state.tabs.map((tab: TabInfo, index: number) => {
      if (index === selectedTabIndex) {
        activeTabIndex = index;
      }
      return tab;
    });
    this.setState({ tabs, activeTabIndex }, () => {
      this.updateGrid(this.state.activeTabIndex);
    });
  };
  updateGrid = (currentTabIndex) => {
    // let lob_id = 1;
    // if(currentTabIndex === 2){
    //   lob_id = 4;
    // }
    let lob_id = 4;
    if (currentTabIndex === 1) {
      lob_id = 1;
    } else if (currentTabIndex === 2) {
      lob_id = 2;
    } else if (currentTabIndex === 3) {
      lob_id = 3;
    }

    this.listPayload = { ...defaultListPayload };
    this.listPayload.id_lob = lob_id;
    this.props.fetchFormularies(this.listPayload);
  };

  addNewFormulary = (id: any) => {
    console.log("***** ADD NEW");
    this.props.addNewFormulary();
    this.setState({
      showTabs: !this.state.showTabs,
      showDrugDetails: !this.state.showDrugDetails,
    });
  };

  drugDetailsClickHandler = (id: any) => {
    let selectedRow: any = null;
    if (id !== undefined) {
      selectedRow = this.props.formulary_list[id - 1];
      console.log(selectedRow);
      this.props.clearHiddenColumns();
      this.setState({
        showTabs: !this.state.showTabs,
        showDrugDetails: !this.state.showDrugDetails,
      });
      console.log(" Setup Complete : " + selectedRow.is_setup_complete);
      if (selectedRow && selectedRow.is_setup_complete) {
        console.log(" Nav to Configure ");
        this.props.fetchSelectedFormulary(selectedRow?.id_formulary);
        this.props.fetchDesignOptions({
          type: selectedRow?.id_formulary_type,
          id: selectedRow?.id_formulary,
        });
        this.props.setLocation(1);
      } else {
        this.props.setFormulary(selectedRow);
        this.props.setLocation(0);
        console.log(" Nav to Setup ");
      }
    }
  };

  massMaintenanceCLickHandler = () => {
    this.setState({
      showTabs: !this.state.showTabs,
      showMassMaintenance: !this.state.showMassMaintenance,
    });
  };

  onSettingsIconHandler = (hiddenColumn, visibleColumn) => {
    //console.log(hiddenColumn,visibleColumn);
    this.props.setHiddenColumn(hiddenColumn);
  };
  onApplyFilterHandler = (filters) => {
    const fetchedProps = Object.keys(filters)[0];
    const fetchedOperator =
      filters[fetchedProps][0].condition === "is like"
        ? "is_like"
        : filters[fetchedProps][0].condition === "is not"
        ? "is_not"
        : filters[fetchedProps][0].condition === "is not like"
        ? "is_not_like"
        : filters[fetchedProps][0].condition === "does not exist"
        ? "does_not_exist"
        : filters[fetchedProps][0].condition;
    const fetchedValues =
      filters[fetchedProps][0].value !== ""
        ? [filters[fetchedProps][0].value.toString()]
        : [];
    const newFilters = [
      { prop: fetchedProps, operator: fetchedOperator, values: fetchedValues },
    ];
    this.listPayload.filter = newFilters;
    this.props.fetchFormularies(this.listPayload);
  };
  onPageSize = (pageSize) => {
    let id_lob = this.listPayload.id_lob;
    this.listPayload = { ...defaultListPayload };
    this.listPayload.limit = pageSize;
    this.listPayload.id_lob = id_lob;
    this.props.fetchFormularies(this.listPayload);
  };
  formularyListSearch = (categoryObj, subCat) => {
    let id_lob = this.listPayload.id_lob;
    this.listPayload = { ...defaultListPayload };
    this.listPayload.id_lob = null;
    this.listPayload.search_by = categoryObj;
    this.listPayload.search_value = subCat != "" ? [subCat] : [];
    this.props.fetchFormularies(this.listPayload);
  };
  onGridPageChangeHandler = (pageNumber: any) => {
    this.listPayload.index = (pageNumber - 1) * this.listPayload.limit;
    this.props.fetchFormularies(this.listPayload);
  };
  onClearFilterHandler = () => {
    console.log("Clear Filter");
    let id_lob = this.listPayload.id_lob;
    this.listPayload = { ...defaultListPayload };
    this.listPayload.id_lob = id_lob;
    this.props.fetchFormularies(this.listPayload);
  };

  componentDidUpdate(prevProps) {
    console.log("=========================================");
    console.log(this.props.location_home + " / " + prevProps.location_home);
    if (
      this.props.location_home !== prevProps.location_home &&
      this.props.location_home > 0
    ) {
      console.log("**** HOME : " + this.props.location_home);
      this.setState({
        showTabs: !this.state.showTabs,
        showDrugDetails: !this.state.showDrugDetails,
      });
      this.props.setLocationHome(0);
      this.props.clearApplication();
      this.props.clearSetup();
      this.props.clearSetupOptions();
      if (this.props.location_home == 2) {
        this.onClearFilterHandler();
      }
    }
  }

  render() {
    return (
      <div className="newformulary-container">
        {this.state.showTabs ? (
          <>
            {this.snow === true ? (
              <div className="snowflakes" aria-hidden="true">
                <div className="snowflake">❅</div>
                <div className="snowflake">❆</div>
                <div className="snowflake">❅</div>
                <div className="snowflake">❆</div>
                <div className="snowflake">❅</div>
                <div className="snowflake">❆</div>
                <div className="snowflake">❅</div>
                <div className="snowflake">❆</div>
                <div className="snowflake">❅</div>
                <div className="snowflake">❆</div>
                <div className="snowflake">❅</div>
                <div className="snowflake">❆</div>
              </div>
            ) : null}
            <FormularyDashboardStats />
            <div className="formulary-root-divider"></div>
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
                selectedCurrentPage={
                  this.listPayload.index / this.listPayload.limit + 1
                }
                onPageChangeHandler={this.onGridPageChangeHandler}
                onClearFilterHandler={this.onClearFilterHandler}
                applyFilter={this.onApplyFilterHandler}
                getColumnSettings={this.onSettingsIconHandler}
                addNewFormulary={this.addNewFormulary}
                formularyListSearch={this.formularyListSearch}
              />
            </div>
          </>
        ) : this.state.showDrugDetails ? (
          <DrugDetailsContext.Provider
            value={{ showDetailHandler: () => this.drugDetailsClickHandler }}
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

export default connect(mapStateToProps, mapDispatchToProps)(Formulary);
