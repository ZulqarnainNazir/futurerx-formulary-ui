import React from "react";

import FrxDrugGridContainer from "../../../../../../shared/FrxGrid/FrxDrugGridContainer";
import { PaRemoveColumns } from "../../../../../../../utils/grid/columns";
import { PAMock } from "../../../../../../../mocks/PAMock";

class PaRemove extends React.Component {
  render() {
    return (
      <>
        <div className="pa-grid-container white-bg">
          <FrxDrugGridContainer
            isPinningEnabled={false}
            enableSearch={false}
            enableColumnDrag
            onSearch={() => {}}
            fixedColumnKeys={[]}
            pagintionPosition="topRight"
            gridName="TIER"
            enableSettings
            columns={PaRemoveColumns()}
            scroll={{ x: 400, y: 377 }}
            isFetchingData={false}
            enableResizingOfColumns
            data={PAMock()}
            rowSelection={{
              columnWidth: 50,
              fixed: true,
              type: "checkbox",
            }}
          />
        </div>
      </>
    );
  }
}

export default PaRemove;
