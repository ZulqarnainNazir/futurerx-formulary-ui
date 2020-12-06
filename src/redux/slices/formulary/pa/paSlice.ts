import {createSlice} from "@reduxjs/toolkit";

import { getPaSummary } from "./paActionCreation";
import { getPaFulfilled,getPaRejected } from "./paReducers";

const paState: any = {
  data: {},
  isLoading: false,
}
  

export const paSlice = createSlice({
  name: "paSummary",
  initialState: paState,
  reducers: {

  },
  extraReducers: builder => (
    builder.addCase(getPaSummary.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getPaSummary.fulfilled, (state, action) => {
      getPaFulfilled(state, action);
    }),
    builder.addCase(getPaSummary.rejected, (state, action) => {
      getPaRejected(state, action);
    })
  )
});