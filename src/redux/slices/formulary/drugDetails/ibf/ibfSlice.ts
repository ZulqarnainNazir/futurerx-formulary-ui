import { createSlice } from "@reduxjs/toolkit";
import {
  getDrugDetailsIBFSummary,
  getDrugDetailsIBFList,
} from "./ibfActionCreation";
import {
  getIBFSummaryFulfilled,
  getIBFSummaryRejected,
  postIBFListFulfilled,
  postIBFListRejected,
} from "./ibfReducers";

const ibfState: any = {
  data: {},
  isLoading: false,
};

export const ibfSlice = createSlice({
  name: "ibfSummary",
  initialState: ibfState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getDrugDetailsIBFSummary.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getDrugDetailsIBFSummary.fulfilled, (state, action) => {
      getIBFSummaryFulfilled(state, action);
    }),
    builder.addCase(getDrugDetailsIBFSummary.rejected, (state, action) => {
      getIBFSummaryRejected(state, action);
    })
  ),
});

export const ibfListSlice = createSlice({
  name: "ibfDrugList",
  initialState: ibfState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getDrugDetailsIBFList.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getDrugDetailsIBFList.fulfilled, (state, action) => {
      postIBFListFulfilled(state, action);
    }),
    builder.addCase(getDrugDetailsIBFList.rejected, (state, action) => {
      postIBFListRejected(state, action);
    })
  ),
});
