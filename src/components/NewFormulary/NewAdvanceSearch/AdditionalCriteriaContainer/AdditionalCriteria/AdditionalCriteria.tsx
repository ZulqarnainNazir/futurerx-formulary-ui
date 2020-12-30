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
import Button from "../../../../shared/Frx-components/button/Button";
import { render } from "@testing-library/react";
import ListItem from "../ListItem/ListItem";
import { setAdditionalCriteria } from "../../../../../redux/slices/formulary/advancedSearch/additionalCriteriaSlice";

class AdditionalCriteria extends Component<any, any> {
  state = {
    additionalCriteriaNodeId: 1,

    selectedCriteriaId: 0,
    selectedCriteriaList: Array(),

    nodeList: Array(),
    globalCardCount: 0,

    additionalCriteriaObject: [],
    apiAdditionalCriteriaIndex: 0,
    apiAdditionalCriteriaState: {
      sequence: 0,
      covered: {},
      not_covered: {},
    },
  };

  componentDidMount() {
    if (
      this.props.additionalCriteriaObject &&
      this.props.additionalCriteriaBody
    ) {
      const additionalCriteriaObject = this.props.additionalCriteriaObject[
        this.state.additionalCriteriaNodeId
      ];
      const additionalCriteriaBody = this.props.additionalCriteriaBody[
        this.state.apiAdditionalCriteriaIndex
      ];
      this.loadSavedSettings(additionalCriteriaObject, additionalCriteriaBody);

      this.setState({
        additionalCriteriaObject,
        additionalCriteriaBody,
      });
    }
  }

  componentWillReceiveProps(nextProps) {}

  loadSavedSettings = (additionalCriteriaState, additionalCriteriaBody) => {
    let savedCriteriaList: any[] = [];
    let currentNode: any;
    let globalCardCount = 0;

    console.log("Additional Criteria Body: ", additionalCriteriaBody);

    for (const prop in additionalCriteriaState) {
      let nodeId = additionalCriteriaState[prop].nodeId;

      let isIncluded = additionalCriteriaState[prop].posStatus.covered;
      let cardCode = additionalCriteriaState[prop].card.cardCode;

      this.state.nodeList.push({
        id: nodeId,
        cardCode: additionalCriteriaState[prop].card.cardCode,
        cardName: additionalCriteriaState[prop].card.cardName,
        isIncluded: isIncluded,
        childData: {},
      });

      currentNode = {
        id: nodeId,
        cardCode: additionalCriteriaState[prop].card.cardCode,
        cardName: additionalCriteriaState[prop].card.cardName,
        isIncluded: isIncluded,
        render: (
          <ListItem
            nodeId={nodeId}
            deleteIconHandler={this.deleteIconHandler}
            card={{
              cardCode: additionalCriteriaState[prop].card.cardCode,
              cardName: additionalCriteriaState[prop].card.cardName,
              isIncluded: isIncluded,
            }}
            initialGlobalState={additionalCriteriaState}
            initialState={additionalCriteriaState[prop]}
            payload={additionalCriteriaBody}
            handleGlobalState={this.handleAllNodesState}
          />
        ),
      };
      savedCriteriaList.push(currentNode);
      globalCardCount++;
    }
    this.setState({
      globalCardCount: globalCardCount,
      selectedCriteriaList: savedCriteriaList,
    });
  };

