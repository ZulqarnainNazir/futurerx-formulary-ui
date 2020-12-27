import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL1 } from "../../../../api/http-helper";
import FormularyServices from "../../../../services/formulary.services";
import * as commonConstants from "../../../../api/http-commons";
import axios from "axios";

const URL = BASE_URL1;

export async function getMainComparison(
    apiDetails: any
): Promise<any> {
    let apiPart = apiDetails.apiPart;
    let pathParams = apiDetails.pathParams;
    let keyVals = apiDetails.keyVals;
    let GET_URL = URL + apiPart + pathParams;
    if (keyVals) {
        keyVals = keyVals.map(pair => pair.key + '=' + pair.value);
        GET_URL = GET_URL + "?" + keyVals.join('&');
    }
    console.log("getMainComparison service:: url: " + GET_URL);
    const requestHeaders = {
        headers: commonConstants.REQUEST_HEADER
    }
    try {
        const response = await axios.get(GET_URL, requestHeaders);
        if (response?.data?.code === "200") {
            return response?.data?.result;
        }
        return null;
    } catch (error) {
        throw error;
    }
}