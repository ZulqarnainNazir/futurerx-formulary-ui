import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL1 } from "../../../../../api/http-helper";

const GET_DRUG_SUMMARY_MONM =
  BASE_URL1 + "api/1/formulary-drug-summary-monm/3303?entity_id=3303";

const requestHeaders = {
  headers: {
    Authorization: "Bearer 1e05ff8b-a0af-4a8f-8915-487321900f21",
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
  },
};

export const getDrugDetailsMOMNSummary = createAsyncThunk(
  "drug_details/MOMN_Summary",
  async (summary_id: string) => {
    console.log(
      "get Drug Details action creator:: url: " + GET_DRUG_SUMMARY_MONM
    );
    return fetch(GET_DRUG_SUMMARY_MONM, requestHeaders)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((json) => {
        console.log("Drug DEtails MONM Json : ", json);
        return json;
      });
  }
);
