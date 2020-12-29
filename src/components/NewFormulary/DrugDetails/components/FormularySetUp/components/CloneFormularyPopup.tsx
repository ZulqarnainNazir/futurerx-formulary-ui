import React from "react";
import { selectFormularyGridMock } from "../../../../../../mocks/selectFormularyGrid-mock";
import {
  selectFormularyGrid,
  selectFormularyGridMedicare,
} from "../../../../../../utils/grid/columns";
import FrxGridContainer from "../../../../../shared/FrxGrid/FrxDrugGridContainer";
import FormularyExpandedDetails from "../../../SelectFormularyPopUp/FormularyExpandedDetails";
import { getformularies } from "../../../../../../redux/slices/formulary/dashboard/dashboardService";
import getLobName from "../../../../Utils/LobNameUtils";
import { connect } from 'react-redux'

function mapDispatchToProps(dispatch) {
  return {
  };
}

const mapStateToProps = (state) => {
  return {
    formulary_id: state?.application?.formulary_id,
    formulary: state?.application?.formulary,
    formulary_lob_id: state?.application?.formulary_lob_id,
    formulary_type_id: state?.application?.formulary_type_id,
  };
};

const defaultListPayload = {
  index: 0,
  limit: 10,
  filter: [],
  id_lob: 4,
  search_by: null,
  search_key: "",
  search_value: [],
  sort_by: ["cms_formulary_id"],
  sort_order: ["desc"],
}

class CloneFormularyPopup extends React.Component<any, any> {
  state = {
    formularyData: Array(),
    formularyGridData: Array(),
    hiddenColumns: Array(),
    dataCount: 0,
  };
  listPayload: any = {
    index: 0,
    limit: 10,
    filter: [],
    id_lob: 1,
    search_by: null,
    search_key: "",
    search_value: [],
    sort_by: ["cms_formulary_id"],
    sort_order: ["desc"],
  }

