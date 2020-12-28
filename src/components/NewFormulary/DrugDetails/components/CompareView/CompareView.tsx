import React from "react";
import { TabInfo } from "../../../../../models/tab.model";
import FrxTabs from "../../../../shared/FrxTabs/FrxTabs";
import CompareFormularies from "./components/CompareFormularies";
import CompareTable from "./components/CompareAndViewTable/CompareTable";
import ViewTable from "./components/CompareAndViewTable/ViewTable";
// import ViewFormularies from "./components/ViewFormularies";
import { ReactComponent as DownloadIcon } from "../../../../../assets/icons/DownloadIcon.svg";
import "./CompareView.scss";
import ViewFormularies from "./components/ViewFormularies";
import showMessage from "../../../Utils/Toast";
import { ToastContainer } from 'react-toastify';

const tabs = [
  { id: 1, text: "COMPARE FORMUARIES" },
  { id: 2, text: "VIEW FORMULARIES" },
  { id: 3, text: "HPMS SUMMMARY" },
];

interface configureState {
  tabs: Array<TabInfo>;
  activeTabIndex: number;
  isCompareClicked: boolean;
  isViewClicked: boolean;
  baseformulary: any;
  referenceformulary: any;
}
interface configureProps { }

export default class CompareView extends React.Component<
  configureProps,
  configureState
  > {
  state = {
    tabs: tabs,
    activeTabIndex: 0,
    isCompareClicked: false,
    isViewClicked: false,
    baseformulary: {},
    referenceformulary: {},
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

  handleCompareBtn = (baseFormulary, referenceFromulary) => {
    if (baseFormulary && referenceFromulary && baseFormulary['id_formulary'] && referenceFromulary['id_formulary']) {
      this.setState({
        isCompareClicked: !this.state.isCompareClicked,
        baseformulary: baseFormulary,
        referenceformulary: referenceFromulary,
      });
    } else {
      showMessage('Choose formularies to compare', 'error');
    }
  };

  handleViewBtn = () => {
    this.setState({
      isViewClicked: !this.state.isViewClicked,
    });
  };
  renderActiveTabContent = () => {
    const tabIndex = this.state.activeTabIndex;
    switch (tabIndex) {
      case 0:
        return <CompareFormularies handleCompareBtn={this.handleCompareBtn} />;
      case 1:
        return <ViewFormularies handleViewBtn={this.handleViewBtn} />;
      case 2:
        return <div>HPMS SUMMARY</div>;
      default:
        return null;
    }
  };
  render() {
    const { activeTabIndex, isCompareClicked, isViewClicked } = this.state;
    return (
      <>
        <div className="bordered">
          <FrxTabs
            tabList={this.state.tabs}
            activeTabIndex={activeTabIndex}
            onClickTab={this.onClickTab}
          />

          <div className="inner-container white-bg">
            {this.renderActiveTabContent()}
          </div>
        </div>
        {activeTabIndex === 0 && isCompareClicked ? (
          <div className="bordered m-t-10 compare-table-root">
            <div className="header white-bg flex-container">
              <label>comparison of formularies</label>
              <DownloadIcon />
            </div>
            <div className="inner-container white-bg p-10">
              <CompareTable baseformulary={Object.assign({},this.state.baseformulary)} referenceformulary={Object.assign({},this.state.referenceformulary)}/>
            </div>
          </div>
        ) : null}
        {activeTabIndex === 1 && isViewClicked ? (
          <div className="bordered m-t-10 compare-table-root">
            <div className="header white-bg flex-container">
              <label>summary of rxcui count</label>
            </div>
            <div className="inner-container white-bg p-10">
              <ViewTable />
            </div>
          </div>
        ) : null}
        <ToastContainer />
      </>
    );
  }
}
