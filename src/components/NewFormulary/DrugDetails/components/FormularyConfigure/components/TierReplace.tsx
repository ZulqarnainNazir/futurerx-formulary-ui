import React from "react";
import { Grid } from "@material-ui/core";
import "./Tier.scss";

import DropDown from "../../../../../shared/Frx-components/dropdown/DropDown";
import Button from "../../../../../shared/Frx-components/button/Button";
import Box from "@material-ui/core/Box";
import FrxDrugGridContainer from "../../../../../shared/FrxGrid/FrxDrugGridContainer";
import { tierColumns } from "../../../../../../utils/grid/columns";
import { TierMockData } from "../../../../../../mocks/TierMock";

interface tabsState {
  tierGridContainer: boolean;
}

class TierReplace extends React.Component<any, tabsState> {
  state = {
    tierGridContainer: false,
  };

  openTierGridContainer = () => {
    this.setState({ tierGridContainer: true });
  };

  render() {
    return (
      <>
        <div className="group tier-dropdown white-bg">
          <Grid container>
            <Grid item xs={4}>
              <label>
                TIER <span className="astrict">*</span>
              </label>
              <DropDown options={[1, 2, 3]} />
            </Grid>
            <Grid item xs={1}>
              <Box display="flex" justifyContent="flex-end">
                <Button label="Apply" onClick={this.openTierGridContainer} />
              </Box>
            </Grid>
          </Grid>
        </div>
        {this.state.tierGridContainer && (
          <div className="bordered white-bg">
            <div className="header space-between pr-10">
              Select Drugs From
              <div className="button-wrapper">
                <Button className="Button normal" label="Advance Search" />
                <Button label="Save" disabled />
              </div>
            </div>

            <div className="tier-grid-container">
              <FrxDrugGridContainer
                isPinningEnabled={false}
                enableSearch={false}
                enableColumnDrag
                onSearch={() => {}}
                fixedColumnKeys={[]}
                pagintionPosition="topRight"
                gridName="TIER"
                enableSettings={false}
                columns={tierColumns()}
                scroll={{ x: 2000, y: 377 }}
                isFetchingData={false}
                enableResizingOfColumns
                data={TierMockData()}
                rowSelection={{
                  columnWidth: 50,
                  fixed: true,
                  type: "checkbox",
                }}
              />
            </div>
          </div>
        )}
      </>
    );
  }
}

export default TierReplace;
