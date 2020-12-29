import React, { Component } from "react";
import { connect } from "react-redux";
import PosSettings from "../../../DrugDetails/components/POS/PosSettings";

import { setAdditionalCriteria } from "../../../../../redux/slices/formulary/advancedSearch/additionalCriteriaSlice";

import { getDrugDetailsPOSSettings } from "../../../../../redux/slices/formulary/drugDetails/pos/posActionCreation";
import { getDrugDetailsPRSettings } from "../../../../../redux/slices/formulary/drugDetails/pr/prActionCreation";
import {
  POS_SETTINGS_LIST,
  PR_SETTINGS_LIST,
} from "../../../../../api/http-commons";
import POSCriteria from "../CriteriaComponents/POSCriteria";

function mapDispatchToProps(dispatch) {
  return {
    getPOSSettings: (a) => dispatch(getDrugDetailsPOSSettings(a)),
    getPRSettings: (a) => dispatch(getDrugDetailsPRSettings(a)),
    setAdditionalCriteria: (a) => dispatch(setAdditionalCriteria(a)),
  };
}

const mapStateToProps = (state) => {
  return {
    additionalCriteriaBody: state?.additionalCriteria?.additionalCriteriaBody,
    populateGrid: state?.additionalCriteria?.populateGrid,
    closeDialog: state?.additionalCriteria?.closeDialog,
    listItemStatus: state?.additionalCriteria?.listItemStatus,
  };
};

interface Props {
  title: string;
  nodeId: any;
  listItemStatus: any;
  onParentDataUpdated: (nodeId, isIncluded) => void;
}
class ListItem extends Component<any, any> {
  state = {
    nodeId: null,
    posSettings: [],
    prSettings: [],
    posSettingsStatus: {
      type: "covered",
      covered: true,
    },
    prSettingsStatus: {
      type: "covered",
      covered: true,
    },
    isSelectAllPOS: false,
    isSelectAllPR: false,
  };

  componentDidMount() {
    this.setState({
      nodeId: this.props.nodeId,
    });

    this.initializePOSSettingsListApi();
    this.initializePRSettingsListApi();

    this.initializeParentData();
    // this.loadSavedState();
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      nodeId,
      initialGlobalState,
      card: { cardName, cardCode, isIncluded },
    } = this.props;
    let currentNode = {};
    if (nodeId) {
      // currentNode = initialGlobalState.filter(
      //   (criteria) => criteria.nodeId === nodeId
      // );
      currentNode = initialGlobalState[nodeId];
      currentNode = {
        nodeId: nodeId,
        card: { cardName, cardCode, isIncluded },
        posSettings: this.state.posSettings,
        posStatus: this.state.posSettingsStatus,
      };
      this.props.handleGlobalState(currentNode);
    }
  }

  componentWillReceiveProps(nextProps) {}

  loadSavedState = () => {
    const { initialGlobalState } = this.props;
    const { nodeId } = this.state;

    if (
      initialGlobalState.length !== 0 &&
      initialGlobalState.nodeId === nodeId
    ) {
      console.log(initialGlobalState);

      this.setState({
        posSettings: initialGlobalState.posSettings,
        posSettingsStatus: initialGlobalState.posStatus,
      });
    }
  };

  initializeParentData = () => {
    // isIncluded
    const {
      initialGlobalState,
      card: { cardCode, isIncluded },
    } = this.props;

    // const INCLUDE = "include";
    // const EXCLUDE = "exclude";
    const COVERED = "covered";
    const NOT_COVERED = "not-covered";
    if (cardCode === 6) {
      const posSettingsStatus = {
        type: isIncluded ? COVERED : NOT_COVERED,
        covered: isIncluded,
      };
      this.setState({
        posSettingsStatus,
      });

      console.log("saved::state: ", initialGlobalState);
    }
  };

  initializePOSSettingsListApi = () => {
    let apiDetails = {};
    apiDetails["apiPart"] = POS_SETTINGS_LIST;

    this.props.getPOSSettings(apiDetails).then((json) => {
      const posSettings =
        json.payload && json.payload.data ? json.payload.data : [];

      posSettings.forEach((s) => {
        s["isChecked"] = false;
      });
      this.setState({
        posSettings,
      });
    });
  };

  initializePRSettingsListApi = () => {
    let apiDetails = {};
    apiDetails["apiPart"] = PR_SETTINGS_LIST;

    this.props.getPRSettings(apiDetails).then((json) => {
      const prSettings =
        json.payload && json.payload.data ? json.payload.data : [];

      prSettings.forEach((s) => {
        s["isChecked"] = false;
      });
      this.setState({
        prSettings,
      });
    });
  };

  serviceSettingsCheckedPOS = (e) => {
    const { posSettings } = this.state;
    const { nodeId } = this.props;

    posSettings.forEach((s: any) => {
      if (s.id_place_of_service_type + "" + nodeId === e.target.id) {
        s.isChecked = e.target.checked;
      }
    });

    this.setState({
      posSettings,
    });
  };

  handlePOSSelectAll = () => {
    const { posSettings, isSelectAllPOS } = this.state;
    posSettings.forEach((s: any) => {
      s.isChecked = !isSelectAllPOS;
    });

    this.setState({
      posSettings,
      isSelectAllPOS: !isSelectAllPOS,
    });
  };
  handlePOSStatus = (key: string) => {
    const COVERED = "covered";
    const isCovered: boolean = key === COVERED ? true : false;
    let posSettingsStatus = {
      type: key,
      covered: isCovered,
    };

    this.setState({ posSettingsStatus }, () => {
      const { nodeId, card } = this.props;
      // this.props.handleStatusChange(nodeId, card);
    });
  };
  render() {
    const {
      posSettings,
      prSettings,
      posSettingsStatus,
      prSettingsStatus,
      isSelectAllPOS,
      isSelectAllPR,
    } = this.state;
    const {
      nodeId,
      card: { cardName, cardCode, isIncluded },
      deleteIconHandler,
    } = this.props;
    switch (cardCode) {
      case 1:
        return cardName;
      case 2:
        return cardName;
      case 3:
        return cardName;
      case 4:
        return cardName;
      case 5:
        return cardName;
      case 6:
        return (
          <POSCriteria
            posSettingsServies={{
              posSettings,
              posSettingsStatus,
            }}
            handleStatus={this.handlePOSStatus}
            serviceSettingsChecked={this.serviceSettingsCheckedPOS}
            selectAllHandler={{
              isSelectAll: isSelectAllPOS,
              handleSelectAll: this.handlePOSSelectAll,
            }}
            deleteIconHandler={() => deleteIconHandler(nodeId)}
            isAdditionalCriteria={true}
            nodeId={nodeId}
          />
        );
      case 7:
        return cardName;
      case 8:
        return cardName;
      default:
        return null;
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ListItem);