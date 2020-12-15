import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL1 } from "../../../../../api/http-helper";

const GET_DRUG_SUMMARY_MONM =
  BASE_URL1 + "api/1/formulary-drug-summary-monm/3303?entity_id=3303";
const POST_MO_FORMULARY_DRUGS =
  BASE_URL1 +
  "api/1/formulary-drugs-monm/3303/MCR/MO?index=0&limit=10&entity_id=3303";

export const getDrugDetailsMOMNSummary = createAsyncThunk(
  "drug_details/MOMN_Summary",
  async (summary_id: string) => {
    console.log(
      "get Drug Details action creator:: url: " + GET_DRUG_SUMMARY_MONM
    );

    const requestHeaders = {
      headers: {
        Authorization: "Bearer 1e05ff8b-a0af-4a8f-8915-487321900f21",
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
    };

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

export const getDrugDetailsMOList = createAsyncThunk(
  "drug_details/MO_list",
  async (summary_id: string) => {
    console.log(
      "get Drug LIST action creator:: url: " + POST_MO_FORMULARY_DRUGS
    );
    const requestHeaders = {
      method: 'POST',
      headers: {
        "Authorization": "Bearer f4f83ba7-02e5-464f-bfe3-1684edc85794",
        "Accept": "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
    };
    return fetch(POST_MO_FORMULARY_DRUGS, requestHeaders)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((json) => {
        console.log("Drug LIST MO Json : ", json);
        return json;
      });
  }
);
