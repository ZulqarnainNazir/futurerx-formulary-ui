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
  saveFormulary
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
      type_id: "" as any,
      name: "",
      abbreviation: "",
      effective_date: "",
      method: "",
      service_year: "",
      description: "",
      classification_system: "",
      is_closed_formulary: false,
      isState: false,
      selectedState: "",
      state_id: null as unknown as number
    },
    medicareInfo: [],
    supplemental_benefit_info:{
      supplemental_benefits :[] as any,
    },
    tiers: [
      {
        id_formulary_tier:null as unknown as any,
        id_tier_label: 1,
        id_tier: 0
      }
    ],
    setupOptions: {},
  };
  
  componentDidMount() {
    if (this.props.mode === "EXISTING") {
      this.manageFormularyType(this.props.formulary_type_id);
      this.props.fetchSelectedFormulary(this.props.formulary_id);
    } else {
      this.manageFormularyType(-1);
      this.props.fetchSelectedFormulary(-1);
    }
  }

  manageFormularyType(type: number) {
    console.log(" TYPE :: " + type);

    if (type === -1) {
      this.props.fetchGeneralOptions(1);
      return;
    }

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
          type_id: newProps.formulary.formulary_type_info.id_formulary_type,
          name: newProps.formulary.formulary_info.formulary_name,
          abbreviation: newProps.formulary.formulary_info.abbreviation,
          effective_date: newProps.formulary.formulary_info.effective_date,
          method: newProps.formulary.formulary_info.formulary_build_method,
          service_year: newProps.formulary.formulary_info.contract_year,
          description: newProps.formulary.formulary_info.formulary_description,
          classification_system: newProps.formulary.formulary_info.id_classification_system,
          is_closed_formulary: newProps.formulary.formulary_info.is_closed_formulary,
        },
        medicareInfo: newProps.formulary?.medicare_contract_types.map(e => e.id_medicare_contract_type),
        supplemental_benefit_info: {
          supplemental_benefits: newProps.formulary.supplemental_benefits.map(el => el.id_supplemental_benefit)
        },
        setupOptions: newProps.setupOptions,
      });
    }
    if(newProps.mode === 'NEW' && newProps.setupOptions.generalOptions ){
      this.setState({
        isUpdate: true,
        supplemental_benefit_info: {
          supplemental_benefits: []
        }
      });
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
    const typeID = this.props.setupOptions.generalOptions.formularyType.find(e=>e.formulary_type===type).id_formulary_type;
    generalInfo.type = type;
    generalInfo.type_id = parseInt(typeID);
    this.setState({
      generalInformation: generalInfo
    }, ()=> this.manageFormularyType(typeID));
  };

  onDropdownChange = (value,section, stateProp) => {
    const selectedSection = {...this.state[section]}
    selectedSection[stateProp] = value;
    if(stateProp === 'service_year'){
      selectedSection.isState = true
    }
    if(stateProp === 'selectedState'){
      const stateId = this.props.setupOptions.generalOptions.states.find(e => e.state_name === value).id;
      selectedSection.state_id = stateId
    }
    this.setState({
      [section] : selectedSection
    });
    
  }
  onRadioChangeHandler = (event: React.ChangeEvent<HTMLInputElement>,_section) => {
    const newObj = { ...this.state.generalInformation };
    newObj[event.target.name] = event.target.value;
    this.setState({
      generalInformation: newObj,
    });
  };
  onDatePickerChangeHandler = (e,section, stateProp) => {
    const date = e._d.toLocaleDateString();
    const newObj = { ...this.state[section] };
    newObj[stateProp] = date
    this.setState({
      [section] : newObj
    });
  }
  medicareCheck = (id:any) => {
    const updatedMedicareInfo:any = [...this.state.medicareInfo];
    const index = updatedMedicareInfo.indexOf(id);
    if(index > -1){
      updatedMedicareInfo.splice(index,1);
    }else{
      updatedMedicareInfo.push(id)
    }
    this.setState({
      medicareInfo: updatedMedicareInfo
    })
  }
  supplementalCheck = (id:any) => {
    const updatedSupplementalCheck:any = [...this.state.supplemental_benefit_info.supplemental_benefits];
    const index = updatedSupplementalCheck.indexOf(id);
    if(index > -1){
      updatedSupplementalCheck.splice(index,1);
    }else{
      updatedSupplementalCheck.push(id)
    }
    this.setState({
      supplemental_benefit_info: {
        supplemental_benefits: updatedSupplementalCheck
      }
    })
  }
  onSave = (e) => {
    console.log("  SAVE  ", e);
    const input = {
      MODE: this.props.mode,
      CONTINUE: e,
      GENERAL_INFO: this.state.generalInformation,
    }
    this.props.saveFormulary(input);
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
              formularyTypeChanged={this.formularyTypeChanged}
              datePickerChange={this.onDatePickerChangeHandler}
            />
            {this.state.generalInformation.type !== '' ? (
              <>
              {this.state.generalInformation.type !== 'Commercial' ? 
                <MedicareInformation medicareOptions={this.state.medicareInfo} medicareCheck={this.medicareCheck}/> : null}
              {this.state.generalInformation.type !== 'Commercial' ? <FormularyDesign /> : null}
              <FormularyTiers />
              {this.state.generalInformation.type !== 'Commercial' ? (
                <SupplementalModels supplemental={this.state.supplemental_benefit_info.supplemental_benefits} supplementalCheck={this.supplementalCheck}/>
               ) : null}
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
    saveFormulary: (a) => dispatch(saveFormulary(a)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FormularySetUp);
