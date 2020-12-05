import { createAsyncThunk } from "@reduxjs/toolkit";

export const setCurrentFormulary = createAsyncThunk(
  "application",
  async (input: any) => {
    console.log("*** setCurrentFormulary ");
    console.log(input);
    console.log("- - - - - - - - - - - - - - -");

    return input;
  }
);
