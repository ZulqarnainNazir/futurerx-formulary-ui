export const getPBSTSummaryFulfilled = (state, action) => {
  console.log("Reducer::getPBSTSummaryFulfilled");
  state.isLoading = false;
  console.log("getPBSTSummaryFulfilled Action - - - - - - -", action);
  if (
    action.payload.data === undefined ||
    !Array.isArray(action.payload.data) ||
    action.payload.data.length === 0
  ) {
    console.log("getPBSTSummaryFulfilled: Payload invalid");
    return;
  }
  const data = action.payload.data[0];
  console.log("THe PBST Summary Action = ", action);
  console.log("THe PBST Summary Action Payload = ", action.payload);
  // Response stored in the redux store.
  state.data = data;
};

export const getPBSTSummaryRejected = (state, action) => {
  console.log("Reducer::getPBSTSummaryRejected");
  state.isLoading = false;
  state.data = {};
};
