import { createSlice } from "@reduxjs/toolkit";
import {
  getDrugDetailsSOSummary,
  getDrugDetailsSOList,
} from "./soActionCreation";
import {
  getSOSummaryFulfilled,
  getSOSummaryRejected,
  postSOListFulfilled,
  postSOListRejected,
} from "./soReducers";

const soState: any = {
  data: {},
  isLoading: false,
};

export const soSlice = createSlice({
  name: "soSummary",
  initialState: soState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getDrugDetailsSOSummary.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getDrugDetailsSOSummary.fulfilled, (state, action) => {
      getSOSummaryFulfilled(state, action);
    }),
    builder.addCase(getDrugDetailsSOSummary.rejected, (state, action) => {
      getSOSummaryRejected(state, action);
    })
  ),
});

export const soListSlice = createSlice({
  name: "soDrugList",
  initialState: soState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getDrugDetailsSOList.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getDrugDetailsSOList.fulfilled, (state, action) => {
      postSOListFulfilled(state, action);
    }),
    builder.addCase(getDrugDetailsSOList.rejected, (state, action) => {
      postSOListRejected(state, action);
    })
  ),
});
