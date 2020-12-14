import React from "react";
import { TabInfo } from "../../../models/tab.model";
import FrxTabs from "../../shared/FrxTabs/FrxTabs";
import FormularyDetailsTop from "./components/FormularyDetailsTop/FormularyDetailsTop";
import FormularyConfigure from "./components/FormularyConfigure/FormularyConfigure";
import CompareView from "./components/CompareView/CompareView";
import "./FormularyDetails.scss";
import FormularySetUp from "./components/FormularySetUp/FormularySetUp";
import Validation from "../../Validation/Validation";
import {connect} from 'react-redux';

const tabs = [
  { id: 1, text: "Setup" },
  { id: 2, text: "Configure" },
  { id: 3, text: "Compare/View" },
  { id: 4, text: "Validation" },
  { id: 5, text: "Complete" },
  { id: 6, text: "Bazaar" },
];

const mapStateToProps = (state) => {
  //console.log(state)
  return{
    current_formulary: state.application.formulary
  }
}

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
    this.setState({ tabs, activeTabIndex });
  };

  componentDidMount(){
    // console.log("====== Reeta's code ========")
    // console.log(this.props)
    // console.log("====== Reeta's code ========")
  }

  renderActiveTabContent = () => {
    const tabIndex = this.state.activeTabIndex;
    switch (tabIndex) {
      case 0:
        return <FormularySetUp />;
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

  render() {
    // console.log("=============",this.props)
    console.log('THe Active Tab Index = ', this.state.activeTabIndex)
    const fData = this.props.data;
    return (
      <>
        <FormularyDetailsTop activeTabIndex={this.state.activeTabIndex} />
        <div className="drug-details-bottom">
          <FrxTabs
            tabList={this.state.tabs}
            typeCard={"line"}
            activeTabIndex={this.state.activeTabIndex}
            onClickTab={this.onClickTab}
          />
          <div className="inner-container">{this.renderActiveTabContent()}</div>
        </div>
      </>
    );
  }
}
export default connect(mapStateToProps)(FormularyDetails);