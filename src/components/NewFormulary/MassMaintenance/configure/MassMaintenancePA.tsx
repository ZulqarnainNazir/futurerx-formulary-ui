import React, { Component } from "react";

import IconInfo from "../../../../assets/icons/IconInfo.svg";
import PlusIcon from "../../../../assets/icons/PlusIcon.svg";

import SimpleGrid from "../../../shared/Frx-formulary/SimpleGrid/SimpleGrid";

// import
import "./MassMaintenancePA.scss";

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
    this.setState({
      gridData: this.state.gridData.concat({
        key: "4",
        formularyName: "Care987",
        formularyId: "192039483745",
        formularyVersion: 5,
        contractYeat: "2021",
        formularyType: "Medicare",
        effectiveDate: "01/01/2021",
      }),
    });
  };

  render() {
    const { gridData } = this.state;
    return (
      <div>
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
              <SimpleGrid columns={getColumns()} data={gridData} />
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

const getColumns = () => [
  {
    title: "FORMULARY NAME",
    dataIndex: "formularyName",
    key: "formularyName",
    className: "table-head-color",
  },
  {
    title: "FORMULARY ID",
    dataIndex: "formularyId",
    key: "formularyId",
    className: "table-head-color",
  },
  {
    title: "FORMULARY VERSION",
    dataIndex: "formularyVersion",
    key: "formularyVersion",
    className: "table-head-center",
  },
  {
    title: "CONTRACT YEAR",
    dataIndex: "contractYeat",
    key: "contractYeat",
    className: "table-head-center",
  },
  {
    title: "FORMULARY TYPE",
    dataIndex: "formularyType",
    key: "formularyType",
    className: "table-head-center",
  },

  {
    title: "EFFECTIVE DATE",
    dataIndex: "effectiveDate",
    key: "formularyName",
    className: "table-head-center",
  },
];

const getData = () => {
  return [
    {
      key: "1",
      formularyName: "2021Care1234",
      formularyId: "123456789123",
      formularyVersion: 2,
      contractYeat: "2021",
      formularyType: "Medicare",
      effectiveDate: "01/01/2021",
    },
    {
      key: "2",
      formularyName: "Medicare12",
      formularyId: "123456789124",
      formularyVersion: 3,
      contractYeat: "2021",
      formularyType: "Medicare",
      effectiveDate: "01/01/2021",
    },
    {
      key: "3",
      formularyName: "2021Care4321",
      formularyId: "980765854321",
      formularyVersion: 4,
      contractYeat: "2021",
      formularyType: "Medicare",
      effectiveDate: "01/01/2021",
    },
    {
      key: "4",
      formularyName: "Care987",
      formularyId: "192039483745",
      formularyVersion: 5,
      contractYeat: "2021",
      formularyType: "Medicare",
      effectiveDate: "01/01/2021",
    },
  ];
};

export default MassMaintenancePA;
