//formularySummarySlice

import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL1 } from "../../../../api/http-helper"; 
//https://api-dev-config-formulary.futurerx.com/api/1/formularies/1?index=0&limit=10
const URL = BASE_URL1 + "/api/1/formularies/1?index=0&limit=10";

export const getBase = createAsyncThunk("formularyBase",
    async (argASD: string) => {
      //console.log("getFormularySummary action creator:: url: " + TIERS_URL + summary_id);
      const requestHeaders  = {
          // method: 'POST',
          // body: JSON.stringify(summary_id),
          headers: {
              'Authorization': 'Bearer 1e05ff8b-a0af-4a8f-8915-487321900f21',
              'Accept': 'application/json',
              'Content-Type': 'application/json;charset=UTF-8',
          }
      }
      console.log("List....");
      return fetch(URL ,requestHeaders)
        .then(
          (response) => {
          console.log("GET FL List: A --------------------------------------");
          if (!response.ok) throw Error(response.statusText);
          return response.json();
        })
        .then((json) => {
          console.log("GET FL List: B ------------------------------", json);
          return json;
        }).catch(()=>{
          console.log("=======================================")
        })
        ;
    }
  );
  