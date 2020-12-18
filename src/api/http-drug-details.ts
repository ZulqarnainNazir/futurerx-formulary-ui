import { BASE_URL1 } from "./http-helper";

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

export const KEY_ENTITY_ID = "entity_id";
export const KEY_INDEX = "index";
export const KEY_LIMIT = "limit";

export const TYPE_REPLACE = "replace";
export const TYPE_REMOVE = "remove";

const BEARER_KEY = "b8625daa-ccbd-4167-8cde-673de141fd11";

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
    headers: {
      Authorization: `Bearer ${BEARER_KEY}`,
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
  };
};

export const postHeaders = (apiDetails) => {
  return {
    method: "POST",
    body: JSON.stringify(apiDetails?.messageBody),
    headers: {
      Authorization: `Bearer ${BEARER_KEY}`,
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
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