  setNodes = (cardName, cardCode, payload, filteredList) => {
    let globalCardCount = this.state.globalCardCount;
    let isIncluded = true;
    globalCardCount++;
    if (filteredList.length === 1) {
      const currentCard = filteredList[0];
      isIncluded = !currentCard.isIncluded;
    }
    if (filteredList.length <= 1) {
      payload.listItemStatus[globalCardCount] = isIncluded;
      this.state.nodeList.push({
        id: globalCardCount,
        cardCode: cardCode,
        cardName: cardName,
        isIncluded: isIncluded,
        childData: {},
      });
      this.props.setAdditionalCriteria(payload);
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
                initialGlobalState={this.state.additionalCriteriaObject}
                initialState={null}
                handleGlobalState={this.handleAllNodesState}
              />
            ),
          },
        ],
      });
    }
  };

  deleteIconHandler = (nodeId) => {
    const selectedCriteriaList = this.state.selectedCriteriaList.filter(
      (item) => item.id !== nodeId
    );
    const nodeList = this.state.nodeList.filter((item) => item.id !== nodeId);

    const additionalCriteriaObject: any = this.state.additionalCriteriaObject[
      nodeId
    ];

    let updatedApiAdditionalCriteriaState: any = {};

    switch (additionalCriteriaObject.card.cardCode) {
      case 2:
        if (additionalCriteriaObject.glStatus.covered) {
          let place_of_services = [];
          updatedApiAdditionalCriteriaState = {
            sequence: this.state.additionalCriteriaNodeId,
            covered: {
              ...this.state.apiAdditionalCriteriaState.covered,
              place_of_services: place_of_services,
            },
            not_covered: {
              ...this.state.apiAdditionalCriteriaState.not_covered,
            },
          };
        } else {
          let place_of_services = [];
          updatedApiAdditionalCriteriaState = {
            sequence: this.state.additionalCriteriaNodeId,
            covered: {
              ...this.state.apiAdditionalCriteriaState.covered,
            },
            not_covered: {
              place_of_services: place_of_services,
              ...this.state.apiAdditionalCriteriaState.not_covered,
            },
          };
        }
        break;

      case 6:
        if (additionalCriteriaObject.posStatus.covered) {
          let place_of_services = [];
          updatedApiAdditionalCriteriaState = {
            sequence: this.state.additionalCriteriaNodeId,
            covered: {
              ...this.state.apiAdditionalCriteriaState.covered,
              place_of_services: place_of_services,
            },
            not_covered: {
              ...this.state.apiAdditionalCriteriaState.not_covered,
            },
          };
        } else {
          let place_of_services = [];
          updatedApiAdditionalCriteriaState = {
            sequence: this.state.additionalCriteriaNodeId,
            covered: {
              ...this.state.apiAdditionalCriteriaState.covered,
            },
            not_covered: {
              place_of_services: place_of_services,
              ...this.state.apiAdditionalCriteriaState.not_covered,
            },
          };
        }
        break;

      case 7:
        if (additionalCriteriaObject.prStatus.covered) {
          let place_of_services = [];
          updatedApiAdditionalCriteriaState = {
            sequence: this.state.additionalCriteriaNodeId,
            covered: {
              ...this.state.apiAdditionalCriteriaState.covered,
              place_of_services: place_of_services,
            },
            not_covered: {
              ...this.state.apiAdditionalCriteriaState.not_covered,
            },
          };
        } else {
          let place_of_services = [];
          updatedApiAdditionalCriteriaState = {
            sequence: this.state.additionalCriteriaNodeId,
            covered: {
              ...this.state.apiAdditionalCriteriaState.covered,
            },
            not_covered: {
              place_of_services: place_of_services,
              ...this.state.apiAdditionalCriteriaState.not_covered,
            },
          };
        }
        break;

      default:
        break;
    }

    delete this.state.additionalCriteriaObject[nodeId];

    this.setState(
      {
        selectedCriteriaList,
        nodeList,
        additionalCriteriaObject: this.state.additionalCriteriaObject,
        apiAdditionalCriteriaState: updatedApiAdditionalCriteriaState,
      },
      () => this.setCurrentCriteriaState()
    );
  };

  clearCurrentCriteriaState = () => {
    let payload = {
      additionalCriteriaObject: null,
      additionalCriteriaBody: null,
      populateGrid: this.props.populateGrid,
      closeDialog: this.props.closeDialog,
      listItemStatus: null,
    };

    const apiAdditionalCriteriaState = {
      sequence: 0,
      covered: {},
      not_covered: {},
    };

    this.setState({
      globalCardCount: 0,
      additionalCriteriaObject: null,
      apiAdditionalCriteriaState: null,
      selectedCriteriaList: [],
      nodeList: [],
    });
    this.props.setAdditionalCriteria(payload);
  };

  handleAllNodesState = (updatedNode) => {
    const nodeId = updatedNode.nodeId;
    const { additionalCriteriaNodeId } = this.state;

    const cardCode = updatedNode.card.cardCode;

    let covered: any = Object.assign(
      {},
      this.state.apiAdditionalCriteriaState.covered
    );
    let not_covered: any = Object.assign(
      {},
      this.state.apiAdditionalCriteriaState.not_covered
    );
    Object.preventExtensions(covered);
    Object.preventExtensions(not_covered);
    switch (cardCode) {
      case 2:
        if (updatedNode.posStatus.covered) {
          const place_of_services: number[] = [];
          updatedNode.posSettings.forEach((s) => {
            if (s.isChecked) {
              place_of_services.push(s.id_place_of_service_type);
            }
          });
          covered = Object.assign(
            JSON.parse(
              JSON.stringify(this.state.apiAdditionalCriteriaState.covered)
            ),
            JSON.parse(
              JSON.stringify({
                place_of_services: place_of_services,
              })
            )
          );
          not_covered = Object.assign(
            JSON.parse(
              JSON.stringify(this.state.apiAdditionalCriteriaState.not_covered)
            ),
            JSON.parse(JSON.stringify({ place_of_services: [] }))
          );
        } else {
          const place_of_services: number[] = [];
          updatedNode.posSettings.forEach((s) => {
            if (s.isChecked) {
              place_of_services.push(s.id_place_of_service_type);
            }
          });
          not_covered = Object.assign(
            JSON.parse(
              JSON.stringify(this.state.apiAdditionalCriteriaState.not_covered)
            ),
            JSON.parse(
              JSON.stringify({
                place_of_services: place_of_services,
              })
            )
          );
          covered = Object.assign(
            JSON.parse(
              JSON.stringify(this.state.apiAdditionalCriteriaState.covered)
            ),
            JSON.parse(JSON.stringify({ place_of_services: [] }))
          );
        }
        break;
      case 6:
        if (updatedNode.posStatus.covered) {
          const place_of_services: number[] = [];
          updatedNode.posSettings.forEach((s) => {
            if (s.isChecked) {
              place_of_services.push(s.id_place_of_service_type);
            }
          });
          covered = Object.assign(
            JSON.parse(
              JSON.stringify(this.state.apiAdditionalCriteriaState.covered)
            ),
            JSON.parse(
              JSON.stringify({
                place_of_services: place_of_services,
              })
            )
          );
          not_covered = Object.assign(
            JSON.parse(
              JSON.stringify(this.state.apiAdditionalCriteriaState.not_covered)
            ),
            JSON.parse(JSON.stringify({ place_of_services: [] }))
          );
        } else {
          const place_of_services: number[] = [];
          updatedNode.posSettings.forEach((s) => {
            if (s.isChecked) {
              place_of_services.push(s.id_place_of_service_type);
            }
          });
          not_covered = Object.assign(
            JSON.parse(
              JSON.stringify(this.state.apiAdditionalCriteriaState.not_covered)
            ),
            JSON.parse(
              JSON.stringify({
                place_of_services: place_of_services,
              })
            )
          );
          covered = Object.assign(
            JSON.parse(
              JSON.stringify(this.state.apiAdditionalCriteriaState.covered)
            ),
            JSON.parse(JSON.stringify({ place_of_services: [] }))
          );
        }
        break;
      case 7:
        if (updatedNode.prStatus.covered) {
          const patient_residences: number[] = [];
          updatedNode.prSettings.forEach((s) => {
            if (s.isChecked) {
              patient_residences.push(s.id_patient_residence_type);
            }
          });
          covered = Object.assign(
            JSON.parse(
              JSON.stringify(this.state.apiAdditionalCriteriaState.covered)
            ),
            JSON.parse(
              JSON.stringify({ patient_residences: patient_residences })
            )
          );
          not_covered = Object.assign(
            JSON.parse(
              JSON.stringify(this.state.apiAdditionalCriteriaState.not_covered)
            ),
            JSON.parse(JSON.stringify({ patient_residences: [] }))
          );
        } else {
          const patient_residences: number[] = [];
          updatedNode.prSettings.forEach((s) => {
            if (s.isChecked) {
              patient_residences.push(s.id_patient_residence_type);
            }
          });
          not_covered = Object.assign(
            JSON.parse(
              JSON.stringify(this.state.apiAdditionalCriteriaState.not_covered)
            ),
            JSON.parse(
              JSON.stringify({ patient_residences: patient_residences })
            )
          );
          covered = Object.assign(
            JSON.parse(
              JSON.stringify(this.state.apiAdditionalCriteriaState.covered)
            ),
            JSON.parse(JSON.stringify({ patient_residences: [] }))
          );
        }

        break;
      default:
        break;
    }

    this.setState(
      {
        additionalCriteriaObject: {
          ...this.state.additionalCriteriaObject,
          [nodeId]: updatedNode,
        },
        apiAdditionalCriteriaState: {
          sequence: additionalCriteriaNodeId,
          covered: covered,
          not_covered: not_covered,
        },
      },
      () => console.log(this.state)
    );
  };

  setCurrentCriteriaState = () => {
    const { additionalCriteriaNodeId } = this.state;
    const additionalCriteriaObject: any = this.state.additionalCriteriaObject;
    let apiAdditionalCriteriaState: any = [
      {
        ...this.state.apiAdditionalCriteriaState,
      },
    ];

    let payload = {
      additionalCriteriaObject: this.props.additionalCriteriaObject,
      additionalCriteriaBody: this.props.additionalCriteriaBody,
      populateGrid: this.props.populateGrid,
      closeDialog: this.props.closeDialog,
      listItemStatus: { ...this.props.listItemStatus },
    };

    payload.additionalCriteriaObject = {
      [additionalCriteriaNodeId]: additionalCriteriaObject,
    };

    payload.additionalCriteriaBody = apiAdditionalCriteriaState;

    this.props.setAdditionalCriteria(payload);
  };

  onCriteriaSelect = (cardCode) => {
    this.setState({
      selectedCriteriaId: cardCode,
    });

    let isFound = false;
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
        cardName = "AGE";
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
                />
              ),
            },
          ],
        });
        break;
      case 2:
        filteredList = this.state.selectedCriteriaList.filter(
          (card) => card.cardCode === cardCode
        );
        cardName = "GENDER";
        this.setNodes(cardName, cardCode, payload, filteredList);

        break;
      case 3:
        cardName = "ICD";
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
                />
              ),
            },
          ],
        });
        break;
      case 4:
        cardName = "PN";
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
                />
              ),
            },
          ],
        });
        break;
      case 5:
        cardName = "PN";
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
        cardName = "POS";
        this.setNodes(cardName, cardCode, payload, filteredList);

        break;
      case 7:
        filteredList = this.state.selectedCriteriaList.filter(
          (card) => card.cardCode === cardCode
        );
        cardName = "PR";
        this.setNodes(cardName, cardCode, payload, filteredList);

        break;
      case 8:
        cardName = "PCHL";
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
    const { additionalCriteriaNodeId, selectedCriteriaList } = this.state;
    const { criteriaList } = this.props;

    return (
      <div className="__root-additional-criteria-child-accordion-section">
        <CustomAccordion
          name={`Additional Criteria ${additionalCriteriaNodeId}`}
        >
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
                  label="Clear"
                  onClick={this.clearCurrentCriteriaState}
                />
                <Button label="Save" onClick={this.setCurrentCriteriaState} />
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
