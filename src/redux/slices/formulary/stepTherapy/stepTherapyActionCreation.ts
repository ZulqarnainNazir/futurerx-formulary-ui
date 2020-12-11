import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL1 } from "../../../../api/http-helper";
import FormularyServices from "../../../../services/formulary.services";

const GET_ST_SUMMARY_URL = BASE_URL1 + "/api/1/st-summary/";
const GET_ST_GROUP_DESCRIPTIONS_URL = BASE_URL1 + "/api/1/st-group-descriptions/";
const GET_ST_TYPES_URL = BASE_URL1 + "/api/1/st-types/4";
const GET_DRUG_LIST_URL = BASE_URL1 + "/api/1/drug-lists/";
const GET_ST_GROUP_DESCRIPTION_URL = BASE_URL1 + "/api/1/st-group-description/";
//const GET_ST_GROUP_DESCRIPTION_URL = BASE_URL1 + "api/1/mcr-st-group-description/";
const GET_ST_GROUP_DESCRIPTION_VERSTIONS_URL = BASE_URL1 + "/api/1/st-group-description-versions/";


export const getStSummary = createAsyncThunk(
  "formulary_summary/getStSummary",
  async (summary_id: string) => {
    console.log("getStSummary action creator:: url: " + GET_ST_SUMMARY_URL + summary_id);
    const requestHeaders  = {
        // method: 'POST',
        // body: JSON.stringify(summary_id),
        headers: {
            'Authorization': 'Bearer 1e05ff8b-a0af-4a8f-8915-487321900f21',
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
        }
    }
    return fetch(GET_ST_SUMMARY_URL + summary_id ,requestHeaders)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((json) => {
        console.log("getStSummary: ", json);
        return json;
      });
  }
);

export const getStGrouptDescriptions = createAsyncThunk(
  "formulary_summary/getStGrouptDescriptions",
  async (summary_id: string) => {
    console.log("getStGrouptDescriptions action creator:: url: " + GET_ST_GROUP_DESCRIPTIONS_URL + summary_id);
    const requestHeaders  = {
        // method: 'POST',
        // body: JSON.stringify(summary_id),
        headers: {
            'Authorization': 'Bearer 1e05ff8b-a0af-4a8f-8915-487321900f21',
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
        }
    }
    return fetch(GET_ST_GROUP_DESCRIPTIONS_URL + summary_id ,requestHeaders)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((json) => {
        console.log("getStGrouptDescriptions: ", json);
        return json;
      });
  }
);

export const getStTypes = createAsyncThunk(
  "formulary_summary/getStTypes",
  async (summary_id: string) => {
    console.log("getStTypes action creator:: url: " + GET_ST_TYPES_URL + summary_id);
    const requestHeaders  = {
        // method: 'POST',
        // body: JSON.stringify(summary_id),
        headers: {
            'Authorization': 'Bearer 1e05ff8b-a0af-4a8f-8915-487321900f21',
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
        }
    }
    return fetch(GET_ST_TYPES_URL  ,requestHeaders)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((json) => {
        console.log("getStTypes: ", json);
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

export const getStGrouptDescription = createAsyncThunk(
  "formulary_summary/getStGrouptDescription",
  async (summary_id: string) => {
    console.log("getStGrouptDescription action creator:: url: " + GET_ST_GROUP_DESCRIPTION_URL + summary_id);
    const requestHeaders  = {
        headers: {
            'Authorization': 'Bearer 1e05ff8b-a0af-4a8f-8915-487321900f21',
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
        }
    }
    return fetch(GET_ST_GROUP_DESCRIPTION_URL+summary_id  ,requestHeaders)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((json) => {
        console.log("getStGrouptDescription: ", json);
        return json;
      });
  }
);

export const getStGrouptDescriptionVersions = createAsyncThunk(
  "formulary_summary/getStGrouptDescriptionVersions",
  async (summary_id: string) => {
    console.log("getStGrouptDescriptionVersions action creator:: url: " + GET_ST_GROUP_DESCRIPTION_VERSTIONS_URL + summary_id);
    const requestHeaders  = {
        // method: 'POST',
        // body: JSON.stringify(summary_id),
        headers: {
            'Authorization': 'Bearer 1e05ff8b-a0af-4a8f-8915-487321900f21',
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
        }
    }
    return fetch(GET_ST_GROUP_DESCRIPTION_VERSTIONS_URL + summary_id ,requestHeaders)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((json) => {
        console.log("getStGrouptDescriptionVersions: ", json);
        return json;
      });
  }
);