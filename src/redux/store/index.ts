import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { memberSummarySlice } from "../slices/member-summary/MemberSummarySlice";
import { userPrefsSlice } from "../slices/users/UserPrefsSlice";
import { formularySummarySlice } from "../slices/formulary/formularySummarySlice";
import { combineReducers } from 'redux'
import { formularyBaseSlice } from "../slices/formulary/formularyBase/formularyBaseSlice";
import applicationReducer from "../slices/formulary/application/applicationSlice";
import dashboardReducer from "../slices/formulary/dashboard/dashboardSlice";
import {gridSettingsSlice} from "../slices/formulary/gridHandler/gridSettingsSlice";
import { tierSlice } from '../slices/formulary/tier/tierSlice'
import { switchSlice } from '../slices/formulary/switch/switchSlice'
import { validationList } from "../slices/formulary/validation/validationSlice";
import  advancedSearchReducer from "../slices/formulary/advancedSearch/advancedSearchSlice";
import setupReducer from "../slices/formulary/setup/setupSlice";
import setupOptionsReducer from "../slices/formulary/setup/setupOptionsSlice";
import headerReducer from "../slices/formulary/header/headerSlice";
import gdmReducer from "../slices/formulary/gdm/gdmSlice";
import { stepTherapySlice,stVersionSlice } from "../slices/formulary/stepTherapy/stepTherapySlice";


const reducer = combineReducers({
  // here we will be adding reducers
})

const middleware = [
  ...getDefaultMiddleware(),
  /*YOUR CUSTOM MIDDLEWARES HERE*/
];

const memberSummaryReducer = memberSummarySlice.reducer;
const userPrefsReducer = userPrefsSlice.reducer;
const formularyBaseReducer = formularyBaseSlice.reducer;
const gridSettingsReducer = gridSettingsSlice.reducer;
const tierSliceReducer = tierSlice.reducer
const switchReducer = switchSlice.reducer
const validationReducer = validationList.reducer
const stepTherapy = stepTherapySlice.reducer
const stVerion = stVersionSlice.reducer

// The store is configured with the state and the corresponding reducers.
const store = configureStore({
  reducer: {
    member_summary: memberSummaryReducer,
    user_prefs: userPrefsReducer,
    formularBase: formularyBaseReducer,
    dashboard: dashboardReducer,
    tierSliceReducer: tierSliceReducer,
    switchReducer: switchReducer,
    validationReducer: validationReducer,
    application: applicationReducer,
    gridSettings: gridSettingsReducer,
    setup: setupReducer,
    setupOptions: setupOptionsReducer,
    header: headerReducer,
    saveGdm:gdmReducer,
    stepTherapyReducer: stepTherapy,
    advancedSearch: advancedSearchReducer,
    stVerion: stVerion
  },
  middleware,
});

export default store;

// Type of the state.

interface FRX_STATE {
  members: Map<string, any>,
  current_member_key: string,

  member_id: string,
  member_summary: {
    first_name: string,
    lastname_name: string,
    nickname?: string
  },
  clinical_diagnosis_history: {
    list: Array<any>
  },
  claims: {
    yearly_data: {
      
    }
  }
}