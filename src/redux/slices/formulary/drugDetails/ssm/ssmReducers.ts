export const getSSMSummaryFulfilled = (state, action) => {
  console.log("Reducer::getSSMSummaryFulfilled");
  state.isLoading = false;
  console.log("getSSMSummaryFulfilled Action - - - - - - -", action);
  if (
    action.payload.data === undefined ||
    !Array.isArray(action.payload.data) ||
    action.payload.data.length === 0
  ) {
    console.log("getSSMSummaryFulfilled: Payload invalid");
    return;
  }
  const data = action.payload.data[0];
  console.log("THe SSM Summary Action = ", action);
  console.log("THe SSM Summary Action Payload = ", action.payload);
  // Response stored in the redux store.
  state.data = data;
};

export const getSSMSummaryRejected = (state, action) => {
  console.log("Reducer::getSSMSummaryRejected");
  state.isLoading = false;
  state.data = {};
};
