import {createSlice} from "@reduxjs/toolkit";
import { getValidationList } from "./validationActionCreation";
import { actionFulfilled, actionRejected } from "./validationReducers";


// Init State
const validationState: any = {
  validationData: {},
  isLoading: false,
}

// Slice
export const validationList = createSlice({
  name: "validation-formulary",
  initialState: validationState,
  reducers: {

  },
  extraReducers: builder => (
    builder.addCase(getValidationList.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getValidationList.fulfilled, (state, action) => {
      actionFulfilled(state, action);
    }),
    builder.addCase(getValidationList.rejected, (state, action) => {
      actionRejected(state, action);
    })
  )
});