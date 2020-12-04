import {createSlice} from "@reduxjs/toolkit";

import { getBase } from "./formularyBaseActionCreator";
import { getActionFulfilled, getActionRejected } from "./formularyBaseReducer";

const formularyBase: any = {
  data: {},
  isLoading: false,
}
  

export const formularyBaseSlice = createSlice({
  name: "formularyBase",
  initialState: formularyBase,
  reducers: {

  },
  extraReducers: builder => (
    builder.addCase(getBase.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getBase.fulfilled, (state, action) => {
        getActionFulfilled(state, action);
    }),
    builder.addCase(getBase.rejected, (state, action) => {
        getActionRejected(state, action);
    })
  )
});