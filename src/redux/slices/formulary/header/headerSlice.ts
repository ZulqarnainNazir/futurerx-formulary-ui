import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

const header = createSlice({
  name: "header",
  initialState: null,
  reducers: {
  },
});

export const {
} = header.actions;

export default header.reducer;
