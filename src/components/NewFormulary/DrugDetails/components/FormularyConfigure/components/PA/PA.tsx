import React, { useState } from "react";

import PanelHeader from "../PanelHeader";
import PanelGrid from "../panelGrid";
import { connect } from "react-redux";

import CustomizedSwitches from "../CustomizedSwitches";
import FrxMiniTabs from "../../../../../../shared/FrxMiniTabs/FrxMiniTabs";
import {
  getTapList,
  getMiniTabs,
} from "../../../../../../../mocks/formulary/mock-data";
import DropDown from "../../../../../../shared/Frx-components/dropdown/DropDown";
import { Grid } from "@material-ui/core";
import { Row, Col, Space } from "antd";
import RadioButton from "../../../../../../shared/Frx-components/radio-button/RadioButton";
import Button from "../../../../../../shared/Frx-components/button/Button";
import { TabInfo } from "../../../../../../../models/tab.model";
import PaReplace from "./PaReplace";
import PaRemove from "./PaRemove";
import { getPaSummary,getPaGrouptDescriptions, getPaTypes, getDrugLists } from "../../../../../../../redux/slices/formulary/pa/paActionCreation";
import "../Tier.scss";
import "./PA.scss";

function mapDispatchToProps(dispatch) {
  return {
    getPaSummary:(a)=>dispatch(getPaSummary(a)),
    getPaGrouptDescriptions:(a)=>dispatch(getPaGrouptDescriptions(a)),
    getPaTypes:(a)=>dispatch(getPaTypes(a)),
    getDrugLists:(a)=>dispatch(getDrugLists(a)),
  };
}



class PA extends React.Component<any, any>  {
  state = {
    tierGridContainer: false,
    miniTabs: getMiniTabs(),
    isFetchingData: false,
    activeMiniTabIndex: 0,
    activeTabIndex: 0,
    tabs: [
      { id: 1, text: "Replace" },
      { id: 2, text: "Append" },
      { id: 3, text: "Remove" },
    ],
    panelGridTitle: [
      "Type",
      "Number Of Groups",
      "Added Groups",
      "Removed Groups",
      "NUMBER OF Drugs",
      "Added Drugs",
      "Removed Drugs",
    ],
    panelGridValue: [
     
    ],
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

  renderTabContent = () => {
    const activeTabIndex = this.state.activeTabIndex;
    switch (activeTabIndex) {
      case 0:
        return <PaReplace />;
      case 1:
        return <div>Append</div>;
      case 2:
        return <PaRemove />;
    }
  };

  componentDidMount() {
    
    const TierDefinationData = this.props.getPaSummary("3132").then((json => {
      debugger;
      let tmpData = json.payload.result;
      var rows = tmpData.map(function(el) {
        var curRow=[ el["pa_type_name"],
        el["total_group_description_count"],
        el["added_group_description_count"],
        el["removed_group_description_count"],
        el["total_drug_count"],
        el["added_drug_count"],
        el["removed_drug_count"]
      ]
        return curRow;
      })
      
      console.log(rows);
      this.setState({
        panelGridValue: rows,
      })
    }))
    

   
  }
  render() {
    return (
      <>
        <div className="drug-detail-LA-root">
          <div className="drug-detail-la-container">
            <div className="drug-detail-la-inner">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <div className="mb-10">
                    <div className="limited-access">
                      <PanelHeader title="Prior Authorization - DRUG SELECTION" />
                      <div className="inner-container">
                        <PanelGrid
                          panelGridTitle={this.state.panelGridTitle}
                          panelGridValue={this.state.panelGridValue}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="limited-access">
                    <PanelHeader title="Prior Authorization Settings" />
                    <div className="modify-wrapper white-bg">
                      <div className="modify-panel">
                        <div className="icon">
                          <span>R</span>
                        </div>
                        <div className="switch-box">
                          <CustomizedSwitches
                            leftTitle="Modify"
                            rightTitle="view all"
                          />
                        </div>
                        <div className="mini-tabs">
                          <FrxMiniTabs
                            tabList={this.state.tabs}
                            activeTabIndex={this.state.activeTabIndex}
                            onClickTab={this.onClickTab}
                          />
                        </div>
                        <div>
                          <div className="PA-list">
                            <span>LIST</span>
                            <DropDown options={[1, 2, 3]} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="pa-tab-content">
                      {this.renderTabContent()}
                    </div>
                  </div>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      </>
    );
  }
}


export default connect(
  null,
  mapDispatchToProps
)(PA);


