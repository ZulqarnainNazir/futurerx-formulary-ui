import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Formulary } from "./formulary";
import { getformulary, getGeneralOptions } from "./setupService";

interface SetupState {
  formulary: Formulary | any;
  mode: string;
  generalOptions: GeneralOptions | any;
  isLoading: boolean;
  error: string | null;
}

const setupInitialState: SetupState = {
  formulary: null,
  mode: "",
  generalOptions: null,
  isLoading: true,
  error: null,
};

export interface SetupResult {
  formulary: Formulary | any;
}

export interface GeneralOptions {
  formularyType: any[];
  contractYear: any[];
  monthList: any[];
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
    getGeneralOptionsStart: startLoading,
    getGeneralOptionsSuccess(
      state,
      { payload }: PayloadAction<GeneralOptions>
    ) {
      //console.log("***** getGeneralOptionsSuccess ");
      state.generalOptions = payload;
      state.isLoading = false;
      state.error = null;
    },
    getGeneralOptionsFailure: loadingFailed,
  },
});

export const fetchSelectedFormulary = createAsyncThunk(
  "setup",
  async (arg: number, { dispatch }) => {
    //console.log("***** fetchSelectedFormulary ");
    try {
      dispatch(getformularyStart());
      const formulary: Formulary = await getformulary(arg);
      dispatch(getFormularySuccess(formulary));
    } catch (err) {
      //console.log("***** fetchFormularies - ERROR ");
      dispatch(getFormalaryFailure(err.toString()));
    }
  }
);

export const fetchGeneralOptions = createAsyncThunk(
  "setup",
  async (arg: number, { dispatch }) => {
    //console.log("***** fetchGeneralOptions AC ");
    try {
      dispatch(getGeneralOptionsStart());
      const genOptions: any = await getGeneralOptions();
      //console.log("*** genOptions : ", genOptions);
      dispatch(getGeneralOptionsSuccess(genOptions));
    } catch (err) {
      //console.log("***** fetchGeneralOptions AC - ERROR ");
      dispatch(getGeneralOptionsFailure(err.toString()));
    }
  }
);

export const {
  getformularyStart,
  getFormularySuccess,
  getFormalaryFailure,
  getGeneralOptionsStart,
  getGeneralOptionsSuccess,
  getGeneralOptionsFailure,
} = setup.actions;

export default setup.reducer;
