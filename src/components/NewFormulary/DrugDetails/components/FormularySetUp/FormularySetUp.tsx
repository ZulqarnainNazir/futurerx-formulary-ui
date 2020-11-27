import React from "react";
import "./FormularySetUp.scss";
import GeneralInformation from "./components/GeneralInformation";
import FormularyDesign from "./components/FormularyDesign";
import FormularyTiers from "./components/FormularyTiers";

export default class FormularySetUp extends React.Component<any, any> {
  render() {
    return(
      <div>
        <GeneralInformation />
        <FormularyDesign />
        <FormularyTiers />
      </div>
    );
     
  };
}
