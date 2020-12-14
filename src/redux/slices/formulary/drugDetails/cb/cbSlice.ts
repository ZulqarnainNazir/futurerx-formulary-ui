import { createSlice } from "@reduxjs/toolkit";
import { getDrugDetailsCBSummary } from "./cbActionCreation";
import { getCBSummaryFulfilled, getCBSummaryRejected } from "./cbReducers";

const cbState: any = {
  data: {},
  isLoading: false,
};

export const cbSlice = createSlice({
  name: "cbSummary",
  initialState: cbState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getDrugDetailsCBSummary.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getDrugDetailsCBSummary.fulfilled, (state, action) => {
      getCBSummaryFulfilled(state, action);
    }),
    builder.addCase(getDrugDetailsCBSummary.rejected, (state, action) => {
      getCBSummaryRejected(state, action);
    })
  ),
});
