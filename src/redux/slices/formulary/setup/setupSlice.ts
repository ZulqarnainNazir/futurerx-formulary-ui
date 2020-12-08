import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
//import { getformularies } from "./dashboardService";

interface SetupState {
  formulary: any;
  isLoading: boolean;
  error: string | null;
}

const setupInitialState: SetupState = {
  formulary: null,
  isLoading: true,
  error: null,
};

export interface SetupResult {
  formulary: any;
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
    getFormularySuccess(state, { payload }: PayloadAction<SetupResult>) {
      // console.log("***** getFormulariesSuccess ");
      const { formulary } = payload;
      // console.log("COUNT : ", count);
      // console.log("LIST : ", list);
      state.formulary = formulary;
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
      //const formulary = await getformulary(arg);
      //dispatch(getFormularySuccess(formulary));
    } catch (err) {
      // console.log("***** fetchFormularies - ERROR ");
      //dispatch(getFormalaryFailure(err.toString()));
    }
  }
);
