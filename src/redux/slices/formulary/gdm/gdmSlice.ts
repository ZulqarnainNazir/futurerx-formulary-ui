import {createSlice} from "@reduxjs/toolkit";
import { saveGDM } from "./gdmActionCreation";
import { actionFulfilled, actionRejected } from "./gdmReducers";


// Init State
const validationState: any = {
  validationData: {},
  isLoading: false,
}

// Slice
export const saveGDMSlice = createSlice({
  name: "validation-formulary",
  initialState: validationState,
  reducers: {

  },
  extraReducers: builder => (
    builder.addCase(saveGDM.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(saveGDM.fulfilled, (state, action) => {
      actionFulfilled(state, action);
    }),
    builder.addCase(saveGDM.rejected, (state, action) => {
      actionRejected(state, action);
    })
  )
});