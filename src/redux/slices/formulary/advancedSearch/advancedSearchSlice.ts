import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface AdvancedSearchState {
  advancedSearchBody: any;
  populateGrid: boolean;
}

const advancedSearchInitialState: AdvancedSearchState = {
  advancedSearchBody: null,
  populateGrid: false
};

interface AdvancedSearchResult {
  advancedSearchBody: any;
  populateGrid: boolean;
}

const advancedSearch = createSlice({
  name: "advancedSearch",
  initialState: advancedSearchInitialState,
  reducers: {
    setAdvancedSearchBody(state, { payload }: PayloadAction<AdvancedSearchResult>) {
      state.advancedSearchBody = payload.advancedSearchBody;
      state.populateGrid = payload.populateGrid;
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
      populateGrid: arg.populateGrid
    };
    dispatch(setAdvancedSearchBody(obj));
  }
);
