import React from "react";
import FrxGridContainer from "../../shared/FrxGrid/FrxGridContainer";
import { claimsGridColumnsForPaid } from "../../../utils/grid/columns";
import { getClaimsGridData } from "../../../mocks/grid/claims-mock";

export default function Medicaid() {
  return (
    <FrxGridContainer
      enableSearch={false}
      enableColumnDrag
      onSearch={() => {}}
      fixedColumnKeys={[""]}
      pagintionPosition="topRight"
      gridName=""
      isFetchingData={false}
      columns={claimsGridColumnsForPaid()}
      scroll={{ x: 3800, y: 377 }}
      enableResizingOfColumns
      data={getClaimsGridData()}
      // pinning columns
      isPinningEnabled={true}
      // setting gear 1st column
      enableSettings={false}
      // checkbox 2nd column
      isCustomCheckboxEnabled={true}
      // event reference for checkbox (mandotory if checkbox is true)
      handleCustomRowSelectionChange={(r) => {
        console.log(r);
      }}
    />
  );
}
