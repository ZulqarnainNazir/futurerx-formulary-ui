import { createSlice } from "@reduxjs/toolkit";

import { getDrugDetailsLASummary } from "./drugDetailLAActionCreation";
import {
  getLaSummaryFulfilled,
  getLaSummaryRejected,
} from "./drugDetailLAReducers";

const laState: any = {
  data: {},
  isLoading: false,
};

export const paSlice = createSlice({
  name: "laSummary",
  initialState: laState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getDrugDetailsLASummary.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getDrugDetailsLASummary.fulfilled, (state, action) => {
      getLaSummaryFulfilled(state, action);
    }),
    builder.addCase(getDrugDetailsLASummary.rejected, (state, action) => {
      getLaSummaryRejected(state, action);
    })
  ),
});
