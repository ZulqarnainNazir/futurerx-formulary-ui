import React from "react";
import { TabInfo } from "../../../../../models/tab.model";
import FrxTabs from "../../../../shared/FrxTabs/FrxTabs";
import DrugDetails from "./components/DrugDetails";
import Tier from "./components/Tier";
import PaData from "./components/PA/PaData";
import StepTherpayDetails from "./components/StepTherapyData";
import CategoryClass from "./components/CategoryClass";
import QL from "../QL/QL";
import Assembly from "./components/Assembly";
import { connect } from "react-redux";
import { setAdvancedSearch } from "../../../../../redux/slices/formulary/advancedSearch/advancedSearchSlice";

const tabs = [
  { id: 1, text: "ASSEMBLY" },
  { id: 2, text: "TIER" },
  { id: 3, text: "CATEGORY/CLASS" },
  { id: 4, text: "PA" },
  { id: 5, text: "ST" },
  { id: 6, text: "QL" },
  { id: 7, text: "OTHER UM EDITS" },
];

function mapDispatchToProps(dispatch) {
  return {
    setAdvancedSearch: (a) => dispatch(setAdvancedSearch(a)),
  };
}

const mapStateToProps = (state) => {
  //console.log(state)
  return {
    current_formulary: state?.application?.formulary,
    edit_info: state?.application?.formulary?.edit_info,
  };
};

interface configureState {
  tabs: Array<TabInfo>;
  activeTabIndex: number;
}
interface configureProps {
  setAdvancedSearch: (a) => void;
  edit_info: any[];
  showDrugDetails: boolean;
}

class FormularyConfigure extends React.Component<any, any> {
  state = {
    tabs: tabs,
    activeTabIndex: 0,
    showDrugDetails: true,
  };
  componentDidMount() {
    if (this.props.edit_info) {
      for (let i = 0; i < this.props.edit_info.length; i++) {
        if (
          this.props.edit_info[i]["id_edit"] === 68 &&
          this.props.edit_info[i]["id_checked"]
        ) {
          // let ddtabs = tabs.filter(e => e.id === 6);
          // if(ddtabs.length > 0) {
          //   tabs.pop();
          // }
          this.setState({ showDrugDetails: false });
        }
      }
    }
  }
  onClickTab = (selectedTabIndex: number) => {
    let activeTabIndex = 0;

    const tabs = this.state.tabs.map((tab: TabInfo, index: number) => {
      if (index === selectedTabIndex) {
        activeTabIndex = index;
      }
      return tab;
    });
    let payload = {
      advancedSearchBody: {},
      populateGrid: false,
      closeDialog: false,
      listItemStatus: {},
    };
    this.props.setAdvancedSearch(payload);
    this.setState({ tabs, activeTabIndex });
  };
  renderActiveTabContent = () => {
    const tabIndex = this.state.activeTabIndex;
    switch (tabIndex) {
      case 0:
        return <Assembly />;
      case 1:
        return <Tier />;
      case 2:
        return <CategoryClass />;
      case 3:
        return <PaData />;
      case 4:
        return <StepTherpayDetails />;
      case 5:
        return <QL />;
      case 6:
        return this.state.showDrugDetails ? <DrugDetails /> : null;
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

export default connect(mapStateToProps, mapDispatchToProps)(FormularyConfigure);
