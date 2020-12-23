import axios from "axios";
import { BASE_URL1 } from "../../../../api/http-helper";
import { Formulary } from "./../setup/formulary";
import { FormularyPost } from "./../setup/formularyPayload";
import { REQUEST_HEADER } from "../../../../api/http-commons";


export async function getformulary(
  formulary_id: any
): Promise<Formulary | any> {
  let url = `${BASE_URL1}api/1/formulary-setup/${formulary_id}?entity_id=${formulary_id}`;
  try {
    const response = await axios.get(url, {
      headers: REQUEST_HEADER,
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
  let url = `${BASE_URL1}api/1/check-formulary-name/`;
  if (name != null && name != undefined && name != "") {
    url = url + `${name}`;
  } else {
    url = url + ` `;
  }
  // url= url+`/${this.clientId}`;
  url = url + `/1`;
  try {
    const response = await axios.get(url, {
      headers: REQUEST_HEADER,
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
  //console.log("***** composePostBody");

  const payload: any = {};
  payload.formulary_info = {};
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
  // TODO  - - - - - - - - - - - - -
  //payload.formulary_info.id_lob = 1;
  // payload.formulary_info.code_value = "MC";
  // payload.formulary_info.id_submission_month = 5;
  payload.formulary_info.resemble_formulary_id = null;
  payload.formulary_info.is_closed_formulary = input.GENERAL_INFO?.is_closed_formulary;;
  payload.formulary_info.resemble_formulary_id = null;
  payload.formulary_info.is_standard_template = null;
  payload.formulary_info.parent_formulary_id = null;
  payload.formulary_info.cms_formulary_id = "";
  payload.formulary_info.abridged_forumulary_creation = true;
  payload.formulary_info.formulary_basis = null;
  payload.formulary_info.is_carve_out = null;
  payload.formulary_info.import_file_path = "";
  payload.formulary_info.import_file_name = "";
  payload.is_validation_required = false;
  payload.cms_override = false;

  // CLASSIFICATION  - - - - - - - - - - - - -

  payload.formulary_info.id_classification_system = parseInt(
    input.GENERAL_INFO?.classification_system
  );
  payload.formulary_info.id_classification_system_other = "";

  payload.classification_system_info = {
    id_classification_system: parseInt(
      input.GENERAL_INFO?.classification_system
    ),
    is_custom: false,
    classification_system: "",
  };

  // MEDICARE INFO  - - - - - - - - - - - - -

  payload.formulary_info.medicare_types_ref_other =
    input.GENERAL_INFO?.state_id;
  payload.medicare_contract_type_info = input.medicare_contract_type_info;

  // DESIGN  - - - - - - - - - - - - -

  payload.edit_info = {
    edits: input?.edit_info?.edits,
    edits_no: input?.edit_info?.edits_no,
    custom_edits: input?.edit_info?.custom_edits,
    removed_formulary_edits: [],
  };

  // TIER DETAILS  - - - - - - - - - - - - -

  payload.tiers = input?.tiers;
  payload.formulary_info.number_of_tiers = input?.tiers?.length;
  // payload.formulary_info.number_of_tiers = 1;
  // payload.formulary_info.min_tiers = 1;
  // payload.formulary_info.max_tiers = 7;

  payload.supplemental_benefit_info = {
    supplemental_benefits:
      input?.supplemental_benefit_info?.supplemental_benefits,
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

  return payload;
}

export async function createFormulary(payload: any): Promise<any> {
  //POST: https://api-dev-config-formulary.futurerx.com/api/1/formulary-setup/1
  // TODO: CLIENT_ID
  console.log("***** createFormulary ");
  let url = `${BASE_URL1}api/1/formulary-setup/1`;
  try {
    const response = await axios.post(url, payload, {
      headers: REQUEST_HEADER,
    });
    console.log("***** createFormulary - Success");
    console.log(response);
    if (response?.data?.code === "200") {
      return {
        data: response?.data?.id_formulary,
        status: 200,
      };
    }
    return null;
  } catch (error) {
    console.log("***** createFormulary - Error");
    //console.log(error);
    const { response } = error;
    const { request, ...errorObject } = response; // take everything but 'request'
    console.log(errorObject);
    return {
      status: errorObject.status,
      data: errorObject.data,
    };
  }
}
//   try {
//     const response = await axios.post(url, payload, {
//       headers: headers,
//     });
//   } catch (error) {
//     const { response } = error;
//     const { request, ...errorObject } = response; // take everything but 'request'
//     console.log(errorObject);
//   }
// }

export function composePutBody(details: any): any {
  return null;
}

export async function updateFormulary(details: any): Promise<any> {
  return null;
}

export async function deleteFormulary(details: any): Promise<any> {
  return null;
}