  onSettingsIconHandler = (hiddenColumn, visibleColumn) => {
    console.log('Settings icon handler: Hidden' + JSON.stringify(hiddenColumn) + ' Visible:' + JSON.stringify(visibleColumn));
    if(hiddenColumn && hiddenColumn.length > 0){
      let hiddenColumnKeys = hiddenColumn.map(column => column['key']);
      this.setState({
        hiddenColumns: hiddenColumnKeys
      });
    }
  }
  onApplyFilterHandler = (filters) => {
    const fetchedProps = Object.keys(filters)[0];
    console.log('Fetched properties:' + JSON.stringify(fetchedProps) + " Filters:" + JSON.stringify(filters));
    const fetchedOperator = filters[fetchedProps][0].condition === 'is like' ? 'is_like' :
      filters[fetchedProps][0].condition === 'is not' ? 'is_not' :
        filters[fetchedProps][0].condition === 'is not like' ? 'is_not_like' :
          filters[fetchedProps][0].condition === 'does not exist' ? 'does_not_exist' :
            filters[fetchedProps][0].condition;
    const fetchedValues = filters[fetchedProps][0].value !== '' ? [filters[fetchedProps][0].value.toString()] : [];
    const newFilters = [{ prop: fetchedProps, operator: fetchedOperator, values: fetchedValues }];
    this.listPayload.filter = newFilters;
    this.fetchFormularies(this.listPayload);
  }
  onPageSize = (pageSize) => {
    this.listPayload = { ...defaultListPayload };
    this.listPayload.limit = pageSize
    this.listPayload.id_lob = this.props.formulary_lob_id;
    this.fetchFormularies(this.listPayload);
  }
  onGridPageChangeHandler = (pageNumber: any) => {
    this.listPayload.index = (pageNumber - 1) * this.listPayload.limit;
    this.fetchFormularies(this.listPayload);
  }
  onClearFilterHandler = () => {
    this.listPayload = { ...defaultListPayload };
    this.listPayload.id_lob = this.props.formulary_lob_id;
    this.fetchFormularies(this.listPayload);
  }
  fetchFormularies = async (payload) => {
    this.state.formularyData = Array();
    this.state.formularyGridData = Array();
    try {
      let formularies = await getformularies(payload);
      console.log(" LIST : ",formularies.list);
      console.log('Formularies:' + JSON.stringify(Object.keys(formularies)));
      if (formularies['list'] && formularies['list'].length > 0) {
        formularies['list'].map((row, index) => {
          let item = Object.assign({}, row);
          this.state.formularyData.push(item);

          let gridItem = {};
          gridItem['id'] = index + 1;
          gridItem['key'] = index + 1;
          gridItem['serviceYear'] = item['contract_year'] === null ? '' : item['contract_year'];
          gridItem['lob'] = item['id_lob'] === null ? '' : getLobName(item['id_lob']);
          gridItem['fromularyName'] = item['formulary_name'] === null ? '' : item['formulary_name'];
          gridItem['formularyId'] = item['id_formulary'] === null ? '' : item['id_formulary'];
          gridItem['version'] = item['version_number'] === null ? '' : item['version_number'];
          gridItem['tierCount'] = item['number_of_tiers'] === null ? '' : item['number_of_tiers'];
          gridItem['drugCount'] = item['number_of_drugs'] === null ? '' : item['number_of_drugs'];
          gridItem['step'] = item['step'] === null ? '' : item['step'];
          gridItem['assign'] = item['assigned_to'] === null ? '' : item['assigned_to'];
          gridItem['status'] = item['status'] === null ? '' : item['status'];
          gridItem['effectiveDate'] = item['effective_date'] === null ? '' : item['effective_date'];
          gridItem['dueDate'] = item['due_date'] === null ? '' : item['due_date'];

          this.state.formularyGridData.push(gridItem);
        });
        this.setState({
          dataCount: formularies['count']
        });
      } else {
        this.setState({
          dataCount: 0
        });
      }
    } catch (err) {
      this.setState({
        dataCount: 0
      });
    }
  }
  componentDidMount() {
    console.log(" CPP componentDidMount")
    let id_lob = this.props.formulary_lob_id;
    this.listPayload = { ...defaultListPayload };
    this.listPayload.id_lob = id_lob;
    console.log("lobID", this.props.lobID);
    if(this.props.lobID > 0 ){
      this.listPayload.id_lob =parseInt( this.props.lobID);
    }
    this.fetchFormularies(this.listPayload);
  }
  selectFormularyClick = (dataRow) => {
    if (this.props.selectFormularyClick) {
      let actualData = this.state.formularyData.filter(item => item.id_formulary === dataRow.formularyId);
      if (actualData && actualData.length > 0) {
        this.props.selectFormularyClick(actualData[0]);
      }
    }
  };
  render() {
    let gridColumns: any[] = this.props.type === "medicare" ? selectFormularyGridMedicare({onFormularyNameClick: null,}) : selectFormularyGrid({onFormularyNameClick: null,});
    gridColumns = gridColumns.filter(column => !this.state.hiddenColumns.includes(column['key']));
    if (this.props.type === "medicare") {
      return (
        <FrxGridContainer
          onSettingsClick="grid-menu"
          enableSearch={false}
          enableColumnDrag
          onSearch={() => { }}
          settingsWidth={50}
          fixedColumnKeys={["claimId"]}
          pagintionPosition="topRight"
          gridName="Select Formulary"
          enableSettings
          columns={gridColumns}
          customSettingIcon={"PLUS-BTN"}
          scroll={{ x: 2000, y: 377 }}
          isFetchingData={false}
          enableResizingOfColumns
          data={this.state.formularyGridData}
          totalRowsCount={this.state.dataCount}
          settingsTriDotClick={this.selectFormularyClick}
          getPerPageItemSize={this.onPageSize}
          onGridPageChangeHandler={this.onGridPageChangeHandler}
          clearFilterHandler={this.onClearFilterHandler}
          applyFilter={this.onApplyFilterHandler}
          getColumnSettings={this.onSettingsIconHandler}
          pageSize={this.listPayload.limit}
          selectedCurrentPage={(this.listPayload.index / this.listPayload.limit + 1)}
          expandable={{
            isExpandable: true,
            expandIconColumnIndex: gridColumns.length + 1,
            expandedRowRender: (props) => (
              <FormularyExpandedDetails
                {...props}
                formularyToggle={this.props.formularyToggle}
              />
            ),
            expandCloseIcon: (
              <span>
                <svg
                  width="9"
                  height="5"
                  viewBox="0 0 9 5"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.223752 0.24549C0.531543 -0.0693596 0.960049 -0.0940675 1.33632 0.24549L4.09513 2.89065L6.85395 0.24549C7.23022 -0.0940675 7.65943 -0.0693596 7.9651 0.24549C8.27289 0.559634 8.25313 1.0905 7.9651 1.38559C7.67849 1.68067 4.65071 4.56373 4.65071 4.56373C4.57861 4.63846 4.49219 4.69789 4.39662 4.73849C4.30104 4.77908 4.19827 4.8 4.09443 4.8C3.99059 4.8 3.88782 4.77908 3.79224 4.73849C3.69666 4.69789 3.61025 4.63846 3.53815 4.56373C3.53815 4.56373 0.511776 1.68067 0.223752 1.38559C-0.0649778 1.0905 -0.0840382 0.559634 0.223752 0.24549Z"
                    fill="#999999"
                  />
                </svg>
              </span>
            ),
            expandOpenIcon: (
              <span>
                <svg
                  width="5"
                  height="9"
                  viewBox="0 0 5 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.245493 7.96947C-0.0693603 7.6615 -0.0940685 7.23274 0.245493 6.85625L2.89068 4.09578L0.245492 1.33532C-0.0940688 0.958827 -0.0693606 0.529358 0.245492 0.223503C0.559639 -0.0844708 1.09051 -0.0646925 1.3856 0.223503C1.68069 0.510286 4.56378 3.53987 4.56378 3.53987C4.63851 3.61202 4.69794 3.69849 4.73853 3.79412C4.77913 3.88975 4.80005 3.99259 4.80005 4.09649C4.80005 4.20039 4.77913 4.30322 4.73853 4.39886C4.69794 4.49449 4.63851 4.58096 4.56378 4.6531C4.56378 4.6531 1.68069 7.68128 1.3856 7.96947C1.09051 8.25838 0.55964 8.27745 0.245493 7.96947Z"
                    fill="#323C47"
                  />
                </svg>
              </span>
            ),
          }}
        />
      );
    } else if (this.props.type === "commercial") {
      return (
        <FrxGridContainer
          onSettingsClick="grid-menu"
          enableSearch={false}
          enableColumnDrag
          onSearch={() => { }}
          settingsWidth={50}
          fixedColumnKeys={["claimId"]}
          pagintionPosition="topRight"
          gridName="Select Formulary"
          enableSettings
          columns={gridColumns}
          customSettingIcon={"PLUS-BTN"}
          scroll={{ x: 2000, y: 377 }}
          isFetchingData={false}
          enableResizingOfColumns
          data={this.state.formularyGridData}
          totalRowsCount={this.state.dataCount}
          settingsTriDotClick={this.selectFormularyClick}
          getPerPageItemSize={this.onPageSize}
          onGridPageChangeHandler={this.onGridPageChangeHandler}
          clearFilterHandler={this.onClearFilterHandler}
          applyFilter={this.onApplyFilterHandler}
          getColumnSettings={this.onSettingsIconHandler}
          pageSize={this.listPayload.limit}
          selectedCurrentPage={(this.listPayload.index / this.listPayload.limit + 1)}
          expandable={{
            isExpandable: true,
            expandIconColumnIndex: gridColumns.length + 1,
            expandedRowRender: (props) => (
              <FormularyExpandedDetails
                {...props}
                formularyToggle={this.props.formularyToggle}
              />
            ),
            expandCloseIcon: (
              <span>
                <svg
                  width="9"
                  height="5"
                  viewBox="0 0 9 5"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.223752 0.24549C0.531543 -0.0693596 0.960049 -0.0940675 1.33632 0.24549L4.09513 2.89065L6.85395 0.24549C7.23022 -0.0940675 7.65943 -0.0693596 7.9651 0.24549C8.27289 0.559634 8.25313 1.0905 7.9651 1.38559C7.67849 1.68067 4.65071 4.56373 4.65071 4.56373C4.57861 4.63846 4.49219 4.69789 4.39662 4.73849C4.30104 4.77908 4.19827 4.8 4.09443 4.8C3.99059 4.8 3.88782 4.77908 3.79224 4.73849C3.69666 4.69789 3.61025 4.63846 3.53815 4.56373C3.53815 4.56373 0.511776 1.68067 0.223752 1.38559C-0.0649778 1.0905 -0.0840382 0.559634 0.223752 0.24549Z"
                    fill="#999999"
                  />
                </svg>
              </span>
            ),
            expandOpenIcon: (
              <span>
                <svg
                  width="5"
                  height="9"
                  viewBox="0 0 5 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.245493 7.96947C-0.0693603 7.6615 -0.0940685 7.23274 0.245493 6.85625L2.89068 4.09578L0.245492 1.33532C-0.0940688 0.958827 -0.0693606 0.529358 0.245492 0.223503C0.559639 -0.0844708 1.09051 -0.0646925 1.3856 0.223503C1.68069 0.510286 4.56378 3.53987 4.56378 3.53987C4.63851 3.61202 4.69794 3.69849 4.73853 3.79412C4.77913 3.88975 4.80005 3.99259 4.80005 4.09649C4.80005 4.20039 4.77913 4.30322 4.73853 4.39886C4.69794 4.49449 4.63851 4.58096 4.56378 4.6531C4.56378 4.6531 1.68069 7.68128 1.3856 7.96947C1.09051 8.25838 0.55964 8.27745 0.245493 7.96947Z"
                    fill="#323C47"
                  />
                </svg>
              </span>
            ),
          }}
        />
      );
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CloneFormularyPopup);