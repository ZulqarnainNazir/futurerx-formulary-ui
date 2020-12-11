import { createSlice } from "@reduxjs/toolkit";
import { getDrugDetailsMOMNSummary } from "./drugDetailMOMNActionCreation";
import {
  getMOMNSummaryFulfilled,
  getMOMNSummaryRejected,
} from "./drugDetailMOMNReducers";

const momnState: any = {
  data: {},
  isLoading: false,
};

export const momnSlice = createSlice({
  name: "momnSummary",
  initialState: momnState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getDrugDetailsMOMNSummary.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getDrugDetailsMOMNSummary.fulfilled, (state, action) => {
      getMOMNSummaryFulfilled(state, action);
    }),
    builder.addCase(getDrugDetailsMOMNSummary.rejected, (state, action) => {
      getMOMNSummaryRejected(state, action);
    })
  ),
});
