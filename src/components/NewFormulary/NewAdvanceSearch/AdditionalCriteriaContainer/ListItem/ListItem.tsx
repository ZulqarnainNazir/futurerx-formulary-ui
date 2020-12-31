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
import ICDCriteria from "../CriteriaComponents/ICDCriteria";
import AgeCriteria from "../CriteriaComponents/AgeCriteria";
import PNCriteria from "../CriteriaComponents/PNCriteria";
import PTCriteria from "../CriteriaComponents/PTCriteria";

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

    cardCode: null,
    cardName: null,
    isIncluded: null,

    payload: null,

    // AL
    alSettings: {
      min_age_condition: "",
      min_age_limit: "",
      max_age_condition: "",
      max_age_limit: "",
    },
    alSettingsStatus: { type: "covered", covered: true },

    // GL
    glSettings: [
      { id: 1, isChecked: false, gl_type_name: "Female", gl_code: "F" },
      { id: 2, isChecked: false, gl_type_name: "Male", gl_code: "M" },
      { id: 3, isChecked: false, gl_type_name: "Unknown", gl_code: "U" },
    ],
    glSettingsStatus: { type: "covered", covered: true },

    // ICD
    icdSettings: { look_back_days: "", icds: "" },
    icdSettingsStatus: { type: "covered", covered: true },

    // PN
    pnSettings: [
      {
        name: "",
        key: 0,
        show: false,
        is_list: false,
        value: "",
        type: "",
        text: "",
      },
    ],
    pnSettingsStatus: { type: "covered", covered: true },

    // PT
    ptSettings: [
      {
        name: "",
        key: 0,
        show: false,
        is_list: false,
        value: "",
        type: "",
        text: "",
      },
    ],
    ptSettingsStatus: { type: "covered", covered: true },

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

    // PCHL
    pchlSettings: [],
    pchlSettingsStatus: {
      type: "covered",
      covered: true,
    },
  };

  componentDidMount() {
    this.setState({
      nodeId: this.props.nodeId,
      cardCode: this.props.card.cardCode,
      cardName: this.props.card.cardName,
      isIncluded: this.props.card.isIncluded,
      payload: this.props.payload,
    });

    this.initializePreData();
  }

  componentDidUpdate(prevProps, prevState) {
    const { nodeId, payload } = this.props;

    const updatedPayload = this.state.payload;
    const { cardCode, cardName, isIncluded } = this.state;

    // age & icd are objects
    // gender, pos & pr are array
    this.props.handleGlobalState(
      nodeId,
      cardCode,
      cardName,
      isIncluded,
      updatedPayload
    );
  }

  initializePreData = () => {
    const COVERED = "covered";
    const NOT_COVERED = "not-covered";
    const {
      // initialState,
      payload,
      card: { cardCode, isIncluded },
    } = this.props;
    switch (cardCode) {
      case 2:
        let { glSettings } = this.state;

        if (payload !== null) {
          if (payload.length > 0) {
            const gender: string[] = payload;
            glSettings.forEach((s) => {
              if (gender.includes(s.gl_code)) {
                s["isChecked"] = true;
              } else {
                s["isChecked"] = false;
              }
            });
          }
          if (payload.length > 0) {
            const gender: string[] = payload;
            glSettings.forEach((s) => {
              if (gender.includes(s.gl_code)) {
                s["isChecked"] = true;
              } else {
                s["isChecked"] = false;
              }
            });
          }
        }
        const glSettingsStatus = {
          type: isIncluded ? COVERED : NOT_COVERED,
          covered: isIncluded,
        };

        this.setState({
          glSettings,
          glSettingsStatus,
        });
        break;
      case 6:
        this.initializePOSSettingsListApi();
        const posSettingsStatus = {
          type: isIncluded ? COVERED : NOT_COVERED,
          covered: isIncluded,
        };
        this.setState({
          posSettingsStatus,
        });
        break;
      case 7:
        this.initializePRSettingsListApi();
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
    const { payload } = this.props;
    let apiDetails = {};
    apiDetails["apiPart"] = POS_SETTINGS_LIST;
    this.props.getPOSSettings(apiDetails).then((json) => {
      let posSettings =
        json.payload && json.payload.data ? json.payload.data : [];
      if (payload !== null) {
        if (payload.length > 0) {
          const place_of_services: number[] = payload;
          posSettings.forEach((s) => {
            if (place_of_services.includes(s.id_place_of_service_type)) {
              s["isChecked"] = true;
            } else {
              s["isChecked"] = false;
            }
          });
        }
        if (payload.length > 0) {
          const place_of_services: number[] = payload;
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
    const { payload } = this.props;
    let apiDetails = {};
    apiDetails["apiPart"] = PR_SETTINGS_LIST;

    this.props.getPRSettings(apiDetails).then((json) => {
      let prSettings =
        json.payload && json.payload.data ? json.payload.data : [];
      if (payload !== null) {
        if (payload.length > 0) {
          const patient_residences: number[] = payload;
          prSettings.forEach((s) => {
            if (patient_residences.includes(s.id_patient_residence_type)) {
              s["isChecked"] = true;
            } else {
              s["isChecked"] = false;
            }
          });
        }
        if (payload.length > 0) {
          const patient_residences: number[] = payload;
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
    const posSettings = [...this.state.posSettings];
    const { nodeId } = this.props;
    const payload: string[] = [];

    posSettings.forEach((s: any) => {
      if (s.id_place_of_service_type + "" + nodeId === e.target.id) {
        s.isChecked = e.target.checked;
      }
    });

    posSettings.forEach((s: any) => {
      if (s.isChecked === true) {
        payload.push(s.id_place_of_service_type);
      }
    });

    this.setState({
      posSettings,
      payload,
    });
  };

  serviceSettingsCheckedPR = (e) => {
    const prSettings = [...this.state.prSettings];
    const { nodeId } = this.props;
    const payload: string[] = [];

    prSettings.forEach((s: any) => {
      if (s.id_patient_residence_type + "" + nodeId === e.target.id) {
        s.isChecked = e.target.checked;
      }
    });

    prSettings.forEach((s: any) => {
      if (s.isChecked === true) {
        payload.push(s.id_patient_residence_type);
      }
    });

    this.setState({
      prSettings,
      payload,
    });
  };

  serviceSettingsCheckedGL = (e) => {
    const glSettings = [...this.state.glSettings];
    const { nodeId } = this.props;
    const payload: string[] = [];

    glSettings.forEach((s: any) => {
      if (s.id + "" + nodeId === e.target.id) {
        s.isChecked = e.target.checked;
      }
    });

    glSettings.forEach((s: any) => {
      if (s.isChecked === true) {
        payload.push(s.gl_code);
      }
    });

    this.setState({
      glSettings,
      payload,
    });
  };

  handlePOSSelectAll = () => {
    const { posSettings, isSelectAllPOS } = this.state;
    const payload: string[] = [];

    posSettings.forEach((s: any) => {
      s.isChecked = !isSelectAllPOS;
    });

    posSettings.forEach((s: any) => {
      if (s.isChecked === true) {
        payload.push(s.id_place_of_service_type);
      }
    });

    this.setState({
      posSettings,
      isSelectAllPOS: !isSelectAllPOS,
      payload,
    });
  };

  handlePRSelectAll = () => {
    const { prSettings, isSelectAllPR } = this.state;
    const payload: string[] = [];

    prSettings.forEach((s: any) => {
      s.isChecked = !isSelectAllPR;
    });

    prSettings.forEach((s: any) => {
      if (s.isChecked === true) {
        payload.push(s.id_patient_residence_type);
      }
    });

    this.setState({
      prSettings,
      isSelectAllPR: !isSelectAllPR,
      payload,
    });
  };

  handlePOSStatus = (key: string) => {
    const COVERED = "covered";
    const isCovered: boolean = key === COVERED ? true : false;
    let posSettingsStatus = {
      type: key,
      covered: isCovered,
    };
    let isIncluded = posSettingsStatus.covered;
    this.setState({ posSettingsStatus, isIncluded });
  };

  handlePRStatus = (key: string) => {
    const COVERED = "covered";
    const isCovered: boolean = key === COVERED ? true : false;
    let prSettingsStatus = {
      type: key,
      covered: isCovered,
    };
    let isIncluded = prSettingsStatus.covered;
    this.setState({ prSettingsStatus, isIncluded });
  };

  handleGLStatus = (key: string) => {
    const COVERED = "covered";
    const isCovered: boolean = key === COVERED ? true : false;

    let glSettingsStatus = {
      type: key,
      covered: isCovered,
    };

    let isIncluded = glSettingsStatus.covered;
    this.setState({ glSettingsStatus, isIncluded });
  };

  handleAgeCriteriaChange = (event) => {
    console.log(event.target.value);
    console.log(event.target.name);
  };

  handleALStatus = (key: string) => {
    const COVERED = "covered";
    const isCovered: boolean = key === COVERED ? true : false;

    let glSettingsStatus = {
      type: key,
      covered: isCovered,
    };

    let isIncluded = glSettingsStatus.covered;
    this.setState({ glSettingsStatus, isIncluded });
  };

  render() {
    const {
      // Current Criteria
      nodeId,
      // cardCode,
      cardName,
      isIncluded,
      payload,

      // AL
      alSettings,
      alSettingsStatus,

      // GL
      glSettings,
      glSettingsStatus,

      // ICD
      icdSettings,
      icdSettingsStatus,

      // PN
      pnSettings,
      pnSettingsStatus,

      // PT
      ptSettings,
      ptSettingsStatus,

      // POS
      posSettings,
      prSettings,
      isSelectAllPOS,

      // PR
      posSettingsStatus,
      prSettingsStatus,
      isSelectAllPR,

      // PCHL
      pchlSettings,
      pchlSettingsStatus,
    } = this.state;
    const {
      card: { cardCode },
      deleteIconHandler,
    } = this.props;
    switch (cardCode) {
      case 1:
        return null;
      // return (
      //   <AgeCriteria
      //     alSettingsServies={{
      //       alSettings,
      //       alSettingsStatus,
      //     }}
      //     handleStatus={this.handleGLStatus}
      //     handleAgeCriteriaChange={this.handleAgeCriteriaChange}
      //     deleteIconHandler={() =>
      //       deleteIconHandler(nodeId, cardCode, cardName, isIncluded, payload)
      //     }
      //     isAdditionalCriteria={true}
      //     nodeId={nodeId}
      //   />
      // );
      case 2:
        return (
          <GenderCriteria
            glSettingsServies={{
              glSettings,
              glSettingsStatus,
            }}
            handleStatus={this.handleGLStatus}
            serviceSettingsChecked={this.serviceSettingsCheckedGL}
            deleteIconHandler={() =>
              deleteIconHandler(nodeId, cardCode, cardName, isIncluded, payload)
            }
            isAdditionalCriteria={true}
            nodeId={nodeId}
          />
        );
      case 3:
        return null;
      // return (
      //   <ICDCriteria
      //     icdSettingsServies={{
      //       icdSettings,
      //       icdSettingsStatus,
      //     }}
      //     handleStatus={this.handleGLStatus}
      //     serviceSettingsChecked={this.serviceSettingsCheckedGL}
      //     deleteIconHandler={() =>
      //       deleteIconHandler(nodeId, cardCode, cardName, isIncluded, payload)
      //     }
      //     isAdditionalCriteria={true}
      //     nodeId={nodeId}
      //   />
      // );
      case 4:
        return null;
      // return (
      //   <PNCriteria
      //     pnSettingsServies={{
      //       pnSettings,
      //       pnSettingsStatus,
      //     }}
      //     handleStatus={this.handlePOSStatus}
      //     serviceSettingsChecked={this.serviceSettingsCheckedPOS}
      //     deleteIconHandler={() =>
      //       deleteIconHandler(nodeId, cardCode, cardName, isIncluded, payload)
      //     }
      //     isAdditionalCriteria={true}
      //     nodeId={nodeId}
      //   />
      // );
      case 5:
        return null;
      // return (
      //   <PTCriteria
      //     ptSettingsServies={{
      //       ptSettings,
      //       ptSettingsStatus,
      //     }}
      //     handleStatus={this.handlePOSStatus}
      //     serviceSettingsChecked={this.serviceSettingsCheckedPOS}
      //     deleteIconHandler={() =>
      //       deleteIconHandler(nodeId, cardCode, cardName, isIncluded, payload)
      //     }
      //     isAdditionalCriteria={true}
      //     nodeId={nodeId}
      //   />
      // );
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
            deleteIconHandler={() =>
              deleteIconHandler(nodeId, cardCode, cardName, isIncluded, payload)
            }
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
            deleteIconHandler={() =>
              deleteIconHandler(nodeId, cardCode, cardName, isIncluded, payload)
            }
            isAdditionalCriteria={true}
            nodeId={nodeId}
          />
        );
      case 8:
        return null;
      default:
        return null;
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ListItem);
