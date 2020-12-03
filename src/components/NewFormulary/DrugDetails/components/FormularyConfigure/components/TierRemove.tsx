import React from "react";

import "./Tier.scss";
import {Table} from 'antd';
import FrxDrugGridContainer from "../../../../../shared/FrxGrid/FrxDrugGridContainer";
import { tierRemoveColumns } from "../../../../../../utils/grid/columns";
import { TierRemoveMockData } from "../../../../../../mocks/TierMock";

class TierRemove extends React.Component {
  render() {
    const dataSource = [
      {
        key: '1',
        tierName: 'Tier 0',
      },
      {
        key: '2',
        tierName: 'Tier 1',
      },
    ];
    
    const columns = [
      {
        title: 'Tier Name',
        dataIndex: 'tierName',
        key: 'tierName',
      },
      
    ];
    return (
      <>
        <div className="tier-grid-remove-container">
          <Table 
            columns={columns} 
            dataSource={dataSource}
            pagination={false}
            rowSelection={{
              columnWidth: 20,
              fixed: true,
              type: "checkbox",
            }} />
          <FrxDrugGridContainer
            hideClearFilter
            isPinningEnabled={false}
            enableSearch={false}
            enableColumnDrag={false}
            onSearch={() => {}}
            fixedColumnKeys={["tierName"]}
            pagintionPosition="topRight"
            gridName="TIER REMOVE"
            enableSettings={false}
            columns={tierRemoveColumns()}
            scroll={{ y: 377 }}
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
