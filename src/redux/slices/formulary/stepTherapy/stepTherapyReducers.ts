
export const getStepTherapyFulfilled = (state, action) => {
  console.log("Reducer::getStepTherapyFulfilled");
  state.isLoading = false;
  if(action.payload.data === undefined || (action.payload.data.length === 0)) {
    console.log("getStepTherapyFulfilled: Payload invalid");
    return;
  }
  const data = action.payload.data;
  // Response stored in the redux store.
  state.data = data;
  
}

export const getStepTherapyRejected = (state, action) => {
  console.log("Reducer::getStepTherapyRejected");
  state.isLoading = false;
  state.data = {}
}


export const getVersionFulfilled = (state, action) => {
  state.isLoading = false;
  if(action.payload.data === undefined || (action.payload.data.length === 0)) {
    console.log("getStepTherapyFulfilled: Payload invalid");
    return;
  }
  const stVersion = action.payload.data;
  // Response stored in the redux store.
  state.stVersion = stVersion;
  
}

export const getVersionRejected = (state, action) => {
  console.log("Reducer::getStepTherapyRejected");
  state.isLoading = false;
  state.stVersion = {}
}