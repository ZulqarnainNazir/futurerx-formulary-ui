import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Formulary } from "./formulary";
import { getformulary } from "./setupService";

interface SetupState {
  formulary: Formulary | any;
  mode: string;
  isLoading: boolean;
  error: string | null;
}

const setupInitialState: SetupState = {
  formulary: null,
  mode:"",
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
      state.mode="NEW"
      state.isLoading = false;
      state.error = null;
    },
    getFormalaryFailure: loadingFailed,
  },
});

export const {
  getformularyStart,
  getFormularySuccess,
  getFormalaryFailure,
} = setup.actions;

export default setup.reducer;

export const fetchSelectedFormulary = createAsyncThunk(
  "setup",
  async (arg: any, { dispatch }) => {
    console.log("***** fetchSelectedFormulary ");
    try {
      dispatch(getformularyStart());
      const formulary: Formulary = await getformulary(3079);
      dispatch(getFormularySuccess(formulary));
    } catch (err) {
      console.log("***** fetchFormularies - ERROR ");
      dispatch(getFormalaryFailure(err.toString()));
    }
  }
);
