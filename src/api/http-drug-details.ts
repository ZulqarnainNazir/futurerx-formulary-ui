import { BASE_URL1 } from "./http-helper";

// LA TAB
export const GET_DRUG_SUMMARY_LA = "api/1/formulary-drug-summary-la/";
export const GET_LA_FORMULARY_DRUGS = "api/1/formulary-drugs-la/";
export const APPLY_LA_DRUG = "api/1/apply-formulary-drug-la/";

// AF TAB
export const GET_DRUG_SUMMARY_AF = "api/1/formulary-drug-summary-abrfa/";
export const GET_AF_FORMULARY_DRUGS = "api/1/formulary-drugs-abrfa/";
export const APPLY_AF_DRUG = "api/1/apply-formulary-drug-abrfa/";

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
  let url = refUrl + apiPart + pathParams;
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
