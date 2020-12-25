import {createSlice} from "@reduxjs/toolkit";
import { combineReducers } from 'redux'

import { getStSummary,getStGrouptDescription,getStGrouptDescriptionVersions } from "./stepTherapyActionCreation";
import { getStepTherapyFulfilled,getStepTherapyRejected,getVersionFulfilled,getVersionRejected,getStDescriptionFulfilled,getStDescriptionRejected } from "./stepTherapyReducers";

const tierState: any = {
  data: {},
  isLoading: false,
  stVersion:{},
  description:{}
}

export const stepTherapySlice = createSlice({
  name: "stSummary",
  initialState: tierState,
  reducers: {

  },
  extraReducers: builder => (
    builder.addCase(getStSummary.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getStSummary.fulfilled, (state, action) => {
      getStepTherapyFulfilled(state, action);
    }),
    builder.addCase(getStSummary.rejected, (state, action) => {
      getStepTherapyRejected(state, action);
    }),
    builder.addCase(getStGrouptDescription.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getStGrouptDescription.fulfilled, (state, action) => {
      getStDescriptionFulfilled(state, action);
    }),
    builder.addCase(getStGrouptDescription.rejected, (state, action) => {
      getStDescriptionRejected(state, action);
    })
  )
});

export const stVersionSlice = createSlice({
  name: "version",
  initialState: tierState,
  reducers: {

  },
  extraReducers: builder => (
    builder.addCase(getStGrouptDescriptionVersions.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getStGrouptDescriptionVersions.fulfilled, (state, action) => {
      getVersionFulfilled(state, action);
    }),
    builder.addCase(getStGrouptDescriptionVersions.rejected, (state, action) => {
      getVersionRejected(state, action);
    })
  )
});