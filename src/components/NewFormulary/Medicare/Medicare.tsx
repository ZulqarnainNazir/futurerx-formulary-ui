import React from "react";
import {TabInfo} from "../../../models/tab.model";
import FrxMiniTabs from "../../shared/FrxMiniTabs/FrxMiniTabs";
import {formularyDetailsGridColumns} from "../../../utils/grid/columns";
import {getFormularyDetails} from "../../../mocks/formulary/formularyDetails";
import FrxGridContainer from "../../shared/FrxGrid/FrxDrugGridContainer";
import FormularyExpandedDetails from "../../FormularyExpandedDetails/FormularyExpandedDetails";
import Alternatives from "../Alternatives/Alternatives";
import MaintenanceMassUpdate from "../MassMaintenance/MaintenanceMassUpdate/MaintenanceMassUpdate";
interface State {
  miniTabs: Array<TabInfo>;
  activeMiniTabIndex: number;
}

const miniTabs = [
  {id: 1, text: "Formulary"},
  {id: 2, text: "Mass Maintenance"},
  {id: 3, text: "Alternatives"},
  {id: 4, text: "Decision Tree"},
  {id: 5, text: "Group Description Management"},
];

export default class Medicare extends React.Component<any, any> {
  state = {
    miniTabs: miniTabs,
    activeMiniTabIndex: 0,
  };
  onClickMiniTab = (selectedTabIndex: number) => {
    let activeMiniTabIndex = 0;

    const tabs = this.state.miniTabs.map((tab: TabInfo, index: number) => {
      if (index === selectedTabIndex) {
        activeMiniTabIndex = index;
      }
      return tab;
    });
    this.setState({tabs, activeMiniTabIndex});
  };
  renderActiveMiniTabContent = () => {
    const miniTabIndex = this.state.activeMiniTabIndex;
    switch (miniTabIndex) {
      case 0:
        return (
          <div>
            <FrxGridContainer
              enableSearch={false}
              enableColumnDrag
              onSearch={() => {}}
              fixedColumnKeys={["claimId"]}
              pagintionPosition="topRight"
              gridName="CLAIMS"
              enableSettings
              columns={formularyDetailsGridColumns()}
              scroll={{x: 3800, y: 377}}
              isFetchingData={false}
              enableResizingOfColumns
              data={getFormularyDetails()}
              expandable={{
                isExpandable: true,
                expandedRowRender: (props) => <FormularyExpandedDetails />,
              }}
            />
            <div
              className="drug-detail"
              onClick={() => this.props.drugDetailClick()}
            >
              Drug Details
            </div>
          </div>
        );
      case 1:
        return (
          <div>
            <MaintenanceMassUpdate onClickAddNew={this.props.onMassMaintenanceCLick}/>
            {/* <div onClick={this.props.onMassMaintenanceCLick}>
              Mass Maintenance
            </div> */}
          </div>
        );
      case 2:
        return <Alternatives />;
      case 3:
        return <div>Decision Tree</div>;
      case 4:
        return <div>Group Description Management</div>;
    }
  };
  render() {
    return (
      <>
        <FrxMiniTabs
          tabList={this.props.tabs ? this.props.tabs : this.state.miniTabs}
          activeTabIndex={this.state.activeMiniTabIndex}
          onClickTab={this.onClickMiniTab}
        />
        <div className="formulary-mini-tabs-info">
          {this.renderActiveMiniTabContent()}
        </div>
      </>
    );
  }
}
