export const getSOSummaryFulfilled = (state, action) => {
  console.log("Reducer::getSOSummaryFulfilled");
  state.isLoading = false;
  console.log("getSOSummaryFulfilled Action - - - - - - -", action);
  if (
    action.payload.data === undefined ||
    !Array.isArray(action.payload.data) ||
    action.payload.data.length === 0
  ) {
    console.log("getSOSummaryFulfilled: Payload invalid");
    return;
  }
  const data = action.payload.data[0];
  console.log("THe SO Summary Action = ", action);
  console.log("THe SO Summary Action Payload = ", action.payload);
  // Response stored in the redux store.
  state.data = data;
};

export const getSOSummaryRejected = (state, action) => {
  console.log("Reducer::getSOSummaryRejected");
  state.isLoading = false;
  state.data = {};
};
