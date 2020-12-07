import React, { Component } from 'react'
import './StandardReporting.scss'
import { Grid } from '@material-ui/core'
import FrxDrugGridContainer from '../../shared/FrxGrid/FrxDrugGridContainer'
import { setupStandardReportingColumns } from '../../../utils/grid/columns'
import { SetupStandardReportingMockData } from '../../../mocks/HmpsFilesMock'

export default class StandardReporting extends Component {
    render() {
        return (
            <Grid item xs={12}>
            <div className="standared-reporting-container">
              <div className="bordered">
                <div className="header space-between pr-10">
                  STANDARD REPORTING
                  <div className="float-right">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.75 0H9.25C9.66562 0 10 0.334375 10 0.75V6H12.7406C13.2969 6 13.575 6.67188 13.1812 7.06563L8.42813 11.8219C8.19375 12.0562 7.80937 12.0562 7.575 11.8219L2.81562 7.06563C2.42188 6.67188 2.7 6 3.25625 6H6V0.75C6 0.334375 6.33437 0 6.75 0ZM16 11.75V15.25C16 15.6656 15.6656 16 15.25 16H0.75C0.334375 16 0 15.6656 0 15.25V11.75C0 11.3344 0.334375 11 0.75 11H5.33437L6.86562 12.5312C7.49375 13.1594 8.50625 13.1594 9.13437 12.5312L10.6656 11H15.25C15.6656 11 16 11.3344 16 11.75ZM12.125 14.5C12.125 14.1562 11.8438 13.875 11.5 13.875C11.1562 13.875 10.875 14.1562 10.875 14.5C10.875 14.8438 11.1562 15.125 11.5 15.125C11.8438 15.125 12.125 14.8438 12.125 14.5ZM14.125 14.5C14.125 14.1562 13.8438 13.875 13.5 13.875C13.1562 13.875 12.875 14.1562 12.875 14.5C12.875 14.8438 13.1562 15.125 13.5 15.125C13.8438 15.125 14.125 14.8438 14.125 14.5Z"
                        fill="#C2CFE0"
                      />
                    </svg>
                  </div>
                </div>
                <div className="hmps-wrapper">
                  <FrxDrugGridContainer
                    isPinningEnabled={false}
                    enableSearch={false}
                    enableColumnDrag
                    onSearch={() => {}}
                    fixedColumnKeys={[]}
                    pagintionPosition="topRight"
                    hidePagination={true}
                    gridName=""
                    enableSettings
                    columns={setupStandardReportingColumns()}
                    scroll={{ x: 2000, y: 377 }}
                    isFetchingData={false}
                    enableResizingOfColumns
                    data={SetupStandardReportingMockData()}
                    rowSelection={{
                      columnWidth: 50,
                      fixed: true,
                      type: "checkbox",
                    }}
                  />
                </div>
              </div>
            </div>
          </Grid>
        )
    }
}
