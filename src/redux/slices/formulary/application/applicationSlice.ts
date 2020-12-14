import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL1 } from "../../../../api/http-helper";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface ApplicationState {
  formulary_id: number;
  formulary: any;
  formulary_lob_id: number;
  formulary_type_id: number;
  isLoading: boolean;
  error: string | null;
  mode: string;
}

const applicationInitialState: ApplicationState = {
  formulary_id: 0,
  formulary: null,
  formulary_lob_id: NaN,
  formulary_type_id: NaN,
  mode: "",
  isLoading: false,
  error: null,
};

interface ApplicationResult {
  formulary_id: number;
  formulary: any;
  formulary_lob_id: number;
  formulary_type_id: number;
  mode: string;
}

function startLoading(state: ApplicationState) {
  state.isLoading = true;
}

function loadingFailed(state: ApplicationState, action: PayloadAction<string>) {
  state.isLoading = false;
  state.error = action.payload;
}

const application = createSlice({
  name: "application",
  initialState: applicationInitialState,
  reducers: {
    setFormularyDetails(state, { payload }: PayloadAction<ApplicationResult>) {
      // console.log("***** setFormularyDetails ");
      const {
        formulary_id,
        formulary,
        formulary_lob_id,
        formulary_type_id,
        mode,
      } = payload;
      state.formulary_id = formulary_id;
      state.formulary = formulary;
      state.formulary_lob_id = formulary_lob_id;
      state.formulary_type_id = formulary_type_id;
      state.mode= mode;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const { setFormularyDetails } = application.actions;

export default application.reducer;

export const setFormulary = createAsyncThunk(
  "application",
  async (arg: any, { dispatch }) => {

    //console.log("***** setFormulary ", arg);
    
    const obj = {
      formulary_id: arg.id_formulary,
      formulary: arg,
      formulary_lob_id: arg.id_lob,
      formulary_type_id: arg.id_formulary_type,
      mode: "EXISTING",
    };
    dispatch(setFormularyDetails(obj));
  }
);

export const addNewFormulary = createAsyncThunk(
  "application",
  async (arg: any = null, { dispatch }) => {
    const obj = {
      formulary_id: 0,
      formulary: null,
      formulary_lob_id: 0,
      formulary_type_id: 0,
      mode: "NEW",
    };
    dispatch(setFormularyDetails(obj));
  }
);
