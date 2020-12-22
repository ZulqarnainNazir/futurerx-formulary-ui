import { createSlice } from "@reduxjs/toolkit";
import { getDrugDetailsALSummary } from "./alActionCreation";
import { getALSummaryFulfilled, getALSummaryRejected } from "./alReducers";

const alState: any = {
  data: {},
  isLoading: false,
};

export const alSlice = createSlice({
  name: "alSummary",
  initialState: alState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getDrugDetailsALSummary.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getDrugDetailsALSummary.fulfilled, (state, action) => {
      getALSummaryFulfilled(state, action);
    }),
    builder.addCase(getDrugDetailsALSummary.rejected, (state, action) => {
      getALSummaryRejected(state, action);
    })
  ),
});
