import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  buildUrl,
  getHeaders,
  postHeaders,
  fetchRequest,
} from "../../../../../api/http-drug-details";

// const GET_DRUG_SUMMARY_PT = BASE_URL1 + "api/1/formulary-drug-summary-prtx/3326?entity_id=3326";

// const POST_PT_DRUGS = BASE_URL1 + "api/1/formulary-drugs-prtx/3345/COMM?index=0&limit=10&entity_id=3345

export const getDrugDetailsPTSummary = createAsyncThunk(
  "drug_details/pt_Summary",
  async (apiDetails: any) => {
    let GET_URL = buildUrl({ apiDetails });
    const requestHeaders = getHeaders();
    return fetchRequest(GET_URL, requestHeaders);
  }
);

export const getPTDrugList = createAsyncThunk(
  "drug_details/PT_drug_list",
  async (apiDetails: any) => {
    let POST_URL = buildUrl({ apiDetails });
    const requestHeaders = postHeaders(apiDetails);
    return fetchRequest(POST_URL, requestHeaders);
  }
);

export const getPTReplaceSrch = createAsyncThunk(
  "drug_details/PT_replace_srch",
  async (apiDetails: any) => {
    let GET_URL = buildUrl({ apiDetails });
    const requestHeaders = getHeaders();
    return fetchRequest(GET_URL, requestHeaders);
  }
);

