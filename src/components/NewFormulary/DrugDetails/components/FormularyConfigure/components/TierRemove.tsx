import React from "react";

import "./Tier.scss";

import FrxDrugGridContainer from "../../../../../shared/FrxGrid/FrxDrugGridContainer";
import { tierRemoveColumns } from "../../../../../../utils/grid/columns";
import { TierRemoveMockData } from "../../../../../../mocks/TierMock";

class TierRemove extends React.Component {
  render() {
    return (
      <>
        <div className="tier-grid-remove-container">
          <FrxDrugGridContainer
            hideClearFilter
            isPinningEnabled={false}
            enableSearch={false}
            enableColumnDrag={false}
            onSearch={() => {}}
            fixedColumnKeys={[]}
            pagintionPosition="topRight"
            gridName="TIER REMOVE"
            enableSettings={false}
            columns={tierRemoveColumns()}
            scroll={{ x: 0, y: 0 }}
            isFetchingData={false}
            enableResizingOfColumns={false}
            data={TierRemoveMockData()}
            rowSelection={{
              columnWidth: 20,
              fixed: true,
              type: "checkbox",
            }}
            hideItemsPerPage
            hideMultiSort
            hideResults
            hidePagination
            hidePageJumper
          />
        </div>
      </>
    );
  }
}

export default TierRemove;
