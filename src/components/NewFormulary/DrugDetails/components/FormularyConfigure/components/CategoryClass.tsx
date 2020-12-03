import React from "react";
import { Grid } from "@material-ui/core";
import "./Tier.scss";

import {
  getTapList,
  getMiniTabs,
} from "../../../../../../mocks/formulary/mock-data";
import PanelHeader from "./PanelHeader";
import PanelGrid from "./panelGrid";
import DropDown from "../../../../../shared/Frx-components/dropdown/DropDown";
import Button from "../../../../../shared/Frx-components/button/Button";
import Box from "@material-ui/core/Box";
import FrxDrugGridContainer from "../../../../../shared/FrxGrid/FrxDrugGridContainer";
import { categoryClassColumns } from "../../../../../../utils/grid/columns";
import { categoryClassMock } from "../../../../../../mocks/categoryClassMock";

interface tabsState {
  activeMiniTabIndex: number;
  miniTabs: any;
  tabs: any;
}

class CategoryClass extends React.Component<any, tabsState> {
  state = {
    miniTabs: getMiniTabs(),
    isFetchingData: false,
    activeMiniTabIndex: 0,
    activeTabIndex: 0,
    tabs: getTapList(),
  };

  onClickMiniTab = (num: number) => {
    this.setState({
      activeMiniTabIndex: num,
    });
  };

  render() {
    return (
      <div className="drug-detail-LA-root">
        <div className="drug-detail-la-container">
          <div className="drug-detail-la-inner">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <div className="mb-10">
                  <div className="limited-access">
                    <PanelHeader
                      title="Category/Class View And ASSIGNMENT"
                      tooltip="This section allows for Addition or Removal of product only. To define coverage for all Medicare covered and/or Supplemental products, go to Drug Details"
                    />
                  </div>
                </div>
                <div className="bordered">
                  <div className="header space-between pr-10">
                    Select Drugs From
                    <div className="button-wrapper">
                      <Button
                        className="Button normal"
                        label="Advance Search"
                      />
                      <Button label="Save" disabled />
                    </div>
                  </div>
                  <FrxDrugGridContainer
                    isPinningEnabled={false}
                    enableSearch={false}
                    enableColumnDrag
                    onSearch={() => {}}
                    fixedColumnKeys={[]}
                    pagintionPosition="topRight"
                    gridName="TIER"
                    enableSettings
                    columns={categoryClassColumns()}
                    scroll={{ x: 1000, y: 377 }}
                    isFetchingData={false}
                    enableResizingOfColumns
                    data={categoryClassMock()}
                    rowSelection={{
                      columnWidth: 50,
                      fixed: true,
                      type: "checkbox",
                    }}
                  />
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}

export default CategoryClass;
