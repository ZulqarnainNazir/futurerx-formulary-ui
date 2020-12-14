import { createSlice } from "@reduxjs/toolkit";
import { getDrugDetailsLISSummary } from "./lisActionCreation";
import { getLISSummaryFulfilled, getLISSummaryRejected } from "./lisReducers";

const lisState: any = {
  data: {},
  isLoading: false,
};

export const lisSlice = createSlice({
  name: "lisSummary",
  initialState: lisState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getDrugDetailsLISSummary.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getDrugDetailsLISSummary.fulfilled, (state, action) => {
      getLISSummaryFulfilled(state, action);
    }),
    builder.addCase(getDrugDetailsLISSummary.rejected, (state, action) => {
      getLISSummaryRejected(state, action);
    })
  ),
});
