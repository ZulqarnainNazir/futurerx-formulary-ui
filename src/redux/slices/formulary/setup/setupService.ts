import axios from "axios";
import { Formulary } from "./../setup/formulary";
import { BASE_URL1 } from "../../../../api/http-helper";

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
  } else {
    // name = "";
    // url = url + `/${name}`;
    return true;
  }
  // url= url+`/${this.clientId}`;
  url = url + `/1`;
  // if (this.formularyBaseId != 0 && this.formularyBaseId != undefined) {
  //   url = url + `/${this.formularyBaseId}`
  // }
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

export async function createFormulary(details: any): Promise<any> {
  return null;
}

export async function updateFormulary(details: any): Promise<any> {
  return null;
}

export async function deleteFormulary(details: any): Promise<any> {
  return null;
}

export function composePostBody(details: any): any {
  return null;
}

export function composePutBody(details: any): any {
  return null;
}

const PAYLOAD_TEMPLATE = {
  formulary_info: {
    id_formulary_type: 6,
    formulary_type_name: "Commercial",
    id_lob: 4,
    code_value: "COMM",

    formulary_name: "FRXFORM2-1164_COMM_01",
    abbreviation: "ABBR",
    formulary_description: "DESC",
    formulary_build_method: "N",
    effective_date: "2020-12-15",
    contract_year: 2021,
    id_submission_month: null,
    is_closed_formulary: true,

    id_classification_system: 10,
    id_classification_system_other: "",
    id_state: null,
    resemble_formulary_id: null,

    number_of_tiers: 2,
    min_tiers: 1,
    max_tiers: 20,

    is_standard_template: null,
    parent_formulary_id: null,

    cms_formulary_id: "",
    abridged_forumulary_creation: null,
    formulary_basis: null,
    is_carve_out: null,

    import_file_path: "",
    import_file_name: "",

    medicare_types_ref: [],
    medicare_types_ref_other: false,
  },
  classification_system_info: {
    id_classification_system: 10,
    is_custom: false,
    classification_system: "",
  },
  carve_out_info: {
    carve_outs: [],
    custom_carve_outs: [],
    removed_formulary_carve_outs: [],
  },
  asscociated_contract_pbp_info: {
    asscociated_contract_pbps: [],
    removed_formulary_asscociated_contract_pbps: [],
  },
  tiers: [
    {
      id_formulary_tier: null,
      id_tier_label: 89,
      id_tier: 1,
    },
    {
      id_formulary_tier: null,
      id_tier_label: 81,
      id_tier: 2,
    },
  ],

  edit_info: {
    edits: [58],
    edits_no: [],
    custom_edits: [],
    removed_formulary_edits: [],
  },

  supplemental_benefit_info: {
    supplemental_benefits: [],
    custom_supplemental_benefits: [],
    removed_formulary_supplemental_benefits: [],
  },
  is_validation_required: false,
  cms_override: false,
};
