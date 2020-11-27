import React from 'react';
import FrxGridContainer from "../../../../../shared/FrxGrid/FrxGridContainer";
import FrxDrugGridContainer from "../../../../../shared/FrxGrid/FrxDrugGridContainer";
import {getStDetails} from "../../FormularyConfigure/DrugGridColumn";
import { stData } from "../../../../../../mocks/DrugGridMock";
import "../../../../../ClaimsGrid/ClaimsGrid.scss";
import './STRemove.scss'

import { GridMenu } from "../../../../../../models/grid.model";
export default class DrugGrid extends React.Component<any,any>{
    state = {
        isFetchingData: false,
        data: [] as any[],
        filteredData: [] as any[]
    };
    
    componentDidMount() {
        //fetch data from API
        const data = stData();
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
        const columns = getStDetails();
        return(
            <div className="bordered ns-border">
                <div className="header">Drug Grid</div>
                <div className="inner-container">
                  <div className="pinned-table">
                    <FrxDrugGridContainer
                      enableSearch={false}
                      enableColumnDrag
                      onSettingsClick="grid-menu"
                      settingsWidth={28}
                      onSearch={this.handleSearch}
                      fixedColumnKeys={["claimId"]}
                      pagintionPosition="topRight"
                      gridName="CLAIMS"
                      enableSettings
                      isFetchingData={this.state.isFetchingData}
                      columns={columns}
                      isRowSelectionEnabled={true}
                      isRowSelectorCheckbox={true}
                      isPinningEnabled={true}
                      rowSelection={{
                        fixed: true,
                        type: 'checkbox',
                      }}
                      scroll={{ x: 3800, y: 377 }}
                      enableResizingOfColumns
                      data={this.state.filteredData}
                    />
                  </div>
                </div>
            </div>
        )
    }
}