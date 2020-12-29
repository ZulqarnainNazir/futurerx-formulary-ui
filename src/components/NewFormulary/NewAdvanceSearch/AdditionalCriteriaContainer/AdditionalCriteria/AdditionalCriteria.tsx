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
    apiAdditionalCriteriaState: {
      sequence: 0,
      covered: {},
      not_covered: {},
    },
  };

  componentDidMount() {
    console.log("ADDITIONAL CRITERIA: ", this.props.additionalCriteriaObject);

    if (this.props.additionalCriteriaObject) {
      const additionalCriteriaObject = this.props.additionalCriteriaObject[
        this.state.additionalCriteriaNodeId
      ];

      this.loadSavedSettings(additionalCriteriaObject);

      this.setState({
        additionalCriteriaObject,
      });
    }
  }

  componentWillReceiveProps(nextProps) {}

  // handleStatusChange = (nodeId, card) => {};
  loadSavedSettings = (additionalCriteriaState) => {
    // let updatedAdditionalCriteriaState;
    let savedCriteriaList: any[] = [];
    let currentNode: any;
    let globalCardCount = 0;
    for (const prop in additionalCriteriaState) {
      // console.log(`obj.${prop} = ${additionalCriteriaState[prop]}`);
      console.log(`obj.${prop} =`, additionalCriteriaState[prop]);

      // let globalCardCount = this.state.globalCardCount;
      let nodeId = additionalCriteriaState[prop].nodeId;
      let isIncluded = additionalCriteriaState[prop].card.isIncluded;
      // globalCardCount++;
      // if (filteredList.length === 1) {
      //   const currentCard = filteredList[0];
      //   isIncluded = !currentCard.isIncluded;
      // }
      // if (filteredList.length <= 1) {
      // payload.listItemStatus[globalCardCount] = isIncluded;
      this.state.nodeList.push({
        id: nodeId,
        // cardCode: cardCode,
        // cardName: cardName,
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
            handleGlobalState={this.handleAllNodesState}
          />
        ),
      };
      savedCriteriaList.push(currentNode);
      globalCardCount++;
      // this.props.setAdditionalCriteria(payload);
      // }
    }
    this.setState({
      globalCardCount: globalCardCount,
      selectedCriteriaList: savedCriteriaList,
      // [
      //   // ...this.state.selectedCriteriaList,
      //   savedCriteriaList,
      // ],
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

    delete this.state.additionalCriteriaObject[nodeId];

    this.setState(
      {
        selectedCriteriaList,
        nodeList,
        additionalCriteriaObject: this.state.additionalCriteriaObject,
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
      selectedCriteriaList: [],
      nodeList: [],
    });
    this.props.setAdditionalCriteria(payload);
  };

  handleAllNodesState = (updatedNode) => {
    const nodeId = updatedNode.nodeId;
    // const additionalCriteriaState = this.state.additionalCriteriaState.filter(
    //   (criteria: any) => criteria.nodeId !== nodeId
    // );

    // const additionalCriteriaState = this.state.additionalCriteriaState[nodeId];

    this.setState({
      additionalCriteriaObject: {
        ...this.state.additionalCriteriaObject,
        [nodeId]: updatedNode,
      },
    });
  };

  setCurrentCriteriaState = () => {
    const { additionalCriteriaNodeId, additionalCriteriaObject } = this.state;
    let payload = {
      additionalCriteriaObject: this.props.additionalCriteriaObject,
      additionalCriteriaBody: this.props.additionalCriteriaBody,
      populateGrid: this.props.populateGrid,
      closeDialog: this.props.closeDialog,
      listItemStatus: { ...this.props.listItemStatus },
    };

    // payload.listItemStatus[this.state.globalCardCount] = isIncluded;

    payload.additionalCriteriaObject = {
      [additionalCriteriaNodeId]: additionalCriteriaObject,
    };

    const apiAdditionalCriteriaState = {
      sequence: 0,
      covered: {},
      not_covered: {},
    };

    // payload.additionalCriteriaBody = {};
    // [
    // { 1: this.state.additionalCriteriaState },
    // ];
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
      // listItemStatus: Object.assign({}, this.props.listItemStatus),
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
                />
              ),
            },
          ],
        });
        break;
      case 2:
        cardName = "GENDER";
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
                />
              ),
            },
          ],
        });
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
        cardName = "PR";
        this.setState({
          selectedCriteriaList: [
            ...this.state.selectedCriteriaList,
            {
              id: null,
              cardCode: cardCode,
              name: cardName,
              render: (
                <ListItem
                  // cardCode={cardCode}
                  deleteIconHandler={this.deleteIconHandler}
                  card={{
                    cardName: cardName,
                    cardCode: cardCode,
                    // isIncluded: isIncluded,
                  }}
                  initialState={null}
                />
              ),
            },
          ],
        });
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
