import { Container } from "@material-ui/core";
import React, { Component } from "react";
import { getClaimsGridData } from "../../mocks/grid/claims-mock";
import {
  AdvancedSearchCallsGridColumns,
  AdvancedSearchDocumentsGridColumns,
  AdvancedSearchGrienvanceGridColumns,
  AdvancedSearchMemberGridColumns,
  AdvancedSearchOthersGridColumns,
  AdvancedSearchPaidReversedClaimsGridColumns,
  AdvancedSearchPAInitialGridColumns,
  AdvancedSearchPAppealGridColumns,
  AdvancedSearchPharmacyGridColumns,
  AdvancedSearchPrescriberGridColumns,
  AdvancedSearchTestClaimsGridColumns,
  authOveridesGridColumns,
  grievancesGridColumns,
  testClaimsGridColumns,
  _claimsGridColumns,
  _testClaimsGridColumns
} from "../../utils/grid/columns";
import {
  getAdvancedSearchCallsGridData,
  getAdvancedSearchMemberGridData,
  getAdvancedSearchOthersGridData,
  getAdvancedSearchPaidReversedClaimsGridData,
  getAdvancedSearchPAInitialClaimsGridData,
  getAdvancedSearchPAAppealClaimsGridData,
  getAdvancedSearchPharmacyGridData,
  getAdvancedSearchPrescriberGridData,
  getAdvancedSearchTestClaimsGridData,
  getAdvancedSearchCommunicationsGridData
} from "../../mocks/grid/advanced-search-mock";
import TestClaimsGrid from "../TestClaimsGrid/TestClaimsGrid";
import "./AdvancedSearch.scss";
import FrxLoader from "../shared/FrxLoader/FrxLoader";
import { getGrieviencesSearchData } from "../../mocks/search/grievences-search-mock";
import { getGrievancesGridData } from "../../mocks/grid/grievances-mock";
import { getAuthOverridesGridData } from "../../mocks/grid/auth-override-mock";

// material ui
import { Button } from "@material-ui/core";

// components
import GridAdavncedMemberSearch from "./SearchComponents/GridAdvancedMemberSearch";
import GridAdvancedPharmacySearch from "./SearchComponents/GridAdvancedPharmacySearch";
import GridAdvancedPrescriberSearch from "./SearchComponents/GridAdvancedPrescriberSearch";
import GridAdvancedTestClaimsSearch from "./SearchComponents/GridAdvancedTestClaimsSearch";
import GridAdvancedClaimsSearch from "./SearchComponents/GridAdvancedClaimsSearch";
import GridAdvancedPaSearch from "./SearchComponents/GridAdvancedPaSearch";
import GridAdvancedGrievenceSearch from "./SearchComponents/GridAdvancedGrievenceSearch";
import GridAdvancedAuthSearch from "./SearchComponents/GridAdvancedAuthSearch";
import GridAdvancedCommunicationSearch from "./SearchComponents/GridAdvancedCommunicationSearch";
import NewTestClaim from "../member/NewTestClaim";

interface Props {
  match: any;
  history: any;
}
interface State {
  type: String;
  data: any;
  columns: any;
  isLoaded: boolean;
  searchType: string;
  newTestClaimPopup: boolean,
  onColumnCellClick: any
}

export default class AdvancedSearch extends Component<Props, State> {
  state = {
    type: "",
    data: [],
    columns: [],
    isLoaded: false,
    searchType: "",
    newTestClaimPopup: false,
    onColumnCellClick: undefined,
  };
  componentDidMount() {
    this.intializeResults();
  }


  handleColumnCellClick = (data, key) => {
    if(key === "pharmacyName"){
      this.props.history.push("/pharmacy-profile")
    }
    else if(key === "memberName"){
      this.props.history.push("/")
    }
    else if(key === "prescriberName"){
      this.props.history.push("/prescriber")
    }
    else{
      console.log("key", key)
    }
  };

