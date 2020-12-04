import React from "react";

import "./Tier.scss";
import { Table } from "antd";
import Grid from "@material-ui/core/Grid";

class TierRemove extends React.Component {
  render() {
    const dataSource = [
      {
        key: "1",
        tierName: "Tier 0",
      },
      {
        key: "2",
        tierName: "Tier 1",
      },
      {
        key: "3",
        tierName: "Tier 2",
      },
      {
        key: "4",
        tierName: "Tier 3",
      },
    ];

    const columns = [
      {
        title: "Tier Name",
        dataIndex: "tierName",
        key: "tierName",
      },
    ];
    return (
      <>
        <div className="white-bg">
          <Grid item xs={5}>
            <div className="tier-grid-remove-container">
              <Table
                columns={columns}
                dataSource={dataSource}
                pagination={false}
                rowSelection={{
                  columnWidth: 20,
                  fixed: true,
                  type: "checkbox",
                }}
              />
            </div>
          </Grid>
        </div>
      </>
    );
  }
}

export default TierRemove;
