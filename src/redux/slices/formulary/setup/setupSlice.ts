import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Formulary } from "./formulary";
import {
  getformulary,
  checkNameExist,
  composePostBody,
  createFormulary,
} from "./setupService";
import { setFullFormulary } from "./../application/applicationSlice";
import { stat } from "fs";

interface SetupState {
  formulary: Formulary | any;
  mode: string;
  nameExist: boolean;
  isLoading: boolean;
  error: string | null;
}

const setupInitialState: SetupState = {
  formulary: null,
  mode: "",
  nameExist: false,
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
    verifyFormularyNameStart: startLoading,
    verifyFormularyNameSuccess(state, { payload }: PayloadAction<boolean>) {
      //console.log("***** verifyFormularyNameSuccess : ",payload);
      state.nameExist = payload;
      state.isLoading = false;
      state.error = null;
    },
    verifyFormularyNameFailure: loadingFailed,
    saveFormularyStart: startLoading,
    saveFormularySuccess(state, { payload }: PayloadAction<boolean>) {
      console.log("***** saveFormularySuccess : ", payload);
      state.nameExist = payload;
      state.isLoading = false;
      state.error = null;
    },
    saveFormularyFailure: loadingFailed,
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

export const verifyFormularyName = createAsyncThunk(
  "setup",
  async (name: string, { dispatch }) => {
    //console.log("***** verifyFormularyName ( "+name+" ) ");
    try {
      dispatch(verifyFormularyNameStart());
      const exist: boolean = await checkNameExist(name);
      //console.log(exist);
      dispatch(verifyFormularyNameSuccess(exist));
    } catch (err) {
      //console.log("***** fetchFormularies - ERROR ");
      dispatch(getFormalaryFailure(err.toString()));
    }
  }
);

export const saveFormulary = createAsyncThunk(
  "setup",
  async (details: any, { dispatch }) => {
    console.log("***** saveFormulary ( " + details + " ) ");
    try {
      const payload = composePostBody(details);
      dispatch(saveFormularyStart());
      const resp: any = await createFormulary(payload);
      console.log(resp);
      dispatch(saveFormularySuccess(resp));
    } catch (err) {
      //console.log("***** saveFormulary - ERROR ");
      dispatch(saveFormularyFailure(err.toString()));
    }
  }
);

export const {
  getformularyStart,
  getFormularySuccess,
  getFormalaryFailure,
  verifyFormularyNameStart,
  verifyFormularyNameSuccess,
  verifyFormularyNameFailure,
  saveFormularyStart,
  saveFormularySuccess,
  saveFormularyFailure,
} = setup.actions;

export default setup.reducer;
