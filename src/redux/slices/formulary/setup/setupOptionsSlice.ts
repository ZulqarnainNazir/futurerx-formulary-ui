import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Formulary } from "./formulary";
import {
  getGeneralOptions,
  getSubMthsOptions,
  getStatesOptions,
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
  isLoading: false,
  error: null,
};

export interface GeneralOptions {
  formularyType: any[];
  contractYear: any[];
  submission_months: any[];
  classification_systems: any[];
  states: any[];
  clone_source_formularies: any[];
}

const generalOptionsInitialState: GeneralOptions = {
  formularyType: [],
  contractYear: [],
  submission_months: [],
  classification_systems: [],
  states: [],
  clone_source_formularies: [],
};

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

interface TypeAndId {
  type: number;
  id: number;
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
      // console.log("***** getGeneralOptionsSuccess # 1");
      if (!state.generalOptions) {
        state.generalOptions = {};
        state.generalOptions = generalOptionsInitialState;
      }
      state.generalOptions.formularyType = payload?.formularyType;
      state.generalOptions.contractYear = payload?.contractYear;
      state.generalOptions.classification_systems =
        payload?.classification_systems;
      state.generalOptions.clone_source_formularies =
        payload?.clone_source_formularies;

      state.isLoading = false;
      state.error = null;
    },
    getGeneralOptionsFailure: loadingFailed,
    getSubMthsOptionsStart: startLoading,
    getSubMthsOptionsSuccess(
      state,
      { payload }: PayloadAction<GeneralOptions>
    ) {
      // console.log("***** getSubMthsOptionsSuccess ");
      // console.log(payload);
      if (!state.generalOptions) {
        state.generalOptions = {};
        state.generalOptions = generalOptionsInitialState;
      }
      state.generalOptions.submission_months = payload?.submission_months;
      state.isLoading = false;
      state.error = null;
    },
    getSubMthsOptionsFailure: loadingFailed,

    getStatesOptionsStart: startLoading,
    getStatesOptionsSuccess(state, { payload }: PayloadAction<GeneralOptions>) {
      //console.log("***** getStatesOptionsSuccess ");
      //console.log(payload);
      if (!state.generalOptions) {
        state.generalOptions = {};
        state.generalOptions = generalOptionsInitialState;
      }
      state.generalOptions.states = payload?.states;
      state.isLoading = false;
      state.error = null;
    },
    getStatesOptionsFailure: loadingFailed,

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
      // console.log("***** getTierOptionsSuccess Reducer");
      let AddNew: any = {
        id_tier_label: -1,
        tier_label: "Add New",
        display_text: "",
        code_value: "",
      };
      // TODO - Cleanup
      let base1: any;
      base1 = payload;
      let newList = [AddNew, ...base1];
      state.tierOptions = newList;
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
  async (input: TypeAndId, { dispatch }) => {
    //console.log("***** fetchGeneralOptions : " + input);
    try {
      dispatch(getGeneralOptionsStart());
      const genOptions: any = await getGeneralOptions(input.type, input.id);
      //console.log("*** genOptions : ", genOptions);
      dispatch(getGeneralOptionsSuccess(genOptions));
    } catch (err) {
      //console.log("***** fetchGeneralOptions AC - ERROR ");
      dispatch(getGeneralOptionsFailure(err.toString()));
    }
  }
);

export const fetchSubMthsOptions = createAsyncThunk(
  "setupOptions",
  async (year: number, { dispatch }) => {
    // console.log("***** fetchSubMthsOptions");
    try {
      dispatch(getSubMthsOptionsStart());
      const options: any = await getSubMthsOptions(year);
      // console.log("*** options : ", options);
      dispatch(getSubMthsOptionsSuccess(options));
    } catch (err) {
      //console.log("*****  AC - ERROR ");
      dispatch(getSubMthsOptionsFailure(err.toString()));
    }
  }
);

export const fetchStatesOptions = createAsyncThunk(
  "setupOptions",
  async (type: number, { dispatch }) => {
    // console.log("***** fetchStatesOptions (" + formulary_type + ")");
    try {
      dispatch(getStatesOptionsStart());
      const options: any = await getStatesOptions(type);
      // console.log("*** options : ", options);
      dispatch(getStatesOptionsSuccess(options));
    } catch (err) {
      //console.log("***** fetchStatesOptions AC - ERROR ");
      dispatch(getStatesOptionsFailure(err.toString()));
    }
  }
);

