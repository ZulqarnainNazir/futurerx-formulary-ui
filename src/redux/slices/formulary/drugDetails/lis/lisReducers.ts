export const getLISSummaryFulfilled = (state, action) => {
  console.log("Reducer::getLISSummaryFulfilled");
  state.isLoading = false;
  console.log("getLISSummaryFulfilled Action - - - - - - -", action);
  if (
    action.payload.data === undefined ||
    !Array.isArray(action.payload.data) ||
    action.payload.data.length === 0
  ) {
    console.log("getLISSummaryFulfilled: Payload invalid");
    return;
  }
  const data = action.payload.data[0];
  console.log("THe LIS Summary Action = ", action);
  console.log("THe LIS Summary Action Payload = ", action.payload);
  // Response stored in the redux store.
  state.data = data;
};

export const getLISSummaryRejected = (state, action) => {
  console.log("Reducer::getLISSummaryRejected");
  state.isLoading = false;
  state.data = {};
};
