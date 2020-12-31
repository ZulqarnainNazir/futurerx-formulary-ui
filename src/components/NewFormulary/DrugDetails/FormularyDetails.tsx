import React from "react";
import { TabInfo } from "../../../models/tab.model";
import FrxTabs from "../../shared/FrxTabs/FrxTabs";
import FormularyDetailsTop from "./components/FormularyDetailsTop/FormularyDetailsTop";
import FormularyConfigure from "./components/FormularyConfigure/FormularyConfigure";
import CompareView from "./components/CompareView/CompareView";
import "./FormularyDetails.scss";
import FormularySetUp from "./components/FormularySetUp/FormularySetUp";
import Validation from "../../Validation/Validation";
import { connect } from "react-redux";
import { setAdvancedSearch } from "../../../redux/slices/formulary/advancedSearch/advancedSearchSlice";
import { setLocation } from "../../../redux/slices/formulary/application/applicationSlice";

const tabs = [
  { id: 1, text: "Setup" },
  { id: 2, text: "Configure" },
  { id: 3, text: "Compare/View" },
  { id: 4, text: "Validation" },
  { id: 5, text: "Complete" },
  { id: 6, text: "Bazaar" },
];

function mapDispatchToProps(dispatch) {
  return {
    setAdvancedSearch: (a) => dispatch(setAdvancedSearch(a)),
    setLocation: (a) => dispatch(setLocation(a)),
  };
}

const mapStateToProps = (state) => {
  //console.log(state)
  return {
    current_formulary: state.application.formulary,
    setupComplete: state.application.setupComplete,
    location: state.application.location,
  };
};

class FormularyDetails extends React.Component<any, any> {
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
    let payload = {
      advancedSearchBody: {},
      populateGrid: false,
      closeDialog: false,
      listItemStatus: {},
    };
    this.props.setAdvancedSearch(payload);
    this.setState({ tabs, activeTabIndex });
    this.props.setLocation(activeTabIndex);
  };

  componentDidMount() {
    // console.log("====== Reeta's code ========")
    // console.log(this.props)
    // console.log("====== Reeta's code ========")
  }

  renderActiveTabContent = () => {
    const tabIndex = this.props.location;
    switch (tabIndex) {
      case 0:
        return <FormularySetUp saveAndContinue={this.onClickTab} />;
      case 1:
        return <FormularyConfigure />;
      case 2:
        return (
          <div>
            <CompareView />
          </div>
        );
      case 3:
        return (
          <div>
            <Validation />
          </div>
        );
      case 4:
        return <div>Complete</div>;
      case 5:
        return <div>Bazaar</div>;
    }
  };

  getTabs(list: TabInfo[]): TabInfo[] {
    // console.log(" ^^^^^^^^^^^^^^: " + this.props?.setupComplete)
    list.forEach((t) => {
      if (t && t?.text === "Configure") {
        if (this.props?.setupComplete === true) {
          t.disable = false;
        } else {
          t.disable = true;
        }
      }
    });

    return list;
  }

  render() {
    // console.log("=============",this.props)
    const fData = this.props.data;
    return (
      <>
        <FormularyDetailsTop activeTabIndex={this.props.location} />
        <div className="drug-details-bottom">
          <FrxTabs
            tabList={this.getTabs(this.state.tabs)}
            typeCard={"line"}
            activeTabIndex={this.props.location}
            onClickTab={this.onClickTab}
          />
          <div className="inner-container">{this.renderActiveTabContent()}</div>
        </div>
      </>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(FormularyDetails);
