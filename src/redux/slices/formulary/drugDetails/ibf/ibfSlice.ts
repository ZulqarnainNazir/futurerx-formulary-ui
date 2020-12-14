import { createSlice } from "@reduxjs/toolkit";
import { getDrugDetailsIBFSummary } from "./ibfActionCreation";
import { getIBFSummaryFulfilled, getIBFSummaryRejected } from "./ibfReducers";

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
