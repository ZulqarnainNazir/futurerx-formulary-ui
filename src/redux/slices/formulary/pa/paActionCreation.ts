import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL1 } from "../../../../api/http-helper";
import FormularyServices from "../../../../services/formulary.services";

const GET_PA_SUMMARY_URL = BASE_URL1 + "/api/1/pa-summary/";
const GET_PA_GROUP_DESCRIPTIONS_URL = BASE_URL1 + "/api/1/mcr-pa-group-descriptions/";
const GET_PA_TYPES_URL = BASE_URL1 + "/api/1/pa-types/4";
const GET_DRUG_LIST_URL = BASE_URL1 + "/api/1/drug-lists/";
const GET_PA_GROUP_DESCRIPTION_URL = BASE_URL1 + "/api/1/mcr-pa-group-description/";
const GET_PA_GROUP_DESCRIPTION_VERSTIONS_URL = BASE_URL1 + "/api/1/mcr-pa-group-description-versions/";
const POST_PA_GROUP_DESCRIPTION_VERSTION_URL = BASE_URL1 + "/api/1/mcr-pa-group-description-version/";
const GET_PA_GROUP_DESCRIPTION_DETAIL_URL = BASE_URL1 + "/api/1/mcr-st-group-description/462?entity_id=0";
const POSt_PA_GROUP_DESCRIPTION_URL = BASE_URL1 + "api/1/mcr-pa-group-description/1/";
const POST_FORUMULARY_DRUG_PA_URL = BASE_URL1 + "api/1/formulary-drugs-pa/";
const POST_APPLY_FORUMULARY_DRUG_PA_URL = BASE_URL1 + "api/1/apply-formulary-drug-pa/";
const POST_RELATED_FORUMULARY_DRUG_PA_URL = BASE_URL1 + "api/1/related-formulary-drugs/";
const POST_CRITERIA_LIST_PA_URL = BASE_URL1 + "api/1/criteria-list-pa/";
const GET_LOB_FORMULARIES_URL = BASE_URL1 + "/api/1/lob-formularies/";

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
    
    let pathParams = apiDetails.pathParams;
    let keyVals = pathParams.keyVals;
    let messageBody = apiDetails.messageBody;
    let POST_URL =  POSt_PA_GROUP_DESCRIPTION_URL + pathParams;
    if(keyVals){
      keyVals = keyVals.map(pair => pair.key+'='+pair.value);
      POST_URL = POST_URL + "?" + keyVals.join('&');
    }
    console.log("postPAGroupDescription action creator:: url: " + POST_URL);
    const requestHeaders  = {
        method: 'POST',
        body: JSON.stringify(messageBody),
        headers: {
            'Authorization': 'Bearer 6356291c-5b3e-4313-878b-dea9538c53cf',
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

export const getPaGrouptDescriptionDetail = createAsyncThunk(
  "formulary_summary/getStGrouptDescription",
  async (summary_id: string) => {
    console.log("getStGrouptDescription action creator:: url: " + GET_PA_GROUP_DESCRIPTION_DETAIL_URL + summary_id);
    const requestHeaders  = {
        headers: {
            'Authorization': 'Bearer 1e05ff8b-a0af-4a8f-8915-487321900f21',
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
        }
    }
    return fetch(GET_PA_GROUP_DESCRIPTION_DETAIL_URL ,requestHeaders)
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

export const postPAGroupDescriptionVersion = createAsyncThunk(
  "tier/postPAGroupDescriptionVersion",
  async (apiDetails: any) => {
    
    let pathParams = apiDetails.pathParams;
    let keyVals = pathParams.keyVals;
    let messageBody = apiDetails.messageBody;
    let POST_URL = BASE_URL1 + POST_PA_GROUP_DESCRIPTION_VERSTION_URL + pathParams;
    if(keyVals){
      keyVals = keyVals.map(pair => pair.key+'='+pair.value);
      POST_URL = POST_URL + "?" + keyVals.join('&');
    }
    console.log("postPAGroupDescriptionVersion action creator:: url: " + POST_URL);
    const requestHeaders  = {
        method: 'POST',
        body: JSON.stringify(messageBody),
        headers: {
            'Authorization': 'Bearer baf65faa-8fee-4d08-98f0-29ffb04cb1fc',
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
        console.log("postPAGroupDescriptionVersion: ", json);
        return json;
      });
  }
);

export const postFormularyDrugPA = createAsyncThunk(
  "tier/postFormularyDrugPA",
  async (apiDetails: any) => {
    
    let pathParams = apiDetails.pathParams;
    let keyVals = apiDetails.keyVals;
    let messageBody = apiDetails.messageBody;
    let POST_URL = POST_FORUMULARY_DRUG_PA_URL + pathParams ;
    if(keyVals){
      keyVals = keyVals.map(pair => pair.key+'='+pair.value);
      POST_URL = POST_URL + "?" + keyVals.join('&');
    }
    console.log("postFormularyDrugPA action creator:: url: " + POST_URL);
    const requestHeaders  = {
        method: 'POST',
        body: JSON.stringify(messageBody),
        headers: {
            'Authorization': 'Bearer baf65faa-8fee-4d08-98f0-29ffb04cb1fc',
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
        console.log("postFormularyDrugPA: ", json);
        return json;
      });
  }
);

export const postApplyFormularyDrugPA = createAsyncThunk(
  "tier/postApplyFormularyDrugPA",
  async (apiDetails: any) => {
    
    let pathParams = apiDetails.pathParams;
    let keyVals = apiDetails.keyVals;
    let messageBody = apiDetails.messageBody;
    let POST_URL = POST_APPLY_FORUMULARY_DRUG_PA_URL + pathParams ;
    if(keyVals){
      keyVals = keyVals.map(pair => pair.key+'='+pair.value);
      POST_URL = POST_URL + "?" + keyVals.join('&');
    }

    console.log("postApplyFormularyDrugPA action creator:: url: " + POST_URL);
    const requestHeaders  = {
        method: 'POST',
        body: JSON.stringify(messageBody),
        headers: {
            'Authorization': 'Bearer baf65faa-8fee-4d08-98f0-29ffb04cb1fc',
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
        console.log("postApplyFormularyDrugPA: ", json);
        return json;
      });
  }
);


export const postCriteriaListPA = createAsyncThunk(
  "tier/postCriteriaListPA",
  async (apiDetails: any) => {
    
    let pathParams = apiDetails.pathParams;
    let keyVals = apiDetails.keyVals;
    let messageBody = apiDetails.messageBody;
    let POST_URL = POST_CRITERIA_LIST_PA_URL + pathParams ;
    if(keyVals){
      keyVals = keyVals.map(pair => pair.key+'='+pair.value);
      POST_URL = POST_URL + "?" + keyVals.join('&');
    }
    console.log("postCriteriaListPA action creator:: url: " + POST_URL);
    const requestHeaders  = {
        method: 'POST',
        body: JSON.stringify(messageBody),
        headers: {
            'Authorization': 'Bearer baf65faa-8fee-4d08-98f0-29ffb04cb1fc',
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
        console.log("postCriteriaListPA: ", json);
        return json;
      });
  }
);


export const getLobFormularies = createAsyncThunk(
  "formulary_summary/getLobFormularies",
  async (apiDetails: any) => {
    console.log("getLobFormularies action creator:: url: " + GET_LOB_FORMULARIES_URL + apiDetails.formulary_type_id);
    const requestHeaders  = {
        // method: 'POST',
        // body: JSON.stringify(summary_id),
        headers: {
            'Authorization': 'Bearer 1e05ff8b-a0af-4a8f-8915-487321900f21',
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
        }
    }
    return fetch(GET_LOB_FORMULARIES_URL + apiDetails.formulary_type_id +'/'+apiDetails.formulary_lob_id ,requestHeaders)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((json) => {
        console.log("getLobFormularies: ", json);
        return json;
      });
  }
);

export const postRelatedFormularyDrugPA = createAsyncThunk(
  "tier/postRelatedFormularyDrugPA",
  async (apiDetails: any) => {
    
    let pathParams = apiDetails.pathParams;
    let keyVals = apiDetails.keyVals;
    let messageBody = apiDetails.messageBody;
    let POST_URL = POST_RELATED_FORUMULARY_DRUG_PA_URL + pathParams ;
    if(keyVals){
      keyVals = keyVals.map(pair => pair.key+'='+pair.value);
      POST_URL = POST_URL + "?" + keyVals.join('&');
    }
    console.log("postRelatedFormularyDrugPA action creator:: url: " + POST_URL);
    const requestHeaders  = {
        method: 'POST',
        body: JSON.stringify(messageBody),
        headers: {
            'Authorization': 'Bearer baf65faa-8fee-4d08-98f0-29ffb04cb1fc',
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
        console.log("postFormularyDrugPA: ", json);
        return json;
      });
  }
);