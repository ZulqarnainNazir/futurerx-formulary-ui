import { createSlice } from "@reduxjs/toolkit";
import {
  getDrugDetailsGLSummary,
  getDrugDetailsGLList,
} from "./glActionCreation";
import {
  getGLSummaryFulfilled,
  getGLSummaryRejected,
  postGLListFulfilled,
  postGLListRejected,
} from "./glReducers";

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

export const glListSlice = createSlice({
  name: "glDrugList",
  initialState: glState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getDrugDetailsGLList.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getDrugDetailsGLList.fulfilled, (state, action) => {
      postGLListFulfilled(state, action);
    }),
    builder.addCase(getDrugDetailsGLList.rejected, (state, action) => {
      postGLListRejected(state, action);
    })
  ),
});
