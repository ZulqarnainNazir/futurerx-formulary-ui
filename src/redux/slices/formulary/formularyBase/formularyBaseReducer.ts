//import { FORMULARY_STATE_TYPE } from "../../../model/FormularyState";


export const getActionFulfilled = (state, action) => {
  console.log("Reducer::getTierFulfilled");
  state.isLoading = false;
  console.log(action)

  if(action.payload.data === undefined || !Array.isArray(action.payload.data) || (action.payload.data.length === 0)) {
    console.log("getBaseFulfilled: Payload invalid");
    return;
  }
  const data = action.payload.data;
  // Response stored in the redux store.
  state.data = data;
  
}

export const getActionRejected = (state, action) => {
  console.log("Reducer::get Base");
  state.isLoading = false;
  state.data = {};
}