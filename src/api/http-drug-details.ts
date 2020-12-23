import { BASE_URL1 } from "./http-helper";
import { REQUEST_HEADER } from "./http-commons";

// LA TAB
export const GET_DRUG_SUMMARY_LA = "api/1/formulary-drug-summary-la/";
export const GET_LA_FORMULARY_DRUGS = "api/1/formulary-drugs-la/";
export const APPLY_LA_DRUG = "api/1/apply-formulary-drug-la/";

// AF TAB
export const GET_DRUG_SUMMARY_AF = "api/1/formulary-drug-summary-abrfa/";
export const GET_AF_FORMULARY_DRUGS = "api/1/formulary-drugs-abrfa/";
export const APPLY_AF_DRUG = "api/1/apply-formulary-drug-abrfa/";

// FFF TAB
export const GET_DRUG_SUMMARY_FFF = "api/1/formulary-drug-summary-fff/";
export const GET_FFF_FORMULARY_DRUGS = "api/1/formulary-drugs-fff/";
export const APPLY_FFF_DRUG = "api/1/apply-formulary-drug-fff/";

// HI TAB
export const GET_DRUG_SUMMARY_HI = "api/1/formulary-drug-summary-hi/";
export const GET_HI_FORMULARY_DRUGS = "api/1/formulary-drugs-hi/";
export const APPLY_HI_DRUG = "api/1/apply-formulary-drug-hi/";

// PBST TAB
export const GET_DRUG_SUMMARY_PBST = "api/1/formulary-drug-summary-pbst/";
export const GET_PBST_FORMULARY_DRUGS = "api/1/formulary-drugs-pbst/";
export const APPLY_PBST_DRUG = "api/1/apply-formulary-drug-pbst/";

// MONM TAB
export const GET_DRUG_SUMMARY_MONM = "api/1/formulary-drug-summary-monm/";
export const GET_MONM_FORMULARY_DRUGS = "api/1/formulary-drugs-monm/";
export const APPLY_MONM_DRUG = "api/1/apply-formulary-drug-monm/";

// VBID TAB
export const GET_DRUG_SUMMARY_VBID = "api/1/formulary-drug-summary-vbid/";
export const GET_VBID_CONTRACTS = "api/1/formulary-associated-contracts/";

// LIS TAB
export const GET_DRUG_SUMMARY_LIS = "api/1/formulary-drug-summary-lis/";
export const GET_LIS_FORMULARY_DRUGS = "api/1/formulary-drugs-lis/";

// IBF TAB
export const GET_DRUG_SUMMARY_IBF = "api/1/formulary-drug-summary-ibf/";
export const GET_IBF_FORMULARY_DRUGS = "api/1/formulary-drugs-ibf/";
export const GET_IBF_CUIS = "api/1/drug-me-shcuis"
export const APPLY_IBF_DRUG = "api/1/apply-formulary-drug-ibf/";

// CB TAB
export const GET_DRUG_SUMMARY_CB = "api/1/formulary-drug-summary-cb/";
export const GET_CB_EXCLUDED_DRUGS = "api/1/formulary-drugs-cb/";

// FGC TAB
export const GET_DRUG_FGC_TIERS = "api/1/formulary-tiers/";

// PGC TAB
export const GET_DRUG_SUMMARY_PGC = "api/1/formulary-drug-summary-pgc/";
export const GET_PGC_FORMULARY_DRUGS = "api/1/formulary-drugs-pgc/";
export const GET_PGC_EXCLUDED_DRUGS = "api/1/formulary-drugs-pgc/";

// SO TAB
export const GET_DRUG_SUMMARY_SO = "api/1/formulary-drug-summary-sboth/";
export const GET_SO_FORMULARY_DRUGS = "api/1/formulary-drugs-sboth/";
export const GET_SO_CRITERIA_LIST = "api/1/criteria-list-sboth/";

// SSM TAB
export const GET_DRUG_SUMMARY_SSM = "api/1/formulary-drug-summary-ssm/";
export const GET_SSM_FORMULARY_DRUGS = "api/1/formulary-drugs-ssm/";

// AL TAB
export const GET_DRUG_SUMMARY_AL = "api/1/formulary-drug-summary-al/";
export const GET_AL_DRUGS = "api/1/formulary-drugs-al/";

// GL TAB
export const GET_DRUG_SUMMARY_GL = "api/1/formulary-drug-summary-gl/"

// ICD TAB
export const GET_DRUG_SUMMARY_ICD = "api/1/formulary-drug-summary-icdl/"

// PN TAB
export const GET_DRUG_SUMMARY_PN = "api/1/formulary-drug-summary-phnw/"

// PT TAB
export const GET_DRUG_SUMMARY_PT = "api/1/formulary-drug-summary-prtx/";

// POS TAB
export const GET_DRUG_SUMMARY_POS = "api/1/formulary-drug-summary-pos/"

// PR TAB
export const GET_DRUG_SUMMARY_PR = "api/1/formulary-drug-summary-patrs/";

export const KEY_ENTITY_ID = "entity_id";
export const KEY_INDEX = "index";
export const KEY_LIMIT = "limit";

export const TYPE_REPLACE = "replace";
export const TYPE_REMOVE = "remove";

export const buildUrl = ({ refUrl = BASE_URL1, apiDetails }) => {
  let apiPart = apiDetails.apiPart;
  let pathParams = apiDetails.pathParams;
  let keyVals = apiDetails.keyVals;
  let url = refUrl + apiPart;

  if(pathParams) {
    url = url + pathParams;
  }

  if (keyVals) {
    keyVals = keyVals.map((pair) => pair.key + "=" + pair.value);
    url = url + "?" + keyVals.join("&");
  }
  return url;
};

export const getHeaders = () => {
  return {
    headers: REQUEST_HEADER,
  };
};

export const postHeaders = (apiDetails) => {
  return {
    method: "POST",
    body: JSON.stringify(apiDetails?.messageBody),
    headers: REQUEST_HEADER,
  };
};

export const fetchRequest = (url, requestHeaders) => {
  return fetch(url, requestHeaders)
    .then((response) => {
      if (!response.ok) throw Error(response.statusText);
      return response.json();
    })
    .then((json) => {
      return json;
    });
};
