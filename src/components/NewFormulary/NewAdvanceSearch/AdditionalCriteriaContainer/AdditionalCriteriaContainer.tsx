import React, { Component } from "react";
import CustomAccordion from "../../../shared/Frx-components/accordion/CustomAccordion";

import {
  POS_SETTINGS_LIST,
  PR_SETTINGS_LIST,
} from "../../../../api/http-commons";

import { ReactComponent as TiltCrossIcon } from "../../../../assets/icons/TiltCrossIcon.svg";
import { ReactComponent as SwapIcon } from "../../../../assets/icons/SwapIcon.svg";
import PosSettings from "../../DrugDetails/components/POS/PosSettings";
import "./AdditionalCriteriaContainer.scss";
import { connect } from "react-redux";
import { getDrugDetailsPOSSettings } from "../../../../redux/slices/formulary/drugDetails/pos/posActionCreation";
import { getDrugDetailsPRSettings } from "../../../../redux/slices/formulary/drugDetails/pr/prActionCreation";
import Button from "../../../shared/Frx-components/button/Button";
import { render } from "@testing-library/react";
import ListItem from "./ListItem/ListItem";
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

    nodeList: Array(),
    idCount: 0,
  };

  componentDidMount() {}

  render() {
    // const {
    //   posSettings,
    //   posSettingsStatus,
    //   prSettings,
    //   prSettingsStatus,
    //   isSelectAllPOS,
    // } = this.state;
    const { criteriaList } = this.props;
    return (
      <div className="__root-additional-criteria">
        <div className="__root-additional-criteria-child">
          <SwapIcon className="__root-additional-criteria-child-swapper" />
          <div className="__root-additional-criteria-child-accordion">
            <AdditionalCriteria criteriaList={criteriaList} />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdditionalCriteriaContainer);
