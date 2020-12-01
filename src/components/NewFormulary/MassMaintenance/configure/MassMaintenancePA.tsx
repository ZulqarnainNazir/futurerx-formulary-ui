import React, { Component } from "react";

import IconInfo from "../../../../assets/icons/IconInfo.svg";
import PlusIcon from "../../../../assets/icons/PlusIcon.svg";
import {
  getColumns,
  getData,
} from "../../../../mocks/formulary-grid/FormularySimpleGridMock";
import DropDown from "../../../shared/Frx-components/dropdown/DropDown";
import Button from "../../../shared/Frx-components/button/Button";
import SimpleGrid from "../../../shared/Frx-formulary/SimpleGrid/SimpleGrid";

import { TabInfo } from "../../../../models/tab.model";
import FrxMiniTabs from "../../../shared/FrxMiniTabs/FrxMiniTabs";
import CustomizedSwitches from "../../DrugDetails/components/FormularyConfigure/components/CustomizedSwitches";
import AdvancedSearch from "../../DrugDetails/components/FormularyConfigure/components/search/AdvancedSearch";
import RadioButton from "../../../shared/Frx-components/radio-button/RadioButton";
import CustomDatePicker from "../../../shared/Frx-components/date-picker/CustomDatePicker";
import { Input } from "antd";
import FrxLoader from "../../../shared/FrxLoader/FrxLoader";

import { getFormularyGridData } from "../../../../mocks/formulary-grid/FormularyGridData";
// import FormularyGrid from "./FormularyGrid";
import DrugGrid from "../../DrugDetails/components/DrugGrid";
import { getFormularyGridColumns } from "../../../../mocks/formulary-grid/FormularyGridColumn";

export interface FormularyGridDS {
  key: string;
  formularyName: string;
  formularyId: string;
  formularyVersion: number;
  contractYeat: string;
  formularyType: string;
  effectiveDate: string;
}
interface MassMaintenancePAState {
  gridData: FormularyGridDS[];
  isSearchOpen: boolean;
  isFormularyGridShown: boolean;
  columns: any;
  data: any;
  pinData: {
    value: boolean;
  };
  scroll: {
    x: number;
    y: number;
  };
}
class MassMaintenancePA extends Component<any, MassMaintenancePAState> {
  state = {
    isSearchOpen: false,
    gridData: getData(),
    gridColumns: getColumns(),
    isFormularyGridShown: false,
    columns: null,
    data: null,
    pinData: {
      value: false,
    },
    scroll: {
      x: 960,
      y: 450,
    },
  };

  addNew = () => {
    // this.setState((prevState) => ({
    //   ...prevState,
    //   gridData: prevState.gridData.concat({
    //     key: "4",
    //     formularyName: "Care987",
    //     formularyId: "192039483745",
    //     formularyVersion: 5,
    //     contractYeat: "2021",
    //     formularyType: "Medicare",
    //     effectiveDate: "01/01/2021",
    //   }),
    // }));
    // ###############################
    // this.setState({
    //   gridData: this.state.gridData.concat({
    //     key: "4",
    //     formularyName: "Care987",
    //     formularyId: "192039483745",
    //     formularyVersion: 5,
    //     contractYeat: "2021",
    //     formularyType: "Medicare",
    //     effectiveDate: "01/01/2021",
    //   }),
    // });
  };
  advanceSearchClickHandler = (event) => {
    event.stopPropagation();
    this.setState({ isSearchOpen: !this.state.isSearchOpen });
  };
  advanceSearchClosekHandler = () => {
    this.setState({ isSearchOpen: !this.state.isSearchOpen });
  };
  saveClickHandler = () => {
    console.log("Save data");
  };
  rowSelectionChange = (r) => {
    console.log(r);
  };
  componentDidMount() {
    this.setState({
      columns: getFormularyGridColumns(),
      data: getFormularyGridData(),
    });
  }
  render() {
    const { gridData, gridColumns, isSearchOpen } = this.state;
    const { isFormularyGridShown, columns, data, scroll, pinData } = this.state;
    let dataGrid = <FrxLoader />;
    if (data) {
      // dataGrid = (
      //   <FormularyGrid
      //     columns={columns}
      //     data={data}
      //     bordered={false}
      //     rowSelectionChange={this.rowSelectionChange}
      //     enableSettings={false}
      //     isPinningEnabled={false}
      //   />
      // );
      dataGrid = (
        <DrugGrid
          columns={columns}
          data={data}
          scroll={scroll}
          pinData={pinData}
        />
      );
    }
    return (
      <div className="mm-pa-root">
        <div className="bordered details-top">
          <div className="header">
            SELECTED FORMULARIES
            <span>
              &nbsp; &nbsp;
              <img src={IconInfo} alt="info" />
            </span>
          </div>
          <div className="inner-container p-20">
            <div>
              <SimpleGrid columns={gridColumns} data={gridData} />
            </div>
            <div className="dynamic-row-addition">
              <span onClick={this.addNew}>
                <img src={PlusIcon} alt="PlusIcon" />
                &nbsp;
                <span className="__add-new-row">add new</span>
              </span>
            </div>
          </div>
        </div>
        <div className="bordered mm-configure details-top">
          <div className="header">
            <div className="mini-container">
              <div>
                SELECT DRUGS FOR PRIOR AUTHORIZATION
                <span>
                  &nbsp; &nbsp;
                  <img src={IconInfo} alt="info" />
                </span>
              </div>
              <div>
                <DropDown
                  placeholder="FRF"
                  options={["FRF", "Non FRF", "OTC", "ADD File", "Excluded"]}
                />
              </div>
            </div>
            <div className="button-wrapper">
              <Button
                className="Button normal"
                label="Advance Search"
                onClick={this.advanceSearchClickHandler}
              />
              <Button label="Save" onClick={this.saveClickHandler} disabled />
            </div>
          </div>
          <div className="inner-container mm-configure-grid p-20">
            {dataGrid}
            {isSearchOpen ? (
              <AdvancedSearch
                category="Grievances"
                openPopup={isSearchOpen}
                onClose={this.advanceSearchClosekHandler}
              />
            ) : null}
          </div>
        </div>
        <div className="bordered details-top">
          <div className="header">PRIOR AUTHORIZATION</div>
          <div className="inner-container p-20"></div>
        </div>
      </div>
    );
  }
}

export default MassMaintenancePA;
