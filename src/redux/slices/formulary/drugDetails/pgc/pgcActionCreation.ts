import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL1 } from "../../../../../api/http-helper";

const GET_DRUG_SUMMARY_PGC =
  BASE_URL1 + "api/1/formulary-drug-summary-pgc/3303?entity_id=3303";

const POST_PGC_FORMULARY_DRUGS =
  BASE_URL1 +
  "api/1/formulary-drugs-pgc/3303/FAOTC?index=0&limit=10&entity_id=3303";

const POST_PGC_EXCLUDED_DRUGS = BASE_URL1 + "api/1/formulary-drugs-pgc/3303/ExD?index=0&limit=10&entity_id=3303";

export const getDrugDetailsPGCSummary = createAsyncThunk(
  "drug_details/PGC_Summary",
  async (summary_id: string) => {
    const requestHeaders = {
      headers: {
        Authorization: "Bearer 1e05ff8b-a0af-4a8f-8915-487321900f21",
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
    };
    return fetch(GET_DRUG_SUMMARY_PGC, requestHeaders)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((json) => {
        return json;
      });
  }
);

export const getDrugDetailsPGCList = createAsyncThunk(
  "drug_details/PGC_list",
  async (summary_id: string) => {
    console.log(
      "get Drug LIST action creator:: url: " + POST_PGC_FORMULARY_DRUGS
    );
    const requestHeaders = {
      method: "POST",
      headers: {
        Authorization: "Bearer f4f83ba7-02e5-464f-bfe3-1684edc85794",
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
    };
    return fetch(POST_PGC_FORMULARY_DRUGS, requestHeaders)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((json) => {
        console.log("Drug LIST PGC Json : ", json);
        return json;
      });
  }
);

export const getExcludedDrugsPGCList = createAsyncThunk(
  "drug_details/PGC_Excluded_list",
  async (summary_id: string) => {
    const requestHeaders = {
      method: "POST",
      headers: {
        Authorization: "Bearer f4f83ba7-02e5-464f-bfe3-1684edc85794",
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
    };
    return fetch(POST_PGC_EXCLUDED_DRUGS, requestHeaders)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((json) => {
        console.log("Drug LIST PGC EXCLUDED Json : ", json);
        return json;
      });
  }
);
