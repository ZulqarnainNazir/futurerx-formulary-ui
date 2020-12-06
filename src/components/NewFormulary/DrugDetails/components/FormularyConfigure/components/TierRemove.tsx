import React from "react";
import { connect } from 'react-redux'

import "./Tier.scss";
import { Table } from "antd";
import Grid from "@material-ui/core/Grid";


const mapStateToProps = (state) => {
  return {
    tierData: state.tierSliceReducer.data
  }
}

class TierRemove extends React.Component {
  render() {
    const dataSource: any[] = [];

    if (this.props['tierData'].length > 0) {
      this.props['tierData'].map(tier => {
        dataSource.push({ 'key': tier.id_tier, 'tierName': tier.tier_name })
      })
    }

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

export default connect(mapStateToProps)(TierRemove);
