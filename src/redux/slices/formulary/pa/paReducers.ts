


export const getPaFulfilled = (state, action) => {
  console.log("Reducer::getPaFulfilled");
  state.isLoading = false;
  debugger;
  console.log(action)
  if(action.payload.data === undefined || !Array.isArray(action.payload.data) || (action.payload.data.length === 0)) {
    console.log("getPaFulfilled: Payload invalid");
    return;
  }
  const data = action.payload.data[0];
  // Response stored in the redux store.
  state.data = data;
  
}

export const getPaRejected = (state, action) => {
  console.log("Reducer::getPaRejected");
  state.isLoading = false;
  state.data = {};

}