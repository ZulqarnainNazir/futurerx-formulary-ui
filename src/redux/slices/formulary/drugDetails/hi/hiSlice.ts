import { createSlice } from "@reduxjs/toolkit";
import {
  getDrugDetailsHISummary,
  getDrugDetailsHIList,
} from "./hiActionCreation";
import {
  getHISummaryFulfilled,
  getHISummaryRejected,
  postHIListFulfilled,
  postHIListRejected,
} from "./hiReducers";

const hiState: any = {
  data: {},
  isLoading: false,
};

export const hiSlice = createSlice({
  name: "hiSummary",
  initialState: hiState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getDrugDetailsHISummary.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getDrugDetailsHISummary.fulfilled, (state, action) => {
      getHISummaryFulfilled(state, action);
    }),
    builder.addCase(getDrugDetailsHISummary.rejected, (state, action) => {
      getHISummaryRejected(state, action);
    })
  ),
});

export const hiListSlice = createSlice({
  name: "hiDrugList",
  initialState: hiState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getDrugDetailsHIList.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getDrugDetailsHIList.fulfilled, (state, action) => {
      postHIListFulfilled(state, action);
    }),
    builder.addCase(getDrugDetailsHIList.rejected, (state, action) => {
      postHIListRejected(state, action);
    })
  ),
});
