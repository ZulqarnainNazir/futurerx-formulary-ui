import {createSlice} from "@reduxjs/toolkit";

import { getTier } from "./tierActionCreation";
import { getTierFulfilled,getTierRejected } from "./tierReducers";

const tierState: any = {
  data: {},
  isLoading: false,
}
  

export const tierSlice = createSlice({
  name: "tier",
  initialState: tierState,
  reducers: {

  },
  extraReducers: builder => (
    builder.addCase(getTier.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getTier.fulfilled, (state, action) => {
      getTierFulfilled(state, action);
    }),
    builder.addCase(getTier.rejected, (state, action) => {
      getTierRejected(state, action);
    })
  )
});