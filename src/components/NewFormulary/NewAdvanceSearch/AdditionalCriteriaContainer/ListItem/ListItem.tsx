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
import PRCriteria from "../CriteriaComponents/PRCriteria";
import GenderCriteria from "../CriteriaComponents/GenderCriteria";

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

    // POS
    posSettings: [],
    posSettingsStatus: {
      type: "covered",
      covered: true,
    },
    isSelectAllPOS: false,

    // PR
    prSettings: [],
    prSettingsStatus: {
      type: "covered",
      covered: true,
    },
    isSelectAllPR: false,

    // GL
    glSettings: [
      { id: 1, isChecked: false, gl_type_name: "Female", gl_code: "F" },
      { id: 2, isChecked: false, gl_type_name: "Male", gl_code: "M" },
      { id: 3, isChecked: false, gl_type_name: "Unknown", gl_code: "U" },
    ],
    glSettingsStatus: { type: "covered", covered: true },
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

    if (initialGlobalState && nodeId) {
      // currentNode = initialGlobalState.filter(
      //   (criteria) => criteria.nodeId === nodeId
      // );
      currentNode = initialGlobalState[nodeId];
      currentNode = {
        nodeId: nodeId,
        card: { cardName, cardCode, isIncluded },

        posSettings: this.state.posSettings,
        posStatus: this.state.posSettingsStatus,

        prSettings: this.state.prSettings,
        prStatus: this.state.prSettingsStatus,

        glSettings: this.state.glSettings,
        glStatus: this.state.glSettingsStatus,
      };
      this.props.handleGlobalState(currentNode);
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   const { nodeId } = this.props;
  //   console.log("calling child props update:::::");
  //   console.log(nextProps.additionalCriteriaBody);
  //   if (nextProps.additionalCriteriaBody) {
  //     const additionalCriteria = nextProps.additionalCriteriaObject[1];
  //     const currentNode = additionalCriteria[nodeId];
  //     console.log(this.state);
  //     this.setState(
  //       {
  //         posSettings: JSON.parse(JSON.stringify(currentNode.posSettings)),
  //         posSettingsStatus: JSON.parse(JSON.stringify(currentNode.posStatus)),
  //       },
  //       () => console.log(this.state)
  //     );
  //   }
  // }

  // loadSavedState = () => {
  //   const { initialState } = this.props;

  //   if (initialState && initialState.length > 0) {
  //     console.log("intial state object: ", initialState);
  //     console.log("intial state object: ", initialState.posSettings);
  //     console.log("intial state object: ", initialState.posStatus);

  //     // this.state.posSettings = initialState.posSettings;
  //     // this.state.posSettingsStatus = initialState.posStatus;
  //     // this.setState({
  //     //   posSettings: initialState.posSettings,
  //     //   posSettingsStatus: initialState.posStatus,
  //     // });
  //   }
  // };

  initializeParentData = () => {
    const COVERED = "covered";
    const NOT_COVERED = "not-covered";
    const {
      card: { cardCode, isIncluded },
    } = this.props;
    switch (cardCode) {
      case 2:
        const glSettingsStatus = {
          type: isIncluded ? COVERED : NOT_COVERED,
          covered: isIncluded,
        };

        // if (
        //   initialState !== null &&
        //   payload !== null &&
        //   initialState.nodeId === nodeId &&
        //   cardCode === 6
        // ) {
        // }
        this.setState({
          glSettingsStatus,
        });
        break;
      case 6:
        const posSettingsStatus = {
          type: isIncluded ? COVERED : NOT_COVERED,
          covered: isIncluded,
        };
        this.setState({
          posSettingsStatus,
        });
        break;
      case 7:
        const prSettingsStatus = {
          type: isIncluded ? COVERED : NOT_COVERED,
          covered: isIncluded,
        };
        this.setState({
          prSettingsStatus,
        });
        break;
      default:
        break;
    }
  };

  initializePOSSettingsListApi = () => {
    const {
      initialState,
      nodeId,
      card: { cardCode },
      payload,
    } = this.props;
    let apiDetails = {};
    apiDetails["apiPart"] = POS_SETTINGS_LIST;
    this.props.getPOSSettings(apiDetails).then((json) => {
      let posSettings =
        json.payload && json.payload.data ? json.payload.data : [];

      if (
        initialState !== null &&
        payload !== null &&
        initialState.nodeId === nodeId &&
        cardCode === 6
      ) {
        // posSettings = initialState.posSettings;
        // Object.assign(posSettings, initialState.posSettings);
        // posSettings = JSON.parse(JSON.stringify(initialState.posSettings));
        if (
          payload &&
          payload["covered"] &&
          payload["covered"]["place_of_services"] &&
          payload["covered"]["place_of_services"].length > 0
        ) {
          const place_of_services: number[] =
            payload["covered"]["place_of_services"];
          posSettings.forEach((s) => {
            if (place_of_services.includes(s.id_place_of_service_type)) {
              s["isChecked"] = true;
            } else {
              s["isChecked"] = false;
            }
          });
        }
        if (
          payload &&
          payload["not_covered"] &&
          payload["not_covered"]["place_of_services"] &&
          payload["not_covered"]["place_of_services"].length > 0
        ) {
          const place_of_services: number[] =
            payload["not_covered"]["place_of_services"];
          posSettings.forEach((s) => {
            if (place_of_services.includes(s.id_place_of_service_type)) {
              s["isChecked"] = true;
            } else {
              s["isChecked"] = false;
            }
          });
        }
      } else {
        posSettings.forEach((s) => {
          s["isChecked"] = false;
        });
      }
      this.setState({
        posSettings,
      });
    });
  };

  initializePRSettingsListApi = () => {
    const {
      initialState,
      nodeId,
      card: { cardCode },
      payload,
    } = this.props;
    let apiDetails = {};
    apiDetails["apiPart"] = PR_SETTINGS_LIST;

    this.props.getPRSettings(apiDetails).then((json) => {
      let prSettings =
        json.payload && json.payload.data ? json.payload.data : [];
      if (
        initialState !== null &&
        payload !== null &&
        initialState.nodeId === nodeId &&
        cardCode === 7
      ) {
        // prSettings = JSON.parse(JSON.stringify(initialState.prSettings));

        if (
          payload &&
          payload["covered"] &&
          payload["covered"]["patient_residences"] &&
          payload["covered"]["patient_residences"].length > 0
        ) {
          const patient_residences: number[] =
            payload["covered"]["patient_residences"];
          prSettings.forEach((s) => {
            if (patient_residences.includes(s.id_patient_residence_type)) {
              s["isChecked"] = true;
            } else {
              s["isChecked"] = false;
            }
          });
        }
        if (
          payload &&
          payload["not_covered"] &&
          payload["not_covered"]["patient_residences"] &&
          payload["not_covered"]["patient_residences"].length > 0
        ) {
          const patient_residences: number[] =
            payload["not_covered"]["patient_residences"];
          prSettings.forEach((s) => {
            if (patient_residences.includes(s.id_patient_residence_type)) {
              s["isChecked"] = true;
            } else {
              s["isChecked"] = false;
            }
          });
        }
      } else {
        prSettings.forEach((s) => {
          s["isChecked"] = false;
        });
      }
      this.setState({
        prSettings,
      });
    });
  };

  serviceSettingsCheckedPOS = (e) => {
    const posSettings = JSON.parse(JSON.stringify(this.state.posSettings));
    // const { posSettings } = this.state;
    const { nodeId } = this.props;

    // console.log("POS SERVICE UPDATE: ", posSettings);
    posSettings.forEach((s: any) => {
      if (s.id_place_of_service_type + "" + nodeId === e.target.id) {
        s.isChecked = e.target.checked;
      }
    });

    this.setState({
      posSettings,
    });
  };

  serviceSettingsCheckedPR = (e) => {
    const prSettings = JSON.parse(JSON.stringify(this.state.prSettings));
    const { nodeId } = this.props;

    prSettings.forEach((s: any) => {
      if (s.id_patient_residence_type + "" + nodeId === e.target.id) {
        s.isChecked = e.target.checked;
      }
    });

    this.setState({
      prSettings,
    });
  };

  serviceSettingsCheckedGL = (e) => {
    const glSettings = JSON.parse(JSON.stringify(this.state.glSettings));
    const { nodeId } = this.props;

    glSettings.forEach((s: any) => {
      if (s.id + "" + nodeId === e.target.id) {
        s.isChecked = e.target.checked;
      }
    });

    this.setState({
      glSettings,
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

  handlePRSelectAll = () => {
    const { prSettings, isSelectAllPR } = this.state;
    prSettings.forEach((s: any) => {
      s.isChecked = !isSelectAllPR;
    });

    this.setState({
      prSettings,
      isSelectAllPR: !isSelectAllPR,
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

  handlePRStatus = (key: string) => {
    const COVERED = "covered";
    const isCovered: boolean = key === COVERED ? true : false;
    let prSettingsStatus = {
      type: key,
      covered: isCovered,
    };

    this.setState({ prSettingsStatus });
  };

  handleGLStatus = (key: string) => {
    const COVERED = "covered";
    const isCovered: boolean = key === COVERED ? true : false;
    let glSettingsStatus = {
      type: key,
      covered: isCovered,
    };

    this.setState({ glSettingsStatus });
  };

  render() {
    const {
      // POS
      posSettings,
      prSettings,
      isSelectAllPOS,

      // PR
      posSettingsStatus,
      prSettingsStatus,
      isSelectAllPR,

      // GL
      glSettings,
      glSettingsStatus,
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
        return (
          <GenderCriteria
            glSettingsServies={{
              glSettings,
              glSettingsStatus,
            }}
            handleStatus={this.handleGLStatus}
            serviceSettingsChecked={this.serviceSettingsCheckedGL}
            deleteIconHandler={() => deleteIconHandler(nodeId)}
            isAdditionalCriteria={true}
            nodeId={nodeId}
          />
        );
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
        return (
          <PRCriteria
            prSettingsServies={{
              prSettings,
              prSettingsStatus,
            }}
            handleStatus={this.handlePRStatus}
            serviceSettingsChecked={this.serviceSettingsCheckedPR}
            selectAllHandler={{
              isSelectAll: isSelectAllPR,
              handleSelectAll: this.handlePRSelectAll,
            }}
            deleteIconHandler={() => deleteIconHandler(nodeId)}
            isAdditionalCriteria={true}
            nodeId={nodeId}
          />
        );
      case 8:
        return cardName;
      default:
        return null;
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ListItem);
