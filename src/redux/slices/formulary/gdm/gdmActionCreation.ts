import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL1 } from "../../../../api/http-helper";

const URL = BASE_URL1 + "api/1/mcr-st-group-description/";
export const saveGDM = createAsyncThunk(
  "save/groupdescription",
  async (data: any) => {
    const requestHeaders  = {
        method:'PUT',
        body: JSON.stringify(data.body),
        headers: {
            'Authorization': 'Bearer 1e05ff8b-a0af-4a8f-8915-487321900f21',
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
        }
    }
    return fetch(`${URL}${data.latestId}/${data.formularyId}?entity_id=0`,requestHeaders)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .catch((error) => {
        return error;
      });
  }
);