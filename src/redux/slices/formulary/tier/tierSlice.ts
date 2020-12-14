import {createSlice} from "@reduxjs/toolkit";

import { getTier, postTierApplyInfo } from "./tierActionCreation";
import { getTierFulfilled,getTierRejected,postTierApplyFulfilled,postTierApplyRejected } from "./tierReducers";

const tierState: any = {
  data: {},
  isLoading: false,
  applyData: {}, 
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
    }),
    builder.addCase(postTierApplyInfo.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(postTierApplyInfo.fulfilled, (state, action) => {
      postTierApplyFulfilled(state, action);
    }),
    builder.addCase(postTierApplyInfo.rejected, (state, action) => {
      postTierApplyRejected(state, action);
    })
  )
});