  intializeResults = (_type?: string) => {
    var type: string = _type ? _type : this.props.match.params.type;
    console.log("searching for ", type);
    var columns: any = [];
    var data: any = [];
    var title: string = "";
    var onColumnCellClick: any;
    switch (type) {
      case "member":
        {
          columns = AdvancedSearchMemberGridColumns;
          data = getAdvancedSearchMemberGridData;
          title = "Member";
          onColumnCellClick = this.handleColumnCellClick
        }
        break;
      case "pharmacy":
        {
          columns = AdvancedSearchPharmacyGridColumns;
          data = getAdvancedSearchPharmacyGridData;
          title = "Pharmacy";
          onColumnCellClick = this.handleColumnCellClick
        }
        break;
      case "prescriber":
        {
          columns = AdvancedSearchPrescriberGridColumns;
          data = getAdvancedSearchPrescriberGridData;
          title = "Prescriber";
          onColumnCellClick  = this.handleColumnCellClick
        }
        break;
      case "testclaims":
        {
          columns = _testClaimsGridColumns;
          data = getClaimsGridData;
          title = "Test Claims";
        }
        break;
      case "claims":
        {
          columns = _claimsGridColumns;
          data = getClaimsGridData;
          title = "Claims";
        }
        break;
      case "pacasesintial":
        {
          columns = AdvancedSearchPAInitialGridColumns;
          data = getAdvancedSearchPAInitialClaimsGridData;
          title = "PA";
        }
        break;
      case "pacasesappeals":
        {
          columns = AdvancedSearchPAppealGridColumns;
          data = getAdvancedSearchPAAppealClaimsGridData;
          title = "PA";
        }
        break;
      // case 'grievances': {
      //     columns = grievancesGridColumns
      //     data = getGrievancesGridData
      //     title = 'Grievance'
      // }
      //     break;
      case "authoverrides":
        {
          columns = authOveridesGridColumns;
          data = getAuthOverridesGridData;
          title = "Auth/Override";
        }
        break;
      case "communicationsother":
        {
          columns = AdvancedSearchOthersGridColumns;
          data = getAdvancedSearchOthersGridData;
          title = "Communications";
        }
        break;
      case "communicationscall":
        {
          columns = AdvancedSearchCallsGridColumns;
          data = getAdvancedSearchCallsGridData;
          title = "Communications";
        }
        break;
      case "communicationsdocument":
        {
          columns = AdvancedSearchDocumentsGridColumns;
          data = getAdvancedSearchCommunicationsGridData;
          title = "Communications";
        }
        break;
    }
    this.setState({
      type: title,
      searchType: type,
      data: data,
      columns: columns,
      isLoaded: true,
      onColumnCellClick: onColumnCellClick
    });
  };

  componentWillReceiveProps(newProps: any) {
    console.log(newProps);
    if (newProps.match.params && newProps.match.params.type && newProps.match.params.type !== this.props.match.params.type) {
      this.setState({
        isLoaded: false
      })
      setTimeout(()=>{
        this.intializeResults(newProps.match.params.type)
      },1000)
    }
  }
  componentDidUpdate(previousProps, previousState) {
    if (
      this.props.match &&
      this.props.match.params &&
      previousProps.match &&
      previousProps.match.params
    )
      if (previousProps.match.params.type && this.props.match.params.type) {
        if (previousProps.match.params.type !== this.props.match.params.type) {
          console.log("updating data and columns");
          this.intializeResults();
        }
      }
  }

  handleNewTestClaim = () => {
    this.setState({
      newTestClaimPopup: !this.state.newTestClaimPopup
    })
  }


  render() {
    return (
      <div className="advancedSearch-root">
        {this.state.isLoaded ? (
          <Container className="tab-content">
            <div className="claims-root">
              <TestClaimsGrid
                type="CLAIMS"
                header={(callBack: any) => {
                  return (
                    <div className="claimsbuttongroup-root">
                      <div className="heading">
                        <h4>{this.state.type} Search Results</h4>
                        {this.state.type === "Member" ? (
                          <div className="header-action-btn">
                            <Button>+ New Member</Button>
                          </div>
                        ) : this.state.type === "Test Claims" ? (
                          <div className="header-action-btn">
                            <Button onClick={this.handleNewTestClaim}>+ New Test Claim</Button>
                            {this.state.newTestClaimPopup ? (
                            <NewTestClaim
                              isOpen={
                                this.state.newTestClaimPopup
                              }
                              onClose={this.handleNewTestClaim}
                              panelName=""
                              title="New Test Claim"
                            />
                          ) : null}
                          </div>
                        ) : this.state.type === "PA" ? (
                          <div className="header-action-btn">
                            <Button>+ New PA</Button>
                            <Button>+ Appeal</Button>
                          </div>
                        ) : this.state.type === "Grievance" ? (
                          <div className="header-action-btn">
                            <Button>+ New Grievance</Button>
                          </div>
                        ) : this.state.type === "Auth/Override" ? (
                          <div className="header-action-btn">
                            <Button>+ New Auth</Button>
                            <Button>+ New Override</Button>
                          </div>
                        ) : (
                                    ""
                                  )}
                      </div>
                      <div>
                        {this.state.type === "Member" ? (
                          <GridAdavncedMemberSearch />
                        ) : this.state.type === "Pharmacy" ? (
                          <GridAdvancedPharmacySearch />
                        ) : this.state.type === "Prescriber" ? (
                          <GridAdvancedPrescriberSearch />
                        ) : this.state.type === "Test Claims" ? (
                          <GridAdvancedTestClaimsSearch />
                        ) : this.state.type === "Claims" ? (
                          <GridAdvancedClaimsSearch />
                        ) : this.state.type === "PA" ? (
                          <GridAdvancedPaSearch
                            searchType={this.state.searchType}
                          />
                        ) : this.state.type === "Grievance" ? (
                          <GridAdvancedGrievenceSearch />
                        ) : this.state.type === "Auth/Override" ? (
                          <GridAdvancedAuthSearch />
                        ) : this.state.type === "Communications" ? (
                          <GridAdvancedCommunicationSearch
                            searchType={this.state.searchType}
                          />
                        ) : (
                                            ""
                                          )}
                      </div>
                    </div>
                  );
                }}
                columns={this.state.columns}
                data={this.state.data}
                hideSettings={false}
                searchOptions={() => {
                  return [];
                }}
                onColumnCellClick={this.state.onColumnCellClick}
                searchType={this.state.searchType}
              />
            </div>
          </Container>
        ) : (
            <FrxLoader />
          )}
      </div>
    );
  }
}
