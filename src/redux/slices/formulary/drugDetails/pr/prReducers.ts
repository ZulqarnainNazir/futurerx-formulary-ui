export const getPRSummaryFulfilled = (state, action) => {
  console.log("Reducer::getPRSummaryFulfilled");
  state.isLoading = false;
  console.log("getPRSummaryFulfilled Action - - - - - - -", action);
  if (
    action.payload.data === undefined ||
    !Array.isArray(action.payload.data) ||
    action.payload.data.length === 0
  ) {
    console.log("getPRSummaryFulfilled: Payload invaLid");
    return;
  }
  const data = action.payload.data[0];
  console.log("THe PR Summary Action = ", action);
  console.log("THe PR Summary Action Payload = ", action.payload);
  // Response stored in the redux store.
  state.data = data;
};

export const getPRSummaryRejected = (state, action) => {
  console.log("Reducer::getPRSummaryRejected");
  state.isLoading = false;
  state.data = {};
};
