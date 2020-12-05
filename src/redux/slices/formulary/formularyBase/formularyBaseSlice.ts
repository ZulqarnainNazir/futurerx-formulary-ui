import {createSlice} from "@reduxjs/toolkit";

import { getBase } from "./formularyBaseActionCreator";
import { getActionFulfilled, getActionRejected } from "./formularyBaseReducer";

const formularyBase: any = {
  data: {},
  isLoading: false,
  current_formulary: []
}
  

export const formularyBaseSlice = createSlice({
  name: "formularyBase",
  initialState: formularyBase,
  reducers: {
    getCurrentFormulary: (state,action) => {
      state.current_formulary = action.payload
    }
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