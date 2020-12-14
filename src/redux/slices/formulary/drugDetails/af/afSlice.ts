import { createSlice } from "@reduxjs/toolkit";
import { getDrugDetailsAFSummary } from "./afActionCreation";
import { getAFSummaryFulfilled, getAFSummaryRejected } from "./afReducers";

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
