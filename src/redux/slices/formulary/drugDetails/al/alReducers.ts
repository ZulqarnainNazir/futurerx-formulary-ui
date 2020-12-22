export const getALSummaryFulfilled = (state, action) => {
  console.log("Reducer::getALSummaryFulfilled");
  state.isLoading = false;
  console.log("getALSummaryFulfilled Action - - - - - - -", action);
  if (
    action.payload.data === undefined ||
    !Array.isArray(action.payload.data) ||
    action.payload.data.length === 0
  ) {
    console.log("getALSummaryFulfilled: Payload invalid");
    return;
  }
  const data = action.payload.data[0];
  console.log("THe AL Summary Action = ", action);
  console.log("THe AL Summary Action Payload = ", action.payload);
  // Response stored in the redux store.
  state.data = data;
};

export const getALSummaryRejected = (state, action) => {
  console.log("Reducer::getALSummaryRejected");
  state.isLoading = false;
  state.data = {};
};
