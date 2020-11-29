import React from "react";
import "./FormularySetUp.scss";
import GeneralInformation from "./components/GeneralInformation";
import FormularyDesign from "./components/FormularyDesign";
import FormularyTiers from "./components/FormularyTiers";
import MedicareInformation from "./components/MedicareInformation";
import SupplementalModels from "./components/SupplementalModels";
import Box from '@material-ui/core/Box';
import Button from '../../../../shared/Frx-components/button/Button';
export default class FormularySetUp extends React.Component<any, any> {
  render() {
    return(
      <div>
        <GeneralInformation />
        <MedicareInformation/>
        <FormularyDesign />
        <FormularyTiers />
        <SupplementalModels/>
        <div className="btn-action">
          <Box display="flex" justifyContent="flex-end" className="save-btn">
            <Button label="Save" />
          </Box>
          <Box display="flex" justifyContent="flex-end" className="save-and-continue-btn">
            <Button label="Save & Continue" />
          </Box>
        </div>
      </div>
    );
  };
}
