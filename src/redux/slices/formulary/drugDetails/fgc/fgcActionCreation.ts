import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL1 } from "../../../../../api/http-helper";
import { buildUrl, getHeaders, postHeaders, fetchRequest } from "../../../../../api/http-drug-details";

const GET_DRUG_FGC = BASE_URL1 + "api/1/formulary-tiers/3298?entity_id=3298";

const requestHeaders = {
  headers: {
    Authorization: "Bearer 1e05ff8b-a0af-4a8f-8915-487321900f21",
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
  },
};

export const getDrugDetailsFGC = createAsyncThunk(
  "drug_details/FGC",
  async (apiDetails: any) => {
    return fetchRequest(GET_DRUG_FGC, requestHeaders);
  }
);
