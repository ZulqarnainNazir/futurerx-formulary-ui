import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Formulary } from "./formulary";
import {
  getGeneralOptions,
  getMedicareOptions,
  getDesignOptions,
  getSupplementalOptions,
  getTierOptions,
} from "./setupOptionsService";

interface SetupOptionsState {
  generalOptions: GeneralOptions | any;
  medicareOptions: MedicareOptions | any;
  designOptions: DesignOptions | any;
  supplementalOptions: SupplementalOptions | any;
  tierOptions: TierOptions | any;
  isLoading: boolean;
  error: string | null;
}

const setupOptionsInitialState: SetupOptionsState = {
  generalOptions: null,
  medicareOptions: null,
  designOptions: null,
  supplementalOptions: null,
  tierOptions: null,
  isLoading: true,
  error: null,
};

export interface GeneralOptions {
  formularyType: any[];
  contractYear: any[];
  monthList: any[];
}

export interface MedicareOptions {
  contract_types: any[];
}

export interface DesignOptions {
  designs: any[];
}

export interface SupplementalOptions {
  supplementals: any[];
}

export interface TierOptions {
  tier: any[];
}

function startLoading(state: SetupOptionsState) {
  state.isLoading = true;
}

function loadingFailed(
  state: SetupOptionsState,
  action: PayloadAction<string>
) {
  state.isLoading = false;
  state.error = action.payload;
}

const setup = createSlice({
  name: "setupOptions",
  initialState: setupOptionsInitialState,
  reducers: {
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
    getMedicareOptionsStart: startLoading,
    getMedicareOptionsSuccess(
      state,
      { payload }: PayloadAction<MedicareOptions>
    ) {
      //console.log("***** getMedicareOptionsSuccess ");
      //console.log(payload);
      state.medicareOptions = payload;
      state.isLoading = false;
      state.error = null;
    },
    getMedicareOptionsFailure: loadingFailed,
    getDesignOptionsStart: startLoading,
    getDesignOptionsSuccess(state, { payload }: PayloadAction<DesignOptions>) {
      // console.log("***** getDesignOptionsSuccess ");
      // console.log(payload);
      state.designOptions = payload;
      state.isLoading = false;
      state.error = null;
    },
    getDesignOptionsFailure: loadingFailed,

    getTierOptionsStart: startLoading,
    getTierOptionsSuccess(state, { payload }: PayloadAction<TierOptions>) {
      console.log("***** getTierOptionsSuccess Reducer");
      console.log(payload);
      state.tierOptions = payload;
      state.isLoading = false;
      state.error = null;
    },
    getTierOptionsFailure: loadingFailed,

    getSupplementalOptionsStart: startLoading,
    getSupplementalOptionsSuccess(
      state,
      { payload }: PayloadAction<SupplementalOptions>
    ) {
      // console.log("***** getSupplementalOptionsSuccess ");
      // console.log(payload);
      state.supplementalOptions = payload;
      state.isLoading = false;
      state.error = null;
    },
    getSupplementalOptionsFailure: loadingFailed,
  },
});

export const fetchGeneralOptions = createAsyncThunk(
  "setupOptions",
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

export const fetchMedicareOptions = createAsyncThunk(
  "setupOptions",
  async (arg: number, { dispatch }) => {
    //console.log("***** fetchMedicareOptions AC ");
    try {
      dispatch(getMedicareOptionsStart());
      const options: any = await getMedicareOptions(1);
      //console.log("*** options : ", options);
      dispatch(getMedicareOptionsSuccess(options));
    } catch (err) {
      //console.log("***** fetchGeneralOptions AC - ERROR ");
      dispatch(getMedicareOptionsFailure(err.toString()));
    }
  }
);

export const fetchDesignOptions = createAsyncThunk(
  "setupOptions",
  async (arg: number, { dispatch }) => {
    //console.log("***** fetchDesignOptions AC ");
    try {
      dispatch(getDesignOptionsStart());
      const options: any = await getDesignOptions(1);
      //console.log("*** options : ", options);
      dispatch(getDesignOptionsSuccess(options));
    } catch (err) {
      //console.log("***** fetchGeneralOptions AC - ERROR ");
      dispatch(getDesignOptionsFailure(err.toString()));
    }
  }
);

export const fetchTierOptions = createAsyncThunk(
  "setupOptions",
  async (lob_id: number, { dispatch }) => {
    console.log("***** fetchTierOptions AC ");
    try {
      dispatch(getTierOptionsStart());
      const options: any = await getTierOptions(lob_id, 0);
      console.log("*** options : ", options);
      dispatch(getTierOptionsSuccess(options));
    } catch (err) {
      console.log("***** fetchTierOptions AC - ERROR ");
      dispatch(getTierOptionsFailure(err.toString()));
    }
  }
);

export const fetchSupplementalOptions = createAsyncThunk(
  "setupOptions",
  async (arg: number, { dispatch }) => {
    //console.log("***** fetchSupplementalOptions AC ");
    try {
      dispatch(getSupplementalOptionsStart());
      const options: any = await getSupplementalOptions(1);
      //console.log("*** options : ", options);
      dispatch(getSupplementalOptionsSuccess(options));
    } catch (err) {
      //console.log("***** fetchGeneralOptions AC - ERROR ");
      dispatch(getSupplementalOptionsFailure(err.toString()));
    }
  }
);

export const {
  getGeneralOptionsStart,
  getGeneralOptionsSuccess,
  getGeneralOptionsFailure,
  getMedicareOptionsStart,
  getMedicareOptionsSuccess,
  getMedicareOptionsFailure,
  getDesignOptionsStart,
  getDesignOptionsSuccess,
  getDesignOptionsFailure,
  getTierOptionsStart,
  getTierOptionsSuccess,
  getTierOptionsFailure,
  getSupplementalOptionsStart,
  getSupplementalOptionsSuccess,
  getSupplementalOptionsFailure,
} = setup.actions;

export default setup.reducer;
