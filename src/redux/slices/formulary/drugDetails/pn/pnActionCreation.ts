import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  buildUrl,
  getHeaders,
  postHeaders,
  fetchRequest,
} from "../../../../../api/http-drug-details";

// const GET_DRUG_SUMMARY_PN = BASE_URL1 + "api/1/formulary-drug-summary-phnw/3326?entity_id=3326"

// const POST_PN_FORMULARY_DRUGS = BASE_URL1 + "api/1/formulary-drugs-phnw/3345/COMM?index=0&limit=10&entity_id=3345

export const getDrugDetailsPNSummary = createAsyncThunk(
  "drug_details/pn_Summary",
  async (apiDetails: any) => {
    let GET_URL = buildUrl({ apiDetails });
    const requestHeaders = getHeaders();
    return fetchRequest(GET_URL, requestHeaders);
  }
);

export const getDrugDetailsPNList = createAsyncThunk(
  "drug_details/pn_list",
  async (apiDetails: any) => {
    let POST_URL = buildUrl({ apiDetails });
    const requestHeaders = postHeaders(apiDetails);
    return fetchRequest(POST_URL, requestHeaders);
  }
);

export const getPNReplaceSrch = createAsyncThunk(
  "drug_details/PN_replace_srch",
  async (apiDetails: any) => {
    let GET_URL = buildUrl({ apiDetails });
    const requestHeaders = getHeaders();
    return fetchRequest(GET_URL, requestHeaders);
  }
);