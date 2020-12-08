import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface AdvancedSearchState {
  tierAdvancedSearchBody: any;
}

const advancedSearchInitialState: AdvancedSearchState = {
  tierAdvancedSearchBody: null
};

interface AdvancedSearchResult {
  tierAdvancedSearchBody: any;
}

const advancedSearch = createSlice({
  name: "advancedSearch",
  initialState: advancedSearchInitialState,
  reducers: {
    setAdvancedSearchBody(state, { payload }: PayloadAction<AdvancedSearchResult>) {
      state.tierAdvancedSearchBody = payload.tierAdvancedSearchBody;
    },
  },
});

export const {setAdvancedSearchBody} = advancedSearch.actions;

export default advancedSearch.reducer;

export const setAdvancedSearch = createAsyncThunk(
  "advancedSearch",
  async (arg: any, { dispatch }) => {
    const obj = {
      tierAdvancedSearchBody: arg.tierAdvancedSearchBody
    };
    dispatch(setAdvancedSearchBody(obj));
  }
);
