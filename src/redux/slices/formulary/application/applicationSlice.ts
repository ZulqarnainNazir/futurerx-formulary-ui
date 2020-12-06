import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL1 } from "../../../../api/http-helper";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface ApplicationState {
  formulary_id: number;
  formulary: any;
  isLoading: boolean;
  error: string | null;
}

const applicationInitialState: ApplicationState = {
  formulary_id: 0,
  formulary: null,
  isLoading: false,
  error: null,
};

interface ApplicationResult {
  formulary_id: number;
  formulary: any;
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
      const { formulary_id, formulary } = payload;
      state.formulary_id = formulary_id;
      state.formulary = formulary;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const {setFormularyDetails} = application.actions;

export default application.reducer;

export const setFormulary = createAsyncThunk(
  "application",
  async (arg: any, { dispatch }) => {
    // console.log("***** setFormulary ");
    const obj = {
      formulary_id: arg.id_formulary,
      formulary: arg,
    };
    dispatch(setFormularyDetails(obj));
  }
);
