import { createSlice } from "@reduxjs/toolkit";
import { getDrugDetailsSOSummary } from "./soActionCreation";
import { getSOSummaryFulfilled, getSOSummaryRejected } from "./soReducers";

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
