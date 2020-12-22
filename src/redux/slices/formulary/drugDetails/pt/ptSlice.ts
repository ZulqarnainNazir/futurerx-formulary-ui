import { createSlice } from "@reduxjs/toolkit";
import { getDrugDetailsPTSummary } from "./ptActionCreation";
import { getPTSummaryFulfilled, getPTSummaryRejected } from "./ptReducers";

const ptState: any = {
  data: {},
  isLoading: false,
};

export const ptSlice = createSlice({
  name: "ptSummary",
  initialState: ptState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getDrugDetailsPTSummary.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getDrugDetailsPTSummary.fulfilled, (state, action) => {
      getPTSummaryFulfilled(state, action);
    }),
    builder.addCase(getDrugDetailsPTSummary.rejected, (state, action) => {
      getPTSummaryRejected(state, action);
    })
  ),
});
