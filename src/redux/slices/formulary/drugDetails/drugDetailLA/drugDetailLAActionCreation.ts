import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL1 } from "../../../../../api/http-helper";

const GET_DRUG_SUMMARY_LA =
  BASE_URL1 + "api/1/formulary-drug-summary-la/3303?entity_id=3303";

const POST_LA_FORMULARY_DRUGS = BASE_URL1 + "api/1/formulary-drugs-la/3303/MCR?index=0&limit=10&entity_id=3303";

export const getDrugDetailsLASummary = createAsyncThunk(
  "drug_details/LA_Summary",
  async (summary_id: string) => {
    console.log(
      "get Drug Details action creator:: url: " + GET_DRUG_SUMMARY_LA
    );
    const requestHeaders = {
      headers: {
        Authorization: "Bearer f4f83ba7-02e5-464f-bfe3-1684edc85794",
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
    };
    return fetch(GET_DRUG_SUMMARY_LA, requestHeaders)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((json) => {
        console.log("Drug DEtails LA Json : ", json);
        return json;
      });
  }
);

export const getDrugDetailsLAList = createAsyncThunk(
  "drug_details/LA_list",
  async (summary_id: string) => {
    console.log(
      "get Drug LIST action creator:: url: " + POST_LA_FORMULARY_DRUGS
    );
    const requestHeaders = {
      method: 'POST',
      headers: {
        "Authorization": "Bearer f4f83ba7-02e5-464f-bfe3-1684edc85794",
        "Accept": "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
    };
    return fetch(POST_LA_FORMULARY_DRUGS, requestHeaders)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((json) => {
        console.log("Drug LIST LA Json : ", json);
        return json;
      });
  }
);
