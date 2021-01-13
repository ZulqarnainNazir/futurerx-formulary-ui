import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL1 } from "../../../../api/http-helper";
import { REQUEST_HEADER } from "../../../../api/http-commons";

const URL = BASE_URL1 + "/api/1/formulary-validations/";
export const getValidationList = createAsyncThunk(
  "formulary/getValidationList",
  async (formulary_id: string) => {
    const requestHeaders = {
      // headers: REQUEST_HEADER,
    };
    return fetch(URL + formulary_id, requestHeaders)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .catch((error) => {
        return error;
      });
  }
);
