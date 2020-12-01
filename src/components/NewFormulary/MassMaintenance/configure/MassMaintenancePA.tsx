import React, { Component } from "react";

import IconInfo from "../../../../assets/icons/IconInfo.svg";
import PlusIcon from "../../../../assets/icons/PlusIcon.svg";
import DownloadIcon from "../../../../assets/icons/DownloadIcon.svg";
import EditIcon from "../../../../assets/icons/EditIcon.svg";
import {
  getColumns,
  getData,
  getDrugsList,
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

import {
  getFormularyGridData,
  getDrugsPAGridData,
} from "../../../../mocks/formulary-grid/FormularyGridData";
// import FormularyGrid from "./FormularyGrid";
import DrugGrid from "../../DrugDetails/components/DrugGrid";
import {
  getFormularyGridColumns,
  getDrugsPAGridColumns,
} from "../../../../mocks/formulary-grid/FormularyGridColumn";
import DialogPopup from "../../../shared/FrxDialogPopup/FrxDialogPopup";

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
  isGroupDescPopupEnabled: boolean;
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
  miniTabs: TabInfo[];
  activeMiniTabIndex: number;
  drugsList: any[];
}
class MassMaintenancePA extends Component<any, MassMaintenancePAState> {
  state = {
    isGroupDescPopupEnabled: false,
    isSearchOpen: false,
    gridData: getData(),
    gridColumns: getColumns(),
    drugsList: getDrugsList(),
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
    miniTabs: [
      {
        id: 1,
        text: "Replace",
      },
      {
        id: 2,
        text: "Append",
      },
      {
        id: 3,
        text: "Remove",
      },
    ],
    activeMiniTabIndex: 0,
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
      columns: getDrugsPAGridColumns(),
      data: getDrugsPAGridData(),
    });
  }
  onClickMiniTab = (selectedTabIndex: number) => {
    let activeTabIndex = 0;

    const tabs = this.state.miniTabs.map((tab: TabInfo, index: number) => {
      if (index === selectedTabIndex) {
        activeTabIndex = index;
      }
      return tab;
    });
    this.setState({ miniTabs: tabs, activeMiniTabIndex: activeTabIndex });
  };

  openGroupDescription = (event) => {
    event.stopPropagation();
    this.setState({
      isGroupDescPopupEnabled: !this.state.isGroupDescPopupEnabled,
    });
  };

  closeGroupDescription = () => {
    this.setState({
      isGroupDescPopupEnabled: !this.state.isGroupDescPopupEnabled,
    });
  };
  render() {
    const {
      gridData,
      gridColumns,
      drugsList,
      isSearchOpen,
      miniTabs,
      activeMiniTabIndex,
      isGroupDescPopupEnabled,
    } = this.state;
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
              <img
                style={{
                  marginLeft: "10px",
                }}
                src={DownloadIcon}
                alt="DownloadIcon"
              />
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
        <div className="bordered mm-configure-pa-auth details-top">
          <div className="header">PRIOR AUTHORIZATION</div>
          <div className="modify-panel">
            <div className="icon">
              <span>R</span>
            </div>
            <div className="switch-box">
              <CustomizedSwitches leftTitle="Modify" rightTitle="view all" />
            </div>
            <div className="mini-tabs">
              <FrxMiniTabs
                tabList={miniTabs}
                activeTabIndex={activeMiniTabIndex}
                onClickTab={this.onClickMiniTab}
              />
            </div>
          </div>
          <div className="inner-container mm-configure-pa-auth-grid p-20">
            {gridData.map((drug) => (
              <div className="mm-configure-pa-auth-grid-item">
                <div>
                  <span className="font-style">{drug.formularyName}</span>
                </div>
                {drug.formularyName === "2021Care1234" ? (
                  <div className="mini-flex-container">
                    <div className="input-groups">
                      <label className="uppercase">
                        pa group description &nbsp;
                        <span className="asterisk">*</span>
                      </label>
                      <div className="input-element">
                        <div
                          className="bordered pointer"
                          onClick={this.openGroupDescription}
                        >
                          <span className="inner-font">ADHD PA over 25</span>
                          <img src={EditIcon} alt="EditIcon" />
                        </div>
                      </div>
                    </div>
                    <div className="input-groups">
                      <label className="uppercase">
                        pa type &nbsp;
                        <span className="asterisk">*</span>
                      </label>
                      <div className="input-element">
                        <div className="bordered">
                          <span className="no-inner-font">
                            New Starts Only (2)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="fancy">
                    <span className="fancy-font">
                      Not applicable for this formulary
                    </span>
                  </div>
                )}
              </div>
            ))}

            <div className="button-container-root">
              <span className="white-bg-btn">
                <Button label="Save" onClick={() => {}} />
              </span>
              <Button label="Save & Continue" onClick={() => {}} />
            </div>
          </div>
        </div>
        {isGroupDescPopupEnabled ? (
          <DialogPopup
            showCloseIcon={false}
            positiveActionText=""
            negativeActionText=""
            title="group description"
            children="Group Description Screen #16"
            handleClose={this.closeGroupDescription}
            handleAction={() => {}}
            showActions={false}
            height="80%"
            width="90%"
            open={isGroupDescPopupEnabled}
          />
        ) : null}
      </div>
    );
  }
}

export default MassMaintenancePA;
