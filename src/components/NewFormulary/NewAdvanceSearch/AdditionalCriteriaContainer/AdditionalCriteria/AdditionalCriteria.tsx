import React, { Component } from "react";
import CustomAccordion from "../../../../shared/Frx-components/accordion/CustomAccordion";

import {
  POS_SETTINGS_LIST,
  PR_SETTINGS_LIST,
} from "../../../../../api/http-commons";

import { ReactComponent as TiltCrossIcon } from "../../../../../assets/icons/TiltCrossIcon.svg";
import { ReactComponent as SwapIcon } from "../../../../../assets/icons/SwapIcon.svg";
import PosSettings from "../../../DrugDetails/components/POS/PosSettings";
import { connect } from "react-redux";
import { getDrugDetailsPOSSettings } from "../../../../../redux/slices/formulary/drugDetails/pos/posActionCreation";
import { getDrugDetailsPRSettings } from "../../../../../redux/slices/formulary/drugDetails/pr/prActionCreation";
import { render } from "@testing-library/react";
import ListItem from "../ListItem/ListItem";
import { setAdditionalCriteria } from "../../../../../redux/slices/formulary/advancedSearch/additionalCriteriaSlice";
import { ReactComponent as ClearIcon } from "../../../../../assets/icons/clearcircle.svg";
import * as _ from "lodash";
import { Button } from "@material-ui/core";

// const hiddenColumns = _.cloneDeep(this.props.hiddenColumns);
interface PayloadBody {
  age: any;
  gender: string[];
  icd: any;
  pharmacy_networks: any | any[];
  prescriber_taxonomies: any | any[];
  place_of_services: any | any[];
  patient_residences: any | any[];
  prerequisite_claims_history_lookbacks: any | any[];
  removed_icds: any | any[];
  removed_pharmacy_networks: any | any[];
  removed_place_of_service: any | any[];
  removed_patient_residence: any | any[];
  removed_prescriber_taxonomy: any | any[];
}
interface AdditionalCriteriaPayload {
  sequence: number;
  covered: PayloadBody;
  not_covered: PayloadBody;
}

interface AdditionalCriteriaState {
  additionalCriteriaNodeId: number;

  selectedCriteriaId: number;
  selectedCriteriaList: any[];

  nodeList: any[];
  globalCardCount: number;

  additionalCriteriaObject: any[];
  apiAdditionalCriteriaState: AdditionalCriteriaPayload;
}

interface AdditionalCriteriaProp {
  additionalCriteria: AdditionalCriteriaPayload;
}

class AdditionalCriteria extends Component<any, any> {
  // <
  // AdditionalCriteriaProp,
  // AdditionalCriteriaState
  // >
  state = {
    additionalCriteriaNodeId: 1,

    selectedCriteriaId: 0,
    selectedCriteriaList: Array(),

    // nodeList: Array(),
    globalCardCount: 0,

    additionalCriteriaObject: [],
    apiAdditionalCriteriaState: {
      sequence: 0,
      covered: {},
      not_covered: {},
    },

    deletedCache: [],
    clearCache: [],
    globalCardCountCache: 0,

    criteriaMock: [
      {
        cardCode: 1,
        cardName: "age",
        isIncluded: true,
      },
      {
        cardCode: 2,
        cardName: "gender",
        isIncluded: true,
      },
      {
        cardCode: 3,
        cardName: "icd",
        isIncluded: true,
      },
      {
        cardCode: 4,
        cardName: "pharmacy_networks",
        isIncluded: true,
      },
      {
        cardCode: 5,
        cardName: "prescriber_taxonomies",
        isIncluded: true,
      },
      {
        cardCode: 6,
        cardName: "place_of_services",
        isIncluded: true,
      },
      {
        cardCode: 7,
        cardName: "patient_residences",
        isIncluded: true,
      },
      {
        cardCode: 8,
        cardName: "prerequisite_claims_history_lookbacks",
        isIncluded: true,
      },
    ],
  };

  componentDidMount() {
    if (this.props.additionalCriteria) {
      this.loadSavedSettings(this.props.additionalCriteria);

      this.setState({
        additionalCriteriaBody: this.props.additionalCriteria,
      });
    }
  }