export const fetchMedicareOptions = createAsyncThunk(
  "setupOptions",
  async (input: TypeAndId, { dispatch }) => {
    // console.log("***** fetchMedicareOptions  " + input);
    try {
      dispatch(getMedicareOptionsStart());
      const options: any = await getMedicareOptions(input.type, input.id);
      //console.log("*** options : ", options);
      dispatch(getMedicareOptionsSuccess(options));
    } catch (err) {
      //console.log("*****  AC - ERROR ");
      dispatch(getMedicareOptionsFailure(err.toString()));
    }
  }
);

export const fetchDesignOptions = createAsyncThunk(
  "setupOptions",
  async (input: TypeAndId, { dispatch }) => {
    // console.log("***** fetchDesignOptions AC ");
    try {
      dispatch(getDesignOptionsStart());
      const options: any = await getDesignOptions(input.type, input.id);
      //console.log("*** options : ", options);
      dispatch(getDesignOptionsSuccess(options));
    } catch (err) {
      //console.log("*****  AC - ERROR ");
      dispatch(getDesignOptionsFailure(err.toString()));
    }
  }
);

export const fetchTierOptions = createAsyncThunk(
  "setupOptions",
  async (input: TypeAndId, { dispatch }) => {
    //console.log("***** fetchTierOptions AC ");
    try {
      dispatch(getTierOptionsStart());
      const options: any = await getTierOptions(input.type, input.id, 0);
      console.log("*** options : ", options);
      dispatch(getTierOptionsSuccess(options));
    } catch (err) {
      //console.log("***** fetchTierOptions AC - ERROR ");
      dispatch(getTierOptionsFailure(err.toString()));
    }
  }
);

export const fetchSupplementalOptions = createAsyncThunk(
  "setupOptions",
  async (input: TypeAndId, { dispatch }) => {
    //console.log("***** fetchSupplementalOptions AC ");
    try {
      dispatch(getSupplementalOptionsStart());
      const options: any = await getSupplementalOptions(input.type, input.id);
      //console.log("*** options : ", options);
      dispatch(getSupplementalOptionsSuccess(options));
    } catch (err) {
      //console.log("*****  AC - ERROR ");
      dispatch(getSupplementalOptionsFailure(err.toString()));
    }
  }
);

// export const manageFormularyType = createAsyncThunk(
//   "setupOptions",
//   async (input: TypeAndId, { dispatch }) => {
//     const type = input.type;
//     const id = input.id;

//     console.log(" TYPE :: " + type + " - " + id);

//     if (type === -1) {
//       dispatch(fetchGeneralOptions({ type: 1, id: -1 }));
//       return;
//     }

//     dispatch(fetchGeneralOptions({ type: type, id: id }));
//     dispatch(fetchDesignOptions({ type: type, id: id }));
//     dispatch(fetchTierOptions({ type: type, id: id }));

//     if (type === 1) {
//       dispatch(fetchMedicareOptions({ type: type, id: id }));
//       dispatch(fetchSupplementalOptions({ type: type, id: id }));
//     } else if (type === 2) {
//       dispatch(fetchStatesOptions(type));
//       dispatch(fetchMedicareOptions({ type: type, id: id }));
//       dispatch(fetchSupplementalOptions({ type: type, id: id }));
//     } else if (type === 3) {
//       // TODO ... MEDICADE...
//       dispatch(fetchStatesOptions(0));
//     } else if (type === 4) {
//       // TODO ... MEDICADE...
//       dispatch(fetchStatesOptions(0));
//     } else if (type === 5) {
//     } else if (type === 6) {
//       // COMMERCIAL...
//     }
//     dispatch(fetchSubMthsOptions(2021));
//   }
// );

export const {
  getGeneralOptionsStart,
  getGeneralOptionsSuccess,
  getGeneralOptionsFailure,

  getStatesOptionsStart,
  getStatesOptionsSuccess,
  getStatesOptionsFailure,

  getSubMthsOptionsStart,
  getSubMthsOptionsSuccess,
  getSubMthsOptionsFailure,

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
