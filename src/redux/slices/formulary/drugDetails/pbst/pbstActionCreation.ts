import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL1 } from "../../../../../api/http-helper";
import {
  buildUrl,
  getHeaders,
  postHeaders,
  fetchRequest,
} from "../../../../../api/http-drug-details";

const GET_DRUG_SUMMARY_PBST =
  BASE_URL1 + "api/1/formulary-drug-summary-pbst/3323?entity_id=3323";

const POST_PBST_FORMULARY_DRUGS = BASE_URL1 + "api/1/formulary-drugs-pbst/3298/MCR?index=0&limit=10&entity_id=3298";

export const getDrugDetailsPBSTSummary = createAsyncThunk(
  "drug_details/PBST_Summary",
  async (apiDetails: any) => {
    const requestHeaders = {
      headers: {
        Authorization: "Bearer 1e05ff8b-a0af-4a8f-8915-487321900f21",
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
    };
    return fetchRequest(GET_DRUG_SUMMARY_PBST, requestHeaders);
  }
);

export const getDrugDetailsPBSTList = createAsyncThunk(
  "drug_details/PBST_list",
  async (apiDetails: any) => {
    const requestHeaders = {
      method: 'POST',
      headers: {
        "Authorization": "Bearer f4f83ba7-02e5-464f-bfe3-1684edc85794",
        "Accept": "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
    };
    return fetchRequest(POST_PBST_FORMULARY_DRUGS, requestHeaders);
  }
);
