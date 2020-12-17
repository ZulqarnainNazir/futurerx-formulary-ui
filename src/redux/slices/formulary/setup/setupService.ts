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
    payload.id_formulary_type = input.GENERAL_INFO?.type_id;
    payload.formulary_type_name = input.GENERAL_INFO?.type;
    // TOD
    payload.id_lob = 1;
    // TODO
    // payload.code_value="COMM",
    payload.formulary_name = input.GENERAL_INFO?.name;
    payload.abbreviation = input.GENERAL_INFO?.abbreviation;
    payload.formulary_description = input.GENERAL_INFO?.description;
    payload.effective_date = input.GENERAL_INFO?.effective_date;
    payload.contract_year = input.GENERAL_INFO?.service_year;
    payload.id_state = input.GENERAL_INFO?.state_id;
    // TODO
    payload.id_submission_month=null;
    // TODO
    // payload.is_closed_formulary=false,
    // payload.id_classification_system  = input.GENERAL_INFO?.classification_system
    // // TODO ----------------------------------------
    // payload.id_classification_system_other="",
    // payload.resemble_formulary_id=null;    

    // payload.number_of_tiers=2,
    // payload.min_tiers=1;
    // payload.max_tiers2;

    // payload.is_standard_template=null;
    // payload.parent_formulary_id": null,

    // payload.cms_formulary_id": "",
    // payload.abridged_forumulary_creation": null,
    // payload.formulary_basis": null,
    // payload.is_carve_out": null,

    // payload.import_file_path": "",
    // payload.import_file_name": "",

    // payload.medicare_types_ref": [],
    // payload.medicare_types_ref_other": false,

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
