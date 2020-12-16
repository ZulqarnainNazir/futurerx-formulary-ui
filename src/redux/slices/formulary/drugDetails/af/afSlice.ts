import { createSlice } from "@reduxjs/toolkit";
import {
  getDrugDetailsAFSummary,
  getDrugDetailsAFList,
} from "./afActionCreation";
import {
  getAFSummaryFulfilled,
  getAFSummaryRejected,
  postAFListFulfilled,
  postAFListRejected,
} from "./afReducers";

const afState: any = {
  data: {},
  isLoading: false,
};

export const afSlice = createSlice({
  name: "afSummary",
  initialState: afState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getDrugDetailsAFSummary.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getDrugDetailsAFSummary.fulfilled, (state, action) => {
      getAFSummaryFulfilled(state, action);
    }),
    builder.addCase(getDrugDetailsAFSummary.rejected, (state, action) => {
      getAFSummaryRejected(state, action);
    })
  ),
});

export const afListSlice = createSlice({
  name: "afDrugList",
  initialState: afState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getDrugDetailsAFList.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getDrugDetailsAFList.fulfilled, (state, action) => {
      postAFListFulfilled(state, action);
    }),
    builder.addCase(getDrugDetailsAFList.rejected, (state, action) => {
      postAFListRejected(state, action);
    })
  ),
});
