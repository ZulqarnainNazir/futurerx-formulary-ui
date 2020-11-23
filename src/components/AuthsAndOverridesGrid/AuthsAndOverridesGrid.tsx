/**
 * Sample component to test and demonstrate re use of FrxGridContainer
 */

import * as React from "react";
import FrxGridContainer from "../shared/FrxGrid/FrxGridContainer";
import {authOveridesGridColumns} from "../../utils/grid/columns";
import {getAuthOverridesGridData} from "../../mocks/grid/auth-override-mock";
import "./AuthsAndOverrides.scss";
import {getAuthOverridesSearchMock} from "../../mocks/search/authoverrides-search-mock";
import AuthGridModel from "../AuthsAndOverrides/AuthsAndOverridesEditMode/AuthGridModel";
import FrxDialogPopup from "../shared/FrxDialogPopup/FrxDialogPopup";

export interface AuthsAndOverridesGridProps {}

export interface AuthsAndOverridesGridState {}

class AuthsAndOverridesGrid extends React.Component<
  AuthsAndOverridesGridProps,
  AuthsAndOverridesGridState
> {
  state = {
    isFetchingData: false,
    data: [] as any[],
    filteredData: [] as any[],
    openPopup: false,
    selectedData: {},
  };

  componentDidMount() {
    //fetch data from API
    const data = getAuthOverridesGridData();
    this.setState({data, filteredData: data});
  }

  /**
   * @function handleSearch
   * to handle the search from FrxSearch and update data set passed to FrxGrid
   *
   * TODO: fix a type for the searchObject
   * @author Deepak_T
   */
  handleSearch = (searchObject) => {
    console.log(searchObject);
    this.setState({isFetchingData: true});
    if (searchObject && searchObject.status) {
      setTimeout(() => {
        const newData = this.state.data.filter(
          (d) => d.status === searchObject.status
        );
        this.setState({isFetchingData: false, filteredData: newData});
      }, 2000);
    } else {
      this.setState({isFetchingData: false});
    }
  };
  settingsTriDotMenuClick = (menuItem: any) => {
    if (menuItem) {
      if (menuItem.id === 1) {
        this.setState({
          openPopup: true,
        });
      }
    }
  };
  render() {
    const columns = authOveridesGridColumns();
    return (
      <div className="auths-overrides-grid-root">
        <FrxGridContainer
          enableSearch
          enableSettings
          onSearch={this.handleSearch}
          fixedColumnKeys={["auth-overrideid"]}
          gridName="GENERIC"
          isFetchingData={this.state.isFetchingData}
          columns={columns}
          data={this.state.filteredData}
          searchOptions={getAuthOverridesSearchMock()}
          pagintionPosition="topRight"
          onSettingsClick="grid-menu"
          settingsTriDotMenuClick={this.settingsTriDotMenuClick}
          settingsTriDotClick={(item: any) => {
            this.setState({
              selectedData: item,
            });
          }}
        />
        {this.state.openPopup && (
          <AuthGridModel
            data={this.state.selectedData}
            isOpen={this.state.openPopup}
            onClose={() => {
              this.setState({openPopup: false, selectedData: {}});
            }}
          />
        )}
      </div>
    );
  }
}

export default AuthsAndOverridesGrid;
