import React, { Component } from "react";

import { ReactComponent as SwapIcon } from "../../../../assets/icons/SwapIcon.svg";
import "./AdditionalCriteriaContainer.scss";
import { connect } from "react-redux";
import { getDrugDetailsPOSSettings } from "../../../../redux/slices/formulary/drugDetails/pos/posActionCreation";
import { getDrugDetailsPRSettings } from "../../../../redux/slices/formulary/drugDetails/pr/prActionCreation";

import { setAdditionalCriteria } from "../../../../redux/slices/formulary/advancedSearch/additionalCriteriaSlice";
import AdditionalCriteria from "../AdditionalCriteriaContainer/AdditionalCriteria/AdditionalCriteria";

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
    isNewAdditionalCriteria: state?.additionalCriteria?.isNewAdditionalCriteria,
    populateGrid: state?.additionalCriteria?.populateGrid,
    closeDialog: state?.additionalCriteria?.closeDialog,
    listItemStatus: state?.additionalCriteria?.listItemStatus,

    formulary_id: state?.application?.formulary_id,
    formulary: state?.application?.formulary,
    formulary_lob_id: state?.application?.formulary_lob_id,
    formulary_type_id: state?.application?.formulary_type_id,
  };
};
class AdditionalCriteriaContainer extends Component<any, any> {
  state = {
    accordionId: 1,
    isNewAdditionalCriteria: false,
    additionalCriteriaArray: [],
  };

  componentDidMount() {
    if (this.props.additionalCriteriaBody <= 0)
      this.setState({
        isNewAdditionalCriteria: true,
      });

    if (this.props.additionalCriteriaBody)
      this.setState({
        additionalCriteriaArray: this.props.additionalCriteriaBody,
      });
  }

  handleChildDataSave = (additionalCriteria) => {
    console.log("Final saved object: ", additionalCriteria);

    // const additionalCriteriaArray = [additionalCriteria];
    // this.setState(
    //   {
    //     additionalCriteriaArray,
    //   },
    //   () => this.props.handleChildDataSave(this.state.additionalCriteriaArray)
    // );
    let additionalCriteriaArray: any[] = [
      ...this.state.additionalCriteriaArray,
    ];
    let index = 0;
    additionalCriteriaArray.forEach((s, i) => {
      if (s["sequence"] === additionalCriteria["sequence"]) {
        index = i;
      }
    });
    additionalCriteriaArray[index] = additionalCriteria;
    this.setState(
      {
        additionalCriteriaArray,
      },
      () => this.props.handleChildDataSave(this.state.additionalCriteriaArray)
    );
  };

  render() {
    const { criteriaList } = this.props;
    return (
      <div className="__root-additional-criteria">
        {this.state.additionalCriteriaArray &&
          this.state.additionalCriteriaArray.map((additionalCriteria) => (
            <div className="__root-additional-criteria-child">
              <SwapIcon className="__root-additional-criteria-child-swapper" />
              <div className="__root-additional-criteria-child-accordion">
                <AdditionalCriteria
                  criteriaList={criteriaList}
                  additionalCriteria={additionalCriteria}
                  handleChildDataSave={this.handleChildDataSave}
                />
              </div>
            </div>
          ))}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdditionalCriteriaContainer);
