import React, { Component } from "react";

import IconInfo from "../../../../assets/icons/IconInfo.svg";
import PlusIcon from "../../../../assets/icons/PlusIcon.svg";
import {
  getColumns,
  getData,
} from "../../../../mocks/formulary-grid/FormularySimpleGridMock";

import SimpleGrid from "../../../shared/Frx-formulary/SimpleGrid/SimpleGrid";

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
}
class MassMaintenancePA extends Component<any, MassMaintenancePAState> {
  state = {
    gridData: getData(),
    gridColumns: getColumns(),
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

  render() {
    const { gridData, gridColumns } = this.state;
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
        <div className="bordered details-top">
          <div className="header">
            SELECT DRUGS FOR PRIOR AUTHORIZATION
            <span>
              &nbsp; &nbsp;
              <img src={IconInfo} alt="info" />
            </span>
          </div>
          <div className="inner-container p-20"></div>
        </div>
        <div className="bordered details-top">
          <div className="header">PRIOR AUTHORIZATION</div>
          <div className="inner-container p-20">Lob</div>
        </div>
      </div>
    );
  }
}

export default MassMaintenancePA;
