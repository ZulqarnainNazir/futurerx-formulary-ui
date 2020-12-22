export const getPTSummaryFulfilled = (state, action) => {
  console.log("Reducer::getPTSummaryFulfilled");
  state.isLoading = false;
  console.log("getPTSummaryFulfilled Action - - - - - - -", action);
  if (
    action.payload.data === undefined ||
    !Array.isArray(action.payload.data) ||
    action.payload.data.length === 0
  ) {
    console.log("getPTSummaryFulfilled: Payload invaLid");
    return;
  }
  const data = action.payload.data[0];
  console.log("THe PT Summary Action = ", action);
  console.log("THe PT Summary Action Payload = ", action.payload);
  // Response stored in the redux store.
  state.data = data;
};

export const getPTSummaryRejected = (state, action) => {
  console.log("Reducer::getPTSummaryRejected");
  state.isLoading = false;
  state.data = {};
};
