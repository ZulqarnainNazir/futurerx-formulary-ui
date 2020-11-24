import React from 'react';
import FrxGridContainer from "../../../shared/FrxGrid/FrxGridContainer";
import {
  claimsGridColumnsForRejectedAndTotal,
  claimsGridColumnsForPaid
} from "../../../../utils/grid/columns";
import { getClaimsGridData } from "../../../../mocks/grid/claims-mock";
import "../../../ClaimsGrid/ClaimsGrid.scss";

import { GridMenu } from "../../../../models/grid.model";
export default class DrugGrid extends React.Component<any,any>{
    state = {
        isFetchingData: false,
        data: [] as any[],
        filteredData: [] as any[]
      };
    
      componentDidMount() {
        //fetch data from API
        const data = getClaimsGridData();
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
    render(){
        const columns = claimsGridColumnsForPaid();
        return(
            <div className="bordered">
                <div className="header">Drug Grid</div>
                <FrxGridContainer
                enableSearch={false}
                enableColumnDrag
                onSearch={this.handleSearch}
                fixedColumnKeys={["claimId"]}
                pagintionPosition="topRight"
                gridName="CLAIMS"
                enableSettings
                isFetchingData={this.state.isFetchingData}
                columns={columns}
                isRowSelectionEnabled={true}
                isRowSelectorCheckbox={true}
                isColumnCheckbox = {true}
                // expandable={{
                //   isExpandable: true,
                //   expandIconColumnIndex: 1,
                //   expandedRowRender: props => <MemberCostshare {...props} />,

                //   expandOpenIcon: <span>O</span>,
                // expandCloseIcon: <span>X</span>
                // }}
                // settingsTriDotMenuClick={this.settingsTriDotMenuClick}
                // settingsTriDotClick={this.settingsTriDotClick}
                // onColumnCellClick={this.onColumnCellClick}
                // summary={this.showSummary}
                // isRowSelectionEnabled
                // rowSelectionChange={this.rowSelectionChange}
                // isRowSelectorCheckbox

                scroll={{ x: 3800, y: 377 }}
                enableResizingOfColumns
                data={this.state.filteredData}
                />
            </div>
        )
    }
}