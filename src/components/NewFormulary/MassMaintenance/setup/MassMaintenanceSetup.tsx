import React, { Component } from "react";
import "./MassMaintenanceSetup.scss";
import MassMaintenanceSetupGrid from "./MassMaintenanceSetupGrid";
import { getClaimsGridData } from "../../../../mocks/grid/claims-mock";
import {
  claimsGridColumnsForRejectedAndTotal,
  _claimsGridColumns,
  _grievancesGridColumns,
  _pacases_initial,
  _testClaimsGridColumns,
} from "../../../../utils/grid/columns";
import { getTestClaimsSearchData } from "../../../../mocks/search/test-claims-search-mock-data";
import DropDown from "../../../shared/Frx-components/dropdown/DropDown";
import Button from "../../../shared/Frx-components/button/Button";
import RadioButton from "../../../shared/Frx-components/radio-button/RadioButton";
import CustomDatePicker from "../../../shared/Frx-components/date-picker/CustomDatePicker";
import { Input } from "antd";

class MassMaintenanceSetup extends Component {
  state = {
    isFormularyGridShown: false,
  };

  showFormularyGrid = () => {
    this.setState({
      isFormularyGridShown: !this.state.isFormularyGridShown,
    });
  };

  render() {
    const { isFormularyGridShown } = this.state;
    return (
      <div className="_mass-maintainance-setup-root">
        <div className="bordered details-top">
          <div className="header">Formulary Maintenance</div>
          <div className="inner-container p-20">
            <div className="flex-container">
              <label className="uppercase">
                lob &nbsp; <span className="asterisk">*</span>
              </label>
              <div>
                <DropDown
                  className="w-80"
                  placeholder="Medicare"
                  options={["Medicare", "Medicaid", "Commercial", "Exchange"]}
                />
              </div>
            </div>
            <div className="flex-container m-t-30">
              <label className="uppercase">
                what type of maintenance do you want to perform &nbsp;
                <span className="asterisk">*</span>
              </label>
              <div className="root-container">
                <RadioButton
                  label="Manual Maintenance"
                  name="mass-maintenance-setup"
                  checked
                />
                <RadioButton
                  label="FRF Change Report Maintenance"
                  name="mass-maintenance-setup"
                />
              </div>
            </div>
            <div className="flex-container-row m-t-30">
              <div>
                <label className="uppercase">
                  service year &nbsp;
                  <span className="asterisk">*</span>
                </label>
                <div>
                  <DropDown
                    className="w-80"
                    placeholder=""
                    options={[
                      "2010",
                      "2011",
                      "2012",
                      "2013",
                      "2014",
                      "2015",
                      "2016",
                      "2017",
                    ]}
                  />
                </div>
              </div>
              <div>
                <label className="uppercase">submission month</label>
                {/* <div className="submission-month-input"> */}
                {/* <input
                  type="text"
                  placeholder=""
                  value=""
                  className="submission-month-input"
                /> */}
                <Input placeholder="" className="submission-month-input" />
                {/* </div> */}
              </div>
              <div>
                <label className="uppercase">
                  EFFECTIVE DATE of change &nbsp;
                  <span className="asterisk">*</span>
                </label>
                <div>
                  <CustomDatePicker
                    className="__effective-date"
                    placeholder=""
                    suffixIcon={
                      <svg
                        width="18"
                        height="20"
                        viewBox="0 0 18 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="ant-picker-suffix"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M16 20H2C0.897 20 0 19.103 0 18V4C0 2.897 0.897 2 2 2H4V0H6V2H12V0H14V2H16C17.103 2 18 2.897 18 4V18C18 19.103 17.103 20 16 20ZM16.001 18L16 6H2V18H16.001ZM6 9H4V11H6V9ZM6 13H4V15H6V13ZM10 9H8V11H10V9ZM10 13H8V15H10V13ZM14 9H12V11H14V9ZM14 13H12V15H14V13Z"
                          fill="#C4C4C4"
                        />
                      </svg>
                    }
                  />
                </div>
              </div>
            </div>
            <div className="move-right">
              <Button
                label={
                  isFormularyGridShown ? "Hide Formularies" : "Show Formularies"
                }
                onClick={this.showFormularyGrid}
              />
            </div>
          </div>
        </div>
        {isFormularyGridShown ? (
          <div className="bordered details-top">
            <div className="header">Select Formularies to apply updates to</div>
            <div className="inner-container p-20">
              <MassMaintenanceSetupGrid
                header={() => {
                  return null;
                }}
                type="CLAIMSHISTORY"
                data={getClaimsGridData}
                settingsTriDotMenuClick={() => {}}
                settingsWidth={20}
                columns={_testClaimsGridColumns}
                searchOptions={getTestClaimsSearchData}
                onColumnCellClick={""}
              />
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default MassMaintenanceSetup;
