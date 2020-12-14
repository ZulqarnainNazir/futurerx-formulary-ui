import { createSlice } from "@reduxjs/toolkit";
import { getDrugDetailsSSMSummary } from "./ssmActionCreation";
import { getSSMSummaryFulfilled, getSSMSummaryRejected } from "./ssmReducers";

const ssmState: any = {
  data: {},
  isLoading: false,
};

export const ssmSlice = createSlice({
  name: "ssmSummary",
  initialState: ssmState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getDrugDetailsSSMSummary.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getDrugDetailsSSMSummary.fulfilled, (state, action) => {
      getSSMSummaryFulfilled(state, action);
    }),
    builder.addCase(getDrugDetailsSSMSummary.rejected, (state, action) => {
      getSSMSummaryRejected(state, action);
    })
  ),
});
