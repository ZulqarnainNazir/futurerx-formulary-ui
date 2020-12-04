import React from "react";

import FrxDrugGridContainer from "../../../../../../shared/FrxGrid/FrxDrugGridContainer";
import { PaRemoveColumns } from "../../../../../../../utils/grid/columns";
import { PAMock } from "../../../../../../../mocks/PAMock";
import Button from "../../../../../../shared/Frx-components/button/Button";
import { Row, Col } from "antd";
import PanelHeader from "../PanelHeader";

class PaRemove extends React.Component {
  render() {
    return (
      <>
        <div className="pa-settings-grid-container white-bg">
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
            scroll={{ y: 377 }}
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
        <div className="white-bg">
          <Row justify="end">
            <Col>
              <Button label="Apply"></Button>
            </Col>
          </Row>
        </div>
        <div className="pa-drug-grid-container white-bg">
          <div className="limited-access">
            <PanelHeader title="Drug Grid" />
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
              scroll={{ y: 377 }}
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
        </div>
      </>
    );
  }
}

export default PaRemove;
