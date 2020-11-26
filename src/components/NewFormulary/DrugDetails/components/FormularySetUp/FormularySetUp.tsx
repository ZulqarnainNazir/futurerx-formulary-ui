import React from "react";
import "./FormularySetUp.scss";
import GeneralInformation from "./components/GeneralInformation";
import FormularyDesign from "./components/FormularyDesign";

export default class FormularySetUp extends React.Component<any, any> {
  render() {
    return(
      <div>
        <GeneralInformation />
        <FormularyDesign />
      </div>
    );
     
  };
}
