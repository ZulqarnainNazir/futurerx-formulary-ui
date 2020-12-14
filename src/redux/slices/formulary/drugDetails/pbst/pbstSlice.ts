import { createSlice } from "@reduxjs/toolkit";
import { getDrugDetailsPBSTSummary } from "./pbstActionCreation";
import {
  getPBSTSummaryFulfilled,
  getPBSTSummaryRejected,
} from "./pbstReducers";

const pbstState: any = {
  data: {},
  isLoading: false,
};

export const pbstSlice = createSlice({
  name: "pbstSummary",
  initialState: pbstState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getDrugDetailsPBSTSummary.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getDrugDetailsPBSTSummary.fulfilled, (state, action) => {
      getPBSTSummaryFulfilled(state, action);
    }),
    builder.addCase(getDrugDetailsPBSTSummary.rejected, (state, action) => {
      getPBSTSummaryRejected(state, action);
    })
  ),
});