  componentWillReceiveProps(nextProps) {}

  loadSavedSettings = (additionalCriteriaBody) => {
    let savedCriteriaList: any[] = [];
    let globalCardCount = 0;

    let sequence;
    let covered;
    let not_covered;

    const { criteriaMock } = this.state;

    if (
      additionalCriteriaBody.covered !== {} &&
      additionalCriteriaBody.not_covered !== {}
    ) {
      for (const prop in additionalCriteriaBody) {
        if (
          Object.prototype.hasOwnProperty.call(
            additionalCriteriaBody,
            "sequence"
          ) &&
          prop === "sequence"
        ) {
          sequence = additionalCriteriaBody[prop];
        }

        if (
          Object.prototype.hasOwnProperty.call(
            additionalCriteriaBody,
            "covered"
          ) &&
          prop === "covered"
        ) {
          covered = additionalCriteriaBody[prop];
          if (Object.prototype.hasOwnProperty.call(covered, "age")) {
            if (
              covered["age"]["min_age_condition"] !== "" &&
              covered["age"]["max_age_condition"] !== ""
            ) {
              globalCardCount++;
              let currentNode = {
                id: globalCardCount,
                cardCode: criteriaMock[0].cardCode,
                cardName: criteriaMock[0].cardName,
                isIncluded: criteriaMock[0].isIncluded,
                render: (
                  <ListItem
                    nodeId={globalCardCount}
                    deleteIconHandler={this.deleteIconHandler}
                    card={{
                      cardCode: criteriaMock[0].cardCode,
                      cardName: criteriaMock[0].cardName,
                      isIncluded: criteriaMock[0].isIncluded,
                    }}
                    payload={covered["age"]}
                    handleGlobalState={this.handleAllNodesState}
                  />
                ),
              };
              savedCriteriaList.push(currentNode);
            }
          }
          if (Object.prototype.hasOwnProperty.call(covered, "gender")) {
            if (covered["gender"].length > 0) {
              globalCardCount++;
              let currentNode = {
                id: globalCardCount,
                cardCode: criteriaMock[1].cardCode,
                cardName: criteriaMock[1].cardName,
                isIncluded: criteriaMock[1].isIncluded,
                render: (
                  <ListItem
                    nodeId={globalCardCount}
                    deleteIconHandler={this.deleteIconHandler}
                    card={{
                      cardCode: criteriaMock[1].cardCode,
                      cardName: criteriaMock[1].cardName,
                      isIncluded: criteriaMock[1].isIncluded,
                    }}
                    payload={covered["gender"]}
                    handleGlobalState={this.handleAllNodesState}
                  />
                ),
              };
              savedCriteriaList.push(currentNode);
            }
          }
          if (Object.prototype.hasOwnProperty.call(covered, "icd")) {
            if (
              covered["icd"]["look_back_days"] !== ""
              // (covered["icd"]["icds"] !== "" ||
              //   covered["icd"]["icds"].length > 0)
            ) {
              globalCardCount++;
              let currentNode = {
                id: globalCardCount,
                cardCode: criteriaMock[2].cardCode,
                cardName: criteriaMock[2].cardName,
                isIncluded: criteriaMock[2].isIncluded,
                render: (
                  <ListItem
                    nodeId={globalCardCount}
                    deleteIconHandler={this.deleteIconHandler}
                    card={{
                      cardCode: criteriaMock[2].cardCode,
                      cardName: criteriaMock[2].cardName,
                      isIncluded: criteriaMock[2].isIncluded,
                    }}
                    payload={covered["icd"]}
                    handleGlobalState={this.handleAllNodesState}
                  />
                ),
              };
              savedCriteriaList.push(currentNode);
            }
          }
          if (
            Object.prototype.hasOwnProperty.call(covered, "place_of_services")
          ) {
            if (covered["place_of_services"].length > 0) {
              globalCardCount++;
              let currentNode = {
                id: globalCardCount,
                cardCode: criteriaMock[5].cardCode,
                cardName: criteriaMock[5].cardName,
                isIncluded: criteriaMock[5].isIncluded,
                render: (
                  <ListItem
                    nodeId={globalCardCount}
                    deleteIconHandler={this.deleteIconHandler}
                    card={{
                      cardCode: criteriaMock[5].cardCode,
                      cardName: criteriaMock[5].cardName,
                      isIncluded: criteriaMock[5].isIncluded,
                    }}
                    payload={covered["place_of_services"]}
                    handleGlobalState={this.handleAllNodesState}
                  />
                ),
              };
              savedCriteriaList.push(currentNode);
            }
          }
          if (
            Object.prototype.hasOwnProperty.call(covered, "patient_residences")
          ) {
            if (covered["patient_residences"].length > 0) {
              globalCardCount++;
              let currentNode = {
                id: globalCardCount,
                cardCode: criteriaMock[6].cardCode,
                cardName: criteriaMock[6].cardName,
                isIncluded: criteriaMock[6].isIncluded,
                render: (
                  <ListItem
                    nodeId={globalCardCount}
                    deleteIconHandler={this.deleteIconHandler}
                    card={{
                      cardCode: criteriaMock[6].cardCode,
                      cardName: criteriaMock[6].cardName,
                      isIncluded: criteriaMock[6].isIncluded,
                    }}
                    payload={covered["patient_residences"]}
                    handleGlobalState={this.handleAllNodesState}
                  />
                ),
              };
              savedCriteriaList.push(currentNode);
            }
          }
        }

        if (
          Object.prototype.hasOwnProperty.call(
            additionalCriteriaBody,
            "not_covered"
          ) &&
          prop === "not_covered"
        ) {
          not_covered = additionalCriteriaBody[prop];
          if (Object.prototype.hasOwnProperty.call(not_covered, "age")) {
            if (
              not_covered["age"]["min_age_condition"] !== "" &&
              not_covered["age"]["max_age_condition"] !== ""
            ) {
              globalCardCount++;
              let currentNode = {
                id: globalCardCount,
                cardCode: criteriaMock[0].cardCode,
                cardName: criteriaMock[0].cardName,
                isIncluded: !criteriaMock[0].isIncluded,
                render: (
                  <ListItem
                    nodeId={globalCardCount}
                    deleteIconHandler={this.deleteIconHandler}
                    card={{
                      cardCode: criteriaMock[0].cardCode,
                      cardName: criteriaMock[0].cardName,
                      isIncluded: !criteriaMock[0].isIncluded,
                    }}
                    payload={not_covered["age"]}
                    handleGlobalState={this.handleAllNodesState}
                  />
                ),
              };
              savedCriteriaList.push(currentNode);
            }
          }
          if (Object.prototype.hasOwnProperty.call(not_covered, "gender")) {
            if (not_covered["gender"].length > 0) {
              globalCardCount++;
              let currentNode = {
                id: globalCardCount,
                cardCode: criteriaMock[1].cardCode,
                cardName: criteriaMock[1].cardName,
                isIncluded: !criteriaMock[1].isIncluded,
                render: (
                  <ListItem
                    nodeId={globalCardCount}
                    deleteIconHandler={this.deleteIconHandler}
                    card={{
                      cardCode: criteriaMock[1].cardCode,
                      cardName: criteriaMock[1].cardName,
                      isIncluded: !criteriaMock[1].isIncluded,
                    }}
                    payload={not_covered["gender"]}
                    handleGlobalState={this.handleAllNodesState}
                  />
                ),
              };
              savedCriteriaList.push(currentNode);
            }
          }
          if (Object.prototype.hasOwnProperty.call(not_covered, "icd")) {
            if (
              not_covered["icd"]["look_back_days"] !== ""
              // (not_covered["icd"]["icds"] !== "" ||
              //   not_covered["icd"]["icds"].length > 0)
            ) {
              globalCardCount++;
              let currentNode = {
                id: globalCardCount,
                cardCode: criteriaMock[2].cardCode,
                cardName: criteriaMock[2].cardName,
                isIncluded: !criteriaMock[2].isIncluded,
                render: (
                  <ListItem
                    nodeId={globalCardCount}
                    deleteIconHandler={this.deleteIconHandler}
                    card={{
                      cardCode: criteriaMock[2].cardCode,
                      cardName: criteriaMock[2].cardName,
                      isIncluded: !criteriaMock[2].isIncluded,
                    }}
                    payload={not_covered["icd"]}
                    handleGlobalState={this.handleAllNodesState}
                  />
                ),
              };
              savedCriteriaList.push(currentNode);
            }
          }
          if (
            Object.prototype.hasOwnProperty.call(
              not_covered,
              "place_of_services"
            )
          ) {
            if (not_covered["place_of_services"].length > 0) {
              globalCardCount++;
              let currentNode = {
                id: globalCardCount,
                cardCode: criteriaMock[5].cardCode,
                cardName: criteriaMock[5].cardName,
                isIncluded: !criteriaMock[5].isIncluded,
                render: (
                  <ListItem
                    nodeId={globalCardCount}
                    deleteIconHandler={this.deleteIconHandler}
                    card={{
                      cardCode: criteriaMock[5].cardCode,
                      cardName: criteriaMock[5].cardName,
                      isIncluded: !criteriaMock[5].isIncluded,
                    }}
                    payload={not_covered["place_of_services"]}
                    handleGlobalState={this.handleAllNodesState}
                  />
                ),
              };
              savedCriteriaList.push(currentNode);
            }
          }
          if (
            Object.prototype.hasOwnProperty.call(
              not_covered,
              "patient_residences"
            )
          ) {
            if (not_covered["patient_residences"].length > 0) {
              globalCardCount++;
              let currentNode = {
                id: globalCardCount,
                cardCode: criteriaMock[6].cardCode,
                cardName: criteriaMock[6].cardName,
                isIncluded: !criteriaMock[6].isIncluded,
                render: (
                  <ListItem
                    nodeId={globalCardCount}
                    deleteIconHandler={this.deleteIconHandler}
                    card={{
                      cardCode: criteriaMock[6].cardCode,
                      cardName: criteriaMock[6].cardName,
                      isIncluded: !criteriaMock[6].isIncluded,
                    }}
                    payload={not_covered["patient_residences"]}
                    handleGlobalState={this.handleAllNodesState}
                  />
                ),
              };
              savedCriteriaList.push(currentNode);
            }
          }
        }
      }
      this.setState({
        globalCardCount: globalCardCount,
        selectedCriteriaList: savedCriteriaList,
        apiAdditionalCriteriaState: {
          sequence: sequence,
          covered: covered,
          not_covered: not_covered,
        },
      });
    }
  };

