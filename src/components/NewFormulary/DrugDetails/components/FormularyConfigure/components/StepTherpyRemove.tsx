import React from "react";
import FrxDrugGridContainer from "../../../../../shared/FrxGrid/FrxDrugGridContainer";
import {
  getStDetails,
  getStDetailsCol2,
} from "../../FormularyConfigure/DrugGridColumn";
import { stData, stDataTableTwo } from "../../../../../../mocks/DrugGridMock";
import "../../../../../ClaimsGrid/ClaimsGrid.scss";
import "./STRemove.scss";

export default class DrugGrid extends React.Component<any, any> {
  state = {
    isFetchingData: false,
    data: [] as any[],
    filteredData: [] as any[],
    filteredDataForTwo: [] as any[],
  };

  componentDidMount() {
    //fetch data from API
    const data = stData();
    const data2 = stDataTableTwo();
    this.setState({ data, filteredData: data });
    this.setState({ data2, filteredDataForTwo: data2 });
  }
  handleSearch = (searchObject) => {
    console.log(searchObject);
    this.setState({ isFetchingData: true });
    if (searchObject && searchObject.status) {
      setTimeout(() => {
        const newData = this.state.data.filter(
          (d) => d.status === searchObject.status
        );
        this.setState({ isFetchingData: false, filteredData: newData });
      }, 2000);
    } else {
      this.setState({ isFetchingData: false });
    }
  };
  render() {
    const columns = getStDetails();
    const columns2 = getStDetailsCol2();
    return (
      <>
        <div className="bordered ns-border">
          <div className="header">Drug Grid</div>
          <div className="inner-container">
            <div className="pinned-table">
              <FrxDrugGridContainer
                enableSearch={false}
                enableColumnDrag
                onSettingsClick="grid-menu"
                settingsWidth={28}
                onSearch={this.handleSearch}
                fixedColumnKeys={["claimId"]}
                pagintionPosition="topRight"
                gridName="CLAIMS"
                enableSettings
                isFetchingData={this.state.isFetchingData}
                columns={columns}
                isRowSelectionEnabled={true}
                isRowSelectorCheckbox={true}
                isPinningEnabled={true}
                rowSelection={{
                  fixed: true,
                  type: "radio",
                }}
                scroll={{ x: 1500, y: 377 }}
                enableResizingOfColumns
                data={this.state.filteredData}
              />
            </div>
          </div>
        </div>
        <br />
        <div className="bordered ns-border">
          <div className="header">Drug Grid</div>
          <div className="inner-container">
            <div className="pinned-table-2">
              <FrxDrugGridContainer
                enableSearch={false}
                enableColumnDrag
                onSettingsClick="grid-menu"
                settingsWidth={28}
                onSearch={this.handleSearch}
                fixedColumnKeys={["claimId"]}
                pagintionPosition="topRight"
                gridName="CLAIMS"
                enableSettings
                isFetchingData={this.state.isFetchingData}
                columns={columns2}
                isRowSelectionEnabled={true}
                isRowSelectorCheckbox={true}
                isPinningEnabled={true}
                scroll={{ x: 1500, y: 377 }}
                rowSelection={{
                  fixed: true,
                  type: "checkbox",
                }}
                enableResizingOfColumns
                data={this.state.filteredDataForTwo}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}
