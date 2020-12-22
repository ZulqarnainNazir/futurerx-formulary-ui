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
  saveFormulary,
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
import { ToastContainer } from "react-toastify";
import showMessage from "../../../Utils/Toast";
import { trim } from "lodash";
import { Save } from "@material-ui/icons";

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
      state_id: (null as unknown) as number,
      medicare_types_ref_other: false,
    },
    medicareInfo: {
      medicare_contract_types: [],
    },
    medicare_contract_type_info: {
      medicare_contract_types: [],
      custom_medicare_contract_type: {
        id_medicare_contract_type: null,
        id_formulary_medicare_contract: "",
        medicare_contract_type: "",
      },
      removed_formulary_medicare_contracts: [],
    },
    supplemental_benefit_info: {
      supplemental_benefits: [] as any,
    },
    tiers: [],
    edit_info: {
      edits: [],
      edits_no: [],
    },
    setupOptions: {},
  };

  componentDidMount() {
    if (this.props.mode === "EXISTING") {
      this.manageFormularyType(
        this.props.formulary_type_id,
        this.props.formulary_id
      );
      this.props.fetchSelectedFormulary(this.props.formulary_id);
    } else {
      this.manageFormularyType(-1, -1);
      this.props.fetchSelectedFormulary(-1);
    }
  }

  manageFormularyType(type: number, id: number) {
    console.log(" Manage - TYPE : " + type + " ID : " + id);

    if (type === -1) {
      this.props.fetchGeneralOptions({ type: 1, id: -1 });
      return;
    }

    this.props.fetchGeneralOptions({ type: type, id: id });
    this.props.fetchDesignOptions({ type: type, id: id });
    this.props.fetchTierOptions({ type: type, id: id });

    if (type === 1) {
      this.props.fetchMedicareOptions({ type: type, id: id });
      this.props.fetchSupplementalOptions({ type: type, id: id });
    } else if (type === 2) {
      this.props.fetchStatesOptions(type);
      this.props.fetchMedicareOptions({ type: type, id: id });
      this.props.fetchSupplementalOptions({ type: type, id: id });
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
      const medeicareContract = { ...this.state.medicare_contract_type_info };
      medeicareContract.medicare_contract_types = newProps.formulary?.medicare_contract_types?.map(
        (e) => e.id_medicare_contract_type
      );

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
          classification_system:
            newProps.formulary.formulary_info.id_classification_system,
          is_closed_formulary:
            newProps.formulary.formulary_info.is_closed_formulary,
          medicare_types_ref_other: false,
        },
        medicare_contract_type_info: medeicareContract,
        supplemental_benefit_info: {
          supplemental_benefits: newProps.formulary.supplemental_benefits?.map(
            (el) => el.id_supplemental_benefit
          ),
        },
        tiers: [...newProps.formulary.tiers],
        fetchedEditInfo: newProps.formulary.edit_info,
        edit_info: this.getEditInfo(newProps.formulary.edit_info),
        setupOptions: newProps.setupOptions,
      });
    }
    if (newProps.mode === "NEW" && newProps.setupOptions.generalOptions) {
      this.setState({
        isUpdate: true,
        supplemental_benefit_info: {
          supplemental_benefits: [],
        },
        tiers: [],
      });
    }
  };
  getEditInfo = (editInfo: any) => {
    const editTrue = editInfo
      .filter((obj) => obj.id_checked === true)
      .map((e) => e.id_edit);
    const editFalse = editInfo
      .filter((obj) => obj.id_checked === false)
      .map((e) => e.id_edit);
    const customEdit = editInfo;
    const newObj = {
      edits: editTrue,
      edits_no: editFalse,
      custom_edits: "",
    };
    return newObj;
  };
  formularyRadioChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: any,
    type
  ) => {
    console.log(event.target.value, id);
    console.log(this.state.edit_info);
    let checked = event.target.value;
    const updatedEditInfo: any = { ...this.state.edit_info };
    if (type === "checkbox") {
      let index = updatedEditInfo.edits.indexOf(id);
      index === -1
        ? updatedEditInfo.edits.push(id)
        : updatedEditInfo.edits.splice(index, 1);
    } else {
      if (checked === "true") {
        if (updatedEditInfo.edits_no.indexOf(id) !== -1) {
          let index = updatedEditInfo.edits_no.indexOf(id);
          updatedEditInfo.edits_no.splice(index, 1);
        }
        updatedEditInfo.edits.push(id);
      } else {
        if (updatedEditInfo.edits.indexOf(id) !== -1) {
          let index = updatedEditInfo.edits.indexOf(id);
          updatedEditInfo.edits.splice(index, 1);
        }
        updatedEditInfo.edits_no.push(id);
      }
    }
    this.setState({
      edit_info: updatedEditInfo,
    });
  };
  updateInputField = (e) => {
    const newObj = { ...this.state.generalInformation };
    newObj[e.currentTarget.name] = e.currentTarget.value;
    this.setState({
      generalInformation: newObj,
    });
    if (e.currentTarget.name === "name" && this.props.mode === "NEW") {
      this.props.verifyFormularyName(e.currentTarget.value);
    }
  };

  onOtherMedicareHandler = (e) => {
    const custom = { ...this.state.medicare_contract_type_info };
    custom.custom_medicare_contract_type.medicare_contract_type =
      e.currentTarget.value;
    this.setState({
      medicare_contract_type_info: custom,
    });
  };
  formularyTypeChanged = (type) => {
    const generalInfo = { ...this.state.generalInformation };
    const typeID = this.props.setupOptions.generalOptions.formularyType.find(
      (e) => e.formulary_type === type
    ).id_formulary_type;
    generalInfo.type = type;
    generalInfo.type_id = parseInt(typeID);
    this.setState(
      {
        generalInformation: generalInfo,
      },
      () => this.manageFormularyType(typeID, -1)
    );
  };

  onDropdownChange = (value, section, stateProp) => {
    const selectedSection = { ...this.state[section] };
    selectedSection[stateProp] = value;
    if (stateProp === "service_year") {
      selectedSection.isState = true;
    }
    if (stateProp === "selectedState") {
      const stateId = this.props.setupOptions.generalOptions.states.find(
        (e) => e.state_name === value
      ).id;
      selectedSection.state_id = stateId;
    }
    this.setState({
      [section]: selectedSection,
    });
  };
  onRadioChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    _section
  ) => {
    const newObj = { ...this.state.generalInformation };
    newObj[event.target.name] = event.target.value;
    this.setState({
      generalInformation: newObj,
    });
  };
  onDatePickerChangeHandler = (e, section, stateProp) => {
    const date = `${e._d.getFullYear()}-${
      e._d.getMonth() + 1
    }-${e._d.getDate()}`;
    const newObj = { ...this.state[section] };
    newObj[stateProp] = date;
    this.setState({
      [section]: newObj,
    });
  };
  medicareCheck = (getObject: any) => {
    this.setState({
      medicare_contract_type_info: getObject,
    });
  };
  onMedicareOtherCheck = (getObject: any) => {
    this.setState({
      generalInformation: getObject,
    });
  };
  supplementalCheck = (getObject: any) => {
    this.setState({
      supplemental_benefit_info: getObject,
    });
  };
  onSave = (e) => {
    console.log("  SAVE ", e);
    if (this.props.mode === "NEW") {
      let msg: string[] = [];
      if (this.state.generalInformation.type_id === "") {
        msg.push("Formulary Type is required.");
      }
      if (trim(this.state.generalInformation.name) === "") {
        msg.push("Formulary Name is required.");
      }
      if (this.state.generalInformation.method === "") {
        msg.push("Formulary Build Method is required.");
      }
      if (this.state.generalInformation.effective_date === "") {
        msg.push("Formulary Effective Date is required.");
      }
      if (this.state.generalInformation.service_year === "") {
        msg.push("Formulary Service year is required.");
      }
      if (msg.length > 0) {
        msg.forEach((m) => {
          showMessage(m, "info");
        });
        return;
      }
    }

    const input = {
      MODE: this.props.mode,
      CONTINUE: e,
      GENERAL_INFO: this.state.generalInformation,
      edit_info: this.state.edit_info,
      supplemental_benefit_info: this.state.supplemental_benefit_info,
      medicare_contract_type_info: this.state.medicare_contract_type_info,
      tiers: this.state.tiers,
    };
    console.log("Calling Save................");
    this.props.saveFormulary(input).then((arg) => {
      console.log("SAVE Callback ", arg?.payload);
      if (arg?.payload?.type > 0 && arg?.payload?.id > 0) {
        console.log(
          "REFRESH.... TYPE : " +
            arg?.payload?.type +
            " ID : " +
            arg?.payload?.id
        );
        this.manageFormularyType(arg?.payload?.type, arg?.payload?.id);
        this.props.fetchSelectedFormulary(arg?.payload?.id);
      }
    });
  };
  onCheckUncheckAllSupplementalHandler = (val) => {
    if (val === "uncheck") {
      this.setState({
        supplemental_benefit_info: {
          supplemental_benefits: [],
        },
      });
    } else {
      const allSupplemental = this.props.setupOptions.supplementalOptions.map(
        (e) => e.id_supplemental_benefit
      );
      this.setState({
        supplemental_benefit_info: {
          supplemental_benefits: allSupplemental,
        },
      });
    }
  };
  selectTierHandler = (e) => {
    const updatedTiers: any = [...this.state.tiers];
    const tiersLength = updatedTiers.length;
    if (tiersLength > e) {
      updatedTiers.length = e;
    } else {
      for (let i = 1; i <= e - tiersLength; i++) {
        const newObj = {
          id_formulary_tier: null,
          id_tier: tiersLength + i,
          id_tier_label: null,
          tier_name: `Tier ${tiersLength + i}`,
        };
        updatedTiers.push(newObj);
      }
    }
    this.setState({
      tiers: updatedTiers,
    });
  };
  changeTierValueHandler = (e, val) => {
    const updatedTiers: any = [...this.state.tiers];
    const ind = updatedTiers.findIndex((el) => el.tier_name === val);
    const getObj = { ...updatedTiers[ind] };
    const getId = this.props.setupOptions.tierOptions.find(
      (el) => el.tier_label === e
    ).id_tier_label;
    getObj.id_tier_label = getId;
    updatedTiers[ind] = getObj;
    this.setState({
      tiers: updatedTiers,
    });
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
            {this.state.generalInformation.type !== "" ? (
              <>
                {this.state.generalInformation.type !== "Commercial" ? (
                  <MedicareInformation
                    allMedicareOptions={this.state.medicare_contract_type_info}
                    medicareOptions={
                      this.state.medicare_contract_type_info
                        .medicare_contract_types
                    }
                    medicareCheck={this.medicareCheck}
                    generalInfo={this.state.generalInformation}
                    onMedicareOtherCheck={this.onMedicareOtherCheck}
                    otherMedicareInfo={this.onOtherMedicareHandler}
                  />
                ) : null}
                {this.state.generalInformation.type !== "Commercial" ? (
                  <FormularyDesign
                    edit_info={this.state.edit_info}
                    formularyRadioChange={this.formularyRadioChangeHandler}
                  />
                ) : null}
                <FormularyTiers
                  tiers={this.state.tiers}
                  generalInfo={this.state.generalInformation}
                  selectTier={this.selectTierHandler}
                  changeTierValue={this.changeTierValueHandler}
                />
                {this.state.generalInformation.type !== "Commercial" ? (
                  <SupplementalModels
                    supplemental={this.state.supplemental_benefit_info}
                    supplementalCheck={this.supplementalCheck}
                    checkUncheckAllSupplemental={
                      this.onCheckUncheckAllSupplementalHandler
                    }
                  />
                ) : null}
              </>
            ) : null}

            <div className="btn-action">
              <Box
                display="flex"
                justifyContent="flex-end"
                className="save-btn"
              >
                <Button
                  label="Save"
                  onClick={() => this.onSave(false)}
                  disabled={this.props.mode === "EXISTING"}
                />
              </Box>
              <Box
                display="flex"
                justifyContent="flex-end"
                className="save-and-continue-btn"
              >
                <Button
                  label="Save & Continue"
                  onClick={() => this.onSave(true)}
                  disabled="true"
                />
              </Box>
            </div>
          </>
        ) : (
          <FrxLoader />
        )}

        <ToastContainer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  //  console.log("SP  -  -  -  -  -  -  -  -  -  -  -  - STATE");
  //  console.log(state?.setup?.messageType +" - "+ state?.setup?.message  );
  if (state?.setup?.messageType !== "" && state?.setup?.message !== "") {
    // console.log(">>>>>>>>>>> " + state?.setup?.messageType +" | "+state?.setup?.message);
    showMessage(state?.setup?.message, state?.setup?.messageType);
  }
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
