import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  buildUrl,
  getHeaders,
  postHeaders,
  fetchRequest,
} from "../../../../../api/http-drug-details";

// const GET_DRUG_SUMMARY_LIS = BASE_URL1 + "api/1/formulary-drug-summary-lis/3323?entity_id=3323";

// const POST_LIS_FORMULARY_DRUGS = BASE_URL1 + "api/1/formulary-drugs-lis/3298/MCR?index=0&limit=10&entity_id=3298";

export const getDrugDetailsLISSummary = createAsyncThunk(
  "drug_details/LIS_Summary",
  async (apiDetails: any) => {
    // const requestHeaders = {
    //   headers: {
    //     Authorization: "Bearer 1e05ff8b-a0af-4a8f-8915-487321900f21",
    //     Accept: "application/json",
    //     "Content-Type": "application/json;charset=UTF-8",
    //   },
    // };
    let GET_URL = buildUrl({ apiDetails });
    const requestHeaders = getHeaders();
    return fetchRequest(GET_URL, requestHeaders);
  }
);

export const getDrugDetailsLISList = createAsyncThunk(
  "drug_details/LIS_list",
  async (apiDetails: any) => {
    // const requestHeaders = {
    //   method: "POST",
    //   headers: {
    //     Authorization: "Bearer f4f83ba7-02e5-464f-bfe3-1684edc85794",
    //     Accept: "application/json",
    //     "Content-Type": "application/json;charset=UTF-8",
    //   },
    // };
    let POST_URL = buildUrl({ apiDetails });
    const requestHeaders = postHeaders(apiDetails);
    return fetchRequest(POST_URL, requestHeaders);
  }
);
