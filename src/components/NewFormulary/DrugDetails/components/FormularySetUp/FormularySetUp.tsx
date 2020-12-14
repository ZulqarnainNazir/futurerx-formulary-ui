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
import { 
  fetchGeneralOptions,
  fetchMedicareOptions,
  fetchDesignOptions,
  fetchSupplementalOptions,
  fetchTierOptions,
  fetchSubMthsOptions
} from "../../../../.././redux/slices/formulary/setup/setupOptionsSlice";


class FormularySetUp extends React.Component<any, any> {
  state = {
    isUpdate: false,
    generalInformation: {
      type: '',
      name: '',
      abbreviation: '',
      effective_date: '',
      method: '',
      service_year: '',
      description: '',
      classification_system: ''
    },
    setupOptions: {}
  }
  formulary_details: Formulary | any;
  
  componentDidMount(){
    this.props.fetchGeneralOptions();
    this.props.fetchDesignOptions();
    // fetchMedicareOptions need to call conditionally based on FILE TYPE
    this.props.fetchMedicareOptions();
    this.props.fetchSupplementalOptions();
    // fetchTierOptions need to call conditionally based on FILE TYPE
    this.props.fetchTierOptions(1,0);
    if(this.props.mode === "EXISTING") {
      this.props.fetchSelectedFormulary(this.props.formulary_id);
    } else {
      this.formulary_details = {};
    }
    // Need to call this based on YEAR selected... 
    this.props.fetchSubMthsOptions(2021);
  }
  UNSAFE_componentWillReceiveProps = (newProps) => {
    if(newProps.formulary && newProps.setupOptions){
      this.setState({
        isUpdate: true,
        generalInformation: {
          type: newProps.formulary.formulary_type_info.formulary_type,
          name: newProps.formulary.formulary_info.formulary_name,
          abbreviation: newProps.formulary.formulary_info.abbreviation,
          effective_date: newProps.formulary.formulary_info.effective_date,
          method: newProps.formulary.formulary_info.formulary_build_method,
          service_year: newProps.formulary.formulary_info.contract_year,
          description: newProps.formulary.formulary_info.formulary_description,
          classification_system: newProps.formulary.formulary_info.id_classification_system
        },
        setupOptions: newProps.setupOptions
      })
    }
    
  }
  updateInputField = (e) => {
    const newObj = {...this.state.generalInformation}
    newObj[e.currentTarget.name] = e.currentTarget.value;
    this.setState({
      generalInformation : newObj
    })
  }
  onRadioChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newObj = {...this.state.generalInformation}
    newObj[event.target.name] = event.target.value;
    this.setState({
      generalInformation: newObj
    })
  }
  render() {
    return(
      <div>
        {this.state.isUpdate ? (
          <GeneralInformation 
            generalInfo={this.state.generalInformation} 
            setupOptions={this.state.setupOptions}
            updateInputField={this.updateInputField}
            onRadioChange={this.onRadioChangeHandler}/>
        ) : null}
          
        
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
  // console.log("SP  -  -  -  -  -  -  -  -  -  -  -  - STATE");
  // console.log(state);
  return {
    mode: state?.application?.mode,
    formulary_id: state?.application?.formulary_id,
    formulary: state?.setup?.formulary,
    setupOptions: state?.setupOptions
  };
};

function mapDispatchToProps(dispatch) {
  return {
    fetchSelectedFormulary:(a)=>dispatch(fetchSelectedFormulary(a)),
    fetchGeneralOptions:(a)=>dispatch(fetchGeneralOptions(a)),
    fetchMedicareOptions:(a)=>dispatch(fetchMedicareOptions(a)),
    fetchDesignOptions:(a)=>dispatch(fetchDesignOptions(a)),
    fetchTierOptions:(a)=>dispatch(fetchTierOptions(a)),
    fetchSupplementalOptions:(a)=>dispatch(fetchSupplementalOptions(a)),
    fetchSubMthsOptions:(a)=>dispatch(fetchSubMthsOptions(a)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps )(FormularySetUp);

