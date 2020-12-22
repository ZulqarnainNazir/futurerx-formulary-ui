import { createSlice } from "@reduxjs/toolkit";
import { getDrugDetailsGLSummary } from "./glActionCreation";
import { getGLSummaryFulfilled, getGLSummaryRejected } from "./glReducers";

const glState: any = {
  data: {},
  isLoading: false,
};

export const lisSlice = createSlice({
  name: "glSummary",
  initialState: glState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getDrugDetailsGLSummary.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getDrugDetailsGLSummary.fulfilled, (state, action) => {
      getGLSummaryFulfilled(state, action);
    }),
    builder.addCase(getDrugDetailsGLSummary.rejected, (state, action) => {
      getGLSummaryRejected(state, action);
    })
  ),
});
