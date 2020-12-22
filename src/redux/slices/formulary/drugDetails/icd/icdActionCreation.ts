import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  buildUrl,
  getHeaders,
  postHeaders,
  fetchRequest,
} from "../../../../../api/http-drug-details";

// const GET_DRUG_SUMMARY_ICD = BASE_URL1 + "api/1/formulary-drug-summary-icdl/3326?entity_id=3326"

export const getDrugDetailsICDSummary = createAsyncThunk(
    "drug_details/icd_Summary",
    async (apiDetails: any) => {
      let GET_URL = buildUrl({ apiDetails });
      const requestHeaders = getHeaders();
      return fetchRequest(GET_URL, requestHeaders);
    }
  );