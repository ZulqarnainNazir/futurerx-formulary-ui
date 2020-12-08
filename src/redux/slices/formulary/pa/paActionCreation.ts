import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL1 } from "../../../../api/http-helper";
import FormularyServices from "../../../../services/formulary.services";

const GET_PA_SUMMARY_URL = BASE_URL1 + "/api/1/pa-summary/";
const GET_PA_GROUP_DESCRIPTIONS_URL = BASE_URL1 + "/api/1/pa-group-descriptions/";
const GET_PA_TYPES_URL = BASE_URL1 + "/api/1/pa-types/4";
const GET_DRUG_LIST_URL = BASE_URL1 + "/api/1/drug-lists/";
const GET_PA_GROUP_DESCRIPTION_URL = BASE_URL1 + "/api/1/pa-group-description/";
const GET_PA_GROUP_DESCRIPTION_VERSTIONS_URL = BASE_URL1 + "/api/1/pa-group-description-versions/";


export const getPaSummary = createAsyncThunk(
  "formulary_summary/getPaSummary",
  async (summary_id: string) => {
    console.log("getPaSummary action creator:: url: " + GET_PA_SUMMARY_URL + summary_id);
    const requestHeaders  = {
        // method: 'POST',
        // body: JSON.stringify(summary_id),
        headers: {
            'Authorization': 'Bearer 1e05ff8b-a0af-4a8f-8915-487321900f21',
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
        }
    }
    return fetch(GET_PA_SUMMARY_URL + summary_id ,requestHeaders)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((json) => {
        console.log("getPaSummary: ", json);
        return json;
      });
  }
);

export const getPaGrouptDescriptions = createAsyncThunk(
  "formulary_summary/getPaGrouptDescriptions",
  async (summary_id: string) => {
    console.log("getPaGrouptDescriptions action creator:: url: " + GET_PA_GROUP_DESCRIPTIONS_URL + summary_id);
    const requestHeaders  = {
        // method: 'POST',
        // body: JSON.stringify(summary_id),
        headers: {
            'Authorization': 'Bearer 1e05ff8b-a0af-4a8f-8915-487321900f21',
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
        }
    }
    return fetch(GET_PA_GROUP_DESCRIPTIONS_URL + summary_id ,requestHeaders)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((json) => {
        console.log("getPaGrouptDescriptions: ", json);
        return json;
      });
  }
);

export const getPaTypes = createAsyncThunk(
  "formulary_summary/getPaTypes",
  async (summary_id: string) => {
    console.log("getPaTypes action creator:: url: " + GET_PA_TYPES_URL + summary_id);
    const requestHeaders  = {
        // method: 'POST',
        // body: JSON.stringify(summary_id),
        headers: {
            'Authorization': 'Bearer 1e05ff8b-a0af-4a8f-8915-487321900f21',
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
        }
    }
    return fetch(GET_PA_TYPES_URL  ,requestHeaders)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((json) => {
        console.log("getPaTypes: ", json);
        return json;
      });
  }
);

export const getDrugLists = createAsyncThunk(
  "formulary_summary/getDrugLists",
  async (summary_id: string) => {
    console.log("getDrugLists action creator:: url: " + GET_DRUG_LIST_URL + summary_id);
    const requestHeaders  = {
        // method: 'POST',
        // body: JSON.stringify(summary_id),
        headers: {
            'Authorization': 'Bearer 1e05ff8b-a0af-4a8f-8915-487321900f21',
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
        }
    }
    return fetch(GET_DRUG_LIST_URL + summary_id ,requestHeaders)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((json) => {
        console.log("getDrugLists: ", json);
        return json;
      });
  }
);

export const getPaGrouptDescription = createAsyncThunk(
  "formulary_summary/getPaGrouptDescription",
  async (summary_id: string) => {
    console.log("getPaGrouptDescription action creator:: url: " + GET_PA_GROUP_DESCRIPTION_URL + summary_id);
    const requestHeaders  = {
        // method: 'POST',
        // body: JSON.stringify(summary_id),
        headers: {
            'Authorization': 'Bearer 1e05ff8b-a0af-4a8f-8915-487321900f21',
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
        }
    }
    return fetch(GET_PA_GROUP_DESCRIPTION_URL + summary_id ,requestHeaders)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((json) => {
        console.log("getPaGrouptDescription: ", json);
        return json;
      });
  }
);

export const getPaGrouptDescriptionVersions = createAsyncThunk(
  "formulary_summary/getPaGrouptDescriptionVersions",
  async (summary_id: string) => {
    console.log("getPaGrouptDescriptionVersions action creator:: url: " + GET_PA_GROUP_DESCRIPTION_VERSTIONS_URL + summary_id);
    const requestHeaders  = {
        // method: 'POST',
        // body: JSON.stringify(summary_id),
        headers: {
            'Authorization': 'Bearer 1e05ff8b-a0af-4a8f-8915-487321900f21',
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
        }
    }
    return fetch(GET_PA_GROUP_DESCRIPTION_VERSTIONS_URL + summary_id ,requestHeaders)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((json) => {
        console.log("getPaGrouptDescriptionVersions: ", json);
        return json;
      });
  }
);

export const postPAGroupDescription = createAsyncThunk(
  "tier/postPAGroupDescription",
  async (apiDetails: any) => {
    let apiPart = apiDetails.apiPart;
    let pathParams = apiDetails.pathParams;
    let keyVals = pathParams.keyVals;
    let messageBody = apiDetails.messageBody;
    let POST_URL = BASE_URL1 + apiPart + pathParams;
    if(keyVals){
      keyVals = keyVals.map(pair => pair.key+'='+pair.value);
      POST_URL = POST_URL + "?" + keyVals.join('&');
    }
    console.log("postPAGroupDescription action creator:: url: " + POST_URL);
    const requestHeaders  = {
        method: 'POST',
        body: JSON.stringify(messageBody),
        headers: {
            'Authorization': 'Bearer bcfb20e2-9b1d-443a-b96a-0de3cc5b5463',
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
        console.log("postPAGroupDescription: ", json);
        return json;
      });
  }
);