import { createSlice } from "@reduxjs/toolkit";
import { setCurrentFormulary } from "./applicationActionCreator";
import { getActionFulfilled, getActionRejected } from "./applicationReducer";

const defaultState: any = {
  formulary_id: 0,
  formulary_type: "",
  formulary_type_id: 0,
  formulary_lob: "",
  formulary_lob_id: 0,
};

export const applicationSlice = createSlice({
  name: "application",
  initialState: defaultState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(setCurrentFormulary.pending, (state, action) => {
      // state.isLoading = true;
    }),
    builder.addCase(setCurrentFormulary.fulfilled, (state, action) => {
      getActionFulfilled(state, action);
    }),
    builder.addCase(setCurrentFormulary.rejected, (state, action) => {
      getActionRejected(state, action);
    })
  ),
});
