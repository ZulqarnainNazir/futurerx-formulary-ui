import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL1 } from "../../../../../api/http-helper";

// const GET_DRUG_SUMMARY_LA = BASE_URL1 + "api/1/formulary-drug-summary-la/3303?entity_id=3303";

// const POST_LA_FORMULARY_DRUGS = BASE_URL1 + "api/1/formulary-drugs-la/3303/MCR?index=0&limit=10&entity_id=3303";

// const POST_REPLACE_LA_FORMULARY_DRUG = BASE_URL1 + "api/1/apply-formulary-drug-la/3298/MCR/replace?entity_id=3298";

export const getDrugDetailsLASummary = createAsyncThunk(
  "drug_details/LA_Summary",
  async (apiDetails: any) => {
    let apiPart = apiDetails.apiPart;
    let pathParams = apiDetails.pathParams;
    let keyVals = apiDetails.keyVals;
    let GET_URL = BASE_URL1 + apiPart + pathParams;
    if (keyVals) {
      keyVals = keyVals.map((pair) => pair.key + "=" + pair.value);
      GET_URL = GET_URL + "?" + keyVals.join("&");
    }
    console.log("getTier action creator:: url: " + GET_URL);
    const requestHeaders = {
      headers: {
        Authorization: "Bearer b8625daa-ccbd-4167-8cde-673de141fd11",
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
    };
    console.log("The GET LA SUMMARY url = ", GET_URL);
    return fetch(GET_URL, requestHeaders)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((json) => {
        console.log("Drug DEtails LA Json : ", json);
        return json;
      });
  }
);

export const getDrugDetailsLAList = createAsyncThunk(
  "drug_details/LA_list",
  async (apiDetails: any) => {
    let apiPart = apiDetails.apiPart;
    let pathParams = apiDetails.pathParams;
    let keyVals = apiDetails.keyVals;
    let messageBody = apiDetails.messageBody;
    let POST_URL = BASE_URL1 + apiPart + pathParams;
    if (keyVals) {
      keyVals = keyVals.map((pair) => pair.key + "=" + pair.value);
      POST_URL = POST_URL + "?" + keyVals.join("&");
    }
    console.log("postTierApplyInfo action creator:: url: " + POST_URL);
    const requestHeaders = {
      method: "POST",
      body: JSON.stringify(messageBody),
      headers: {
        Authorization: "Bearer b8625daa-ccbd-4167-8cde-673de141fd11",
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
    };
    console.log("The LA DRUG LIST Url = ", POST_URL);
    console.log("The LA DRUG LIST Headers = ", requestHeaders);
    return fetch(POST_URL, requestHeaders)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((json) => {
        console.log("Drug LIST LA Json : ", json);
        return json;
      });
  }
);

export const postReplaceLADrug = createAsyncThunk(
  "drug_details/postReplaceLADrug",
  async (apiDetails: any) => {
    let apiPart = apiDetails.apiPart;
    let pathParams = apiDetails.pathParams;
    let keyVals = apiDetails.keyVals;
    let messageBody = apiDetails.messageBody;
    let POST_URL = BASE_URL1 + apiPart + pathParams;
    if (keyVals) {
      keyVals = keyVals.map((pair) => pair.key + "=" + pair.value);
      POST_URL = POST_URL + "?" + keyVals.join("&");
    }
    const requestHeaders = {
      method: "POST",
      body: JSON.stringify(messageBody),
      headers: {
        Authorization: "Bearer b8625daa-ccbd-4167-8cde-673de141fd11",
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
    };
    console.log("THe Post Url = ", POST_URL);
    console.log("THe Request Headers = ", requestHeaders);
    return fetch(POST_URL, requestHeaders)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((json) => {
        console.log("postTierApplyInfo: ", json);
        return json;
      })
      .catch(error => console.log("THe POST Replace LA Drug ERROR = ", error));
  }
);
