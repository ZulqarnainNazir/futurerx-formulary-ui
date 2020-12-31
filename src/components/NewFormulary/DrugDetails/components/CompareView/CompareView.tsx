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
import { saveAs } from 'file-saver';
import { exportReport } from "../../../../../redux/slices/formulary/compareView/compareViewService";
import * as commonConstants from "../../../../../api/http-commons";
import uuid from "react-uuid";

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
    exportSections: Array(),
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

  handleViewBtn = (baseFormulary) => {
    if (baseFormulary && baseFormulary['id_formulary']) {
      this.setState({
        isViewClicked: !this.state.isViewClicked,
        baseformulary: baseFormulary,
      });
    } else {
      showMessage('Choose formulary to view', 'error');
    }
  };

  sectionSelected = (sectionName, checked) => {
    console.log('Section selection:'+sectionName+' '+checked);
    if (checked) {
      if (!this.state.exportSections.includes(sectionName))
        this.state.exportSections.push(sectionName);
    } else {
      this.state.exportSections = this.state.exportSections.filter(section => section !== sectionName);
    }
  }

  handeReportDownload = async (type) => {
    let param = type === 'summary' ? 'COMPAREEXC' : 'COMPAREEXCDET';
    let apiDetails = {};
    apiDetails["apiPart"] = commonConstants.COMPARE_FORMULARY_EXPORT_EXCEL;
    apiDetails["pathParams"] =
      this.state.baseformulary["id_formulary"] + 
      "/" +
      this.state.referenceformulary["id_formulary"] + "/" + param;

    apiDetails['messageBody'] = { selected_sections: this.state.exportSections };
    try {
      const data = await exportReport(apiDetails);
      if (data) {
        const file = new Blob([data], { type: 'application/vnd.ms.excel' });
        saveAs(file, 'User_Export_' + uuid() + '.xlsx');
      } else {
        showMessage("Error while exporting", "error");
      }
    } catch (err) {
      console.log(err);
      showMessage("Error while exporting", "error");
    }
  }

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
              <label>Summary</label>
              <DownloadIcon onClick={() => {this.handeReportDownload('summary')}} style={{marginLeft: 5}}/>
              <label style={{marginLeft: 10}}>Details</label>
              <DownloadIcon onClick={() => {this.handeReportDownload('detials')}} style={{marginLeft: 5}}/>
            </div>
            <div className="inner-container white-bg p-10">
              <CompareTable baseformulary={Object.assign({}, this.state.baseformulary)} referenceformulary={Object.assign({}, this.state.referenceformulary)} sectionSelected={this.sectionSelected}/>
            </div>
          </div>
        ) : null}
        {activeTabIndex === 1 && isViewClicked ? (
          <div className="bordered m-t-10 compare-table-root">
            <div className="header white-bg flex-container">
              <label>summary of rxcui count</label>
            </div>
            <div className="inner-container white-bg p-10">
              <ViewTable baseformulary={Object.assign({}, this.state.baseformulary)} />
            </div>
          </div>
        ) : null}
        <ToastContainer />
      </>
    );
  }
}
