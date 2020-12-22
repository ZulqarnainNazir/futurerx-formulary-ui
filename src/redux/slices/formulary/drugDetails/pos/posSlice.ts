import { createSlice } from "@reduxjs/toolkit";
import { getDrugDetailsPOSSummary } from "./posActionCreation";
import { getPOSSummaryFulfilled, getPOSSummaryRejected } from "./posReducers";

const posState: any = {
  data: {},
  isLoading: false,
};

export const posSlice = createSlice({
  name: "posSummary",
  initialState: posState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getDrugDetailsPOSSummary.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getDrugDetailsPOSSummary.fulfilled, (state, action) => {
      getPOSSummaryFulfilled(state, action);
    }),
    builder.addCase(getDrugDetailsPOSSummary.rejected, (state, action) => {
      getPOSSummaryRejected(state, action);
    })
  ),
});
