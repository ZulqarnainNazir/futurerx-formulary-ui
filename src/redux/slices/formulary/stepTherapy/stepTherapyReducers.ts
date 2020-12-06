


export const getStepTherapyFulfilled = (state, action) => {
  console.log("Reducer::getStepTherapyFulfilled");
  state.isLoading = false;
  debugger;
  console.log(action)
  if(action.payload.data === undefined || !Array.isArray(action.payload.data) || (action.payload.data.length === 0)) {
    console.log("getStepTherapyFulfilled: Payload invalid");
    return;
  }
  const data = action.payload.data[0];
  // Response stored in the redux store.
  state.data = data;
  
}

export const getStepTherapyRejected = (state, action) => {
  console.log("Reducer::getStepTherapyRejected");
  state.isLoading = false;
  state.data = {};

}