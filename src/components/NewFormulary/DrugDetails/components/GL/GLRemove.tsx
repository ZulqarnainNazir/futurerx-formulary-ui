import React from "react";
import { Table } from "antd";
import PanelHeader from "../../../../shared/Frx-components/panel-header/PanelHeader";
import Button from "../../../../shared/Frx-components/button/Button";
import Box from "@material-ui/core/Box";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
  },
];

class GLRemove extends React.Component<any, any> {
  state = {
    selectedRowKeys: [],
    dataToRemove: [],
    selType: '',
  };

  onSelectChange = (selectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  getSelectedVal = (e) => {
    this.setState({ selType: e.target.value })
    this.props.handleChangeEvent(e.target.value);
  };

  static getDerivedStateFromProps(props, state) {
    const data: any = [];
    for (let i = 0; i < props.data.length; i++) {
      data.push({
        key: props.data[i][0],
        name: props.data[i][2],
      });
    }
    return { dataToRemove: data };
  }

  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({ selectedRowKeys });
        this.props.handleRemoveChecked(selectedRows);
      },
    };
    const hasSelected = selectedRowKeys.length > 0;

    return (
      <div className="tab-prremove pr-limit-settings bordered mb-10">
        <PanelHeader
          title="patient residence settings"
          tooltip="patient residence settings"
        />
        {/* <div>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
          </span>
        </div> */}
        <div className="inner-container">
          <div className="tier-grid-remove-container">
            <select name="cover" onChange={this.getSelectedVal}>
              <option value="covered" selected>
                Covered
              </option>
              <option value="non-covered">NonCovered</option>
            </select>
            <Table
              key={this.state.selType}
              rowSelection={rowSelection}
              columns={columns}
              dataSource={this.state.dataToRemove}
              pagination={false}
            />
          </div>
        </div>
        <Box display="flex" justifyContent="flex-end">
          <Button label="Apply" onClick={this.props.showGridHandler} />
        </Box>
      </div>
    );
  }
}

export default GLRemove;
