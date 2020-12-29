import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface AdditionalCriteriaState {
  additionalCriteriaObject: any;
  additionalCriteriaBody: any;
  populateGrid: boolean;
  closeDialog: boolean;
  listItemStatus: any;

  posSettingsList: any;
  prSettingsList: any;
}

const additionalCriteriaInitialState: AdditionalCriteriaState = {
  additionalCriteriaObject: null,
  additionalCriteriaBody: null,
  populateGrid: false,
  closeDialog: false,
  listItemStatus: {},

  posSettingsList: null,
  prSettingsList: null,
};

interface AddionationalCriteriaResult {
  additionalCriteriaObject: any;
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
      state.additionalCriteriaObject = payload.additionalCriteriaObject;
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
      additionalCriteriaObject: arg.additionalCriteriaObject,
      additionalCriteriaBody: arg.additionalCriteriaBody,
      populateGrid: arg.populateGrid,
      closeDialog: arg.closeDialog,
      listItemStatus: arg.listItemStatus,
    };
    dispatch(setAdditionalCriteriaBody(obj));
  }
);
