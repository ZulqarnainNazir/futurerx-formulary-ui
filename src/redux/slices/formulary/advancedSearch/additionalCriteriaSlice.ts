import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface AdditionalCriteriaState {
  additionalCriteriaBody: any;
  populateGrid: boolean;
  closeDialog: boolean;
  listItemStatus: any;
}

const additionalCriteriaInitialState: AdditionalCriteriaState = {
  additionalCriteriaBody: null,
  populateGrid: false,
  closeDialog: false,
  listItemStatus: {},
};

interface AddionationalCriteriaResult {
  additionalCriteriaBody: any;
  populateGrid: boolean;
  closeDialog: boolean;
  listItemStatus: any;
}

const additionalCriteria = createSlice({
  name: "additionalCriteria",
  initialState: additionalCriteriaInitialState,
  reducers: {
    setAdditionalCriteriaBody(
      state,
      { payload }: PayloadAction<AddionationalCriteriaResult>
    ) {
      state.additionalCriteriaBody = payload.additionalCriteriaBody;
      state.populateGrid = payload.populateGrid;
      state.closeDialog = payload.closeDialog;
      state.listItemStatus = payload.listItemStatus;
    },
  },
});

export const { setAdditionalCriteriaBody } = additionalCriteria.actions;

export default additionalCriteria.reducer;

export const setAdditionalCriteria = createAsyncThunk(
  "additionalCriteria",
  async (arg: any, { dispatch }) => {
    const obj = {
      additionalCriteriaBody: arg.additionalCriteriaBody,
      populateGrid: arg.populateGrid,
      closeDialog: arg.closeDialog,
      listItemStatus: arg.listItemStatus,
    };
    dispatch(setAdditionalCriteriaBody(obj));
  }
);
