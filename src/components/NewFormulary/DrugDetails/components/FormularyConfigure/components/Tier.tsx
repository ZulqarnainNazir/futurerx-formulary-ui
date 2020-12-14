import React from "react";
import { connect } from "react-redux";

import { Grid } from "@material-ui/core";
import FrxMiniTabs from "../../../../../shared/FrxMiniTabs/FrxMiniTabs";
import "./Tier.scss";
import {
  getTapList,
  getMiniTabs,
} from "../../../../../../mocks/formulary/mock-data";
import CustomizedSwitches from "./CustomizedSwitches";
import PanelHeader from "./PanelHeader";
import PanelGrid from "./panelGrid";
import DropDown from "../../../../../shared/Frx-components/dropdown/DropDown";
import getLobCode from "../../../../Utils/LobUtils";
import Button from "../../../../../shared/Frx-components/button/Button";
import Box from "@material-ui/core/Box";
import FrxGridContainer from "../../../../../shared/FrxGrid/FrxGridContainer";
import { tierColumns } from "../../../../../../utils/grid/columns";
import { TierMockData } from "../../../../../../mocks/TierMock";
import {tierDefinationColumns} from './TierDefinationGridColumn';
import {getTierDefinationData} from '../../../../../../mocks/formulary/tierDefinationMock';
import { TabInfo } from "../../../../../../models/tab.model";
import TierReplace from "./TierReplace";
import TierRemove from "./TierRemove";
import { getTier,getTierLabels } from "../../../../../../redux/slices/formulary/tier/tierActionCreation";
//import { getFormularySetup } from "../../../../../../redux/slices/formulary/formularySummaryActionCreation";
import { GridMenu } from "../../../../../../models/grid.model";

import * as tierConstants from "../../../../../../api/http-tier";

function mapDispatchToProps(dispatch) {
  return {
    getTier:(a)=>dispatch(getTier(a)),
    getTierLabels:(a)=>dispatch(getTierLabels(a)),
    //getFormularySetup:(a)=>dispatch(getFormularySetup(a))
  };
}

const mapStateToProps = (state) => {
  return {
    formulary_id: state?.application?.formulary_id,
    formulary: state?.application?.formulary,
    formulary_lob_id: state?.application?.formulary_lob_id,
    formulary_type_id: state?.application?.formulary_type_id,
    tierData: state.tierSliceReducer.data,
  };
};


interface tabsState {
  activeMiniTabIndex: number;
  miniTabs: any;
  tabs: any;
  tierGridContainer: boolean;
  activeTabIndex: any;
  tierDefinationColumns: any;
  tierDefinationData: any;
  columns: any;
  data: any;
  openPopup: boolean;
  tierOption:any[];
}

class Tier extends React.Component<any, tabsState> {
  state = {
    tierGridContainer: false,
    miniTabs: getMiniTabs(),
    isFetchingData: false,
    activeMiniTabIndex: 0,
    activeTabIndex: 0,
    columns: [],
    data: [],
    lobCode: "",
    tierOption:[],
    tierData:[],
    tierDefinationColumns: [],
    tierDefinationData: [],
    openPopup: false,
    tabs: [
      { id: 1, text: "Replace" },
      { id: 2, text: "Append" },
      { id: 3, text: "Remove" },
    ]
  };

  populateTierDetails = (TierColumns) => {
    let apiDetails = {};
    apiDetails['apiPart'] = tierConstants.FORMULARY_TIERS;
    apiDetails['pathParams'] = this.props?.formulary_id;
    apiDetails['keyVals'] = [{key: tierConstants.KEY_ENTITY_ID, value: this.props?.formulary_id}];

    const TierDefinationData = this.props.getTier(apiDetails).then((json => {
      //debugger;
      let tmpData = json.payload.data;
      var tierOption:any[] = [];
      var result = tmpData.map(function(el) {
        var element = Object.assign({}, el);
        tierOption.push(element)
        element.is_validated = "false";
        if(element.added_count>0){
          element.is_validated = "true";
        }
        return element;
      })
      this.setState({
        tierDefinationColumns: TierColumns,
        tierDefinationData: result,
        tierOption: tierOption
      })
    }))
  }

