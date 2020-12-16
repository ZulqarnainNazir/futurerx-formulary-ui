import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL1 } from "../../../../api/http-helper";
import FormularyServices from "../../../../services/formulary.services";

const URL = BASE_URL1;

export const getClassificationSystems = createAsyncThunk(
  "categoryClass/getClassificationSystems",
  async (apiDetails: any) => {
    let apiPart = apiDetails.apiPart;
    let pathParams = apiDetails.pathParams;
    let keyVals = apiDetails.keyVals;
    let GET_URL = URL + apiPart + pathParams;
    if(keyVals){
      keyVals = keyVals.map(pair => pair.key+'='+pair.value);
      GET_URL = GET_URL + "?" + keyVals.join('&');
    }
    console.log("getClassificationSystems action creator:: url: " + GET_URL);
    const requestHeaders  = {
        /*method: 'POST',
        body: JSON.stringify(messageBody),*/
        headers: {
            'Authorization': 'Bearer b8625daa-ccbd-4167-8cde-673de141fd11',
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
        }
    }
    return fetch(GET_URL,requestHeaders)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((json) => {
        console.log("getClassificationSystems: ", json);
        return json;
      });
  }
);

export const postDrugsCategory = createAsyncThunk(
  "categoryClass/postDrugsCategory",
  async (apiDetails: any) => {
    let apiPart = apiDetails.apiPart;
    let pathParams = apiDetails.pathParams;
    let keyVals = apiDetails.keyVals;
    let messageBody = apiDetails.messageBody;
    let POST_URL = URL + apiPart + pathParams;
    if(keyVals){
      keyVals = keyVals.map(pair => pair.key+'='+pair.value);
      POST_URL = POST_URL + "?" + keyVals.join('&');
    }
    console.log("postDrugsCategory action creator:: url: " + POST_URL);
    const requestHeaders  = {
        method: 'POST',
        body: JSON.stringify(messageBody),
        headers: {
            'Authorization': 'Bearer b8625daa-ccbd-4167-8cde-673de141fd11',
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
        }
    }
    return fetch(POST_URL,requestHeaders)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((json) => {
        console.log("postDrugsCategory: ", json);
        return json;
      });
  }
);
