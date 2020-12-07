import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL1 } from "../../../../api/http-helper";

const URL = BASE_URL1 + "/api/1/formulary-validations/";
export const getValidationList = createAsyncThunk(
  "formulary/getValidationList",
  async (formulary_id: string) => {
    const requestHeaders  = {
        headers: {
            'Authorization': 'Bearer 1e05ff8b-a0af-4a8f-8915-487321900f21',
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
        }
    }
    return fetch(URL + formulary_id,requestHeaders)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .catch((error) => {
        return error;
      });
  }
);