  componentWillReceiveProps(nextProps) {
    console.log('TIER: componentWillReceiveProps', nextProps);
    const TierColumns = tierDefinationColumns();
    let tmpData = nextProps.tierData;
    var tierOption:any[] = [];
    var result = tmpData.map(function(el) {
      var element = Object.assign({}, el);
      tierOption.push(element)
      element.is_validated = "false";
      if(element.added_count>0){
        element.is_validated = "true";
      }
      return element;
    })
    this.setState({
      tierDefinationColumns: TierColumns,
      tierDefinationData: result,
      tierOption: tierOption
    })
  }

  componentDidMount() {
    const TierColumns = tierDefinationColumns();
    if(this.props.formulary_id){
      this.populateTierDetails(TierColumns);
      this.state.lobCode = getLobCode(this.props.formulary_lob_id);
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
    this.setState({ tabs, activeTabIndex });
  };

  renderTabContent = () => {
    const activeTabIndex = this.state.activeTabIndex;
    console.log("Active tab index is:"+this.state.activeTabIndex);
    switch (activeTabIndex) {
      case 0:
        return <TierReplace tierOptions={this.state.tierOption} formularyId={this.props?.formulary_id} formulary={this.props?.formulary} lobCode={this.state.lobCode}/>;
      case 1:
        return <div>Append</div>;
      case 2:
        return <TierRemove formularyId={this.props?.formulary_id} formulary={this.props?.formulary} lobCode={this.state.lobCode}/>;
    }
  };

  onClickMiniTab = (num: number) => {
    this.setState({
      activeMiniTabIndex: num,
    });
  };

  openTierGridContainer = () => {
    this.setState({ tierGridContainer: true });
  };

  handleSearch = () => {
    console.log("work")
  }
  settingsTriDotClick = (data: any) => {
    console.log("tri dot clicked ", data);
  };
  settingsTriDotMenuClick = (menuItem: GridMenu) => {
    if (menuItem.title === "Modify Auth or Override") {
      this.setState({
        openPopup: true,
      });
    }
    if (this.props.settingsTriDotMenuClick) {
      console.log("tridot menu clicked", menuItem);
    }
  };
  onNewDefinationAddHandler = () => {
    console.log('add new click')
  }
  render() {
    const tierDefinationColumns = this.state.tierDefinationColumns;
    const tierDefinationData = this.state.tierDefinationData;
    return (
      <div className="drug-detail-LA-root">
        <div className="drug-detail-la-container">
          <div className="drug-detail-la-inner">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <div className="mb-10">
                  <div className="limited-access">
                    <PanelHeader
                      title="Tier Definition"
                      tooltip="This section allows for Addition or Removal of product only. To define coverage for all Medicare covered and/or Supplemental products, go to Drug Details"
                    />
                    <div className="inner-container tier-defination-grid white-bg">
                      <FrxGridContainer
                        enableSearch={false}
                        enableColumnDrag={false}
                        onSearch={() => {}}
                        fixedColumnKeys={[]}
                        pagintionPosition="topRight"
                        gridName="TIERDEFINATIONGRID"
                        enableSettings
                        isFetchingData={false}
                        columns={tierDefinationColumns}
                        settingsTriDotClick={this.settingsTriDotClick}
                        settingsTriDotMenuClick={this.settingsTriDotMenuClick}
                        isPinningEnabled={false}
                        onSettingsClick="grid-menu"
                        scroll={{y: 377 }}
                        enableResizingOfColumns
                        hideClearFilter
                        hideMultiSort
                        hideItemsPerPage
                        hidePageJumper
                        hidePagination
                        hideResults
                        data={tierDefinationData}
                      />
                      <Box display="flex" justifyContent="flex-end">
                        <Button 
                          label="add new"
                          icon=""
                          className="add-new-defination" 
                          onClick={this.onNewDefinationAddHandler} />
                      </Box>
                    </div>
                    
                  </div>
                </div>
                <div className="mb-10">
                  <div className="limited-access">
                    <PanelHeader title="Tier Definition Settings" />
                    <div className="modify-wrapper white-bg tier-modify-panel">
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
                      </div>
                    </div>
                    <div className="tab-content">{this.renderTabContent()}</div>
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tier);

