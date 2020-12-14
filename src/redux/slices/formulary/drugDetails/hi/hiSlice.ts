import { createSlice } from "@reduxjs/toolkit";
import { getDrugDetailsHISummary } from "./hiActionCreation";
import { getHISummaryFulfilled, getHISummaryRejected } from "./hiReducers";

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
