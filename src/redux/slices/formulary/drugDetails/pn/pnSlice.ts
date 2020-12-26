import { createSlice } from "@reduxjs/toolkit";
import { getDrugDetailsPNSummary, getDrugDetailsPNList } from "./pnActionCreation";
import { getPNSummaryFulfilled, getPNSummaryRejected, postPNListFulfilled, postPNListRejected } from "./pnReducers";

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

export const pnListSlice = createSlice({
  name: "pnDrugList",
  initialState: pnState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getDrugDetailsPNList.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getDrugDetailsPNList.fulfilled, (state, action) => {
      postPNListFulfilled(state, action);
    }),
    builder.addCase(getDrugDetailsPNList.rejected, (state, action) => {
      postPNListRejected(state, action);
    })
  ),
});
