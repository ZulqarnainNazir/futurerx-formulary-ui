export const getFFFSummaryFulfilled = (state, action) => {
  console.log("Reducer::getFFFSummaryFulfilled");
  state.isLoading = false;
  console.log("getFFFSummaryFulfilled Action - - - - - - -", action);
  if (
    action.payload.data === undefined ||
    !Array.isArray(action.payload.data) ||
    action.payload.data.length === 0
  ) {
    console.log("getFFFSummaryFulfilled: Payload invalid");
    return;
  }
  const data = action.payload.data[0];
  console.log("THe FFF Summary Action = ", action);
  console.log("THe FFF Summary Action Payload = ", action.payload);
  // Response stored in the redux store.
  state.data = data;
};

export const getFFFSummaryRejected = (state, action) => {
  console.log("Reducer::getFFFSummaryRejected");
  state.isLoading = false;
  state.data = {};
};
