import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL1 } from "../../../../../api/http-helper";

const GET_DRUG_SUMMARY_IBF =
  BASE_URL1 + "api/1/formulary-drug-summary-ibf/3323?entity_id=3323";

const POST_IBF_FORMULARY_DRUGS =
  BASE_URL1 +
  "api/1/formulary-drugs-ibf/3298/MCR?index=0&limit=10&entity_id=3298";

export const getDrugDetailsIBFSummary = createAsyncThunk(
  "drug_details/IBF_Summary",
  async (summary_id: string) => {
    const requestHeaders = {
      headers: {
        Authorization: "Bearer 1e05ff8b-a0af-4a8f-8915-487321900f21",
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
    };
    return fetch(GET_DRUG_SUMMARY_IBF, requestHeaders)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((json) => {
        return json;
      });
  }
);

export const getDrugDetailsIBFList = createAsyncThunk(
  "drug_details/IBF_list",
  async (summary_id: string) => {
    const requestHeaders = {
      method: "POST",
      headers: {
        Authorization: "Bearer f4f83ba7-02e5-464f-bfe3-1684edc85794",
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
    };
    return fetch(POST_IBF_FORMULARY_DRUGS, requestHeaders)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((json) => {
        return json;
      });
  }
);
