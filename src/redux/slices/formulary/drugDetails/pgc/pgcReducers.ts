export const getPGCSummaryFulfilled = (state, action) => {
  console.log("Reducer::getPGCSummaryFulfilled");
  state.isLoading = false;
  console.log("getPGCSummaryFulfilled Action - - - - - - -", action);
  if (
    action.payload.data === undefined ||
    !Array.isArray(action.payload.data) ||
    action.payload.data.length === 0
  ) {
    console.log("getPGCSummaryFulfilled: Payload invalid");
    return;
  }
  const data = action.payload.data[0];
  console.log("THe PGC Summary Action = ", action);
  console.log("THe PGC Summary Action Payload = ", action.payload);
  // Response stored in the redux store.
  state.data = data;
};

export const getPGCSummaryRejected = (state, action) => {
  console.log("Reducer::getPGCSummaryRejected");
  state.isLoading = false;
  state.data = {};
};
