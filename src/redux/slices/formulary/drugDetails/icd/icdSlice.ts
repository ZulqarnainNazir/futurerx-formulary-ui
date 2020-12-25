import { createSlice } from "@reduxjs/toolkit";
import {
  getDrugDetailsICDSummary,
  getDrugDetailsICDList,
} from "./icdActionCreation";
import {
  getICDSummaryFulfilled,
  getICDSummaryRejected,
  postICDListFulfilled,
  postICDListRejected,
} from "./icdReducers";

const icdState: any = {
  data: {},
  isLoading: false,
};

export const icdSlice = createSlice({
  name: "icdSummary",
  initialState: icdState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getDrugDetailsICDSummary.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getDrugDetailsICDSummary.fulfilled, (state, action) => {
      getICDSummaryFulfilled(state, action);
    }),
    builder.addCase(getDrugDetailsICDSummary.rejected, (state, action) => {
      getICDSummaryRejected(state, action);
    })
  ),
});

export const icdListSlice = createSlice({
  name: "icdDrugList",
  initialState: icdState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getDrugDetailsICDList.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getDrugDetailsICDList.fulfilled, (state, action) => {
      postICDListFulfilled(state, action);
    }),
    builder.addCase(getDrugDetailsICDList.rejected, (state, action) => {
      postICDListRejected(state, action);
    })
  ),
});