  setNodes = (cardName, cardCode, filteredList) => {
    let globalCardCount = this.state.globalCardCount;
    let isIncluded = true;
    globalCardCount++;
    if (filteredList.length === 1) {
      const currentCard = filteredList[0];
      isIncluded = !currentCard.isIncluded;
    }
    if (filteredList.length <= 1) {
      this.setState({
        globalCardCount: globalCardCount,
        selectedCriteriaList: [
          ...this.state.selectedCriteriaList,
          {
            id: globalCardCount,
            cardCode: cardCode,
            cardName: cardName,
            isIncluded: isIncluded,
            render: (
              <ListItem
                nodeId={globalCardCount}
                deleteIconHandler={this.deleteIconHandler}
                card={{
                  cardName: cardName,
                  cardCode: cardCode,
                  isIncluded: isIncluded,
                }}
                payload={null}
                handleGlobalState={this.handleAllNodesState}
              />
            ),
          },
        ],
      });
    }
  };

  deleteIconHandler = (nodeId, cardCode, cardName, isIncluded, payload) => {
    const selectedCriteriaList = this.state.selectedCriteriaList.filter(
      (s) => s.id !== nodeId
    );

    const deletedCache = this.state.selectedCriteriaList.filter(
      (s) => s.id === nodeId
    );

    this.setState({
      selectedCriteriaList,
      deletedCache,
    });
  };

