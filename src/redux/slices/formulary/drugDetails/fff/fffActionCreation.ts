import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL1 } from "../../../../../api/http-helper";

const GET_DRUG_SUMMARY_FFF =
  BASE_URL1 + "api/1/formulary-drug-summary-fff/3303?entity_id=3303";

const requestHeaders = {
  headers: {
    Authorization: "Bearer 1e05ff8b-a0af-4a8f-8915-487321900f21",
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
  },
};

export const getDrugDetailsFFFSummary = createAsyncThunk(
  "drug_details/FFF_Summary",
  async (summary_id: string) => {
    return fetch(GET_DRUG_SUMMARY_FFF, requestHeaders)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((json) => {
        return json;
      });
  }
);