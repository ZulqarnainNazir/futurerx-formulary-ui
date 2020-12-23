import { createSlice } from "@reduxjs/toolkit";
import { getDrugDetailsICDSummary } from "./icdActionCreation";
import { getICDSummaryFulfilled, getICDSummaryRejected } from "./icdReducers";

const icdState: any = {
  data: {},
  isLoading: false,
};

export const icdSlice = createSlice({
  name: "icdSummary",
  initialState: icdState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getDrugDetailsICDSummary.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getDrugDetailsICDSummary.fulfilled, (state, action) => {
      getICDSummaryFulfilled(state, action);
    }),
    builder.addCase(getDrugDetailsICDSummary.rejected, (state, action) => {
      getICDSummaryRejected(state, action);
    })
  ),
});
