import { createSlice } from "@reduxjs/toolkit";
import { getDrugDetailsPTSummary, getPTDrugList } from "./ptActionCreation";
import {
  getPTSummaryFulfilled,
  getPTSummaryRejected,
  postPTListFulfilled,
  postPTListRejected,
} from "./ptReducers";

const ptState: any = {
  data: {},
  isLoading: false,
};

export const ptSlice = createSlice({
  name: "ptSummary",
  initialState: ptState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getDrugDetailsPTSummary.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getDrugDetailsPTSummary.fulfilled, (state, action) => {
      getPTSummaryFulfilled(state, action);
    }),
    builder.addCase(getDrugDetailsPTSummary.rejected, (state, action) => {
      getPTSummaryRejected(state, action);
    })
  ),
});

export const ptListSlice = createSlice({
  name: "ptDrugList",
  initialState: ptState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getPTDrugList.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getPTDrugList.fulfilled, (state, action) => {
      postPTListFulfilled(state, action);
    }),
    builder.addCase(getPTDrugList.rejected, (state, action) => {
      postPTListRejected(state, action);
    })
  ),
});
