import { createSlice } from "@reduxjs/toolkit";
import { getDrugDetailsPNSummary } from "./pnActionCreation";
import { getPNSummaryFulfilled, getPNSummaryRejected } from "./pnReducers";

const pnState: any = {
  data: {},
  isLoading: false,
};

export const pnSlice = createSlice({
  name: "pnSummary",
  initialState: pnState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getDrugDetailsPNSummary.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getDrugDetailsPNSummary.fulfilled, (state, action) => {
      getPNSummaryFulfilled(state, action);
    }),
    builder.addCase(getDrugDetailsPNSummary.rejected, (state, action) => {
      getPNSummaryRejected(state, action);
    })
  ),
});
