import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  buildUrl,
  getHeaders,
  postHeaders,
  fetchRequest,
} from "../../../../../api/http-drug-details";

// const GET_DRUG_SUMMARY_AL = BASE_URL1 + "api/1/formulary-drug-summary-al/3301?entity_id=3301

export const getDrugDetailsALSummary = createAsyncThunk(
  "drug_details/AL_Summary",
  async (apiDetails: any) => {
    let GET_URL = buildUrl({ apiDetails });
    const requestHeaders = getHeaders();
    return fetchRequest(GET_URL, requestHeaders);
  }
);