  clearCurrentCriteriaState = () => {
    const clearCache = this.state.selectedCriteriaList;
    const globalCardCountCache = this.state.globalCardCount;
    this.setState({
      selectedCriteriaList: [],
      clearCache,
      globalCardCount: 0,
      globalCardCountCache,
    });
  };

  handleAllNodesState = (
    nodeId,
    cardCode,
    cardName,
    isIncluded,
    updatedPayload
  ) => {
    console.log(nodeId, cardCode, cardName, isIncluded, updatedPayload);

    let sequence = this.state.apiAdditionalCriteriaState.sequence;
    let covered = { ...this.state.apiAdditionalCriteriaState.covered };
    let not_covered = { ...this.state.apiAdditionalCriteriaState.not_covered };

    let isSingleNode = true;
    const filteredList = this.state.selectedCriteriaList.filter(
      (card) => card.cardCode === cardCode
    );

    if (filteredList.length === 1) {
      if (filteredList[0].isIncluded !== isIncluded) {
        isSingleNode = true;

        // action for manage include state code
      } else {
        isSingleNode = true;

        // action for manage include state code
      }
    }

    if (filteredList.length === 2) {
      // if (filteredList[0].isIncluded !== isIncluded) {
      // }
      isSingleNode = false;
    }

    if (isIncluded) {
      covered = { ...covered, [cardName]: updatedPayload };
      not_covered = isSingleNode
        ? { ...not_covered, [cardName]: [] }
        : { ...not_covered };
      this.setState({
        apiAdditionalCriteriaState: {
          sequence,
          covered,
          not_covered,
        },
      });
    } else {
      not_covered = { ...not_covered, [cardName]: updatedPayload };
      covered = isSingleNode ? { ...covered, [cardName]: [] } : { ...covered };

      this.setState({
        apiAdditionalCriteriaState: {
          sequence,
          covered,
          not_covered,
        },
      });
    }
  };

