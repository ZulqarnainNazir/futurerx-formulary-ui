import {createSlice} from "@reduxjs/toolkit";

import { getStSummary } from "./stepTherapyActionCreation";
import { getStepTherapyFulfilled,getStepTherapyRejected } from "./stepTherapyReducers";

const tierState: any = {
  data: {},
  isLoading: false,
}
  

export const stepTherapySlice = createSlice({
  name: "stSummary",
  initialState: tierState,
  reducers: {

  },
  extraReducers: builder => (
    builder.addCase(getStSummary.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getStSummary.fulfilled, (state, action) => {
      getStepTherapyFulfilled(state, action);
    }),
    builder.addCase(getStSummary.rejected, (state, action) => {
      getStepTherapyRejected(state, action);
    })
  )
});