export const getIBFSummaryFulfilled = (state, action) => {
  console.log("Reducer::getIBFSummaryFulfilled");
  state.isLoading = false;
  console.log("getIBFSummaryFulfilled Action - - - - - - -", action);
  if (
    action.payload.data === undefined ||
    !Array.isArray(action.payload.data) ||
    action.payload.data.length === 0
  ) {
    console.log("getIBFSummaryFulfilled: Payload invalid");
    return;
  }
  const data = action.payload.data[0];
  console.log("THe IBF Summary Action = ", action);
  console.log("THe IBF Summary Action Payload = ", action.payload);
  // Response stored in the redux store.
  state.data = data;
};

export const getIBFSummaryRejected = (state, action) => {
  console.log("Reducer::getIBFSummaryRejected");
  state.isLoading = false;
  state.data = {};
};
