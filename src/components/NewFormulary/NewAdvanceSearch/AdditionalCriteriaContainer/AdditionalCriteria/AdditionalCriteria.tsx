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
    accordionId: 1,

    selectedCriteriaId: 0,
    selectedCriteriaList: Array(),

    nodeList: Array(),
    cardCount: 0,
  };

  componentDidMount() {
    console.log("ADDITIONAL CRITERIA: ", this.props.formulary);
  }

  deleteIconHandler = (id) => {
    console.log("delete::icon " + id);
    const selectedCriteriaList = this.state.selectedCriteriaList.filter(
      (item) => item.id !== id
    );
    this.setState({ selectedCriteriaList });
  };

  onCriteriaSelect = (id) => {
    console.log("Criteria: ", id);

    this.setState({
      selectedCriteriaId: id,
    });

    let isFound = false;
    let filteredList = Array();
    let payload = {
      additionalCriteriaBody: this.props.additionalCriteriaBody,
      populateGrid: this.props.populateGrid,
      closeDialog: this.props.closeDialog,
      listItemStatus: Object.assign({}, this.props.listItemStatus),
    };

    switch (id) {
      case 1:
        this.setState({
          selectedCriteriaList: [
            ...this.state.selectedCriteriaList,
            {
              id: id,
              name: "AGE",
              component: (
                <ListItem id={id} deleteIconHandler={this.deleteIconHandler} />
              ),
            },
          ],
        });
        break;
      case 2:
        this.setState({
          selectedCriteriaList: [
            ...this.state.selectedCriteriaList,
            {
              id: id,
              name: "GENDER",
              component: (
                <ListItem id={id} deleteIconHandler={this.deleteIconHandler} />
              ),
            },
          ],
        });
        break;
      case 3:
        this.setState({
          selectedCriteriaList: [
            ...this.state.selectedCriteriaList,
            {
              id: id,
              name: "ICD",
              component: (
                <ListItem id={id} deleteIconHandler={this.deleteIconHandler} />
              ),
            },
          ],
        });
        break;
      case 4:
        this.setState({
          selectedCriteriaList: [
            ...this.state.selectedCriteriaList,
            {
              id: id,
              name: "PN",
              component: (
                <ListItem id={id} deleteIconHandler={this.deleteIconHandler} />
              ),
            },
          ],
        });
        break;
      case 5:
        this.setState({
          selectedCriteriaList: [
            ...this.state.selectedCriteriaList,
            {
              id: id,
              name: "PT",
              component: (
                <ListItem id={id} deleteIconHandler={this.deleteIconHandler} />
              ),
            },
          ],
        });
        break;
      case 6:
        this.setState({
          selectedCriteriaList: [
            ...this.state.selectedCriteriaList,
            {
              id: id,
              name: "POS",
              component: (
                <ListItem id={id} deleteIconHandler={this.deleteIconHandler} />
              ),
            },
          ],
        });
        break;
      case 7:
        this.setState({
          selectedCriteriaList: [
            ...this.state.selectedCriteriaList,
            {
              id: id,
              name: "PR",
              component: (
                <ListItem id={id} deleteIconHandler={this.deleteIconHandler} />
              ),
            },
          ],
        });
        break;
      case 8:
        this.setState({
          selectedCriteriaList: [
            ...this.state.selectedCriteriaList,
            {
              id: id,
              name: "PCHL",
              component: (
                <ListItem id={id} deleteIconHandler={this.deleteIconHandler} />
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
    const { accordionId, selectedCriteriaList } = this.state;
    const { criteriaList } = this.props;

    return (
      <div className="__root-additional-criteria-child-accordion-section">
        <CustomAccordion name={`Additional Criteria ${accordionId}`}>
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
                      {criteriaObject["component"]}
                    </div>
                  ))
                )}
              </div>
              <div className="__root-additional-criteria-child-accordion-section-content-right-bottom">
                <Button label="Clear" />
                <Button label="Save" />
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
