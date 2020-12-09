import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL1 } from "../../../../api/http-helper";
import FormularyServices from "../../../../services/formulary.services";

const URL = BASE_URL1;

const TIERS_URL = BASE_URL1 + "/api/1/formulary-tiers/";
const GET_TIER_LABAELS_URL = BASE_URL1 + "/api/1/tier-labels/6/0/";
const GET_FORMULARY_SETUP_URL = BASE_URL1 + "/api/1/formulary-setup/";



/*export const getTier = createAsyncThunk(
  "formulary_summary/getTier",
  async (summary_id: string) => {
    console.log("getFormularySummary action creator:: url: " + TIERS_URL + summary_id);
    const requestHeaders  = {
        // method: 'POST',
        // body: JSON.stringify(summary_id),
        headers: {
            'Authorization': 'Bearer 1e05ff8b-a0af-4a8f-8915-487321900f21',
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
        }
    }
    return fetch(TIERS_URL + summary_id ,requestHeaders)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((json) => {
        console.log("getTier: ", json);
        return json;
      });
  }
);*/

export const getTierLabels = createAsyncThunk(
  "formulary_summary/getTierLabels",
  async (summary_id: string) => {
    console.log("getTierLabels action creator:: url: " + GET_TIER_LABAELS_URL + summary_id);
    const requestHeaders  = {
        // method: 'POST',
        // body: JSON.stringify(summary_id),
        headers: {
            'Authorization': 'Bearer 1e05ff8b-a0af-4a8f-8915-487321900f21',
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
        }
    }
    return fetch(GET_TIER_LABAELS_URL + summary_id ,requestHeaders)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((json) => {
        console.log("getTier: ", json);
        return json;
      });
  }
);

export const getTier = createAsyncThunk(
  "tier/getTier",
  async (apiDetails: any) => {
    let apiPart = apiDetails.apiPart;
    let pathParams = apiDetails.pathParams;
    let keyVals = apiDetails.keyVals;
    let GET_URL = URL + apiPart + pathParams;
    if(keyVals){
      keyVals = keyVals.map(pair => pair.key+'='+pair.value);
      GET_URL = GET_URL + "?" + keyVals.join('&');
    }
    console.log("getTier action creator:: url: " + GET_URL);
    const requestHeaders  = {
        /*method: 'POST',
        body: JSON.stringify(messageBody),*/
        headers: {
            'Authorization': 'Bearer b8625daa-ccbd-4167-8cde-673de141fd11',
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
        }
    }
    return fetch(GET_URL,requestHeaders)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((json) => {
        console.log("getFormularyTiers: ", json);
        return json;
      });
  }
);

export const postTierApplyInfo = createAsyncThunk(
  "tier/postTierApplyInfo",
  async (apiDetails: any) => {
    let apiPart = apiDetails.apiPart;
    let pathParams = apiDetails.pathParams;
    let keyVals = apiDetails.keyVals;
    let messageBody = apiDetails.messageBody;
    let POST_URL = URL + apiPart + pathParams;
    if(keyVals){
      keyVals = keyVals.map(pair => pair.key+'='+pair.value);
      POST_URL = POST_URL + "?" + keyVals.join('&');
    }
    console.log("postTierApplyInfo action creator:: url: " + POST_URL);
    const requestHeaders  = {
        method: 'POST',
        body: JSON.stringify(messageBody),
        headers: {
            'Authorization': 'Bearer b8625daa-ccbd-4167-8cde-673de141fd11',
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
        }
    }
    return fetch(POST_URL,requestHeaders)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((json) => {
        console.log("postTierApplyInfo: ", json);
        return json;
      });
  }
);
