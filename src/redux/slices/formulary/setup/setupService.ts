import axios from "axios";
import { BASE_URL1 } from "../../../../api/http-helper";
import { Formulary } from "./../setup/formulary";
import { FormularyPost } from "./../setup/formularyPayload";

const headers = {
  Authorization: "Bearer 1e05ff8b-a0af-4a8f-8915-487321900f21",
  Accept: "application/json",
  "Content-Type": "application/json;charset=UTF-8",
};

export async function getformulary(
  formulary_id: any
): Promise<Formulary | any> {
  let url = `${BASE_URL1}api/1/formulary-setup/${formulary_id}?entity_id=${formulary_id}`;
  try {
    const response = await axios.get(url, {
      headers: headers,
    });
    //console.log("***** SETUP getformulary  - Success");
    //console.log(response);
    if (response?.data?.code === "200") {
      return response?.data?.result;
    }
    return null;
  } catch (error) {
    // console.log("***** getformularies - Error");
    // console.log(error);
    throw error;
  }
}

export async function checkNameExist(name: string): Promise<boolean | any> {
  let url = `${BASE_URL1}api/1/check-formulary-name`;
  if (name != null && name != undefined && name != "") {
    url = url + `/${name}`;
  }
  // url= url+`/${this.clientId}`;
  url = url + `/1`;
  try {
    const response = await axios.get(url, {
      headers: headers,
    });
    // console.log("***** checkNameExist  - Success");
    // console.log(response);
    if (response?.data?.code === "200") {
      return response?.data?.result?.is_formulary_name_exists;
    }
    return true;
  } catch (error) {
    // console.log("***** checkNameExist - Error");
    // console.log(error);
    throw error;
  }
}

export function composePostBody(input: any): any {
  const payload: FormularyPost | any = {};
  if (input) {
    payload.formulary_info.id_formulary_type = input.GENERAL_INFO?.type_id;
    payload.formulary_info.formulary_type_name = input.GENERAL_INFO?.type;
    payload.formulary_info.formulary_build_method = input.GENERAL_INFO?.method;
    payload.formulary_info.formulary_name = input.GENERAL_INFO?.name;
    payload.formulary_info.abbreviation = input.GENERAL_INFO?.abbreviation;
    payload.formulary_info.formulary_description =
      input.GENERAL_INFO?.description;
    payload.formulary_info.effective_date = input.GENERAL_INFO?.effective_date;
    payload.formulary_info.contract_year = input.GENERAL_INFO?.service_year;
    payload.formulary_info.id_state = input.GENERAL_INFO?.state_id;

    // TIERS COUNTs- - - - - - - - - - - - -

    payload.formulary_info.number_of_tiers = 5;
    payload.formulary_info.min_tiers = 1;
    payload.formulary_info.max_tiers = 7;

    // TODO  - - - - - - - - - - - - -

    payload.formulary_info.id_lob = 1;
    payload.formulary_info.code_value = "MC";
    payload.formulary_info.id_submission_month = 5;
    payload.formulary_info.resemble_formulary_id = null;
    payload.formulary_info.is_closed_formulary = null;
    payload.formulary_info.id_classification_system =
      input.GENERAL_INFO?.classification_system;
    payload.formulary_info.id_classification_system_other = "";
    payload.formulary_info.resemble_formulary_id = null;
    payload.formulary_info.is_standard_template = null;
    payload.formulary_info.parent_formulary_id = null;
    payload.formulary_info.cms_formulary_id = null;
    payload.formulary_info.abridged_forumulary_creation = true;
    payload.formulary_info.formulary_basis = null;
    payload.formulary_info.is_carve_out = null;
    payload.formulary_info.import_file_path = "";
    payload.formulary_info.import_file_name = "";
    payload.formulary_info.medicare_types_ref = [];
    payload.formulary_info.medicare_types_ref_other = true;
    payload.formulary_info.medicare_types_ref = ["S", "H", "E", "R"];
    payload.is_validation_required = false;
    payload.cms_override = false;

    // CLASSIFICATION  - - - - - - - - - - - - -
    payload.classification_system_info = {
      id_classification_system: 1,
      is_custom: false,
      classification_system: "",
    };

    // MEDICARE INFO  - - - - - - - - - - - - -

    payload.medicare_contract_type_info = {
      medicare_contract_types: [1, 2, 3, 4],
      custom_medicare_contract_type: {
        id_medicare_contract_type: null,
        id_formulary_medicare_contract: "",
        medicare_contract_type: "MedInfo_OTHER",
      },
      removed_formulary_medicare_contracts: [],
    };

    // DESIGN  - - - - - - - - - - - - -

    payload.edit_info = {
      edits: [3, 2, 1, 5, 6, 7, 8, 9, 10, 12],
      edits_no: [],
      custom_edits: [],
      removed_formulary_edits: [],
    };

    // TIER DETAILS  - - - - - - - - - - - - -

    payload.tiers = [
      {
        id_formulary_tier: null,
        id_tier_label: 1,
        id_tier: 0,
      },
      {
        id_formulary_tier: null,
        id_tier_label: 2,
        id_tier: 1,
      },
      {
        id_formulary_tier: null,
        id_tier_label: 3,
        id_tier: 2,
      },
      {
        id_formulary_tier: null,
        id_tier_label: 4,
        id_tier: 3,
      },
      {
        id_formulary_tier: null,
        id_tier_label: 5,
        id_tier: 4,
      },
      {
        id_formulary_tier: null,
        id_tier_label: 8,
        id_tier: 5,
      },
    ];

    payload.supplemental_benefit_info = {
      supplemental_benefits: [1, 2, 3, 4, 5, 8, 9, 10, 11],
      custom_supplemental_benefits: [],
      removed_formulary_supplemental_benefits: [],
    };

    payload.asscociated_contract_pbp_info = {
      asscociated_contract_pbps: [],
      removed_formulary_asscociated_contract_pbps: [],
    };

    payload.carve_out_info = {
      carve_outs: [],
      custom_carve_outs: [],
      removed_formulary_carve_outs: [],
    };
  }
  return payload;
}

export async function createFormulary(details: any): Promise<any> {
  return null;
}

export function composePutBody(details: any): any {
  return null;
}

export async function updateFormulary(details: any): Promise<any> {
  return null;
}

export async function deleteFormulary(details: any): Promise<any> {
  return null;
}
