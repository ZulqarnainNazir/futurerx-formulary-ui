import React, { Component } from "react";
import { QlRemoveColumns } from "../../../../../../utils/grid/columns"; //"../../../../../utils/grid/columns";
import FrxDrugGridContainer from "../../../../../shared/FrxGrid/FrxDrugGridContainer";
import * as constants from "../../../../../../api/http-commons"; //"../../../../../api/http-commons";
//"../../../../shared/FrxGrid/FrxDrugGridContainer";
import { postCriteriaListQl } from "../../../../../../redux/slices/formulary/ql/qlActionCreation";
import { connect } from "react-redux";

function mapDispatchToProps(dispatch) {
  return {
    postCriteriaListQl: (a) => dispatch(postCriteriaListQl(a)),
  };
}

function mapStateToProps(state) {
  return {
    current_formulary: state.application.formulary,
    // formulary_lob_id: state.application.formulary_lob_id,
    qlData: state.qlReducer.data,
    // inState: state,
  };
}

// interface Props {
//   formularyId: any;
//   path: any;
// }
interface State {}

class Remove extends Component<any, State> {
  state = {
    drugGridData: [],
    drugData: [],
    filter: Array(),
  };

  onSelectedTableRowChanged = (selectedRowKeys) => {
    // this.props.selectedCriteria = [];

    let currentSelectedCriteriaIds = [];
    let tempDrugData: any = [...this.state.drugData];
    if (selectedRowKeys && selectedRowKeys.length > 0) {
      currentSelectedCriteriaIds = selectedRowKeys.map(
        (Id) => tempDrugData[Id - 1]["id_ql_criteria"]
      );
    }

    console.log("[currentSelectedCriteriaIds]:", currentSelectedCriteriaIds);

    // alert("in remvove" + selectedRowKeys);
    this.props.onUpdateSelectedCriteria(currentSelectedCriteriaIds);
  };

  getDrugCriteria = () => {
    let apiDetails = {};

    apiDetails["pathParams"] =
      this.props.current_formulary.id_formulary +
      "/" +
      this.props.current_formulary.formulary_type_info.formulary_type_code;
    apiDetails["keyVals"] = [
      {
        key: constants.KEY_ENTITY_ID,
        value: this.props.current_formulary.id_formulary,
      },
    ];
    apiDetails["messageBody"] = {};
    this.props.postCriteriaListQl(apiDetails).then((json) => {
      console.log("[postCriterial]:", json);
      this.loadGridData(json);
    });
  };

  onClearFilterHandler = () => {
    this.state.filter = Array();

    this.getDrugCriteria();
  };

  onApplyFilterHandler = (filters) => {
    // debugger;
    console.log("filtering from be:" + JSON.stringify(filters));
    //this.state.filter = Array();
    const fetchedKeys = Object.keys(filters);
    if (fetchedKeys && fetchedKeys.length > 0) {
      fetchedKeys.map((fetchedProps) => {
        if (filters[fetchedProps]) {
          const fetchedOperator =
            filters[fetchedProps][0].condition === "is like"
              ? "is_like"
              : filters[fetchedProps][0].condition === "is not"
              ? "is_not"
              : filters[fetchedProps][0].condition === "is not like"
              ? "is_not_like"
              : filters[fetchedProps][0].condition === "does not exist"
              ? "does_not_exist"
              : filters[fetchedProps][0].condition;
          const fetchedValues =
            filters[fetchedProps][0].value !== ""
              ? [filters[fetchedProps][0].value.toString()]
              : [];
          this.state.filter.push({
            prop: fetchedProps,
            operator: fetchedOperator,
            values: fetchedValues,
          });
        }
      });
      console.log("Filters:" + JSON.stringify(this.state.filter));

      this.getDrugCriteria();
    }
  };

  componentDidMount() {
    // /api/1/criteria-list-ql/3302/COMM?entity_id=3302
    // :scheme: https
    this.getDrugCriteria();

    this.props.onUpdateSelectedCriteria([]);
  }

  componentDidUpdate() {
    console.log("update remove compoenent");
  }

  loadGridData(json: any) {
    {
      // this.props.onUpdateSelectedCriteria([]);
      //   const { isLoading } = this.state;
      //   this.setState({ isLoading: !isLoading });
      let tmpData = json.payload.result;
      var data: any[] = [];
      let count = 1;
      var gridData: any = tmpData.map(function (el) {
        var element = Object.assign({}, el);
        data.push(element);
        let gridItem = {};
        gridItem["id"] = count;
        gridItem["key"] = count;
        gridItem["quantity"] = element.quantity;
        gridItem["quantity_limit_days"] = element.quantity_limit_days;
        gridItem["quantity_limit_period_of_time"] =
          element.quantity_limit_period_of_time;
        gridItem["quantity_limit_period_of_time"] =
          element.quantity_limit_period_of_time;
        gridItem["fills_allowed"] = element.fills_allowed;
        gridItem["full_limit_period_of_time"] =
          element.full_limit_period_of_time;

        count++;
        return gridItem;
      });
      this.setState({
        // isLoading: !isLoading,
        drugData: data,
        drugGridData: gridData,
      });
    }
  }

  render() {
    return (
      <div>
        <div className="tier-grid-container ql-remove-grid">
          <FrxDrugGridContainer
            isDataLoaded={true}
            isPinningEnabled={false}
            enableSearch={false}
            enableColumnDrag
            onSearch={() => {}}
            fixedColumnKeys={[]}
            pagintionPosition="topRight"
            gridName="DRUG GRID"
            enableSettings={false}
            columns={QlRemoveColumns()}
            scroll={{ x: 500, y: 377 }}
            isFetchingData={false}
            enableResizingOfColumns
            data={this.state.drugGridData}
            settingsWidth={10}
            hideItemsPerPage
            hidePageJumper
            hideResults
            // clearFilterHandler={this.onClearFilterHandler}
            // applyFilter={this.onApplyFilterHandler}
            // applySort={this.onApplySortHandler}
            // isSingleSorted={this.state.isGridSingleSorted}
            // sortedInfo={this.state.gridSingleSortInfo}
            // applyMultiSort={this.applyMultiSortHandler}
            // isMultiSorted={this.state.isGridMultiSorted}
            // multiSortedInfo={this.state.gridMultiSortedInfo}
            // onMultiSortToggle={this.onMultiSortToggle}
            // getColumnSettings={this.onSettingsIconHandler}
            rowSelection={{
              // columnWidth: 50,
              fixed: true,
              type: "checkbox",
              onChange: this.onSelectedTableRowChanged,
            }}
          />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Remove);
