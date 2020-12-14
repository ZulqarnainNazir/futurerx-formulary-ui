import { createSlice } from "@reduxjs/toolkit";
import { getDrugDetailsFFFSummary } from "./fffActionCreation";
import { getFFFSummaryFulfilled, getFFFSummaryRejected } from "./fffReducers";

const fffState: any = {
  data: {},
  isLoading: false,
};

export const fffSlice = createSlice({
  name: "fffSummary",
  initialState: fffState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getDrugDetailsFFFSummary.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getDrugDetailsFFFSummary.fulfilled, (state, action) => {
      getFFFSummaryFulfilled(state, action);
    }),
    builder.addCase(getDrugDetailsFFFSummary.rejected, (state, action) => {
      getFFFSummaryRejected(state, action);
    })
  ),
});
