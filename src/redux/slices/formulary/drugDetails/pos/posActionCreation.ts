import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  buildUrl,
  getHeaders,
  postHeaders,
  fetchRequest,
} from "../../../../../api/http-drug-details";

// const GET_DRUG_SUMMARY_POS = BASE_URL1 + "api/1/formulary-drug-summary-pos/3326?entity_id=3326"

export const getDrugDetailsPOSSummary = createAsyncThunk(
  "drug_details/pos_Summary",
  async (apiDetails: any) => {
    let GET_URL = buildUrl({ apiDetails });
    const requestHeaders = getHeaders();
    return fetchRequest(GET_URL, requestHeaders);
  }
);

export const getDrugDetailsPOSSettings = createAsyncThunk(
  "drug_details/pos_settings",
  async (apiDetails: any) => {
    let GET_URL = buildUrl({ apiDetails });
    const requestHeaders = getHeaders();
    return fetchRequest(GET_URL, requestHeaders);
  }
);
