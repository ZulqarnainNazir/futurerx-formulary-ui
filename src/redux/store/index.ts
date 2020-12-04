import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { memberSummarySlice } from "../slices/member-summary/MemberSummarySlice";
import { userPrefsSlice } from "../slices/users/UserPrefsSlice";
import { formularySummarySlice } from "../slices/formulary/formularySummarySlice";
import { combineReducers } from 'redux'
import { formularyBaseSlice } from "../slices/formulary/formularyBase/formularyBaseSlice";


const reducer = combineReducers({
  // here we will be adding reducers
})

const middleware = [
  ...getDefaultMiddleware(),
  /*YOUR CUSTOM MIDDLEWARES HERE*/
];

const memberSummaryReducer = memberSummarySlice.reducer;
const userPrefsReducer = userPrefsSlice.reducer;
const formularySummaryReducer = formularySummarySlice.reducer;

// The store is configured with the state and the corresponding reducers.
const store = configureStore({
  reducer: {
    member_summary: memberSummaryReducer,
    user_prefs: userPrefsReducer,
    formulary2:formularySummaryReducer,
    formularBase: formularyBaseSlice.reducer
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