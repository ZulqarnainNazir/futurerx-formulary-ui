import React from "react";
import { TabInfo } from "../../../../../models/tab.model";
import FrxTabs from "../../../../shared/FrxTabs/FrxTabs";
import DrugDetails from "./components/DrugDetails";
import Tier from "./components/Tier";
import PaData from "./components/PA/PaData";
import StepTherpayDetails from "./components/StepTherapyData";
import CategoryClass from "./components/CategoryClass";
import QL from "../QL/QL";
import { connect } from "react-redux";
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
    setAdvancedSearch: (a) => dispatch(setAdvancedSearch(a)),
  };
}

const mapStateToProps = (state) => {
  //console.log(state)
  return {
    editInfo: state?.application?.formulary?.edit_info,
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
  // componentDidMount() {
  //   if(this.props.edit_info) {
  //     for(let i=0; i<this.props.edit_info.length; i++) {
  //       if(this.props.edit_info[i]['id_edit'] === 68 && this.props.edit_info[i]['id_checked']) {
  //         // let ddtabs = tabs.filter(e => e.id === 6);
  //         // if(ddtabs.length > 0) {
  //         //   tabs.pop();
  //         // }
  //         this.setState({ showDrugDetails: false });
  //       }
  //     }
  //   }
  // }
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
        return <QL />;
      case 5:
        return <DrugDetails />;
    }
  };

  getTabs(list: TabInfo[]): TabInfo[] {
    console.log(" --------------------------------: ", this.props?.editInfo);
    let isPA: boolean = false;
    let isST: boolean = false;
    let isQL: boolean = false;
    let isNA: boolean = false;

    if (this.props?.editInfo) {
      this.props?.editInfo.forEach((e) => {
        console.log(e);
        if (e && e.id_edit) {
          if (e.id_edit === 68) {
            isNA = true;
          } else if (e.id_edit === 58) {
            isPA = true;
          } else if (e.id_edit === 59) {
            isQL = true;
          } else if (e.id_edit === 60) {
            isST = true;
          }
        }
      });
    }
    console.log(
        " isPA : " +
        isPA +
        " isST : " +
        isST +
        " isQL : " +
        isQL +
        " isNA : " +
        isNA 

    );

    list.forEach((t) => {
      if (t && t.text === "PA") {
        t.disable = isPA ? false : true;
      } else if (t && t.text === "ST") {
        t.disable = isST ? false : true;
      } else if (t && t.text === "QL") {
        t.disable = isQL ? false : true;
      } else if (t && t.text === "DRUG DETAILS") {
        t.disable = isNA ? true : false;
      }
    });
    return list;
  }

  render() {
    return (
      <div className="bordered">
        <FrxTabs
          tabList={this.getTabs(this.state.tabs)}
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
