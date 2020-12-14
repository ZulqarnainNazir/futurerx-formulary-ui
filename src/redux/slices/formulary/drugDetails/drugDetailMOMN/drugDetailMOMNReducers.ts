export const getMOMNSummaryFulfilled = (state, action) => {
  console.log("Reducer::getMOMNSummaryFulfilled");
  state.isLoading = false;
  console.log("getMOMNSummaryFulfilled Action - - - - - - -", action);
  if (
    action.payload.data === undefined ||
    !Array.isArray(action.payload.data) ||
    action.payload.data.length === 0
  ) {
    console.log("getMOMNSummaryFulfilled: Payload invalid");
    return;
  }
  const data = action.payload.data[0];
  console.log("THe MOMN Summary Action = ", action);
  console.log("THe MOMN Summary Action Payload = ", action.payload);
  // Response stored in the redux store.
  state.data = data;
};

export const getMOMNSummaryRejected = (state, action) => {
  console.log("Reducer::getMOMNSummaryRejected");
  state.isLoading = false;
  state.data = {};
};
