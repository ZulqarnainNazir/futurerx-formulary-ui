import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { memberSummarySlice } from "../slices/member-summary/MemberSummarySlice";
import { userPrefsSlice } from "../slices/users/UserPrefsSlice";
import  formulary  from '../formulary/Reducer/index'

const middleware = [
  ...getDefaultMiddleware(),
  /*YOUR CUSTOM MIDDLEWARES HERE*/
];

const memberSummaryReducer = memberSummarySlice.reducer;
const userPrefsReducer = userPrefsSlice.reducer;

// The store is configured with the state and the corresponding reducers.
const store = configureStore({
  reducer: {
    member_summary: memberSummaryReducer,
    user_prefs: userPrefsReducer,
    formulary:formulary
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