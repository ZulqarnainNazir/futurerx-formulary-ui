import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  buildUrl,
  getHeaders,
  postHeaders,
  fetchRequest,
} from "../../../../../api/http-drug-details";

// const GET_DRUG_SUMMARY_GL = BASE_URL1 + "api/1/formulary-drug-summary-gl/3326?entity_id=3326"

export const getDrugDetailsGLSummary = createAsyncThunk(
  "drug_details/gl_Summary",
  async (apiDetails: any) => {
    let GET_URL = buildUrl({ apiDetails });
    const requestHeaders = getHeaders();
    return fetchRequest(GET_URL, requestHeaders);
  }
);
