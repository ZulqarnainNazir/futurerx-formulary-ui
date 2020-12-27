import React from 'react';
import { Table } from 'antd';
import PanelHeader from '../../../../shared/Frx-components/panel-header/PanelHeader';
import Button from "../../../../shared/Frx-components/button/Button";

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  }
];

class PosRemove extends React.Component<any,any> {
  state = {
    selectedRowKeys: [],
    dataToRemove:[]
  };

  // onSelectChange = selectedRowKeys => {
  //   console.log('selectedRowKeys changed: ', selectedRowKeys);
  //   this.setState({ selectedRowKeys });
  // };

  static getDerivedStateFromProps(props, state) {
    const data:any =[]
    for (let i = 0; i <props.data.length; i++) {
      data.push({
        key: props.data[i][0],
        name: props.data[i][1]
      });
    }
    return {dataToRemove: data };
  }

  getSelectedVal = (e) =>{
    this.props.handleChangeEvent(e.target.value)
  }

  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        //console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        this.setState({ selectedRowKeys:[selectedRowKeys,selectedRows] },()=>{
        this.props.handleRemoveChecked(this.state.selectedRowKeys)
        });
      }
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
      <div className="tab-prremove pr-limit-settings bordered mb-10">
        <PanelHeader title="patient residence settings" tooltip="patient residence settings" />
        <div>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
          </span>
        </div>
        <div className="inner-container">
        <select name="cover" onChange={this.getSelectedVal}>
            <option value="covered" selected>Covered</option>
            <option value="non-covered">NonCovered</option>
         </select>
        <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.dataToRemove} pagination={false} />
        </div>
        <Button label="Apply" onClick={this.props.showGridHandler} />
      </div>
    );
  }
}

export default PosRemove