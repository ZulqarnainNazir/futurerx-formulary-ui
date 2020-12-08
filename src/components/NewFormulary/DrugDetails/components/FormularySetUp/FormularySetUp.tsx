import React from "react";
import {connect} from "react-redux";
import "./FormularySetUp.scss";
import GeneralInformation from "./components/GeneralInformation";
import FormularyDesign from "./components/FormularyDesign";
import FormularyTiers from "./components/FormularyTiers";
import MedicareInformation from "./components/MedicareInformation";
import SupplementalModels from "./components/SupplementalModels";
import Box from '@material-ui/core/Box';
import Button from '../../../../shared/Frx-components/button/Button';
import { fetchSelectedFormulary } from "../../../../.././redux/slices/formulary/setup/setupSlice";
import { Formulary } from "../../../../../redux/slices/formulary/setup/formulary";


class FormularySetUp extends React.Component<any, any> {

  formulary_details: Formulary | any;
  
  componentDidMount(){
    //console.log("SP  -  -  -  -  -  -  -  -  -  -  -  - M. "+this.props.mode);
    if(this.props.mode === "EXISTING") {
      this.props.fetchSelectedFormulary();
    } else {
      this.formulary_details = {};
    }
  }

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

const mapStateToProps = (state) => {
  //console.log("SP  -  -  -  -  -  -  -  -  -  -  -  - S.");
  console.log(state);
  return {
    mode: state?.application?.mode,
    formulary_id: state?.application?.formulary_id,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    fetchSelectedFormulary:(a)=>dispatch(fetchSelectedFormulary(a)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps )(FormularySetUp);