  setCurrentCriteriaState = () => {
    // handle deleted & saved elements
    this.props.handleChildDataSave(this.state.apiAdditionalCriteriaState);
  };

  onCriteriaSelect = (cardCode) => {
    this.setState({
      selectedCriteriaId: cardCode,
    });

    const { criteriaMock } = this.state;

    let filteredList = Array();
    let payload = {
      additionalCriteriaObject: this.props.additionalCriteriaObject,
      additionalCriteriaBody: this.props.additionalCriteriaBody,
      populateGrid: this.props.populateGrid,
      closeDialog: this.props.closeDialog,
      listItemStatus: { ...this.props.listItemStatus },
    };
    let cardName = "";

    switch (cardCode) {
      case 1:
        filteredList = this.state.selectedCriteriaList.filter(
          (card) => card.cardCode === cardCode
        );
        cardName = criteriaMock[cardCode - 1].cardName;
        this.setNodes(cardName, cardCode, filteredList);

        break;
      case 2:
        filteredList = this.state.selectedCriteriaList.filter(
          (card) => card.cardCode === cardCode
        );
        cardName = criteriaMock[cardCode - 1].cardName;
        this.setNodes(cardName, cardCode, filteredList);

        break;
      case 3:
        filteredList = this.state.selectedCriteriaList.filter(
          (card) => card.cardCode === cardCode
        );

        cardName = criteriaMock[cardCode - 1].cardName;
        this.setNodes(cardName, cardCode, filteredList);

        break;
      case 4:
        cardName = criteriaMock[cardCode - 1].cardName;
        this.setState({
          selectedCriteriaList: [
            ...this.state.selectedCriteriaList,
            {
              id: null,
              cardCode: cardCode,
              name: cardName,
              render: (
                <ListItem
                  card={{
                    cardName: cardName,
                    cardCode: cardCode,
                    // isIncluded: isIncluded,
                  }}
                  deleteIconHandler={this.deleteIconHandler}
                  initialState={null}
                  payload={null}
                  handleGlobalState={this.handleAllNodesState}
                />
              ),
            },
          ],
        });
        break;
      case 5:
        cardName = criteriaMock[cardCode - 1].cardName;
        this.setState({
          selectedCriteriaList: [
            ...this.state.selectedCriteriaList,
            {
              id: null,
              cardCode: cardCode,
              name: cardName,
              render: (
                <ListItem
                  card={{
                    cardName: cardName,
                    cardCode: cardCode,
                    // isIncluded: isIncluded,
                  }}
                  deleteIconHandler={this.deleteIconHandler}
                  initialState={null}
                  payload={null}
                  handleGlobalState={this.handleAllNodesState}
                />
              ),
            },
          ],
        });
        break;
      case 6:
        filteredList = this.state.selectedCriteriaList.filter(
          (card) => card.cardCode === cardCode
        );
        cardName = criteriaMock[cardCode - 1].cardName;
        this.setNodes(cardName, cardCode, filteredList);

        break;
      case 7:
        filteredList = this.state.selectedCriteriaList.filter(
          (card) => card.cardCode === cardCode
        );
        cardName = criteriaMock[cardCode - 1].cardName;
        this.setNodes(cardName, cardCode, filteredList);

        break;
      case 8:
        cardName = criteriaMock[cardCode - 1].cardName;
        this.setState({
          selectedCriteriaList: [
            ...this.state.selectedCriteriaList,
            {
              id: null,
              cardCode: cardCode,
              name: cardName,
              render: (
                <ListItem
                  card={{
                    cardName: cardName,
                    cardCode: cardCode,
                    // isIncluded: isIncluded,
                  }}
                  deleteIconHandler={this.deleteIconHandler}
                  initialState={null}
                  payload={null}
                  handleGlobalState={this.handleAllNodesState}
                />
              ),
            },
          ],
        });
        break;
      default:
        console.log("default state");
        break;
    }
  };

