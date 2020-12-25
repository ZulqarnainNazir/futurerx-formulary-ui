import { createSlice } from "@reduxjs/toolkit";
import {
  getDrugDetailsPOSSummary,
  getDrugDetailsPOSSettings,
  getDrugDetailsPOSGridData,
} from "./posActionCreation";
import {
  getPOSSummaryFulfilled,
  getPOSSummaryRejected,
  getPOSSettingsFulfilled,
  getPOSSettingsRejected,
  postPOSListFulfilled,
  postPOSListRejected,
} from "./posReducers";

const posState: any = {
  data: {},
  isLoading: false,
};

export const posSlice = createSlice({
  name: "posSummary",
  initialState: posState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getDrugDetailsPOSSummary.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getDrugDetailsPOSSummary.fulfilled, (state, action) => {
      getPOSSummaryFulfilled(state, action);
    }),
    builder.addCase(getDrugDetailsPOSSummary.rejected, (state, action) => {
      getPOSSummaryRejected(state, action);
    })
  ),
});

export const posSettingsSlice = createSlice({
  name: "posSettings",
  initialState: posState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getDrugDetailsPOSSettings.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getDrugDetailsPOSSettings.fulfilled, (state, action) => {
      getPOSSettingsFulfilled(state, action);
    }),
    builder.addCase(getDrugDetailsPOSSettings.rejected, (state, action) => {
      getPOSSettingsRejected(state, action);
    })
  ),
});

export const posListSlice = createSlice({
  name: "posDrugList",
  initialState: posState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getDrugDetailsPOSGridData.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getDrugDetailsPOSGridData.fulfilled, (state, action) => {
      postPOSListFulfilled(state, action);
    }),
    builder.addCase(getDrugDetailsPOSGridData.rejected, (state, action) => {
      postPOSListRejected(state, action);
    })
  ),
});
