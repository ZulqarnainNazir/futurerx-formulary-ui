import React from "react";
import FrxGridContainer from "../../../../shared/FrxGrid/FrxGridContainer";
import { MemberAuditViewColumns } from "../../../../../utils/grid/columns";
import { getAuditViewData } from "../../../../../mocks/grid/audit-view-mock";


export default class MemberAudit extends React.Component<any, any> {  
  state = {
    isFetchingData: false,
    data: [] as any[],
    filteredData: [] as any[]
  };

  componentDidMount() {
    //fetch data from API
    const data = getAuditViewData();
    this.setState({ data, filteredData: data });
  }

  handleSearch = searchObject => {
    console.log(searchObject);
    this.setState({ isFetchingData: true });
    if (searchObject && searchObject.status) {
      setTimeout(() => {
        const newData = this.state.data.filter(
          d => d.status === searchObject.status
        );
        this.setState({ isFetchingData: false, filteredData: newData });
      }, 2000);
    } else {
      this.setState({ isFetchingData: false });
    }
  };


  render() {
    const columns = MemberAuditViewColumns();
    return (
        <FrxGridContainer
					enableSearch
					enableSettings
          onSearch={this.handleSearch}
          fixedColumnKeys={[""]}
          gridName="AuditView"
          isFetchingData={this.state.isFetchingData}
          columns={columns}
          data={this.state.filteredData}
          pagintionPosition="topRight"
          onSettingsClick="grid-menu"
          applyFilter
          customSettingIcon={" "}
          scroll={{ x: 1100, y: 420 }}
          expandable={{
            isExpandable: false,
           
          }}
        />
    );
  }
}