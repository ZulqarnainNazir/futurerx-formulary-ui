export const getAFSummaryFulfilled = (state, action) => {
  console.log("Reducer::getAFSummaryFulfilled");
  state.isLoading = false;
  console.log("getAFSummaryFulfilled Action - - - - - - -", action);
  if (
    action.payload.data === undefined ||
    !Array.isArray(action.payload.data) ||
    action.payload.data.length === 0
  ) {
    console.log("getAFSummaryFulfilled: Payload invalid");
    return;
  }
  const data = action.payload.data[0];
  console.log("THe AF Summary Action = ", action);
  console.log("THe AF Summary Action Payload = ", action.payload);
  // Response stored in the redux store.
  state.data = data;
};

export const getAFSummaryRejected = (state, action) => {
  console.log("Reducer::getAFSummaryRejected");
  state.isLoading = false;
  state.data = {};
};
