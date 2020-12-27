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

class PrRemove extends React.Component<any,any> {
  state = {
    selectedRowKeys: [],
    dataToRemove:[],
    seletedValue:[{
      id_patient_residence_type: 0,
      is_covered:true,
      patient_residence_type_code:0,
      name: ""
    }]
  };

  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  getSelectedVal = (e) =>{
    this.props.handleChangeEvent(e.target.value)
    this.setState({...this.state.seletedValue,is_covered:e.target.value})
  }

  static getDerivedStateFromProps(props, state) {
    const data:any =[]
    for (let i = 0; i <props.data.length; i++) {
      data.push({
        key: props.data[i][1],
        name: props.data[i][2]
      });
    }
    return {dataToRemove: data };
  }

  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        this.setState({ selectedRowKeys });
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

export default PrRemove