  render() {
    const { selectedCriteriaList } = this.state;
    const {
      additionalCriteria: { sequence },
      criteriaList,
    } = this.props;

    return (
      <div className="__root-additional-criteria-child-accordion-section">
        <CustomAccordion name={`ADDITIONAL CRITERIA ${sequence}`}>
          <div className="__root-additional-criteria-child-accordion-section-content">
            <div className="__root-additional-criteria-child-accordion-section-content-left">
              <div className="__root-additional-criteria-child-accordion-section-content-left-inner-spacing">
                {criteriaList.map((c) => (
                  <div
                    key={c.id}
                    className="__root-additional-criteria-child-accordion-section-content-left-inner-spacing-flex"
                    draggable="true"
                    onClick={() => this.onCriteriaSelect(c.id)}
                  >
                    <TiltCrossIcon />
                    <label htmlFor="" className="font-styling">
                      {c.criteria}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="__root-additional-criteria-child-accordion-section-content-right">
              <div className="__root-additional-criteria-child-accordion-section-content-right-top scroll-bar">
                {selectedCriteriaList.length === 0 ? (
                  <div className="text-center">
                    <p>
                      Drag the file type(s) from the list on the left to create
                      a filter.
                    </p>
                  </div>
                ) : (
                  selectedCriteriaList.map((criteriaObject, idx) => (
                    <div draggable="true" key={criteriaObject.id}>
                      {criteriaObject["render"]}
                      {/* {selectedCriteriaList[0]["render"]} */}
                    </div>
                  ))
                )}
              </div>
              <div className="__root-additional-criteria-child-accordion-section-content-right-bottom">
                <Button
                  onClick={this.clearCurrentCriteriaState}
                  className="clear-btn"
                >
                  <ClearIcon />
                  <span>Clear</span>
                </Button>
                <Button
                  onClick={this.setCurrentCriteriaState}
                  className="save-btn"
                >
                  <span>Save</span>
                </Button>
              </div>
            </div>
          </div>
        </CustomAccordion>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getPOSSettings: (a) => dispatch(getDrugDetailsPOSSettings(a)),
    getPRSettings: (a) => dispatch(getDrugDetailsPRSettings(a)),

    setAdditionalCriteria: (a) => dispatch(setAdditionalCriteria(a)),
  };
}

const mapStateToProps = (state) => {
  return {
    // additional criteria state

    additionalCriteriaObject:
      state?.additionalCriteria?.additionalCriteriaObject,
    additionalCriteriaBody: state?.additionalCriteria?.additionalCriteriaBody,
    populateGrid: state?.additionalCriteria?.populateGrid,
    closeDialog: state?.additionalCriteria?.closeDialog,
    listItemStatus: state?.additionalCriteria?.listItemStatus,

    formulary_id: state?.application?.formulary_id,
    formulary: state?.application?.formulary,
    formulary_lob_id: state?.application?.formulary_lob_id,
    formulary_type_id: state?.application?.formulary_type_id,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdditionalCriteria);
