import * as React from "react";
import { Component } from "react";
import FrxDrugGrid from "../../FrxGrid/FrxDrugGrid";
import FrxDrugGridContainer from "../../FrxGrid/FrxDrugGridContainer";
import FrxLoader from "../../FrxLoader/FrxLoader";
import { tierColumns } from "../../../../utils/grid/columns";
import { Column } from "../../../../models/grid.model";
import { cutomPanelGridMockColumns } from "./mock-columns";
import { customPanelGridMockData } from "./mock-data";

import "./CustomPanelGrid.scss";

export interface CustomPanelGridProps {
  menuItems: { id: number; key: number; title: string }[];
  onMenuClick: (item, data?: any) => void;
}

export interface CustomPanelGridState {
  // activeMiniTabIndex: number;
  // miniTabs: any;
  filteredData: any;
  isFetchingData: boolean;
  data: any;
  // openPopup: boolean;
  // poupType: any;
  selectedRow: any;
  columns: Column<any>[];
}

class CustomPanelGrid extends React.Component<
  CustomPanelGridProps,
  CustomPanelGridState
> {
  state = {
    filteredData: [],
    isFetchingData: false,
    data: [],

    selectedRow: { index: "", id: "" },
    columns: cutomPanelGridMockColumns()
  };

  componentDidMount() {
    this.setState({
      data: customPanelGridMockData.map(d => {
        d["items"] = this.props.menuItems;
        return d;
      }),
      filteredData: customPanelGridMockData.map(d => {
        d["items"] = this.props.menuItems;
        return d;
      })
    });
  }
  render() {
    return (
      <div className="custom-panel-grid-root frx-grid-container">
        <FrxDrugGridContainer
          showSettingsMenu={true}
          enableColumnDrag={true}
          pagintionPosition="bottomRight"
          isPinningEnabled={false}
          columns={this.state.columns}
          data={this.state.filteredData}
          gridName={"CUSTOM PANEL GRID"}
          fixedColumnKeys={["record_type"]}
          hideClearFilter={true}
          hideItemsPerPage={true}
          enableSearch={false}
          isFetchingData={this.state.isFetchingData}
          hideMultiSort={true}
          hidePageJumper={true}
          hidePagination={true}
          hideResults={true}
          scroll={{ x: 1100, y: 300 }}
          enableSettings={true}
          rowClassName={(record, index) => {
            console.log(record, index);
            return record.index === this.state.selectedRow.index
              ? "selt"
              : "not-selt";
          }}
          settingsTriDotMenuClick={(item: any, data?: any) => {
            // console.log(item);
            console.log(data);
            this.props.onMenuClick(item, data);
          }}
          // actionItems={props => this.props.menuItems}
          actionItems={(props: any) => {
            return [
              {
                id: 21,
                key: 21,
                title: "Menu 1"
              },
              {
                id: 22,
                key: 22,
                title: "AMenu 2"
              }
            ];
          }}
          settingsTriDotClick={(item: any) => {
            console.log(item);
          }}
          onSettingsClick={"grid-menu"}
        />
      </div>
    );
  }
}

export default CustomPanelGrid;
