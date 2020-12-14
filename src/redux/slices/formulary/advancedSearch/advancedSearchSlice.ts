import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface AdvancedSearchState {
  advancedSearchBody: any;
  populateGrid: boolean;
  closeDialog: boolean;
}

const advancedSearchInitialState: AdvancedSearchState = {
  advancedSearchBody: null,
  populateGrid: false,
  closeDialog: false
};

interface AdvancedSearchResult {
  advancedSearchBody: any;
  populateGrid: boolean;
  closeDialog: boolean;
}

const advancedSearch = createSlice({
  name: "advancedSearch",
  initialState: advancedSearchInitialState,
  reducers: {
    setAdvancedSearchBody(state, { payload }: PayloadAction<AdvancedSearchResult>) {
      state.advancedSearchBody = payload.advancedSearchBody;
      state.populateGrid = payload.populateGrid;
      state.closeDialog = payload.closeDialog;
    },
  },
});

export const {setAdvancedSearchBody} = advancedSearch.actions;

export default advancedSearch.reducer;

export const setAdvancedSearch = createAsyncThunk(
  "advancedSearch",
  async (arg: any, { dispatch }) => {
    const obj = {
      advancedSearchBody: arg.advancedSearchBody,
      populateGrid: arg.populateGrid,
      closeDialog: arg.closeDialog,
    };
    dispatch(setAdvancedSearchBody(obj));
  }
);
