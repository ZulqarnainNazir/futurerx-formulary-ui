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

import { getICDReplaceSrch } from "../../../../../redux/slices/formulary/drugDetails/icd/icdActionCreation";
import * as icdConstants from "../../../../../api/http-drug-details";
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
    getICDReplaceSrch: (a) => dispatch(getICDReplaceSrch(a)),
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
    icdSettings: { look_back_days: "", icds: [] },
    icdSettingsStatus: { type: "covered", covered: true },
    icdResults: {
      data: [],
      value: undefined,
    },

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
    const { nodeId } = this.props;

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
      payload,
      card: { cardCode, isIncluded },
    } = this.props;
    switch (cardCode) {
      case 1:
        let { alSettings } = this.state;
        if (payload !== null) {
          alSettings = { ...payload };
        }
        const alSettingsStatus = {
          type: isIncluded ? COVERED : NOT_COVERED,
          covered: isIncluded,
        };

        this.setState({
          alSettings,
          alSettingsStatus,
        });
        break;
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
      case 3:
        console.log(payload);
        let { icdSettings } = this.state;
        // let icdResults = this.state.icdResults;

        if (payload !== null) {
          icdSettings = { ...payload };
          // icdResults.value = payload.icds;
        }
        const icdSettingsStatus = {
          type: isIncluded ? COVERED : NOT_COVERED,
          covered: isIncluded,
        };

        this.setState({
          icdSettings,
          icdSettingsStatus,
          // icdResults,
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

  handleAgeCriteriaMinConChange = (value) => {
    let alSettings = { ...this.state.alSettings };
    alSettings.min_age_condition = value;
    let payload = { ...alSettings };
    this.setState({
      alSettings,
      payload,
    });
  };
  handleAgeCriteriaMaxConChange = (value) => {
    let alSettings = { ...this.state.alSettings };
    alSettings.max_age_condition = value;
    let payload = { ...alSettings };
    this.setState({
      alSettings,
      payload,
    });
  };
  handleAgeCriteriaChange = (event) => {
    let alSettings = { ...this.state.alSettings };

    if (event.target.name === "min-val")
      alSettings.min_age_limit = event.target.value.toString();
    if (event.target.name === "max-val")
      alSettings.max_age_limit = event.target.value.toString();

    let payload = { ...alSettings };
    this.setState({
      alSettings,
      payload,
    });
  };

  handleALStatus = (key: string) => {
    const COVERED = "covered";
    const isCovered: boolean = key === COVERED ? true : false;

    let alSettingsStatus = {
      type: key,
      covered: isCovered,
    };

    let isIncluded = alSettingsStatus.covered;
    this.setState({ alSettingsStatus, isIncluded });
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

  // https://api-dev-config-formulary.futurerx.com/api/1/icds?search_value=t
  // Request Method: GET

  handleICDStatus = (key: string) => {
    const COVERED = "covered";
    const isCovered: boolean = key === COVERED ? true : false;

    let icdSettingsStatus = {
      type: key,
      covered: isCovered,
    };

    let isIncluded = icdSettingsStatus.covered;
    this.setState({ icdSettingsStatus, isIncluded });
  };

  handleICDOnChange = (event) => {
    let icdSettings = { ...this.state.icdSettings };

    if (event.target.name === "look_back_days")
      icdSettings.look_back_days = event.target.value.toString();
    let payload = { ...icdSettings };
    this.setState({
      icdSettings,
      payload,
    });
  };

  handleICDChange = (value: any[]) => {
    let icdSettings: any = { ...this.state.icdSettings };

    let icds: any[] = [];
    this.state.icdResults.data.forEach((icd: any) => {
      value.forEach((v) => {
        if (icd["key"] === v) {
          icds.push(icd);
        }
      });
    });

    icdSettings.icds = icds;
    const payload: any = { ...icdSettings };
    this.setState({
      icdSettings,
      payload,
    });
  };

  // is_list: false
  // key: 68677
  // text: "T07-Unspecified multiple injuries"
  // value: "T07-Unspecified multiple injuries"

  handleICDSearch = (input) => {
    let apiDetails = {};
    apiDetails["apiPart"] = icdConstants.GET_ICD_DRUGS_REPLACE;
    apiDetails["pathParams"] = this.props?.formulary_id;
    apiDetails["keyVals"] = [
      { key: icdConstants.KEY_ENTITY_ID, value: this.props?.formulary_id },
      { key: icdConstants.SEARCHKEY, value: input },
    ];
    this.props.getICDReplaceSrch(apiDetails).then((json) => {
      let response = json.payload && json.payload.data ? json.payload.data : [];
      const data = [...response].slice(0, 8);
      this.setState({
        icdResults: {
          data,
        },
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
      icdResults,

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
        return (
          <AgeCriteria
            alSettingsServies={{
              alSettings,
              alSettingsStatus,
            }}
            handleStatus={this.handleALStatus}
            handleAgeCriteriaMinConChange={this.handleAgeCriteriaMinConChange}
            handleAgeCriteriaMaxConChange={this.handleAgeCriteriaMaxConChange}
            handleAgeCriteriaChange={this.handleAgeCriteriaChange}
            deleteIconHandler={() =>
              deleteIconHandler(nodeId, cardCode, cardName, isIncluded, payload)
            }
            isAdditionalCriteria={true}
            nodeId={nodeId}
          />
        );
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
        return (
          <ICDCriteria
            icdSettingsServies={{
              icdSettings,
              icdSettingsStatus,
              icdResults,
            }}
            handleStatus={this.handleICDStatus}
            handleICDChange={this.handleICDChange}
            handleICDSearch={this.handleICDSearch}
            handleICDOnChange={this.handleICDOnChange}
            deleteIconHandler={() =>
              deleteIconHandler(nodeId, cardCode, cardName, isIncluded, payload)
            }
            isAdditionalCriteria={true}
            nodeId={nodeId}
          />
        );
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
