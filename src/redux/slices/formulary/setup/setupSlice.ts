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
  message: string;
  messageType: string;
  isLoading: boolean;
  error: string | null;
}

const setupInitialState: SetupState = {
  formulary: null,
  mode: "",
  nameExist: false,
  message: "",
  messageType: "",
  isLoading: false,
  error: null,
};

export interface SetupResult {
  formulary: Formulary | any;
}

function startLoading(state: SetupState) {
  state.isLoading = true;
  state.message = "";
  state.messageType = "";
}

function loadingFailed(state: SetupState, action: PayloadAction<string>) {
  state.isLoading = false;
  state.message = action.payload;
  state.messageType = "error";
  state.error = action.payload;
}

const setup = createSlice({
  name: "setup",
  initialState: setupInitialState,
  reducers: {
    getformularyStart: startLoading,
    getFormularySuccess(state, { payload }: PayloadAction<Formulary>) {
      console.log("***** getFormulariesSuccess ");
      state.formulary = payload;
      state.mode = "EXISTING";
      // state.message ="";
      // state.messageType ="";
      state.isLoading = false;
      state.error = null;
    },
    getFormalaryFailure: loadingFailed,
    setNewFormularySuccess(state) {
      console.log("***** setNewFormularySuccess ");
      state.formulary = null;
      state.mode = "NEW";
      state.message = "";
      state.messageType = "";
      state.nameExist = false;
      state.isLoading = false;
      state.error = null;
    },
    verifyFormularyNameStart: startLoading,
    verifyFormularyNameSuccess(state, { payload }: PayloadAction<boolean>) {
      //console.log("***** verifyFormularyNameSuccess : ",payload);
      state.nameExist = payload;
      if (payload) {
        state.message = "Formulary name already exist";
        state.messageType = "error";
      } else {
        state.message = "";
        state.messageType = "";
      }
      state.isLoading = false;
      state.error = null;
    },
    verifyFormularyNameFailure: loadingFailed,
    saveFormularyStart: startLoading,
    saveFormularySuccess(state, { payload }: PayloadAction<any>) {
      console.log("***** saveFormularySuccess : ", payload);
      if (payload) {
        if (payload.status === 200) {
          state.message = "Formulary created successfully";
          state.messageType = "success";
          state.isLoading = false;
          state.error = null;
        } else if (payload.status === 400) {
          state.message = payload?.data?.message;
          state.messageType = "error";
          state.isLoading = false;
          state.error = payload?.data?.message;
        }
      }
    },
    saveFormularyFailure: loadingFailed,
  },
});

export const fetchSelectedFormulary = createAsyncThunk(
  "setup",
  async (id: number, { dispatch }) => {
    console.log("***** fetchSelectedFormulary ( " + id + " ) ");
    try {
      if (id === -1) {
        dispatch(setNewFormularySuccess());
        return;
      }
      dispatch(getformularyStart());
      const formulary: Formulary = await getformulary(id);

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
  async (input: any, { dispatch }) => {
    console.log("***** saveFormulary .... ");
    if (input?.MODE === "NEW") {
      const payload = composePostBody(input);
      // console.log(" - - - - - - - - - - - - - - - -");
      // console.log(payload);
      // console.log(" - - - - - - - - - - - - - - - -");
      try {
        dispatch(saveFormularyStart());
        const resp: any = await createFormulary(payload);
        console.log("- - - -- - - - - - -- - - -");
        console.log(resp);
        if (resp) {
          dispatch(saveFormularySuccess(resp));
          if (resp?.status === 200) {
            //dispatch(fetchSelectedFormulary(resp?.data));
            return {
              type: payload?.formulary_info?.id_formulary_type,
              id: resp?.data,
              continue:input?.CONTINUE
            };
          } else {
            return null;
          }
        }
      } catch (err) {
        console.log("***** saveFormulary - ERROR ");
        dispatch(saveFormularyFailure(err.toString()));
      }
    } else if (input?.MODE === "EXISTING") {
    }
  }
);

export const {
  getformularyStart,
  getFormularySuccess,
  getFormalaryFailure,
  setNewFormularySuccess,
  verifyFormularyNameStart,
  verifyFormularyNameSuccess,
  verifyFormularyNameFailure,
  saveFormularyStart,
  saveFormularySuccess,
  saveFormularyFailure,
} = setup.actions;

export default setup.reducer;
