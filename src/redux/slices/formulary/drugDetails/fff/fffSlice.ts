import { createSlice } from "@reduxjs/toolkit";
import { getDrugDetailsFFFSummary, getDrugDetailsFFFList } from "./fffActionCreation";
import { getFFFSummaryFulfilled, getFFFSummaryRejected, postFFFListFulfilled, postFFFListRejected } from "./fffReducers";

const fffState: any = {
  data: {},
  isLoading: false,
};

export const fffSlice = createSlice({
  name: "fffSummary",
  initialState: fffState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getDrugDetailsFFFSummary.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getDrugDetailsFFFSummary.fulfilled, (state, action) => {
      getFFFSummaryFulfilled(state, action);
    }),
    builder.addCase(getDrugDetailsFFFSummary.rejected, (state, action) => {
      getFFFSummaryRejected(state, action);
    })
  ),
});

export const fffListSlice = createSlice({
  name: "fffDrugList",
  initialState: fffState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getDrugDetailsFFFList.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getDrugDetailsFFFList.fulfilled, (state, action) => {
      postFFFListFulfilled(state, action);
    }),
    builder.addCase(getDrugDetailsFFFList.rejected, (state, action) => {
      postFFFListRejected(state, action);
    })
  ),
});
