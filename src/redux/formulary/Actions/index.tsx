import { createAsyncThunk, createAction} from "@reduxjs/toolkit";
import FormularyServices from "../../../services/formulary.services";


export const success = createAction<any | undefined>('SUCCESS')
export const failer = createAction<any | undefined>('FAILER')

export const getData = createAsyncThunk(
    "formulary_summary/getFormularySummary",
    async (summary_id: number) => {
       await FormularyServices.getSummary(summary_id)
        .then((response) => {
            console.log(response)
            return response.data
        })
        .then((json) => {
          console.log("getFormularySummary: ", json);
          return json;
        });
    }
  );