import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Formulary } from "./formulary";
import { getformulary } from "./setupService";
import { setFullFormulary } from "./../application/applicationSlice";

interface SetupState {
  formulary: Formulary | any;
  mode: string;
  isLoading: boolean;
  error: string | null;
}

const setupInitialState: SetupState = {
  formulary: null,
  mode: "",
  isLoading: true,
  error: null,
};

export interface SetupResult {
  formulary: Formulary | any;
}

function startLoading(state: SetupState) {
  state.isLoading = true;
}

function loadingFailed(state: SetupState, action: PayloadAction<string>) {
  state.isLoading = false;
  state.error = action.payload;
}

const setup = createSlice({
  name: "setup",
  initialState: setupInitialState,
  reducers: {
    getformularyStart: startLoading,
    getFormularySuccess(state, { payload }: PayloadAction<Formulary>) {
      // console.log("***** getFormulariesSuccess ");
      state.formulary = payload;
      state.mode = "EXISTING";
      state.isLoading = false;
      state.error = null;
    },
    getFormalaryFailure: loadingFailed,
  },
});

export const fetchSelectedFormulary = createAsyncThunk(
  "setup",
  async (arg: number, { dispatch }) => {
    //console.log("***** fetchSelectedFormulary ( "+arg+" ) ");
    try {
      dispatch(getformularyStart());
      const formulary: Formulary = await getformulary(arg);

      dispatch(getFormularySuccess(formulary));
      dispatch(setFullFormulary(formulary));
    } catch (err) {
      //console.log("***** fetchFormularies - ERROR ");
      dispatch(getFormalaryFailure(err.toString()));
    }
  }
);

export const {
  getformularyStart,
  getFormularySuccess,
  getFormalaryFailure,
} = setup.actions;

export default setup.reducer;
