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

class MassMaintenanceSetup extends Component {
  render() {
    return (
      <>
        <div className="bordered details-top">
          <div className="header">Formulary Maintenance</div>
          <div className="inner-container p-20">Lob</div>
        </div>
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
            {/* <FrxGridContainer
              enableSearch={false}
              isFetchingData={false}
              onSearch={() => {}}
            /> */}
          </div>
        </div>
      </>
    );
  }
}

export default MassMaintenanceSetup;
