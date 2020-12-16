import React from "react";
import { connect } from "react-redux";
import "./FormularySetUp.scss";
import GeneralInformation from "./components/GeneralInformation";
import FormularyDesign from "./components/FormularyDesign";
import FormularyTiers from "./components/FormularyTiers";
import MedicareInformation from "./components/MedicareInformation";
import SupplementalModels from "./components/SupplementalModels";
import Box from "@material-ui/core/Box";
import Button from "../../../../shared/Frx-components/button/Button";
import FrxLoader from "../../../../shared/FrxLoader/FrxLoader";
import {
  fetchSelectedFormulary,
  verifyFormularyName,
} from "../../../../.././redux/slices/formulary/setup/setupSlice";
import { Formulary } from "../../../../../redux/slices/formulary/setup/formulary";
import {
  fetchGeneralOptions,
  fetchMedicareOptions,
  fetchDesignOptions,
  fetchSupplementalOptions,
  fetchTierOptions,
  fetchSubMthsOptions,
  fetchStatesOptions,
} from "../../../../.././redux/slices/formulary/setup/setupOptionsSlice";

class FormularySetUp extends React.Component<any, any> {
  state = {
    isUpdate: false,
    generalInformation: {
      type: "",
      name: "",
      abbreviation: "",
      effective_date: "",
      method: "",
      service_year: "",
      description: "",
      classification_system: "",
      is_closed_formulary: false
    },
    setupOptions: {},
  };
  formulary_details: Formulary | any;

  componentDidMount() {
    if (this.props.mode === "EXISTING") {
      this.manageFormularyType(this.props.formulary_type_id);
      this.props.fetchSelectedFormulary(this.props.formulary_id);
    } else {
      this.props.fetchGeneralOptions(1);
      this.formulary_details = {};
    }
  }

  manageFormularyType(type: number) {
    console.log(" TYPE :: " + type);
    this.props.fetchGeneralOptions(type);
    this.props.fetchDesignOptions(type);
    this.props.fetchTierOptions(type, 0);

    if (type === 1) {
      this.props.fetchMedicareOptions();
      this.props.fetchSupplementalOptions(type);
    } else if (type === 2) {
      this.props.fetchStatesOptions(type);
      this.props.fetchMedicareOptions();
      this.props.fetchSupplementalOptions(type);
    } else if (type === 3) {
      // TODO ... MEDICADE...
      this.props.fetchStatesOptions(0);
    } else if (type === 4) {
      // TODO ... MEDICADE...
      this.props.fetchStatesOptions(0);

    } else if (type === 5) {
    } else if (type === 6) {
      // COMMERCIAL...
    }
    this.props.fetchSubMthsOptions(2021);
  }


  UNSAFE_componentWillReceiveProps = (newProps) => {
    if (newProps.formulary && newProps.setupOptions) {
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
          classification_system: newProps.formulary.formulary_info.id_classification_system,
          is_closed_formulary: newProps.formulary.formulary_info.is_closed_formulary
        },
        setupOptions: newProps.setupOptions,
      });
    }
    if(newProps.mode === 'NEW'){
      this.setState({
        isUpdate: true
      })
    }
  };
  updateInputField = (e) => {
    const newObj = { ...this.state.generalInformation };
    newObj[e.currentTarget.name] = e.currentTarget.value;
    this.setState({
      generalInformation: newObj,
    });
    // console.log(" ON CHANGE : ( "+this.props.mode+" ) "+e.currentTarget.name +" , "+e.currentTarget.value);
    if (e.currentTarget.name === "name" && this.props.mode === "NEW") {
      this.props.verifyFormularyName(e.currentTarget.value);
    }
  };

  formularyTypeChanged = (type) => {
    const generalInfo = {...this.state.generalInformation}
    generalInfo.type = type;
    const typeID = this.props.setupOptions.generalOptions.formularyType.find(e=>e.formulary_type===type).id_formulary_type;
    this.setState({
      generalInformation: generalInfo
    }, ()=> this.manageFormularyType(typeID));
    
  };

  onDropdownChange = (value,section, stateProp) => {
    console.log(value, section, stateProp)
    const selectedSection = {...this.state[section]}
    selectedSection[stateProp] = value;
    this.setState({
      [section] : selectedSection
    })
  }
  onRadioChangeHandler = (event: React.ChangeEvent<HTMLInputElement>,section) => {
    const newObj = { ...this.state.generalInformation };
    newObj[event.target.name] = event.target.value;
    this.setState({
      generalInformation: newObj,
    });
  };
  onDatePickerChangeHandler = (date, dateString) => {
    console.log(date,dateString)
  }
  onSave = (e) => {
    console.log("  SAVE  ", e);
  };

  render() {
    return (
      <div>
        {this.state.isUpdate ? (
          <>
            <GeneralInformation
              generalInfo={this.state.generalInformation}
              setupOptions={this.state.setupOptions}
              updateInputField={this.updateInputField}
              onRadioChange={this.onRadioChangeHandler}
              onDropdownChange={this.onDropdownChange}
              datePickerChange={this.onDatePickerChangeHandler}
            />
            {this.state.generalInformation.type !== '' ? (
              <>
              {this.state.generalInformation.type !== 'Commercial' ? <MedicareInformation /> : null}
              <FormularyDesign />
              <FormularyTiers />
              {this.state.generalInformation.type !== 'Commercial' ? <SupplementalModels /> : null}
              </>
            ) : null}
            
            <div className="btn-action">
              <Box display="flex" justifyContent="flex-end" className="save-btn">
                <Button label="Save" onClick={() => this.onSave(false)} />
              </Box>
              <Box
                display="flex"
                justifyContent="flex-end"
                className="save-and-continue-btn"
              >
                <Button label="Save & Continue" onClick={() => this.onSave(true)} />
              </Box>
            </div>
          </>
        ) : <FrxLoader/>}

        
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log("SP  -  -  -  -  -  -  -  -  -  -  -  - STATE");
  // console.log(state);
  return {
    mode: state?.application?.mode,
    formulary_id: state?.application?.formulary_id,
    formulary_type_id: state?.application?.formulary_type_id,
    formulary: state?.setup?.formulary,
    setupOptions: state?.setupOptions,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    fetchSelectedFormulary: (a) => dispatch(fetchSelectedFormulary(a)),
    fetchGeneralOptions: (a) => dispatch(fetchGeneralOptions(a)),
    fetchMedicareOptions: (a) => dispatch(fetchMedicareOptions(a)),
    fetchDesignOptions: (a) => dispatch(fetchDesignOptions(a)),
    fetchTierOptions: (a) => dispatch(fetchTierOptions(a)),
    fetchSupplementalOptions: (a) => dispatch(fetchSupplementalOptions(a)),
    fetchSubMthsOptions: (a) => dispatch(fetchSubMthsOptions(a)),
    fetchStatesOptions: (a) => dispatch(fetchStatesOptions(a)),
    verifyFormularyName: (a) => dispatch(verifyFormularyName(a)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FormularySetUp);
