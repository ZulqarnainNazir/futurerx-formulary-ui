export const getHISummaryFulfilled = (state, action) => {
  console.log("Reducer::getHISummaryFulfilled");
  state.isLoading = false;
  console.log("getHISummaryFulfilled Action - - - - - - -", action);
  if (
    action.payload.data === undefined ||
    !Array.isArray(action.payload.data) ||
    action.payload.data.length === 0
  ) {
    console.log("getHISummaryFulfilled: Payload invalid");
    return;
  }
  const data = action.payload.data[0];
  console.log("THe HI Summary Action = ", action);
  console.log("THe HI Summary Action Payload = ", action.payload);
  // Response stored in the redux store.
  state.data = data;
};

export const getHISummaryRejected = (state, action) => {
  console.log("Reducer::getHISummaryRejected");
  state.isLoading = false;
  state.data = {};
};
