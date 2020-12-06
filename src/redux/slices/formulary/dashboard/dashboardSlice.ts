import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL1 } from "../../../../api/http-helper";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface DashboardState {
  formulary_count: number;
  formulary_list: any[];
  isLoading: boolean;
  error: string | null;
}

const dashboardInitialState: DashboardState = {
  formulary_count: 0,
  formulary_list: [],
  isLoading: false,
  error: null,
};

interface DashboardResult {
  list: any[];
  count: number;
}

function startLoading(state: DashboardState) {
  state.isLoading = true;
}

function loadingFailed(state: DashboardState, action: PayloadAction<string>) {
  state.isLoading = false;
  state.error = action.payload;
}

const dashboard = createSlice({
  name: "dashboard",
  initialState: dashboardInitialState,
  reducers: {
    getformulariesStart: startLoading,
    getFormulariesSuccess(state, { payload }: PayloadAction<DashboardResult>) {
      // console.log("***** getFormulariesSuccess ");
      const { list, count } = payload;
      // console.log("COUNT : ", count);
      // console.log("LIST : ", list);
      state.formulary_list = list;
      state.formulary_count = count;
      state.isLoading = false;
      state.error = null;
    },
    getFormalariesFailure: loadingFailed,
  },
});

export const {
  getformulariesStart,
  getFormulariesSuccess,
  getFormalariesFailure,
} = dashboard.actions;

export default dashboard.reducer;

export const fetchFormularies = createAsyncThunk(
  "dashboard",
  async (arg: any, { dispatch }) => {
    // console.log("***** fetchFormularies ");
    try {
      dispatch(getformulariesStart());
      let url = BASE_URL1 + "/api/1/formularies/1?index=0&limit=10";
      const FLs = await getformularies(url);
      dispatch(getFormulariesSuccess(FLs));
    } catch (err) {
      // console.log("***** fetchFormularies - ERROR ");
      dispatch(getFormalariesFailure(err.toString()));
    }
  }
);

async function getformularies(url: string): Promise<DashboardResult> {
  const headers = {
    Authorization: "Bearer 1e05ff8b-a0af-4a8f-8915-487321900f21",
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
  };
  try {
    const response = await axios.post(url, JSON.stringify({}), {
      headers: headers,
    });
    // console.log("***** getformularies - Success");
    // console.log(response);
    let count = 11;
    return {
      list: response.data.data,
      count: response.data.count,
    };
  } catch (error) {
    // console.log("***** getformularies - Error");
    // console.log(error);
    throw error;
  }
}
