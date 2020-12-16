import {createSlice} from "@reduxjs/toolkit";

import { getClassificationSystems, postDrugsCategory, getIntelliscenseSearch } from "./categoryClassActionCreation";
import { getClassificationSystemsFulfilled, getClassificationSystemsRejected, postDrugsCategoryFulfilled, postDrugsCategoryRejected } from "./categoryClassReducers";

const categoryClassState: any = {
  classificationSystems: {},
  categoryData: {},
  isLoading: false,
  intelliscenseData: {}
}
  

export const categoryClassSlice = createSlice({
  name: "categoryClass",
  initialState: categoryClassState,
  reducers: {

  },
  extraReducers: builder => (
    builder.addCase(getClassificationSystems.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getClassificationSystems.fulfilled, (state, action) => {
      getClassificationSystemsFulfilled(state, action);
    }),
    builder.addCase(getClassificationSystems.rejected, (state, action) => {
      getClassificationSystemsRejected(state, action);
    }),
    builder.addCase(postDrugsCategory.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(postDrugsCategory.fulfilled, (state, action) => {
      postDrugsCategoryFulfilled(state, action);
    }),
    builder.addCase(postDrugsCategory.rejected, (state, action) => {
      postDrugsCategoryRejected(state, action);
    })
  )
});