import React from "react";
import { TabInfo } from "../../../../../models/tab.model";
import FrxTabs from "../../../../shared/FrxTabs/FrxTabs";
import DrugDetails from "./components/DrugDetails";
import Tier from "./components/Tier";
import PaData from './components/PA/PaData';
import StepTherpayDetails from "./components/StepTherapyData";
import CategoryClass from "./components/CategoryClass";
import QL from '../QL/QL';
import {connect} from 'react-redux';
import { setAdvancedSearch } from "../../../../../redux/slices/formulary/advancedSearch/advancedSearchSlice";

const tabs = [
  { id: 1, text: "TIER" },
  { id: 2, text: "CATEGORY/CLASS" },
  { id: 3, text: "PA" },
  { id: 4, text: "ST" },
  { id: 5, text: "QL" },
  { id: 6, text: "DRUG DETAILS" },
];

function mapDispatchToProps(dispatch) {
  return {
    setAdvancedSearch: (a) => dispatch(setAdvancedSearch(a))
  };
}

const mapStateToProps = (state) => {
  //console.log(state)
  return{
    current_formulary: state?.application?.formulary
  }
}

interface configureState {
  tabs: Array<TabInfo>;
  activeTabIndex: number;
}
interface configureProps {
  setAdvancedSearch : (a) => void;
}

class FormularyConfigure extends React.Component<
  configureProps,
  configureState
> {
  state = {
    tabs: tabs,
    activeTabIndex: 0,
  };
  onClickTab = (selectedTabIndex: number) => {
    let activeTabIndex = 0;

    const tabs = this.state.tabs.map((tab: TabInfo, index: number) => {
      if (index === selectedTabIndex) {
        activeTabIndex = index;
      }
      return tab;
    });
    let payload = { advancedSearchBody: {}, populateGrid: false, closeDialog: false, listItemStatus: {} };
    this.props.setAdvancedSearch(payload);
    this.setState({ tabs, activeTabIndex });
  };
  renderActiveTabContent = () => {
    const tabIndex = this.state.activeTabIndex;
    switch (tabIndex) {
      case 0:
        return (
          <div>
            <Tier />
          </div>
        );
      case 1:
        return (
          <div>
            <CategoryClass />
          </div>
        );
      case 2:
        return <PaData />;
      case 3:
        return (
          <div>
            <StepTherpayDetails />
          </div>
        );
      case 4:
        return <QL />
      case 5:
        return <DrugDetails />;
    }
  };
  render() {
    return (
      <div className="bordered">
        <FrxTabs
          tabList={this.state.tabs}
          activeTabIndex={this.state.activeTabIndex}
          onClickTab={this.onClickTab}
        />
        <div className="inner-container white-bg">
          {this.renderActiveTabContent()}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(FormularyConfigure);