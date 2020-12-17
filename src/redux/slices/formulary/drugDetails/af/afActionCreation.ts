import { createAsyncThunk } from "@reduxjs/toolkit";
import { buildUrl, getHeaders, postHeaders } from "../../../../../api/http-drug-details";

// const GET_DRUG_SUMMARY_AF = BASE_URL1 + "api/1/formulary-drug-summary-abrfa/3298?entity_id=3298";

// const POST_AF_FORMULARY_DRUGS = BASE_URL1 + "api/1/formulary-drugs-abrfa/3298/MCR?index=0&limit=10&entity_id=3298";

// const POST_REPLACE_AF_FORMULARY_DRUG = BASE_URL1 + "api/1/apply-formulary-drug-abrfa/3106/MCR/replace?entity_id=3106";

// const POST_REMOVE_AF_FORMULARY_DRUG = BASE_URL1 + "api/1/apply-formulary-drug-abrfa/3106/MCR/remove?entity_id=3106";

export const getDrugDetailsAFSummary = createAsyncThunk(
  "drug_details/AF_Summary",
  async (apiDetails: any) => {
    let GET_URL = buildUrl({ apiDetails });
    const requestHeaders = getHeaders();
    return fetch(GET_URL, requestHeaders)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((json) => {
        return json;
      });
  }
);

export const getDrugDetailsAFList = createAsyncThunk(
  "drug_details/AF_list",
  async (apiDetails: any) => {
    let POST_URL = buildUrl({ apiDetails });
    const requestHeaders = postHeaders(apiDetails);
    return fetch(POST_URL, requestHeaders)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((json) => {
        return json;
      });
  }
);

export const postReplaceAFDrug = createAsyncThunk(
  "drug_details/postReplaceAFDrug",
  async (apiDetails: any) => {
    let POST_URL = buildUrl({ apiDetails });
    const requestHeaders = postHeaders(apiDetails);
    return fetch(POST_URL, requestHeaders)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((json) => {
        return json;
      });
  }
);

export const postRemoveAFDrug = createAsyncThunk(
  "drug_details/postRemoveAFDrug",
  async (apiDetails: any) => {
    let POST_URL = buildUrl({ apiDetails });
    const requestHeaders = postHeaders(apiDetails);
    return fetch(POST_URL, requestHeaders)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((json) => {
        return json;
      });
  }
);
