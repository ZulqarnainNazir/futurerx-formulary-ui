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
import { getPNReplaceSrch } from "../../../../../redux/slices/formulary/drugDetails/pn/pnActionCreation";
import { getPTReplaceSrch } from "../../../../../redux/slices/formulary/drugDetails/pt/ptActionCreation";

import * as icdConstants from "../../../../../api/http-drug-details";
import * as pnConstants from "../../../../../api/http-drug-details";
import * as ptConstants from "../../../../../api/http-drug-details";

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

    getICDSearch: (a) => dispatch(getICDReplaceSrch(a)),
    getPNSearch: (a) => dispatch(getPNReplaceSrch(a)),
    getPTSearch: (a) => dispatch(getPTReplaceSrch(a)),
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
    pnSettings: [],
    pnSettingsStatus: { type: "covered", covered: true },
    pnResults: { data: [], value: undefined },

    // PT
    ptSettings: [],
    ptSettingsStatus: { type: "covered", covered: true },
    ptResults: { data: [], value: undefined },

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

    // https://api-dev-config-formulary.futurerx.com/api/1/lookback-list?search_value=d
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
        let { icdSettings } = this.state;
        let icdData: any[] = [];
        let icdValue: string[] | undefined = [];

        if (payload !== null) {
          icdSettings = { ...payload };
          if (payload.icds !== "") {
            if (payload.icds.length > 0) {
              payload.icds.forEach((ele: any) => {
                icdData.push(ele);
                if (icdValue) icdValue.push(ele.text);
              });
            }
          }
        }
        const icdSettingsStatus = {
          type: isIncluded ? COVERED : NOT_COVERED,
          covered: isIncluded,
        };

        if (icdValue.length === 0) icdValue = undefined;
        this.setState({
          icdSettings,
          icdSettingsStatus,
          icdResults: {
            data: icdData,
            value: icdValue,
          },
        });
        break;
      case 4:
        let { pnSettings } = this.state;
        let pnDdata: any[] = [];
        let pnValue: string[] | undefined = [];

        if (payload !== null) {
          pnSettings = { ...payload };
          if (payload.length > 0) {
            payload.forEach((ele: any) => {
              pnDdata.push(ele);
              if (pnValue) pnValue.push(ele.text);
            });
          }
        }
        const pnSettingsStatus = {
          type: isIncluded ? COVERED : NOT_COVERED,
          covered: isIncluded,
        };

        if (pnValue.length === 0) pnValue = undefined;
        this.setState({
          pnSettings,
          pnSettingsStatus,
          pnResults: {
            data: pnDdata,
            value: pnValue,
          },
        });
        break;
      case 5:
        let { ptSettings } = this.state;
        let ptData: any[] = [];
        let ptValue: string[] | undefined = [];

        if (payload !== null) {
          ptSettings = { ...payload };
          if (payload.length > 0) {
            payload.forEach((ele: any) => {
              ptData.push(ele);
              if (ptValue) ptValue.push(ele.text);
            });
          }
        }
        const ptSettingsStatus = {
          type: isIncluded ? COVERED : NOT_COVERED,
          covered: isIncluded,
        };

        if (ptValue.length === 0) ptValue = undefined;
        this.setState({
          ptSettings,
          ptSettingsStatus,
          ptResults: {
            data: ptData,
            value: ptValue,
          },
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

  ///////////////////// AL START

  handleALMinConChange = (value) => {
    let alSettings = { ...this.state.alSettings };
    alSettings.min_age_condition = value;
    let payload = { ...alSettings };
    this.setState({
      alSettings,
      payload,
    });
  };

  handleALMaxConChange = (value) => {
    let alSettings = { ...this.state.alSettings };
    alSettings.max_age_condition = value;
    let payload = { ...alSettings };
    this.setState({
      alSettings,
      payload,
    });
  };

  handleALChange = (event) => {
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

  ///////////////////// GL START

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

  ///////////////////// ICD START

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

  handleICDSearch = (input) => {
    let apiDetails = {};
    apiDetails["apiPart"] = icdConstants.GET_ICD_DRUGS_REPLACE;
    apiDetails["pathParams"] = this.props?.formulary_id;
    apiDetails["keyVals"] = [
      { key: icdConstants.KEY_ENTITY_ID, value: this.props?.formulary_id },
      { key: icdConstants.SEARCHKEY, value: input },
    ];
    this.props.getICDSearch(apiDetails).then((json) => {
      let response = json.payload && json.payload.data ? json.payload.data : [];
      const data = [...response].slice(0, 8);
      this.setState({
        icdResults: {
          data,
        },
      });
    });
  };

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

  ///////////////////// PN START

  handlePNChange = (value: any[]) => {
    let pnSettings: any[] = [...this.state.pnSettings];

    // let pns: any[] = [];
    this.state.pnResults.data.forEach((pn: any) => {
      value.forEach((v) => {
        if (pn["key"] === v) {
          pnSettings.push(pn);
        }
      });
    });

    const payload: any = { ...pnSettings };
    this.setState({
      pnSettings,
      payload,
    });
  };

  handlePNSearch = (input) => {
    let apiDetails = {};
    apiDetails["apiPart"] = pnConstants.GET_PN_DRUGS_REPLACE;
    apiDetails["pathParams"] = this.props?.formulary_id;
    apiDetails["keyVals"] = [
      { key: pnConstants.KEY_ENTITY_ID, value: this.props?.formulary_id },
      { key: pnConstants.SEARCHKEY, value: input },
    ];
    this.props.getPNSearch(apiDetails).then((json) => {
      let response = json.payload && json.payload.data ? json.payload.data : [];
      const data = [...response].slice(0, 8);
      this.setState({
        pnResults: {
          data,
        },
      });
    });
  };

  handlePNStatus = (key: string) => {
    const COVERED = "covered";
    const isCovered: boolean = key === COVERED ? true : false;

    let pnSettingsStatus = {
      type: key,
      covered: isCovered,
    };

    let isIncluded = pnSettingsStatus.covered;
    this.setState({ pnSettingsStatus, isIncluded });
  };

  ///////////////////// PT START

  handlePTChange = (value: any[]) => {
    let ptSettings: any[] = [...this.state.ptSettings];

    // let icds: any[] = [];
    this.state.ptResults.data.forEach((pt: any) => {
      value.forEach((v) => {
        if (pt["key"] === v) {
          ptSettings.push(pt);
        }
      });
    });

    const payload: any = { ...ptSettings };
    this.setState({
      ptSettings,
      payload,
    });
  };

  handlePTSearch = (input) => {
    let apiDetails = {};
    apiDetails["apiPart"] = ptConstants.GET_PT_DRUGS_REPLACE;
    apiDetails["pathParams"] = this.props?.formulary_id;
    apiDetails["keyVals"] = [
      { key: ptConstants.KEY_ENTITY_ID, value: this.props?.formulary_id },
      { key: ptConstants.SEARCHKEY, value: input },
    ];
    this.props.getPTSearch(apiDetails).then((json) => {
      let response = json.payload && json.payload.data ? json.payload.data : [];
      const data = [...response].slice(0, 8);
      this.setState({
        ptResults: {
          data,
        },
      });
    });
  };

  handlePTStatus = (key: string) => {
    const COVERED = "covered";
    const isCovered: boolean = key === COVERED ? true : false;

    let ptSettingsStatus = {
      type: key,
      covered: isCovered,
    };

    let isIncluded = ptSettingsStatus.covered;
    this.setState({ ptSettingsStatus, isIncluded });
  };

  ///////////////////// POS START

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

  ///////////////////// PR START

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

  ///////////////////// RENDER()

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
      pnResults,

      // PT
      ptSettings,
      ptSettingsStatus,
      ptResults,

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
            handleAgeCriteriaMinConChange={this.handleALMinConChange}
            handleAgeCriteriaMaxConChange={this.handleALMaxConChange}
            handleAgeCriteriaChange={this.handleALChange}
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
        return (
          <PNCriteria
            pnSettingsServies={{
              pnSettingsStatus,
              pnResults,
            }}
            handleStatus={this.handlePNStatus}
            handlePNChange={this.handlePNChange}
            handlePNSearch={this.handlePNSearch}
            deleteIconHandler={() =>
              deleteIconHandler(nodeId, cardCode, cardName, isIncluded, payload)
            }
            isAdditionalCriteria={true}
            nodeId={nodeId}
          />
        );
      case 5:
        return (
          <PTCriteria
            ptSettingsServies={{
              ptSettingsStatus,
              ptResults,
            }}
            handleStatus={this.handlePTStatus}
            handlePTChange={this.handlePTChange}
            handlePTSearch={this.handlePTSearch}
            deleteIconHandler={() =>
              deleteIconHandler(nodeId, cardCode, cardName, isIncluded, payload)
            }
            isAdditionalCriteria={true}
            nodeId={nodeId}
          />
        );
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
