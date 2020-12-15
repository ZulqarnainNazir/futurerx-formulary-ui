import { createSlice } from "@reduxjs/toolkit";

import {
  getDrugDetailsLASummary,
  getDrugDetailsLAList,
} from "./drugDetailLAActionCreation";
import {
  getLaSummaryFulfilled,
  getLaSummaryRejected,
  postLAListFulfilled,
  postLAListRejected
} from "./drugDetailLAReducers";

const laState: any = {
  data: {},
  isLoading: false,
};

const lalistState: any = {
  data: {},
  isLoading: false,
};

export const laSlice = createSlice({
  name: "laSummary",
  initialState: laState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getDrugDetailsLASummary.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getDrugDetailsLASummary.fulfilled, (state, action) => {
      getLaSummaryFulfilled(state, action);
    }),
    builder.addCase(getDrugDetailsLASummary.rejected, (state, action) => {
      getLaSummaryRejected(state, action);
    })
  ),
});

// getDrugDetailsLAList
export const laListSlice = createSlice({
  name: "laDrugList",
  initialState: lalistState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getDrugDetailsLAList.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getDrugDetailsLAList.fulfilled, (state, action) => {
      postLAListFulfilled(state, action);
    }),
    builder.addCase(getDrugDetailsLAList.rejected, (state, action) => {
      postLAListRejected(state, action);
    })
  ),
});
