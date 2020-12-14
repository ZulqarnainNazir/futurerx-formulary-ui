import { createSlice } from "@reduxjs/toolkit";
import { getDrugDetailsFGC } from "./fgcActionCreation";
import { getFGCFulfilled, getFGCRejected } from "./fgcReducers";

const fgcState: any = {
  data: {},
  isLoading: false,
};

export const fgcSlice = createSlice({
  name: "fgcData",
  initialState: fgcState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getDrugDetailsFGC.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getDrugDetailsFGC.fulfilled, (state, action) => {
      getFGCFulfilled(state, action);
    }),
    builder.addCase(getDrugDetailsFGC.rejected, (state, action) => {
      getFGCRejected(state, action);
    })
  ),
});
