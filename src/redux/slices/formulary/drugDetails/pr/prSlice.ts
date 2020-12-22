import { createSlice } from "@reduxjs/toolkit";
import { getDrugDetailsPRSummary } from "./prActionCreation";
import { getPRSummaryFulfilled, getPRSummaryRejected } from "./prReducers";

const prState: any = {
  data: {},
  isLoading: false,
};

export const prSlice = createSlice({
  name: "prSummary",
  initialState: prState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getDrugDetailsPRSummary.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getDrugDetailsPRSummary.fulfilled, (state, action) => {
      getPRSummaryFulfilled(state, action);
    }),
    builder.addCase(getDrugDetailsPRSummary.rejected, (state, action) => {
      getPRSummaryRejected(state, action);
    })
  ),
});
