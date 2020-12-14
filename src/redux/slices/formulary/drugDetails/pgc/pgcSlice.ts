import { createSlice } from "@reduxjs/toolkit";
import { getDrugDetailsPGCSummary } from "./pgcActionCreation";
import { getPGCSummaryFulfilled, getPGCSummaryRejected } from "./pgcReducers";

const pgcState: any = {
  data: {},
  isLoading: false,
};

export const pgcSlice = createSlice({
  name: "pgcSummary",
  initialState: pgcState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getDrugDetailsPGCSummary.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getDrugDetailsPGCSummary.fulfilled, (state, action) => {
      getPGCSummaryFulfilled(state, action);
    }),
    builder.addCase(getDrugDetailsPGCSummary.rejected, (state, action) => {
      getPGCSummaryRejected(state, action);
    })
  ),
});
