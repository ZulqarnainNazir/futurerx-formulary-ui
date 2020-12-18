import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  buildUrl,
  getHeaders,
  postHeaders,
  fetchRequest,
} from "../../../../../api/http-drug-details";

// const GET_DRUG_SUMMARY_SO = BASE_URL1 + "api/1/formulary-drug-summary-sboth/3298?entity_id=3298";

// const POST_SO_FORMULARY_DRUGS = BASE_URL1 + "api/1/formulary-drugs-sboth/3298/MCR?index=0&limit=10&entity_id=3298";

export const getDrugDetailsSOSummary = createAsyncThunk(
  "drug_details/SO_Summary",
  async (apiDetails: any) => {
    let GET_URL = buildUrl({ apiDetails });
    const requestHeaders = getHeaders();
    return fetchRequest(GET_URL, requestHeaders);
  }
);

export const getDrugDetailsSOList = createAsyncThunk(
  "drug_details/SO_list",
  async (apiDetails: any) => {
    let POST_URL = buildUrl({ apiDetails });
    const requestHeaders = postHeaders(apiDetails);
    return fetchRequest(POST_URL, requestHeaders);
  }
);
