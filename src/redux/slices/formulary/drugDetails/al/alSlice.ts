import { createSlice } from "@reduxjs/toolkit";
import {
  getDrugDetailsALSummary,
  getDrugDetailsALList,
} from "./alActionCreation";
import {
  getALSummaryFulfilled,
  getALSummaryRejected,
  postALListFulfilled,
  postALListRejected,
} from "./alReducers";

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

export const alListSlice = createSlice({
  name: "alDrugList",
  initialState: alState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getDrugDetailsALList.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getDrugDetailsALList.fulfilled, (state, action) => {
      postALListFulfilled(state, action);
    }),
    builder.addCase(getDrugDetailsALList.rejected, (state, action) => {
      postALListRejected(state, action);
    })
  ),
});
